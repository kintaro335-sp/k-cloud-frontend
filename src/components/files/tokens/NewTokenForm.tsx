/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { useEffect, useState } from 'react';
import { Switch, Grid, Box, FormControlLabel, Typography, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { useSnackbar } from 'notistack';
import { t } from 'i18next';
import { Trans } from 'react-i18next';
// icon
import { Icon } from '@iconify/react';
import addIcon from '@iconify/icons-material-symbols/add';
// types
import { TokenElement } from '../../../@types/sharedfiles';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// redux
import { useSelector } from '../../../redux/store';
import { setTokens } from '../../../redux/slices/fileexplorer';
// api
import { shareFile, getTokensByPath, updateToken } from '../../../api/sharedfiles';
import dayjs from 'dayjs';

interface NewTokenFormProps {
  url: string;
  edit?: boolean;
  token?: TokenElement;
}

interface NewTokenValues {
  id?: string;
  expire: boolean;
  publict: boolean;
  expires: Date;
}

export default function NewTokenForm({ url, edit = false, token }: NewTokenFormProps) {
  const { access_token, tokens } = useSelector((state) => state.session);
  const { enqueueSnackbar } = useSnackbar();
  const [customId, setCustomId] = useState(false);

  const validationSchema = yup.object().shape({
    id: yup.string().min(5).max(20),
    expire: yup.boolean().required(),
    publict: yup.boolean().required(),
    expires: yup.date().required()
  });

  const {
    handleSubmit,
    setValue,
    register,
    watch,
    formState: { isSubmitting, errors, touchedFields }
  } = useForm<NewTokenValues>({
    defaultValues: {
      id: customId ? '' : undefined,
      expire: token?.expire || false,
      publict: token?.publict || false,
      expires: token?.expires !== undefined ? new Date(token.expires) : new Date()
    },
    resolver: yupResolver(validationSchema)
  });

  const values = watch();

  const onHandleSubmit: SubmitHandler<NewTokenValues> = async (values) => {
    if (edit) {
      await updateToken(token?.id || '', values, access_token);
      setTokens(tokens.map((t) => (t.id === token?.id ? { ...t, ...values, expires: values.expires.getTime() } : t)));
      enqueueSnackbar(t('snackbar.msg_token_updated'), { variant: 'success' });
    } else {
      await shareFile(url, values.expire, values.publict, values.expires.getTime(), access_token, values.id);
      const tokensR = await getTokensByPath(url, access_token);
      setTokens(tokensR);
      enqueueSnackbar(t('snackbar.msg_token_created'), { variant: 'success' });
    }
  };

  useEffect(() => {
    if (values.expire) {
      setValue('expires', dayjs().add(1, 'hour').toDate());
    }
  }, [values.expire]);

  return (
    <Box>
      <Typography variant="h6">
        {edit ? (
          `${t('pages.files.tokens_menu.title_edit')}: ${token?.name} id:${token?.id}`
        ) : (
          <Trans i18nKey="pages.files.tokens_menu.title_form">Nuevo Token</Trans>
        )}
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <Grid container spacing={2}>
            {!edit && (
              <Grid item xs={12}>
                <FormControlLabel
                  label={t('pages.files.tokens_menu.label_customid')}
                  labelPlacement="bottom"
                  checked={customId}
                  onChange={(e) => {
                    //@ts-ignore
                    const checked = e.target.checked;
                    if (checked) {
                      setValue('id', '');
                    } else {
                      setValue('id', undefined);
                    }
                    setCustomId(checked);
                  }}
                  control={<Switch />}
                />
                {customId && (
                  <TextField
                    label={t('pages.files.tokens_menu.label_customid')}
                    {...register('id')}
                    helperText={errors.id?.message}
                    error={Boolean(errors.id) && Boolean(touchedFields.id)}
                  />
                )}
              </Grid>
            )}
            <Grid item xs={4}>
              <FormControlLabel
                label={t('pages.files.tokens_menu.label_expire')}
                labelPlacement="bottom"
                checked={values.expire}
                onChange={(e) => {
                  //@ts-ignore
                  setValue('expire', e.target.checked);
                }}
                control={<Switch />}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControlLabel
                label={t('pages.files.tokens_menu.label_public')}
                labelPlacement="bottom"
                checked={values.publict}
                onChange={(e) => {
                  //@ts-ignore
                  setValue('publict', e.target.checked);
                }}
                control={<Switch />}
              />
            </Grid>
            <Grid item xs={4}>
              <LoadingButton variant="contained" type="submit" loading={isSubmitting}>
                {edit ? (
                  <Trans i18nKey="pages.files.tokens_menu.btn_save">Guardar</Trans>
                ) : (
                  <Icon icon={addIcon} width="33px" height="33px" />
                )}
              </LoadingButton>
            </Grid>
            {values.expire && (
              <Grid item xs={12}>
                <DesktopDateTimePicker
                  disablePast
                  label={t('pages.files.tokens_menu.label_date_expiration')}
                  value={dayjs(values.expires)}
                  onChange={(value) => {
                    if (value === null) return;
                    setValue('expires', value.toDate());
                  }}
                />
              </Grid>
            )}
          </Grid>
        </form>
      </LocalizationProvider>
    </Box>
  );
}
