import { createContext, useRef } from 'react';

export const filesC = createContext({ files: {} });

export default function FilesContext({ children }: { children: React.ReactElement }) {
  const files = useRef({});

  return <filesC.Provider value={{ files: files.current }}>{children}</filesC.Provider>;
}
