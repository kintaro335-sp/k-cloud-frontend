import { Box } from '@mui/material';
import ButtonBar from './ButtonBar';

export default function RouteBar({ path }: { path: string }) {
  const pathArr = path.split('/');

  return (
    <Box sx={{ display: 'flex', border: '3px solid #A1A1A1', borderRadius: '5px' }}>
      <ButtonBar name="Cloud" to="" index={-1} />
      {pathArr.map((n, i) => {
        if (n === '') return;
        const len = pathArr.length;
        return <ButtonBar name={n} to={pathArr.slice(0, 1 + i).join('/')} index={i} />;
      })}
    </Box>
  );
}
