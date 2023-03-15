import { Stack, IconButton } from '@mui/material';
// icons
import { Icon } from '@iconify/react';
import deleteIcon from '@iconify/icons-ant-design/delete-fill';
// redux
import { useSelector } from '../../../redux/store';
// api
import { deleteToken } from '../../../api/sharedfiles';

interface TokenActionsProps {
  id: string;
}

export default function TokenActions({ id }: TokenActionsProps) {
  const { access_token } = useSelector((state) => state.session);

  const handleDelete = async () => {
    await deleteToken(id, access_token);
  };

  return (
    <Stack>
      <IconButton onClick={handleDelete}>
        <Icon icon={deleteIcon} width="33px" height="33px" />
      </IconButton>
    </Stack>
  );
}
