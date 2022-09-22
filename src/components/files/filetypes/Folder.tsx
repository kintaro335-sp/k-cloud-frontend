import { Box } from '@mui/material';
import { Icon } from '@iconify/react';
import folderIcon from '@iconify/icons-ant-design/folder-filled';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { SessionState, setPath } from '../../../redux/slices/session';

export default function Folder({ url }: { url: string }) {
  const dispatch = useDispatch();
  const { path } = useSelector((state: { session: SessionState }) => state.session);

  const click = () => {
    dispatch(setPath(url));
  };

  return (
    <Box sx={{ display: 'flex', aligItems: 'center', justifyContent: 'center', width: '100%' }} onClick={click}>
      <Icon icon={folderIcon} width="220px" height="220px" />
    </Box>
  );
}
