import { Text, Heading, Image, Flex } from '@chakra-ui/react';
import Page from '../components/layouts/Page';

const Landing = () => {
	return (
		<Page>
			<Flex flexDirection='column' align='center' justify='center'>
				<Image
					src='https://i.imgur.com/PdMXZcU.png'
					alt='Rudolf'
					boxSize='sm'
				/>
				<Heading as='h1' size='2xl' width={'100%'} textAlign='center'>
					Reindeer.Ski
				</Heading>
				<Text width={'100%'} textAlign='center'>
					Notifications for all your DApps
				</Text>
			</Flex>
		</Page>
	);
};

export default Landing;
