189. Rotate ArrayMediumGiven an integer array `nums`, rotate the array to the right by `k` steps, where `k` is a non-negative integer.

 

Example 1:

**Input:** nums = [1,2,3,4,5,6,7], k = 3
**Output:** [5,6,7,1,2,3,4]
**Explanation:**
After rotating the array to the right by 1 step: [7,1,2,3,4,5,6]
After rotating the array to the right by 2 steps: [6,7,1,2,3,4,5]
After rotating the array to the right by 3 steps: [5,6,7,1,2,3,4]

Example 2:

**Input:** nums = [-1,-100,3,99], k = 2
**Output:** [3,99,-1,-100]
**Explanation:**
After rotating the array to the right by 1 step: [99,-1,-100,3]
After rotating the array to the right by 2 steps: [3,99,-1,-100]

 

**Constraints:**

1 <= nums.length <= 10⁴
-2⁴ <= nums[i] <= 2⁴ - 1
0 <= k <= 10⁴

 

**Follow-up:**

- Try to come up with as many solutions as you can for this problem. There are at least **three** different ways to solve it.
- Can you solve it in-place with `O(1)` extra space?