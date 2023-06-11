import { createContext, useState } from 'react';

export const FileSelectC = createContext<{
  files: string[];
  select: (val: string) => void;
  deselect: (val: string) => void;
  clearSelect: (val: string) => void;
  showOptions: boolean;
}>({
  files: [],
  select: (val) => {},
  deselect: (val) => {},
  clearSelect: (val) => {},
  showOptions: false
});

export default function FileSelectContext({ children }: { children: React.ReactNode }) {
  const [files, setFiles] = useState<string[]>([]);

  const select = (val: string) => {
    setFiles((files) => [...files, val]);
  };

  const deselect = (val: string) => {
    setFiles((files) => files.filter((f) => f !== val));
  };

  const clearSelect = (val: string) => {};

  return (
    <FileSelectC.Provider value={{ files, select, deselect, clearSelect, showOptions: files.length !== 0 }}>
      {children}
    </FileSelectC.Provider>
  );
}
