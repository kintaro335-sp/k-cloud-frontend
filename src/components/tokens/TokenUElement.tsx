import { Link } from 'react-router-dom'
// componenets
import { Card, Box, CardContent, Typography, CardHeader, Tooltip } from '@mui/material';
import TokenMenu from './TokenMenu';
import { TokenIcon } from '../atoms';
// types
import { TokenElement } from '../../@types/sharedfiles';
// config
import { apiUrl } from '../../config';

interface TokenUElementProps {
  token: TokenElement;
}

export default function TokenUElement({ token }: TokenUElementProps) {
  const { id, expire, expires, mime_type, name, publict, type } = token;
  const urlRaw = `${apiUrl}/shared-file/content/${id}`;
  const urlZipDowload = `${apiUrl}/shared-file/zip/${id}`;
  const urlRawDownload = `${urlRaw}?d=1`;
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
          <Box component={Link} to={`/shared-files/id/${id}`} sx={{ color: 'secondary.main' }}>
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
        subheader={<Box>{type}</Box>}
        action={
          <TokenMenu token={token} />
        }
      />
    </Card>
  );
}
