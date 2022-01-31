import {
	Box,
	Flex,
	Heading,
	InputGroup,
	InputLeftElement,
	Input,
	Button,
} from '@chakra-ui/react';
import { GoSearch as Search } from 'react-icons/go';
import Page from '../components/layouts/Page';
import DAppCardLayout from '../components/DAppCardLayout';

const Explore = () => {
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
						/>
					</InputGroup>
				</Flex>
				<Flex
					direction='row'
					w={'100%'}
					gap={5}
					align='center'
					justify='center'
					wrap='wrap'
					mt='5'>
					<DAppCardLayout
						name={'Snowball'}
						// key='0x'
						imageURL={
							'https://pbs.twimg.com/profile_images/1471064848876425224/N40TS_20_400x400.png'
						}>
						<Button>Subscribe</Button>
					</DAppCardLayout>
					<DAppCardLayout
						name={'Uniswap'}
						// key='0x'
						imageURL={
							'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Uniswap_Logo.svg/1026px-Uniswap_Logo.svg.png'
						}>
						<Button>Subscribe</Button>
					</DAppCardLayout>
					<DAppCardLayout
						name={'dHEDGE'}
						// key='0x'
						imageURL={
							'https://www.newsbtc.com/wp-content/uploads/2020/09/dhedge-img.png'
						}>
						<Button>Subscribe</Button>
					</DAppCardLayout>
				</Flex>
			</Box>
		</Page>
	);
};

export default Explore;
