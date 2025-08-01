```html
<h2><a href="https://leetcode.com/problems/generate-fibonacci-sequence">2648. Generate Fibonacci Sequence</a></h2><h3>Easy</h3><hr><p>Write a generator function that returns a generator object that produces the <strong>Fibonacci sequence</strong>.</p>

<p>The <strong>Fibonacci sequence</strong> is defined by the recurrence relation <code>X<sub>n</sub> = X<sub>n-1</sub> + X<sub>n-2</sub></code>.</p>

<p>The first few numbers in this series are <code>0, 1, 1, 2, 3, 5, 8, 13</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> callCount = 5
<strong>Output:</strong> [0,1,1,2,3]
<strong>Explanation:</strong>
const gen = fibGenerator();
gen.next().value; // 0
gen.next().value; // 1
gen.next().value; // 1
gen.next().value; // 2
gen.next().value; // 3
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> callCount = 0
<strong>Output:</strong> []
<strong>Explanation:</strong> gen.next() is not called, so nothing is output.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>0 &lt;= callCount &lt;= 50</code></li>
</ul>
```