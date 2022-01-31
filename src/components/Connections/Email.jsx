import {
	Button,
	Input,
	InputGroup,
	InputRightElement,
	useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import ConnectionLayout from '../layouts/ConnectionLayout';

const Email = () => {
	const { user, refetchUserData } = useMoralis();
	const [email, setEmail] = useState('');
	const toast = useToast();

	useEffect(() => {
		setEmail(user?.get('email'));
	}, [user]);

	const handleSubmit = () => {
		// set email in moralis user
		user.set('email', email);
		user
			.save()
			.then((res) => {
				toast({
					title: 'Email saved',
					description: 'Your email has been saved',
					status: 'success',
					duration: 5000,
					isClosable: true,
				});
				refetchUserData();
			})
			.catch((err) => {
				toast({
					title: 'Error',
					description: err.message,
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
			});
	};

	return (
		<ConnectionLayout connectionName={'email'}>
			<InputGroup>
				<Input
					type='email'
					placeholder='rudolph@reindeer.ski'
					pr='6ch'
					value={email}
					onChange={(event) => setEmail(event.target.value)}
				/>
				<InputRightElement width='6ch'>
					<Button size='sm' onClick={handleSubmit}>
						Set
					</Button>
				</InputRightElement>
			</InputGroup>
		</ConnectionLayout>
	);
};

export default Email;
