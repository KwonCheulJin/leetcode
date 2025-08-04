## [2665. Counter II](https://leetcode.com/problems/counter-ii)

### Easy

Write a function `createCounter`. This function should accept an integer `init` and return an object containing three functions.

The three functions are as follows:

- ```increment()` increments the current value by 1 and returns that value.``
- ```decrement()` decrements the current value by 1 and returns that value.``
- ```reset()` sets the current value to `init` and returns that value.``

 

**Example 1:**

```
**Input:** init = 5, calls = [&quot;increment&quot;,&quot;reset&quot;,&quot;decrement&quot;]
**Output:** [6,5,4]
**Explanation:**
const counter = createCounter(5);
counter.increment(); // 6
counter.reset(); // 5
counter.decrement(); // 4
```

**Example 2:**

```
**Input:** init = 0, calls = [&quot;increment&quot;,&quot;increment&quot;,&quot;decrement&quot;,&quot;reset&quot;,&quot;reset&quot;]
**Output:** [1,2,1,0,0]
**Explanation:**
const counter = createCounter(0);
counter.increment(); // 1
counter.increment(); // 2
counter.decrement(); // 1
counter.reset(); // 0
counter.reset(); // 0
```

 

**Constraints:**

- ```-1000 <= init <= 1000```
- ```0 <= calls.length <= 1000```
- ```calls[i]` is one of &quot;increment&quot;, &quot;decrement&quot;, &quot;reset&quot;.``