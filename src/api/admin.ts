import axios from 'axios';
import { apiUrl } from '../config';
import { User } from '../@types/admin';
import { MessageResponse } from '../@types/auth';

const conn = axios.create({
  baseURL: `${apiUrl}/admin/users`
});

export async function getAccounts(token: string): Promise<User[]> {
  const result = await conn.get(`/list?t=${token}`);
  return result.data;
}

export async function setPassword(token: string, userid: string, newPassword: string): Promise<MessageResponse> {
  const result = await conn.post(`/password/${userid}?t=${token}`);
  return result.data;
}

export async function setAdmin(token: string, userid: string, admin: boolean): Promise<MessageResponse> {
  const result = await conn.post(`/admin/${userid}?t=${token}`);
  return result.data;
}
