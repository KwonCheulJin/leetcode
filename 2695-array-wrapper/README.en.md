## [2695. Array Wrapper](https://leetcode.com/problems/array-wrapper)

### Easy

Design a class `ArrayWrapper` that takes an integer array in its constructor. This class should have two functionalities:

- When two instances of this class are added together using the `+` operator, the result should be the sum of all elements in both arrays.
- When the `String()` function is called on an instance, it should return a string representation of the array in the form of a comma-separated list enclosed in brackets. For example, `[1,2,3]`.

 

**Example 1:**

```
**Input:** nums = [[1,2],[3,4]], operation = "Add"
**Output:** 10
**Explanation:**
const obj1 = new ArrayWrapper([1,2]);
const obj2 = new ArrayWrapper([3,4]);
obj1 + obj2; // 10
```

**Example 2:**

```
**Input:** nums = [[23,98,42,70]], operation = "String"
**Output:** "[23,98,42,70]"
**Explanation:**
const obj = new ArrayWrapper([23,98,42,70]);
String(obj); // "[23,98,42,70]"
```

**Example 3:**

```
**Input:** nums = [[],[]], operation = "Add"
**Output:** 0
**Explanation:**
const obj1 = new ArrayWrapper([]);
const obj2 = new ArrayWrapper([]);
obj1 + obj2; // 0
```

 

**Constraints:**

- ```0 <= nums.length <= 1000```
- ```0 <= nums[i] <= 1000```
- ```Note: nums is the array passed to the constructor```