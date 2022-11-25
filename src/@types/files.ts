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
