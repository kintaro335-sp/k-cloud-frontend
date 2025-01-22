/*
 * k-cloud-frontend
 * Copyright(c) 2022-2024 Kintaro Ponce
 * MIT Licensed
 */

import { Card, CardContent, TextField, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Trans } from 'react-i18next';
import { t } from 'i18next';
// api
import { searchFiles } from '../../api/files';
// redux
import { setList } from '../../redux/slices/search';
import { useSelector } from '../../redux/store';

interface FormValues {
  search: string;
}

export default function SearchBar() {
  const { access_token } = useSelector((state) => state.session);
  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields, isSubmitting }
  } = useForm<FormValues>({
    defaultValues: {
      search: ''
    }
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!data.search) return;
    const result = await searchFiles(data.search, access_token);
    setList(result);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Card>
          <CardContent>
            <Stack spacing={2} direction="row">
              <TextField placeholder={t('pages.search.placeholder_search')} fullWidth {...register('search')} />
              <LoadingButton type="submit" loading={isSubmitting} variant="contained">
                <Trans i18nKey="pages.search.btn_search">Buscar</Trans>
              </LoadingButton>
            </Stack>
          </CardContent>
        </Card>
      </form>
    </>
  );
}
