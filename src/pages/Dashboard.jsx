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
import { useMoralisQuery } from 'react-moralis';

const Dashboard = () => {
	const { data, loading, error } = useMoralisQuery('');
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
					<NotifCard
						title={'Test'}
						desc={'lorem10'}
						time={'11/11/11'}
						cta={'button'}
						icon={
							'https://pbs.twimg.com/profile_images/1471064848876425224/N40TS_20_400x400.png'
						}
						senderName={'UniSwap'}
						senderAdd={'0x12121212'}
					/>

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
					<DAppCardLayout
						name={'Snowball'}
						address='0x'
						imageURL={
							'https://pbs.twimg.com/profile_images/1471064848876425224/N40TS_20_400x400.png'
						}>
						<InternalLink to={`/dapp/0x`} {...getInternalLinkProps(1)}>
							View Notifications
						</InternalLink>
					</DAppCardLayout>
					<DAppCardLayout
						name={'Uniswap'}
						address='0x'
						imageURL={
							'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Uniswap_Logo.svg/1026px-Uniswap_Logo.svg.png'
						}>
						<InternalLink to={`/dapp/0x`} {...getInternalLinkProps(0)}>
							View Notifications
						</InternalLink>
					</DAppCardLayout>
					<DAppCardLayout
						name={'Snowball'}
						address='0x'
						imageURL={
							'https://www.newsbtc.com/wp-content/uploads/2020/09/dhedge-img.png'
						}>
						<InternalLink to={`/dapp/0x`} {...getInternalLinkProps(0)}>
							View Notifications
						</InternalLink>
					</DAppCardLayout>
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
