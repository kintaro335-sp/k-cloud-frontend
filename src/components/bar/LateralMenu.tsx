import React, { useState } from 'react';
import { Card, CardContent, Box, Tabs, Tab } from '@mui/material';
import FileList from '../files/upload/FileList';
import { Tree } from '../files/tree';
import { Icon } from '@iconify/react';
import fileI from '@iconify/icons-carbon/tree-view';
import fileUI from '@iconify/icons-material-symbols/upload-file';
// redux
import { useSelector } from '../../redux/store';

function a11yProps(index: number) {
  return {
    id: `${index}`,
    'aria-controls': `${index}`
  };
}

export default function LateralMenu() {
  const { filesDir } = useSelector((state) => state.files);
  const [tab, setTab] = useState(0);
  const tabs = [
    { title: <Icon icon={fileI} width={30} height={30} />, component: <Tree key="tree" /> },
    {
      title: (
        <>
          <Icon icon={fileUI} width={30} height={30} /> {filesDir.length !== 0 && filesDir.length}{' '}
        </>
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
      <CardContent>
        <Box sx={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
          {tabs.map((tabE, i) => {
            if (tab === i) {
              return tabE.component;
            }
          })}
        </Box>
      </CardContent>
    </Card>
  );
}
