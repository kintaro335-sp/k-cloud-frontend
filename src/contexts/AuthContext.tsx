import { createContext, useState, useMemo, useEffect } from 'react';
// redux
import { SessionState } from '../redux/slices/session';
import { useSelector } from '../redux/store';
// api
import { verifyAuth } from '../api/auth';

export const AuthContext = createContext({
  isAuthenticated: false,
  init: false
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [init, setInit] = useState(false);
  const { access_token } = useSelector((state: { session: SessionState }) => state.session);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function verifyAuthToken() {
      if (access_token) {
        verifyAuth(access_token)
          .then(() => {
            setIsAuthenticated(true);
            setInit(true);
          })
          .catch(() => {
            setIsAuthenticated(false);
            setInit(true);
          });
      }
    }
    verifyAuthToken();
  }, [access_token]);

  const value = useMemo(() => ({ isAuthenticated, init }), [isAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
