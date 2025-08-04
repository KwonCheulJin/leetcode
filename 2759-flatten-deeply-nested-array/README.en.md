## [2759. Flatten Deeply Nested Array](https://leetcode.com/problems/flatten-deeply-nested-array)

### Medium

**A multi-dimensional** array `arr` and a depth `n` are given, return the **flattened** version of the array.

**A multi-dimensional** array is a recursive data structure that can contain integers or other **multi-dimensional** arrays.

A **flattened** array is a version of the array where some or all of the sub-arrays are removed and replaced with the actual elements of those sub-arrays. This flattening operation should only be performed when the current nesting depth is less than `n`. The depth of the first element of the array is considered to be `0`.

Do not use the built-in `Array.flat` method to solve this problem.

 

**Example 1:**

```
**Input**
arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
n = 0
**Output**
[1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]

**Explanation**
When n=0 is passed, the original array is always returned. This is because the smallest depth of the sub-arrays (0) is not less than n=0. Therefore, no sub-arrays should be flattened.
```

**Example 2:**

```
**Input**
arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
n = 1
**Output**
[1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11], 12, 13, 14, 15]

**Explanation**
Sub-arrays starting with 4, 7, and 13 are all flattened. This is because their depth is 0. However, [9, 10, 11] is not flattened because its depth is 1.
```

**Example 3:**

```
**Input**
arr = [[1, 2, 3], [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
n = 2
**Output**
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

**Explanation**
The maximum depth of all sub-arrays is 1. Therefore, all are flattened.
```

 

**Constraints:**

0 
0 
- ```maxDepth 0``