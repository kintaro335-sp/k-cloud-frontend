import { useRoutes } from 'react-router-dom';
import { LandingPage } from '../pages';

export default function Routes() {
  return useRoutes([
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/about',
      element: <div>About</div>
    },
    {
      path: '/login',
      element: <div>Login</div>
    },
    {
      path: '/signup',
      element: <div>Signup</div>
    },
    {
      path: '/files',
      element: <div>Files</div>
    },
    {
      path: '/files/*',
      element: <div>Files</div>
    }
  ]);
}
