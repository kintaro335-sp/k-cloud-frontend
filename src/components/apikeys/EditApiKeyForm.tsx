/*
 * k-cloud-frontend
 * Copyright(c) 2022 Kintaro Ponce
 * MIT Licensed
 */

import { useState, useEffect } from 'react';
import { Button, Dialog, DialogContent, AppBar, Toolbar, Typography, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { t } from 'i18next';
import { Trans } from 'react-i18next';
import { useSnackbar } from 'notistack';
import SelectScopes from './SelectScopes';
// form
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// constants
import { scopeList } from './constants';
// api
import { editApiKey } from '../../api/auth';
// redux
import { useSelector } from '../../redux/store';
// types
import { Scope } from '../../@types/apikeys';

interface EditApiKeyFormProps {
  id: string;
  name: string;
  scopes: Scope[];
}

interface formFiels {
  scopes: Scope[];
}

export default function EditApiKeyForm({ id, name, scopes }: EditApiKeyFormProps) {
  const { access_token } = useSelector((state) => state.session);  
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const validationSchema = yup.object().shape({
    scopes: yup.array().of(yup.string().oneOf(scopeList).required()).required()
  });

  const form = useForm<formFiels>({
    defaultValues: {
      scopes
    },
    resolver: yupResolver(validationSchema)
  });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting }
  } = form;

  useEffect(() => {
    setValue('scopes', scopes);
  }, [scopes]);

  const scopesFW = watch('scopes');

  const onSubmit: SubmitHandler<formFiels> = async (data) => {
    try {
      await editApiKey(access_token, id, data.scopes);
      enqueueSnackbar(t('pages.api_keys.msg_scopes_updated'), { variant: 'success' });
      setOpen(false);
    } catch (err) {
      enqueueSnackbar(t('pages.api_keys.msg_error_scopes_updated'), { variant: 'error' });
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outlined" color="error">
        <Trans i18nKey="pages.api_keys.btn_edit">Editar</Trans>
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              <Trans i18nKey="pages.api_keys.title_edit_scopes">Editar Scopes </Trans>{name}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Stack spacing={2}>
              <SelectScopes scopes={scopesFW} onChange={(scopes) => setValue('scopes', scopes, { shouldValidate: true })} />
              <LoadingButton loading={isSubmitting} type="submit" variant="contained">
                <Trans i18nKey="pages.api_keys.btn_save">Guardar</Trans>
              </LoadingButton>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
