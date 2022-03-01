import React from "react";
import styled from "styled-components";
import Panel from "~/components/Panel";
import Text from "~/components/Text";

interface BaseFeePanelProps {
  value: number;
}

const BaseFeeLabel = styled(Text)`
  display: block;
  width: 100%;
  padding-bottom: 9px;
`;

const BaseFeePanel: React.FC<BaseFeePanelProps> = ({ value }) => (
  <Panel>
    <BaseFeeLabel>Base fee</BaseFeeLabel>
    Chart
  </Panel>
);

export default BaseFeePanel;
