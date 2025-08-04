## [125. Valid Palindrome](https://leetcode.com/problems/valid-palindrome)

### Easy

To determine if a phrase is a **palindrome**, convert all uppercase letters into lowercase letters, remove all non-alphabetic characters except for letters and numbers, and then check if it reads the same forwards and backwards. Alphabetic characters include both letters and numbers.

Given a string `s`, return `true` if it is a **palindrome**; otherwise, return `false`.

 

**Example 1:**

```
**Input:** s = &quot;A man, a plan, a canal: Panama&quot;
**Output:** true
**Explanation:** &quot;amanaplanacanalpanama&quot; is a palindrome.
```

**Example 2:**

```
**Input:** s = &quot;race a car&quot;
**Output:** false
**Explanation:** &quot;raceacar&quot; is not a palindrome.
```

**Example 3:**

```
**Input:** s = &quot; &quot;
**Output:** true
**Explanation:** After removing non-alphabetic characters, the string becomes an empty string &quot;&quot;.
An empty string reads the same forwards and backwards, thus it is a palindrome.
```

 

**Constraints:**

1 
- ```s` consists of printable ASCII characters only.``