import { useState } from "react";
import styled from "styled-components";
import Info from "~/components/Info";
import useFeeNotification from "~/hooks/useFeeNotification";
import useFeeStats from "~/hooks/useFeeStats";
import BaseFeePanel from "./components/BaseFeePanel";
import FeePanel from "./components/FeePanel";
import FeeHistoryPanel from "./components/FeeHistoryPanel";
import LastBlockPanel from "./components/LastBlockPanel";
import { useFeeInPageTitle } from "~/hooks/useFeeInPageTitle";

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
  const { data: feeStats, error: _feeStatsError } = useFeeStats();
  const [hidePanelTooltips, setHidePanelTooltips] = useState(false);

  useFeeNotification(feeStats?.pending.fee);
  useFeeInPageTitle(feeStats?.pending.fee);

  return (
    <Body>
      <Top>
        <FeePanel
          value={feeStats?.pending.fee}
          ethPrice={feeStats?.ethPrice}
          label={
            <span>
              {"Base fee "}
              <Info
                onShowTooltip={() => setHidePanelTooltips(true)}
                onHideTooltip={() => setHidePanelTooltips(false)}
              >
                <p>
                  Base fee of the <em>pending</em> block.
                </p>
                <p>
                  You are never charged more than the current block base fee, so
                  it's safe to set your fee to 2*BaseFee for instant
                  confirmation time
                </p>
              </Info>
            </span>
          }
          hideTooltip={hidePanelTooltips}
        />
        <FeePanel
          value={feeStats?.forecast["5 min"]}
          ethPrice={feeStats?.ethPrice}
          label="<5 min"
          hideTooltip={hidePanelTooltips}
        />
        <FeePanel
          value={feeStats?.forecast["1 hour"]}
          ethPrice={feeStats?.ethPrice}
          label="<1 hour"
          hideTooltip={hidePanelTooltips}
        />
        <FeePanel
          value={feeStats?.forecast["1 day"]}
          ethPrice={feeStats?.ethPrice}
          label="<1 day"
          hideTooltip={hidePanelTooltips}
        />
      </Top>
      <Middle>
        <LastBlockPanel
          lastBlockNumber={feeStats?.last.number}
          lastBlockTime={feeStats?.last.timestamp}
        />
        <BaseFeePanel data={feeStats?.recent} />
      </Middle>
      <Bottom>
        <FeeHistoryPanel />
      </Bottom>
    </Body>
  );
}

export default Main;
