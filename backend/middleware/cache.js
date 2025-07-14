import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 3600 }); // default TTL = 1 hour

/**
 * Generic cache middleware wrapper
 * @param {function(req): string} keyFn - function to generate cache key
 * @param {function(req): Promise<any>} fetchFn - function to fetch fresh data
 */
export function cacheMiddleware(keyFn, fetchFn) {
  return async (req, res) => {
    try {
      const key = typeof keyFn === 'function' ? keyFn(req) : keyFn;
      const cached = cache.get(key);

      if (cached) {
        return res.json(cached);
      }

      const data = await fetchFn(req);
      cache.set(key, data);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
  };
}
