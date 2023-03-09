import { Card, CardHeader, CardContent, Box } from '@mui/material';
import { ResponsivePie } from '@nivo/pie';
// redux
import { useSelector } from '../../../redux/store';
import Numeral from 'numeral';

export default function UsedSpacePie() {
  const { totalSpace, usedSpace } = useSelector((state) => state.stats);
  return (
    <Card>
      <CardHeader title="Espacio usado" />
      <CardContent>
        <Box sx={{ width: '100%', height: '500px' }}>
          <ResponsivePie
            data={[
              { id: 'free', label: 'Free', value: totalSpace - usedSpace, color: 'hsl(30, 1%, 50%)' },
              { id: 'used', label: 'Used', value: usedSpace, color: 'hsl(0, 100%, 46%)' }
            ]}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            valueFormat={(value) => Numeral(value).format('0.0 b')}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            defs={[
              {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 0, 0, 1)',
                size: 4,
                padding: 1,
                stagger: true
              },
              {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(150, 150, 150, 1)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
              }
            ]}
            fill={[
              {
                match: {
                  id: 'free'
                },
                id: 'lines'
              },
              {
                match: {
                  id: 'used'
                },
                id: 'dots'
              }
            ]}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#000"
            arcLinkLabelsThickness={3}
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
                itemTextColor: '#111',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#000'
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
