import { Stack } from '@mui/material';
import { SelectAllButton, ShareButton, StopShareButton, CancelButton, DeleteButton, MoveButton } from './options';

export default function ContextualMenu() {
  return (
    <Stack direction="row">
      <SelectAllButton />
      <MoveButton />
      <ShareButton />
      <StopShareButton />
      <CancelButton />
      <DeleteButton />
    </Stack>
  );
}
