import { createBrowserRouter } from 'react-router';
import EditEventPage from '../pages/EditEvent';
import ErrorPage from '../pages/Error';
import EventDetailsPage, {
	detailsLoader,
	deleteEventAction,
} from '../pages/EventDetail';
import EventsPage, { eventsLoader } from '../pages/Events';
import EventsRootLayout from '../pages/EventsRoot';
import HomePage from '../pages/Home';
import NewEventPage from '../pages/NewEvent';
import RootLayout from '../pages/Root';
import { formAction } from '../components/EventForm';
import NewsletterPage, { newsletterAction } from '../pages/Newsletter';
import AuthenticationPage, { authAction } from '../pages/Authentication';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <HomePage /> },
			{
				path: 'events',
				element: <EventsRootLayout />,
				children: [
					{
						index: true,
						element: <EventsPage />,
						loader: eventsLoader,
					},
					{
						path: ':id',
						id: 'event-details',
						loader: detailsLoader,
						children: [
							{
								index: true,
								element: <EventDetailsPage />,
								action: deleteEventAction,
							},
							{
								path: 'edit',
								element: <EditEventPage />,
								action: formAction,
							},
						],
					},
					{
						path: 'new',
						element: <NewEventPage />,
						action: formAction,
					},
				],
			},
			{
				path: 'newsletter',
				element: <NewsletterPage />,
				action: newsletterAction,
			},
			{
				path: 'auth',
				element: <AuthenticationPage />,
				action: authAction,
			},
		],
	},
]);

export default router;
