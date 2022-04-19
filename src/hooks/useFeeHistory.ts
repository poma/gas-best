import { useCallback, useEffect, useRef, useState } from "react";
import { useInterval } from "react-use";
import { validate } from "superstruct";
import { EXTENSION_CACHE_MAX_AGE_MS, IS_EXTENSION } from "~/config";
import { fetchFeeHistory } from "~/services/api";
import * as cache from "~/services/cache";
import { ChartDuration, FeeHistoryRaw, FeeHistory } from "~/types";
import formatDateTime from "~/utils/formatDateTime";

const UPDATE_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes
const RETRY_INTERVAL_MS = 3000; // 3 seconds
const CACHE_KEY = "fee-history-cache";

const initialState: FeeHistory | undefined = IS_EXTENSION
  ? validate(cache.get(CACHE_KEY, EXTENSION_CACHE_MAX_AGE_MS), FeeHistory)[1]
  : undefined;

const updateBrowserCache = (data: FeeHistory) => cache.set(CACHE_KEY, data);

const expandData = (data: FeeHistoryRaw): FeeHistory =>
  data.min.map((_, index) => ({
    date: formatDateTime(data.start + data.tick * index),
    min: data.min[index],
    avg: data.avg[index],
  }));

type Cache = Record<ChartDuration, { updated: number; data: FeeHistory }>;

function useFeeHistory(duration: ChartDuration) {
  const [data, setData] = useState<FeeHistory | undefined>(initialState);
  const [error, setError] = useState<Error>();
  const [timestamp, setTimestamp] = useState(Date.now());

  const cache = useRef<Cache>({
    "1d": { updated: 0, data: [] },
    "1w": { updated: 0, data: [] },
    "1m": { updated: 0, data: [] },
  });

  const interval = error ? RETRY_INTERVAL_MS : UPDATE_INTERVAL_MS;

  const updateLocalCache = useCallback(
    (data: FeeHistory) => {
      cache.current[duration].data = data;
      cache.current[duration].updated = Date.now();
      return data;
    },
    [cache, duration]
  );

  const clearError = () => setError(undefined);

  useInterval(() => setTimestamp(Date.now()), interval);

  useEffect(() => {
    if (
      !cache.current[duration].data.length ||
      Date.now() - cache.current[duration].updated > UPDATE_INTERVAL_MS
    ) {
      fetchFeeHistory(duration)
        .then(expandData)
        .then(updateLocalCache)
        .then(updateBrowserCache)
        .then(setData)
        .then(clearError)
        .catch(setError);
    }
  }, [duration, timestamp, updateLocalCache]);

  useEffect(() => {
    if (cache.current[duration].data.length) {
      setData(cache.current[duration].data);
    }
  }, [duration]);

  return { data, error };
}

export default useFeeHistory;
