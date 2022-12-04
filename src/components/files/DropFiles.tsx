import { Box, Typography } from '@mui/material';
import useFiles from '../../hooks/useFiles';
import { useSelector } from '../../redux/store';

export default function DropFiles() {
  const { addFile } = useFiles();
  const { path } = useSelector((state) => state.session);

  return (
    <Box
      sx={{
        padding: '2em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'dashed',
        borderWidth: '3px',
        borderColor: '#4A4A4A',
        backgroundColor: '#C0C0C0'
      }}
      onDrop={(e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        [...new Array(files.length).map((_, i) => i)].forEach((_e, i) => {
          addFile(path, files[i]);
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
