## [2011. Final Value of Variable After Performing Operations](https://leetcode.com/problems/final-value-of-variable-after-performing-operations/)

### Easy

There is a programming language with **four** operations and **one** variable `X`:

- ```++X` and `X++` increase the value of variable `X` by `1`.``
- ```--X` and `X--` decrease the value of variable `X` by `1`.``

Initially, the value of `X` is `0`.

Given a string array `operations` that contains a list of operations, return the **final** value of `X` after performing all the operations.

 

**Example 1:**

```
**Input:** operations = ["--X","X++","X++"]
**Output:** 1
**Explanation:** The operations are performed as follows:
Initially, X = 0.
--X: X is decreased by 1, so X = 0 - 1 = -1.
X++: X is increased by 1, so X = -1 + 1 = 0.
X++: X is increased by 1, so X = 0 + 1 = 1.
```

**Example 2:**

```
**Input:** operations = ["++X","++X","X++"]
**Output:** 3
**Explanation:** The operations are performed as follows:
Initially, X = 0.
++X: X is increased by 1, so X = 0 + 1 = 1.
++X: X is increased by 1, so X = 1 + 1 = 2.
X++: X is increased by 1, so X = 2 + 1 = 3.
```

**Example 3:**

```
**Input:** operations = ["X++","++X","--X","X--"]
**Output:** 0
**Explanation:** The operations are performed as follows:
Initially, X = 0.
X++: X is increased by 1, so X = 0 + 1 = 1.
++X: X is increased by 1, so X = 1 + 1 = 2.
--X: X is decreased by 1, so X = 2 - 1 = 1.
X--: X is decreased by 1, so X = 1 - 1 = 0.
```

 

**Constraints:**

- ```1 <= operations.length <= 100```
- ```operations[i]` is one of `"++X"`, `"X++"`, `"--X"`, `"X--"`.``