/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { Scope } from '../../@types/apikeys';

export const scopeList: Scope[] = [
  'files:create',
  'files:delete',
  'files:move',
  'files:read',
  'files:rename',
  'tokens:create',
  'tokens:delete',
  'tokens:read',
  'tokens:update',
  'auth:create-api-keys',
  'auth:delete-sessions',
  'auth:edit-api-keys',
  'auth:read-api-keys',
  'auth:read-sessions',
  'admin:activity-read',
  'admin:manage-options',
  'admin:memory-usage',
  'admin:stats',
  'admin:users'
];
