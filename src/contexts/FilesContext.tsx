import { createContext, useRef, useMemo } from 'react';
import { FileToUpload } from '../@types/files';
import { useSelector } from '../redux/store';
import { initializeFile, writeBlob, closeFile } from '../api/files';
import { getBase64File, BLOB_SIZE, getNumberBlobs } from '../utils/files';

export const filesC = createContext<{
  files: Record<string, FileToUpload | null>;
  addFile: (path: string, file: File | null) => void;
  uploadFiles: VoidFunction;
}>({
  files: {},
  addFile: (path: string, file: File | null) => {},
  uploadFiles: () => {}
});

export default function FilesContext({ children }: { children: React.ReactElement }) {
  const { access_token } = useSelector((state) => state.session);

  const files = useRef<Record<string, FileToUpload | null>>({});

  const initializeFileC = async (path: string) => {
    const file = files.current[path];
    if (file === null) return;
    //return initializeFile(path, access_token);
  };

  const CloseFileC = async (path: string) => {
    const file = files.current[path];
    if (file === null) return;
    return closeFile(path, access_token);
  };

  const writeBlobC = async (file: File, position: number, size: number) => {
    const blobToWrite = file.slice(position, size);
    const text = await getBase64File(blobToWrite);
    if (text === undefined) return;
    //const blob = await text.split(',')[1];
    return blobToWrite.size;
  };

  const uploadFiles = async () => {
    const filesL = Object.keys(files.current);

    filesL.forEach((f) => {
      const file = files.current[f];
      if (file === null) return;
      const FSize = file.file.size;
      const numberBlob = getNumberBlobs(FSize);
      [...new Array(numberBlob)].forEach((_, i) => {
        const position = i === 0 ? i * BLOB_SIZE : i * BLOB_SIZE + 1;
        const size = i === 0 ? position + BLOB_SIZE : position + BLOB_SIZE - 1;
        writeBlobC(file.file, position, size).then((sizeWritten) => {
          if (files.current[f] !== null) {
            //@ts-ignore
            files.current[f].sended += sizeWritten;
          }
        });
      });
    });
  };

  const addFile = (path: string, file: File | null) => {
    if (file === null) return;
    files.current[`${path}/${file.name}`] = {
      inicializado: false,
      sended: 0,
      size: file.size,
      file,
      blobSended: []
    };
  };

  const contextValue = useMemo(
    () => ({
      files: files.current,
      addFile,
      uploadFiles
    }),
    [files, addFile]
  );

  return <filesC.Provider value={contextValue}>{children}</filesC.Provider>;
}
