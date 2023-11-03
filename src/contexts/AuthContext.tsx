import { createContext, useState, useMemo, useEffect, useRef } from 'react';
// redux
import { useSelector, useDispatch } from '../redux/store';
import { setFiles } from '../redux/slices/session';
// api
import { verifyAuth } from '../api/auth';
import { getListFiles } from '../api/files';
import { createNewSocket } from '../api/websocket';

export const AuthContext = createContext({
  isAdmin: false,
  isAuthenticated: false,
  init: false,
  username: ''
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const [init, setInit] = useState(false);
  const socketClient = useRef(createNewSocket());
  const { access_token, path } = useSelector((state) => state.session);
  const [username, setUsername] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function verifyAuthToken() {
      if (access_token !== '') {
        verifyAuth(access_token)
          .then((u) => {
            setIsAdmin(u.isadmin);
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
    const newSocket = createNewSocket();
    newSocket.auth = { access_token };
    newSocket.on('message', (data) => {
      console.log(data);
    });
    newSocket.connect();
    socketClient.current = newSocket;
  }, [access_token]);

  useEffect(() => {
    socketClient.current.removeListener('file-change');
    socketClient.current.removeListener('token-change');
    const listener = async (msg: { path: string }) => {
      if (msg.path !== path) {
        return;
      }
      const listFiles = await getListFiles(path, access_token);
      dispatch(setFiles(listFiles.list));
    };
    socketClient.current.on('file-change', listener);
    socketClient.current.on('token-change', listener);
  }, [socketClient.current, access_token, path]);

  const value = useMemo(
    () => ({ isAuthenticated, init, isAdmin, username }),
    [isAuthenticated, init, isAdmin, username]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
