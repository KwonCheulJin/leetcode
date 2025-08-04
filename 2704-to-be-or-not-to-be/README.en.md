## [2704. To Be or Not to Be](https://leetcode.com/problems/to-be-or-not-to-be)

### Easy

Implement the `expect` function to allow developers to test their code. This function should take an arbitrary value `val` and return an object that performs the following two functionalities.

- ```toBe(val)` takes another value and returns `true` if both values are strictly equal (using `===`). If they are not equal, it should throw an error with the message `"Not Equal"`.``
- ```notToBe(val)` takes another value and returns `true` if both values are strictly different (using `!==`). If they are equal, it should throw an error with the message `"Equal"`.``

 

**Example 1:**

```
**Input:** func = () => expect(5).toBe(5)
**Output:** {"value": true}
**Explanation:** Since 5 === 5, this expression returns true.
```

**Example 2:**

```
**Input:** func = () => expect(5).toBe(null)
**Output:** {"error": "Not Equal"}
**Explanation:** Since 5 !== null, this expression throws a "Not Equal" error.
```

**Example 3:**

```
**Input:** func = () => expect(5).notToBe(null)
**Output:** {"value": true}
**Explanation:** Since 5 !== null, this expression returns true.
```