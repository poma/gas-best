import { ReactNode } from "react";
import type { Payload } from "recharts/types/component/DefaultTooltipContent";
import styled from "styled-components";
import Tooltip from "./Tooltip";

type ChartTooltipPayload = Payload<string, number>;

interface ChartTooltipProps {
  active?: boolean;
  payload?: any;
  title?: ReactNode;
  titleFormatter?: (payload: ChartTooltipPayload) => ReactNode;
  valueFormatter?: (payload: ChartTooltipPayload) => ReactNode;
}

const ChartTooltipWrapper = styled(Tooltip)`
  position: relative;
`;

const ChartTooltipDataLine = styled.p<{ color?: string }>`
  &:before {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    margin-right: 4px;
    margin-bottom: 1px;
    background: ${(props) => props.color};
    border-radius: 50%;
  }
`;

export const ChartTooltip: React.FC<ChartTooltipProps> = ({
  active,
  payload,
  title,
  titleFormatter,
  valueFormatter,
}) => {
  if (active && payload && payload.length) {
    return (
      <ChartTooltipWrapper
        title={title || (titleFormatter && titleFormatter(payload[0].payload))}
      >
        {payload.map((item: Payload<string, number>) => {
          const { value, name, color } = item;
          const formattedValue = valueFormatter?.(item) || value;
          return (
            <ChartTooltipDataLine
              key={`${name}`}
              color={color}
            >{`${name}: ${formattedValue}`}</ChartTooltipDataLine>
          );
        })}
      </ChartTooltipWrapper>
    );
  }
  return null;
};
