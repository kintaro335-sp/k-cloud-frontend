import { createContext, useRef, useMemo } from 'react';
import { FileToUpload } from '../@types/files';
import { useSelector } from '../redux/store';
import { initializeFile, writeBlob, closeFile } from '../api/files';

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
    initializeFile(path, access_token);
  };

  const uploadFiles = () => {
    const filesL = Object.keys(files.current);
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
    [files.current, addFile]
  );

  return <filesC.Provider value={contextValue}>{children}</filesC.Provider>;
}
