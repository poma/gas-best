import { number, object, assert, unknown } from "superstruct";

const CacheItem = object({
  data: unknown(),
  updated: number(),
});

export function get(key: string, maxAgeMs: number): unknown {
  const data = window.localStorage.getItem(key);

  try {
    const json = JSON.parse(data || "") as unknown;
    assert(json, CacheItem);
    if (Date.now() - json.updated > maxAgeMs) return;
    return json.data;
  } catch {
    return;
  }
}

export function set<T extends unknown>(key: string, data: T): T {
  window.localStorage.setItem(
    key,
    JSON.stringify({
      data,
      updated: Date.now(),
    })
  );
  return data;
}
