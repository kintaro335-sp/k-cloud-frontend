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
  owner: string | null
  users: User[];
}

export interface SpaceUsed {
  total: number;
  used: number;
}

export interface UsedSpaceUser {
  id: string;
  username: string;
  usedSpace: number;
}

export interface UsageG {
  usage: number;
}

export interface LogR {
  date: number;
  route: string;
  statusCode: string;
  method: string;
}

export type ActionT = 'CREATED' | 'READ' | 'DOWNLOAD' | 'DELETE' | 'DOWNLOAD_ZIP' | 'MODIFY';

export type statusT = 'ALLOWED' | 'DENIED';

export type reasonT = 'NOT_EXIST' | 'EXPIRED' | 'WRONG_OWNER' | 'NONE';

export interface SharedFileActivity {
  id: string;
  date: Date;
  action: ActionT;
  status: statusT;
  reason: reasonT;
  user: string;
  tokenid: string;
  path: string;
}
