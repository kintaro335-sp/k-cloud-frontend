import axios from 'axios';
import { apiUrl } from '../config';
import { User, SpaceUsed, SpaceConfig, UsedSpaceUser, UsageG, SharedFileActivity } from '../@types/admin';
import { MessageResponse } from '../@types/auth';
import { UsedSpaceType } from '../@types/files';
import { GROUPFILTER, TIMEOPTION, StatsLineChart } from '../@types/stats';

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

export async function getOwner(token: string): Promise<{ id: string }> {
  const result = await conn.get(`users/owner?t=${token}`);
  return result.data;
}

export async function setOwner(token: string, userId: string) {
  const result = await conn.patch(`users/owner/${userId}?t=${token}`);
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
  const result = await conn.get(`memory/rss?t=${token}`);
  return result.data;
}

export async function getMemoryUsageBuffer(token: string): Promise<UsageG> {
  const result = await conn.get(`memory/buffer?t=${token}`);
  return result.data;
}

export async function getMemoryUsageData(token: string): Promise<StatsLineChart> {
  const result = await conn.get(`memory/stats/line?t=${token}`);
  return result.data;
}

export async function getLineChartData(group: GROUPFILTER, time: TIMEOPTION, token: string): Promise<StatsLineChart> {
  const result = await conn.get(`logs/stats/${group}/line/${time}?t=${token}`);
  return result.data;
}

export async function getLogsList(page: number, token: string): Promise<SharedFileActivity[]> {
  const result = await conn.get(`logs/list?page=${page}&t=${token}`);
  return result.data;
}

export async function getPagesLogs(token: string): Promise<{ pages: number }> {
  const result = await conn.get(`logs/pages?t=${token}`);
  return result.data;
}

export async function getAbout(): Promise<{ app: string; version: string }> {
  const result = await axios.get(`${apiUrl}`);
  return result.data; 
}
