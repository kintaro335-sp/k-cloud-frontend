/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */
import React, { useState, createContext } from 'react';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Tooltip } from '@mui/material';
import { Trans } from 'react-i18next';
// icon
import { Icon } from '@iconify/react';
import fileOpenIcon from '@iconify/icons-material-symbols/file-open-sharp';
import closeIcon from '@iconify/icons-material-symbols/close';

export const PDFViewerCtx = createContext({ openFile: (url: string, name: string) => {} });

interface PDFViewerContextProps {
  children: React.ReactNode;
}

export default function PDFViewerContext({ children }: PDFViewerContextProps) {
  const [open, setOpen] = useState(false);
  const [nameFile, setNameFile] = useState('');
  const [source, setSource] = useState('');

  const clickClose = () => {
    setOpen(false);
  };

  const openFile = (url: string, name: string) => {
    setOpen(true);
    setNameFile(name);
    setSource(url);
  };

  return (
    <PDFViewerCtx.Provider value={{ openFile }}>
      <Dialog open={open} onClose={clickClose} fullScreen>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={clickClose} aria-label="close">
              <Icon icon={closeIcon} width="25px" height="25px" />
            </IconButton>
            <Tooltip title={<Trans i18nKey="ui.pdf_viewer.btn_open_new_tab">Abrir en una nueva pestaña</Trans>}>
              <a style={{ textDecoration: 'none', color: 'inherit' }} href={source} target="_blank" rel="noopener noreferrer">
                <IconButton edge="start" color="inherit" aria-label="open">
                  <Icon icon={fileOpenIcon} width="25px" height="25px" />
                </IconButton>
              </a>
            </Tooltip>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {nameFile}
            </Typography>
          </Toolbar>
        </AppBar>
        <iframe src={source} width="100%" height="100%" style={{ border: 'none' }} />
      </Dialog>
      {children}
    </PDFViewerCtx.Provider>
  );
}
