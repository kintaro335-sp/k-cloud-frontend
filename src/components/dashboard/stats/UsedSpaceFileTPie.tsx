import { useTheme } from '@mui/material/styles';
import { Card, CardHeader, CardContent, Box } from '@mui/material';
import { ResponsivePie } from '@nivo/pie';
// redux
import { useSelector } from '../../../redux/store';
import { bytesFormat } from '../../../utils/files';

export default function UsedSpacePie() {
  const { totalSpace, usedSpace, spaceUsedFiles } = useSelector((state) => state.stats);
  const theme = useTheme();
  return (
    <Card>
      <CardHeader title="Espacio usado por Tipo de Archivo" />
      <CardContent>
        <Box sx={{ width: '100%', height: '500px' }}>
          <ResponsivePie
            data={[
              { id: 'free', label: 'Free', value: totalSpace - usedSpace, color: 'hsl(30, 1%, 50%)' },
              ...spaceUsedFiles.map((u) => ({ id: u.type, label: u.type, value: u.used }))
            ]}
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
      </CardContent>
    </Card>
  );
}
