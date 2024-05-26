export interface SendedBlobs {
  from: number;
  to: number;
}

export interface FilePTempResponse {
  name: string;
  size: number;
  received: number;
  saved: number;
  completed: boolean;
  blobsNum: number;
}

export interface FileToUpload {
  inicializado: boolean;
  uploading: boolean;
  size: number;
  sended: number;
  written: number;
  blobSended: SendedBlobs[];
  totalBlobs: number;
  blobsSended: number;
  blobProgress: number;
}

type BytesWritten = { from: number; to: number };
export type FileType = 'folder' | 'file';

export interface FilePTempResponse {
  name: string;
  size: number;
  received: number;
  saved: number;
  bytesWritten: Array<BytesWritten>;
  completed: boolean;
}

export interface NewFile {
  path: string;
  file: File | null;
}

export interface BlobToWrite {
  path: string;
  position: number;
  size: number;
}

export interface FileI {
  name: string;
  type: FileType;
  size: number;
  tokens: number;
  extension: string;
  mime_type: string;
}

export interface UpdateFileEvent {
  userid: string;
  path: string;
  type: 'add' | 'substitute';
  content: FileI
} 

export interface Folder {
  type: 'Folder';
  name: string;
  content: Array<Folder | FileI>;
}

export interface UsedSpaceType {
  type: string;
  used: number;
}

