import React from "react";
import styled from "styled-components";
import Panel from "~/components/Panel";
import Text from "~/components/Text";
import { FeeStatsRecent } from "~/types";
import formatDateTime from "~/utils/formatDateTime";
import BaseFeeChart, { ChartDataEntry } from "./components/BaseFeeChart";

interface BaseFeePanelProps {
  data?: FeeStatsRecent;
}

const BaseFeeLabel = styled(Text)`
  display: block;
  width: 100%;
  padding-bottom: 9px;
`;

const formatBaseFeeData = (data: FeeStatsRecent): ChartDataEntry[] =>
  data
    .map((item) => ({
      date: formatDateTime(item[0]),
      fee: item[1],
    }))
    .reverse();

const BaseFeePanel: React.FC<BaseFeePanelProps> = ({ data }) => {
  return (
    <Panel>
      <BaseFeeLabel>Base fee</BaseFeeLabel>
      {data && <BaseFeeChart data={formatBaseFeeData(data)} />}
    </Panel>
  );
};

export default BaseFeePanel;
