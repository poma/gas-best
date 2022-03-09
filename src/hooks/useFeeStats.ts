import { useEffect, useState } from "react";
import { fetchFeeStats, subscribeToFeeStats } from "~/services/api";
import { FeeStats } from "~/types";

function useFeeStats() {
  const [data, setData] = useState<FeeStats>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    fetchFeeStats().then(setData).catch(setError);
    const cancel = subscribeToFeeStats(setData, setError);
    return cancel;
  }, []);

  return { data, error };
}

export default useFeeStats;
