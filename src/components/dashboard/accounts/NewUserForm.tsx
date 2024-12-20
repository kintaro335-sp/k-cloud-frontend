/*
 * k-cloud-frontend
 * Copyright(c) 2022 Kintaro Ponce
 * MIT Licensed
 */

import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Button, Dialog, DialogContent, TextField, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { t } from 'i18next';
import { Trans } from 'react-i18next';
// hook
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// api
import { createAccount } from '../../../api/admin';
// redux
import { useSelector } from '../../../redux/store';

interface FormValues {
  username: string;
  password: string;
}

export default function NewUserForm() {
  const [open, setOpen] = useState<boolean>(false);
  const { access_token } = useSelector((state) => state.session);
  const { enqueueSnackbar } = useSnackbar();

  const clickOpen = () => {
    setOpen(true);
  };

  const clickClose = () => {
    setOpen(false);
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().min(8).required()
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, touchedFields }
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema)
  });

  const submitData: SubmitHandler<FormValues> = async (data) => {
    try {
      const { password, username } = data;
      const resp = await createAccount(access_token, username, password);
      enqueueSnackbar(t('snackbar.user_created'), { variant: 'success' });
      reset();
    } catch (err) {
      console.error(err);
      enqueueSnackbar(t('snackbar.error_unknown'), { variant: 'error' });
    }
  };

  return (
    <>
      <Button variant="contained" onClick={clickOpen}>
        <Trans i18nKey="pages.admin_users.form_new_user.btn_open_form">Nueva Cuenta</Trans>
      </Button>
      <Dialog open={open} onClose={clickClose}>
        <DialogContent>
          <form onSubmit={handleSubmit(submitData)}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  label={t('pages.admin_users.form_new_user.label_username')}
                  {...register('username')}
                  fullWidth
                  error={Boolean(errors.username?.message) && Boolean(touchedFields.username)}
                  helperText={Boolean(touchedFields.username) && errors.username?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={t('pages.admin_users.form_new_user.label_password')}
                  type="password"
                  {...register('password')}
                  fullWidth
                  error={Boolean(errors.password?.message) && Boolean(touchedFields.password)}
                  helperText={Boolean(touchedFields.password) && errors.password?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <LoadingButton variant="contained" loading={isSubmitting} type="submit">
                  <Trans i18nKey="pages.admin_users.form_new_user.btn_create">Crear</Trans>
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
