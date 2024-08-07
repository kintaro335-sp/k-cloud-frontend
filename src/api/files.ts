import axios from 'axios';
import { apiUrl } from '../config';
import { FileI, FilePTempResponse, Folder } from '../@types/files';

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

export async function uploadFileAPI(
  path: string,
  file: File,
  token: string,
  cb?: (progressEvent: any) => void
): Promise<number> {
  const formData = new FormData();
  formData.append(`file`, file);

  return new Promise((res) => {
    connFiles
      .post(`/upload/${path}?t=${token}`, formData, {
        onUploadProgress: (progressEvent) => {
          if (typeof cb === 'function') {
            if (progressEvent.progress === undefined) return;
            cb(progressEvent.progress);
          }
        }
      })
      .then(() => {
        res(1);
      })
      .catch((err) => {
        res(0);
      });
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
            cb(progressEvent.progress);
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

export async function statusFileAPI(path: string, token: string): Promise<FilePTempResponse | null> {
  return new Promise((resolve, reject) => {
    connFiles
      .get(`status/${path}?t=${token}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        resolve(null);
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

export async function moveFile(
  path: string,
  newPath: string,
  fileName: string,
  token: string
): Promise<{ message: string }> {
  const diagonalP = path === '' ? '' : '/';
  const diagonalNP = newPath === '' ? '' : '/';
  const pathComplete = `${path}${diagonalP}${fileName}`;
  const newPathComplete = `${newPath}${diagonalNP}${fileName}`;

  return new Promise((resolve, reject) => {
    connFiles
      .post(`move/file/${pathComplete}?t=${token}`, { newpath: newPathComplete })
      .then((result) => {
        resolve(result.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function moveFiles(
  path: string,
  newPath: string,
  files: string[],
  token: string
): Promise<{ message: string }> {
  const pathComplete = `${path}`;
  const newPathComplete = `${newPath}`;

  return new Promise((resolve, reject) => {
    connFiles
      .post(`move/files/${pathComplete}?t=${token}`, { newPath: newPathComplete, files })
      .then((result) => {
        resolve(result.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export async function renameFile(url: string, newName: string, token: string) {
  const result = await connFiles.post(`rename/${url}?t=${token}`, { newName });
  return result.data;
}

// funciones creadas a partir de las anteriores

export async function deleteSelectedFiles(
  path: string,
  fileNames: string[],
  token: string
): Promise<{ message: string; files: number }> {
  const result = await connFiles.patch(`deletemp/${path}?t=${token}`, { files: fileNames });
  return result.data;
}
