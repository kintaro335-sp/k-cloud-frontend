export interface User {
  id: string;
  username: string;
  admin: boolean;
}

export interface AdminState {
  users: User[];
}
