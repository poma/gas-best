export type BaseFee = number;

export interface FeeStatsLast {
  number: number;
  fee: number;
  timestamp: number;
}

export interface FeeStatsPending {
  fee: number;
}

export type FeeStatsRecent = Array<[number, number]>;

export interface FeeStatsForecast {
  "5 min": number;
  "1 hour": number;
  "1 day": number;
}

export interface FeeStats {
  last: FeeStatsLast;
  pending: FeeStatsPending;
  recent: FeeStatsRecent;
  forecast: FeeStatsForecast;
  ethPrice: number;
}

export interface FeeHistoryRaw {
  start: number;
  tick: number;
  min: number[];
  avg: number[];
}

export interface FeeHistoryItem {
  date: string;
  min: number;
  avg: number;
}

export type FeeHistory = FeeHistoryItem[];

export type ChartDuration = "1d" | "1w" | "1m";

export interface FeeNotificationSettings {
  target: BaseFee | null;
  once: boolean;
}
