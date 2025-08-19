import { redirect } from 'react-router';

export function getAuthToken() {
	const token = localStorage.getItem('token');

	if (!token) return null;

	const tokenDuration = getAuthTokenDuration();

	if (tokenDuration <= 0) {
		return 'EXPIRED';
	}

	return token;
}

export function getAuthTokenDuration() {
	const tokenExpiration = localStorage.getItem('tokenExpiration');

	if (!tokenExpiration) return -1;

	const expiration = new Date(tokenExpiration);
	const now = new Date();
	return expiration.getTime() - now.getTime();
}

export function setAuthToken(token) {
	localStorage.setItem('token', token);
	const expiration = new Date();
	expiration.setHours(expiration.getHours() + 1);
	localStorage.setItem('tokenExpiration', expiration.toISOString());
}

export function logoutAction() {
	localStorage.removeItem('token');
	localStorage.removeItem('tokenExpiration');
	return redirect('/');
}

export function checkAuthLoader() {
	if (!getAuthToken()) {
		return redirect('/auth');
	}

	return null;
}
