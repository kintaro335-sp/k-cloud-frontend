/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { AppBar, Container, Toolbar, Typography, Box, Stack, Grid, useMediaQuery } from '@mui/material';
import { UserProfile, LateralMenu, Uploads, LinkBar } from './bar';
import { Trans } from 'react-i18next';
import FilesSubMenu from './files/FilesSubMenu';
import useAuth from '../hooks/useAuth';

interface BarProps {
  children: React.ReactNode;
}

export default function Bar({ children }: BarProps) {
  const { isAuthenticated, loading } = useAuth();
  const { pathname } = useLocation();
  const pagesShowList = ['/files'];
  const showMenuL = isAuthenticated && pagesShowList.includes(pathname);
  const theme = useTheme();
  const bk = useMediaQuery(theme.breakpoints.up('md'));
  const mobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              sx={{ marginRight: '5px', color: 'white', textDecoration: 'none' }}
              component={RouterLink}
              to="/"
            >
              Cloud
            </Typography>
            {isAuthenticated && <UserProfile />}
            {loading && (
              <Typography variant='subtitle1'>
                <Trans i18nKey="common.loading">Cargando</Trans>...
              </Typography>
            )}
            <Stack
              spacing={2}
              direction="row"
              sx={{ display: 'flex', float: 'right', overflowX: 'auto', marginRight: '5px' }}
            >
              {!isAuthenticated && pathname !== '/login' && (
                <LinkBar to="/login">
                  <Trans i18nKey="ui.bar.login">Login</Trans>
                </LinkBar>
              )}
              {isAuthenticated && pathname !== '/files' && (
                <LinkBar to="/files">
                  <Trans i18nKey="ui.bar.files">Archivos</Trans>
                </LinkBar>
              )}
              {isAuthenticated && pathname === '/files' && <FilesSubMenu />}
              {isAuthenticated && pathname !== '/search' && (
                <LinkBar to="/search">
                  <Trans i18nKey="ui.bar.search">Buscar</Trans>
                </LinkBar>
              )}
              {isAuthenticated && pathname !== '/tokens' && (
                <LinkBar to="/tokens">
                  <Trans i18nKey="ui.bar.tokens">Tokens</Trans>
                </LinkBar>
              )}
              {pathname !== '/shared-files' && (
                <LinkBar to="/shared-files">
                  <Trans i18nKey="ui.bar.shared_files">Shared Files</Trans>
                </LinkBar>
              )}
              {mobile && isAuthenticated && <Uploads />}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ height: '64px' }} />
      <Grid container spacing={1} sx={{ height: '90vh' }}>
        <Grid item xs={2} sx={{ display: { xs: 'none', md: showMenuL ? 'block' : 'none' }, height: '100%' }}>
          <LateralMenu />
        </Grid>
        <Grid item xs={showMenuL && bk ? 10 : 12} sx={{ height: '100%', padding: showMenuL && bk ? undefined : '0px' }}>
          {children}
        </Grid>
      </Grid>
    </>
  );
}
