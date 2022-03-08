import React from "react";
import styled from "styled-components";
import Panel from "~/components/Panel";
import Stats from "~/components/Stats";
import Text from "~/components/Text";

interface LastBlockPanelProps {
  value?: number;
  timeSinceLastBlock?: string;
}

const LastBlockLabel = styled(Text)`
  display: block;
  width: 100%;
  padding-bottom: 9px;

  & em {
    font-style: normal;
    color: ${(props) => props.theme.fg.secondary};
  }
`;

const LastBlockStats = styled(Stats)`
  display: block;
  width: 100%;
  margin-bottom: -3px;
`;

const LastBlockPanel: React.FC<LastBlockPanelProps> = ({
  value,
  timeSinceLastBlock,
}) => (
  <Panel>
    <LastBlockLabel>
      Last block mined <em>{timeSinceLastBlock}s</em> ago
    </LastBlockLabel>
    <LastBlockStats>{value}</LastBlockStats>
  </Panel>
);

export default LastBlockPanel;
