import { useEffect, useState } from "react";
import { useTimeoutFn } from "react-use";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import { useTheme } from "styled-components";
import { ChartTooltip } from "~/components/ChartTooltip";
import { GasPriceHistoryChartDataEntry } from "~/types";

interface GasPriceHistoryChartProps {
  history?: GasPriceHistoryChartDataEntry[];
}

const defaultData: GasPriceHistoryChartDataEntry[] = new Array(150).fill({
  date: "",
  min: 0,
  avg: 0,
});

const GasPriceHistoryChart: React.FC<GasPriceHistoryChartProps> = ({
  history,
}) => {
  const theme = useTheme();
  const [data, setData] = useState(defaultData);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [animationDisabled, setAnimationDisabled] = useState(true);

  useTimeoutFn(() => {
    setLoaded(true);
  }, 200);

  useEffect(() => {
    if (history && loaded) {
      setData(history);
      setDataLoaded(true);
    }
  }, [history, loaded]);

  return (
    <ResponsiveContainer width="100%" height={50}>
      <AreaChart
        width={150}
        height={40}
        data={data || defaultData}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
        style={{
          opacity: dataLoaded ? 1 : 0,
          transition: "opacity 300ms linear 100ms",
        }}
      >
        <defs>
          <linearGradient id="avgGradient" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={theme.accent.primary}
              stopOpacity={0.6}
            />
            <stop
              offset="100%"
              stopColor={theme.accent.primary}
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="minGradient" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={theme.accent.secondary}
              stopOpacity={0.6}
            />
            <stop
              offset="100%"
              stopColor={theme.accent.secondary}
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          type="linear"
          dataKey="min"
          name="Minimum"
          stackId="0"
          stroke={theme.accent.secondary}
          color={theme.accent.secondary}
          fill="url(#minGradient)"
          activeDot={{ stroke: "none", r: 2 }}
          onAnimationEnd={() => setAnimationDisabled(false)}
          animationDuration={animationDisabled ? 1 : 600}
        />
        <Area
          type="linear"
          dataKey="avg"
          name="Average"
          stackId="0"
          stroke={theme.accent.primary}
          color={theme.accent.primary}
          fill="url(#avgGradient)"
          activeDot={{ stroke: "none", r: 2 }}
          onAnimationEnd={() => setAnimationDisabled(false)}
          animationDuration={animationDisabled ? 1 : 600}
        />
        <RechartsTooltip
          cursor={false}
          content={({ active, payload }) => (
            <ChartTooltip
              active={active}
              // workaround for item order issue
              // https://github.com/recharts/recharts/issues/1241
              payload={[...(payload || [])].reverse()}
              titleFormatter={(payload: any) => payload.date}
            />
          )}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default GasPriceHistoryChart;
