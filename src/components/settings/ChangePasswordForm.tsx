import { useState } from 'react';
import { Grid, TextField, Card, CardHeader, CardContent } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// form
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSnackbar } from 'notistack';
// api
import { changePassword } from '../../api/auth';
// redux
import { useSelector } from '../../redux/store';
import { SessionState } from '../../redux/slices/session';

type FormValues = {
  password: string;
  newPassword: string;
};

export default function CahngePasswordForm() {
  const { access_token } = useSelector((state: { session: SessionState }) => state.session);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    try {
      const { password, newPassword } = data;
      const res = await changePassword(password, newPassword, access_token);
      enqueueSnackbar(res.message, { variant: 'success' });
      setLoading(false);
      reset();
    } catch (err) {
      setLoading(false);
      enqueueSnackbar('Se ha Rpoducido un error', { variant: 'error' });
      console.error(err);
    }
  };

  return (
    <Card>
      <CardHeader title="Cambiar Contraseña" />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField label="Contarseña actual" type="password" {...register('password')} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Nueva Contraseña" type="password" {...register('newPassword')} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton type="submit" loading={loading} variant="contained" fullWidth>
                Cambiar
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}
