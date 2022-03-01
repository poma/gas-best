import React from "react";
import styled from "styled-components";
import Panel from "~/components/Panel";
import Text from "~/components/Text";

interface GasPriceHistoryPanelProps {
  value: number;
}

const GasPriceHistoryLabel = styled(Text)`
  display: block;
  width: 100%;
  padding-bottom: 9px;
`;

const Header = styled.header``;
const ChartSelect = styled.nav``;

const GasPriceHistoryPanel: React.FC<GasPriceHistoryPanelProps> = ({
  value,
}) => (
  <Panel>
    <Header>
      <GasPriceHistoryLabel>Gas price history</GasPriceHistoryLabel>
      <ChartSelect></ChartSelect>
    </Header>
    Chart
  </Panel>
);

export default GasPriceHistoryPanel;
