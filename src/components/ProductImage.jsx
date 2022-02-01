import { Box, Image } from '@chakra-ui/react';

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
export default ProductImage;
