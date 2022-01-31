import {
	Box,
	Flex,
	Heading,
	InputGroup,
	InputLeftElement,
	Input,
} from '@chakra-ui/react';
import DAppCard from '../components/DAppCard';
import { GoSearch as Search } from 'react-icons/go';
import Page from '../components/layouts/Page';

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
					<DAppCard
						name={'Snowball'}
						address='0x'
						newNotifs={1}
						imageURL={
							'https://pbs.twimg.com/profile_images/1471064848876425224/N40TS_20_400x400.png'
						}
					/>
					<DAppCard
						name={'UniSwap'}
						address='0x'
						imageURL={
							'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Uniswap_Logo.svg/1026px-Uniswap_Logo.svg.png'
						}
					/>
					<DAppCard
						name={'dHEDGE'}
						address='0x'
						imageURL={
							'https://www.newsbtc.com/wp-content/uploads/2020/09/dhedge-img.png'
						}
					/>
				</Flex>
			</Box>
		</Page>
	);
};

export default Explore;
