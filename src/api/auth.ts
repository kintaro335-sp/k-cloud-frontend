import axios from 'axios';
import { apiUrl } from '../config';

const connAuth = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

interface AuthResponse {
  access_token: string;
}

export async function crsfToken() {
  const response = await connAuth.get('/');
  return response.data;
}

export async function verifyAuth(token: string): Promise<AuthResponse> {
  const response = await connAuth.get(`/auth?t=${token}`);
  return response.data;
}

export async function loginApi(username: string, password: string): Promise<AuthResponse> {
  const response = await connAuth.post('/auth/login', {
    username,
    password
  });

  return response.data;
}

export async function registerApi(username: string, password: string): Promise<AuthResponse> {
  console.log(apiUrl);
  const response = await connAuth.post('/auth/register', {
    username,
    password
  });

  return response.data;
}
