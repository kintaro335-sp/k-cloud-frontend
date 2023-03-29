import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from '../redux/store';
import { useSnackbar } from 'notistack';
import { verifyAuth } from '../api/auth';
import useAuth from '../hooks/useAuth';

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
    });
  }, []);

  if (!isAuthenticated && redirect) {
    return <Navigate to={redirectTo || '/'} />;
  }

  if (!isAuthenticated) {
    return <></>;
  }

  return <>{children}</>;
}
