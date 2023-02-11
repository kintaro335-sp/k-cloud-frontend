import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cancelInterval } from '../redux/slices/session';

interface SystemcontextProps {
  children: React.ReactNode;
}

export default function Systemcontext({ children }: SystemcontextProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== '/files') {
      cancelInterval();
    }
  }, [pathname]);

  return <>{children}</>;
}
