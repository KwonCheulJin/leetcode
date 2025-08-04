## [1768. Merge Strings Alternately](https://leetcode.com/problems/merge-strings-alternately)

### Easy

You are given two strings `word1` and `word2`. Merge the strings by adding letters in alternating order, starting with `word1`. If one string is longer than the other, append the additional letters to the end of the merged string.

Return the merged string.

 

**Example 1:**

```
**Input:** word1 = "abc", word2 = "pqr"
**Output:** "apbqcr"
**Explanation:** The merged string is formed as follows:
word1:  a   b   c
word2:    p   q   r
Merged: a p b q c r
```

**Example 2:**

```
**Input:** word1 = "ab", word2 = "pqrs"
**Output:** "apbqrs"
**Explanation:** Since word2 is longer, "rs" is added at the end.
word1:  a   b 
word2:    p   q   r   s
Merged: a p b q   r   s
```

**Example 3:**

```
**Input:** word1 = "abcd", word2 = "pq"
**Output:** "apbqcd"
**Explanation:** Since word1 is longer, "cd" is added at the end.
word1:  a   b   c   d
word2:    p   q 
Merged: a p b q c   d
```

 

**Constraints:**

- ```1 <= word1.length, word2.length <= 100```
- ```word1` and `word2` consist of lowercase English letters.``