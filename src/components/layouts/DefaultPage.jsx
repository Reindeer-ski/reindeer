import { Flex } from '@chakra-ui/react';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';

const DefaultPage = (props) => {
	return (
		<Flex
			direction="column"
			align="center"
			maxW={{ xl: '1200px' }}
			minH="100vh"
			m="0 auto"
			{...props}>
			<Navbar />
			{props.children}
			<Footer />
		</Flex>
	);
};

export default DefaultPage;
