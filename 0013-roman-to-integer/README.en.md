## [13. Roman to Integer](https://leetcode.com/problems/roman-to-integer)

### Easy

Roman numerals are represented by seven different symbols: `I`, `V`, `X`, `L`, `C`, `D`, `M`.

```
**Symbol**       **Value**
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```

For example, `2` is written as `II` in Roman numerals, which is simply two ones added together. `12` is `XII`, which is simply `X + II`. The number `27` is written as `XXVII`, which is `XX + V + II`.

Roman numerals are usually written from largest to smallest from left to right. However, the number 4 is not written as `IIII`. Instead, the number 4 is written as `IV`. Because 1 is before 5, we subtract it making 4. The same principle applies to the number 9, which is written as `IX`. Subtraction is used in the following six cases:

- ```I` is placed before `V` (5) and `X` (10) to make 4 and 9. ``
- ```X` is placed before `L` (50) and `C` (100) to make 40 and 90. ``
- ```C` is placed before `D` (500) and `M` (1000) to make 400 and 900.``

Convert the given Roman numeral to an integer.

 

**Example 1:**

```
**Input:** s = "III"
**Output:** 3
**Explanation:** III = 3.
```

**Example 2:**

```
**Input:** s = "LVIII"
**Output:** 58
**Explanation:** L = 50, V = 5, III = 3.
```

**Example 3:**

```
**Input:** s = "MCMXCIV"
**Output:** 1994
**Explanation:** M = 1000, CM = 900, XC = 90, IV = 4.
```

 

**Constraints:**

- ```1 <= s.length <= 15```
- ```s` consists of the characters `(&#39;I&#39;, &#39;V&#39;, &#39;X&#39;, &#39;L&#39;, &#39;C&#39;, &#39;D&#39;, &#39;M&#39;)` only.``
- It is guaranteed that `s` is a valid Roman numeral in the range `[1, 3999]`.