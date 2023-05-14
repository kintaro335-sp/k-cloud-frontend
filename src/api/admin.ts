import axios from 'axios';
import { apiUrl } from '../config';
import { User, SpaceUsed, SpaceConfig, UsedSpaceUser, UsageG } from '../@types/admin';
import { MessageResponse } from '../@types/auth';
import { UsedSpaceType } from '../@types/files';

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

export async function getUsedSpaceUser(token: string): Promise<UsedSpaceUser[]> {
  const result = await conn.get(`used-space/users?t=${token}`);
  return result.data;
}

export async function getUsedSpaceByFileType(token: string): Promise<UsedSpaceType[]> {
  const result = await conn.get(`used-space/files?t=${token}`);
  return result.data;
}

export async function setDedicatedSpace(token: string, type: string, quantity: number): Promise<MessageResponse> {
  const result = await conn.post(`dedicated-space?t=${token}`, { unitTipe: type, quantity });
  return result.data;
}

export async function getDedicatedSpaceConfig(token: string): Promise<SpaceConfig> {
  const result = await conn.get(`dedicated-space?t=${token}`);
  return result.data;
}

export async function getMemoryUsageRss(token: string): Promise<UsageG> {
  const result = await conn.get(`memory/rss`);
  return result.data;
}

export async function getMemoryUsageBuffer(token: string): Promise<UsageG> {
  const result = await conn.get(`memory/buffer`);
  return result.data;
}
