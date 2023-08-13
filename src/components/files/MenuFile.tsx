import { useRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { TokensMenu } from './tokens';
import { OptionsMove } from './movefilemenu';
import { useSnackbar } from 'notistack';
// icons
import { Icon } from '@iconify/react';
import moreIcon from '@iconify/icons-ant-design/more-outlined';
import deleteIcon from '@iconify/icons-ant-design/delete-outlined';
import donloadIcon from '@iconify/icons-ant-design/down-circle-outline';
import shareIcon from '@iconify/icons-material-symbols/share';
import zipfolderIcon from '@iconify/icons-material-symbols/folder-zip';

// redux
import { useSelector, useDispatch } from '../../redux/store';
import { setFiles } from '../../redux/slices/session';

// api
import { deleteFile, getListFiles } from '../../api/files';
import { shareFile } from '../../api/sharedfiles';
import { FileI } from '../../@types/files';
import { apiUrl } from '../../config';

export default function MenuFile({ file, url, urlComplete }: { file: FileI; url: string; urlComplete: string }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { access_token, path } = useSelector((state) => state.session);
  const { enqueueSnackbar } = useSnackbar();
  const anchorRef = useRef<HTMLButtonElement>(null);
  const theme = useTheme();

  const clickOpen = () => {
    setOpen(true);
  };

  const clickClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={clickOpen} ref={anchorRef}>
        <Icon icon={moreIcon} width="29px" height="29px" color={theme.palette.text.secondary} />
      </IconButton>
      <Menu open={open} anchorEl={anchorRef.current} onClose={clickClose}>
        {file.type === 'file' && (
          <MenuItem component="a" href={`${urlComplete}&d=1`} download={file.name.split('.')[0]}>
            <Icon icon={donloadIcon} width="25px" height="25px" /> Descargar
          </MenuItem>
        )}
        <MenuItem
          component="a"
          href={`${apiUrl}/files/zip/${url}?t=${access_token}`}
          download={file.name.split('.')[0]}
        >
          <Icon icon={zipfolderIcon} width="25px" height="25px" /> Descargar como Zip
        </MenuItem>
        <MenuItem
          onClick={() => {
            shareFile(url, false, Date.now(), access_token).then(() => {
              enqueueSnackbar('compartido', { variant: 'success' });
            });
            clickClose();
          }}
        >
          <Icon icon={shareIcon} width="25px" height="25px" /> Compartir
        </MenuItem>
        <TokensMenu url={url} />
        <OptionsMove menuItem pathFrom={path} filesToMove={[file.name]} />
        <MenuItem
          onClick={() => {
            if (window.confirm(`desea eliminar ${file.name}?`)) {
              deleteFile(url, access_token).then((res) => {
                enqueueSnackbar(res.message, { variant: 'success' });
                getListFiles(path, access_token)
                  .then((response) => {
                    dispatch(setFiles(response.list));
                  })
                  .catch((err) => {
                    enqueueSnackbar(err.message, { variant: 'error' });
                  });
              });
            }
          }}
        >
          <Icon icon={deleteIcon} width="25px" height="25px" />
          Eliminar
        </MenuItem>
      </Menu>
    </>
  );
}
