## [2629. Function Composition](https://leetcode.com/problems/function-composition)

### Easy

Given an array of functions [f1, f2, f3, ..., fn], return a new function `fn` which is the **function composition** of the array of functions.

The **function composition** of `[f(x), g(x), h(x)]` is `fn(x) = f(g(h(x)))`.

When the list of functions is empty, the **function composition** is the **identity function** `f(x) = x`.

It is assumed that each function in the array takes a single integer as input and returns a single integer as output.

 

**Example 1:**

```
**Input:** functions = [x => x + 1, x => x * x, x => 2 * x], x = 4
**Output:** 65
**Explanation:**
Evaluate from right to left...
Start with x = 4.
2 * (4) = 8
(8) * (8) = 64
(64) + 1 = 65
```

**Example 2:**

```
**Input:** functions = [x => 10 * x, x => 10 * x, x => 10 * x], x = 1
**Output:** 1000
**Explanation:**
Evaluate from right to left...
10 * (1) = 10
10 * (10) = 100
10 * (100) = 1000
```

**Example 3:**

```
**Input:** functions = [], x = 42
**Output:** 42
**Explanation:**
The composition of 0 functions is the identity function.
```

 

**Constraints:**

-1000 
0 
- All functions accept and return a single integer