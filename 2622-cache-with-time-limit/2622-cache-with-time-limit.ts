class TimeLimitedCache {
  private cache: Map<number, { value: number; expire: number }>;

  constructor() {
    this.cache = new Map();
  }

  set(key: number, value: number, duration: number): boolean {
    const now = Date.now();
    const isExistingAndUnexpired =
      this.cache.has(key) && this.cache.get(key)!.expire > now;

    this.cache.set(key, {
      value,
      expire: now + duration,
    });

    return !!isExistingAndUnexpired;
  }

  get(key: number): number {
    const now = Date.now();
    const entry = this.cache.get(key);

    if (!entry || entry.expire <= now) {
      return -1;
    }

    return entry.value;
  }

  count(): number {
    const now = Date.now();
    let validCount = 0;

    for (const [key, { expire }] of this.cache.entries()) {
      if (expire > now) {
        validCount++;
      } else {
        this.cache.delete(key); // 만료된 키는 정리
      }
    }

    return validCount;
  }
}