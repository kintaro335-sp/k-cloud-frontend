import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cancelFilesInterval } from '../redux/slices/session';
import { clearIntervalUser } from '../redux/slices/admin';
import { setInfo, setContent, setPath } from '../redux/slices/sharedfile';
import { clearIntervalPages, clearIntervalTokens } from '../redux/slices/sharedfiles';

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
    if (pathname !== '/shared-files') {
      clearIntervalPages();
      clearIntervalTokens();
    }
    if (!pathname.includes('/shared-files/id')) {
      setInfo(null);
      setPath('');
      setContent([]);
    }
  }, [pathname]);

  return <>{children}</>;
}
