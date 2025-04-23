/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, Box, Tooltip, Typography, Stack, Checkbox } from '@mui/material';
import { Folder } from './filetypes';
import MenuFile from './MenuFile';
import { DownloadButton, FileIcon } from '../atoms/';
import { bytesFormat } from '../../utils/files';
import { FileI } from '../../@types/files';
// hooks
import useFileSelect from '../../hooks/useFileSelect';
// api
import { apiUrl } from '../../config';

// redux
import { useSelector } from '../../redux/store';
import { setPath as setPathSession } from '../../redux/slices/session';
import { setPath as setPathSF } from '../../redux/slices/sharedfile';
//css
import './css/fileelement.css';

interface FileInfoProps {
  file: FileI;
  children: JSX.Element;
  url: string;
  urlComplete: string;
  sf?: boolean;
}

function FileInfo({ file, children, url, urlComplete, sf }: FileInfoProps) {
  const cardHeaderRef = useRef<HTMLDivElement>(null);
  const fileNameContainer = useRef<HTMLDivElement>(null);
  const resizeObserver = useRef<ResizeObserver | null>(null);
  const { id } = useParams();
  const { files, select, deselect } = useFileSelect();
  const selected = files.includes(file.name);

  useEffect(() => {
    resizeObserver.current = new ResizeObserver((entries) => {
      if (!cardHeaderRef.current || !fileNameContainer.current) return;
      fileNameContainer.current.style.setProperty('width', `${entries[0].contentRect.width - 35}px`);
    });

    resizeObserver.current.observe(cardHeaderRef.current as Element);
    return () => {
      resizeObserver.current?.disconnect();
    };
  }, []);

  return (
    <Card className="cardfile">
      <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {!sf && (
          <Box
            sx={{ display: selected ? 'block !important' : undefined, top: '20px', left: '5px', zIndex: 100 }}
            className="checkfile"
          >
            <Checkbox
              checked={selected}
              onClick={() => {
                selected ? deselect(file.name) : select(file.name);
              }}
            />
          </Box>
        )}
        {children}
      </CardContent>
      <CardHeader
        ref={cardHeaderRef}
        title={
          <Tooltip title={<Typography variant="body2">{file.name}</Typography>}>
            <Box ref={fileNameContainer} sx={{}}>
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
        subheader={
          <Box>
            {!sf && <>T:{file.tokens}</>} {bytesFormat(file.size)}
          </Box>
        }
        action={
          sf ? (
            <Stack direction="row" spacing={0}>
              <DownloadButton url={`${urlComplete}?d=1`} name={file.name} />
              <DownloadButton url={`${apiUrl}/shared-file/zip/${id}/${url}`} name={file.name} variant="zip" />
            </Stack>
          ) : (
            <MenuFile url={url} file={file} urlComplete={urlComplete} />
          )
        }
      />
    </Card>
  );
}

interface FileElementProps {
  file: FileI;
  arrayIndex: number;
  sf?: boolean;
}

export default function FileElement({ file, sf = false, arrayIndex }: FileElementProps) {
  const { name, size, type, mime_type, extension, tokens } = file;
  const { id } = useParams();
  const session = useSelector((state) => state.session);
  const sharedfile = useSelector((state) => state.sharedfile);
  const pathSelected = sf ? sharedfile.path : session.path;

  const diagonal = pathSelected ? '/' : '';

  const url = sf ? `${sharedfile.path}${diagonal}${name}` : `${session.path}${diagonal}${name}`;
  const urlComplete = sf
    ? `${apiUrl}/shared-file/content/${id}/${sharedfile.path}${diagonal}${name}`
    : `${apiUrl}/files/list/${session.path}${diagonal}${name}?t=${session.access_token}`;

  const onClickFolder = () => {
    if (sf) {
      setPathSF(url);
    } else {
      setPathSession(url);
    }
  };

  if (type === 'file') {
    return (
      <FileInfo file={{ name, size, tokens, type, mime_type, extension }} url={url} urlComplete={urlComplete} sf={sf}>
        <FileIcon
          type={type}
          mime_type={mime_type}
          url={urlComplete}
          context={sf ? 'sharedFile' : 'default'}
          arrayIndex={arrayIndex}
          fileName={name}
        />
      </FileInfo>
    );
  }

  return (
    <FileInfo file={{ name, size, tokens, type, mime_type, extension }} url={url} urlComplete={urlComplete} sf={sf}>
      <Folder click={onClickFolder} />
    </FileInfo>
  );
}
