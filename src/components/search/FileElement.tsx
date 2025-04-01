/*
 * k-cloud-frontend
 * Copyright(c)  Kintaro Ponce
 * MIT Licensed
 */

import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../config';
import { IndexElement } from '../../@types/files';
import { Card, CardHeader, CardContent, Box, Typography, Tooltip, IconButton, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { TokensMenu } from '../files/tokens';
import { DownloadButton, FileIcon } from '../atoms';
import { t } from 'i18next';
// icons
import { Icon } from '@iconify/react';
import gotoLocaltion from '@iconify/icons-material-symbols/arrow-right-alt-rounded';
// redux
import { useSelector } from '../../redux/store';
import { setPath } from '../../redux/slices/session';
import { bytesFormat } from '../../utils/files';

export default function FileElement({ info }: { info: IndexElement }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const cardHeaderRef = useRef<HTMLDivElement>(null);
  const fileNameContainer = useRef<HTMLDivElement>(null);
  const resizeObserver = useRef<ResizeObserver | null>(null);
  const { access_token } = useSelector((state) => state.session);
  const { name, path, size, mime_type, type } = info;

  const urlfile = `${apiUrl}/files/list/${path}?t=${access_token}`;
  const urlZipDowload = `${apiUrl}/files/zip/${path}?t=${access_token}`;

  useEffect(() => {
    resizeObserver.current = new ResizeObserver((entries) => {
      if (!cardHeaderRef.current || !fileNameContainer.current) return;
      fileNameContainer.current.style.setProperty('width', `${entries[0].contentRect.width - 71}px`);
    });

    resizeObserver.current.observe(cardHeaderRef.current as Element);
    return () => {
      resizeObserver.current?.disconnect();
    };
  }, []);

  const onGoToLocation = () => {
    navigate('/files');
    const pathF = path.split('/').slice(0, -1).join('/');
    setPath(pathF);
  };

  const onClickFolder = () => {
    setPath(path);
    navigate('/files');
  };

  return (
    <Card>
      <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <FileIcon url={urlfile} mime_type={mime_type} type={type} context="tokenView" onClickFolder={onClickFolder} />
      </CardContent>
      <CardHeader
        ref={cardHeaderRef}
        title={
          <Tooltip title={<Typography variant="body2">{name}</Typography>}>
            <Box ref={fileNameContainer}>
              <Box
                sx={{
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  fontSize: '1.6ex',
                  width: '100%',
                  overflow: 'hidden'
                }}
              >
                {name}
              </Box>
            </Box>
          </Tooltip>
        }
        subheader={<Box>{bytesFormat(size)}</Box>}
        action={
          <Stack direction="row">
            <TokensMenu url={path} variantBtn='icon' />
            <Tooltip title={t('pages.search.tooltip_go_location')}>
              <IconButton onClick={onGoToLocation}>
                <Icon icon={gotoLocaltion} width="30px" height="30px" color={theme.palette.text.primary} />
              </IconButton>
            </Tooltip>
            <DownloadButton
              url={type === 'folder' ? urlZipDowload : `${apiUrl}/files/list/${path}?d=1&t=${access_token}`}
              name={name}
              variant={type === 'folder' ? 'zip' : 'normal'}
            />
          </Stack>
        }
      />
    </Card>
  );
}
