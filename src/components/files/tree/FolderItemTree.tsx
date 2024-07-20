import { Typography } from '@mui/material';
import { TreeItem } from '@mui/x-tree-view';
import { Folder } from '../../../@types/files';
// redux
import { useDispatch } from '../../../redux/store';
import { setPath } from '../../../redux/slices/session';
// icon
import { Icon } from '@iconify/react';
import FolderIcon from '@iconify/icons-material-symbols/folder';
import FolderOpenIcon from '@iconify/icons-material-symbols/folder-open';

interface FolderItemTreeProps {
  folder: Folder;
  level: number;
  index: number;
  path?: string;
}

export default function FolderItemTree({ folder, index, level, path = '' }: FolderItemTreeProps) {
  const { name, content } = folder;
  const dispatch = useDispatch();
  return (
    <TreeItem
      slots={{
        endIcon: () => <Icon icon={FolderIcon} />,
        collapseIcon: () => <Icon icon={FolderOpenIcon} />,
        expandIcon: () => <Icon icon={FolderIcon} />
      }}
      itemId={`${name}-${index}-${level}`}
      label={
        <Typography
          onClick={() => {
            setPath(`${path}/${name}`);
          }}
          variant="body2"
        >
          {name}
        </Typography>
      }
    >
      {content.map((elem, i) => {
        if (!elem) return;
        if (elem.type === 'Folder') {
          return (
            <FolderItemTree
              key={`${elem.name}-${i}-${level + 1}`}
              folder={elem}
              index={i}
              level={level + 1}
              path={`${path}/${name}`}
            />
          );
        }
      })}
    </TreeItem>
  );
}
