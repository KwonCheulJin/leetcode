1365. How Many Numbers Are Smaller Than the Current NumberEasyGiven an array `nums`, return an array representing how many numbers are smaller than each `nums[i]`. Specifically, for each `nums[i]`, count the number of valid `j`'s such that `j != i` **and** `nums[j] < nums[i]`.

Return the answer as an array.

 

Example 1:

**Input:** nums = [8,1,2,2,3]
**Output:** [4,0,1,1,3]
**Explanation:**
For nums[0]=8, there are four numbers smaller than it (1, 2, 2, and 3).
For nums[1]=1, there are no numbers smaller than it.
For nums[2]=2, there is one number smaller than it (1).
For nums[3]=2, there is one number smaller than it (1).
For nums[4]=3, there are three numbers smaller than it (1, 2, and 2).

Example 2:

**Input:** nums = [6,5,4,8]
**Output:** [2,1,0,3]

Example 3:

**Input:** nums = [7,7,7,7]
**Output:** [0,0,0,0]

 

**Constraints:**

- ```2 <= nums.length <= 500```
- ```0 <= nums[i] <= 100```