import { Await, useLoaderData } from 'react-router';
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

const EventsPage = () => {
	const promise = useLoaderData();

	return (
		<Suspense fallback={<p>Fetching data...</p>}>
			<Await resolve={promise.data}>
				{({ events }) => <EventsList events={events} />}
			</Await>
		</Suspense>
	);
};

export default EventsPage;

export const eventsLoader = async () => {
	const eventsPromise = fetch('http://localhost:8080/events').then(
		async (res) => {
			if (!res.ok) {
				const data = await res.json();
				throw {
					status: res.status,
					message: data?.message ?? 'An unexpected error',
				};
			}
			return res.json();
		}
	);

	return {
		data: eventsPromise,
	};
};
