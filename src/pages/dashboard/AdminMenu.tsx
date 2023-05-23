import { Link } from 'react-router-dom';
import { Box, Grid, Typography, Card, CardContent, CardHeader } from '@mui/material';
// icons
import { Icon } from '@iconify/react';
import usersIcon from '@iconify/icons-ant-design/user';
import statsIcon from '@iconify/icons-ant-design/pie-chart-fill';
import settingsIcon from '@iconify/icons-material-symbols/settings';
import logsIcon from '@iconify/icons-material-symbols/format-list-bulleted';

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
    },
    {
      title: 'Estadisticas',
      icon: <Icon icon={statsIcon} width="100%" height="100%" />,
      link: '/admin/stats'
    },
    {
      title: 'Logs',
      icon: <Icon icon={logsIcon} width="100%" height="100%" />,
      link: '/admin/logs'
    },
    {
      title: 'Sistema',
      icon: <Icon icon={settingsIcon} width="100%" height="100%" />,
      link: '/admin/system'
    }
  ];

  return (
    <Box>
      <Grid container spacing={3} sx={{ display: 'flex' }}>
        {options.map((opt) => (
          <Grid item xs={12} md={6} lg={6} key={opt.title}>
            <Box component={Link} to={opt.link} sx={{ textDecoration: 'none', display: 'flex', width: '100%' }}>
              <Card sx={{ width: '100%' }}>
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
