/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { Button } from '@mui/material';
// hooks
import useFileSelect from '../../../../hooks/useFileSelect';
// redux
import { useSelector } from '../../../../redux/store';

export default function SelectAllButton() {
  const { selectAll } = useFileSelect();
  const { files } = useSelector((state) => state.fileexplorer);

  const onClickSelectAll = () => {
    selectAll(files.map((f) => f.name));
  };

  return <Button onClick={onClickSelectAll}>Seleccionar Todo</Button>;
}
