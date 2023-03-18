import { lazy } from 'react';

export const LandingPage = lazy(() => import('./LandingPage'));
export const LoginPage = lazy(() => import('./Login'));
export const RegisterPage = lazy(() => import('./Register'));
export const FilesPage = lazy(() => import('./Files'));
export const ChangePasswordPage = lazy(() => import('./ChangePassword'));
export const Page404 = lazy(() => import('./Page404'));
export const SharedFiles = lazy(() => import('./Sharedfiles'));
export const SharedFile = lazy(() => import('./SharedFile'));

export { default as Loading } from './Loading';
