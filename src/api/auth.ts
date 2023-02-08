import axios from 'axios';
import { apiUrl } from '../config';
import { AuthResponse, MessageResponse, UserPayload } from '../@types/auth';

const connAuth = axios.create({
  baseURL: `${apiUrl}/auth`,
  headers: {
    'Content-Type': 'application/json'
  }
});

export async function verifyAuth(token: string): Promise<UserPayload> {
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
