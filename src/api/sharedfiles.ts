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
  publict: boolean,
  expire: number,
  token: string
): Promise<{ id: string }> {
  const response = await sfconn.post(`share/${path}?t=${token}`, { expires, expire, public: publict });
  return response.data;
}

export async function getTokenInfo(id: string): Promise<SFInfoResponse> {
  const response = await sfconn.get(`info/${id}`);
  return response.data;
}

export async function deleteToken(id: string, token: string): Promise<{ message: string }> {
  const response = await sfconn.delete(`token/${id}?t=${token}`);
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
// funciones creadas a partir de las principales funciones

export async function shareMultipleFiles(path: string, fileNames: string[], token: string) {
  const fileNamesR = JSON.parse(JSON.stringify(fileNames)) as string[];
  const shareRequests = fileNamesR.map(async (fileName, i) => {
    return new Promise((res) => {
      setTimeout(() => {
        shareFile(path + '/' + fileName, false, true, Date.now(), token)
          .then(() => {
            res(1);
          })
          .catch(() => {
            res(0);
          });
      }, (1 + i) * 1000);
    });
  });
  return await Promise.all(shareRequests);
}

export async function StopShareFiles(path: string, fileNames: string[], token: string) {
  const fileNamesR = JSON.parse(JSON.stringify(fileNames)) as string[];
  const requests = fileNamesR.map(async (fileName, i): Promise<1 | 0> => {
    return new Promise((res) => {
      deleteTokensByPath(path + '/' + fileName, token)
        .then(() => {
          res(1);
        })
        .catch(() => {
          res(0);
        });
    });
  });
  return await Promise.all(requests);
}

// with auth

export async function getTokensListByUser(page: number, token: string): Promise<TokenElement[]> {
  const result = await sfconn.get(`tokens/user/page/${page}?t=${token}`);
  return result.data;
}

export async function getTokenPagesByUser(token: string): Promise<{ pages: number }> {
  const result = await sfconn.get(`tokens/user/pages?t=${token}`);
  return result.data;
}


export async function getTokenInfoByUser(id: string, token:string): Promise<SFInfoResponse> {
  const response = await sfconn.get(`tokens/user/info/${id}?t=${token}`);
  return response.data;
}

interface newTokenInfoProps {
  expire: boolean;
  publict: boolean;
  expires: Date;
}

export async function updateToken(idT: string, newSF: newTokenInfoProps, token: string) {
  const result = await sfconn.post(`tokens/user/${idT}?t=${token}`, {
    expires: newSF.expire,
    expire: newSF.expires.getTime(),
    public: newSF.publict
  });
  return result.data;
}
