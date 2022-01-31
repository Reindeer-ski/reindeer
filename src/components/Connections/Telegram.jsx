import TelegramLoginButton from 'react-telegram-login';
import { Alert, AlertIcon, useToast } from '@chakra-ui/react';
import { useMoralisCloudFunction, useMoralis } from 'react-moralis';
import ConnectionLayout from '../layouts/ConnectionLayout';

const Telegram = () => {
	const toast = useToast();
	const { refetchUserData, user } = useMoralis();
	const {
		fetch: telegramVerify,
		data: telegramVerifyResult,
		error: telegramError,
		isLoading: veryfingtelegram,
	} = useMoralisCloudFunction('telegramVerify', {}, { autoFetch: false });

	const handleTelegramResponse = (response) => {
		console.log(response);
		telegramVerify({
			onError: (err) =>
				toast({
					title: `Error`,
					description: err.message,
					status: 'error',
					// duration: 5000,
					isClosable: true,
				}),
			onSuccess: (data) => {
				toast({
					title: 'Success',
					description: 'Telegram account verified',
					status: 'success',
					// duration: 5000,
					isClosable: true,
				});
				refetchUserData();
			},
			params: { data: response },
		});
	};
	return (
		<ConnectionLayout connectionName={'telegram'}>
			{user?.get('socials')?.telegram ? (
				<Alert status='success' rounded='md' fontSize='sm'>
					<AlertIcon />
					Connected {user.get('socials').telegram.userId}
				</Alert>
			) : (
				<TelegramLoginButton
					disabled={veryfingtelegram}
					dataOnauth={handleTelegramResponse}
					botName='ReindeerSkiBot'
				/>
			)}
		</ConnectionLayout>
	);
};

export default Telegram;
