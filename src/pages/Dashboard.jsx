import {
	Heading,
	VStack,
	useColorModeValue,
	Box,
	Link,
	HStack,
} from '@chakra-ui/react';
import Page from '../components/layouts/Page';
import { NavLink } from '../components/sections/Navbar/Links';
import { Link as RouterLink } from 'react-router-dom';
import DAppCard from '../components/DAppCard';
import NotifCard from '../components/NotifCard';

const Landing = () => {
	return (
		<Page>
			{/* <Heading as='h1' size='xl' textAlign='center'>
				Dashboard
			</Heading>
			<Divider></Divider> */}

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
					<DAppCard
						name={'Snowball'}
						address='0x'
						newNotifs={1}
						imageURL={
							'https://pbs.twimg.com/profile_images/1471064848876425224/N40TS_20_400x400.png'
						}></DAppCard>
					<DAppCard
						name={'UniSwap'}
						address='0x'
						imageURL={
							'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Uniswap_Logo.svg/1026px-Uniswap_Logo.svg.png'
						}></DAppCard>
					<DAppCard
						name={'dHEDGE'}
						address='0x'
						imageURL={
							'https://www.newsbtc.com/wp-content/uploads/2020/09/dhedge-img.png'
						}></DAppCard>
				</HStack>
			</Box>
		</Page>
	);
};

export default Landing;
