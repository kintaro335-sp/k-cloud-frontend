import { FileType } from './files';

export interface TokenElement {
  type: FileType;
  name: string;
  id: string;
  mime_type: string;
  expire: boolean;
  publict: boolean;
  expires: number;
}

export interface SFInfoResponse {
  type: FileType;
  name: string;
  mime_type: string;
  size: number;
  createdAt: number;
  expire: boolean;
  expires: number;
}
