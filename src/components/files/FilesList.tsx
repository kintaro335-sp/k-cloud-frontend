/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { useEffect, useMemo, useRef, useCallback } from 'react';
import { Box, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Loading from '../../pages/Loading';
import FileElement from './FileElement';
// redux
import { useSelector } from '../../redux/store';
import { setStart, setShowQ } from '../../redux/slices/session';
// types
import { FileI } from '../../@types/files';

interface FilesListProps {
  loading: boolean;
}

export default function FilesList({ loading }: FilesListProps) {
  const theme = useTheme();
  const { files, path, start, showQ } = useSelector((state) => state.session);
  const scrollElement = useRef<HTMLDivElement>(null);
  const divBottom = useRef<HTMLDivElement>(null);
  const observerBottom = useRef<IntersectionObserver | null>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const elementsPerPage = 200;

  const handleShowMore = () => {
    if (files.length < showQ) return;
    if (showQ >= elementsPerPage) {
      setShowQ(elementsPerPage);
      return;
    }
    setShowQ(showQ + 8);
  };

  const handleChangeStart = useCallback((direction: 'back' | 'go') => {
    if (direction === 'back') {
      if (start < 0) {
        setStart(0);
        return;
      }
      if (start === 0) return;
      const onSetStartBack = (st: number) => {
        const newVal = st - elementsPerPage;
        if (newVal < 0) {
          return 0;
        }
        return newVal;
      };
      setStart(onSetStartBack(start));
      const scrollHeight = scrollElement.current?.scrollHeight as number;
      const multiplier = scrollHeight < 17000 ? 0.90 : 0.957;
      scrollElement.current?.scroll({ top: scrollHeight * multiplier });
    }
    if (direction === 'go' && showQ >= elementsPerPage) {
      const onSetStartGo = (st: number) => {
        const isLastPage = st + elementsPerPage > files.length;
        const newVal = st + elementsPerPage;
        if (newVal > files.length - elementsPerPage) {
          if (!isLastPage) {
            scrollElement.current?.scroll({ top: 13 });
            return st + elementsPerPage;
          }
          return st;
        }
        scrollElement.current?.scroll({ top: 13 });
        return newVal;
      };
      setStart(onSetStartGo(start));
    }
  }, [start, showQ, files.length]);

  useEffect(() => {
    setShowQ(48);
    setStart(0);
  }, [path]);

  useEffect(() => {
    if (divBottom.current === null || scrollElement.current === undefined) return;
    if (observerBottom.current !== null) {
      observerBottom.current.disconnect();
    }
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleChangeStart('go');
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.35
      }
    );

    observer.observe(divBottom.current);
    observerBottom.current = observer;
    return () => {
      observer.disconnect();
    };
  }, [loading, handleChangeStart]);

  const filesMemo = useMemo(() => files, [files]);

  return (
    <>
      {loading ? (
        <Loading width="100%" height="77%" />
      ) : (
        <Box
          sx={{ width: '100%', height: '77%', marginTop: '1ex', overflowY: 'scroll' }}
          ref={scrollElement}
          onScroll={(e) => {
            const { scrollTop, scrollHeight } = e.currentTarget;
            const scrollH = scrollTop / scrollHeight;
            if (scrollH === 0) {
              handleChangeStart('back');
            }
            if (scrollH >= 0.8) {
              handleShowMore();
            }
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ padding: isMobile ? '5px' : '3px' }} />
            </Grid>
            {filesMemo.slice(start, start + showQ).map((file: FileI, i) => (
              <Grid item key={file.name + i} xs={12} md={4} lg={3}>
                <FileElement file={file} arrayIndex={start + i} />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Box sx={{ padding: isMobile ? '205px' : '105px' }} />
              <Box ref={divBottom} sx={{ padding: '12px' }} />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}
