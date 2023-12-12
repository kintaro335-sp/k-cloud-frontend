import { createContext, useState, useMemo } from 'react';
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
    const diagonal = PathFinal === '' ? '' : '/';
    console.log(PathFinal)
    return `${apiUrl}${urlPrefix}/${id}${diagonal}${PathFinal}/${nameFile}${access_token}`;
  }, [RawURL, paths, contents, contextExplorer, selected, id]);

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
          <Box component="img" src={urlFinal} height="auto" width="700px" />
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
