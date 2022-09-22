import axios from 'axios';
import { apiUrl } from '../config';

const connAuth = axios.create({
  baseURL: `${apiUrl}/auth`,
  headers: {
    'Content-Type': 'application/json'
  }
});

interface AuthResponse {
  access_token: string;
}

interface MessageResponse {
  message: string;
}

export async function verifyAuth(token: string): Promise<AuthResponse> {
  const response = await connAuth.get(`?t=${token}`);
  return response.data;
}

export async function loginApi(username: string, password: string): Promise<AuthResponse> {
  const response = await connAuth.post('/login', {
    username,
    password
  });

  return response.data;
}

export async function registerApi(username: string, password: string): Promise<AuthResponse> {
  const response = await connAuth.post('/register', {
    username,
    password
  });

  return response.data;
}

export async function changePassword(password: string, newPassword: string, token: string): Promise<MessageResponse> {
  const response = await connAuth.put(`/password?t=${token}`, { password, newPassword });

  return response.data;
}
