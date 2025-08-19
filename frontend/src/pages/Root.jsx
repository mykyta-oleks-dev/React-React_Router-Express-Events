import { Outlet, useLoaderData, useSubmit } from 'react-router';

import MainNavigation from '../components/MainNavigation';
import { getAuthToken, getAuthTokenDuration } from '../util/auth';
import { useEffect } from 'react';

function RootLayout() {
	const token = useLoaderData();
	const submit = useSubmit();

	useEffect(() => {
		if (!token) {
			return;
		}

		if (token === 'EXPIRED') {
			submit(null, { action: '/logout', method: 'post' });
		}

		const tokenDuration = getAuthTokenDuration();

		setTimeout(() => {
			submit(null, { action: '/logout', method: 'post' });
		}, tokenDuration);
	}, [token, submit]);

	return (
		<>
			<MainNavigation />
			<main>
				<Outlet />
			</main>
		</>
	);
}

export default RootLayout;

export const rootLoader = () => getAuthToken();
