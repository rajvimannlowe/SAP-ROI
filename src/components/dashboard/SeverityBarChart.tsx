import { ResponsiveBar } from '@nivo/bar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface SeverityBarChartProps {
  data: Array<{ severity: string; value: number }>;
}

export function SeverityBarChart({ data }: SeverityBarChartProps) {
  const getColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return '#ef4444';
      case 'High':
        return '#f59e0b';
      case 'Medium':
        return '#3b82f6';
      case 'Low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>DD Items by Severity</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: '300px' }}>
          <ResponsiveBar
            data={data}
            keys={['value']}
            indexBy="severity"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={(bar) => getColor(bar.data.severity as string)}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Severity',
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
            ariaLabel="DD Items by Severity chart"
            barAriaLabel={(e) => `${e.id}: ${e.formattedValue} items`}
          />
        </div>
      </CardContent>
    </Card>
  );
}

