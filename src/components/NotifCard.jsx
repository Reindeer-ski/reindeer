import {
	Text,
	Heading,
	useColorModeValue,
	Box,
	Link,
	Image,
	Grid,
	GridItem,
	IconButton,
	Center,
	Button,
} from '@chakra-ui/react';
import { RiDeleteBin6Fill as Del } from 'react-icons/ri';

const NotifCard = ({ title, desc, icon, time, cta, senderName, senderAdd }) => {
	return (
		<Box
			w={'100%'}
			color={useColorModeValue('black', 'white')}
			px={5}
			border={'2px solid'}
			bg={useColorModeValue('white', 'blackAlpha.500')}
			borderColor={useColorModeValue('gray.100', 'blue.800')}
			boxShadow={'lg'}
			rounded={'lg'}>
			<Grid
				templateRows='repeat(3, 1fr)'
				templateColumns={{ base: 'repeat(5,1fr)', md: 'repeat(15, 1fr)' }}
				p={1}
				gap={3}>
				<GridItem rowSpan={{ base: 2, md: 3 }} colSpan={{ base: 1, md: 2 }}>
					<Image
						boxSize={{ base: '40px', md: '60px' }}
						objectFit='cover'
						src={icon}
						alt={senderName}
						borderRadius='sm'
						m='auto'
						mt={{ base: '10px', md: '20px' }}
					/>
				</GridItem>
				<GridItem rowSpan={2} colSpan={{ base: 4, md: 12 }} mt={2}>
					<Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight='bold'>
						{title}
					</Text>
					<Text fontSize='xs'>{desc}</Text>
				</GridItem>

				<GridItem rowSpan={1} colSpan={{ base: 1, md: 2 }} mt={-1}>
					<Text fontSize='sm' color='gray.500' fontWeight='bold'>
						{senderName}
					</Text>
				</GridItem>
				<GridItem
					rowSpan={1}
					colSpan={{ base: 2, md: 9 }}
					mt={-1}
					display={{ base: 'none', md: 'block' }}>
					<Text fontSize='sm' color='gray.500'>
						{senderAdd}
					</Text>
				</GridItem>
				<GridItem
					rowSpan={1}
					colSpan={1}
					rowStart={3}
					rowEnd={4}
					colStart={{ base: 1, md: 14 }}
					colEnd={{ base: 2, md: 15 }}
					mt={-2}>
					<Button colorScheme='blue' variant='outline' size='xs'>
						{cta}
					</Button>
				</GridItem>
				<GridItem
					rowStart={{ base: 3, md: 1 }}
					rowEnd={{ base: 4, md: 2 }}
					colStart={{ base: 3, md: 15 }}
					colEnd={{ base: 4, md: 16 }}
					mt={{ base: 0, md: 2 }}>
					<Text fontSize='xs' color='gray.500'>
						{time}
					</Text>
				</GridItem>
				<GridItem rowStart={3} colStart={{ base: 5, md: 15 }} mt={-3}>
					<IconButton
						icon={<Del fill='tomato' />}
						variant={'ghost'}
						aria-label={'Delete Notification'}
					/>
				</GridItem>
			</Grid>
		</Box>
	);
};

export default NotifCard;
