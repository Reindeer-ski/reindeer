import { HStack, Text, Box, Stack } from '@chakra-ui/react';
import DeleteConnection from '../Connections/DeleteConnection';

const ConnectionLayout = ({ children, connectionName }) => {
	return (
		<Stack
			direction={['column', 'row']}
			w={'100%'}
			spacing='5'
			wrap='wrap'
			justify='center'>
			<Text
				minW='15ch'
				textAlign={'center'}
				sx={{ textTransform: 'capitalize' }}>
				{connectionName}
			</Text>
			<HStack spacing={5}>
				<Box w={'25ch'}>{children}</Box>
				<DeleteConnection connectionName={connectionName} />
			</HStack>
		</Stack>
	);
};

export default ConnectionLayout;
