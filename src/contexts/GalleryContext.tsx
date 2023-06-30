import { createContext, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Dialog, Box } from '@mui/material';
// redux
import { useSelector } from '../redux/store';
// config
import { apiUrl } from '../config';

export const GalleryContextC = createContext({
  openImage: (file: number | string, sfc?: boolean, isFileSfc?: boolean) => {}
});

interface GalleryContextProps {
  children: JSX.Element;
}

export default function GalleryContext({ children }: GalleryContextProps) {
  const { id } = useParams();
  const session = useSelector((state) => state.session);
  const sharedfile = useSelector((state) => state.sharedfile);

  const [open, setOpen] = useState(false);
  const [RawURL, setRawURL] = useState('');
  const [selected, setSelected] = useState(0);
  const [sfc, setSfc] = useState(false);
  const [isFileSF, setIsFileSF] = useState(false);

  const openImage = (file: number | string, sfcc = false, isFileSfc = false) => {
    setSfc(sfcc);
    setIsFileSF(isFileSfc);
    if (typeof file === 'string') {
      setRawURL(file);
    } else {
      setRawURL('');
      setSelected(file);
    }
    setOpen(true);
  };
  const pathSelected = sfc ? sharedfile.path : session.path;
  const diagonal = pathSelected ? '/' : '';

  const firstdiagonal = isFileSF ? '' : '/';

  const urlComplete = sfc
    ? `${apiUrl}/shared-file/content/${id}${firstdiagonal}${sharedfile.path}${diagonal}${
        isFileSF ? '' : sharedfile.content[selected]?.name
      }`
    : `${apiUrl}/files/list/${session.path}${diagonal}${session.files[selected]?.name}?t=${session.access_token}`;

  return (
    <GalleryContextC.Provider value={{ openImage }}>
      <Dialog
        open={open}
        maxWidth="md"
        onClose={() => {
          setOpen(false);
        }}
      >
        <Box component="img" src={RawURL === '' ? urlComplete : RawURL} height="auto" width="100%" />
      </Dialog>
      {children}
    </GalleryContextC.Provider>
  );
}
