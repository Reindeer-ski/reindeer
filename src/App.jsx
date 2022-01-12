import { Suspense } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route, Navigate } from 'react-router';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import extendedTheme from './theme';

const App = () => {
	return (
		<ChakraProvider theme={extendedTheme}>
			<Navbar />
			<Routes>
				<Route path="/">
					<Route
						exact
						path=""
						element={
							<Suspense fallback={<>Loading</>}>
								<Landing />
							</Suspense>
						}
					/>
					<Route
						exact
						path="/about"
						element={<Suspense fallback={<>Loading</>}>About</Suspense>}
					/>
					<Route exact path="404" element={<>404 Page not found</>} />
					<Route path="*" element={<Navigate to="/404" />} />
				</Route>
			</Routes>
		</ChakraProvider>
	);
};

export default App;
