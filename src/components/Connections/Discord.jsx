import {
	Button,
	Box,
	useToast,
	HStack,
	Text,
	IconButton,
} from '@chakra-ui/react';
import { useMoralisCloudFunction } from 'react-moralis';
import OauthPopup from 'react-oauth-popup';
import { HiOutlineTrash } from 'react-icons/hi';

const DISCORD_AUTH_URL =
	'https://discord.com/api/oauth2/authorize?client_id=928739406339248138&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&scope=identify%20guilds.join';

const Discord = () => {
	const toast = useToast();

	const onCode = async (code) => {
		console.log('code', code);
		discordVerify({
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
					description: 'Discord account verified',
					status: 'success',
					// duration: 5000,
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
		<HStack spacing={4}>
			<Text w='15ch'>Discord</Text>
			<Box w={'30ch'}>
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

export default Discord;
