import { Card, CardContent, CardHeader, Typography, Box, Tooltip } from '@mui/material';
import { TokenElement } from '../../@types/sharedfiles';
import TokenIcon from './TokenIcon';

interface TokenElementProps {
  token: TokenElement;
}

export default function TokenItem({ token }: TokenElementProps) {
  const { id, name, type, expire, expires } = token;

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <TokenIcon type={type} />
        </Box>
      </CardContent>
      <CardHeader
        title={
          <Tooltip title={<Typography>{name}</Typography>}>
            <Box sx={{ width: '20ex' }}>
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
        }
        subheader={<Box>{type}</Box>}
      />
    </Card>
  );
}
