import { useState } from 'react';
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
	Image,
	useToast,
} from '@chakra-ui/react';
import { useMoralisCloudFunction } from 'react-moralis';

const DappReg = () => {
	const [formInfo, setFormInfo] = useState({
		name: '',
		url: '',
		icon: '',
		address: '',
	});
	const [previewIcon, setPreviewIcon] = useState(
		'https://files.scottshar.es/Share%20Sheets/app-icons/Placeholder-Icon.png'
	);
	const { name, url, icon, address } = formInfo;
	const toast = useToast();

	const { fetch: registerDapp } = useMoralisCloudFunction(
		'registerDapp',
		{},
		{ autoFetch: false }
	);

	const handleRegister = async () => {
		console.log(formInfo);
		await registerDapp({
			params: formInfo,
			onSuccess: () => {
				toast({
					title: 'Success',
					description: 'Dapp registered successfully',
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

		setFormInfo({ name: '', url: '', icon: '', address: '' });
		setPreviewIcon(
			'https://files.scottshar.es/Share%20Sheets/app-icons/Placeholder-Icon.png'
		);
	};

	return (
		<Page>
			<Flex w={'80%'} mx='auto' flexDirection='column' align='center' gap={2}>
				<Heading as='h1' mb={5}>
					Register Your DApp
				</Heading>
				<Divider />
				<FormControl
					w={'80%'}
					p={8}
					my={5}
					bg={useColorModeValue('gray.100', 'gray.700')}
					borderRadius='lg'>
					<Image
						src={previewIcon}
						boxSize={'20ch'}
						alt={'DApp Icon'}
						borderRadius='lg'
						mx='auto'
						mb={5}
					/>
					<FormLabel htmlFor='name'>DApp Icon URL</FormLabel>
					<Input
						id='icon-url'
						type='text'
						value={icon}
						onChange={(e) => {
							setPreviewIcon(e.target.value);
							setFormInfo({ ...formInfo, icon: e.target.value });
						}}
						placeholder='funny-rudolf-icon.ski'
						mb={5}
					/>
					<FormLabel htmlFor='name'>DApp Name</FormLabel>
					<Input
						id='name'
						type='text'
						value={name}
						onChange={(e) => setFormInfo({ ...formInfo, name: e.target.value })}
						placeholder='Acme'
						mb={5}
					/>
					<FormLabel htmlFor='address'>Contract Address</FormLabel>
					<Input
						id='address'
						type='text'
						placeholder='0x00000000000000000000000'
						value={address}
						onChange={(e) =>
							setFormInfo({ ...formInfo, address: e.target.value })
						}
						mb={5}
					/>
					<FormLabel>DApp URL</FormLabel>
					<Input
						id='url'
						type='text'
						placeholder='acme.com'
						value={url}
						onChange={(e) => setFormInfo({ ...formInfo, url: e.target.value })}
						mb={5}
					/>
					<Button w={'100%'} colorScheme='blue' onClick={handleRegister}>
						Register
					</Button>
				</FormControl>
			</Flex>
		</Page>
	);
};

export default DappReg;
