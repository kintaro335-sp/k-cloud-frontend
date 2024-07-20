import { Card, CardContent, CardHeader, Box } from '@mui/material';
// icons
import { Icon } from '@iconify/react';
import uṕIcon from '@iconify/icons-ant-design/ellipsis';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { setPath } from '../../redux/slices/session';

export default function UpFolder() {
  const dispatch = useDispatch();
  const { path } = useSelector((state) => state.session);

  const click = () => {
    const newPath = path.split('/').slice(0, -1).join('/');
    setPath(newPath);
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', aligItems: 'center', justifyContent: 'center', width: '100%' }} onClick={click}>
          <Icon icon={uṕIcon} width="220px" height="220px" />
        </Box>
      </CardContent>
      <CardHeader title="Carpeta Superior" />
    </Card>
  );
}
