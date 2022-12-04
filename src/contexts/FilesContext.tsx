import { createContext, useRef } from 'react';
import { FileToUpload } from '../@types/files';

export const filesC = createContext<{
  files: Record<string, FileToUpload | null>;
  addFile: (path: string, file: File) => void;
}>({
  files: {},
  addFile: (path: string, file: File) => {}
});

export default function FilesContext({ children }: { children: React.ReactElement }) {
  const files = useRef<Record<string, FileToUpload | null>>({});

  const addFile = (path: string, file: File) => {
    files.current[path] = {
      sended: 0,
      size: file.size,
      file,
      blobSended: []
    };
  };

  return <filesC.Provider value={{ files: files.current, addFile }}>{children}</filesC.Provider>;
}
