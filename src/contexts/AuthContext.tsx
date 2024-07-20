import { createContext, useState, useMemo, useEffect, useRef } from 'react';
// redux
import { useSelector, useDispatch } from '../redux/store';
import { setAccessToken } from '../redux/slices/session';
// api
import { verifyAuth } from '../api/auth';
import { createAuthSocket } from '../api/websocket';
import { isAxiosError } from 'axios';

export const AuthContext = createContext({
  isAdmin: false,
  isAuthenticated: false,
  init: false,
  username: '',
  sessionId: '',
  socketClient: createAuthSocket('')
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const [init, setInit] = useState(false);
  const { access_token } = useSelector((state) => state.session);
  const socketClient = useRef(createAuthSocket(access_token));
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
          .catch((err) => {
            if (isAxiosError(err)) {
              if (err.response?.status === 401) {
                dispatch(setAccessToken(''));
              }
            }
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
    if (socketClient.current.connected) {
      socketClient.current.disconnect();
    }
    socketClient.current.connect();
    socketClient.current.emit('auth', access_token);
  }, [access_token]);

  const value = useMemo(
    () => ({ isAuthenticated, init, isAdmin, sessionId, username, socketClient: socketClient.current }),
    [isAuthenticated, init, isAdmin, username, sessionId, socketClient.current]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
