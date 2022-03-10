import { useEffect, useState } from "react";
import { useTimeoutFn } from "react-use";
import { fetchBaseFee, subscribeToBaseFee } from "~/services/api";
import { BaseFee } from "~/types";

const REQUEST_INTERVAL = Number(process.env.REACT_APP_REQUEST_INTERVAL || 3000);

function useIntervalBaseFee() {
  const [data, setData] = useState<BaseFee>();
  const [error, setError] = useState<Error>();
  const [timestamp, setTimestamp] = useState(0);
  const [_, cancel, reset] = useTimeoutFn(
    () => setTimestamp(Date.now()),
    REQUEST_INTERVAL
  );

  useEffect(() => {
    fetchBaseFee()
      .then(setData)
      .then(() => reset())
      .catch(setError);
    return cancel;
  }, [timestamp]);

  return { data, error };
}

function usePollBaseFee() {
  const [data, setData] = useState<BaseFee>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    fetchBaseFee().then(setData).catch(setError);
    const cancel = subscribeToBaseFee(setData, setError);
    return cancel;
  }, []);

  return { data, error };
}

const useBaseFee = !!Number(process.env.REACT_APP_USE_LONG_POLL || 0)
  ? usePollBaseFee
  : useIntervalBaseFee;

export default useBaseFee;
