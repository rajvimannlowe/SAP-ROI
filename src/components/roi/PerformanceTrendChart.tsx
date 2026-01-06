import { ResponsiveLine } from "@nivo/line";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LucideIcon, TrendingUp } from "lucide-react";
import {
  KPITrendConfig,
  ThresholdLine,
  TrendDataSeries,
} from "../../data/kpiTrendData";

export interface PerformanceTrendChartProps {
  title: string;
  data: TrendDataSeries[];
  thresholds: ThresholdLine[];
  yAxisConfig: {
    min: number;
    max: number;
    unit: string;
  };
  xAxisLabel: string;
  yAxisLabel: string;
  color?: string;
  icon?: LucideIcon;
  height?: number;
  className?: string;
}

export function PerformanceTrendChart({
  title,
  data,
  thresholds,
  yAxisConfig,
  xAxisLabel,
  yAxisLabel,
  color = "#10b981",
  icon: Icon = TrendingUp,
  height = 450,
  className = "",
}: PerformanceTrendChartProps) {
  // Generate grid Y values (major grid lines every 1 unit)
  const gridYValues: number[] = [];
  const step = 1;
  for (let i = Math.ceil(yAxisConfig.min); i <= Math.floor(yAxisConfig.max); i += step) {
    gridYValues.push(i);
  }

  return (
    <Card className={`border-border/50 shadow-lg ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Icon className="h-5 w-5" style={{ color }} />
          {title}
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
          />
          Unit: {yAxisConfig.unit}
        </p>
      </CardHeader>
      <CardContent>
        <div style={{ height: `${height}px` }}>
          <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 110, bottom: 60, left: 70 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: yAxisConfig.min,
              max: yAxisConfig.max,
            }}
            curve="monotoneX"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 8,
              tickRotation: 0,
              legend: xAxisLabel,
              legendPosition: "middle",
              legendOffset: 40,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 8,
              tickRotation: 0,
              legend: yAxisLabel,
              legendPosition: "middle",
              legendOffset: -55,
            }}
            pointSize={12}
            pointColor="#fff"
            pointBorderWidth={3}
            pointBorderColor={color}
            pointLabelYOffset={-12}
            enableArea={true}
            areaBaselineValue={yAxisConfig.min}
            areaOpacity={0.15}
            colors={[color]}
            lineWidth={4}
            enableGridX={false}
            enableGridY={true}
            gridYValues={gridYValues}
            markers={thresholds.map((threshold) => ({
              axis: "y",
              value: threshold.value,
              lineStyle: {
                stroke: threshold.color,
                strokeWidth: 2,
                ...threshold.style,
              },
              legend: threshold.label,
              legendPosition: "right",
              textStyle: {
                fill: threshold.color,
                fontSize: 11,
                fontWeight: 600,
              },
            }))}
            legends={[]}
            useMesh={true}
            tooltip={({ point }) => (
              <div
                style={{
                  background: "white",
                  padding: "12px 16px",
                  border: `2px solid ${color}`,
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <strong className="text-sm">{point.data.x}</strong>
                </div>
                <div className="text-sm font-bold" style={{ color }}>
                  {point.data.y}%
                </div>
              </div>
            )}
            theme={{
              text: {
                fill: "hsl(var(--muted-foreground))",
                fontSize: 12,
                fontWeight: 500,
              },
              grid: {
                line: {
                  stroke: "hsl(var(--border))",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                },
              },
              axis: {
                domain: {
                  line: {
                    stroke: "hsl(var(--border))",
                    strokeWidth: 2,
                  },
                },
                ticks: {
                  line: {
                    stroke: "hsl(var(--border))",
                    strokeWidth: 1,
                  },
                  text: {
                    fill: "hsl(var(--muted-foreground))",
                    fontSize: 11,
                  },
                },
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

