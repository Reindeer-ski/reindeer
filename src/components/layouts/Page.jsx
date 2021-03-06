import { Stack } from '@chakra-ui/react';

const Page = (props) => {
	return (
		<Stack
			direction={'column'}
			minH='calc(100vh - 11rem)'
			maxW={{ xl: '1300px' }}
			w='100%'
			overflowX={'hidden'}
			justify={['center', 'flex-start']}
			py='3rem'
			px='1.5rem'
			{...props}>
			{props.children}
		</Stack>
	);
};

export default Page;
