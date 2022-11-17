import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Grid, TextField, Card, CardContent, CardProps } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSnackbar } from 'notistack';
// redux
import { useDispatch } from '../../redux/store';
import { setAccessToken } from '../../redux/slices/session';
// api
import { loginApi } from '../../api/auth';
// hooks
import useAuth from '../../hooks/useAuth';

type FormValues = {
  username: string;
  password: string;
};

export default function LoginForm({ ...props }: CardProps) {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    try {
      const { username, password } = data;
      const { access_token } = await loginApi(username, password);
      enqueueSnackbar('Login success', { variant: 'success' });
      dispatch(setAccessToken(access_token));
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar('ha ocurrido un error', { variant: 'error' });
      console.error(error);
    }
  };

  return (
    <Card {...props}>
      {isAuthenticated && <Navigate to="/files" />}
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Username" {...register('username')} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Password" type="password" {...register('password')} />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton type="submit" variant="contained" color="primary" loading={isSubmitting}>
                Login
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}
