const handleRequest = async (params) => {
	const logger = Moralis.Cloud.getLogger();

	return await Moralis.Cloud.httpRequest(params).then(
		(httpResponse) => {
			// logger.info('TEst: ' + httpResponse.data);
			return httpResponse.data;
		},
		(httpResponse) => {
			// error
			logger.info(
				'User Request failed : ' +
					JSON.stringify({
						status: httpResponse.status,
						data: httpResponse.data,
					})
			);
			throw new Error(JSON.stringify({ error: httpResponse.data }));
			return false;
		}
	);
};

Moralis.Cloud.define('deleteConnection', async (request) => {
	const User = Moralis.Object.extend('User');
	const query = new Moralis.Query(User);
	query.equalTo('objectId', request.user.id);
	const user = await query.first({ useMasterKey: true });

	if (request.params.platform == 'email') {
		user.set('email', null);
		return;
	}

	let socials = user.get('socials');
	if (!socials) socials = {};
	delete socials[request.params.platform];
	user.set('socials', socials);
	await user.save(null, { useMasterKey: true });
});

Moralis.Cloud.define('getUser', async (request) => {
	const User = Moralis.Object.extend('User');
	const query = new Moralis.Query(User);
	query.equalTo('objectId', request.user.id);
	const user = await query.first({ useMasterKey: true });
	return user;
});

Moralis.Cloud.define('getNotifications', async (request) => {
	const Notification = Moralis.Object.extend('Notification');
	const query2 = new Moralis.Query(Notification);

	let match = [{ match: { user: request.user.id } }];
	if (request.params.sender)
		match.push({ match: { sender: request.params.sender } });

	pipeline = [
		...match,
		{
			lookup: {
				from: 'Dapp',
				localField: 'sender',
				foreignField: 'address',
				as: 'senderDetails',
			},
		},
		{
			sort: { createdAt: -1 },
		},
	];
	const results = await query2.aggregate(pipeline, { useMasterKey: true });
	return results;
});

Moralis.Cloud.define('getSubscriptions', async (request) => {
	const Subscription = Moralis.Object.extend('Subscription');
	const query2 = new Moralis.Query(Subscription);

	pipeline = [
		{
			match: { user: request.user.id },
		},
		{
			lookup: {
				from: 'Dapp',
				localField: 'sender',
				foreignField: 'address',
				as: 'senderDetails',
			},
		},
		{
			sort: { createdAt: -1 },
		},
	];
	const results = await query2.aggregate(pipeline, { useMasterKey: true });
	return results;
});

