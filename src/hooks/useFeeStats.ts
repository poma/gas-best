import { useCallback, useEffect, useState } from "react";
import { useTimeoutFn } from "react-use";
import { validate } from "superstruct";
import { EXTENSION_CACHE_MAX_AGE_MS, IS_EXTENSION, REQUEST_INTERVAL_MS } from "~/config";
import { fetchFeeStats, subscribeToFeeStats } from "~/services/api";
import * as cache from "~/services/cache";
import { FeeStats } from "~/types";

const CACHE_KEY = "fee-stats-cache";

const initialState: FeeStats | undefined = IS_EXTENSION
  ? validate(cache.get(CACHE_KEY, EXTENSION_CACHE_MAX_AGE_MS), FeeStats)[1]
  : undefined;

const updateCache = (data: FeeStats) => cache.set(CACHE_KEY, data);

function useIntervalFeeStats() {
  const [data, setData] = useState<FeeStats | undefined>(initialState);
  const [error, setError] = useState<Error>();
  const [timestamp, setTimestamp] = useState(0);
  const [_, cancel, resetTimeout] = useTimeoutFn(
    () => setTimestamp(Date.now()),
    REQUEST_INTERVAL_MS
  );

  const updateData = (data: FeeStats) => {
    updateCache(data);
    setData(data);
  };

  const clearError = () => setError(undefined);

  useEffect(() => {
    fetchFeeStats()
      .then(updateData)
      .then(resetTimeout)
      .then(clearError)
      .catch((err) => {
        setError(err);
        resetTimeout();
      });
    return cancel;
  }, [timestamp, cancel, resetTimeout]);

  return { data, error };
}

function usePollFeeStats() {
  const [data, setData] = useState<FeeStats | undefined>(initialState);
  const [error, setError] = useState<Error>();

  const clearError = () => setError(undefined);

  const updateData = (data: FeeStats) => {
    updateCache(data);
    setData(data);
  };

  const fetchData = useCallback(
    () => fetchFeeStats().then(updateData).then(clearError).catch(setError),
    []
  );

  useEffect(() => {
    fetchData();
    const cancel = subscribeToFeeStats(updateData, setError, fetchData);
    return cancel;
  }, [fetchData]);

  return { data, error };
}

const useFeeStats = !!Number(process.env.REACT_APP_USE_LONG_POLL || 0)
  ? usePollFeeStats
  : useIntervalFeeStats;

export default useFeeStats;
