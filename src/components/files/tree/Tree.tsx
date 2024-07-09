import { Box } from '@mui/material';
import { SimpleTreeView as TreeView } from '@mui/x-tree-view';
import { useSelector } from '../../../redux/store';
import FolderItemTree from './FolderItemTree';


export default function Tree() {
  const { tree } = useSelector((state) => state.session);

  return (
    <Box>
      <TreeView>
        {tree.map((elem, i) => {
          if (!elem) return;
          if (elem.type === 'Folder') {
            return <FolderItemTree key={`${elem.name}-${i}-${0}`} folder={elem} index={i} level={0} />;
          }
        })}
      </TreeView>
    </Box>
  );
}
