import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import { useEffect } from "react";

export interface BarChart3DData {
  [key: string]: string | number;
}

export interface BarChart3DProps {
  data: BarChart3DData[];
  keys: string[];
  indexBy: string;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  padding?: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
  getColor?: (value: number) => string;
  showLineOverlay?: boolean;
  lineData?: Array<{ x: string; y: number }>;
  lineColor?: string;
  tooltip?: (props: any) => React.ReactNode;
}

export function BarChart3D({
  data,
  keys,
  indexBy,
  height = 400,
  margin = { top: 40, right: 100, bottom: 50, left: 60 },
  padding = 0.6,
  xAxisLabel = "Category",
  yAxisLabel = "Value",
  getColor = (value: number) => {
    if (value >= 9) return "#DC2626"; // Critical - Red
    if (value >= 7) return "#EA580C"; // High - Orange
    if (value >= 5) return "#F59E0B"; // Medium - Yellow
    return "#10b981"; // Low - Green
  },
  showLineOverlay = false,
  lineData,
  lineColor = "#10b981",
  tooltip,
}: BarChart3DProps) {
  const defaultTooltip = ({
    value,
    indexValue,
    data: barData,
  }: {
    value: number;
    indexValue: string | number;
    data: any;
  }) => {
    const barValue = value as number;
    const barColor = getColor(barValue);

    return (
      <div
        className="bg-white p-4 rounded-xl border-2 shadow-2xl min-w-[200px] z-50"
        style={{
          borderColor: barColor,
          boxShadow: `0 10px 25px rgba(0,0,0,0.15), 0 0 0 1px ${barColor}20`,
        }}
      >
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/30">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: barColor }}
          />
          <strong className="text-sm font-bold text-foreground">
            {indexValue}
          </strong>
        </div>
        <div className="space-y-2">
          <div>
            <div className="text-xs text-muted-foreground mb-1">
              Repeat Tickets
            </div>
            <div className="text-xl font-bold" style={{ color: barColor }}>
              {value} tickets
            </div>
          </div>
          {barData && typeof barData === "object" && (
            <div className="pt-2 border-t border-border/20 space-y-1.5">
              {Object.entries(barData).map(([key, val]) => {
                if (key === indexBy || keys.includes(key)) return null;
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}:
                    </span>
                    <span className="font-semibold text-foreground">
                      {String(val)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Add hover effects using CSS
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .bar-group {
        transition: transform 0.2s ease !important;
      }
      .bar-group:hover {
        transform: translate(var(--x, 0), var(--y, 0)) scale(1.08) !important;
      }
      .bar-group:hover .bar-hover-glow {
        opacity: 1 !important;
      }
      .bar-group:hover .bar-main {
        filter: brightness(1.2) drop-shadow(0 4px 8px rgba(0,0,0,0.3)) !important;
      }
      .bar-group:hover .bar-gradient {
        opacity: 0.85 !important;
      }
      .bar-group:hover .bar-highlight {
        opacity: 0.8 !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="relative" style={{ height: `${height}px` }}>
      {/* 3D Bar Chart */}
      <div className="absolute inset-0">
        <ResponsiveBar
          data={data}
          keys={keys}
          indexBy={indexBy}
          margin={margin}
          padding={padding}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={["rgba(0,0,0,0.01)"]}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 4,
            tickPadding: 6,
            tickRotation: 0,
            legend: xAxisLabel,
            legendPosition: "middle",
            legendOffset: 35,
          }}
          axisLeft={{
            tickSize: 4,
            tickPadding: 6,
            tickRotation: 0,
            legend: yAxisLabel,
            legendPosition: "middle",
            legendOffset: -50,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="#ffffff"
          borderRadius={0}
          enableLabel={false}
          animate={true}
          motionConfig="gentle"
          isInteractive={true}
          tooltip={tooltip || defaultTooltip}
          layers={[
            "grid",
            "axes",
            "bars", // Keep default bars for tooltip (they're nearly transparent)
            (props) => {
              // Custom 3D bars with proper colors
              // First, collect all defs at the root level
              const allDefs: React.ReactElement[] = [];
              const allBars: React.ReactElement[] = [];

              props.bars.forEach((bar) => {
                const value = bar.data.value as number;
                const baseColor = getColor(value);
                const barId = `bar-chart-${bar.index}-${String(bar.key).replace(
                  /\s+/g,
                  "-"
                )}`;
                const depth = 6; // 3D depth - slightly increased

                // Calculate lighter and darker shades for better 3D effect
                const lighterColor = baseColor; // Top face - brighter
                const darkerColor = baseColor; // Right face - darker

                // Add defs with enhanced gradients
                allDefs.push(
                  <linearGradient
                    key={`gradient-top-${barId}`}
                    id={`gradient-top-${barId}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      stopColor={lighterColor}
                      stopOpacity={1}
                    />
                    <stop
                      offset="50%"
                      stopColor={lighterColor}
                      stopOpacity={0.95}
                    />
                    <stop
                      offset="100%"
                      stopColor={lighterColor}
                      stopOpacity={0.85}
                    />
                  </linearGradient>,
                  <linearGradient
                    key={`gradient-right-${barId}`}
                    id={`gradient-right-${barId}`}
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor={darkerColor}
                      stopOpacity={0.65}
                    />
                    <stop
                      offset="50%"
                      stopColor={darkerColor}
                      stopOpacity={0.5}
                    />
                    <stop
                      offset="100%"
                      stopColor={darkerColor}
                      stopOpacity={0.35}
                    />
                  </linearGradient>,
                  <linearGradient
                    key={`gradient-main-${barId}`}
                    id={`gradient-main-${barId}`}
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor={baseColor} stopOpacity={1} />
                    <stop
                      offset="20%"
                      stopColor={baseColor}
                      stopOpacity={0.98}
                    />
                    <stop
                      offset="60%"
                      stopColor={baseColor}
                      stopOpacity={0.95}
                    />
                    <stop
                      offset="100%"
                      stopColor={baseColor}
                      stopOpacity={0.9}
                    />
                  </linearGradient>,
                  <radialGradient
                    key={`radial-highlight-${barId}`}
                    id={`radial-highlight-${barId}`}
                    cx="30%"
                    cy="20%"
                    r="70%"
                  >
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.5)" />
                    <stop offset="50%" stopColor="rgba(255, 255, 255, 0.2)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                  </radialGradient>,
                  <filter
                    key={`shadow-${barId}`}
                    id={`shadow-${barId}`}
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                    <feOffset dx="3" dy="4" result="offsetblur" />
                    <feComponentTransfer>
                      <feFuncA type="linear" slope="0.5" />
                    </feComponentTransfer>
                    <feMerge>
                      <feMergeNode />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>,
                  <filter
                    key={`glow-${barId}`}
                    id={`glow-${barId}`}
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                );

                // Add bar elements with enhanced 3D styling and hover effects
                allBars.push(
                  <g
                    key={barId}
                    transform={`translate(${bar.x}, ${bar.y})`}
                    style={{ cursor: "pointer", pointerEvents: "none" }}
                    className="bar-group"
                  >
                    {/* 3D Top Face - Enhanced */}
                    <rect
                      x={0}
                      y={-depth}
                      width={bar.width}
                      height={depth}
                      fill={`url(#gradient-top-${barId})`}
                      rx={8}
                      ry={8}
                    />
                    {/* 3D Right Face - Enhanced */}
                    <rect
                      x={bar.width - depth}
                      y={-depth}
                      width={depth}
                      height={bar.height + depth}
                      fill={`url(#gradient-right-${barId})`}
                      rx={0}
                    />
                    {/* Main Bar Base - Solid color */}
                    <rect
                      x={0}
                      y={0}
                      width={bar.width}
                      height={bar.height}
                      fill={baseColor}
                      rx={8}
                      ry={8}
                      className="bar-main"
                      style={{
                        transition: "all 0.2s ease",
                      }}
                    />
                    {/* Main Bar Gradient Overlay */}
                    <rect
                      x={0}
                      y={0}
                      width={bar.width}
                      height={bar.height}
                      fill={`url(#gradient-main-${barId})`}
                      rx={8}
                      ry={8}
                      className="bar-gradient"
                    />
                    {/* Radial Highlight for shine effect */}
                    <rect
                      x={0}
                      y={0}
                      width={bar.width}
                      height={bar.height}
                      fill={`url(#radial-highlight-${barId})`}
                      rx={8}
                      ry={8}
                      className="bar-highlight"
                    />
                    {/* Hover Glow Effect */}
                    <rect
                      x={-2}
                      y={-2}
                      width={bar.width + 4}
                      height={bar.height + 4}
                      fill="transparent"
                      rx={10}
                      className="bar-hover-glow"
                      style={{
                        filter: `url(#glow-${barId})`,
                        opacity: 0,
                        transition: "opacity 0.2s ease",
                      }}
                    />
                    {/* Top Edge Highlight - Enhanced */}
                    <rect
                      x={2}
                      y={0}
                      width={bar.width - 4}
                      height={4}
                      fill="rgba(255, 255, 255, 0.5)"
                      rx={2}
                    />
                    {/* Left Edge Highlight */}
                    <rect
                      x={0}
                      y={2}
                      width={3}
                      height={bar.height - 4}
                      fill="rgba(255, 255, 255, 0.3)"
                      rx={1.5}
                    />
                    {/* Shadow/Glow Effect */}
                    <rect
                      x={0}
                      y={0}
                      width={bar.width}
                      height={bar.height}
                      fill="transparent"
                      rx={8}
                      filter={`url(#shadow-${barId})`}
                    />
                    {/* Value Label - Enhanced */}
                    {bar.height > 25 && (
                      <text
                        x={bar.width / 2}
                        y={bar.height / 2}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#ffffff"
                        fontSize="13"
                        fontWeight="bold"
                        style={{
                          textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                          filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.5))",
                        }}
                      >
                        {value}
                      </text>
                    )}
                  </g>
                );
              });

              return (
                <g key="3d-bars">
                  <defs>{allDefs}</defs>
                  {allBars}
                </g>
              );
            },
            "markers",
            "legends",
          ]}
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

      {/* Line Chart Overlay - Optional */}
      {showLineOverlay && lineData && (
        <div className="absolute inset-0 pointer-events-none">
          <ResponsiveLine
            data={[
              {
                id: "line",
                data: lineData,
              },
            ]}
            margin={margin}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: 0,
              max: "auto",
              stacked: false,
            }}
            curve="monotoneX"
            axisTop={null}
            axisRight={{
              tickSize: 4,
              tickPadding: 6,
              tickRotation: 0,
              legend: "Percentage (%)",
              legendPosition: "middle",
              legendOffset: 45,
            }}
            axisBottom={null}
            axisLeft={null}
            pointSize={8}
            pointColor={lineColor}
            pointBorderWidth={2.5}
            pointBorderColor="#ffffff"
            enableArea={false}
            enableGridX={false}
            enableGridY={false}
            colors={[lineColor]}
            lineWidth={2.5}
            enablePoints={true}
            useMesh={false}
            tooltip={() => null}
            theme={{
              axis: {
                ticks: {
                  text: {
                    fill: lineColor,
                    fontSize: 10,
                    fontWeight: 600,
                  },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
