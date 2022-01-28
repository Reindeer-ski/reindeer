import { extendTheme } from '@chakra-ui/react';

const config = {
	initialColorMode: 'system',
	useSystemColorMode: true,
	colors: {},
};

const theme = extendTheme({ config });

export default theme;
