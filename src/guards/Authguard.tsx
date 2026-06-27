/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../redux/store';
import { useSnackbar } from 'notistack';
import { verifyAuth } from '../api/auth';
import useAuth from '../hooks/useAuth';
import { Loading } from '../pages';
import { isAxiosError } from 'axios';

type AuthGuardProps = {
  children: JSX.Element | React.ReactNode | undefined;
  admin?: boolean;
  redirect?: boolean;
  redirectTo?: string;
};

export default function Authguard({ children, redirect, redirectTo, admin }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { access_token } = useSelector((state) => state.session);

  useEffect(() => {
    verifyAuth(access_token).then((u) => {
      if (admin && !u.isadmin) {
        navigate(redirectTo || '/');
        enqueueSnackbar('You are not an admin', { variant: 'error' });
      }
    }).catch((err) => {
      if (isAxiosError(err)) {
        navigate(redirectTo || '/');
      }
    });
  }, []);

  if (!isAuthenticated) {
    return <Loading />;
  }

  return <>{children}</>;
}
