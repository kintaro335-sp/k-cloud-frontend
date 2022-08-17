import { useRoutes, Navigate } from 'react-router-dom';
import { LandingPage, LoginPage, RegisterPage, Page404 } from '../pages';

export default function Routes() {
  return useRoutes([
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/register',
      element: <RegisterPage />
    },
    {
      path: '/files',
      element: <div>Files</div>
    },
    {
      path: '/files/*',
      element: <div>Files</div>
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    },
    {
      path: '/404',
      element: <Page404 />
    }
  ]);
}
