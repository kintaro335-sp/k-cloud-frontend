import axios from 'axios';
import { TokenElement, SFInfoResponse } from '../@types/sharedfiles';
import { FileI } from '../@types/files';
import { apiUrl } from '../config';

const sfconn = axios.create({
  baseURL: `${apiUrl}/shared-file`
});

export async function shareFile(
  path: string,
  expires: boolean,
  expire: number,
  token: string
): Promise<{ id: string }> {
  const response = await sfconn.post(`share/${path}?t=${token}`, { expires, expire });
  return response.data;
}

export async function getTokenInfo(id: string): Promise<SFInfoResponse> {
  const response = await sfconn.get(`info/${id}`);
  return response.data;
}

export async function deleteToken(id: string, token: string): Promise<{ message: string }> {
  const response = await sfconn.delete(`/${id}?t=${token}`);
  return response.data;
}

export async function getContentTokenPath(id: string, path: string): Promise<{ list: FileI[] }> {
  const response = await sfconn.get(`content/${id}/${path}`);
  return response.data;
}

export async function getContentToken(id: string): Promise<{ list: FileI[] }> {
  const response = await sfconn.get(`content/${id}`);
  return response.data;
}

export async function getTokensByPath(path: string, token: string): Promise<TokenElement[]> {
  const response = await sfconn.get(`tokens/path/${path}?t=${token}`);
  return response.data;
}

export async function deleteTokensByPath(path: string, token: string): Promise<{ message: string }> {
  const response = await sfconn.delete(`tokens/path/${path}?t=${token}`);
  return response.data;
}

export async function getTokensList(page: number): Promise<TokenElement[]> {
  const response = await sfconn.get(`tokens/list?page=${page}`);
  return response.data;
}

export async function getPagesTokens(): Promise<{ pages: number }> {
  const response = await sfconn.get(`tokens/pages`);
  return response.data;
}
