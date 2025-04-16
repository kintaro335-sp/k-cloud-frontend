/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { useRef } from 'react';
import { Button } from '@mui/material';
import { useSelector } from '../../redux/store';
import { Icon } from '@iconify/react';
import addFileC from '@iconify/icons-ant-design/file-add-filled';
import useFileU from '../../hooks/useFileU';
import { Trans } from 'react-i18next';

export default function UploadFile() {
  const { path } = useSelector((state) => state.session);
  const { uploadFile } = useFileU();
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<Icon icon={addFileC} width="20px" height="20px" />}
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        <Trans i18nKey="ui.bar.btn_upload">Subir Archivo</Trans>
      </Button>
      <input
        type="file"
        ref={inputRef}
        onChange={(e) => {
          const files = e.target.files;
          if(!files) return
          const fileArr = [...Array(files.length)]
          fileArr.forEach((_, i) => {
            uploadFile(path, files.item(i));
          });
        }}
        style={{ display: 'none' }}
      />
    </>
  );
}
