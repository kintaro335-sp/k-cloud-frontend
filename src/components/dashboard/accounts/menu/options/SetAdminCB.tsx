import { useState } from 'react';
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
  const [isAdmin, setIsAdmin] = useState(admin);

  return (
    <FormControlLabel
      checked={isAdmin}
      onChange={async (_e, checked) => {
        try {
          const response = await setAdmin(access_token, userid, checked);
          setIsAdmin(checked);
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
