import { Card, CardContent, CardHeader, Tooltip, Box, Typography } from '@mui/material';
import { Folder } from '../filetypes';
import { FileI } from '../../../@types/files';

interface FolderElementProps {
  file: FileI;
  click: () => void;
}

export default function FolderElement({ file, click }: FolderElementProps) {
  if (file.type === 'file') {
    return null;
  }

  return (
    <Card>
      <CardContent>
        <Folder click={click} />
      </CardContent>
      <CardHeader
        title={
          <Tooltip title={<Typography variant="body2">{file.name}</Typography>}>
            <Box sx={{ width: { xs: '12ex', md: '15ex', lg: '17ex' } }}>
              <Box
                sx={{
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  fontSize: '1.6ex',
                  width: '100%',
                  overflow: 'hidden'
                }}
              >
                {file.name}
              </Box>
            </Box>
          </Tooltip>
        }
      />
    </Card>
  );
}
