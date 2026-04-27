/*
 * k-cloud-frontend
 * Copyright(c)  Kintaro Ponce
 * MIT Licensed
 */
import { useRef, useCallback, useEffect, useState } from 'react';
import { Grid, Box, useTheme, useMediaQuery } from '@mui/material';

import FileElement from './FileElement';
// redux
import { useSelector } from '../../redux/store';
import { set, values } from 'lodash';

export default function BoxResults() {
  const theme = useTheme();
  const [elementsShow, setElementsShow] = useState<number>(32);
  const { list } = useSelector((state) => state.search);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const divBottom = useRef<HTMLDivElement>(null);
  const observerBottom = useRef<IntersectionObserver | null>(null);

  const handleShowMore = useCallback(() => {
    if (list.length <= 16 || elementsShow > list.length) return
    setElementsShow((val) => val + 16);
  }, [list, elementsShow]);

  useEffect(() => {
    if (divBottom.current === null) return;
    if (observerBottom.current !== null) {
      observerBottom.current.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleShowMore();
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
  }, [handleShowMore]);

  useEffect(() => {
    setElementsShow(32);
  }, [list]);

  return (<Box sx={{ overflowY: 'scroll', maxHeight: 'calc(100vh - 200px)' }}>
    <Grid container spacing={2}>
      {list.slice(0, elementsShow).map((f, i) => (
        <Grid key={i} item xs={12} md={4} lg={3}>
          <FileElement info={f} />
        </Grid>
      ))}
      {list.length > 8 && <Grid item xs={12}>
        <Box sx={{ padding: isMobile ? '205px' : '105px' }} />
        <Box ref={divBottom} sx={{ padding: '12px' }} />
      </Grid>}
    </Grid></Box>
  );
}
