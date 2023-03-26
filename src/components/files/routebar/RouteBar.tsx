import { Box } from '@mui/material';
import ButtonBar from './ButtonBar';

interface RouteBarProps {
  title?: string;
  path: string;
  onChangePath: (newPath: string) => void;
}

export default function RouteBar({ title = 'Cloud', path, onChangePath }: RouteBarProps) {
  const pathArr = path.split('/');

  return (
    <Box sx={{ display: 'flex', border: '3px solid #A1A1A1', borderRadius: '5px', width: '100%' }}>
      <ButtonBar name={title} to="" index={-1} onChangePath={onChangePath} />
      {pathArr.map((n, i) => {
        if (n === '') return;
        const len = pathArr.length;
        return (
          <ButtonBar
            key={`${n}-${i}`}
            name={n}
            to={pathArr.slice(0, 1 + i).join('/')}
            index={i}
            onChangePath={onChangePath}
          />
        );
      })}
    </Box>
  );
}
