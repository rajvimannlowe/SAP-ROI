import { ResponsiveBar } from '@nivo/bar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface SubModuleBarChartProps {
  data: Array<{ subModule: string; value: number }>;
}

export function SubModuleBarChart({ data }: SubModuleBarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>DD Items by Sub-Module</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: '400px' }}>
          <ResponsiveBar
            data={data}
            keys={['value']}
            indexBy="subModule"
            margin={{ top: 50, right: 130, bottom: 100, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'category10' }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -45,
              legend: 'Sub-Module',
              legendPosition: 'middle',
              legendOffset: 80,
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
            ariaLabel="DD Items by Sub-Module chart"
            barAriaLabel={(e) => `${e.id}: ${e.formattedValue} items`}
          />
        </div>
      </CardContent>
    </Card>
  );
}

