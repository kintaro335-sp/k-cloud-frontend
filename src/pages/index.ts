import { lazy } from 'react';

export const LandingPage = lazy(() => import('./LandingPage'));
export const LoginPage = lazy(() => import('./Login'));
export const RegisterPage = lazy(() => import('./Register'));
export const FilesPage = lazy(() => import('./Files'));
export const Page404 = lazy(() => import('./Page404'));

export { default as Loading } from './Loading';
