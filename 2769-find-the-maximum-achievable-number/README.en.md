2769. Find the Maximum Achievable NumberEasyTwo integers `num` and `t` are given. A **maximum achievable number** is defined as a number that can be made equal to `num` after applying the following operation:

- Increase or decrease the number by `1`, while simultaneously increasing or decreasing `num` by `1`.

Return the **maximum achievable number** after applying the operation at most `t` times.

 

Example 1:

**Input:** num = 4, t = 1

**Output:** 6

**Explanation:**

By applying the operation once, we can make the maximum achievable number equal to `num`:

- Decrease the maximum achievable number by 1, and increase `num` by 1.

Example 2:

**Input:** num = 3, t = 2

**Output:** 7

**Explanation:**

By applying the operation twice, we can make the maximum achievable number equal to `num`:

- Decrease the maximum achievable number by 1, and increase `num` by 1.

 

**Constraints:**

- ```1 <= num, t <= 50```