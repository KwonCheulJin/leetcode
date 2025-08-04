## [1920. Build Array from Permutation](https://leetcode.com/problems/build-array-from-permutation)

### Easy

Given a **0-indexed permutation** array `nums` of length **n** (0-indexed), create an array `ans` of the same length such that `ans[i] = nums[nums[i]]` and return it.

A **0-indexed permutation** array `nums` consists of **distinct** integers from `0` to `nums.length - 1` (inclusive).

 

**Example 1:**

```
**Input:** nums = [0,2,1,5,3,4]
**Output:** [0,1,2,4,5,3]
**Explanation:** The array ans is constructed as follows:
ans = [nums[nums[0]], nums[nums[1]], nums[nums[2]], nums[nums[3]], nums[nums[4]], nums[nums[5]]]
    = [nums[0], nums[2], nums[1], nums[5], nums[3], nums[4]]
    = [0,1,2,4,5,3]
```

**Example 2:**

```
**Input:** nums = [5,0,1,2,3,4]
**Output:** [4,5,0,1,2,3]
**Explanation:** The array ans is constructed as follows:
ans = [nums[nums[0]], nums[nums[1]], nums[nums[2]], nums[nums[3]], nums[nums[4]], nums[nums[5]]]
    = [nums[5], nums[0], nums[1], nums[2], nums[3], nums[4]]
    = [4,5,0,1,2,3]
```

 

**Constraints:**

- ```1 <= nums.length <= 1000```
- ```0 <= nums[i] < nums.length```
- The elements of `nums` are **distinct**.

 

**Follow-up:** Can you solve this problem without using extra space? (i.e., with `O(1)` memory complexity)