import { lazy } from 'react';

export const Accounts = lazy(() => import('./Accounts'));
export const Stats = lazy(() => import('./Stats'));
export const AdminMenu = lazy(() => import('./AdminMenu'));
export const SystemSettings = lazy(() => import('./SystemConfig'));
export const Logs = lazy(() => import('./Logs'));
export const About = lazy(() => import('./About'));
