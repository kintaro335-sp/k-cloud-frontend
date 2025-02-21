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

export type Scope =
  | 'files:read'
  | 'files:create'
  | 'files:delete'
  | 'files:rename'
  | 'files:move'
  | 'tokens:read'
  | 'tokens:create'
  | 'tokens:update'
  | 'tokens:delete'
  | 'admin:users'
  | 'admin:activity-read'
  | 'admin:memory-usage'
  | 'admin:manage-options'
  | 'admin:stats'
  | 'auth:read-api-keys'
  | 'auth:create-api-keys'
  | 'auth:read-sessions'
  | 'auth:delete-sessions'
  | 'auth:edit-api-keys';

