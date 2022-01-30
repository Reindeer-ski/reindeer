import { Suspense } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route, Navigate } from 'react-router';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import extendedTheme from './theme';
import DefaultLayout from './components/layouts/DefaultLayout';
import Loader from './components/Loader';
import Settings from './pages/Settings';

const App = () => {
	return (
		<ChakraProvider theme={extendedTheme}>
			<DefaultLayout>
				<Routes>
					<Route path='/'>
						<Route
							exact
							path=''
							element={
								<Suspense fallback={<Loader />}>
									<Landing />
								</Suspense>
							}
						/>
						<Route
							exact
							path='/dashboard'
							element={
								<Suspense fallback={<Loader />}>
									<Dashboard />
								</Suspense>
							}
						/>
						<Route
							exact
							path='/all'
							element={
								<Suspense fallback={<Loader />}>All Notifications</Suspense>
							}
						/>
						<Route
							exact
							path='/settings'
							element={
								<Suspense fallback={<Loader />}>
									<Settings />
								</Suspense>
							}
						/>
						<Route exact path='404' element={<>404 Page not found</>} />
						<Route path='*' element={<Navigate to='/404' />} />
					</Route>
				</Routes>
			</DefaultLayout>
		</ChakraProvider>
	);
};

export default App;
