import { Box, CircularProgress } from '@mui/material';

interface LoadingProps {
  width?: number | string;
  height?: number | string;
}

export default function Loading({ width, height }: LoadingProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: width || '100vw',
        height: height || '100vh'
      }}
    >
      <CircularProgress />
    </Box>
  );
}
