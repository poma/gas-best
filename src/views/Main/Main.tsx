import React from "react";
import styled from "styled-components";
import Info from "~/components/Info";
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
  return (
    <Body>
      <Top>
        <FeePanel
          value={10}
          label={
            <span>
              Base fee <Info />
            </span>
          }
        />
        <FeePanel value={20} label="<15 min" />
        <FeePanel value={30} label="<1 hour" />
        <FeePanel value={40} label="<1 day" />
      </Top>
      <Middle>
        <LastBlockPanel value={14235400} timeSinceLastBlock={15} />
        <BaseFeePanel value={123} />
      </Middle>
      <Bottom>
        <GasPriceHistoryPanel value={123} />
      </Bottom>
    </Body>
  );
}

export default Main;
