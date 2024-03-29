import { useRef } from 'react';
import { Button } from '@mui/material';
import { useSelector } from '../../redux/store';
import { Icon } from '@iconify/react';
import addFileC from '@iconify/icons-ant-design/file-add-filled';
import useFileU from '../../hooks/useFileU';

export default function UploadFile() {
  const { path } = useSelector((state) => state.session);
  const { uploadFile } = useFileU();
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<Icon icon={addFileC} width="25px" height="25px" />}
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        Subir Archivo
      </Button>
      <input
        type="file"
        ref={inputRef}
        onChange={(e) => {
          const files = e.target.files || [null];
          uploadFile(path, files[0]);
        }}
        style={{ display: 'none' }}
      />
    </>
  );
}
