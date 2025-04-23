/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { Navigate, useNavigate } from 'react-router-dom';
import { Card, CardProps, CardContent, Grid, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import { Trans } from 'react-i18next';
import { t } from 'i18next';
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
          enqueueSnackbar(t('snackbar.msg_first_user_created'), { variant: 'success' });
          navigate('/files');          
        } else {
          const { access_token } = await registerApi(username, password);
          enqueueSnackbar(t('snackbar.msg_register_user'), { variant: 'success' });
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
          <Trans i18nKey="ui.register_form.title">Crear Usuario</Trans>
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('ui.register_form.label_username')}
                {...register('username')}
                error={Boolean(errors.username) || touchedFields.username}
                // @ts-ignore
                helperText={(Boolean(errors.username) || touchedFields.username) && errors.username?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('ui.register_form.label_password')}
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
                label={t('ui.register_form.label_password_confirm')}
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
                <Trans i18nKey='ui.register_form.btn_register'>Register</Trans>
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}
