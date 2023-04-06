import { useState } from 'react';
import { Dialog, DialogContent, Box } from '@mui/material';
import { Icon } from '@iconify/react';
import videoIcon from '@iconify/icons-ant-design/video-camera-filled';

export default function VideoPreview({ url }: { url: string }) {
  const [open, setOpen] = useState(false);

  const clickOpen = () => {
    setOpen(true);
  };

  const clickClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        onClick={clickOpen}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', cursor: 'pointer' }}
      >
        <Icon icon={videoIcon} width="220px" height="220px" />
      </Box>
      <Dialog open={open} onClose={clickClose} maxWidth="lg">
        <DialogContent>
          <Box component="video" controls src={url} width="100%" height="auto" />
        </DialogContent>
      </Dialog>
    </>
  );
}
