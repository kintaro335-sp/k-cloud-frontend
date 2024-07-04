import { useState } from 'react';
// hookform
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// compoenents
import { Grid, TextField, Dialog, DialogContent, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
// redux
import { useSelector } from '../../redux/store';
// api
import { createApiKey } from '../../api/auth';

interface FormFields {
  name: string;
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
    name: yup.string().required()
  });

  const form = useForm<FormFields>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(validationSchema)
  });

  const { register, handleSubmit, reset, formState: { errors, touchedFields, isSubmitting } } = form;

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await createApiKey(access_token, data.name);
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
        Crear API Key
      </Button>
      <Dialog open={open} onClose={clickClose} maxWidth="md">
        <DialogContent>
          <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Nombre"
                  fullWidth
                  {...register('name')}
                  helperText={errors.name?.message}
                  error={Boolean(errors.name) && Boolean(touchedFields.name)}
                />
              </Grid>
              <Grid item xs={12}>
                <LoadingButton type="submit" variant="contained" fullWidth loading={isSubmitting}>
                  Crear
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
