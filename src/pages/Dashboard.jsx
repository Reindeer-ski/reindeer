import {
	Heading,
	VStack,
	useColorModeValue,
	Box,
	Link,
	HStack,
} from '@chakra-ui/react';
import Page from '../components/layouts/Page';
import { Link as RouterLink } from 'react-router-dom';
import NotifCard from '../components/NotifCard';
import DAppCardLayout from '../components/DAppCardLayout';
import { InternalLink } from '../components/Links';
import { useMoralisCloudFunction } from 'react-moralis';

const Dashboard = () => {
	const { data, isLoading } = useMoralisCloudFunction('getNotifications');
	const { data: subs } = useMoralisCloudFunction('getSubscriptions');

	window.subs = subs;

	return (
		<Page>
			<Box>
				<Heading as='h2' size='lg' my='5' textAlign={'center'}>
					Recent Notifications
				</Heading>
				<VStack
					spacing={5}
					my='10'
					mx='auto'
					py={10}
					px={6}
					maxW={{ base: '100%', sm: '80ch' }}
					bg={useColorModeValue('gray.50', 'gray.700')}
					borderRadius='md'>
					{data?.map((notif, idx) => (
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

					<Link
						as={RouterLink}
						color='blue.400'
						to={'/dapp/0xall'}
						size='sm'
						ml='auto'
						mb={-5}>
						All Notifications
					</Link>
				</VStack>
				{/* Your Dapps */}
				<Heading as='h2' size='lg' my='5' textAlign={'center'}>
					Your DApps
				</Heading>
				<HStack spacing={5} align='center' overflow={'auto'} mt='5'>
					{subs?.map((sub, idx) => (
						<DAppCardLayout
							key={idx}
							name={sub?.senderDetails[0]?.name}
							address={sub?.senderDetails[0]?.address}
							imageURL={sub?.senderDetails[0]?.icon}>
							<InternalLink
								to={`/dapp/${sub?.senderDetails[0]?.address}`}
								{...getInternalLinkProps(1)}>
								View Notifications
							</InternalLink>
						</DAppCardLayout>
					))}
				</HStack>
			</Box>
		</Page>
	);
};
const getInternalLinkProps = (newNotifs) => {
	return {
		fontSize: 'sm',
		position: 'relative',
		_after: () =>
			newNotifs && {
				content: '""',
				display: 'block',
				width: '0.25rem',
				height: '0.25rem',
				borderRadius: '50%',
				backgroundColor: 'red.500',
				position: 'absolute',
				top: '1',
				right: '-2',
			},
	};
};

export default Dashboard;
