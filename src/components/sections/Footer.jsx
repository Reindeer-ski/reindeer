import { Flex, Link, useColorModeValue, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Footer = (props) => {
	const bgColor = useColorModeValue('gray.100', 'gray.900');

	return (
		<Flex
			as='nav'
			align='center'
			justify='space-between'
			w='100%'
			p={2}
			px={4}
			shadow='sm'
			bgColor={bgColor}
			pos={'sticky'}
			top={0}>
			<NavLink to='/'>Reindeer</NavLink>

			<VStack align={'start'}>
				<NavLink to='/'>Home</NavLink>
				<NavLink to='/settings'>Settings</NavLink>
			</VStack>
			<VStack align={'start'}>
				<NavLink to='/dapp/all'>All Notifications</NavLink>
				<NavLink to='/explore'>Explore DApps</NavLink>
			</VStack>
			<VStack align={'start'}>
				<NavLink to='/simulate'>Simulate</NavLink>
				<NavLink to='/dapp-register'>Register DApp</NavLink>
			</VStack>
		</Flex>
	);
};

const NavLink = ({ children, to }) => (
	<Link
		as={RouterLink}
		p={2.5}
		to={to}
		rounded={'md'}
		_hover={{
			textDecoration: 'none',
			bg: useColorModeValue('blackAlpha.50', 'whiteAlpha.200'),
		}}>
		{children}
	</Link>
);

export default Footer;
