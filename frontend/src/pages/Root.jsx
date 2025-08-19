import { Outlet } from 'react-router';

import MainNavigation from '../components/MainNavigation';
import { getAuthToken } from '../util/auth';

function RootLayout() {
	// const navigation = useNavigation();

	return (
		<>
			<MainNavigation />
			<main>
				{/* {navigation.state === 'loading' && <p>Loading...</p>} */}
				<Outlet />
			</main>
		</>
	);
}

export default RootLayout;

export const rootLoader = () => getAuthToken();
