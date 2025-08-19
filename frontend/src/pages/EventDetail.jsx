import { Await, redirect, useRouteLoaderData } from 'react-router';
import EventItem from '../components/EventItem';
import { Suspense } from 'react';

const EventDetailsPage = () => {
	const promise = useRouteLoaderData('event-details');

	return (
		<Suspense fallback={<p>Fething event...</p>}>
			<Await resolve={promise.data}>
				{({ event }) => <EventItem event={event} />}
			</Await>
		</Suspense>
	);
};

export default EventDetailsPage;

export async function detailsLoader({ params }) {
	const res = fetch('http://localhost:8080/events/' + params.id).then(
		(res) => {
			if (!res.ok) {
				throw new Response(
					{ message: 'An error fetching an event' },
					{ status: 500 }
				);
			} else {
				return res.json();
			}
		}
	);

	return {
		data: res,
	};
}

export async function deleteEventAction({ request, params }) {
	const res = await fetch('http://localhost:8080/events/' + params.id, {
		method: request.method,
	});

	if (!res.ok) {
		throw res;
	} else {
		return redirect('/events');
	}
}
