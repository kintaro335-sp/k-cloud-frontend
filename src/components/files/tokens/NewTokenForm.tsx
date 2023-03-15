import { Switch, Grid, Box, FormControlLabel, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
// icon
import { Icon } from '@iconify/react';
import addIcon from '@iconify/icons-material-symbols/add';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// redux
import { useSelector } from '../../../redux/store';
// api
import { shareFile } from '../../../api/sharedfiles';
import moment from 'moment';

interface NewTokenFormProps {
  url: string;
}

interface NewTokenValues {
  expire: boolean;
  expires: Date;
}

export default function NewTokenForm({ url }: NewTokenFormProps) {
  const { access_token } = useSelector((state) => state.session);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting }
  } = useForm<NewTokenValues>({
    defaultValues: {
      expire: false,
      expires: new Date()
    }
  });

  const values = watch();

  const onHandleSubmit: SubmitHandler<NewTokenValues> = async (values) => {
    await shareFile(url, values.expire, values.expires.getTime(), access_token);
  };

  return (
    <Box>
      <Typography>Nuevo Token</Typography>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                label="Caduca"
                labelPlacement="bottom"
                control={
                  <Switch
                    checked={values.expire}
                    onChange={(e) => {
                      //@ts-ignore
                      setValue('expire', e.value.checked);
                    }}
                  />
                }
              />
            </Grid>
            {values.expire && (
              <Grid item xs={12}>
                <DesktopDateTimePicker
                  label="fecha de expiración"
                  value={moment(values.expires)}
                  onChange={(value) => {
                    if (value === null) return;
                    setValue('expires', value.toDate());
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <LoadingButton variant="contained" type="submit" loading={isSubmitting}>
                <Icon icon={addIcon} width="33px" height="33px" />
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </LocalizationProvider>
    </Box>
  );
}
