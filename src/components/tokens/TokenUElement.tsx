import { Link } from 'react-router-dom';
// componenets
import { Card, Box, CardContent, Typography, CardHeader, Tooltip, Stack, Checkbox, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TokenMenu from './TokenMenu';
import { FileIcon } from '../atoms';
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
//css
import '../files/css/fileelement.css';
import useFileSelect from '../../hooks/useFileSelect';
interface TokenUElementProps {
  token: TokenElement;
}

export default function TokenUElement({ token }: TokenUElementProps) {
  const { access_token } = useSelector((state) => state.session);
  const { id, expire, expires, mime_type, name, publict, type } = token;
  const urlRaw = `${apiUrl}/shared-file/tokens/user/content/${id}?t=${access_token}`;
  const urlRawDownload = `${urlRaw}?d=1&t=${access_token}`;
  const urlNormal = `${window.origin}/shared-files/id/${id}`;
  const { files, deselect, select } = useFileSelect();
  const selected = files.includes(token.id);
  const theme = useTheme();
  const ismobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Card className="cardfile">
      <CardContent>
        <Box
          sx={{ display: selected ? 'block !important' : undefined, top: '20px', zIndex: 100 }}
          className="checkfile"
        >
          <Checkbox
            checked={selected}
            onClick={() => {
              selected ? deselect(token.id) : select(token.id);
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <FileIcon type={type} mime_type={mime_type} url={urlRaw} context='tokenView' />
        </Box>
      </CardContent>
      <CardHeader
        title={
          <Box component={Link} to={`/tokens/id/${id}`} sx={{ color: 'secondary.main' }}>
            <Tooltip title={<Typography>{name}</Typography>}>
              <Box sx={{ width: { xs: '12ex', md: '16ex', lg: '17ex' } }}>
                <Box
                  sx={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    fontSize: ismobile ? '1.4ex' : '1.6ex',
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
