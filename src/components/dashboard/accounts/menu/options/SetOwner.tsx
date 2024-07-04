import { Button } from '@mui/material';
import { setOwner } from '../../../../../api/admin';
import { useSelector } from '../../../../../redux/store';
import { useSnackbar } from 'notistack';

interface SetOwnerProps {
  userid: string;
}

export default function SetOwner({ userid }: SetOwnerProps) {
  const { owner } = useSelector((state) => state.admin);
  const { access_token } = useSelector((state) => state.session);
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      {owner !== userid && (
        <Button
          variant="contained"
          onClick={() => {
            if (!window.confirm('¿Estás seguro de que quieres establecer este usuario como dueño?')) return;
            setOwner(access_token, userid).then(() => {
              enqueueSnackbar('Usuario con id ' + userid + ' establecido como dueño', {
                variant: 'success'
              });
            });
          }}
        >
          establecer como dueño
        </Button>
      )}
    </>
  );
}
