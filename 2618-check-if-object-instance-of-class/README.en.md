```html
<h2><a href="https://leetcode.com/problems/check-if-object-instance-of-class">2618. Check if Object Instance of Class</a></h2><h3>Medium</h3><hr><p>Write a function that checks if a given value is an instance of a specific class or superclass. In this problem, an object is considered an instance of that class if it can access the methods of that class.</p>

<p>There are no restrictions on the data types that can be passed to the function. For example, the value or class may be <code>undefined</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> func = () =&gt; checkIfInstanceOf(new Date(), Date)
<strong>Output:</strong> true
<strong>Explanation: </strong>The object returned by the Date constructor is, by definition, an instance of Date.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> func = () =&gt; { class Animal {}; class Dog extends Animal {}; return checkIfInstanceOf(new Dog(), Animal); }
<strong>Output:</strong> true
<strong>Explanation:</strong>
class Animal {};
class Dog extends Animal {};
checkIfInstanceOf(new Dog(), Animal); // true

Dog is a subclass of Animal. Therefore, the Dog object is an instance of both Dog and Animal.</pre>

<p><strong class="example">Example 3:</strong></p>

<pre>
<strong>Input:</strong> func = () =&gt; checkIfInstanceOf(Date, Date)
<strong>Output:</strong> false
<strong>Explanation: </strong>The Date constructor cannot logically be an instance of itself.
</pre>

<p><strong class="example">Example 4:</strong></p>

<pre>
<strong>Input:</strong> func = () =&gt; checkIfInstanceOf(5, Number)
<strong>Output:</strong> true
<strong>Explanation: </strong>5 is a Number. The "instanceof" operator may return false. However, it is considered an instance of Number because it can access Number methods like "toFixed()".
</pre>
```