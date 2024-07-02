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
