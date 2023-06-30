import { createContext, useState } from 'react';

export const FileSelectC = createContext<{
  files: string[];
  select: (val: string) => void;
  selectAll: (files: string[]) => void;
  deselect: (val: string) => void;
  clearSelect: () => void;
  showOptions: boolean;
}>({
  files: [],
  select: (val) => {},
  selectAll: (files) => {},
  deselect: (val) => {},
  clearSelect: () => {},
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

  const selectAll = (filesN: string[]) => {
    setFiles(filesN);
  };

  const clearSelect = () => {
    setFiles([]);
  };

  return (
    <FileSelectC.Provider value={{ files, select, deselect, clearSelect, selectAll, showOptions: files.length !== 0 }}>
      {children}
    </FileSelectC.Provider>
  );
}
