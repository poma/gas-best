import React, { useState } from "react";
import styled from "styled-components";
import InlineLoader from "~/components/InlineLoader";
import Panel from "~/components/Panel";
import Stats from "~/components/Stats";
import Text from "~/components/Text";
import Tooltip from "~/components/Tooltip";

const ETH_TRANSFER_GAS = 21000;
const ERC20_TRANSFER_GAS = 50000;
const DEX_TRADE_GAS = 175000;

interface FeePanelProps {
  value?: number;
  label: React.ReactNode;
  hideTooltip: boolean;
  ethPrice?: number;
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

const FeeTooltip = styled(Tooltip)<{ show: boolean }>`
  position: absolute;
  top: 100%;
  left: -1px;
  margin-top: 10px;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  pointer-events: none;
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
    <p>{`ETH transfer: $${eth.toFixed(2)}`}</p>
    <p>{`ERC20 transfer: $${erc20.toFixed(2)}`}</p>
    <p>{`DEX trade: $${dex.toFixed(2)}`}</p>
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

const FeePanel: React.FC<FeePanelProps> = ({
  value,
  label,
  hideTooltip,
  ethPrice,
  ...props
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const txCost = (txGasUse: number): number => {
    if (value && ethPrice) {
      return (txGasUse * value * ethPrice) / 1e9;
    } else {
      return 0;
    }
  };

  return (
    <HoverablePanel
      {...props}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {<FeeStats>{value || <InlineLoader />}</FeeStats>}
      <FeeLabel>{label}</FeeLabel>
      <FeeTooltip
        title="Approximate tx cost"
        show={showTooltip && !hideTooltip}
      >
        <FeeTooltipContent
          eth={txCost(ETH_TRANSFER_GAS)}
          erc20={txCost(ERC20_TRANSFER_GAS)}
          dex={txCost(DEX_TRADE_GAS)}
        />
      </FeeTooltip>
    </HoverablePanel>
  );
};

export default FeePanel;
