/*
 * k-cloud-frontend
 * Copyright(c) 2022 Kintaro Ponce
 * MIT Licensed
 */

import { Navigate } from 'react-router-dom';
import { Grid, TextField, Card, CardContent, CardProps } from '@mui/material';
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
import { isAxiosError } from 'axios';
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

  const validationSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required()
  });

  const {
    register,
    handleSubmit,
    resetField,
    formState: { isSubmitting, errors, touchedFields }
  } = useForm<FormValues>({
    defaultValues: {
      username: '',
      password: ''
    },
    resolver: yupResolver(validationSchema)
  });
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const { username, password } = data;
      const { access_token } = await loginApi(username, password);
      enqueueSnackbar(t('pages.login.msg_login'), { variant: 'success' });
      dispatch(setAccessToken(access_token));
    } catch (error) {
      if (isAxiosError(error)) {
        const { response } = error;
        switch (response?.status) {
          case 400:
            resetField('password');
            enqueueSnackbar(t('pages.login.msg_error_login'), { variant: 'error' });
            break;
          case 500:
            enqueueSnackbar(t('snackbar.error_server'), { variant: 'error' });
            break;
          default:
            enqueueSnackbar(t('snackbar.error_unknown'), { variant: 'error' });
            break;
        }
      }
    }
  };

  return (
    <Card {...props}>
      {isAuthenticated && <Navigate to="/files" />}
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={<Trans i18nKey="pages.login.username">Username</Trans>}
                {...register('username')}
                error={Boolean(errors.username) || touchedFields.username}
                // @ts-ignore
                helperText={(Boolean(errors.username) || touchedFields.username) && errors.username?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={<Trans i18nKey="pages.login.password">Password</Trans>}
                type="password"
                {...register('password')}
                error={Boolean(errors.password) || touchedFields.password}
                // @ts-ignore
                helperText={(Boolean(errors.password) || touchedFields.password) && errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton type="submit" variant="contained" color="primary" fullWidth loading={isSubmitting}>
                <Trans i18nKey="pages.login.btn_login">Login</Trans>
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}
