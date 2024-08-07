import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// redux
import { useSelector } from '../redux/store';
// slices
import { setInfo, setContent, setPath } from '../redux/slices/sharedfile';
// hooks
import useFileSelect from '../hooks/useFileSelect';
import { useBeforeunload } from 'react-beforeunload';

interface SystemcontextProps {
  children: React.ReactNode;
}

export default function Systemcontext({ children }: SystemcontextProps) {
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

  useBeforeunload(filesDir.length !== 0 ? (e) => e.preventDefault() : undefined);

  return <>{children}</>;
}
