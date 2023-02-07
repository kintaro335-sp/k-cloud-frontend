import { createContext, useState, useMemo, useEffect } from 'react';
// redux
import { useSelector } from '../redux/store';
// api
import { verifyAuth } from '../api/auth';

export const AuthContext = createContext({
  isAdmin: false,
  isAuthenticated: false,
  init: false
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [init, setInit] = useState(false);
  const { access_token } = useSelector((state) => state.session);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function verifyAuthToken() {
      if (access_token !== '') {
        verifyAuth(access_token)
          .then((u) => {
            setIsAdmin(u.isadmin);
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

  const value = useMemo(() => ({ isAuthenticated, init, isAdmin }), [isAuthenticated, init, isAdmin]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
