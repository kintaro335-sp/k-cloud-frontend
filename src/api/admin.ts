import axios from 'axios';
import { apiUrl } from '../config';
import { User, SpaceUsed, SpaceConfig } from '../@types/admin';
import { MessageResponse } from '../@types/auth';

const conn = axios.create({
  baseURL: `${apiUrl}/admin`
});

export async function getAccounts(token: string): Promise<User[]> {
  const result = await conn.get(`users/list?t=${token}`);
  return result.data;
}

export async function setPassword(token: string, userid: string, newPassword: string): Promise<MessageResponse> {
  const result = await conn.post(`users/password/${userid}?t=${token}`, { password: newPassword });
  return result.data;
}

export async function setAdmin(token: string, userid: string, admin: boolean): Promise<MessageResponse> {
  const result = await conn.post(`users/admin/${userid}?t=${token}`, { admin });
  return result.data;
}

export async function createAccount(token: string, username: string, password: string): Promise<MessageResponse> {
  const result = await conn.post(`users/create?t=${token}`, { username, password });
  return result.data;
}

export async function getusedSpace(token: string, update: boolean): Promise<SpaceUsed> {
  if (update) {
    const result = await conn.get(`used-space/update?t=${token}`);
    return result.data;
  } else {
    const result = await conn.get(`used-space?t=${token}`);
    return result.data;
  }
}

export async function setDedicatedSpace(token: string, type: string, quantity: number): Promise<MessageResponse> {
  const result = await conn.post(`dedicated-space?t=${token}`, { unitTipe: type, quantity });
  return result.data;
}

export async function getDedicatedSpaceConfig(token: string): Promise<SpaceConfig> {
  const result = await conn.get(`dedicated-space?t=${token}`);
  return result.data;
}
