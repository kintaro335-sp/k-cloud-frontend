import React, { useState, useCallback } from 'react';
import { Card, CardContent, Tabs, Tab, CircularProgress, Box, Stack } from '@mui/material';
import FileList from '../files/upload/FileList';
import { Tree } from '../files/tree';
import { Icon } from '@iconify/react';
import fileI from '@iconify/icons-carbon/tree-view';
import fileUI from '@iconify/icons-material-symbols/upload-file';
import { BLOB_SIZE } from '../../utils/files';
// redux
import { useSelector } from '../../redux/store';

function a11yProps(index: number) {
  return {
    id: `${index}`,
    'aria-controls': `${index}`
  };
}

export default function LateralMenu() {
  const { filesDir, files } = useSelector((state) => state.files);
  const [tab, setTab] = useState(0);

  const averageProgressF = useCallback(() => {
    if (filesDir.length !== 0) {
      let total = 0;
      let progress = 0;
      filesDir.forEach((dir) => {
        const fileT = files[dir];
        if (fileT === null || fileT === undefined) return;
        progress += fileT.sended + Math.floor(BLOB_SIZE * fileT.blobProgress);
        total += fileT.size;
      });
      const totalAvg = progress / total;
      const totalAvgD = totalAvg === Infinity ? 0 : totalAvg;
      return totalAvgD * 100;
    }
    return 100;
  }, [filesDir, files]);
  const averageProgress = averageProgressF();
  const tabs = [
    { title: <Icon icon={fileI} width={30} height={30} />, component: <Tree key="tree" /> },
    {
      title: (
        <Stack direction="row" spacing={1}>
          <Box>
            <Icon icon={fileUI} width={30} height={30} /> {filesDir.length !== 0 && filesDir.length}
          </Box>
          {filesDir.length !== 0 && <CircularProgress variant="determinate" value={averageProgress} />}
        </Stack>
      ),
      component: <FileList key="filelist" />
    }
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Card sx={{ height: '100%' }}>
      <Tabs value={tab} onChange={handleChange} sx={{ width: '100%' }} variant="fullWidth">
        {tabs.map((tab, i) => (
          <Tab key={`${tab.title}-${i}`} label={tab.title} {...a11yProps(i)} tabIndex={i} />
        ))}
      </Tabs>
      <CardContent sx={{ height: '100%', marginBottom: '3em', overflowY: 'scroll', overflowX: 'scroll' }}>
        {tabs.map((tabE, i) => {
          if (tab === i) {
            return tabE.component;
          }
        })}
      </CardContent>
    </Card>
  );
}
