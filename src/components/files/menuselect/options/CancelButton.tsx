/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { Button } from '@mui/material';
// hooks
import useFileSelect from '../../../../hooks/useFileSelect';

export default function CancelButton() {
  const { clearSelect } = useFileSelect();

  return <Button onClick={clearSelect}>Cancelar</Button>;
}
