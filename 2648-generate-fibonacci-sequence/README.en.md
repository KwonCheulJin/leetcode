## [2648. Generate Fibonacci Sequence](https://leetcode.com/problems/generate-fibonacci-sequence)

### Easy

Write a generator function that returns a generator object that produces the **Fibonacci sequence**.

The **Fibonacci sequence** is defined by the recurrence relation Xn = Xn-1 + Xn-2.

The first few numbers in this series are `0, 1, 1, 2, 3, 5, 8, 13`.

 

**Example 1:**

```
**Input:** callCount = 5
**Output:** [0,1,1,2,3]
**Explanation:**
const gen = fibGenerator();
gen.next().value; // 0
gen.next().value; // 1
gen.next().value; // 1
gen.next().value; // 2
gen.next().value; // 3
```

**Example 2:**

```
**Input:** callCount = 0
**Output:** []
**Explanation:** gen.next() is not called, so nothing is output.
```

 

**Constraints:**

- ```0 <= callCount <= 50```