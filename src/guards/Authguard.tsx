import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

type AuthGuardProps = {
  children: JSX.Element | React.ReactNode | undefined;
  redirect?: boolean | undefined;
  redirectTo?: string | undefined;
};

export default function Authguard({ children, redirect, redirectTo }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated && redirect) {
    return <Navigate to={redirectTo || '/'} />;
  }

  if (!isAuthenticated) {
    return <></>;
  }

  return <>{children}</>;
}
