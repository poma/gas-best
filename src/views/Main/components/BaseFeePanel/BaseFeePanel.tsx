import React from "react";
import styled from "styled-components";
import Panel from "~/components/Panel";
import Text from "~/components/Text";
import BaseFeeChart from "./components/BaseFeeChart";

const BaseFeeLabel = styled(Text)`
  display: block;
  width: 100%;
  padding-bottom: 9px;
`;

const data = {
  last: { number: 14286993, fee: 19, timestamp: 1645948693 },
  recent: [
    [1645948693, 19],
    [1645948692, 22],
    [1645948684, 23],
    [1645948674, 24],
    [1645948665, 24],
    [1645948639, 22],
    [1645948634, 22],
    [1645948630, 24],
    [1645948626, 26],
    [1645948614, 24],
    [1645948605, 23],
    [1645948600, 25],
    [1645948597, 28],
    [1645948580, 26],
    [1645948555, 23],
    [1645948539, 23],
    [1645948534, 24],
    [1645948529, 26],
    [1645948517, 23],
    [1645948478, 21],
    [1645948469, 18],
    [1645948463, 20],
    [1645948456, 21],
    [1645948455, 21],
    [1645948453, 24],
    [1645948445, 24],
    [1645948442, 25],
    [1645948439, 28],
    [1645948419, 27],
    [1645948412, 29],
    [1645948391, 29],
    [1645948371, 28],
    [1645948365, 30],
    [1645948332, 27],
    [1645948305, 25],
    [1645948274, 23],
    [1645948272, 24],
    [1645948244, 22],
    [1645948243, 25],
    [1645948241, 26],
  ],
  forecast: { "15 min": 11, "1 hour": 12, "1 day": 13 },
};

const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const localeDate = date.toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const localeTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${localeDate} ${localeTime}`;
};

const baseFeeData = data.recent.map((item) => ({
  date: formatTimestamp(item[0]),
  fee: item[1],
}));

interface BaseFeePanelProps {
  value: number;
}

const BaseFeePanel: React.FC<BaseFeePanelProps> = ({ value }) => (
  <Panel>
    <BaseFeeLabel>Base fee</BaseFeeLabel>
    <BaseFeeChart data={baseFeeData} />
  </Panel>
);

export default BaseFeePanel;
