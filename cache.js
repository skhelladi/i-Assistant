import NodeCache from 'node-cache';

// create a cache instance with a default TTL of 5 minutes
const cache = new NodeCache({ 
    stdTTL: 300,
    checkperiod: 320
});

// Middleware to cache responses
export const cacheMiddleware = (duration) => {
    return (req, res, next) => {
        // Skip cache for POST/PUT/DELETE requests
        if (req.method !== 'GET') {
            return next();
        }

        // Skip cache for discussion endpoints
        if (req.originalUrl.includes('/discussion/')) {
            return next();
        }

        const key = req.originalUrl;
        const cachedResponse = cache.get(key);

        if (cachedResponse) {
            console.log(`Cache hit for ${key}`);
            return res.json(cachedResponse);
        }

        // Replace the res.json method to intercept and cache the response
        const originalJson = res.json;
        res.json = function(body) {
            if (body) {  // Vérifier si la réponse est valide
                cache.set(key, body, duration);
                console.log(`Cache set for ${key}`);
            }
            originalJson.call(this, body);
        };

        next();
    };
};

// Function to invalidate the cache
export const invalidateCache = (key) => {
    console.log(`Invalidating cache for ${key}`);
    cache.del(key);
};

// Function to clear the entire cache
export const clearCache = () => {
    console.log('Clearing entire cache');
    cache.flushAll();
}; 