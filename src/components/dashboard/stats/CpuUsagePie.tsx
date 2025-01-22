/*
 * k-cloud-frontend
 * Copyright(c) 2022 Kintaro Ponce
 * MIT Licensed
 */

import { useTheme } from '@mui/material/styles';
import { Card, CardHeader, CardContent, Box, Typography } from '@mui/material';
import { ResponsivePie } from '@nivo/pie';
import { t } from 'i18next';
import numeral from 'numeral';
// redux
import { useSelector } from '../../../redux/store';

export default function CpuUsagePie() {
  const theme = useTheme();
  const { cpuUsage } = useSelector((state) => state.stats);

  const calcUsage = () => {
    let usage = cpuUsage;
    let idle = 0;
    let overload = 0;
    idle = 1 - usage;
    overload = usage - 1;

    return [
      {
        id: 'idle',
        label: 'idle',
        value: idle*100,
        color: 'hsl(30, 1%, 50%)'
      },
      {
        id: 'usage',
        label: 'usage',
        value: usage*100,
        color: 'hsl(204, 92.50%, 46.90%)'
      },
      {
        id: 'overload',
        label: 'overload',
        value: overload*100,
        color: 'hsl(0, 90.30%, 44.50%)'
      }
    ].filter((e) => e.value > 0);
  };

  return (
    <Card>
      <CardHeader title={t('pages.admin_stats.title_cpu_usage')} />
      <CardContent>
        <Box sx={{ width: '100%', height: '500px' }}>
          <ResponsivePie
            data={calcUsage()}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            valueFormat={(value) => `${numeral(value).format('0.00')}%`}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            tooltip={(props) => (
              <Box sx={{ backgroundColor: theme.palette.background.default, borderRadius: '5px', padding: '0.4ex' }}>
                {props.datum.label}: {numeral(props.datum.value).format('0.00')}%
              </Box>
            )}
            arcLinkLabel={(e) => `${e.label} ${numeral(e.value).format('0.00')}%`}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#AAA"
            arcLinkLabelsThickness={6}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor="black"
            legends={[
              {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#EEE'
                    }
                  }
                ]
              }
            ]}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
