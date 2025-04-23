/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { useForm, SubmitHandler } from 'react-hook-form';
import { Card, CardContent, Grid, TextField, CardHeader, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { t } from 'i18next';
import { Trans } from 'react-i18next';
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
        enqueueSnackbar(t('snackbar.password_changed'), { variant: 'success' });
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
        enqueueSnackbar(t('snackbar.error_unknown'), { variant: 'error' });
      }
      console.error(err);
    }
  };

  return (
    <Card>
      <CardHeader title={<Typography variant="h5"><Trans i18nKey="pages.admin_users.menu_user.set_passwd_title">Cambiar Contraseña</Trans></Typography>} />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label={t('pages.admin_users.menu_user.label_password')}
                type="password"
                {...register('password')}
                fullWidth
                error={Boolean(errors.password?.message) && Boolean(touchedFields.password)}
                helperText={Boolean(touchedFields.password) && errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={t('pages.admin_users.menu_user.label_confirm_password')}
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
                <Trans i18nKey="pages.admin_users.menu_user.btn_set_passwd">Cambiar Contraseña</Trans>
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}
