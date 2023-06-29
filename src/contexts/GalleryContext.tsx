import { createContext, useState } from 'react';
import { Dialog, Box } from '@mui/material';
// redux
import { useSelector } from '../redux/store';
// config
import { apiUrl } from '../config';

export const GalleryContextC = createContext({ openImage: (file: number, sfc?: boolean) => {} });

interface GalleryContextProps {
  children: JSX.Element;
}

export default function GalleryContext({ children }: GalleryContextProps) {
  const session = useSelector((state) => state.session);
  const sharedfiles = useSelector((state) => state.sharedfiles);
  const sharedfile = useSelector((state) => state.sharedfile);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const [sfc, setSfc] = useState(false);

  const openImage = (file: number, sfc = false) => {
    setOpen(true);
    setSelected(file);
  };

  return (
    <GalleryContextC.Provider value={{ openImage }}>
      <Dialog open={open}>
        <Box />
      </Dialog>
      {children}
    </GalleryContextC.Provider>
  );
}
