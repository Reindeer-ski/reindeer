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
				templateRows={'repeat(3, 1fr)'}
				templateColumns={'repeat(15, 1fr)'}
				p={1}
				gap={3}>
				<GridItem rowSpan={3} colSpan={2}>
					<Image
						boxSize='60px'
						objectFit='cover'
						src={icon}
						alt={senderName}
						borderRadius='sm'
						m='auto'
						mt='20px'
					/>
				</GridItem>
				<GridItem rowSpan={2} colSpan={12} mt={2}>
					<Text fontSize='xl' fontWeight='bold'>
						{title}
					</Text>
					<Text fontSize='xs'>{desc}</Text>
				</GridItem>

				<GridItem rowSpan={1} colSpan={2} mt={-1}>
					<Text fontSize='sm' color='gray.500' fontWeight='bold'>
						{senderName}
					</Text>
				</GridItem>
				<GridItem rowSpan={1} colSpan={9} mt={-1}>
					<Text fontSize='sm' color='gray.500'>
						{senderAdd}
					</Text>
				</GridItem>
				<GridItem rowSpan={1} colSpan={1} mt={-2}>
					<Button colorScheme='blue' variant='outline' size='xs'>
						{cta}
					</Button>
				</GridItem>
				<GridItem rowStart={1} rowEnd={2} colStart={15} mt={2}>
					<Text fontSize='xs' color='gray.500'>
						{time}
					</Text>
				</GridItem>
				<GridItem rowStart={3} rowEnd={4} colStart={15} mt={-3}>
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
