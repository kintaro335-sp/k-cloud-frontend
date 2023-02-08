import { Link } from 'react-router-dom';
import { Box, Grid, Typography, Card, CardContent, CardHeader } from '@mui/material';
// icons
import { Icon } from '@iconify/react';
import usersIcon from '@iconify/icons-ant-design/user';

interface OptionMenuAdmin {
  title: string;
  icon: JSX.Element;
  link: string;
}

export default function AdminMenu() {
  const options: OptionMenuAdmin[] = [
    {
      title: 'Usuarios',
      icon: <Icon icon={usersIcon} width="100%" height="100%" />,
      link: '/admin/accounts'
    }
  ];

  return (
    <Box>
      <Grid container spacing={3} sx={{ display: 'flex' }}>
        {options.map((opt) => (
          <Grid item xs={12} md={6} lg={4} key={opt.title}>
            <Box component={Link} to={opt.link} sx={{ textDecoration: 'none', display: 'flex', width: '100%' }}>
              <Card>
                <CardContent sx={{ display: 'flex' }}>{opt.icon}</CardContent>
                <CardHeader
                  title={
                    <Typography variant="h3" sx={{ textAlign: 'center' }}>
                      {opt.title}
                    </Typography>
                  }
                />
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
