## [2469. Convert the Temperature](https://leetcode.com/problems/convert-the-temperature)

### Easy

A non-negative floating-point number `celsius` rounded to two decimal places is given. This represents the **Celsius temperature**.

You need to convert the Celsius temperature to **Kelvin** and **Fahrenheit** and return them as an array `ans = [kelvin, fahrenheit]`.

*Return the array `ans`.* Answers within 10⁴ of the actual answer will be accepted.

**Note:**

- ```kelvin = celsius + 273.15```
- ```fahrenheit = celsius * 1.80 + 32.00```

 

**Example 1:**

```
**Input:** celsius = 36.50
**Output:** [309.65000,97.70000]
**Explanation:** Converting 36.50 Celsius to Kelvin results in 309.65, and converting it to Fahrenheit results in 97.70.
```

**Example 2:**

```
**Input:** celsius = 122.11
**Output:** [395.26000,251.79800]
**Explanation:** Converting 122.11 Celsius to Kelvin results in 395.26, and converting it to Fahrenheit results in 251.798.
```

 

**Constraints:**

- ```0 <= celsius <= 1000```