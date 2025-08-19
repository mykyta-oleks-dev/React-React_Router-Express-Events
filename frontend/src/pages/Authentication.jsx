import { redirect } from 'react-router';
import AuthForm from '../components/AuthForm';
import { setAuthToken } from '../util/auth';

function AuthenticationPage() {
	return <AuthForm />;
}

export default AuthenticationPage;

export const authAction = async ({ request }) => {
	const searchParams = new URL(request.url).searchParams;
	const mode = searchParams.get('mode') ?? 'login';

	if (!['signup', 'login'].includes(mode)) {
		throw new Response({ message: 'Unsupported mode' }, { status: 422 });
	}

	const fd = await request.formData();
	const authData = {
		email: fd.get('email'),
		password: fd.get('password'),
	};

	const res = await fetch('http://localhost:8080/' + mode, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(authData),
	});

	if ([422, 401, 404].includes(res.status)) {
		return res;
	}

	const resData = await res.json();

	if (!res.ok) {
		throw { message: 'Could not authenticate user', status: 500 };
	}

	if (!resData.token) {
		throw { message: 'Token not provided by the server', status: 500 };
	}

	setAuthToken(resData.token);

	return redirect('/');
};
