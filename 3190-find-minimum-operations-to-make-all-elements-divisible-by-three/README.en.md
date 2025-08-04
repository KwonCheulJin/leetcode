## [3190. Find Minimum Operations to Make All Elements Divisible by Three](https://leetcode.com/problems/find-minimum-operations-to-make-all-elements-divisible-by-three)

### Easy

Given an integer array `nums`, you can perform one operation to either add or subtract 1 from **any** element of `nums`.

Return the **minimum** number of operations required to make all elements of `nums` divisible by 3.

 

**Example 1:**

**Input:** nums = [1,2,3,4]

**Output:** 3

**Explanation:**

All array elements can be made divisible by 3 with 3 operations:

- Subtract 1 from 1.
- Add 1 to 2.
- Subtract 1 from 4.

**Example 2:**

**Input:** nums = [3,6,9]

**Output:** 0

 

**Constraints:**

- ```1 <= nums.length <= 50```
- ```1 <= nums[i] <= 50```