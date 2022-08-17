import axios from 'axios';
import { apiUrl } from '../config';

const connFiles = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

export interface File {
  name: string;
  type: string;
  size: number;
  extension: string;
  mime_type: string;
}

export interface ListFile {
  list: File[];
}

export async function getListFiles(path: string, token: string): Promise<ListFile> {
  const response = await connFiles.get(`/files/${path}?t=${token}`);
  return response.data;
}
