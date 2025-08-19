import { createBrowserRouter } from 'react-router';
import { formAction } from '../components/EventForm';
import AuthenticationPage, { authAction } from '../pages/Authentication';
import EditEventPage from '../pages/EditEvent';
import ErrorPage from '../pages/Error';
import EventDetailsPage, {
	deleteEventAction,
	detailsLoader,
} from '../pages/EventDetail';
import EventsPage, { eventsLoader } from '../pages/Events';
import EventsRootLayout from '../pages/EventsRoot';
import HomePage from '../pages/Home';
import NewEventPage from '../pages/NewEvent';
import NewsletterPage, { newsletterAction } from '../pages/Newsletter';
import RootLayout, { rootLoader } from '../pages/Root';
import { logoutAction } from '../util/auth';

const router = createBrowserRouter([
	{
		path: '/',
		id: 'root',
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		loader: rootLoader,
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
			{
				path: 'logout',
				action: logoutAction,
			},
		],
	},
]);

export default router;
