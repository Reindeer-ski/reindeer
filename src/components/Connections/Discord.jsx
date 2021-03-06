import { Alert, AlertIcon, Button, useToast } from '@chakra-ui/react';
import { useMoralis, useMoralisCloudFunction } from 'react-moralis';
import OauthPopup from 'react-oauth-popup';
import ConnectionLayout from '../layouts/ConnectionLayout';

const DISCORD_AUTH_URL =
	'https://discord.com/api/oauth2/authorize?client_id=928739406339248138&redirect_uri=https%3A%2F%2Freindeer.tk%2Fsettings&response_type=code&scope=identify%20guilds.join';

const Discord = () => {
	const toast = useToast();
	const { user, refetchUserData } = useMoralis();

	const onCode = async (code) => {
		console.log('code', code);
		discordVerify({
			onError: (err) =>
				toast({
					title: `Error`,
					description: err.message,
					status: 'error',
					duration: 5000,
					isClosable: true,
				}),
			onSuccess: (data) => {
				refetchUserData();
				toast({
					title: 'Success',
					description: 'Discord account verified',
					status: 'success',
					duration: 5000,
					isClosable: true,
				});
			},
			params: { code },
		});
	};
	const onClose = () => {
		console.log('pop up closed');
	};
	const {
		fetch: discordVerify,
		data: discordVerifyResult,
		error: discordError,
		isLoading: veryfingDiscord,
	} = useMoralisCloudFunction('discordVerify', {}, { autoFetch: false });

	return (
		<ConnectionLayout connectionName={'discord'}>
			{user?.get('socials')?.discord ? (
				<Alert status='success' rounded='md' fontSize='sm'>
					<AlertIcon />
					Connected {user.get('socials').discord.username}
				</Alert>
			) : (
				<OauthPopup url={DISCORD_AUTH_URL} onCode={onCode} onClose={onClose}>
					<Button
						flex={1}
						fontSize={'sm'}
						rounded={'full'}
						px={10}
						py={3}
						bg={'blue.400'}
						color={'white'}
						_hover={{
							bg: 'blue.500',
						}}>
						Connect Discord
					</Button>
				</OauthPopup>
			)}
		</ConnectionLayout>
	);
};

export default Discord;
