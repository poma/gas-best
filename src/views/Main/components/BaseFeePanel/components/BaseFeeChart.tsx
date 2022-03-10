import { useCallback, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import { useTheme } from "styled-components";
import { ChartTooltip } from "~/components/ChartTooltip";

export interface ChartDataEntry {
  date: string;
  fee: number;
}

interface BaseFeeChartProps {
  data: ChartDataEntry[];
}

const BaseFeeChart: React.FC<BaseFeeChartProps> = ({ data }) => {
  const theme = useTheme();
  const [selectedCell, setSelectedCell] = useState(-1);
  const [previousCell, setPreviousCell] = useState(-1);
  const [animationDisabled, setAnimationDisabled] = useState(false);

  const updateSelectedCell = useCallback(
    (index: number) => {
      if (index !== selectedCell) {
        setPreviousCell(selectedCell);
        setSelectedCell(index);
      }
    },
    [selectedCell, previousCell]
  );

  return (
    <ResponsiveContainer width="100%" height={26}>
      <BarChart
        width={150}
        height={40}
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
          onAnimationEnd={() => setAnimationDisabled(true)}
          animationDuration={animationDisabled ? 1 : 600}
        >
          {data.map((_entry, index) => (
            <Cell
              key={`cell-${index}`}
              strokeLinecap="round"
              fill={
                selectedCell < 0 || selectedCell === index
                  ? theme.accent.primary
                  : theme.bg.tertiary
              }
              style={{
                transition:
                  selectedCell < 0 || previousCell < 0
                    ? "fill 200ms ease"
                    : "none",
              }}
            />
          ))}
        </Bar>
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
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BaseFeeChart;
