import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ResponsivePie } from '@nivo/pie';
import { bytesFormat } from '../../../utils/files';
interface SpaceAsignedProps {
  dedicatedSpace: number;
  usedSpace: number;
}

export default function SpaceAsigned({ dedicatedSpace, usedSpace }: SpaceAsignedProps) {
  const theme = useTheme();

  const calculateSpace = () => {
    if (usedSpace < dedicatedSpace) {
      return [
        {
          id: 'used',
          label: 'Used',
          value: usedSpace,
          color: 'hsl(0, 100%, 46%)'
        },
        {
          id: 'free',
          label: 'Free',
          value: dedicatedSpace - usedSpace,
          color: 'hsl(30, 1%, 50%)'
        }
      ];
    } else {
      return [
        {
          id: 'missing',
          label: 'Missing',
          value: usedSpace - dedicatedSpace,
          color: 'hsl(0, 100%, 46%)'
        },
        {
          id: 'dedicated',
          label: 'Dedicated',
          value: dedicatedSpace,
          color: 'hsl(30, 1%, 50%)'
        }
      ];
    }
  };

  const data = calculateSpace();

  return (
    <Box sx={{ width: '100%', height: '350px' }}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        valueFormat={(value) => bytesFormat(value)}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        tooltip={(props) => (
          <Box sx={{ backgroundColor: theme.palette.background.default, borderRadius: '5px', padding: '0.4ex' }}>
            {props.datum.label}: {bytesFormat(props.datum.value)}
          </Box>
        )}
        arcLinkLabel={(e) => `${e.label} ${bytesFormat(e.value)}`}
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
  );
}
