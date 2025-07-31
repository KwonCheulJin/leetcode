class TimeLimitedCache {
  constructor() {
    this.cache = new Map();
  }

  set(key, value, duration) {
    const now = Date.now();
    const exists = this.cache.has(key) && this.cache.get(key).expire > now;

    this.cache.set(key, {
      value,
      expire: now + duration,
    });

    return exists;
  }

  get(key) {
    const now = Date.now();
    const entry = this.cache.get(key);

    if (!entry || entry.expire <= now) {
      return -1;
    }

    return entry.value;
  }

  count() {
    const now = Date.now();
    let count = 0;

    for (const [key, { expire }] of this.cache.entries()) {
      if (expire > now) {
        count++;
      } else {
        this.cache.delete(key); // 만료된 항목은 정리
      }
    }

    return count;
  }
}