import {
	Box,
	Flex,
	Heading,
	InputGroup,
	InputLeftElement,
	Input,
	Button,
	useToast,
} from '@chakra-ui/react';
import { GoSearch as Search } from 'react-icons/go';
import Page from '../components/layouts/Page';
import DAppCardLayout from '../components/DAppCardLayout';
import {
	useMoralis,
	useMoralisCloudFunction,
	useMoralisQuery,
} from 'react-moralis';
import { useRef, useState, useEffect } from 'react';

const Explore = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [results, setResults] = useState([]);
	const { data, error, isLoading } = useMoralisQuery('Dapp');

	useEffect(() => {
		setResults(data);
	}, [data]);

	useEffect(() => {
		const newRes = data.filter((dApp) =>
			dApp.get('name').toLowerCase().includes(searchQuery.toLowerCase())
		);
		setResults(newRes);
	}, [searchQuery]);

	return (
		<Page>
			<Box width={'100%'} px={5}>
				<Heading as='h2' size='lg' width={'100%'} textAlign='center'>
					Explore DApps
				</Heading>
				<Flex align='center' justify='center'>
					<InputGroup my={5} width={{ base: '80%', sm: '90%' }}>
						<InputLeftElement
							pointerEvents='none'
							mt={1}
							ml={1}
							children={<Search size={20} fill='gray' />}
						/>
						<Input
							placeholder='Find you DApps'
							size='lg'
							variant='filled'
							px={15}
							py={5}
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</InputGroup>
				</Flex>
				<DAppCards results={results} />
			</Box>
		</Page>
	);
};
const DAppCards = ({ results }) => {
	const { user, web3, isWeb3Enabled } = useMoralis();
	const { fetch: subscribeToDApp } = useMoralisCloudFunction(
		'subscribe',
		{},
		{ autoFetch: false }
	);
	const toast = useToast();
	const toastIdRef = useRef();

	const handleSubscribe = async (dAppAddress, name, topic = 'all') => {
		toastIdRef.current = toast({
			title: `Subscribing to ${name}`,
			description: 'Sign the message to confirm',
			status: 'info',
			duration: null,
			isClosable: true,
		});
		if (isWeb3Enabled) {
			try {
				const signer = web3.getSigner(user.get('ethAddress'));
				const message = `sender=${dAppAddress.toLowerCase()}&topic=${topic}&receiver=${user
					.get('ethAddress')
					.toLowerCase()}&platform=1111`;

				const signature = await signer.signMessage(message);
				console.log(message, signature);

				subscribeToDApp({
					params: {
						sender: dAppAddress,
						receiver: user.get('ethAddress'),
						topic,
						platform: '1111',
						signature,
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
			toast.close(toastIdRef.current);
		}
	};
	return (
		<Flex
			direction='row'
			w={'100%'}
			gap={5}
			align='center'
			justify='center'
			wrap='wrap'
			mt='5'>
			<DAppCard
				name='Your Address'
				address={user.get('ethAddress').toLowerCase()}
				handleSubscribe={() =>
					handleSubscribe(user.get('ethAddress'), 'Your Address')
				}
				imageURL={'https://avatars.githubusercontent.com/u/11744586?s=280&v=4'}
			/>
			{results.map((dApp, idx) => (
				<DAppCard
					key={idx}
					name={dApp.get('name')}
					address={user.get('ethAddress').toLowerCase()}
					handleSubscribe={handleSubscribe}
					imageURL={dApp.get('icon')}
				/>
			))}
		</Flex>
	);
};

const DAppCard = ({ name, imageURL, address, dAppLink, handleSubscribe }) => {
	return (
		<DAppCardLayout name={name} imageURL={imageURL} dAppLink={dAppLink}>
			<Button
				onClick={() => {
					handleSubscribe(address);
				}}>
				Subscribe
			</Button>
		</DAppCardLayout>
	);
};

export default Explore;
