import { useEffect, useState } from "react";
import { fetchBaseFee } from "~/services/api";
import { BaseFee } from "~/types";

function useBaseFee() {
  const [data, setData] = useState<BaseFee>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    fetchBaseFee().then(setData).catch(setError);
  }, []);

  return { data, error };
}

export default useBaseFee;
