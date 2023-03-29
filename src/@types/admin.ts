export type UnitByte = 'MB' | 'GB';

export interface SpaceConfig {
  dedicatedSpace: number;
  unitType: UnitByte;
}

export interface User {
  id: string;
  username: string;
  admin: boolean;
}

export interface AdminState {
  userInterval: number | null;
  users: User[];
}

export interface SpaceUsed {
  total: number;
  used: number;
}
