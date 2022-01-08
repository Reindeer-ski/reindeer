Moralis.Cloud.define('telegramHandler000qdbwfn', async (request) => {
	const logger = Moralis.Cloud.getLogger();
	logger.info('Request : ' + JSON.stringify(request));
	// const config = await Moralis.Config.get({ useMasterKey: true });

	return;
});

Moralis.Cloud.define('discordAuthUrl', async (request) => {
	const config = await Moralis.Config.get({ useMasterKey: true });
	return (
		`https://discord.com/api/oauth2/authorize?client_id=` +
		config.get('DiscordClientId') +
		`&redirect_uri=https%3A%2F%2Ficcm6faz4mrf.usemoralis.com%3A2053%2Fserver%2Ffunctions%2FdiscordVerify%3F_ApplicationId%3DoRjAw8xhsrb4mlj90NdhDYJKpR9hOKYoKh0BDWiG&response_type=code&scope=identify`
	);
});

Moralis.Cloud.define('discordVerify', async (request) => {
	const logger = Moralis.Cloud.getLogger();
	// logger.info('Request : ' + JSON.stringify(request.params));

	const config = await Moralis.Config.get({ useMasterKey: true });
	logger.info('DiscordClientId : ' + config.get('DiscordClientId'));
	const code = request.params.code;
	logger.info('Code : ' + code);
	const data = {
		client_id: config.get('DiscordClientId'),
		client_secret: config.get('DiscordClientSecret'),
		grant_type: 'authorization_code',
		redirect_uri:
			'https://iccm6faz4mrf.usemoralis.com:2053/server/functions/discordVerify?_ApplicationId=oRjAw8xhsrb4mlj90NdhDYJKpR9hOKYoKh0BDWiG',
		code: code,
		scope: 'identify',
	};

	Moralis.Cloud.httpRequest({
		method: 'POST',
		url: 'https://discord.com/api/oauth2/token',
		body: data,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		followRedirects: true,
	}).then(
		function (httpResponse) {
			// success
			const data = httpResponse.data;
			logger.info('Request success : ' + JSON.stringify(data));
			Moralis.Cloud.httpRequest({
				url: 'https://discordapp.com/api/v8/users/@me',
				headers: {
					authorization: `${data.token_type} ${data.access_token}`,
				},
				followRedirects: true,
			}).then(
				function (httpResponse) {
					// success
					const data = httpResponse.data;
					logger.info('Request success : ' + JSON.stringify(data));
					Moralis.Cloud.httpRequest({
						method: 'POST',
						url: 'https://discordapp.com/api/v8/users/@me/channels',
						body: {
							recipient_id: data.id,
						},
						headers: {
							authorization: `Bot ${config.get('DiscordBotToken')}`,
						},
						followRedirects: true,
					}).then(
						function (httpResponse) {
							// success
							const data = httpResponse.data;
							logger.info('Request success : ' + JSON.stringify(data));
							return data;
						},
						function (httpResponse) {
							// error
							logger.info(
								'User Request failed : ' +
									JSON.stringify({
										status: httpResponse.status,
										data: httpResponse.data,
									})
							);
						}
					);
				},
				function (httpResponse) {
					// error
					logger.info(
						'User Request failed : ' +
							JSON.stringify({
								status: httpResponse.status,
								data: httpResponse.data,
							})
					);
				}
			);
		},
		function (httpResponse) {
			// error
			logger.info(
				'Token Request failed : ' +
					JSON.stringify({
						status: httpResponse.status,
						data: httpResponse.data,
					})
			);
		}
	);
});
