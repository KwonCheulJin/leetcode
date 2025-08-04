## [1561. Maximum Number of Coins You Can Get](https://leetcode.com/problems/maximum-number-of-coins-you-can-get)

### Medium

There are `3n` piles of coins of varying sizes. You and your friends will take the piles of coins as follows:

- In each step, select **any **`3` piles of coins (they do not have to be consecutive).
- Alice will choose the pile with the maximum number of coins from the selected piles.
- You will then choose the pile with the maximum number of coins from the remaining piles.
- Your friend Bob will take the last pile.
- This process is repeated until there are no more piles of coins.

Given an integer array `piles`, where `piles[i]` represents the number of coins in the i⁴ pile.

Return the maximum number of coins you can get.

 

**Example 1:**

```
**Input:** piles = [2,4,1,2,7,8]
**Output:** 9
**Explanation: **Select the triplet (2, 7, 8). Alice chooses the pile with 8 coins, you choose the pile with **7** coins, and Bob takes the last pile.
Select the triplet (1, 2, 4). Alice chooses the pile with 4 coins, you choose the pile with **2** coins, and Bob takes the last pile.
The maximum number of coins you can get is: 7 + 2 = 9.
In contrast, if you select this array (1, **2**, 8), (2, **4**, 7), you would only get 2 + 4 = 6 coins, which is not optimal.
```

**Example 2:**

```
**Input:** piles = [2,4,5]
**Output:** 4
```

**Example 3:**

```
**Input:** piles = [9,8,7,6,5,1,2,3,4]
**Output:** 18
```

 

**Constraints:**

3 
- ```piles.length % 3 == 0```
1