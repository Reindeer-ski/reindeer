import {
	Text,
	Heading,
	Divider,
	VStack,
	useColorModeValue,
	Box,
	Link,
} from '@chakra-ui/react';
import Page from '../components/layouts/Page';
import { NavLink } from '../components/sections/Navbar/Links';
import { Link as RouterLink } from 'react-router-dom';

const Landing = () => {
	return (
		<Page>
			<Heading as='h1' size='xl' textAlign='center'>
				Dashboard
			</Heading>
			<Divider></Divider>
			<Box>
				<Heading as='h2' size='lg' my='10' textAlign={'center'}>
					Recent Notifications
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
					<Text>Hello</Text>
					<Link as={RouterLink} to={'/all'} size='sm' ml='auto' mb={-5}>
						All Notifications
					</Link>
				</VStack>
			</Box>
		</Page>
	);
};

export default Landing;
