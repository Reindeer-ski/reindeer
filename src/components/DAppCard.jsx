import {
	Text,
	Heading,
	Center,
	Box,
	Image,
	useColorModeValue,
	Stack,
	Button,
} from '@chakra-ui/react';
import { InternalLink } from './Links';

const DAppCard = ({ name, imageURL, address, newNotifs }) => {
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

					<InternalLink
						fontSize={'sm'}
						position={'relative'}
						to={`/dapp/${address}`}
						_after={
							newNotifs && {
								content: '""',
								display: 'block',
								width: '0.25rem',
								height: '0.25rem',
								borderRadius: '50%',
								backgroundColor: 'red.500',
								position: 'absolute',
								top: '1',
								right: '-2',
							}
						}>
						View Notifications
					</InternalLink>
				</Stack>
			</Box>
		</Center>
	);
};
const ProductImage = ({ imageURL }) => {
	return (
		<Box
			rounded={'lg'}
			mt={-12}
			pos={'relative'}
			height={'150px'}
			_after={{
				transition: 'all .3s ease',
				content: '""',
				w: '60%',
				h: '60%',
				pos: 'absolute',
				bottom: -2,
				left: '50%',
				transform: 'translateX(-50%)',
				backgroundImage: `url(${imageURL})`,
				filter: 'blur(20px)',
				zIndex: -1,
			}}
			_groupHover={{
				_after: {
					filter: 'blur(30px)',
				},
			}}>
			<Image
				rounded={'xl'}
				height={150}
				width={150}
				objectFit={'cover'}
				filter={'drop-shadow(0px 0px 10px #0000001d)'}
				src={imageURL}
			/>
		</Box>
	);
};
export default DAppCard;
