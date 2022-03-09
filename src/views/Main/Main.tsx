import { useEffect, useState } from "react";
import styled from "styled-components";
import Info from "~/components/Info";
import useBaseFee from "~/hooks/useBaseFee";
import useFeeStats from "~/hooks/useFeeStats";
import formatTimeDuration from "~/utils/formatTimeDuration";
import BaseFeePanel from "./components/BaseFeePanel";
import FeePanel from "./components/FeePanel";
import GasPriceHistoryPanel from "./components/GasPriceHistoryPanel";
import LastBlockPanel from "./components/LastBlockPanel";

const Body = styled.main`
  display: grid;
  gap: 16px;
`;

const Top = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;

const Middle = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const Bottom = styled.div``;

function Main() {
  const { data: baseFee, error: baseFeeError } = useBaseFee();
  const { data: feeStats, error: feeStatsError } = useFeeStats();
  const [hidePanelTooltips, setHidePanelTooltips] = useState(false);
  return (
    <Body>
      <Top>
        <FeePanel
          value={baseFee}
          label={
            <span>
              {"Base fee "}
              <Info
                onShowTooltip={() => setHidePanelTooltips(true)}
                onHideTooltip={() => setHidePanelTooltips(false)}
              >
                <p>Static tooltip</p>
              </Info>
            </span>
          }
          hideTooltip={hidePanelTooltips}
        />
        <FeePanel
          value={feeStats?.forecast["15 min"]}
          label="<15 min"
          hideTooltip={hidePanelTooltips}
        />
        <FeePanel
          value={feeStats?.forecast["1 hour"]}
          label="<1 hour"
          hideTooltip={hidePanelTooltips}
        />
        <FeePanel
          value={feeStats?.forecast["1 day"]}
          label="<1 day"
          hideTooltip={hidePanelTooltips}
        />
      </Top>
      <Middle>
        <LastBlockPanel lastBlockNumber={feeStats?.last.number} />
        <BaseFeePanel data={feeStats?.recent} />
      </Middle>
      <Bottom>
        <GasPriceHistoryPanel />
      </Bottom>
    </Body>
  );
}

export default Main;