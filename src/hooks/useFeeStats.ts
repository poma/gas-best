import { useCallback, useEffect, useState } from "react";
import { useTimeoutFn } from "react-use";
import { fetchFeeStats, subscribeToFeeStats } from "~/services/api";
import { FeeStats } from "~/types";

const REQUEST_INTERVAL_MS = Number(
  process.env.REACT_APP_REQUEST_INTERVAL || 3000
);

function useIntervalFeeStats() {
  const [data, setData] = useState<FeeStats>();
  const [error, setError] = useState<Error>();
  const [timestamp, setTimestamp] = useState(0);
  const [_, cancel, resetTimeout] = useTimeoutFn(
    () => setTimestamp(Date.now()),
    REQUEST_INTERVAL_MS
  );

  const clearError = () => setError(undefined);

  useEffect(() => {
    fetchFeeStats()
      .then(setData)
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
  const [data, setData] = useState<FeeStats>();
  const [error, setError] = useState<Error>();

  const clearError = () => setError(undefined);
  const fetchData = useCallback(
    () => fetchFeeStats().then(setData).then(clearError).catch(setError),
    []
  );

  useEffect(() => {
    fetchData();
    const cancel = subscribeToFeeStats(setData, setError, fetchData);
    return cancel;
  }, [fetchData]);

  return { data, error };
}

const useFeeStats = !!Number(process.env.REACT_APP_USE_LONG_POLL || 0)
  ? usePollFeeStats
  : useIntervalFeeStats;

export default useFeeStats;
