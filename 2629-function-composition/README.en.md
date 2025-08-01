```html
<h2><a href="https://leetcode.com/problems/function-composition">2629. Function Composition</a></h2><h3>Easy</h3><hr><p>Given an array of functions <code>[f<sub>1</sub>, f<sub>2</sub>, f<sub>3</sub>, ..., f<sub>n</sub>]</code>, return a new function <code>fn</code> which is the <strong>function composition</strong> of the array of functions.</p>

<p>The <strong>function composition</strong> of <code>[f(x), g(x), h(x)]</code> is <code>fn(x) = f(g(h(x)))</code>.</p>

<p>When the list of functions is empty, the <strong>function composition</strong> is the <strong>identity function</strong> <code>f(x) = x</code>.</p>

<p>It is assumed that each function in the array takes a single integer as input and returns a single integer as output.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> functions = [x =&gt; x + 1, x =&gt; x * x, x =&gt; 2 * x], x = 4
<strong>Output:</strong> 65
<strong>Explanation:</strong>
Evaluate from right to left...
Start with x = 4.
2 * (4) = 8
(8) * (8) = 64
(64) + 1 = 65
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> functions = [x =&gt; 10 * x, x =&gt; 10 * x, x =&gt; 10 * x], x = 1
<strong>Output:</strong> 1000
<strong>Explanation:</strong>
Evaluate from right to left...
10 * (1) = 10
10 * (10) = 100
10 * (100) = 1000
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre>
<strong>Input:</strong> functions = [], x = 42
<strong>Output:</strong> 42
<strong>Explanation:</strong>
The composition of 0 functions is the identity function.</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code><font face="monospace">-1000 &lt;= x &lt;= 1000</font></code></li>
	<li><code><font face="monospace">0 &lt;= functions.length &lt;= 1000</font></code></li>
	<li>All functions accept and return a single integer</li>
</ul>
```