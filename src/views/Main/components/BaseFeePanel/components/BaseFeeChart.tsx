import React from "react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import styled, { useTheme } from "styled-components";
import ChartLoader from "~/components/ChartLoader";
import { ChartTooltip } from "~/components/ChartTooltip";

export interface BaseFeeChartDataEntry {
  date: string;
  fee: number;
}

interface BaseFeeChartProps {
  data: BaseFeeChartDataEntry[];
}

const StyledBarChart = styled(BarChart)`
  & .chart-fill {
    transition: opacity 150ms linear;
  }
  &:hover .chart-fill {
    opacity: 0;
  }
`;

const loaderData = [
  21, 23, 19, 21, 22, 21, 21, 19, 20, 18, 20, 21, 22, 21, 22, 26, 24, 29, 29,
  32,
];

const BaseFeeChart: React.FC<BaseFeeChartProps> = ({ data }) => {
  const theme = useTheme();
  const [selectedCell, setSelectedCell] = useState(-1);
  const [animationDisabled, setAnimationDisabled] = useState(false);

  const updateSelectedCell = (index: number) => {
    if (index !== selectedCell) {
      setSelectedCell(index);
    }
  };

  return (
    <ResponsiveContainer width="100%" height={26}>
      {data.length > 0 ? (
        <StyledBarChart
          data={data}
          onMouseMove={(data, _event) => {
            if (data?.activeTooltipIndex !== undefined) {
              updateSelectedCell(data.activeTooltipIndex);
            } else {
              updateSelectedCell(-1);
            }
          }}
          onMouseLeave={() => updateSelectedCell(-1)}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
          barSize={2}
        >
          <Bar
            dataKey="fee"
            name="Base fee"
            fill={theme.accent.primary}
            radius={2}
            // HACK: remove data update animation
            onAnimationEnd={() => setAnimationDisabled(true)}
            animationDuration={animationDisabled ? 1 : 600}
            shape={(props: any) => {
              const { x, y, height, width, radius, index } = props;
              return (
                <React.Fragment>
                  <Rectangle
                    {...props}
                    fill={
                      selectedCell === index
                        ? theme.accent.primary
                        : theme.bg.tertiary
                    }
                  />
                  <Rectangle
                    x={x}
                    y={y}
                    height={height}
                    width={width}
                    radius={radius}
                    className="chart-fill"
                    fill={theme.accent.primary}
                  />
                </React.Fragment>
              );
            }}
          />
          <RechartsTooltip
            cursor={false}
            allowEscapeViewBox={{ y: true }}
            content={({ active, payload }) => (
              <ChartTooltip
                active={active}
                payload={payload}
                titleFormatter={(payload: any) => payload.date}
              />
            )}
          />
        </StyledBarChart>
      ) : (
        <ChartLoader width={160} height={26} data={loaderData} />
      )}
    </ResponsiveContainer>
  );
};

export default BaseFeeChart;
