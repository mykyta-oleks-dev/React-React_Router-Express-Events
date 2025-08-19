import { Link, useRouteError } from 'react-router';
import MainNavigation from '../components/MainNavigation';

import PageContent from '../components/PageContent';

function ErrorPage() {
	const error = useRouteError();

	let title = 'An error occurred!';
	let message = <p>Something went wrong!</p>;

	if (error.status === 500) {
		title = 'A server side error'
		message = error.message;
	}

	if (error.status === 404) {
		title = 'Not found!';
		message = (
			<div>
				<p>Could not find resource or page.</p>
				<Link to="/">Back to Home Page</Link>
			</div>
		);
	}

	if (error.status === 401) {
		title = 'Not authenticated!';
		message = (
			<div>
				<p>Authenticate by logging in at "Authenticate" page.</p>
				<Link to="/auth">Authenticate</Link>
			</div>
		);
	}

	return (
		<>
			<MainNavigation />
			<PageContent title={title}>{message}</PageContent>
		</>
	);
}

export default ErrorPage;
