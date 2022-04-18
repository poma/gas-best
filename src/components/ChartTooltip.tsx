import { ReactNode } from "react";
import type {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import styled from "styled-components";
import Tooltip from "./Tooltip";

type ChartTooltipPayload = Payload<ValueType, NameType>;

interface ChartTooltipProps {
  active?: boolean;
  payload?: ChartTooltipPayload[];
  title?: ReactNode;
  titleFormatter?: (payload: ChartTooltipPayload["payload"]) => ReactNode;
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
        {payload.map((item) => {
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
