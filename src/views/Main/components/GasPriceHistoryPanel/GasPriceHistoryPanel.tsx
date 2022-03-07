import React, { useState } from "react";
import styled from "styled-components";
import Panel from "~/components/Panel";
import Text from "~/components/Text";
import formatDateTime from "~/utils/formatDateTime";
import GasPriceHistoryChart, {
  ChartDataEntry,
} from "./components/GasPriceHistoryChart";

type Duration = "1d" | "1w" | "1m";

const data = {
  start: 1645921200,
  tick: 600000,
  min: [36, 24, 21, 18, 19],
  avg: [42, 35, 27, 24, 24],
};

const historyData: ChartDataEntry[] = data.min.map((_, index) => ({
  date: formatDateTime(data.start + data.tick * index),
  min: data.min[index],
  avg: data.avg[index],
}));

interface GasPriceHistoryPanelProps {
  value: number;
}

const GasPriceHistoryLabel = styled(Text)`
  display: block;
  width: 100%;
`;

const Header = styled.header`
  display: flex;
  padding-bottom: 16px;
  align-items: center;
`;
const DurationToolbar = styled.nav`
  flex: 1 0 auto;
`;
const DurationButton = styled.button<{ selected: boolean }>`
  padding: 4px 8px;
  margin: 0;
  margin-left: 8px;
  font-size: 8px;
  font-weight: 600;
  color: ${(props) =>
    props.selected ? props.theme.bg.secondary : props.theme.fg.primary};
  background: ${(props) =>
    props.selected ? props.theme.accent.primary : props.theme.bg.secondary};
  vertical-align: middle;
  border: none;
  border-radius: 24px;
  cursor: pointer;
`;

const GasPriceHistoryPanel: React.FC<GasPriceHistoryPanelProps> = ({
  value,
}) => {
  const [duration, setDuration] = useState<Duration>("1d");
  return (
    <Panel>
      <Header>
        <GasPriceHistoryLabel>Gas price history</GasPriceHistoryLabel>
        <DurationToolbar>
          <DurationButton
            selected={duration === "1d"}
            onClick={() => setDuration("1d")}
          >
            1D
          </DurationButton>
          <DurationButton
            selected={duration === "1w"}
            onClick={() => setDuration("1w")}
          >
            1W
          </DurationButton>
          <DurationButton
            selected={duration === "1m"}
            onClick={() => setDuration("1m")}
          >
            1M
          </DurationButton>
        </DurationToolbar>
      </Header>
      <GasPriceHistoryChart data={historyData} />
    </Panel>
  );
};

export default GasPriceHistoryPanel;
