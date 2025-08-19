import { Await, useRouteLoaderData } from 'react-router';

import EventForm from '../components/EventForm';
import { Suspense } from 'react';

function EditEventPage() {
	const promise = useRouteLoaderData('event-details');
	console.log(promise);

	return (
		<Suspense fallback={<p>Fething event...</p>}>
			<Await resolve={promise.data}>
				{({ event }) => <EventForm method="patch" event={event} />}
			</Await>
		</Suspense>
	);
}

export default EditEventPage;
