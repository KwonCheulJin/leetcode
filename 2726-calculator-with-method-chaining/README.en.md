## [2726. Calculator with Method Chaining](https://leetcode.com/problems/calculator-with-method-chaining)

### Easy

Design a `Calculator` class. This class should provide addition, subtraction, multiplication, division, and exponentiation operations. It should also allow for method chaining to perform consecutive operations. The constructor of the `Calculator` class accepts a number, which serves as the initial value of `result`.

`Calculator` class should have the following methods:

- ```add` - A method that adds the given number `value` to `result` and returns the updated `Calculator`.``
- ```subtract` - A method that subtracts `value` from `result` and returns the updated `Calculator`.``
- ```multiply` - A method that multiplies `result` by `value` and returns the updated `Calculator`.``
- ```divide` - A method that divides `result` by `value` and returns the updated `Calculator`. If the provided value is `0`, it should throw an error with the message `&quot;Division by zero is not allowed&quot;`.``
- ```power` - A method that raises `result` to the power of `value` and returns the updated `Calculator`.``
- ```getResult` - A method that returns `result`.``

The result is considered accurate if it is within 10⁴ of the actual result.

 

**Example 1:**

```
**Input:**
actions = ["Calculator", "add", "subtract", "getResult"],
values = [10, 5, 7]
**Output:** 8
**Explanation:**
new Calculator(10).add(5).subtract(7).getResult() // 10 + 5 - 7 = 8
```

**Example 2:**

```
**Input:**
actions = ["Calculator", "multiply", "power", "getResult"],
values = [2, 5, 2]
**Output:** 100
**Explanation:**
new Calculator(2).multiply(5).power(2).getResult() // (2 * 5) ^ 2 = 100
```

**Example 3:**

```
**Input:**
actions = ["Calculator", "divide", "getResult"],
values = [20, 0]
**Output:** "Division by zero is not allowed"
**Explanation:**
new Calculator(20).divide(0).getResult() // 20 / 0

An error should occur because division by zero is not allowed.
```

 

**Constraints:**

- ```actions` is a valid JSON string array``
- ```values` is a valid JSON number array``
2 
1 
- ```actions[i]` is one of "Calculator", "add", "subtract", "multiply", "divide", "power", "getResult"``
- The first action is always "Calculator".
- The last action is always "getResult".