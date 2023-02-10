export interface SendedBlobs {
  from: number;
  to: number;
}

export interface FileToUpload {
  file: File;
  inicializado: boolean;
  uploading: boolean;
  size: number;
  sended: number;
  blobSended: SendedBlobs[];
  totalBlobs: number;
  blobsSended: number;
}

type BytesWritten = { from: number; to: number };

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
