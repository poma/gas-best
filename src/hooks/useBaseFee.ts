import { useEffect, useState } from "react";
import { fetchBaseFee, subscribeToBaseFee } from "~/services/api";
import { BaseFee } from "~/types";

function useBaseFee() {
  const [data, setData] = useState<BaseFee>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    fetchBaseFee().then(setData).catch(setError);
    const cancel = subscribeToBaseFee(setData, setError);
    return cancel;
  }, []);

  return { data, error };
}

export default useBaseFee;
