import {
	Heading,
	Center,
	Box,
	useColorModeValue,
	Stack,
} from '@chakra-ui/react';
import ProductImage from './ProductImage';

const DAppCardLayout = ({ imageURL, children, name }) => {
	return (
		<Center py={6} minW={'200px'}>
			<Box
				border={'1px solid'}
				borderColor={useColorModeValue('gray.100', 'blue.800')}
				role={'group'}
				p={6}
				maxW={'200px'}
				w={'full'}
				bg={useColorModeValue('white', 'blackAlpha.500')}
				boxShadow={'xl'}
				rounded={'lg'}
				pos={'relative'}
				zIndex={1}>
				<ProductImage imageURL={imageURL} />
				<Stack pt={10} align={'center'}>
					<Heading fontSize={'lg'} fontWeight={500}>
						{name}
					</Heading>

					{children}
				</Stack>
			</Box>
		</Center>
	);
};

export default DAppCardLayout;
