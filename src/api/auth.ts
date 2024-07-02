import axios from 'axios';
import { apiUrl } from '../config';
import { AuthResponse, MessageResponse, UserPayload } from '../@types/auth';
import { ApiKey, Session } from '../@types/apikeys';

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

export async function logoutApi(token: string): Promise<MessageResponse> {
  const response = await connAuth.post(`/logout?t=${token}`);
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

export async function revokeSession(token: string, sessionId: string): Promise<MessageResponse> {
  const response = await connAuth.post(`/revoke/${sessionId}?t=${token}`);
  return response.data;
}

export async function getSessions(token: string): Promise<{ data: Session[]; total: number }> {
  const response = await connAuth.get(`/sessions?t=${token}`);
  return response.data;
}

export async function getApiKeys(token: string): Promise<{ data: ApiKey[]; total: number }> {
  const response = await connAuth.get(`/apikeys?t=${token}`);
  return response.data;
}

export async function createApiKey(token: string, name: string): Promise<ApiKey> {
  const response = await connAuth.post(`/apikeys?t=${token}`, { name });
  return response.data;
}
