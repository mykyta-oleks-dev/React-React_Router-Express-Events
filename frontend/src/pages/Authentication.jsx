import { redirect } from 'react-router';
import AuthForm from '../components/AuthForm';

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

	if (res.status === 422 || res.status === 401) {
		return res;
	}

	if (!res.ok) {
		throw new Response(
			{ message: 'Could not authenticate user' },
			{ status: 500 }
		);
	}

	return redirect('/');
};
