import { createContext, useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Dialog, DialogContent, Box, Stack, IconButton, Toolbar, AppBar } from '@mui/material';
// icon
import { Icon } from '@iconify/react';
import iconRight from '@iconify/icons-material-symbols/arrow-right-alt-rounded';
import iconLeft from '@iconify/icons-material-symbols/arrow-left-rounded';
// redux
import { useSelector } from '../redux/store';
// config
import { apiUrl } from '../config';
import { explorerContext } from '../@types/general';

export const GalleryContextC = createContext({
  openImage: (file: number | string, context: explorerContext) => {}
});

interface GalleryContextProps {
  children: JSX.Element;
}

type OptionImg = 'next' | 'before';

export default function GalleryContext({ children }: GalleryContextProps) {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [RawURL, setRawURL] = useState('');
  const [selected, setSelected] = useState(0);
  const [contextExplorer, setContextExplorer] = useState<explorerContext>('default');
  const session = useSelector((state) => state.session);
  const sharedFile = useSelector((state) => state.sharedfile);
  const tokenView = useSelector((state) => state.tokenview);

  const paths = useMemo(
    () => ({
      default: session.path,
      sharedFile: sharedFile.path,
      tokenView: tokenView.path
    }),
    [session, sharedFile, tokenView]
  );
  const contents = useMemo(
    () => ({
      default: session.files,
      sharedFile: sharedFile.content,
      tokenView: tokenView.content
    }),
    [session, sharedFile, tokenView]
  );
  const urlPrefixes = {
    default: '/files/list',
    sharedFile: '/shared-file/content',
    tokenView: '/shared-file/tokens/user/content'
  };

  const openImage = (file: number | string, context: explorerContext) => {
    switch (typeof file) {
      case 'string':
        setRawURL(file);
        break;
      case 'number':
        setRawURL('');
        setSelected(file);
        setContextExplorer(context);
        break;
    }
    setOpen(true);
  };

  const changeImage = (option: OptionImg) => {
    let newSelected = selected;
    const listFiles = contents[contextExplorer];
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

  const urlFinal = useMemo(() => {
    if (RawURL !== '') {
      return RawURL;
    }
    const PathFinal = paths[contextExplorer];
    const contentFinal = contents[contextExplorer];
    const access_token = ['default', 'tokenView'].includes(contextExplorer) ? `?t=${session.access_token}` : '';
    const urlPrefix = urlPrefixes[contextExplorer];
    const nameFile = contentFinal[selected]?.name;
    const diagonal = PathFinal === '' && contextExplorer !== 'default' ? '' : '/';
    const idFinal = contextExplorer !== 'default' ? id : '';
    return `${apiUrl}${urlPrefix}/${idFinal}${diagonal}${PathFinal}/${nameFile}${access_token}`;
  }, [RawURL, paths, contents, contextExplorer, selected, id]);

  const nameFileFinal = useMemo(() => {
    if (RawURL !== '') {
      const pathArr = RawURL.split('/');
      return pathArr[pathArr.length - 1] as string;
    }
    const contentFinal = contents[contextExplorer];
    const nameFile = contentFinal[selected]?.name || '';
    return nameFile;
  }, [RawURL, contents, contextExplorer, selected]);

  const clickClose = () => {
    setOpen(false);
  };

  const isImage = useMemo(() => {
    const uuidRegex = new RegExp(/[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}/);
    if (nameFileFinal.match(uuidRegex)?.length !== 0) {
      return true;
    }
    const imageNameRegex = new RegExp(/.+(.png|.gif|.jpg)/);
    return nameFileFinal.match(imageNameRegex)?.length !== 0;
  }, [nameFileFinal]);

  useEffect(() => {
    if (RawURL === '') {
      window.onkeydown = (event) => {
        switch (event.key) {
          case 'ArrowLeft':
            changeImage('before');
            break;
          case 'ArrowRight':
            changeImage('next');
            break;
        }
      };
    }
  });

  return (
    <GalleryContextC.Provider value={{ openImage }}>
      <Dialog open={open} maxWidth="lg" onClose={clickClose} fullScreen={fullScreen}>
        <AppBar position="relative">
          <Toolbar>{nameFileFinal}</Toolbar>
        </AppBar>
        <DialogContent>
          <Stack direction="row" height="100%">
            {RawURL === '' && (
              <IconButton onClick={() => changeImage('before')}>
                <Icon icon={iconLeft} width="25px" height="25px" />
              </IconButton>
            )}
            <img src={urlFinal} height="auto" width="100%" />
            {RawURL === '' && (
              <IconButton onClick={() => changeImage('next')}>
                <Icon icon={iconRight} width="25px" height="25px" />
              </IconButton>
            )}
          </Stack>
        </DialogContent>
      </Dialog>
      {children}
    </GalleryContextC.Provider>
  );
}
