Moralis.Cloud.define('telegramHandler000qdbwfn', async (request) => {
	const logger = Moralis.Cloud.getLogger();
	logger.info('Request : ' + JSON.stringify(request));
	// const config = await Moralis.Config.get({ useMasterKey: true });

	return;
});

// Moralis.Cloud.define('discordAuthUrl', async (request) => {
// 	const config = await Moralis.Config.get({ useMasterKey: true });
// 	return (
// 		`https://discord.com/api/oauth2/authorize?client_id=` +
// 		config.get('DiscordClientId') +
// 		`&redirect_uri=https%3A%2F%2Ficcm6faz4mrf.usemoralis.com%3A2053%2Fserver%2Ffunctions%2FdiscordVerify%3F_ApplicationId%3DoRjAw8xhsrb4mlj90NdhDYJKpR9hOKYoKh0BDWiG&response_type=code&scope=identify`
// 	);
// });

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
	const User = Moralis.Object.extend('User');
	const query = new Moralis.Query(User);
	query.equalTo('objectId', request.user.id);
	const user = await query.first({ useMasterKey: true });
	const Notifications = Moralis.Object.extend('Notification');
	const query2 = new Moralis.Query(Notifications);
	query2.equalTo('user', user);
	if (request.params.sender) query2.equalTo('sender', request.params.sender);
	query2.descending('createdAt');
	const results = await query2.find({ useMasterKey: true });
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

	const signData = `sender=${data.sender}&topic=${data.topic}&receiver=${data.receiver}&title=${data.title}&description=${data.description}`;
	if (data.url) signData += `&url=${data.url}`;
	if (data.timestamp) signData += `&timestamp=${data.timestamp}`;

	const sig = web3.eth.accounts.recover(signData, data.signature).toLowerCase();

	if (sig != data.receiver) throw new Error('Invalid signature! ' + sig);

	const config = await Moralis.Config.get({ useMasterKey: true });
	const logger = Moralis.Cloud.getLogger();

	// const data = request.params; // { sender, topic, message, user }

	const User = Moralis.Object.extend('User');
	const query = new Moralis.Query(User);
	query.equalTo('ethAddress', data.receiver);
	const user = await query.first({ useMasterKey: true });
	if (!user) throw new Error('Invalid receiver address!');
	let socials = user.get('socials');

	const Subscription = Moralis.Object.extend('Subscription');
	const query2 = new Moralis.Query(Subscription);
	query2.equalTo('user', user);
	query2.equalTo('sender', data.sender);

	const results = await query2.find({ useMasterKey: true });
	logger.info('Subscriptions: ' + JSON.stringify(results));

	if (results.length == 0) throw new Error('No subscription!');

	if (socials.telegram && socials.telegram.userId) {
		const msgData = await handleRequest({
			method: 'GET',
			url: `https://api.telegram.org/bot${config.get(
				'TelegramBotToken'
			)}/sendMessage?chat_id=${socials.telegram.userId}&text=${
				request.params.description
			}`,
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

	const signData = `sender=${data.sender}&topic=${data.topic}&title=${data.title}&description=${data.description}`;
	if (data.url) signData += `&url=${data.url}`;
	if (data.timestamp) signData += `&timestamp=${data.timestamp}`;
	const sig = web3.eth.accounts.recover(signData, data.signature).toLowerCase();

	if (sig != data.receiver) throw new Error('Invalid signature! ' + sig);

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

		logger.info('Subscriptions: ' + JSON.stringify(socials));

		if (socials.telegram && socials.telegram.userId) {
			await handleRequest({
				method: 'GET',
				url: `https://api.telegram.org/bot${config.get(
					'TelegramBotToken'
				)}/sendMessage?chat_id=${socials.telegram.userId}&text=${
					request.params.message
				}`,
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
		address: request.params.address,
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
