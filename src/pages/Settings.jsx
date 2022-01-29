import {
	Heading,
	Box,
	Divider,
	VStack,
	Code,
	Avatar,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import Page from '../components/layouts/Page';
import { useMoralis } from 'react-moralis';
import Discord from '../components/Connections/Discord';
import Telegram from '../components/Connections/Telegram';
import makeBlockie from 'ethereum-blockies-base64';

const Settings = () => {
	const { user, Moralis } = useMoralis();
	window.Moralis = Moralis;

	return (
		<Page>
			<Heading as='h1' size='xl' textAlign='center'>
				Settings
			</Heading>

			<Box>
				{/* <Heading as='h2' size='md' my='10'>
					General
				</Heading> */}
				<VStack
					spacing={10}
					my='10'
					mx='auto'
					py={10}
					maxW={'80ch'}
					bg={useColorModeValue('gray.50', 'gray.700')}
					borderRadius='md'>
					<Avatar
						size={'lg'}
						src={makeBlockie(user?.get('ethAddress') || '0x')}
					/>
					<Text>{user?.get('ethAddress')}</Text>
				</VStack>
				<Divider />
				{/* Connections */}
				<Heading as='h2' size='lg' my='10' textAlign={'center'}>
					Connections
				</Heading>

				<VStack
					spacing={10}
					my='10'
					mx='auto'
					py={10}
					px={6}
					maxW={'80ch'}
					bg={useColorModeValue('gray.50', 'gray.700')}
					borderRadius='md'>
					<Discord />
					<Telegram />
				</VStack>

				{/* <Code size={'sm'} as='pre' mt={10}>
					{JSON.stringify(user, null, 2)}
				</Code> */}
			</Box>
		</Page>
	);
};

export default Settings;
