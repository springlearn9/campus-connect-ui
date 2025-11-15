/**
 * Simple API response cache to prevent duplicate requests
 */
class ApiCache {
  private cache = new Map<string, { data: any; timestamp: number; promise?: Promise<any> }>();
  private readonly CACHE_DURATION = 30000; // 30 seconds

  async get<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const cached = this.cache.get(key);
    const now = Date.now();

    // If we have a fresh cache entry, return it
    if (cached && (now - cached.timestamp) < this.CACHE_DURATION) {
      console.log(`🚀 Cache HIT for ${key} - using cached data`);
      return cached.data;
    }

    // If there's already a request in flight, wait for it
    if (cached?.promise) {
      return cached.promise;
    }

    // Make a new request
    const promise = fetcher();
    
    // Store the promise to prevent duplicate requests
    this.cache.set(key, { 
      data: null, 
      timestamp: now, 
      promise 
    });

    try {
      const data = await promise;
      
      console.log(`🌐 API CALL for ${key} - fetched fresh data`);
      
      // Update cache with the result
      this.cache.set(key, { 
        data, 
        timestamp: now, 
        promise: undefined 
      });
      
      return data;
    } catch (error) {
      // Remove failed request from cache
      this.cache.delete(key);
      throw error;
    }
  }

  clear(key?: string) {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }

  // Clear cache entries older than the cache duration
  cleanup() {
    const now = Date.now();
    for (const [key, cached] of this.cache.entries()) {
      if ((now - cached.timestamp) > this.CACHE_DURATION) {
        this.cache.delete(key);
      }
    }
  }
}

export const apiCache = new ApiCache();

// Cleanup old entries every minute
setInterval(() => apiCache.cleanup(), 60000);