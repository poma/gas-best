import React from "react";
import styled from "styled-components";
import Panel from "~/components/Panel";
import Stats from "~/components/Stats";
import Text from "~/components/Text";

interface FeePanelProps {
  value: number;
  label: React.ReactNode;
}

const FeeStats = styled(Stats)`
  display: block;
  width: 100%;
  padding-bottom: 9px;
`;

const FeeLabel = styled(Text)`
  display: block;
  width: 100%;
  text-align: right;
  margin-bottom: -3px;
`;

const FeePanel: React.FC<FeePanelProps> = ({ value, label }) => (
  <Panel>
    <FeeStats>{value}</FeeStats>
    <FeeLabel>{label}</FeeLabel>
  </Panel>
);

export default FeePanel;
