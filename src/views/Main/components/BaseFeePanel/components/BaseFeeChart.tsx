import { useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip as ChartTooltip,
} from "recharts";
import styled, { useTheme } from "styled-components";
import Tooltip from "~/components/Tooltip";

const CustomTooltip = styled(Tooltip)<{ show: boolean }>`
  position: relative;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  p:before {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    margin-right: 4px;
    margin-bottom: 1px;
    background: ${(props) => props.theme.accent.primary};
    border-radius: 50%;
  }
`;

interface TooltipProps {
  active?: boolean;
  payload?: any;
}

const renderTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    const value = payload[0].payload.fee;
    const date = payload[0].payload.date;
    return (
      <CustomTooltip title={date} show>
        <p>{`Base fee: ${value}`}</p>
      </CustomTooltip>
    );
  }

  return null;
};

interface ChartDataEntry {
  date: string;
  fee: number;
}

interface BaseFeeChartProps {
  data: ChartDataEntry[];
}

const BaseFeeChart: React.FC<BaseFeeChartProps> = ({ data }) => {
  const theme = useTheme();
  const [selectedCell, setSelectedCell] = useState(-1);
  return (
    <ResponsiveContainer width="100%" height={26}>
      <BarChart
        width={150}
        height={40}
        data={data}
        onMouseMove={(data, _event) => {
          if (data?.activeTooltipIndex !== undefined) {
            setSelectedCell(data.activeTooltipIndex);
          } else {
            setSelectedCell(-1);
          }
        }}
        onMouseLeave={() => setSelectedCell(-1)}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <Bar dataKey="fee" fill={theme.accent.primary}>
          {data.map((_entry, index) => (
            <Cell
              key={`cell-${index}`}
              strokeLinecap="round"
              fill={
                selectedCell < 0 || selectedCell === index
                  ? theme.accent.primary
                  : theme.bg.tertiary
              }
              onMouseEnter={() => setSelectedCell(index)}
            />
          ))}
        </Bar>
        <ChartTooltip
          cursor={false}
          allowEscapeViewBox={{ y: true }}
          content={renderTooltip}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BaseFeeChart;
