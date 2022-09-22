import { useRef, useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useSnackbar } from 'notistack';
// icons
import { Icon } from '@iconify/react';
import moreIcon from '@iconify/icons-ant-design/more-outlined';
import deleteIcon from '@iconify/icons-ant-design/delete-outlined';
import donloadIcon from '@iconify/icons-ant-design/down-circle-outline';

// redux
import { useSelector, useDispatch } from '../../redux/store';
import { setFiles, SessionState } from '../../redux/slices/session';

// api
import { deleteFile, getListFiles, FileP } from '../../api/files';

export default function MenuFile({ file, url, urlComplete }: { file: FileP; url: string; urlComplete: string }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { access_token, path } = useSelector((state: { session: SessionState }) => state.session);
  const { enqueueSnackbar } = useSnackbar();
  const anchorRef = useRef<HTMLButtonElement>(null);

  const clickOpen = () => {
    setOpen(true);
  };

  const clickClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={clickOpen} ref={anchorRef}>
        <Icon icon={moreIcon} width="25px" height="25px" />
      </IconButton>
      <Menu open={open} anchorEl={anchorRef.current} onClose={clickClose}>
        <MenuItem component="a" href={urlComplete} download={file.name.split('.')[0]}>
          <Icon icon={donloadIcon} width="25px" height="25px" /> Descargar
        </MenuItem>
        <MenuItem
          onClick={() => {
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
          }}
        >
          <Icon icon={deleteIcon} width="25px" height="25px" />
          Eliminar
        </MenuItem>
      </Menu>
    </>
  );
}
