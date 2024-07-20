import { useEffect, useState, useMemo, useRef } from 'react';
import { Box, Grid, Stack, Card, CardContent, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Loading from '../../pages/Loading';
import FileElement from './FileElement';
// redux
import { useSelector } from '../../redux/store';
// types
import { FileI } from '../../@types/files';

interface FilesListProps {
  loading: boolean;
}

export default function FilesList({ loading }: FilesListProps) {
  const theme = useTheme();
  const { files, path } = useSelector((state) => state.session);
  const scrollElement = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const scrollLimit = isMobile ? 0.978 : 0.945;
  const [start, setStart] = useState<number>(0);
  const [showQ, setShowQ] = useState<number>(48);
  const handleShowMore = () => {
    if (files.length < showQ) return;
    if (showQ >= 96) {
      setShowQ(96);
      return;
    }
    setShowQ((prev) => prev + 8);
  };

  const handleChangeStart = (direction: 'back' | 'go') => {
    if (direction === 'back') {
      if (start === 0) return;
      setStart((st) => {
        const scrollHeight = scrollElement.current?.scrollHeight as number;
        const multiplier = isMobile ? 0.975 : 0.93;
        scrollElement.current?.scroll({ top: scrollHeight * multiplier });
        const newVal = st - 96;
        if (newVal < 0) {
          return 0;
        }
        return newVal;
      });
    }
    if (direction === 'go' && showQ >= 96) {
      setStart((st) => {
        const scrollHeight = scrollElement.current?.scrollHeight as number;
        scrollElement.current?.scroll({ top: scrollHeight * 0.001 });
        const newVal = st + 96;
        if (newVal > files.length - 96) {
          return files.length - 96;
        }
        return newVal;
      });
    }
  };

  useEffect(() => {
    setShowQ(48);
    setStart(0);
  }, [path]);

  const filesMemo = useMemo(() => files, [files]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box
          sx={{ width: '100%', height: '68%', marginTop: '1ex', overflowY: 'scroll' }}
          ref={scrollElement}
          onScroll={(e) => {
            const { scrollTop, scrollHeight } = e.currentTarget;
            const scrollH = scrollTop / scrollHeight;
            if (scrollH === 0) {
              handleChangeStart('back');
            }
            if (scrollH >= 0.7) {
              handleShowMore();
            }
            if (scrollH >= scrollLimit) {
              handleChangeStart('go');
            }
          }}
        >
          <Grid container spacing={2}>
            {filesMemo.slice(start, start + showQ).map((file: FileI, i) => (
              <Grid item key={file.name + i} xs={12} md={4} lg={3}>
                <FileElement file={file} arrayIndex={start + i} />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Box sx={{ padding: isMobile ? '200px' : '100px' }} />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}
