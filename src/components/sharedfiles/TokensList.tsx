import { Grid } from '@mui/material';
import TokenElement from './TokenElement';

// redux
import { useSelector } from '../../redux/store';

export default function TokensList() {
  const { tokens } = useSelector((state) => state.sharedfiles);
  return (
    <>
      <Grid container spacing={2}>
        {tokens.map((t, i) => (
          <TokenElement key={i} token={t} />
        ))}
      </Grid>
    </>
  );
}
