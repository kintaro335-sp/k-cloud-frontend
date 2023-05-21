import { useTheme } from '@mui/material/styles'
import { Stack, Box } from '@mui/material';
import { Icon } from '@iconify/react';
import rightC from '@iconify/icons-ant-design/caret-right-fill';

interface ButtonBarProps {
  name: string;
  to: string;
  index: number;
  onChangePath: (newPath: string) => void;
}

export default function ButtonBar({ name, to, index, onChangePath }: ButtonBarProps) {
  const theme = useTheme();

  const sendToPath = () => {
    onChangePath(to);
  };

  return (
    <Stack direction="row">
      {index !== -1 && (
        <Box sx={{ padding: '3px', display: 'flex', alignItems: 'center' }}>
          <Icon icon={rightC} width="16px" height="16px" color={theme.palette.text.secondary} />
        </Box>
      )}
      <Box sx={{ padding: '3px', fontWeight: 600, textAlign: 'center', cursor: 'pointer' }} onClick={sendToPath}>
        {name}
      </Box>
    </Stack>
  );
}
