/*
 * k-cloud-frontend
 * Copyright(c) 2022 Kintaro Ponce
 * MIT Licensed
 */

import { Switch, Grid, Box, FormControlLabel, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
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
import { setTokens } from '../../../redux/slices/session';
// api
import { shareFile, getTokensByPath, updateToken } from '../../../api/sharedfiles';
import moment from 'moment';

interface NewTokenFormProps {
  url: string;
  edit?: boolean;
  token?: TokenElement;
}

interface NewTokenValues {
  expire: boolean;
  publict: boolean;
  expires: Date;
}

export default function NewTokenForm({ url, edit = false, token }: NewTokenFormProps) {
  const { access_token, tokens } = useSelector((state) => state.session);
  const { enqueueSnackbar } = useSnackbar();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting }
  } = useForm<NewTokenValues>({
    defaultValues: {
      expire: token?.expire || false,
      publict: token?.publict || false,
      expires: token?.expires !== undefined ? new Date(token.expires) : new Date()
    }
  });

  const values = watch();

  const onHandleSubmit: SubmitHandler<NewTokenValues> = async (values) => {
    if (edit) {
      await updateToken(token?.id || '', values, access_token);
      setTokens(tokens.map((t) => (t.id === token?.id ? { ...t, ...values, expires: values.expires.getTime() } : t)));
      enqueueSnackbar(t('snackbar.msg_token_updated'), { variant: 'success' });
    } else {
      await shareFile(url, values.expire, values.publict, values.expires.getTime(), access_token);
      const tokensR = await getTokensByPath(url, access_token);
      setTokens(tokensR)
      enqueueSnackbar(t('snackbar.msg_token_created'), { variant: 'success' });
    }
  };

  return (
    <Box>
      <Typography variant="h6">{edit ? `${t('pages.files.tokens_menu.title_edit')}: ${token?.name} id:${token?.id}` : <Trans i18nKey="pages.files.tokens_menu.title_form" >Nuevo Token</Trans>}</Typography>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <Grid container spacing={2}>
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
                {edit ? <Trans i18nKey="pages.files.tokens_menu.btn_save" >Guardar</Trans> : <Icon icon={addIcon} width="33px" height="33px" />}
              </LoadingButton>
            </Grid>
            {values.expire && (
              <Grid item xs={12}>
                <DesktopDateTimePicker
                  label={t('pages.files.tokens_menu.label_date_expiration')}
                  value={moment(values.expires)}
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
