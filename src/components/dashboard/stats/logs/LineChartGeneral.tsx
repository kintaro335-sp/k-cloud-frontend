import { Card, CardHeader, CardContent } from '@mui/material';
import LineChartPrefab from './LineChartPrefab';
import { StatsLineChart } from '../../../../@types/stats';

interface LineChartGenralProps {
  title: string;
  data: StatsLineChart;
}

export default function LineChartGenral({ title, data }: LineChartGenralProps) {
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <LineChartPrefab data={data} />
      </CardContent>
    </Card>
  );
}
