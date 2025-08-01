```html
## [2622. Time Limited Cache](https://leetcode.com/problems/cache-with-time-limit)

### Medium

---

Design a class that can store key-value pairs, but each key is associated with an expiration time.

The class should have three public methods:

**set(key, value, duration)**: Accepts an integer `key`, an integer `value`, and a `duration` in milliseconds. After the specified duration, the key should no longer be accessible. If the same key already exists and has not expired, it should return `true`; otherwise, it should return `false`. If the key already exists, the value and duration should be overwritten.

**get(key)**: If the key exists and has not expired, it should return the associated value. Otherwise, it should return `-1`.

**count()**: Returns the number of keys that have not expired.

&nbsp;

**Example 1:**

```
Input:
actions = ["TimeLimitedCache", "set", "get", "count", "get"]
values = [[], [1, 42, 100], [1], [], [1]]
timeDelays = [0, 0, 50, 50, 150]
Output: [null, false, 42, 1, -1]
Explanation:
At t=0, the cache is created.
At t=0, the key-value pair (1: 42) is added with a time limit of 100ms. Since the value does not exist, false is returned.
At t=50, key=1 is requested and the value 42 is returned.
At t=50, count() is called and there is one active key in the cache.
At t=100, key=1 expires.
At t=150, get(1) is called but the cache is empty, so -1 is returned.
```

**Example 2:**

```
Input:
actions = ["TimeLimitedCache", "set", "set", "get", "get", "get", "count"]
values = [[], [1, 42, 50], [1, 50, 100], [1], [1], [1], []]
timeDelays = [0, 0, 40, 50, 120, 200, 250]
Output: [null, false, true, 50, 50, -1, 0]
Explanation:
At t=0, the cache is created.
At t=0, the key-value pair (1: 42) is added with a time limit of 50ms. Since the value does not exist, false is returned.
At t=40, the key-value pair (1: 50) is added with a time limit of 100ms. Since an unexpired value already exists, true is returned and the previous value is overwritten.
At t=50, get(1) is called and 50 is returned.
At t=120, get(1) is called and 50 is returned.
At t=140, key=1 expires.
At t=200, get(1) is called but the cache is empty, so -1 is returned.
At t=250, count() is called and since the cache is empty, 0 is returned.
```

&nbsp;

**Constraints:**

- `0 <= key, value <= 10^9`
- `0 <= duration <= 1000`
- `1 <= actions.length <= 100`
- `actions.length === values.length`
- `actions.length === timeDelays.length`
- `0 <= timeDelays[i] <= 1450`
- `actions[i]` is one of `"TimeLimitedCache"`, `"set"`, `"get"`, `"count"`.
- The first action is always `"TimeLimitedCache"` and should be executed immediately with a 0 millisecond delay.
```