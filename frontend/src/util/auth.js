import { redirect } from 'react-router';

export function getAuthToken() {
	return localStorage.getItem('token');
}

export function setAuthToken(token) {
	localStorage.setItem('token', token);
}

export function logoutAction() {
	localStorage.removeItem('token');
	return redirect('/');
}

export function checkAuthLoader() {
	if (!getAuthToken()) {
		return redirect('/auth');
	}

	return null;
}
