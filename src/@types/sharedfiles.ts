import { FileType } from './files';

export interface TokenElement {
  type: FileType;
  name: string;
  id: string;
  expire: boolean;
  expires: number;
}

export interface SFInfoResponse {
  type: FileType;
  name: string;
  mime_type: string;
  size: number;
  expire: boolean;
  expires: number;
}
