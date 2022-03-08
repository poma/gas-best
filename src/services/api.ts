import { BaseFee, ChartDuration, GasPriceHistoryData, FeeStats } from "~/types";

const BASE_URL = process.env.REACT_APP_API_HTTP_ENDPOINT || "";
const DURATION_ENDPOINTS: Record<ChartDuration, string> = {
  "1d": "day",
  "1w": "week",
  "1m": "month",
};

export async function fetchBaseFee(): Promise<BaseFee> {
  const res = await fetch(`${BASE_URL}/basefee`);
  const body = await res.text();
  if (!res.ok) {
    throw new Error(body);
  }
  return parseInt(body, 10);
}

export async function fetchFeeStats(): Promise<FeeStats> {
  const res = await fetch(`${BASE_URL}/stats`);
  const body = await res.json();
  if (!res.ok) {
    throw new Error(body);
  }
  return body;
}

export async function fetchGasPriceHistory(
  duration: ChartDuration
): Promise<GasPriceHistoryData> {
  const res = await fetch(`${BASE_URL}/graph/${DURATION_ENDPOINTS[duration]}`);
  const body = await res.json();
  if (!res.ok) {
    throw new Error(body);
  }
  return body;
}
