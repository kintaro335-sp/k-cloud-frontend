/*
 * k-cloud-frontend
 * Copyright(c) 2022 Kintaro Ponce
 * MIT Licensed
 */

import { useState } from 'react';
import { t } from 'i18next';
// hookform
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// compoenents
import { Grid, TextField, Dialog, DialogContent, Button, Typography, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import SelectScopes from './SelectScopes';
import { Trans } from 'react-i18next';
// constants
import { scopeList } from './constants';
// redux
import { useSelector } from '../../redux/store';
// api
import { createApiKey } from '../../api/auth';
// types
import { Scope } from '../../@types/apikeys';

interface FormFields {
  name: string;
  scopes: Scope[];
}

export default function CreateApiKeyForm() {
  const [open, setOpen] = useState(false);
  const { access_token } = useSelector((state) => state.session);
  const { enqueueSnackbar } = useSnackbar();

  const clickOpen = () => {
    setOpen(true);
  };

  const clickClose = () => {
    setOpen(false);
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    scopes: yup
      .array()
      .of(
        yup
          .string()
          .oneOf(scopeList)
          .required()
      )
      .required()
  });

  const form = useForm<FormFields>({
    defaultValues: {
      name: '',
      scopes: []
    },
    resolver: yupResolver(validationSchema)
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, touchedFields, isSubmitting }
  } = form;

  const scopes = watch('scopes');

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await createApiKey(access_token, data.name, data.scopes);
      enqueueSnackbar('API Key creada', { variant: 'success' });
      reset();
      clickClose();
    } catch (err) {
      enqueueSnackbar('Error al crear la API Key', { variant: 'error' });
    }
  };

  return (
    <>
      <Button onClick={clickOpen} variant="contained" color="primary">
        <Trans i18nKey="pages.api_keys.btn_new_api_key">Crear API Key</Trans>
      </Button>
      <Dialog open={open} onClose={clickClose} maxWidth="md">
        <DialogContent>
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label={t('pages.api_keys.label_name')}
                  fullWidth
                  {...register('name')}
                  helperText={errors.name?.message}
                  error={Boolean(errors.name) && Boolean(touchedFields.name)}
                />
              </Grid>
              <Grid>
                <Typography variant="h6">
                  <Trans i18nKey="pages.api_keys.label_scopes">Scopes</Trans>
                </Typography>
                <Box>
                  <SelectScopes scopes={scopes} onChange={(new_scopes) => form.setValue('scopes', new_scopes)} />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <LoadingButton type="submit" variant="contained" fullWidth loading={isSubmitting}>
                  <Trans i18nKey="pages.api_keys.btn_create">Crear</Trans>
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
