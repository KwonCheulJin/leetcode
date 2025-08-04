## [2724. Sort By](https://leetcode.com/problems/sort-by)

### Easy

Given an array `arr` and a function `fn`, return a sorted array `sortedArr`. The function `fn` is assumed to return numbers, which determine the sorting order of `sortedArr`. `sortedArr` should be sorted in **ascending** order based on the output of `fn`.

It can be assumed that the function `fn` does not return duplicate numbers for the given array.

 

**Example 1:**

```
**Input:** arr = [5, 4, 1, 2, 3], fn = (x) => x
**Output:** [1, 2, 3, 4, 5]
**Explanation:** Since fn returns the numbers as they are, the array is sorted in ascending order.
```

**Example 2:**

```
**Input:** arr = [{"x": 1}, {"x": 0}, {"x": -1}], fn = (d) => d.x
**Output:** [{"x": -1}, {"x": 0}, {"x": 1}]
**Explanation:** fn returns the value for the "x" key. Therefore, the array is sorted based on those values.
```

**Example 3:**

```
**Input:** arr = [[3, 4], [5, 2], [10, 1]], fn = (x) => x[1]
**Output:** [[10, 1], [5, 2], [3, 4]]
**Explanation:** The array is sorted in ascending order based on the number at index=1. 
```

 

**Constraints:**

- ```arr` is a valid JSON array``
- ```fn` is a function that returns a number``
1