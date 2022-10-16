import axios from 'axios';
import { apiUrl } from '../config';
import { User } from '../@types/admin';

const conn = axios.create({
  baseURL: `${apiUrl}/admin/users`
});

export async function getAccounts(token: string): Promise<User[]> {
  const result = await conn.get(`/list?t=${token}`);
  return result.data;
}
