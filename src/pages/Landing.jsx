import { Text, Heading } from '@chakra-ui/react';
import Page from '../components/layouts/Page';

const Landing = () => {
	return (
		<Page>
			<Heading as='h3' size='lg'>
				Reindeer Ski
			</Heading>
			<Text>Notifications for all your DApps</Text>
		</Page>
	);
};

export default Landing;
