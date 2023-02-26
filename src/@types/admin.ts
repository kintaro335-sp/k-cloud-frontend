export interface User {
  id: string;
  username: string;
  admin: boolean;
}

export interface AdminState {
  userInterval: number | null;
  users: User[];
}
