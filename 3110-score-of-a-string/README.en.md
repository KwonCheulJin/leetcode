## [3110. Score of a String](https://leetcode.com/problems/score-of-a-string/solutions/5241514/3110-score-of-a-string/)

### Easy

You are given a string `s`. The **score** of the string is defined as the sum of the absolute differences of the **ASCII** values of adjacent characters.

Return the **score** of the string `s`.

 

**Example 1:**

**Input:** s = &quot;hello&quot;

**Output:** 13

**Explanation:**

The **ASCII** values of the characters in `s` are: `&#39;h&#39; = 104`, `&#39;e&#39; = 101`, `&#39;l&#39; = 108`, `&#39;o&#39; = 111`. Therefore, the score of `s` is `|104 - 101| + |101 - 108| + |108 - 108| + |108 - 111| = 3 + 7 + 0 + 3 = 13`.

**Example 2:**

**Input:** s = &quot;zaz&quot;

**Output:** 50

**Explanation:**

The **ASCII** values of the characters in `s` are: `&#39;z&#39; = 122`, `&#39;a&#39; = 97`. Therefore, the score of `s` is `|122 - 97| + |97 - 122| = 25 + 25 = 50`.

 

**Constraints:**

- ```2 <= s.length <= 100```
- ```s` consists of lowercase English letters only.``