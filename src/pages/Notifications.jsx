import { Heading, Box, Flex } from '@chakra-ui/react';
import Page from '../components/layouts/Page';
import { useParams } from 'react-router-dom';
import NotifCard from '../components/NotifCard';
import { useMoralisCloudFunction } from 'react-moralis';

const Notifications = () => {
	const { address: dAppAddress } = useParams();
	const { data } = useMoralisCloudFunction('getNotifications', {
		sender: dAppAddress === '0xall' ? null : dAppAddress,
	});

	return (
		<Page>
			<Heading as='h1' size='xl' textAlign='center'>
				Notifications from {dAppAddress}
			</Heading>
			<Flex align='center' justify='center'>
				<Box width={{ base: '100%', sm: '80%' }} mt={5}>
					{data &&
						[...data]
							?.reverse()
							?.map((notif, idx) => (
								<NotifCard
									key={idx}
									title={notif?.title}
									desc={notif?.description}
									time={notif?.createdAt}
									notifUrl={notif?.url}
									icon={notif?.senderDetails[0]?.icon}
									dappName={notif?.senderDetails[0]?.name}
									dappAdd={notif?.senderDetails[0]?.address}
									dappUrl={notif?.senderDetails[0]?.url}
								/>
							))}
				</Box>
			</Flex>
		</Page>
	);
};

export default Notifications;
