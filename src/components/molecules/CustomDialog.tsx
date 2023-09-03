import React, { useState } from 'react';
import { Dialog, DialogContent } from '@mui/material';

interface CustomDialogProps {
  Button: (onClick: VoidFunction) => React.ReactNode;
  children: React.ReactNode;
}

export default function CustomDialog({ children, Button }: CustomDialogProps) {
  const [open, setOpen] = useState(false);

  const clickOpen = () => {
    setOpen(true);
  };

  const clickClose = () => {
    setOpen(false);
  };

  return (
    <>
      {Button(clickOpen)}

      <Dialog open={open} onClose={clickClose}>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </>
  );
}
