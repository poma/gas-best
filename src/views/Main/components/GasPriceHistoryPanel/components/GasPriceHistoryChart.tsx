import { useEffect, useState } from "react";
import { useTimeoutFn } from "react-use";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import { useTheme } from "styled-components";
import { mix } from "polished";
import ChartLoader from "~/components/ChartLoader";
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

const loaderData = [
  18, 24, 22, 23, 19, 24, 17, 17, 20, 20, 25, 37, 56, 41, 50, 55, 40, 35, 25,
  21, 26, 29, 45, 32, 25, 40, 26, 28, 52, 46, 54, 33, 25, 23, 35, 34, 35, 38,
  21, 26, 30, 27, 29, 25, 25, 22, 29, 28, 22, 34, 34, 33, 24, 33, 37, 36, 24,
  31, 30, 24, 25, 24, 24, 26, 23, 21, 18, 18, 17, 23, 21, 22, 20,
];

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
      {history ? (
        <AreaChart
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
                stopColor={mix(0.3, theme.accent.primary, theme.bg.primary)}
              />
              <stop
                offset="100%"
                stopColor={mix(0.05, theme.accent.primary, theme.bg.primary)}
              />
            </linearGradient>
            <linearGradient id="minGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={mix(0.3, theme.accent.secondary, theme.bg.primary)}
              />
              <stop
                offset="100%"
                stopColor={mix(0.05, theme.accent.secondary, theme.bg.primary)}
              />
            </linearGradient>
          </defs>
          <Area
            type="linear"
            dataKey="avg"
            name="Average"
            stroke={theme.accent.primary}
            color={theme.accent.primary}
            fill="url(#avgGradient)"
            fillOpacity={1}
            activeDot={{ stroke: "none", r: 2 }}
            onAnimationEnd={() => setAnimationDisabled(false)}
            animationDuration={animationDisabled ? 1 : 600}
          />
          <Area
            type="linear"
            dataKey="min"
            name="Minimum"
            stroke={theme.accent.secondary}
            color={theme.accent.secondary}
            fill="url(#minGradient)"
            fillOpacity={1}
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
                payload={[...(payload || [])]}
                titleFormatter={(payload: any) => payload.date}
              />
            )}
          />
        </AreaChart>
      ) : (
        <ChartLoader width={354} height={40} data={loaderData} />
      )}
    </ResponsiveContainer>
  );
};

export default GasPriceHistoryChart;
