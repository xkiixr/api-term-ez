const cache = new Map<string, { data: any; expiry: number }>();

function getCache(key: string) {
  const cached = cache.get(key);
  if (cached && Date.now() < cached.expiry) {
    return cached.data;
  }
  return null;
}

function setCache(key: string, data: any, ttl = 1000 * 60) {
  cache.set(key, { data, expiry: Date.now() + ttl }); // 1 min by default
}

function clearCache(key: string) {
  cache.delete(key);
}
function clearAllCache() {
  cache.clear();
}
export { getCache, setCache, clearCache, clearAllCache };
