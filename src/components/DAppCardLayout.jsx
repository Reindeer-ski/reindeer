import {
	Heading,
	Center,
	Box,
	useColorModeValue,
	Flex,
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
				zIndex={1}
				h='300px'>
				<ProductImage imageURL={imageURL} />
				<Flex
					pt={10}
					gap={5}
					justify='space-between'
					flexDirection='column'
					align={'center'}>
					<Heading as='h3' fontSize={'lg'} fontWeight={500}>
						{name}
					</Heading>

					{children}
				</Flex>
			</Box>
		</Center>
	);
};

export default DAppCardLayout;
