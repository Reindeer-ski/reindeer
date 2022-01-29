import { extendTheme } from '@chakra-ui/react';

const config = {
	initialColorMode: 'system',
	useSystemColorMode: false,
	colors: {},
};

const theme = extendTheme({ config });

export default theme;
