import { useForm, SubmitHandler } from 'react-hook-form';
import { Card, CardContent, Grid, TextField, CardHeader, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// api
import { setPassword } from '../../../../../api/admin';
import { isAxiosError } from 'axios';
// redux
import { useSelector } from '../../../../../redux/store';
// utils
import { useSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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

  const validationSchema = yup.object().shape({
    password: yup.string().min(8).required(),
    confirmPassword: yup.string().min(8).required()
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors, touchedFields }
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema)
  });

  const values = watch();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      if (data.password === data.confirmPassword) {
        const response = await setPassword(access_token, userid, data.password);
        enqueueSnackbar(response.message, { variant: 'success' });
      }
    } catch (err) {
      if (isAxiosError(err)) {
        switch (err.response?.status) {
          case 500:
          case 401:
          case 400:
            enqueueSnackbar(err.response.data.message, { variant: 'error' });
            break;
        }
      } else {
        enqueueSnackbar('Ha ocurrido un error', { variant: 'error' });
      }
      console.error(err);
    }
  };

  return (
    <Card>
      <CardHeader title={<Typography variant="h5">Cambiar Contraseña</Typography>} />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                {...register('password')}
                fullWidth
                error={Boolean(errors.password?.message) && Boolean(touchedFields.password)}
                helperText={Boolean(touchedFields.password) && errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirmar Contraseña"
                type="password"
                {...register('confirmPassword')}
                fullWidth
                error={Boolean(errors.confirmPassword?.message) && Boolean(touchedFields.confirmPassword)}
                helperText={Boolean(touchedFields.confirmPassword) && errors.confirmPassword?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                variant="contained"
                type="submit"
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
