import { useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, TextField, Grid, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
// form
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { SpaceConfig } from '../../../@types/admin';
// redux
import { useSelector } from '../../../redux/store';
// api
import { setDedicatedSpace, getDedicatedSpaceConfig, getusedSpace } from '../../../api/admin';

export default function DedicatedSpaceForm() {
  const { access_token } = useSelector((state) => state.session);
  const { enqueueSnackbar } = useSnackbar();

  const validationSchema = yup
    .object()
    .shape({ dedicatedSpace: yup.number().min(1), unitType: yup.string().oneOf(['MB', 'GB']) });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<SpaceConfig>({
    defaultValues: { dedicatedSpace: 1024, unitType: 'MB' },
    resolver: yupResolver(validationSchema)
  });

  const onHandleSubmit: SubmitHandler<SpaceConfig> = async (data) => {
    const result = await setDedicatedSpace(access_token, data.unitType, data.dedicatedSpace);
  };

  const unitTypeOptions: ['MB', 'GB'] = ['MB', 'GB'];

  const getSpaceInfo = useCallback(async () => {
    const result = await getDedicatedSpaceConfig(access_token);
    enqueueSnackbar('Espacio asignado', { variant: 'success' });
    setValue('dedicatedSpace', result.dedicatedSpace);
    setValue('unitType', result.unitType);
  }, [access_token]);

  useEffect(() => {
    getSpaceInfo();
  }, []);

  return (
    <Card>
      <CardHeader title="Espacio dedicado" />
      <CardContent>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <TextField label="Cantidad" fullWidth {...register('dedicatedSpace')} type="number" />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Tipo" fullWidth select {...register('unitType')}>
                {unitTypeOptions.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <LoadingButton loading={isSubmitting} fullWidth type="submit" variant="contained">
                Asignar Espacio
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}
