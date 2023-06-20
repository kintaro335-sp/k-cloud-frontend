import { Stack } from '@mui/material';
import { SelectAllButton, ShareButton, StopShareButton, CancelButton } from './options';

export default function ContextualMenu() {
  return (
    <Stack direction="row">
      <SelectAllButton />
      <ShareButton />
      <StopShareButton />
      <CancelButton />
    </Stack>
  );
}
