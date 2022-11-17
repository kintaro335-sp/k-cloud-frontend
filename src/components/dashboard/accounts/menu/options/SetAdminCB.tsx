import { useRef } from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';
import { setAdmin } from '../../../../../api/admin';
import { useSelector } from '../../../../../redux/store';
import { useSnackbar } from 'notistack';

interface SetAdminCBProps {
  userid: string;
  admin: boolean;
}

export default function SetAdminCB({ userid, admin }: SetAdminCBProps) {
  const { enqueueSnackbar } = useSnackbar();
  const { access_token } = useSelector((state) => state.session);
  const isAdmin = useRef(admin);

  return (
    <FormControlLabel
      checked={isAdmin.current}
      onChange={async (_e, checked) => {
        try {
          const response = await setAdmin(access_token, userid, checked);
          isAdmin.current = checked;
          enqueueSnackbar(response.message, { variant: 'success' });
        } catch (err) {
          console.error(err);
          enqueueSnackbar('Ha ocurrido un error', { variant: 'error' });
        }
      }}
      control={<Checkbox />}
      label="Adminitrador"
    />
  );
}
