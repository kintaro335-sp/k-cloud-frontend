import { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, TextField, Grid, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SpaceAssigned from './SpaceAssigned';
import { useSnackbar } from 'notistack';
// form
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { SpaceConfig, UnitByte } from '../../../@types/admin';
// redux
import { useSelector } from '../../../redux/store';
// api
import { setDedicatedSpace, getDedicatedSpaceConfig } from '../../../api/admin';
import { isAxiosError } from 'axios';

export default function DedicatedSpaceForm() {
  const { access_token } = useSelector((state) => state.session);
  const { enqueueSnackbar } = useSnackbar();
  const [spaceDCalculated, setSpaceDCalculated] = useState(0);

  const validationSchema = yup
    .object()
    .shape({ dedicatedSpace: yup.number().min(1), unitType: yup.string().oneOf(['MB', 'GB']) });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<SpaceConfig>({
    defaultValues: { dedicatedSpace: 1024, unitType: 'MB' },
    resolver: yupResolver(validationSchema)
  });

  const { unitType, dedicatedSpace, usedSpaceBytes } = watch();

  const onHandleSubmit: SubmitHandler<SpaceConfig> = async (data) => {
    try {
      const result = await setDedicatedSpace(access_token, data.unitType, data.dedicatedSpace);
      enqueueSnackbar(result.message, { variant: 'success' });
    } catch (err) {
      if (isAxiosError(err)) {
        enqueueSnackbar(err.response?.data.message, { variant: 'error' });
      }
    }
  };

  const unitTypeOptions: ['MB', 'GB'] = ['MB', 'GB'];

  const getSpaceInfo = useCallback(async () => {
    const result = await getDedicatedSpaceConfig(access_token);
    setValue('dedicatedSpace', result.dedicatedSpace);
    setValue('unitType', result.unitType);
    setValue('usedSpaceBytes', result.usedSpaceBytes);
  }, [access_token]);

  const megabyte = 1024 * 1024;
  const gigabyte = 1024 * 1024 * 1024;

  useEffect(() => {
    // calculate space dedicated
    if (unitType === 'MB') {
      setSpaceDCalculated(dedicatedSpace * megabyte);
    }
    if (unitType === 'GB') {
      setSpaceDCalculated(dedicatedSpace * gigabyte);
    }
  }, [dedicatedSpace, unitType]);

  useEffect(() => {
    getSpaceInfo();
  }, []);

  return (
    <Card>
      <CardHeader title="Espacio dedicado" />
      <CardContent>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <SpaceAssigned dedicatedSpace={spaceDCalculated} usedSpace={usedSpaceBytes}  />
            </Grid>
            <Grid item xs={9}>
              <TextField label="Cantidad" fullWidth {...register('dedicatedSpace')} type="number" />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Tipo"
                fullWidth
                select
                value={unitType}
                onChange={(e) => {
                  setValue('unitType', e.target.value as UnitByte);
                }}
              >
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
