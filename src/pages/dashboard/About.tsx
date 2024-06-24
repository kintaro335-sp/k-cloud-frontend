import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Toolbar, Box, Typography, Card, CardContent } from '@mui/material';
import { BackButton } from '../../components/atoms';
import { version } from '../../config';
// api
import { getAbout } from '../../api/admin';

export default function About() {
  const location = useLocation();
  const [backendVersion, setBackendVersion] = useState('');

  const isAdmin = location.pathname.includes('admin');

  useEffect(() => {
    getAbout().then((result) => {
      setBackendVersion(result.version);
    });
  }, []);

  return (
    <>
      <Toolbar>
        <BackButton to={isAdmin ? '/admin' : '/'} />
      </Toolbar>
      <Box sx={{ width: '100vw', height: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Acerca de K-Cloud
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Version Backend: {backendVersion}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Version Frontend: {version}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
