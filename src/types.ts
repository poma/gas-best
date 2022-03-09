export type BaseFee = number;

export interface FeeStatsLast {
  number: number;
  fee: number;
  timestamp: number;
}

export type FeeStatsRecent = Array<[number, number]>;

export interface FeeStatsForecast {
  "15 min": number;
  "1 hour": number;
  "1 day": number;
}

export interface FeeStats {
  last: FeeStatsLast;
  recent: FeeStatsRecent;
  forecast: FeeStatsForecast;
  ethPrice: number;
}

export interface GasPriceHistoryData {
  start: number;
  tick: number;
  min: number[];
  avg: number[];
}

export interface GasPriceHistoryChartDataEntry {
  date: string;
  min: number;
  avg: number;
}

export type ChartDuration = "1d" | "1w" | "1m";
