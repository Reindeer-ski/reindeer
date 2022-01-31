import Page from '../components/layouts/Page';
import {
	FormControl,
	FormLabel,
	Input,
	Heading,
	Divider,
	Flex,
	Button,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react';
import { useMoralis, useMoralisCloudFunction } from 'react-moralis';
import { useState, useRef } from 'react';

const Simulate = () => {
	return (
		<Page>
			<Flex
				w={'80%'}
				mW={'80ch'}
				mx='auto'
				flexDirection='column'
				align='center'
				gap={2}>
				<Heading as='h1' mt={2} mb={5}>
					Simulate Notifications
				</Heading>
				<Divider />
				<SendToAddress />
				<SendToTopic />
			</Flex>
		</Page>
	);
};
const SendToAddress = () => {
	const { user, web3, isWeb3Enabled } = useMoralis();
	const toast = useToast();
	const { fetch: sendNotification } = useMoralisCloudFunction(
		'sendNotification',
		{},
		{ autoFetch: false }
	);

	const [formData, setFormData] = useState({
		receiver: '',
		title: '',
		description: '',
		url: '',
		topic: '',
	});
	const { receiver, title, description, url, topic } = formData;
	const toastIdRef = useRef();
	const handleSendNotification = async (e) => {
		toastIdRef.current = toast({
			title: `Sending notification to ${receiver}`,
			description: 'Sign the message',
			status: 'info',
			duration: null,
			isClosable: true,
		});
		if (isWeb3Enabled) {
			try {
				const signer = web3.getSigner(user.get('ethAddress'));
				const message =
					`sender=${user.get(
						'ethAddress'
					)}&topic=${topic}&receiver=${receiver.toLowerCase()}&title=${title}&description=${description}` +
					(url ? `&url=${url}` : '');
				const signature = await signer.signMessage(message);
				sendNotification({
					params: {
						sender: user.get('ethAddress'),
						receiver: receiver.toLowerCase(),
						title,
						description,
						signature,
						topic,
						url,
					},
					onSuccess: (response) => {
						toast({
							title: 'Success',
							description: 'You have successfully subscribed to this Address',
							status: 'success',
							duration: 9000,
							isClosable: true,
						});
					},
					onError: (error) => {
						toast({
							title: 'Error',
							description: error.message,
							status: 'error',
							duration: 9000,
							isClosable: true,
						});
					},
				});
			} catch (err) {
				console.log(err);
				toast({
					title: 'Error',
					description: err.message,
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
			}
		}
		toast.close(toastIdRef.current);
	};
	return (
		<>
			<Heading as='h2' mt={2} mb={5}>
				Send to a specific address
			</Heading>

			<FormControl
				as='form'
				w={'80%'}
				p={8}
				my={5}
				bg={useColorModeValue('gray.100', 'gray.700')}
				borderRadius='lg'>
				<FormLabel htmlFor='topic'>Title</FormLabel>
				<Input
					value={title}
					type='text'
					placeholder='Notification Title'
					onChange={(e) => setFormData({ ...formData, title: e.target.value })}
					mb={5}
					id='topic'
				/>
				<FormLabel htmlFor='description'>Description</FormLabel>
				<Input
					value={description}
					onChange={(e) =>
						setFormData({ ...formData, description: e.target.value })
					}
					type='text'
					placeholder='Hello User!!! This is an example notification description'
					mb={5}
					id='description'
				/>

				<FormLabel htmlFor='reciever'>Receiver Address</FormLabel>
				<Input
					value={receiver}
					onChange={(e) =>
						setFormData({ ...formData, receiver: e.target.value })
					}
					id='reciever'
					type='text'
					placeholder='0x00000000000000000000000'
					mb={5}
				/>

				<FormLabel htmlFor='topic'>Topic</FormLabel>
				<Input
					type='text'
					value={topic}
					onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
					placeholder='Topic to publish to'
					mb={5}
					id='topic'
				/>

				<FormLabel htmlFor='url'>CTA url</FormLabel>
				<Input
					value={url}
					onChange={(e) => setFormData({ ...formData, url: e.target.value })}
					type='text'
					placeholder='https://app.snowball.network/Users/Can/Do/Something/Here'
					mb={5}
					id='url'
				/>

				<Button
					w={'100%'}
					colorScheme='blue'
					onClick={handleSendNotification}
					value='Send Notification'>
					Send
				</Button>
			</FormControl>
		</>
	);
};

const SendToTopic = () => {
	const { user, web3, isWeb3Enabled } = useMoralis();
	const toast = useToast();
	const [formData, setFormData] = useState({
		topic: '',
		title: '',
		description: '',
		url: '',
	});
	const { topic, title, description, url } = formData;
	const { fetch: sendToTopic } = useMoralisCloudFunction(
		'sendToTopic',
		{},
		{ autoFetch: false }
	);
	const toastIdRef = useRef();
	const handleSendNotification = async () => {
		toastIdRef.current = toast({
			title: 'Sending notification',
			description: 'Sign the notification',
			status: 'info',
			duration: null,
			isClosable: true,
		});
		if (isWeb3Enabled) {
			try {
				const signer = web3.getSigner(user.get('ethAddress'));
				const message =
					`sender=${user.get(
						'ethAddress'
					)}&topic=${topic}&title=${title}&description=${description}` +
					(url ? `&url=${url}` : '');
				const signature = await signer.signMessage(message);
				sendToTopic({
					params: {
						sender: user.get('ethAddress'),
						topic,
						title,
						description,
						signature,
						[url]: url,
					},
					onSuccess: (response) => {
						toast({
							title: 'Success',
							description: 'You have successfully subscribed to this Address',
							status: 'success',
							duration: 9000,
							isClosable: true,
						});
					},
					onError: (error) => {
						toast({
							title: 'Error',
							description: error.message,
							status: 'error',
							duration: 9000,
							isClosable: true,
						});
					},
				});
			} catch (err) {
				console.log(err);
				toast({
					title: 'Error',
					description: err.message,
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
			}
		}
		toast.close(toastIdRef.current);
	};
	return (
		<>
			<Heading as='h2' mt={2} mb={5}>
				Send to a topic
			</Heading>
			<FormControl
				as='form'
				w={'80%'}
				p={8}
				my={5}
				bg={useColorModeValue('gray.100', 'gray.700')}
				borderRadius='lg'>
				<FormLabel htmlFor='topic'>Title</FormLabel>
				<Input
					type='text'
					value={title}
					onChange={(e) => setFormData({ ...formData, title: e.target.value })}
					placeholder='Notification Title'
					mb={5}
					id='topic'
				/>
				<FormLabel htmlFor='description'>Description</FormLabel>
				<Input
					type='text'
					value={description}
					onChange={(e) =>
						setFormData({ ...formData, description: e.target.value })
					}
					placeholder='Hello User!!! This is an example notification description'
					mb={5}
					id='description'
				/>

				<FormLabel htmlFor='topic'>Topic</FormLabel>
				<Input
					type='text'
					value={topic}
					onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
					placeholder='Topic to publish to'
					mb={5}
					id='topic'
				/>

				<FormLabel htmlFor='url'>CTA url</FormLabel>
				<Input
					type='text'
					value={url}
					onChange={(e) => setFormData({ ...formData, url: e.target.value })}
					placeholder='https://app.snowball.network/Users/Can/Do/Something/Here'
					mb={5}
					id='url'
				/>

				<Button w={'100%'} colorScheme='blue' onClick={handleSendNotification}>
					Send Notification
				</Button>
			</FormControl>
		</>
	);
};
export default Simulate;
