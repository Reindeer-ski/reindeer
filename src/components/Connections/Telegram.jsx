import TelegramLoginButton from 'react-telegram-login';
import { HStack, Text, Box, useToast, IconButton } from '@chakra-ui/react';
import { useMoralisCloudFunction } from 'react-moralis';
import { HiOutlineTrash } from 'react-icons/hi';

const Telegram = () => {
	const toast = useToast();
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
			},
			params: { data: response },
		});
	};
	return (
		<HStack spacing={4}>
			<Text w='15ch'>Telegram</Text>
			<Box w={'30ch'}>
				<TelegramLoginButton
					disabled={veryfingtelegram}
					dataOnauth={handleTelegramResponse}
					botName='ReindeerSkiBot'
				/>
			</Box>
			<IconButton
				variant='outline'
				icon={<HiOutlineTrash />}
				color='red.500'
				aria-label='disconnect discord'
			/>
		</HStack>
	);
};

export default Telegram;
