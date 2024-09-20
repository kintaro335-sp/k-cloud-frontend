/*
 * k-cloud-frontend
 * Copyright(c) 2022 Kintaro Ponce
 * MIT Licensed
 */

export interface UserPayload {
  sessionId: string;
  userId: string;
  username: string;
  isadmin: boolean;
}

export interface AuthResponse {
  access_token: string;
}

export interface MessageResponse {
  message: string;
}
