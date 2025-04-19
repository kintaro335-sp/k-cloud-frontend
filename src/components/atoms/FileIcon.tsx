/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { FileType } from '../../@types/files';
import { explorerContext } from '../../@types/general';
import { Box } from '@mui/material';
import { Icon } from '@iconify/react';
import FolderIcon from '@iconify/icons-ant-design/folder';
import { ImgFileT, VideoFile, AudioFile, CompressedFile, ISOFile, PDFFile, OtherFile } from './filespreview';

export default function TokenIcon({
  type,
  mime_type,
  url,
  context,
  arrayIndex,
  fileName,
  onClickFolder
}: {
  type: FileType;
  mime_type: string;
  url: string;
  context: explorerContext;
  fileName?: string;
  arrayIndex?: number;
  onClickFolder?: VoidFunction;
}) {
  const name = fileName || '';

  if (type === 'folder') {
    return (
      <Box sx={{ display: 'inline-block', cursor: onClickFolder ? 'pointer' : undefined }} onClick={onClickFolder}>
        <Icon icon={FolderIcon} width="250px" height="250px" />
      </Box>
    );
  }

  if (mime_type.includes('video/')) {
    return <VideoFile url={url} nameFile={name} />;
  }

  if (mime_type.includes('image/')) {
    return <ImgFileT url={url} context={context} index={arrayIndex} />;
  }

  if (mime_type.includes('audio/')) {
    return <AudioFile />;
  }

  if (mime_type.includes('application/pdf')) {
    return <PDFFile name={name} url={url} />;
  }

  if (
    mime_type.includes('7z') ||
    mime_type.includes('zip') ||
    mime_type.includes('gzip') ||
    mime_type.includes('rar') ||
    mime_type.includes('tar')
  ) {
    return <CompressedFile />;
  }

  if (mime_type.includes('iso9660')) {
    return <ISOFile />;
  }

  return <OtherFile url={url} />;
}
