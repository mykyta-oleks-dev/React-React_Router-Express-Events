import {
	Form,
	Link,
	useActionData,
	useNavigation,
	useSearchParams,
} from 'react-router';

import classes from './AuthForm.module.css';

function AuthForm() {
	const [searchParams] = useSearchParams();
	const data = useActionData();
	const navigation = useNavigation();

	const mode = searchParams.get('mode');
	const isLogin = !mode || mode === 'login';
	const otherMode = isLogin ? 'signup' : 'login';

	const isSubmitting = navigation.state === 'submitting';

	return (
		<Form method="post" className={classes.form}>
			<h1>{isLogin ? 'Log in' : 'Sign up'}</h1>
			{data?.message && <p>{data.message}</p>}
			{data?.errors && (
				<ul>
					{Object.entries(data.errors).map(([key, err]) => (
						<li key={key}>{err}</li>
					))}
				</ul>
			)}
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
				<button disabled={isSubmitting}>
					{isSubmitting ? 'Submitting...' : 'Submit'}
				</button>
			</div>
		</Form>
	);
}

export default AuthForm;
