import { useState } from 'react';
import { Button, Dialog, DialogContent, Box } from '@mui/material';
import FilesList from '../files/upload/FileList';
// icons
import { Icon } from '@iconify/react';
import uploadIcon from '@iconify/icons-material-symbols/upload-file';
// redux
import { useSelector } from '../../redux/store';

export default function Uploads() {
  const { filesDir } = useSelector((state) => state.files);
  const [open, setOpen] = useState(false);

  const clickOpen = () => {
    setOpen(true);
  };

  const clickClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={clickOpen} startIcon={<Icon icon={uploadIcon} width="22px" height="22px" />} variant="contained">
        Subidas {filesDir.length !== 0 && <>({filesDir.length})</>}
      </Button>
      <Dialog open={open} onClose={clickClose} maxWidth="md">
        <DialogContent>
          <Box sx={{ overflowY: 'scroll' }}>
            <FilesList />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
