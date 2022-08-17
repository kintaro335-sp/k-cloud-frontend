import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

interface UseAuth {
  isAuthenticated: boolean;
}

const useAuth = (): UseAuth => useContext(AuthContext);

export default useAuth;
