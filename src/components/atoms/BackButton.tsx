import { useNavigate } from 'react-router-dom';
// mui
import { useTheme } from '@mui/material/styles'
import { IconButton, Tooltip } from '@mui/material';
// icon
import { Icon } from '@iconify/react';
import backIcon from '@iconify/icons-material-symbols/arrow-back-rounded';

interface BackButtonProps {
  to: string;
}

export default function BackButton({ to }: BackButtonProps) {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <Tooltip title="Volver">
      <IconButton onClick={handleClick}>
        <Icon icon={backIcon} width="25px" height="25px" color={theme.palette.text.secondary} />
      </IconButton>
    </Tooltip>
  );
}
