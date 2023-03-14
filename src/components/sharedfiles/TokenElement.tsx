import { Card, CardContent, CardHeader, Typography, Box } from '@mui/material';
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
        <Box sx={{ diaplay: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <TokenIcon type={type} />
        </Box>
      </CardContent>
      <CardHeader title={<Typography>{name}</Typography>} subheader={type} />
    </Card>
  );
}
