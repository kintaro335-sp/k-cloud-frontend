import { useRoutes, Navigate } from 'react-router-dom';
import { LandingPage, LoginPage, RegisterPage, Page404, FilesPage, ChangePasswordPage } from '../pages';
import Authguard from '../guards/Authguard';

export default function Routes() {
  return useRoutes([
    {
      path: '/',
      element: <LandingPage />
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/passwd',
      element: <ChangePasswordPage />
    },
    {
      path: '/register',
      element: (
        <Authguard redirect>
          <RegisterPage />
        </Authguard>
      )
    },
    {
      path: '/files',
      element: (
        <Authguard redirect redirectTo="/login">
          <FilesPage />
        </Authguard>
      )
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