Moralis.Cloud.define('sendNotification', async (request) => {
	const web3 = Moralis.web3ByChain('0xa86a');

	const data = {
		sender: request.params.sender.toLowerCase(),
		topic: request.params.topic,
		receiver: request.params.receiver.toLowerCase(),
		title: request.params.title,
		description: request.params.description,
		url: request.params.url,
		timestamp: request.params.timestamp,
		signature: request.params.signature,
	};

	let signData = `sender=${data.sender}&topic=${data.topic}&receiver=${data.receiver}&title=${data.title}&description=${data.description}`;
	if (data.url) signData += `&url=${data.url}`;
	if (data.timestamp) signData += `&timestamp=${data.timestamp}`;

	const sig = web3.eth.accounts.recover(signData, data.signature).toLowerCase();

	if (sig != data.sender) throw new Error('Invalid signature! ' + sig);

	const config = await Moralis.Config.get({ useMasterKey: true });
	const logger = Moralis.Cloud.getLogger();

	// const data = request.params; // { sender, topic, message, user }

	const User = Moralis.Object.extend('User');
	const query = new Moralis.Query(User);
	query.equalTo('ethAddress', data.receiver);
	const user = await query.first({ useMasterKey: true });
	if (!user) throw new Error('Invalid receiver address!');
	let socials = user.get('socials');
	const email = user.get('email');

	const Subscription = Moralis.Object.extend('Subscription');
	const query2 = new Moralis.Query(Subscription);
	query2.equalTo('user', user);
	query2.equalTo('sender', data.sender);

	const results = await query2.find({ useMasterKey: true });
	logger.info('Subscriptions: ' + JSON.stringify(results));

	if (results.length == 0) throw new Error('No subscription!');

	const Notification = Moralis.Object.extend('Notification');
	const notification = new Notification();
	notification.set('user', user);
	notification.set('sender', data.sender);
	notification.set('topic', data.topic);
	notification.set('title', data.title);
	notification.set('description', data.description);
	notification.set('url', data.url);
	notification.set('timestamp', data.timestamp);
	notification.save(null, { useMasterKey: true });

	if (email) {
		Moralis.Cloud.sendEmail({
			to: email,
			templateId: 'd-7b590450810148858e31732bd658461b',
			dynamic_template_data: {
				title: data.title,
				description: data.description,
				sender: data.sender,
				topic: data.topic,
				url: data.url,
			},
		});
	}

	if (socials.telegram && socials.telegram.userId) {
		const msgData = await handleRequest({
			method: 'GET',
			url: `https://api.telegram.org/bot${config.get(
				'TelegramBotToken'
			)}/sendMessage?chat_id=${
				socials.telegram.userId
			}&parse_mode=MarkdownV2&text=*${data.title}*%0A${data.description}%0A%0A${
				data.sender
			}%20/%20${data.topic} `,
		});
	}
	if (socials.discord && socials.discord.channelId) {
		const embedData = {
			type: 'rich',
			title: data.title,
			description: data.description,
			color: 0x3772de,
			footer: {
				text: `${data.sender} / ${data.topic}`,
			},
		};
		if (data.url) embedData.url = data.url;
		if (data.timestamp) embedData.timestamp = data.timestamp;

		const msgData = await handleRequest({
			method: 'POST',
			url: `https://discordapp.com/api/v8/channels/${socials.discord.channelId}/messages`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bot ${config.get('DiscordBotToken')}`,
			},
			body: JSON.stringify({
				content: request.params.message,
				embeds: [embedData],
			}),
		});
	}
});

Moralis.Cloud.define('sendToTopic', async (request) => {
	const web3 = Moralis.web3ByChain('0xa86a');

	const data = {
		sender: request.params.sender.toLowerCase(),
		topic: request.params.topic,
		title: request.params.title,
		description: request.params.description,
		url: request.params.url,
		timestamp: request.params.timestamp,
		signature: request.params.signature,
	};

	let signData = `sender=${data.sender}&topic=${data.topic}&title=${data.title}&description=${data.description}`;
	if (data.url) signData += `&url=${data.url}`;
	if (data.timestamp) signData += `&timestamp=${data.timestamp}`;
	const sig = web3.eth.accounts.recover(signData, data.signature).toLowerCase();

	if (sig != data.sender) throw new Error('Invalid signature! ' + sig);

	const config = await Moralis.Config.get({ useMasterKey: true });
	const logger = Moralis.Cloud.getLogger();

	// const data = request.params; // { sender, topic, message }

	const Subscription = Moralis.Object.extend('Subscription');
	const query2 = new Moralis.Query(Subscription);
	query2.equalTo('topic', data.topic);
	query2.equalTo('sender', data.sender);

	const results = await query2.find({ useMasterKey: true });
	// logger.info('Subscriptions: ' + JSON.stringify(results));

	if (results.length == 0) throw new Error('No subscription!');

	results.forEach(async (subscription) => {
		const receiver = subscription.get('user', { useMasterKey: true });
		logger.info('Receiver: ' + JSON.stringify(receiver));

		const User = Moralis.Object.extend('User');
		const userQuery = new Moralis.Query(User);
		userQuery.equalTo('objectId', receiver.id);

		const user = await userQuery.first({ useMasterKey: true });
		const socials = user.get('socials');
		const email = user.get('email');

		logger.info('Subscriptions: ' + JSON.stringify(socials));

		const Notification = Moralis.Object.extend('Notification');
		const notification = new Notification();
		notification.set('user', user);
		notification.set('sender', data.sender);
		notification.set('topic', data.topic);
		notification.set('title', data.title);
		notification.set('description', data.description);
		notification.set('url', data.url);
		notification.set('timestamp', data.timestamp);
		notification.save(null, { useMasterKey: true });

		if (email) {
			Moralis.Cloud.sendEmail({
				to: email,
				templateId: 'd-7b590450810148858e31732bd658461b',
				dynamic_template_data: {
					title: data.title,
					description: data.description,
					sender: data.sender,
					topic: data.topic,
					url: data.url,
				},
			});
		}

		if (socials.telegram && socials.telegram.userId) {
			const msgData = await handleRequest({
				method: 'GET',
				url: `https://api.telegram.org/bot${config.get(
					'TelegramBotToken'
				)}/sendMessage?chat_id=${
					socials.telegram.userId
				}&parse_mode=MarkdownV2&text=*${data.title}*%0A${
					data.description
				}%0A%0A${data.sender}%20/%20${data.topic} `,
			});
		}
		if (socials.discord && socials.discord.channelId) {
			const embedData = {
				type: 'rich',
				title: data.title,
				description: data.description,
				color: 0x3772de,
				footer: {
					text: `${data.sender} / ${data.topic}`,
				},
			};
			if (data.url) embedData.url = data.url;
			if (data.timestamp) embedData.timestamp = data.timestamp;

			await handleRequest({
				method: 'POST',
				url: `https://discordapp.com/api/v8/channels/${socials.discord.channelId}/messages`,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bot ${config.get('DiscordBotToken')}`,
				},
				body: JSON.stringify({
					content: request.params.message,
					embeds: [embedData],
				}),
			});
		}
	});
});

