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
