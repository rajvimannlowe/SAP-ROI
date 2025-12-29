import { ResponsiveBar } from '@nivo/bar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface ModuleStatusChartProps {
  data: Array<{ module: string; 'High Risk': number; 'Needs Review': number; 'Comfortable': number }>;
}

export function ModuleStatusChart({ data }: ModuleStatusChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status Distribution by Module</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: '400px' }}>
          <ResponsiveBar
            data={data}
            keys={['High Risk', 'Needs Review', 'Comfortable']}
            indexBy="module"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={['#ef4444', '#f59e0b', '#10b981']}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Module',
              legendPosition: 'middle',
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Number of Items',
              legendPosition: 'middle',
              legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
              },
            ]}
            role="application"
            ariaLabel="Status Distribution by Module chart"
            barAriaLabel={(e) => `${e.id}: ${e.formattedValue} items`}
          />
        </div>
      </CardContent>
    </Card>
  );
}

