/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { useState } from 'react';
// mui
import { MenuItem, Dialog, DialogContent, Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Trans } from 'react-i18next';
import { t } from 'i18next';
// hooks
import { useSnackbar } from 'notistack';
// icons
import { Icon } from '@iconify/react';
import renameIcon from '@iconify/icons-material-symbols/edit';
// hook-form
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// redux
import { useSelector } from '../../../redux/store';
// api
import { renameFile } from '../../../api/files';

interface FormFields {
  newName: string;
}

interface RenameFileProps {
  url: string;
  fileName: string;
  onClose?: VoidFunction;
}

export default function RenameFile({ fileName, url, onClose }: RenameFileProps) {
  const { access_token } = useSelector((state) => state.session);
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const clickOpen = () => {
    setOpen(true);
  };

  const clickClose = () => {
    setOpen(false);
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const validationSchema = Yup.object().shape({ newName: Yup.string().required().min(1).max(100) });

  const {
    formState: { isSubmitting },
    register,
    handleSubmit,
    watch
  } = useForm<FormFields>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      newName: fileName
    }
  });

  const values = watch();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await renameFile(url, data.newName, access_token);
    enqueueSnackbar(t('ui.rename_form.msg_rename_success'), { variant: 'success' });
    clickClose();
  };

  return (
    <>
      <MenuItem onClick={clickOpen}><Icon icon={renameIcon} width="25px" height="25px" /><Trans i18nKey="pages.files.femenu.rename">Renombrar</Trans></MenuItem>
      <Dialog open={open} onClose={clickClose}>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField {...register('newName')} fullWidth label={t('ui.rename_form.label_new_name')} />
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  disabled={fileName === values.newName}
                  type="submit"
                  color="primary"
                  variant="contained"
                  loading={isSubmitting}
                  fullWidth
                >
                  <Icon icon={renameIcon} width="25px" height="25px" /><Trans i18nKey="ui.rename_form.btn_rename">Renombrar</Trans>
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
