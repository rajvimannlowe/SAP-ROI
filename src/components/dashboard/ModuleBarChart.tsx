import { ResponsiveBar } from '@nivo/bar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface ModuleBarChartProps {
  data: Array<{ module: string; value: number }>;
}

export function ModuleBarChart({ data }: ModuleBarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>DD Items by Module</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: '300px' }}>
          <ResponsiveBar
            data={data}
            keys={['value']}
            indexBy="module"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'set3' }}
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
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            role="application"
            ariaLabel="DD Items by Module chart"
            barAriaLabel={(e) => `${e.id}: ${e.formattedValue} items`}
          />
        </div>
      </CardContent>
    </Card>
  );
}

