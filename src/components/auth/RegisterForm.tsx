import { Navigate, useNavigate } from 'react-router-dom';
import { Card, CardProps, CardContent, Grid, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
// redux
import { useDispatch } from '../../redux/store';
import { setAccessToken } from '../../redux/slices/session';
// api
import { registerApi, loginApi } from '../../api/auth';
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
  const navigate = useNavigate();  

  const validationSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().required()
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, touchedFields }
  } = useForm<FormValues>({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: ''
    },
    resolver: yupResolver(validationSchema)
  });
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const { username, password, confirmPassword } = data;
      if (password === confirmPassword) {
        if (setup) {
          await createFirstUser(username, password);
          const resultLogin = await loginApi(username, password);
          dispatch(setAccessToken(resultLogin.access_token));
          enqueueSnackbar('Primer usuario agregado con exito', { variant: 'success' });
          navigate('/files');          
        } else {
          const { access_token } = await registerApi(username, password);
          enqueueSnackbar('Register success', { variant: 'success' });
          dispatch(setAccessToken(access_token));
        }
      } else {
        enqueueSnackbar('Passwords do not match', { variant: 'error' });
      }
    } catch (error) {
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
              <TextField
                fullWidth
                label="Username"
                {...register('username')}
                error={Boolean(errors.username) || touchedFields.username}
                // @ts-ignore
                helperText={(Boolean(errors.username) || touchedFields.username) && errors.username?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                {...register('password')}
                error={Boolean(errors.password) || touchedFields.password}
                // @ts-ignore
                helperText={(Boolean(errors.password) || touchedFields.password) && errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm password"
                type="password"
                {...register('confirmPassword')}
                error={Boolean(errors.confirmPassword) || touchedFields.confirmPassword}
                // @ts-ignore
                helperText={
                  (Boolean(errors.confirmPassword) || touchedFields.confirmPassword) && errors.confirmPassword?.message
                }
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton type="submit" variant="contained" color="primary" loading={isSubmitting}>
                Register
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}
