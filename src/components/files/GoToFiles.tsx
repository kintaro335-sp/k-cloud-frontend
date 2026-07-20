/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { useState, useEffect } from 'react';
import { IconButton, Tooltip, Dialog, DialogContent, Slider, Button, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';
// icons
import { Icon } from '@iconify/react';
import gotoIcon from '@iconify/icons-material-symbols/arrow-right-alt-rounded';
// redux
import { setStart, setShowQ } from '../../redux/slices/fileexplorer';
import { useSelector } from '../../redux/store';
// misc
import { Trans } from 'react-i18next';

interface Inputs {
  pos: number;
}

export default function GoToFiles() {
  const theme = useTheme();
  const { files, start } = useSelector((state) => state.fileexplorer);
  const totalFiles = files.length;
  const [open, setOpen] = useState(false);
  
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { pos } = data;
    setStart(pos * 200);
    setShowQ(200);
    clickClose();
  };

  const { handleSubmit, watch, setValue} = useForm<Inputs>({ defaultValues : { pos: 0 } });

  const vals = watch();
  
  const clickOpen = () => {
    setOpen(true);
  };

  const clickClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setValue('pos', Math.floor(start / 200));
  }, [start]);

  const pages = Math.floor(totalFiles / 200);

  return (
    <>
      {pages > 0 && <Tooltip title={<Trans i18nKey="files.gotoF" >Go to</Trans>}>
        <IconButton onClick={clickOpen}>
          <Icon icon={gotoIcon} width="20px" height="20px" color={theme.palette.text.secondary} />
        </IconButton>
      </Tooltip>}
      <Dialog open={open} onClose={clickClose}>
        <DialogContent>
          
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            <Typography variant="h4">
              <Trans i18nKey="files.gotoF" >Go to</Trans>:{vals.pos + 1}
            </Typography>
            <Slider
              defaultValue={0}
              step={1}
              min={0}
              max={pages}
              value={vals.pos}
              onChange={(_, value) => {
                setValue('pos', value as number);
              }}
            />
            <Button type="submit" variant="contained" color="success">
              <Trans i18nKey="files.gotoF" >Go to</Trans>
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
