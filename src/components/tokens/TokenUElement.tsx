import { Link } from 'react-router-dom';
// componenets
import { Card, Box, CardContent, Typography, CardHeader, Tooltip, Stack } from '@mui/material';
import TokenMenu from './TokenMenu';
import { TokenIcon } from '../atoms';
// icons
import { Icon } from '@iconify/react';
import publicIcon from '@iconify/icons-material-symbols/public';
import publicOffIcon from '@iconify/icons-material-symbols/public-off';
// types
import { TokenElement } from '../../@types/sharedfiles';
// redux
import { useSelector } from '../../redux/store';
// config
import { apiUrl } from '../../config';
// utils
import { fullDateFormat } from '../../utils/dateformat';

interface TokenUElementProps {
  token: TokenElement;
}

export default function TokenUElement({ token }: TokenUElementProps) {
  const { access_token } = useSelector((state) => state.session);
  const { id, expire, expires, mime_type, name, publict, type } = token;
  const urlRaw = `${apiUrl}/shared-file/tokens/user/content/${id}?t=${access_token}`;
  const urlRawDownload = `${urlRaw}?d=1&t=${access_token}`;
  const urlNormal = `${window.origin}/shared-files/id/${id}`;
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <TokenIcon type={type} mime_type={mime_type} url={urlRaw} />
        </Box>
      </CardContent>
      <CardHeader
        title={
          <Box component={Link} to={`/tokens/id/${id}`} sx={{ color: 'secondary.main' }}>
            <Tooltip title={<Typography>{name}</Typography>}>
              <Box sx={{ width: { xs: '14ex', md: '16ex', lg: '17ex' } }}>
                <Box
                  sx={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    fontSize: '1.6ex',
                    width: '100%',
                    overflow: 'hidden'
                  }}
                >
                  {name}
                </Box>
              </Box>
            </Tooltip>
          </Box>
        }
        subheader={
          <Box>
            <Stack direction="row" spacing={2}>
              <Box>{type}</Box>
              <Box>
                {publict ? (
                  <Icon icon={publicIcon} width="25px" height="25px" />
                ) : (
                  <Icon icon={publicOffIcon} width="25px" height="25px" />
                )}
              </Box>
              <Box>{expire ? 'expira' : 'permanente'}</Box>
              <Box>{expire && fullDateFormat(new Date(expires))}</Box>
            </Stack>
          </Box>
        }
        action={<TokenMenu token={token} />}
      />
    </Card>
  );
}
