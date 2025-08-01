```html
<h2><a href="https://leetcode.com/problems/calculator-with-method-chaining">2726. Calculator with Method Chaining</a></h2><h3>Easy</h3><hr><p>Design a <code>Calculator</code> class. This class should provide addition, subtraction, multiplication, division, and exponentiation operations. It should also allow for method chaining to perform consecutive operations. The constructor of the <code>Calculator</code> class accepts a number, which serves as the initial value of <code>result</code>.</p>

<p><font face="monospace"><code>Calculator</code>&nbsp;</font>class should have the following methods:</p>

<ul>
	<li><code>add</code> - A method that adds the given number <code>value</code> to <code>result</code> and returns the updated <code>Calculator</code>.</li>
	<li><code>subtract</code> - A method that subtracts <code>value</code> from <code>result</code> and returns the updated <code>Calculator</code>.</li>
	<li><code>multiply</code> - A method that multiplies <code>result</code> by <code>value</code> and returns the updated <code>Calculator</code>.</li>
	<li><code>divide</code> - A method that divides <code>result</code> by <code>value</code> and returns the updated <code>Calculator</code>. If the provided value is <code>0</code>, it should throw an error with the message <code>&quot;Division by zero is not allowed&quot;</code>.</li>
	<li><code>power</code> - A method that raises <code>result</code> to the power of <code>value</code> and returns the updated <code>Calculator</code>.</li>
	<li><code>getResult</code> - A method that returns <code>result</code>.</li>
</ul>

<p>The result is considered accurate if it is within <code>10<sup>-5</sup></code> of the actual result.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong>
actions = ["Calculator", "add", "subtract", "getResult"],
values = [10, 5, 7]
<strong>Output:</strong> 8
<strong>Explanation:</strong>
new Calculator(10).add(5).subtract(7).getResult() // 10 + 5 - 7 = 8
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong>
actions = ["Calculator", "multiply", "power", "getResult"],
values = [2, 5, 2]
<strong>Output:</strong> 100
<strong>Explanation:</strong>
new Calculator(2).multiply(5).power(2).getResult() // (2 * 5) ^ 2 = 100
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre>
<strong>Input:</strong>
actions = ["Calculator", "divide", "getResult"],
values = [20, 0]
<strong>Output:</strong> "Division by zero is not allowed"
<strong>Explanation:</strong>
new Calculator(20).divide(0).getResult() // 20 / 0

An error should occur because division by zero is not allowed.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>actions</code> is a valid JSON string array</li>
	<li><code>values</code> is a valid JSON number array</li>
	<li><code>2 &lt;= actions.length &lt;= 2 * 10<sup>4</sup></code></li>
	<li><code>1 &lt;= values.length &lt;= 2 * 10<sup>4</sup>&nbsp;- 1</code></li>
	<li><code>actions[i]</code> is one of "Calculator", "add", "subtract", "multiply", "divide", "power", "getResult"</li>
	<li>The first action is always "Calculator".</li>
	<li>The last action is always "getResult".</li>
</ul>
```