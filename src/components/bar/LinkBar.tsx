import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import React from 'react';

interface LinkBarProps {
  children: string | React.ReactNode;
  to: string;
}

export default function LinkBar({ children, to }: LinkBarProps) {
  return (
    <Link component={RouterLink} to={to} sx={{ color: 'text.primary', padding: '5px', fontWeight: 700 }}>
      {children}
    </Link>
  );
}
