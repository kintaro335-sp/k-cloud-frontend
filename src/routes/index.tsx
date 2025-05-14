/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { useRoutes, Navigate } from 'react-router-dom';
import {
  LandingPage,
  LoginPage,
  RegisterPage,
  Page404,
  FilesPage,
  ChangePasswordPage,
  SharedFiles,
  SharedFile,
  SetupUser,
  Tokens,
  TokenView,
  ApiKeysPage,
  UserStats,
  SearchPage
} from '../pages';
import { Accounts, Stats, AdminMenu, SystemSettings, Logs, About } from '../pages/dashboard';
// contexts
import Authguard from '../guards/Authguard';
import GalleryContext from '../contexts/GalleryContext';
import VideoPlayerContext from '../contexts/VideoPlayerContext';
import PDFViewerContext from '../contexts/PDFViewerContext';
import MusicPlayerContext from '../contexts/MusicPlayerContext';

function ContextsR({ children }: { children: JSX.Element }) {
  return (
    <GalleryContext>
      <VideoPlayerContext>
        <PDFViewerContext>
          <MusicPlayerContext>{children}</MusicPlayerContext>
        </PDFViewerContext>
      </VideoPlayerContext>
    </GalleryContext>
  );
}

export default function Routes() {
  return useRoutes([
    {
      path: '/setup',
      element: <SetupUser />
    },
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
          <ContextsR>
            <FilesPage />
          </ContextsR>
        </Authguard>
      )
    },
    {
      path: '/search',
      element: (
        <Authguard redirect redirectTo="/login">
          <ContextsR>
            <SearchPage />
          </ContextsR>
        </Authguard>
      )
    },
    {
      path: '/stats',
      element: (
        <Authguard redirect redirectTo="/login">
          <ContextsR>
            <UserStats />
          </ContextsR>
        </Authguard>
      )
    },
    {
      path: '/tokens',
      element: (
        <Authguard redirect redirectTo="/login">
          <ContextsR>
            <Tokens />
          </ContextsR>
        </Authguard>
      )
    },
    {
      path: '/tokens/id/:id',
      element: (
        <Authguard redirect redirectTo="/login">
          <ContextsR>
            <TokenView />
          </ContextsR>
        </Authguard>
      )
    },
    {
      path: '/api-keys',
      element: (
        <Authguard redirect redirectTo="/login">
          <ApiKeysPage />
        </Authguard>
      )
    },
    {
      path: '/admin',
      element: <AdminMenu />
    },
    {
      path: '/admin/about',
      element: (
        <Authguard admin redirect redirectTo="/login">
          <About />
        </Authguard>
      )
    },
    {
      path: '/admin/accounts',
      element: (
        <Authguard admin redirect redirectTo="/login">
          <Accounts />
        </Authguard>
      )
    },
    {
      path: '/admin/system',
      element: (
        <Authguard admin redirect redirectTo="/login">
          <SystemSettings />
        </Authguard>
      )
    },
    {
      path: '/admin/stats',
      element: (
        <Authguard admin redirect redirectTo="/login">
          <Stats />
        </Authguard>
      )
    },
    {
      path: '/admin/logs',
      element: (
        <Authguard admin redirect redirectTo="/login">
          <Logs />
        </Authguard>
      )
    },
    {
      path: '/shared-files',
      element: (
        <ContextsR>
          <SharedFiles />
        </ContextsR>
      )
    },
    {
      path: '/shared-files/id/:id',
      element: (
        <ContextsR>
          <SharedFile />
        </ContextsR>
      )
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    },
    {
      path: '/404',
      element: <Page404 />
    },
    {
      path: '/about',
      element: <About />
    }
  ]);
}
