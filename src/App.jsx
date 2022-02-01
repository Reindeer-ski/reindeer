import { Suspense, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route, Navigate } from 'react-router';
import extendedTheme from './theme';
import DefaultLayout from './components/layouts/DefaultLayout';
import Loader from './components/Loader';
import { useMoralis } from 'react-moralis';
import React, { lazy } from 'react';

const App = () => {
	const { refetchUserData, user, enableWeb3 } = useMoralis();
	useEffect(() => {
		if (user) {
			refetchUserData();
			enableWeb3();
		}
	}, [user]);
	return (
		<ChakraProvider theme={extendedTheme}>
			<DefaultLayout>
				<Routes>
					<Route path='/'>
						{paths.map(({ path, component }) => (
							<Route
								key={path}
								path={path}
								element={
									<Suspense fallback={<Loader />}>
										{React.createElement(component)}
									</Suspense>
								}></Route>
						))}
					</Route>
				</Routes>
			</DefaultLayout>
		</ChakraProvider>
	);
};
const paths = [
	{
		path: '/',
		exact: true,
		component: lazy(() => import('./pages/Landing')),
	},
	{
		path: '/dapp-register',
		exact: true,
		component: lazy(() => import('./pages/AddressReg')),
	},
	{
		path: '/explore',
		exact: true,
		component: lazy(() => import('./pages/Explore')),
	},
	{
		path: '/dashboard',
		exact: true,
		component: lazy(() => import('./pages/Dashboard')),
	},

	{
		path: '/dapp/:address',
		exact: true,
		component: lazy(() => import('./pages/Notifications')),
	},
	{
		path: '/settings',
		exact: true,
		component: lazy(() => import('./pages/Settings')),
	},
	{
		path: '/simulate',
		exact: true,
		component: lazy(() => import('./pages/Simulate')),
	},
];

export default App;
