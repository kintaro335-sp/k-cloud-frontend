import React, { useState } from 'react';
import { Card, CardContent, Box, Tabs, Tab } from '@mui/material';
import FileList from '../files/upload/FileList';
import { Tree } from '../files/tree';
import { Icon } from '@iconify/react';
import fileI from '@iconify/icons-carbon/tree-view';
import fileUI from '@iconify/icons-material-symbols/upload-file';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default function LateralMenu() {
  const [tab, setTab] = useState(0);
  const tabs = [
    { title: <Icon icon={fileI} width={30} height={30} />, component: <Tree /> },
    { title: <Icon icon={fileUI} width={30} height={30} />, component: <FileList /> }
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Card>
      <Tabs value={tab} onChange={handleChange} sx={{ width: '100%' }} variant="fullWidth">
        {tabs.map((tab, i) => (
          <Tab label={tab.title} {...a11yProps(i)} />
        ))}
      </Tabs>
      <CardContent>
        <Box>{tabs[tab].component}</Box>
      </CardContent>
    </Card>
  );
}
