import { Box, Typography } from '@mui/material';
import { useSelector } from '../../redux/store';
import { addFile } from '../../redux/slices/fileUploader';
import useFileU from '../../hooks/useFileU';

export default function DropFiles() {
  const { path } = useSelector((state) => state.session);
  const { uploadFile } = useFileU();

  return (
    <Box
      sx={{
        padding: '1.1em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'dashed',
        borderWidth: '3px',
        borderColor: '#4A4A4A',
        backgroundColor: '#2D2D2D'
      }}
      onDrop={(e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        [...new Array(files.length).map((_, i) => i)].forEach((_e, i) => {
          uploadFile(path, files[i]);
        });
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Typography sx={{ fontWeight: '300' }}>Arrastra archivos aqui</Typography>
    </Box>
  );
}
