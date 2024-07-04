import { lazy } from 'react';

export const LandingPage = lazy(() => import('./LandingPage'));
export const LoginPage = lazy(() => import('./Login'));
export const RegisterPage = lazy(() => import('./Register'));
export const FilesPage = lazy(() => import('./Files'));
export const ChangePasswordPage = lazy(() => import('./ChangePassword'));
export const Page404 = lazy(() => import('./Page404'));
export const SharedFiles = lazy(() => import('./Sharedfiles'));
export const SharedFile = lazy(() => import('./SharedFile'));
export const SetupUser = lazy(() => import('./SetupUser'));
export const Tokens = lazy(() => import('./Tokens'));
export const TokenView = lazy(() => import('./TokenView'));
export const ApiKeysPage = lazy(() => import('./ApiKeysPage'));

export { default as Loading } from './Loading';
