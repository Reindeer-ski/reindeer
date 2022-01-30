import {
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
	Button,
	IconButton,
	Text,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import { useMoralis, useMoralisCloudFunction } from 'react-moralis';

const DeleteConnection = ({ connectionName }) => {
	const [isOpen, setIsOpen] = useState(false);
	const { refetchUserData } = useMoralis();

	const onClose = async () => {
		await deleteConnection({ params: { platform: connectionName } });
		refetchUserData();
		setIsOpen(false);
	};

	const cancelRef = useRef();
	const { fetch: deleteConnection } = useMoralisCloudFunction(
		'deleteConnection',
		{},
		{ autoFetch: false }
	);

	return (
		<>
			<IconButton
				variant='outline'
				icon={<HiOutlineTrash />}
				color='red.500'
				aria-label={`disconnect ${connectionName}`}
				onClick={() => setIsOpen(true)}
			/>

			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize='lg' fontWeight='bold'>
							Delete{' '}
							<Text as={'span'} sx={{ textTransform: 'capitalize' }}>
								{connectionName}
							</Text>{' '}
							connection?
						</AlertDialogHeader>

						<AlertDialogBody>
							Are you sure? You can't undo this action afterwards.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								Cancel
							</Button>
							<Button
								colorScheme='red'
								onClick={onClose}
								ml={3}
								aria-label={`disconnect ${connectionName}`}>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
};

export default DeleteConnection;
