import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Flex, useColorModeValue, HStack } from '@chakra-ui/react';
import Notifications from './Notifications';
import UserMenu from './UserMenu';
import { ExternalLink, NavLink } from './Links';

const Navbar = (props) => {
	const bgColor = useColorModeValue('white', 'gray.900');

	return (
		<Flex
			as='nav'
			align='center'
			justify='space-between'
			w='100%'
			p={2}
			px={4}
			shadow='sm'
			bg={bgColor}
			pos={'sticky'}
			top={0}
			zIndex={999}>
			<NavLink to='/'>Reindeer.ski</NavLink>
			<HStack>
				<NavLink to='/'>Home</NavLink>
				<NavLink to='/settings'>Settings</NavLink>
			</HStack>
			<HStack>
				<Notifications />
				<ColorModeSwitcher justifySelf='flex-end' />
				<UserMenu />
			</HStack>
		</Flex>
	);
};

export default Navbar;