Moralis.Cloud.define('subscribe', async (request) => {
	const web3 = Moralis.web3ByChain('0xa86a');

	const data = {
		sender: request.params.sender.toLowerCase(),
		topic: request.params.topic,
		receiver: request.params.receiver.toLowerCase(),
		platform: request.params.platform,
		signature: request.params.signature,
	};

	const signData = `sender=${data.sender}&topic=${data.topic}&receiver=${data.receiver}&platform=${data.platform}`;

	const sig = web3.eth.accounts.recover(signData, data.signature).toLowerCase();

	if (sig != data.receiver) throw new Error('Invalid signature! ' + sig);

	// const data = request.params; // { platform, sender, topic }
	const User = Moralis.Object.extend('User');
	const query = new Moralis.Query(User);
	query.equalTo('ethAddress', data.receiver);
	const user = await query.first({ useMasterKey: true });

	const Subscription = Moralis.Object.extend('Subscription');
	const subQuery = new Moralis.Query(Subscription);
	subQuery.equalTo('user', user);
	subQuery.equalTo('topic', data.topic);
	subQuery.equalTo('sender', data.sender);
	const subResult = await subQuery.find({ useMasterKey: true });
	if (subResult.length > 0) throw new Error('Already subscribed!');

	const subscription = new Subscription();
	subscription.set('user', user);
	subscription.set('sender', data.sender.toLowerCase());
	subscription.set('topic', data.topic);
	subscription.set('platform', data.platform);
	await subscription.save(null, { useMasterKey: true });
});

Moralis.Cloud.define('registerDapp', async (request) => {
	const data = {
		name: request.params.name,
		icon: request.params.icon,
		url: request.params.url,
		address: request.params.address.toLowerCase(),
	};

	const Dapp = Moralis.Object.extend('Dapp');
	const dapp = new Dapp();
	dapp.set('name', data.name);
	dapp.set('icon', data.icon);
	dapp.set('url', data.url);
	dapp.set('address', data.address);
	dapp.save(null, { useMasterKey: true });
});

Moralis.Cloud.define(
	'telegramVerify',
	async (request) => {
		const logger = Moralis.Cloud.getLogger();

		const data = request.params.data;
		const config = await Moralis.Config.get({ useMasterKey: true });
		const token = crypto
			.createHash('sha256')
			.update(config.get('TelegramBotToken'))
			.digest();
		const hmac = crypto.createHmac('sha256', token);
		let str = `auth_date=${data.auth_date}`;
		if (data.first_name) str += `\nfirst_name=${data.first_name}`;
		if (data.id) str += `\nid=${data.id}`;
		if (data.last_name) str += `\nlast_name=${data.last_name}`;
		if (data.photo_url) str += `\nphoto_url=${data.photo_url}`;
		if (data.username) str += `\nusername=${data.username}`;
		hmac.update(str);
		if (hmac.digest('hex') + '' == data.hash) {
			const User = Moralis.Object.extend('User');
			const query = new Moralis.Query(User);
			query.equalTo('objectId', request.user.id);
			const user = await query.first({ useMasterKey: true });
			let socials = user.get('socials');
			if (!socials) socials = {};
			user.set('socials', {
				...socials,
				telegram: {
					name: data.first_name + ' ' + data.last_name,
					userId: data.id,
				},
			});
			user.save(null, { useMasterKey: true });
		} else {
			throw new Error('Invalid Telegram Token');
		}
	},
	{
		// fields: ['id', 'first_name', 'last_name', 'username', 'photo_url', 'auth_date' , 'hash'],
		requireUser: true,
	}
);

Moralis.Cloud.define(
	'discordVerify',
	async (request) => {
		const logger = Moralis.Cloud.getLogger();
		const config = await Moralis.Config.get({ useMasterKey: true });
		const code = request.params.code;
		const data = {
			client_id: config.get('DiscordClientId'),
			client_secret: config.get('DiscordClientSecret'),
			grant_type: 'authorization_code',
			redirect_uri: 'http://reindeer.tk/settings',
			code: code,
			scope: 'identify guilds.join',
		};

		const oauthData = await handleRequest({
			method: 'POST',
			url: 'https://discord.com/api/oauth2/token',
			body: data,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			followRedirects: true,
		});

		const userData = await handleRequest({
			url: 'https://discordapp.com/api/v8/users/@me',
			headers: {
				authorization: `${oauthData.token_type} ${oauthData.access_token}`,
			},
			followRedirects: true,
		});

		const joinGuild = await handleRequest({
			method: 'PUT',
			url: `https://discordapp.com/api/v8/guilds/936682497037721630/members/${userData.id}`,
			body: {
				access_token: oauthData.access_token,
			},
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bot ${config.get('DiscordBotToken')}`,
			},
		});

		const channelData = await handleRequest({
			method: 'POST',
			url: 'https://discordapp.com/api/v8/users/@me/channels',
			body: {
				recipient_id: userData.id,
			},
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bot ${config.get('DiscordBotToken')}`,
			},
			followRedirects: true,
		});

		logger.info('User Data : ' + JSON.stringify(userData));
		logger.info('Channel Data : ' + JSON.stringify(channelData));

		const User = Moralis.Object.extend('User');
		const query = new Moralis.Query(User);
		query.equalTo('objectId', request.user.id);
		const user = await query.first({ useMasterKey: true });
		let socials = user.get('socials');
		if (!socials) socials = {};
		user.set('socials', {
			...socials,
			discord: {
				username: userData.username + '#' + userData.discriminator,
				userId: userData.id,
				channelId: channelData.id,
			},
		});
		user.save(null, { useMasterKey: true });
	},
	{
		fields: ['code'],
		requireUser: true,
	}
);
