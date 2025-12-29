import { ResponsiveBar } from '@nivo/bar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface DomainBarChartProps {
  data: Array<{ domain: string; value: number }>;
}

export function DomainBarChart({ data }: DomainBarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>DD Items by Domain</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: '300px' }}>
          <ResponsiveBar
            data={data}
            keys={['value']}
            indexBy="domain"
            margin={{ top: 50, right: 130, bottom: 80, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -45,
              legend: 'Domain',
              legendPosition: 'middle',
              legendOffset: 60,
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
            ariaLabel="DD Items by Domain chart"
            barAriaLabel={(e) => `${e.id}: ${e.formattedValue} items`}
          />
        </div>
      </CardContent>
    </Card>
  );
}

