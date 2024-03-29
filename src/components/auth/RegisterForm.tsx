import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardProps, CardContent, Grid, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSnackbar } from 'notistack';
// redux
import { useDispatch } from '../../redux/store';
import { setAccessToken } from '../../redux/slices/session';
// api
import { registerApi } from '../../api/auth';
import { createFirstUser } from '../../api/setup';
// hooks
import useAuth from '../../hooks/useAuth';

type FormValues = {
  username: string;
  password: string;
  confirmPassword: string;
};

interface RegisterFormProps {
  cardProps?: CardProps;
  setup?: boolean;
}

export default function RegisterForm({ cardProps, setup }: RegisterFormProps) {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    try {
      const { username, password, confirmPassword } = data;
      if (password === confirmPassword) {
        if (setup) {
          await createFirstUser(username, password);
        } else {
          const { access_token } = await registerApi(username, password);
          enqueueSnackbar('Register success', { variant: 'success' });
          dispatch(setAccessToken(access_token));
        }
      } else {
        enqueueSnackbar('Passwords do not match', { variant: 'error' });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar('ha ocurrido un error', { variant: 'error' });
      console.error(error);
    }
  };
  return (
    <Card {...cardProps}>
      {isAuthenticated && !setup && <Navigate to="/files" />}

      <CardContent>
        <Typography variant="h6" gutterBottom>
          Crear Usuario
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Username" {...register('username')} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Password" type="password" {...register('password')} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Confirm password" type="password" {...register('confirmPassword')} />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton type="submit" variant="contained" color="primary" loading={isLoading}>
                Register
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}
