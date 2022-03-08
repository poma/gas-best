import { useEffect, useState } from "react";
import { fetchFeeStats } from "~/services/api";
import { FeeStats } from "~/types";

function useFeeStats() {
  const [data, setData] = useState<FeeStats>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    fetchFeeStats().then(setData).catch(setError);
  }, []);

  return { data, error };
}

export default useFeeStats;
