## [2620. Counter](https://leetcode.com/problems/counter)

### Easy

Given an integer `n`, return a function `counter`. This `counter` function initially returns `n`, and then every time it is called, it returns a value that is one greater than the previous value (`n`, `n + 1`, `n + 2`, etc.).

 

**Example 1:**

```
**Input:** 
n = 10 
[&quot;call&quot;,&quot;call&quot;,&quot;call&quot;]
**Output:** [10,11,12]
**Explanation:** 
counter() = 10 // returns n when counter() is first called.
counter() = 11 // returns 1 more than the previous call.
counter() = 12 // returns 1 more than the previous call.
```

**Example 2:**

```
**Input:** 
n = -2
[&quot;call&quot;,&quot;call&quot;,&quot;call&quot;,&quot;call&quot;,&quot;call&quot;]
**Output:** [-2,-1,0,1,2]
**Explanation:** counter() initially returns -2. It then increments with each call.
```

 

**Constraints:**

- ```-1000 <= n <= 1000```
- ```0 <= calls.length <= 1000```
- ```calls[i] === &quot;call&quot;```