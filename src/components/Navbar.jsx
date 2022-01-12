import { ColorModeSwitcher } from './ColorModeSwitcher';
import {
	Flex,
	Link,
	useColorModeValue,
	IconButton,
	Avatar,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	Center,
	Image,
	HStack,
} from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = (props) => {
	const bgColor = useColorModeValue('white.50', 'gray.900');
	return (
		<Flex
			as="nav"
			align="center"
			justify="space-between"
			w="100%"
			p={2}
			px={4}
			shadow="sm"
			bgColor={bgColor}
			pos={'sticky'}
			top={0}>
			<NavLink to="/">Reindeer</NavLink>
			<HStack>
				<NavLink to="/">Home</NavLink>
				<NavLink to="/about">About</NavLink>
			</HStack>
			<HStack>
				<Menu>
					<MenuButton
						as={IconButton}
						size="md"
						fontSize="xl"
						aria-label={`Notifications`}
						variant="ghost"
						color={'current'}
						icon={<BellIcon />}
						_after={{
							content: '""',
							display: 'block',
							width: '0.5rem',
							height: '0.5rem',
							borderRadius: '50%',
							backgroundColor: 'red.500',
							position: 'absolute',
							top: '0.5rem',
							right: '0.5rem',
						}}
					/>

					<MenuList w={'xs'}>
						<MenuItem>
							<Image
								boxSize="2rem"
								borderRadius="full"
								src="https://placekitten.com/100/100"
								alt="Fluffybuns the destroyer"
								mr="12px"
							/>
							Notif 1
						</MenuItem>
					</MenuList>
				</Menu>

				<ColorModeSwitcher justifySelf="flex-end" />
				<Menu>
					<MenuButton
						as={Button}
						rounded={'full'}
						variant={'link'}
						cursor={'pointer'}
						minW={0}>
						<Avatar
							size={'sm'}
							src={'https://avatars.dicebear.com/api/male/username.svg'}
						/>
					</MenuButton>
					<MenuList alignItems={'center'} boxShadow={'lg'}>
						<Center my={'1rem'}>
							<Avatar
								size={'xl'}
								src={'https://avatars.dicebear.com/api/male/username.svg'}
							/>
						</Center>
						<Center my={'1rem'}>
							<p>Username</p>
						</Center>
						<MenuDivider />
						<MenuItem> Settings</MenuItem>
						<MenuItem>Logout</MenuItem>
					</MenuList>
				</Menu>
			</HStack>
		</Flex>
	);
};
const NavLink = ({ children, to }) => (
	<RouterLink to={to}>
		<Link
			p={2.5}
			rounded={'md'}
			_hover={{
				textDecoration: 'none',
				bg: useColorModeValue('blackAlpha.50', 'whiteAlpha.200'),
			}}>
			{children}
		</Link>
	</RouterLink>
);

export default Navbar;
