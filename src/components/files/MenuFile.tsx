/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { useRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { TokensMenu } from './tokens';
import { OptionsMove } from './movefilemenu';
import { RenameFile } from './rename';
import { useSnackbar } from 'notistack';
import { Trans } from 'react-i18next';
import { t } from 'i18next';
// icons
import { Icon } from '@iconify/react';
import moreIcon from '@iconify/icons-ant-design/more-outlined';
import deleteIcon from '@iconify/icons-ant-design/delete-outlined';
import donloadIcon from '@iconify/icons-ant-design/down-circle-outline';
import shareIcon from '@iconify/icons-material-symbols/share';
import zipfolderIcon from '@iconify/icons-material-symbols/folder-zip';

// redux
import { useSelector } from '../../redux/store';

// api
import { deleteFile } from '../../api/files';
import { shareFile } from '../../api/sharedfiles';
import { FileI } from '../../@types/files';
import { apiUrl } from '../../config';

export default function MenuFile({ file, url, urlComplete }: { file: FileI; url: string; urlComplete: string }) {
  const [open, setOpen] = useState(false);
  const { access_token } = useSelector((state) => state.session);
  const { path } = useSelector((state) => state.fileexplorer);
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
            <Icon icon={donloadIcon} width="25px" height="25px" /> <Trans i18nKey="pages.files.femenu.download">Descargar</Trans>
          </MenuItem>
        )}
        <MenuItem
          component="a"
          href={`${apiUrl}/files/zip/${url}?t=${access_token}`}
          download={file.name.split('.')[0]}
        >
          <Icon icon={zipfolderIcon} width="25px" height="25px" /><Trans i18nKey="pages.files.femenu.download_zip"> Descargar como Zip </Trans>
        </MenuItem>
        <MenuItem
          onClick={() => {
            shareFile(url, false, true, Date.now(), access_token).then(() => {
              enqueueSnackbar(t('pages.files.femenu.msg_shared'), { variant: 'success' });
            });
            clickClose();
          }}
        >
          <Icon icon={shareIcon} width="25px" height="25px" /> <Trans i18nKey="pages.files.femenu.share">Compartir</Trans>
        </MenuItem>
        <TokensMenu url={url} onClose={clickClose} />
        <OptionsMove menuItem pathFrom={path} filesToMove={[file.name]} onClose={clickClose} />
        <RenameFile url={url} fileName={file.name} onClose={clickClose} />
        <MenuItem
          onClick={() => {
            if (window.confirm(`${t('pages.files.femenu.msg_confirm_delete')}${file.name}?`)) {
              deleteFile(url, access_token).then((res) => {
                enqueueSnackbar(res.message, { variant: 'success' });
              });
            }
          }}
        >
          <Icon icon={deleteIcon} width="25px" height="25px" />
          <Trans i18nKey="pages.files.femenu.delete">Eliminar</Trans>
        </MenuItem>
      </Menu>
    </>
  );
}
