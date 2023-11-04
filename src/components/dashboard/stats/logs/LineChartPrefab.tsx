import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { ResponsiveLine, DatumValue } from '@nivo/line';
import { StatsLineChart } from '../../../../@types/stats';

interface LineChartPrefabProps {
  data: StatsLineChart;
  yFormat?: (val: string) => string;
  maxY?: number | string;
}

export default function LineChartPrefab({ data, yFormat, maxY = 'auto' }: LineChartPrefabProps) {
  const theme = useTheme();

  return (
    <ResponsiveLine
      data={data}
      yFormat={typeof yFormat === 'function' ? (val) => yFormat(val.toString()) : undefined}
      margin={{ top: 50, bottom: 150, left: 75, right: 50 }}
      xScale={{ type: 'point' }}
      // @ts-ignore
      yScale={{ type: 'linear', max: maxY, min: 'auto', stacked: false, reverse: false }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Time',
        legendOffset: 36,
        legendPosition: 'middle'
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'count',
        legendOffset: -40,
        legendPosition: 'middle',
        format: yFormat
      }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      tooltip={(props) => (
        <Box sx={{ backgroundColor: theme.palette.background.default, borderRadius: '5px', padding: '0.4ex' }}>
          {props.point.serieId}:{' '}
          {typeof yFormat === 'function' ? yFormat(props.point.data.y.toString()) : props.point.data.y.toString()}
        </Box>
      )}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 60,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 110,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          itemTextColor: 'rgba(230, 230, 230, 1)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
    />
  );
}
