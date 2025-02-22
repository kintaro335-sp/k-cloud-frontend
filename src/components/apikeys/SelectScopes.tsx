/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { useState, useRef } from 'react';
import { Trans } from 'react-i18next';
import { Box, Chip, Button, Stack, IconButton, Menu, MenuItem } from '@mui/material';
import { Icon } from '@iconify/react';
import closeIcon from '@iconify/icons-material-symbols/close';
// contsnts
import { scopeList } from './constants';
// types
import { Scope } from '../../@types/apikeys';

interface SelectScopesProps {
  scopes: Scope[];
  onChange: (scopes: Scope[]) => void;
}

export default function SelectScopes({ onChange, scopes }: SelectScopesProps) {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const clickOpen = () => {
    setOpen(true);
  };

  const clickClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button ref={anchorRef} onClick={clickOpen}><Trans i18nKey="pages.apikeys.form.label_add_scope">Agregar Scopes</Trans></Button>
      <Menu anchorEl={anchorRef.current} open={open} onClose={clickClose} MenuListProps={{ sx: { maxHeight: '300px' } }}>
        {scopeList.filter((scope) => !scopes.includes(scope)).map((scope) => (
          <MenuItem
            key={scope}
            onClick={() => {
              onChange([...scopes, scope]);
            }}
          >
            {scope}
          </MenuItem>
        ))}
      </Menu>
      <Stack spacing={1} direction="row">
        {scopes.map((scope) => (
          <Chip
            key={scope}
            label={
              <Box>
                {scope}
                <IconButton onClick={() => onChange(scopes.filter((s) => s !== scope))}>
                  <Icon icon={closeIcon} width="15px" height="15px" />
                </IconButton>
              </Box>
            }
          />
        ))}
      </Stack>
    </Box>
  );
}
