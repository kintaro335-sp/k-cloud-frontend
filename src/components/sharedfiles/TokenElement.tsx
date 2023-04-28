import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, Typography, Box, Tooltip, Stack } from '@mui/material';
import { TokenElement } from '../../@types/sharedfiles';
import TokenIcon from './TokenIcon';
import { CopyClipboard, DownloadButton } from '../atoms';
// config
import { apiUrl } from '../../config';

interface TokenElementProps {
  token: TokenElement;
}

export default function TokenItem({ token }: TokenElementProps) {
  const { id, name, type } = token;

  const urlRaw = `${apiUrl}/shared-file/content/${id}`;
  const urlZipDowload = `${apiUrl}/shared-file/zip/${id}`;
  const urlRawDownload = `${urlRaw}?d=1`;
  const urlNormal = `${window.origin}/shared-files/id/${id}`;

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <TokenIcon type={type} />
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
          <Stack direction="row">
            <CopyClipboard url={type === 'file' ? urlRaw : urlNormal} />
            <DownloadButton url={urlZipDowload} name={name} variant="zip" />
          </Stack>
        }
      />
    </Card>
  );
}
