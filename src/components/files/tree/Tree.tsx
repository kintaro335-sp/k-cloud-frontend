import { Box } from '@mui/material';
import { TreeView } from '@mui/lab';
import { useSelector } from '../../../redux/store';
import FolderItemTree from './FolderItemTree';

import { Icon } from '@iconify/react';
import FolderOpenIcon from '@iconify/icons-material-symbols/folder-open';
import FolderIcon from '@iconify/icons-material-symbols/folder';

export default function Tree() {
  const { tree } = useSelector((state) => state.session);

  return (
    <Box>
      <TreeView defaultCollapseIcon={<Icon icon={FolderOpenIcon} />} defaultExpandIcon={<Icon icon={FolderIcon} />}>
        {tree.map((elem, i) => {
          if (!elem) return;
          if (elem.type === 'Folder') {
            return <FolderItemTree folder={elem} index={i} level={0} />;
          }
        })}
      </TreeView>
    </Box>
  );
}
