import { useForm, SubmitHandler } from 'react-hook-form';
import { Card, CardContent, Grid, TextField, CardHeader, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { setPassword } from '../../../../../api/admin';
import { useSelector } from '../../../../../redux/store';
import { useSnackbar } from 'notistack';

interface FormValues {
  password: string;
  confirmPassword: string;
}

interface SetPasswordFormProps {
  userid: string;
}

export default function SetPasswordForm({ userid }: SetPasswordFormProps) {
  const { access_token } = useSelector((state) => state.session);
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting }
  } = useForm<FormValues>();

  const values = watch();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      if (data.password === data.confirmPassword) {
        const response = await setPassword(access_token, userid, data.password);
        enqueueSnackbar(response.message, { variant: 'success' });
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Ha ocurrido un error', { variant: 'error' });
    }
  };

  return (
    <Card>
      <CardHeader title={<Typography variant="h5">Cambiar Contraseña</Typography>} />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField label="Contraseña" type="password" {...register('password')} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Confirmar Contraseña" type="password" {...register('confirmPassword')} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                variant="contained"
                loading={isSubmitting}
                disabled={
                  values.password !== values.confirmPassword ||
                  (values.password === '' && values.confirmPassword === '')
                }
              >
                Cambiar Contraseña
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}
