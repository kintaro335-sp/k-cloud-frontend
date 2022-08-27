import axios from 'axios';
import { apiUrl } from '../config';

const connFiles = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

export interface FileP {
  name: string;
  type: string;
  size: number;
  extension: string;
  mime_type: string;
}

export interface ListFile {
  list: FileP[];
}

export async function getListFiles(path: string, token: string): Promise<ListFile> {
  const response = await connFiles.get(`/files/${path}?t=${token}`);
  return response.data;
}

export async function createFolder(path: string, token: string): Promise<{ message: string }> {
  const response = await connFiles.post(`/files/folder/${path}?t=${token}`, {});
  return response.data;
}

export async function uploadFile(
  path: string,
  file: File,
  token: string,
  onUploadProgress?: (progressEvent: any) => void
): Promise<any> {
  const formData = new FormData();
  formData.append(`file`, file);
  await connFiles.post(`/files/${path}?t=${token}`, formData, {
    onUploadProgress
  });
}

export async function deleteFile(path: string, token: string): Promise<{ message: string }> {
  return new Promise((resolve, reject) => {
    connFiles
      .delete(`/files/${path}?t=${token}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
