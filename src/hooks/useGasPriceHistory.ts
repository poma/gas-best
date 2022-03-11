import { useEffect, useRef, useState } from "react";
import { useInterval } from "react-use";
import { fetchGasPriceHistory } from "~/services/api";
import {
  ChartDuration,
  GasPriceHistoryData,
  GasPriceHistoryChartDataEntry,
} from "~/types";
import formatDateTime from "~/utils/formatDateTime";

const UPDATE_INTERVAL = 5 * 60 * 1000;
const RETRY_INTERVAL = 3000;

const expandData = (
  data: GasPriceHistoryData
): GasPriceHistoryChartDataEntry[] =>
  data.min.map((_, index) => ({
    date: formatDateTime(data.start + data.tick * index),
    min: data.min[index],
    avg: data.avg[index],
  }));

type Cache = Record<
  ChartDuration,
  { updated: number; data: GasPriceHistoryChartDataEntry[] }
>;

function useGasPriceHistory(duration: ChartDuration) {
  const [data, setData] = useState<GasPriceHistoryChartDataEntry[]>();
  const [error, setError] = useState<Error>();
  const [timestamp, setTimestamp] = useState(Date.now());

  const cache = useRef<Cache>({
    "1d": { updated: 0, data: [] },
    "1w": { updated: 0, data: [] },
    "1m": { updated: 0, data: [] },
  });

  const interval = error ? RETRY_INTERVAL : UPDATE_INTERVAL;

  const updateCache = (data: GasPriceHistoryChartDataEntry[]) => {
    cache.current[duration].data = data;
    cache.current[duration].updated = Date.now();
    return data;
  };

  const clearError = () => setError(undefined);

  useInterval(() => setTimestamp(Date.now()), interval);

  useEffect(() => {
    if (
      !cache.current[duration].data.length ||
      Date.now() - cache.current[duration].updated > UPDATE_INTERVAL
    ) {
      fetchGasPriceHistory(duration)
        .then(expandData)
        .then(updateCache)
        .then(setData)
        .then(clearError)
        .catch(setError);
    }
  }, [duration, timestamp]);

  useEffect(() => {
    if (cache.current[duration].data.length) {
      setData(cache.current[duration].data);
    }
  }, [duration]);

  return { data, error };
}

export default useGasPriceHistory;
