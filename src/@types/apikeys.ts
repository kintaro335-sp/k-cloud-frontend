/*
 * k-cloud-frontend
 * Copyright(c) 2022 Kintaro Ponce
 * MIT Licensed
 */

export interface ApiKey {
  id: string;
  token: string;
  name: string;
}

export interface Session {
  id: string;
  expire: Date;
  device: string;
}
