## [2623. Memoize](https://leetcode.com/problems/memoize)

### Medium

Given a function `fn`, return a **memoized** version of that function.

A **memoized** function is one that does not get called twice with the same input values. Instead, it returns cached values.

It is assumed that the input function can be one of **3** types: `sum`**, **`fib`**, **and `factorial`**.**

- ```sum`** **takes two integers `a` and `b` and returns `a + b`. If there is already a cached value for the arguments `(b, a)` when `a != b`, it cannot be used for the arguments `(a, b)`. For example, if the arguments are `(3, 2)` and `(2, 3)`, two separate calls must be made.``
- ```fib`** **takes a single integer `n` and returns `1` if `n  a + b;``
const memoizedSum = memoize(sum);
memoizedSum(2, 2); // &quot;call&quot; - returns 4. (2, 2) has not been seen before, so sum() was called.
memoizedSum(2, 2); // &quot;call&quot; - returns 4. However, since the same input has been seen before, sum() was not called.
// &quot;getCallCount&quot; - total call count: 1
memoizedSum(1, 2); // &quot;call&quot; - returns 3. (1, 2) has not been seen before, so sum() was called.
// &quot;getCallCount&quot; - total call count: 2
```

**Example 2:**

```
**Input:
**fnName = &quot;factorial&quot;
actions = [&quot;call&quot;,&quot;call&quot;,&quot;call&quot;,&quot;getCallCount&quot;,&quot;call&quot;,&quot;getCallCount&quot;]
values = [[2],[3],[2],[],[3],[]]
**Output:** [2,6,2,2,6,2]
**Explanation:**
const factorial = (n) => (n 0 
- ```1 1 ``
- ```actions.length === values.length```
- ```actions[i]` is either &quot;call&quot; or &quot;getCallCount&quot;.``
- ```fnName` is one of &quot;sum&quot;, &quot;factorial&quot;, &quot;fib&quot;.``