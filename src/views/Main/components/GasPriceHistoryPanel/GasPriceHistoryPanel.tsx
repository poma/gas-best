import React, { useState } from "react";
import styled from "styled-components";
import Panel from "~/components/Panel";
import Text from "~/components/Text";
import useGasPriceHistory from "~/hooks/useGasPriceHistory";
import { ChartDuration } from "~/types";
import GasPriceHistoryChart from "./components/GasPriceHistoryChart";

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

const GasPriceHistoryPanel: React.FC = () => {
  const [duration, setDuration] = useState<ChartDuration>("1d");
  const { data, error } = useGasPriceHistory(duration);

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
      <GasPriceHistoryChart history={data} />
    </Panel>
  );
};

export default GasPriceHistoryPanel;
