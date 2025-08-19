import { Form, Link, useSearchParams } from 'react-router';

import classes from './AuthForm.module.css';

function AuthForm() {
	const [searchParams] = useSearchParams();
	const mode = searchParams.get('mode');
	const isLogin = !mode || mode === 'login';
	const otherMode = isLogin ? 'signup' : 'login';

	return (
		<Form method="post" className={classes.form}>
			<h1>{isLogin ? 'Log in' : 'Sign up'}</h1>
			<p>
				<label htmlFor="email">Email</label>
				<input id="email" type="email" name="email" required />
			</p>
			<p>
				<label htmlFor="image">Password</label>
				<input id="password" type="password" name="password" required />
			</p>
			<div className={classes.actions}>
				<Link to={`?mode=${otherMode}`}>
					{isLogin
						? 'Create new account'
						: 'Log in with existing account'}
				</Link>
				<button>Submit</button>
			</div>
		</Form>
	);
}

export default AuthForm;
