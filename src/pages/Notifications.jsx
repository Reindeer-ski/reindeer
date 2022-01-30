import { Heading, Box } from '@chakra-ui/react';
import Page from '../components/layouts/Page';
import { useParams } from 'react-router-dom';
import NotifCard from '../components/NotifCard';
import { useMoralisCloudFunction } from 'react-moralis';

const Notifications = () => {
	const { address: dAppAddress } = useParams();
	// Cloud function to fetch notifications for dAppAddress
	const {
		data: notifications,
		isLoading,
		error,
	} = useMoralisCloudFunction('getNotifications', { dAppAddress });
	return (
		<Page>
			<Heading as='h1' size='xl' textAlign='center'>
				Notifications for {dAppAddress}
			</Heading>

			<Box>
				<NotifCard
					title='title'
					desc='description'
					icon='https://www.newsbtc.com/wp-content/uploads/2020/09/dhedge-img.png'
					cta='button'
					time='11/11/11'
					senderName='dHedge'
					senderAdd='0x123123123123'
				/>
			</Box>
		</Page>
	);
};

export default Notifications;
