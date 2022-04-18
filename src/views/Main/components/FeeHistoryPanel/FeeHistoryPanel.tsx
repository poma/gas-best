import React from "react";
import { useLocalStorage } from "react-use";
import styled from "styled-components";
import Panel from "~/components/Panel";
import Text from "~/components/Text";
import useFeeHistory from "~/hooks/useFeeHistory";
import { ChartDuration } from "~/types";
import FeeHistoryChart from "./components/FeeHistoryChart";

const StyledPanel = styled(Panel)`
  padding-bottom: 8px;
`;

const FeeHistoryLabel = styled(Text)`
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
  background: ${(props) => {
    if (props.disabled && props.selected) {
      return props.theme.fg.primary;
    }

    return props.selected
      ? props.theme.accent.primary
      : props.theme.bg.secondary;
  }};
  vertical-align: middle;
  border: none;
  border-radius: 24px;
  cursor: pointer;
`;

const FeeHistoryPanel: React.FC = () => {
  const [duration, setDuration] = useLocalStorage<ChartDuration>(
    "history-chart-duration",
    "1d"
  );

  const { data, error: _ } = useFeeHistory(duration ?? "1d");

  return (
    <StyledPanel>
      <Header>
        <FeeHistoryLabel>Gas price history</FeeHistoryLabel>
        <DurationToolbar>
          <DurationButton
            selected={duration === "1d"}
            onClick={() => setDuration("1d")}
            disabled={!data}
          >
            1D
          </DurationButton>
          <DurationButton
            selected={duration === "1w"}
            onClick={() => setDuration("1w")}
            disabled={!data}
          >
            1W
          </DurationButton>
          <DurationButton
            selected={duration === "1m"}
            onClick={() => setDuration("1m")}
            disabled={!data}
          >
            1M
          </DurationButton>
        </DurationToolbar>
      </Header>
      <FeeHistoryChart history={data} />
    </StyledPanel>
  );
};

export default FeeHistoryPanel;
