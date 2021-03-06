import {
	Flex,
	useColorModeValue,
	HStack,
	useDisclosure,
	IconButton,
	VStack,
	Text,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import UserMenu from './UserMenu';
import { ExternalLink, NavLink } from './Links';
import { VscClose } from 'react-icons/vsc';
import { RiMenu5Fill } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = (props) => {
	const bgColor = useColorModeValue('white', 'gray.900');
	const { isOpen, onToggle } = useDisclosure();
	return (
		<>
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
				wrap='wrap'
				zIndex={999}>
				<NavLink to='/'>
					<Text fontSize='lg' fontWeight='bold'>
						Reindeer.ski
					</Text>
				</NavLink>

				<HStack display={{ base: 'none', sm: 'flex' }}>
					<NavLink to='/'>Home</NavLink>
					<NavLink to='/dashboard'>Dashboard</NavLink>
					<NavLink to='/explore'>Explore</NavLink>
				</HStack>
				<HStack>
					<ColorModeSwitcher />
					<UserMenu />
					<IconButton
						onClick={onToggle}
						icon={isOpen ? null : <RiMenu5Fill />}
						variant={'ghost'}
						aria-label={'Toggle Navigation'}
						display={{ base: 'flex', sm: 'none' }}
					/>
				</HStack>
			</Flex>
			<AnimatePresence>
				{isOpen && <MobileNav onToggle={onToggle} />}
			</AnimatePresence>
		</>
	);
};
const MotionVStack = motion(VStack);

const MobileNav = ({ onToggle }) => {
	return (
		<>
			<MotionVStack
				display={{ base: 'flex', sm: 'none' }}
				bg={useColorModeValue('blue.50', 'gray.900')}
				p={4}
				justify='center'
				sx={{
					width: '100vw',
					position: 'fixed',
					left: 0,
					top: 0,
					height: '100vh',
					zIndex: 999,
				}}
				duration={0.1}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}>
				<NavLink to='/'>Reindeer.ski</NavLink>

				<NavLink
					to='/'
					display='block'
					textAlign='center'
					width='100%'
					onClick={onToggle}>
					Home
				</NavLink>
				<NavLink
					to='/explore'
					display='block'
					width='100%'
					textAlign='center'
					onClick={onToggle}>
					Explore
				</NavLink>
				<NavLink
					to='/dashboard'
					display='block'
					width='100%'
					textAlign='center'
					onClick={onToggle}>
					Dashboard
				</NavLink>
				<NavLink
					to='/settings'
					display='block'
					textAlign='center'
					width='100%'
					onClick={onToggle}>
					Settings
				</NavLink>
			</MotionVStack>
			<IconButton
				onClick={onToggle}
				icon={<VscClose />}
				variant={'ghost'}
				aria-label={'Toggle Navigation'}
				display={{ base: 'flex', md: 'none' }}
				position='fixed'
				right={4}
				top={3}
				zIndex='1001'
			/>
		</>
	);
};

export default Navbar;
