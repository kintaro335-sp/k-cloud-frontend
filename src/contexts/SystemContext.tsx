import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cancelFilesInterval } from '../redux/slices/session';
import { clearIntervalUser } from '../redux/slices/admin';

interface SystemcontextProps {
  children: React.ReactNode;
}

export default function Systemcontext({ children }: SystemcontextProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== '/files') {
      cancelFilesInterval();
    }
    if (pathname !== '/admin/accounts') {
      clearIntervalUser();
    }
  }, [pathname]);

  return <>{children}</>;
}
