```html
<h2><a href="https://leetcode.com/problems/convert-the-temperature">2469. Convert the Temperature</a></h2><h3>Easy</h3><hr><p>A non-negative floating-point number <code>celsius</code> rounded to two decimal places is given. This represents the <strong>Celsius temperature</strong>.</p>

<p>You need to convert the Celsius temperature to <strong>Kelvin</strong> and <strong>Fahrenheit</strong> and return them as an array <code>ans = [kelvin, fahrenheit]</code>.</p>

<p><em>Return the array <code>ans</code>.</em> Answers within <code>10<sup>-5</sup></code> of the actual answer will be accepted.</p>

<p><strong>Note:</strong></p>

<ul>
	<li><code>kelvin = celsius + 273.15</code></li>
	<li><code>fahrenheit = celsius * 1.80 + 32.00</code></li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> celsius = 36.50
<strong>Output:</strong> [309.65000,97.70000]
<strong>Explanation:</strong> Converting 36.50 Celsius to Kelvin results in 309.65, and converting it to Fahrenheit results in 97.70.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> celsius = 122.11
<strong>Output:</strong> [395.26000,251.79800]
<strong>Explanation:</strong> Converting 122.11 Celsius to Kelvin results in 395.26, and converting it to Fahrenheit results in 251.798.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>0 &lt;= celsius &lt;= 1000</code></li>
</ul>
```