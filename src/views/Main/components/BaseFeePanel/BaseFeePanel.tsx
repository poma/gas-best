import React, { useMemo } from "react";
import styled from "styled-components";
import Panel from "~/components/Panel";
import Text from "~/components/Text";
import { FeeStatsRecent } from "~/types";
import formatDateTime from "~/utils/formatDateTime";
import BaseFeeChart, { BaseFeeChartDataEntry } from "./components/BaseFeeChart";

interface BaseFeePanelProps {
  data?: FeeStatsRecent;
}

const BaseFeeLabel = styled(Text)`
  display: block;
  width: 100%;
  padding-bottom: 8px;
`;

const formatBaseFeeData = (data: FeeStatsRecent): BaseFeeChartDataEntry[] =>
  data
    .map((item) => ({
      date: formatDateTime(item[0]),
      fee: item[1],
    }))
    .reverse();

const BaseFeePanel: React.FC<BaseFeePanelProps> = ({ data }) => {
  const formattedData = useMemo(
    () => (data ? formatBaseFeeData(data) : []),
    [data]
  );

  return (
    <Panel>
      <BaseFeeLabel>Base fee</BaseFeeLabel>
      <BaseFeeChart data={formattedData} />
    </Panel>
  );
};

export default BaseFeePanel;
