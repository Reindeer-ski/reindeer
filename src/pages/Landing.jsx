import { Text, Heading } from '@chakra-ui/react';
import Page from '../components/layouts/Page';

const Landing = () => {
	return (
		<Page>
			<Heading as='h1' size='2xl'>
				Reindeer.Ski
			</Heading>
			<Text>Notifications for all your DApps</Text>
		</Page>
	);
};

export default Landing;
