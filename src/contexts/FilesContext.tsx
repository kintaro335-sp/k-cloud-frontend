import { createContext, useRef } from 'react';
import { FileToUpload } from '../@types/files';

export const filesC = createContext<{ files: Record<string, FileToUpload> }>({ files: {} });

export default function FilesContext({ children }: { children: React.ReactElement }) {
  const files = useRef({});

  return <filesC.Provider value={{ files: files.current }}>{children}</filesC.Provider>;
}
