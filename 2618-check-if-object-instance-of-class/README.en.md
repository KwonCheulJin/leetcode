## [2618. Check if Object Instance of Class](https://leetcode.com/problems/check-if-object-instance-of-class)

### Medium

Write a function that checks if a given value is an instance of a specific class or superclass. In this problem, an object is considered an instance of that class if it can access the methods of that class.

There are no restrictions on the data types that can be passed to the function. For example, the value or class may be `undefined`.

 

**Example 1:**

```
**Input:** func = () => checkIfInstanceOf(new Date(), Date)
**Output:** true
**Explanation: **The object returned by the Date constructor is, by definition, an instance of Date.
```

**Example 2:**

```
**Input:** func = () => { class Animal {}; class Dog extends Animal {}; return checkIfInstanceOf(new Dog(), Animal); }
**Output:** true
**Explanation:**
class Animal {};
class Dog extends Animal {};
checkIfInstanceOf(new Dog(), Animal); // true

Dog is a subclass of Animal. Therefore, the Dog object is an instance of both Dog and Animal.
```

**Example 3:**

```
**Input:** func = () => checkIfInstanceOf(Date, Date)
**Output:** false
**Explanation: **The Date constructor cannot logically be an instance of itself.
```

**Example 4:**

```
**Input:** func = () => checkIfInstanceOf(5, Number)
**Output:** true
**Explanation: **5 is a Number. The "instanceof" operator may return false. However, it is considered an instance of Number because it can access Number methods like "toFixed()".
```