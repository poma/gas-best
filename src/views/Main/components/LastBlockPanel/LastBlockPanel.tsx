import React, { useState, useEffect } from "react";
import { useInterval } from "react-use";
import styled from "styled-components";
import InlineLoader from "~/components/InlineLoader";
import Panel from "~/components/Panel";
import Stats from "~/components/Stats";
import Text from "~/components/Text";

interface LastBlockPanelProps {
  lastBlockNumber?: number;
}

const LastBlockLabel = styled(Text)`
  display: block;
  width: 100%;
  padding-bottom: 8px;

  & em {
    font-style: normal;
    color: ${(props) => props.theme.fg.secondary};
  }
`;

const LastBlockTime = styled.em<{ highlight: boolean }>`
  color: ${(props) => (props.highlight ? "#ee241d !important" : "inherit")};
`;

const LastBlockStats = styled(Stats)`
  display: block;
  width: 100%;
`;

const LastBlockPanel: React.FC<LastBlockPanelProps> = ({ lastBlockNumber }) => {
  const [lastBlockTime, setLastBlockTime] = useState(Date.now());
  const [timeSinceLastBlock, setTimeSinceLastBlock] = useState(0);

  useInterval(() => {
    setTimeSinceLastBlock(Math.floor((Date.now() - lastBlockTime) / 1000));
  }, 500);

  useEffect(() => {
    if (lastBlockNumber) {
      setLastBlockTime(Date.now());
      setTimeSinceLastBlock(0);
    }
  }, [lastBlockNumber]);

  return (
    <Panel>
      <LastBlockLabel>
        Last block mined{" "}
        <LastBlockTime highlight={timeSinceLastBlock > 60}>
          {lastBlockNumber ? (
            `${timeSinceLastBlock}s`
          ) : (
            <InlineLoader width="2ch" />
          )}
        </LastBlockTime>{" "}
        ago
      </LastBlockLabel>
      <LastBlockStats>{lastBlockNumber || <InlineLoader />}</LastBlockStats>
    </Panel>
  );
};

export default LastBlockPanel;
