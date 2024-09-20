/*
 * k-cloud-frontend
 * Copyright(c) 2022 Kintaro Ponce
 * MIT Licensed
 */

import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useAuth = () => useContext(AuthContext);

export default useAuth;
