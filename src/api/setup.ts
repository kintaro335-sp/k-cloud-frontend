import axios from 'axios';
// types
import { ConfiguredResponse } from '../@types/setup';
import { MessageResponse } from '../@types/auth';
import { apiUrl } from '../config';

const setupConn = axios.create({ baseURL: `${apiUrl}/setup` });

export async function getIsConfigured(): Promise<ConfiguredResponse> {
  const resp = await setupConn.get('/is-configured');
  return resp.data;
}

export async function createFirstUser(username: string, password: string): Promise<MessageResponse> {
  const resp = await setupConn.post('create-first-user', { username, password });
  return resp.data;
}
