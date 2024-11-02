/*
 * k-cloud-frontend
 * Copyright(c) 2022-2024 Kintaro Ponce
 * MIT Licensed
 */

import { Card, CardContent, TextField, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm, SubmitHandler } from 'react-hook-form';
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
              <TextField placeholder="Buscar..." fullWidth {...register('search')} />
              <LoadingButton type="submit" loading={isSubmitting} variant="contained">
                Buscar
              </LoadingButton>
            </Stack>
          </CardContent>
        </Card>
      </form>
    </>
  );
}
