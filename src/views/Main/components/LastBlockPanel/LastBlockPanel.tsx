import React, { useState, useEffect } from "react";
import { useInterval } from "react-use";
import styled, { css } from "styled-components";
import InlineLoader from "~/components/InlineLoader";
import Panel from "~/components/Panel";
import Stats from "~/components/Stats";
import Text from "~/components/Text";

interface LastBlockPanelProps {
  lastBlockNumber?: number;
  lastBlockTime?: number;
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
  ${(props) =>
    props.highlight &&
    css`
      color: ${props.theme.fg.danger} !important;
    `};
`;

const LastBlockStats = styled(Stats)`
  display: block;
  width: 100%;
`;

const LastBlockPanel: React.FC<LastBlockPanelProps> = ({
  lastBlockNumber,
  lastBlockTime,
}) => {
  const [lastUpdateTime, setLastUpdateTime] = useState<number>();
  const [timeSinceLastUpdate, setTimeSinceLastUpdate] = useState(NaN);
  const [lastBlockNumberInitial, setLastBlockNumberInitial] =
    useState<number>();

  useEffect(() => {
    if (!lastBlockNumberInitial && lastBlockNumber && lastBlockTime) {
      setLastBlockNumberInitial(lastBlockNumber);
      setLastUpdateTime(lastBlockTime);
    }
  }, [lastBlockNumberInitial, lastBlockNumber, lastBlockTime]);

  useInterval(() => {
    if (lastUpdateTime) {
      setTimeSinceLastUpdate(Math.floor(Date.now() / 1000 - lastUpdateTime));
    }
  }, 500);

  useEffect(() => {
    const isLocalTimer =
      lastBlockNumberInitial && lastBlockNumberInitial !== lastBlockNumber;

    if (lastBlockNumber && isLocalTimer) {
      setLastUpdateTime(Date.now() / 1000);
      setTimeSinceLastUpdate(0);
    }
  }, [lastBlockNumber, lastBlockNumberInitial]);

  return (
    <Panel>
      <LastBlockLabel>
        Last block mined{" "}
        <LastBlockTime highlight={timeSinceLastUpdate > 60}>
          {!isNaN(timeSinceLastUpdate) ? (
            `${timeSinceLastUpdate}s`
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
