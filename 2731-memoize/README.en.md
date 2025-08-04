## [2731. Memoize](https://leetcode.com/problems/memoize)

### Medium

Given a function `fn`, return its **memoized** version.

A **memoized** function does not get called twice with the same input. Instead, it returns the cached value.

There are **3** possible input functions: `sum`**, **`fib`**, **and `factorial`**.**

- ```sum`** **takes two integers `a` and `b` and returns `a + b`. If there is no cached value for the arguments `(b, a)`, it cannot be used for a call with `(a, b)`. For example, if the arguments are `(3, 2)` and `(2, 3)`, two different calls must be made.``
- ```fib`** **takes a single integer `n` and returns `1` if `n  a + b;``
const memoizedSum = memoize(sum);
memoizedSum(2, 2); // &quot;call&quot; - returns 4. (2, 2) was not seen before, so sum() was called.
memoizedSum(2, 2); // &quot;call&quot; - returns 4. But since the same input was seen before, sum() was not called.
// &quot;getCallCount&quot; - total call count: 1
memoizedSum(1, 2); // &quot;call&quot; - returns 3. (1, 2) was not seen before, so sum() was called.
// &quot;getCallCount&quot; - total call count: 2
```

**Example 2:**

```
**Input:
**fnName = &quot;factorial&quot;
actions = [&quot;call&quot;,&quot;call&quot;,&quot;call&quot;,&quot;getCallCount&quot;,&quot;call&quot;,&quot;getCallCount&quot;]
values = [[2],[3],[2],[],[3],[]]
**Output:** [2, 6, 2, 2, 6, 2]
**Explanation:**
const factorial = (n) => (n 0 
- ```1 1 ``
- ```actions.length === values.length```
- ```actions[i]` is either &quot;call&quot; or &quot;getCallCount&quot;.``
- ```fnName` is one of &quot;sum&quot;, &quot;factorial&quot;, and &quot;fib&quot;.``