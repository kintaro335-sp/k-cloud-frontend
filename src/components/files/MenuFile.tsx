import { useRef, useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useSnackbar } from 'notistack';
// icons
import { Icon } from '@iconify/react';
import moreIcon from '@iconify/icons-ant-design/more-outlined';
import deleteIcon from '@iconify/icons-ant-design/delete-outlined';

// redux
import { useSelector, useDispatch } from '../../redux/store';
import { setFiles, SessionState } from '../../redux/slices/session';

// api
import { deleteFile, getListFiles } from '../../api/files';

export default function MenuFile({ url }: { url: string }) {
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
        <MenuItem
          onClick={() => {
            console.log(url )
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