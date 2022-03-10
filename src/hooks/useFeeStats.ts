import { useEffect, useState } from "react";
import { useTimeoutFn } from "react-use";
import { fetchFeeStats, subscribeToFeeStats } from "~/services/api";
import { FeeStats } from "~/types";

const REQUEST_INTERVAL = Number(process.env.REACT_APP_REQUEST_INTERVAL || 3000);

function useIntervalFeeStats() {
  const [data, setData] = useState<FeeStats>();
  const [error, setError] = useState<Error>();
  const [timestamp, setTimestamp] = useState(0);
  const [_, cancel, reset] = useTimeoutFn(
    () => setTimestamp(Date.now()),
    REQUEST_INTERVAL
  );

  useEffect(() => {
    fetchFeeStats()
      .then(setData)
      .then(() => reset())
      .catch(setError);
    return cancel;
  }, [timestamp]);

  return { data, error };
}

function usePollFeeStats() {
  const [data, setData] = useState<FeeStats>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    fetchFeeStats().then(setData).catch(setError);
    const cancel = subscribeToFeeStats(setData, setError);
    return cancel;
  }, []);

  return { data, error };
}

const useFeeStats = !!Number(process.env.REACT_APP_USE_LONG_POLL || 0)
  ? usePollFeeStats
  : useIntervalFeeStats;

export default useFeeStats;
