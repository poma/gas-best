import { useEffect, useState } from "react";
import { fetchGasPriceHistory } from "~/services/api";
import {
  ChartDuration,
  GasPriceHistoryData,
  GasPriceHistoryChartDataEntry,
} from "~/types";
import formatDateTime from "~/utils/formatDateTime";

const expandData = (
  data: GasPriceHistoryData
): GasPriceHistoryChartDataEntry[] =>
  data.min.map((_, index) => ({
    date: formatDateTime(data.start + data.tick * index),
    min: data.min[index],
    avg: data.avg[index],
  }));

function useGasPriceHistory(duration: ChartDuration) {
  const [data, setData] = useState<GasPriceHistoryChartDataEntry[]>();
  const [error, setError] = useState<Error>();

  // TODO add cache
  useEffect(() => {
    fetchGasPriceHistory(duration)
      .then(expandData)
      .then(setData)
      .catch(setError);
  }, [duration]);

  return { data, error };
}

export default useGasPriceHistory;
