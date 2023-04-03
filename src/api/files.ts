import axios from 'axios';
import axiosObs from 'axios-observable';
import { apiUrl } from '../config';
import { FileI, FilePTempResponse, Folder } from '../@types/files';

const connFilesObs = axiosObs.create({
  baseURL: `${apiUrl}/files`
});

const connFiles = axios.create({
  baseURL: `${apiUrl}/files`
});

export interface ListFile {
  list: FileI[];
}

export interface BlobFP {
  position: number;
  blob: string;
}

export async function getListFiles(path: string, token: string): Promise<ListFile> {
  const response = await connFiles.get(`/list/${path}?t=${token}`);
  return response.data;
}

export async function createFolder(path: string, token: string): Promise<{ message: string }> {
  const response = await connFiles.post(`/folder/${path}?t=${token}`, {});
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
  await connFiles.post(`/upload/${path}?t=${token}`, formData, {
    onUploadProgress
  });
}

export async function deleteFile(path: string, token: string): Promise<{ message: string }> {
  return new Promise((resolve, reject) => {
    connFiles
      .delete(`/${path}?t=${token}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function initializeFileAPI(path: string, size: number, token: string) {
  return new Promise((resolve, reject) => {
    connFiles
      .post(`/initialize/${path}?t=${token}`, { size })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function writeBlobAPI(path: string, position: number, blob: string, token: string) {
  return new Promise((resolve, reject) => {
    connFiles
      .post(`/writebase64/${path}?t=${token}`, { position, blob })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}

export async function uploadBlobAPI(
  path: string,
  position: number,
  blob: Blob,
  token: string,
  cb?: (newProgress: number) => void
) {
  return new Promise((resolve, reject) => {
    const f = new File([blob], `blob-${position}`, { type: '' });
    const formdata = new FormData();
    formdata.append('file', f);
    connFiles
      .post(`/write/${path}?pos=${position}&t=${token}`, formdata, {
        onUploadProgress: (progressEvent) => {
          if (typeof cb === 'function') {
            if (progressEvent.progress === undefined) return;
            cb(progressEvent.progress * 100);
          }
        }
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}

export async function statusFileAPI(path: string, token: string): Promise<FilePTempResponse> {
  return new Promise((resolve, reject) => {
    connFiles
      .get(`status/${path}?t=${token}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function closeFileAPI(path: string, token: string) {
  return new Promise((resolve, reject) => {
    connFiles
      .post(`close/${path}?t=${token}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function getTreeAPI(path: string, token: string): Promise<Array<Folder | FileI>> {
  return new Promise((resolve, reject) => {
    connFiles
      .get(`tree/${path}?t=${token}`)
      .then((res) => {
        resolve(res.data.content);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
