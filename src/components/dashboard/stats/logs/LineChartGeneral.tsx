import { Card, CardHeader, CardContent } from '@mui/material';
import LineChartPrefab from './LineChartPrefab';
import { StatsLineChart } from '../../../../@types/stats';
import { DatumValue } from '@nivo/line';
import { getMaxNumber } from '../../../../utils/stats';

interface LineChartGenralProps {
  title: string;
  data: StatsLineChart;
  yFormat?: (val: DatumValue) => string;
}

export default function LineChartGenral({ title, data, yFormat }: LineChartGenralProps) {

  const maxY = getMaxNumber(data, 10, 20)

  return ( 
    <Card>
      <CardHeader title={title} />
      <CardContent sx={{ height: '500px' }}>
        <LineChartPrefab data={data} yFormat={yFormat} maxY={maxY} />
      </CardContent>
    </Card>
  );
}
