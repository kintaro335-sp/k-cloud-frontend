export interface SendedBlobs {
  from: number;
  to: number;
}

export interface FileToUpload {
  file: File;
  size: number;
  sended: number;
  blobSended: SendedBlobs[];
}

type BytesWritten = { from: number; to: number };

export interface FilePTempResponse {
  name: string;
  size: number;
  received: number;
  saved: number;
  bytesWritten:Array<BytesWritten>;
  completed: boolean;
}