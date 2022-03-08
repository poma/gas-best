import React, { useState } from "react";
import styled from "styled-components";
import Panel from "~/components/Panel";
import Stats from "~/components/Stats";
import Text from "~/components/Text";
import Tooltip from "~/components/Tooltip";

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

const FeeTooltip = styled(Tooltip)<{ show: boolean }>`
  position: absolute;
  top: 100%;
  left: -1px;
  margin-top: 10px;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
`;

interface FeeTooltipContentProps {
  eth: number;
  erc20: number;
  dex: number;
}

const FeeTooltipContent: React.FC<FeeTooltipContentProps> = ({
  eth,
  erc20,
  dex,
}) => (
  <React.Fragment>
    <p>{`ETH transfer: $${eth}`}</p>
    <p>{`ERC20 transfer: $${erc20}`}</p>
    <p>{`DEX trade: $${dex}`}</p>
  </React.Fragment>
);

const HoverablePanel = styled(Panel)`
  position: relative;

  &:hover {
    border-color: ${(props) => props.theme.fg.primary};
    cursor: pointer;
  }

  &:last-child ${FeeTooltip} {
    left: unset;
    right: -1px;
  }
`;

interface FeePanelProps {
  value?: number;
  label: React.ReactNode;
  hideTooltip: boolean;
}

const FeePanel: React.FC<FeePanelProps> = ({
  value,
  label,
  hideTooltip,
  ...props
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <HoverablePanel
      {...props}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <FeeStats>{value}</FeeStats>
      <FeeLabel>{label}</FeeLabel>
      <FeeTooltip
        title="Approximate tx cost"
        show={showTooltip && !hideTooltip}
      >
        <FeeTooltipContent eth={10} erc20={18} dex={67} />
      </FeeTooltip>
    </HoverablePanel>
  );
};

export default FeePanel;
