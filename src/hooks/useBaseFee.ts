import { useEffect, useState } from "react";
import { useTimeoutFn } from "react-use";
import { fetchBaseFee, subscribeToBaseFee } from "~/services/api";
import { BaseFee } from "~/types";

const REQUEST_INTERVAL = Number(process.env.REACT_APP_REQUEST_INTERVAL || 3000);

function useIntervalBaseFee() {
  const [data, setData] = useState<BaseFee>();
  const [error, setError] = useState<Error>();
  const [timestamp, setTimestamp] = useState(0);
  const [_, cancel, resetTimeout] = useTimeoutFn(
    () => setTimestamp(Date.now()),
    REQUEST_INTERVAL
  );

  const clearError = () => setError(undefined);

  useEffect(() => {
    fetchBaseFee()
      .then(setData)
      .then(resetTimeout)
      .then(clearError)
      .catch((err) => {
        setError(err);
        resetTimeout();
      });
    return cancel;
  }, [timestamp]);

  return { data, error };
}

function usePollBaseFee() {
  const [data, setData] = useState<BaseFee>();
  const [error, setError] = useState<Error>();

  const clearError = () => setError(undefined);
  const fetchData = () =>
    fetchBaseFee().then(setData).then(clearError).catch(setError);

  useEffect(() => {
    fetchData();
    const cancel = subscribeToBaseFee(setData, setError, fetchData);
    return cancel;
  }, []);

  return { data, error };
}

const useBaseFee = !!Number(process.env.REACT_APP_USE_LONG_POLL || 0)
  ? usePollBaseFee
  : useIntervalBaseFee;

export default useBaseFee;
