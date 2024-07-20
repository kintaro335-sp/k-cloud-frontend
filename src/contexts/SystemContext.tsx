import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// redux
import { useSelector } from '../redux/store';
// slices
import { setInfo, setContent, setPath } from '../redux/slices/sharedfile';
// hooks
import useFileSelect from '../hooks/useFileSelect';
import useAuth from '../hooks/useAuth';
import { useBeforeunload } from 'react-beforeunload';

interface SystemcontextProps {
  children: React.ReactNode;
}

export default function Systemcontext({ children }: SystemcontextProps) {
  const { socketClient } = useAuth();
  const { path } = useSelector((state) => state.session);
  const { filesDir } = useSelector((state) => state.files);
  const { pathname } = useLocation();
  const { clearSelect } = useFileSelect();

  useEffect(() => {
    if (!pathname.includes('/shared-files/id')) {
      setInfo(null);
      setPath('');
      setContent([]);
    }
  }, [pathname]);

  useEffect(() => {
    clearSelect();
  }, [path, pathname]);

  useEffect(() => {
    if(pathname !== '/files') {
      socketClient.removeListener('file-update');
      socketClient.removeListener('file-change');
      socketClient.removeListener('tree-update');
      socketClient.removeListener('token-change');
    }
    if(pathname !== '/admin/stats') {
      socketClient.removeListener('stats-update');
      socketClient.removeListener('memory-usage-update');
    }
    if(pathname !== '/admin/users') {
      socketClient.removeListener('users-update');
    }
    if(pathname !== '/admin/logs') {
      socketClient.removeListener('stats-update');
    }
    if(pathname !== '/api-keys') {
      socketClient.removeListener('sessions-update');
    }
    if(pathname !== '/tokens') {
      socketClient.removeListener('token-change');
    }
    if(pathname !== '/shared-files') {
      socketClient.removeListener('token-change');
    }
    if(pathname !== '/admin/accounts') {
      socketClient.removeListener('users-update');
    }
  }, [pathname]);


  useBeforeunload(filesDir.length !== 0 ? (e) => e.preventDefault() : undefined);

  return <>{children}</>;
}
