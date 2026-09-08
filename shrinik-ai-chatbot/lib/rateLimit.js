function rateLimiter({ windowMs = 60000, max = 10 } = {}) {
  const hits = new Map();
  setInterval(() => {
    const now = Date.now();
    for (const [ip, list] of hits) {
      const alive = list.filter((t) => now - t < windowMs);
      if (alive.length === 0) hits.delete(ip);
      else hits.set(ip, alive);
    }
  }, windowMs).unref();

  return function (req, res, next) {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const list = (hits.get(ip) || []).filter((t) => now - t < windowMs);
    if (list.length >= max) {
      return res.status(429).json({
        error: 'Too many messages. Please wait a minute before trying again.'
      });
    }
    list.push(now);
    hits.set(ip, list);
    next();
  };
}

module.exports = { rateLimiter };
