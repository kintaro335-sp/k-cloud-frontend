import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// redux
import { useSelector } from '../redux/store';
// slices
import { cancelFilesInterval } from '../redux/slices/session';
import { clearIntervalUser } from '../redux/slices/admin';
import { setInfo, setContent, setPath } from '../redux/slices/sharedfile';
import { clearIntervalPages, clearIntervalTokens } from '../redux/slices/sharedfiles';
import { clearIntervalPagesU, clearIntervalTokensU } from '../redux/slices/sharedfilesuser';
import { clearIntervalMemUsage } from '../redux/slices/stats';
import { clearIntervalLogsId } from '../redux/slices/logs';
// hooks
import useFileSelect from '../hooks/useFileSelect';

interface SystemcontextProps {
  children: React.ReactNode;
}

export default function Systemcontext({ children }: SystemcontextProps) {
  const { path } = useSelector((state) => state.session);
  const { pathname } = useLocation();
  const { clearSelect } = useFileSelect();

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
    if (pathname !== '/admin/stats') {
      clearIntervalMemUsage();
    }
    if (pathname !== '/admin/logs') {
      clearIntervalLogsId();
    }
    if (pathname !== '/tokens') {
      clearIntervalPagesU();
      clearIntervalTokensU();
    }
  }, [pathname]);

  useEffect(() => {
    clearSelect();
  }, [path]);

  return <>{children}</>;
}
