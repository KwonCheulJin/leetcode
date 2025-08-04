## [2390. Removing Stars from a String](https://leetcode.com/problems/removing-stars-from-a-string)

### Medium

Given a string `s` containing stars `*`, you can perform the following operation until there are no stars left:

- Choose a star in the string `s`.
- Remove the closest **non-star** character to the left of the star, and also remove the star itself.

Return the string after all the stars have been removed.

**Note:**

- The input will be generated such that the operation is always possible.
- It can be shown that the resulting string will always be unique.

 

**Example 1:**

```
**Input:** s = &quot;leet**cod*e&quot;
**Output:** &quot;lecoe&quot;
**Explanation:** Performing the removals from left to right:
- The closest character to the first star is &quot;leet**cod*e&quot;, removing &#39;t&#39; leaves &quot;lee*cod*e&quot;.
- The closest character to the second star is &quot;lee*cod*e&quot;, removing &#39;e&#39; leaves &quot;lecod*e&quot;.
- The closest character to the third star is &quot;lecod*e&quot;, removing &#39;d&#39; leaves &quot;lecoe&quot;.
Now there are no stars, and &quot;lecoe&quot; is returned.
```

**Example 2:**

```
**Input:** s = &quot;erase*****&quot;
**Output:** &quot;&quot;
**Explanation:** All characters are removed, returning an empty string.
```

 

**Constraints:**

1 
- ```s` consists of lowercase English letters and stars `*`.``
- The operation can be performed on `s`.