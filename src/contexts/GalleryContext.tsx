import { createContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Dialog, Box, Stack, IconButton } from '@mui/material';
// icon
import { Icon } from '@iconify/react';
import iconRight from '@iconify/icons-material-symbols/arrow-right-alt-rounded';
import iconLeft from '@iconify/icons-material-symbols/arrow-left-rounded';
// redux
import { useSelector } from '../redux/store';
// config
import { apiUrl } from '../config';

export const GalleryContextC = createContext({
  openImage: (file: number | string, sfc?: boolean, isFileSfc?: boolean, tokenView?: boolean) => {}
});

interface GalleryContextProps {
  children: JSX.Element;
}

type OptionImg = 'next' | 'before';

export default function GalleryContext({ children }: GalleryContextProps) {
  const { id } = useParams();
  const session = useSelector((state) => state.session);
  const sharedfile = useSelector((state) => state.sharedfile);
  const tokenview = useSelector((state) => state.tokenview);

  const [open, setOpen] = useState(false);
  const [RawURL, setRawURL] = useState('');
  const [selected, setSelected] = useState(0);
  const [sfc, setSfc] = useState(false);
  const [isFileSF, setIsFileSF] = useState(false);
  const [tokenView, setTokenView] = useState(false);

  const openImage = (file: number | string, sfcc = false, isFileSfc = false, tokenViewV = false) => {
    setSfc(sfcc);
    setIsFileSF(isFileSfc);
    setTokenView(tokenViewV);
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

  const pathFinal = tokenView ? tokenview.path : sharedfile.path;

  const firstdiagonal = pathFinal !== '' ? '' : '/';

  const tokenViewPrefix = tokenView ? 'tokens/user/' : '';

  const access_token_toggle = tokenView ? `?t=${session.access_token}` : '';

  const urlComplete = sfc
    ? `${apiUrl}/shared-file/${tokenViewPrefix}content/${id}${firstdiagonal}${pathFinal}${diagonal}${
        tokenView ? tokenview.content[selected]?.name : sharedfile.content[selected]?.name
      }${access_token_toggle}`
    : `${apiUrl}/files/list/${session.path}${diagonal}${session.files[selected]?.name}?t=${session.access_token}`;

  const changeImage = (option: OptionImg) => {
    const listFiles = sfc ? sharedfile.content : session.files;
    let newSelected = selected;
    switch (option) {
      case 'before':
        newSelected--;
        if (newSelected > 0) {
          setSelected(newSelected);
        } else {
          setSelected(listFiles.length - 1);
        }
        break;
      case 'next':
        newSelected++;
        if (listFiles.length > newSelected) {
          setSelected(newSelected);
        } else {
          setSelected(0);
        }
        break;
    }
  };

  return (
    <GalleryContextC.Provider value={{ openImage }}>
      <Dialog
        open={open}
        maxWidth="md"
        onClose={() => {
          setOpen(false);
        }}
      >
        <Stack direction="row">
          {RawURL === '' && (
            <IconButton onClick={() => changeImage('before')}>
              <Icon icon={iconLeft} width="25px" height="25px" />
            </IconButton>
          )}
          <Box component="img" src={RawURL === '' ? urlComplete : RawURL} height="auto" width="700px" />
          {RawURL === '' && (
            <IconButton onClick={() => changeImage('next')}>
              <Icon icon={iconRight} width="25px" height="25px" />
            </IconButton>
          )}
        </Stack>
      </Dialog>
      {children}
    </GalleryContextC.Provider>
  );
}
