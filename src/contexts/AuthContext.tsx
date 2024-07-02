import { createContext, useState, useMemo, useEffect, useRef } from 'react';
// redux
import { useSelector, useDispatch } from '../redux/store';
import { setFiles } from '../redux/slices/session';
// api
import { verifyAuth } from '../api/auth';
import { getListFiles } from '../api/files';
import { createAuthSocket } from '../api/websocket';

export const AuthContext = createContext({
  isAdmin: false,
  isAuthenticated: false,
  init: false,
  username: '',
  sessionId: '',
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const [init, setInit] = useState(false);
  const socketClient = useRef(createAuthSocket());
  const { access_token, path } = useSelector((state) => state.session);
  const [sessionId, setSessionId] = useState<string>('');
  const [username, setUsername] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function verifyAuthToken() {
      if (access_token !== '') {
        verifyAuth(access_token)
          .then((u) => {
            setIsAdmin(u.isadmin);
            setSessionId(u.sessionId);
            setUsername(u.username);
            setIsAuthenticated(true);
            setInit(true);
          })
          .catch(() => {
            setIsAuthenticated(false);
            setInit(true);
          });
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
      setInit(true);
    }
    verifyAuthToken();
  }, [access_token]);

  useEffect(() => {
    const newSocket = createAuthSocket();
    newSocket.auth = { access_token };
    newSocket.connect();
    socketClient.current = newSocket;
  }, [access_token]);

  const value = useMemo(
    () => ({ isAuthenticated, init, isAdmin, sessionId, username }),
    [isAuthenticated, init, isAdmin, username, sessionId]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
