/* eslint-disable @typescript-eslint/no-redeclare */
import { array, number, object, string, tuple, Infer } from "superstruct";

// Runtime validation
// ======================================

export const BaseFee = number();

export const FeeStatsLast = object({
  number: number(),
  fee: number(),
  timestamp: number(),
});

export const FeeStatsPending = object({
  fee: number(),
});

export const FeeStatsRecent = array(tuple([number(), number()]));

export const FeeStatsForecast = object({
  "5 min": number(),
  "1 hour": number(),
  "1 day": number(),
});

export const FeeStats = object({
  last: FeeStatsLast,
  pending: FeeStatsPending,
  recent: FeeStatsRecent,
  forecast: FeeStatsForecast,
  ethPrice: number(),
});

export const FeeHistoryRaw = object({
  start: number(),
  tick: number(),
  min: array(number()),
  avg: array(number()),
});

export const FeeHistoryItem = object({
  date: string(),
  min: number(),
  avg: number(),
});

export const FeeHistory = array(FeeHistoryItem);

// Types
// ======================================

export type BaseFee = Infer<typeof BaseFee>;
export type FeeStatsLast = Infer<typeof FeeStatsLast>;
export type FeeStatsPending = Infer<typeof FeeStatsPending>;
export type FeeStatsRecent = Infer<typeof FeeStatsRecent>;
export type FeeStatsForecast = Infer<typeof FeeStatsForecast>;
export type FeeStats = Infer<typeof FeeStats>;
export type FeeHistoryRaw = Infer<typeof FeeHistoryRaw>;
export type FeeHistoryItem = Infer<typeof FeeHistoryItem>;
export type FeeHistory = Infer<typeof FeeHistory>;

export type ChartDuration = "1d" | "1w" | "1m";

export interface FeeNotificationSettings {
  target: BaseFee | null;
  once: boolean;
}
