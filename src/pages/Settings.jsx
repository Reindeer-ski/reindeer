import { Heading, Box, Divider, VStack, Code } from '@chakra-ui/react';
import Page from '../components/layouts/Page';
import { useMoralis } from 'react-moralis';
import Discord from '../components/Connections/Discord';
import Telegram from '../components/Connections/Telegram';

const Settings = () => {
	const { user, Moralis } = useMoralis();
	window.Moralis = Moralis;

	return (
		<Page>
			<Heading as='h1' size='xl'>
				Settings
			</Heading>
			<Divider />
			<Box>
				<Heading as='h2' size='md' my='10'>
					Social Connections
				</Heading>
				<VStack spacing={10} alignItems='flex-start' my='10'>
					<Discord />
					<Telegram />
				</VStack>

				<Code size={'sm'} as='pre' mt={10}>
					{JSON.stringify(user, null, 2)}
				</Code>
			</Box>
		</Page>
	);
};

export default Settings;
