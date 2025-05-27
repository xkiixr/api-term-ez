import { LRUCache } from "lru-cache";

const cache = new LRUCache<string, any>({
  max: 100, // max 100 items
  ttl: 1000 * 60 * 5, // 5 minutes
});

export const getCache = (key: string) => cache.get(key);
export const setCache = (key: string, value: any, ttl?: number) => {
  cache.set(key, value, { ttl });
};
