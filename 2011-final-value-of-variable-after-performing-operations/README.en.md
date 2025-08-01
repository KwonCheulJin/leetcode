```html
<h2><a href="https://leetcode.com/problems/final-value-of-variable-after-performing-operations/">2011. Final Value of Variable After Performing Operations</a></h2><h3>Easy</h3><hr><p>There is a programming language with <strong>four</strong> operations and <strong>one</strong> variable <code>X</code>:</p>

<ul>
	<li><code>++X</code> and <code>X++</code> increase the value of variable <code>X</code> by <code>1</code>.</li>
	<li><code>--X</code> and <code>X--</code> decrease the value of variable <code>X</code> by <code>1</code>.</li>
</ul>

<p>Initially, the value of <code>X</code> is <code>0</code>.</p>

<p>Given a string array <code>operations</code> that contains a list of operations, return the <strong>final</strong> value of <code>X</code> after performing all the operations.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> operations = ["--X","X++","X++"]
<strong>Output:</strong> 1
<strong>Explanation:</strong>&nbsp;The operations are performed as follows:
Initially, X = 0.
--X: X is decreased by 1, so X = 0 - 1 = -1.
X++: X is increased by 1, so X = -1 + 1 = 0.
X++: X is increased by 1, so X = 0 + 1 = 1.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> operations = ["++X","++X","X++"]
<strong>Output:</strong> 3
<strong>Explanation:</strong> The operations are performed as follows:
Initially, X = 0.
++X: X is increased by 1, so X = 0 + 1 = 1.
++X: X is increased by 1, so X = 1 + 1 = 2.
X++: X is increased by 1, so X = 2 + 1 = 3.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre>
<strong>Input:</strong> operations = ["X++","++X","--X","X--"]
<strong>Output:</strong> 0
<strong>Explanation:</strong>&nbsp;The operations are performed as follows:
Initially, X = 0.
X++: X is increased by 1, so X = 0 + 1 = 1.
++X: X is increased by 1, so X = 1 + 1 = 2.
--X: X is decreased by 1, so X = 2 - 1 = 1.
X--: X is decreased by 1, so X = 1 - 1 = 0.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= operations.length &lt;= 100</code></li>
	<li><code>operations[i]</code> is one of <code>"++X"</code>, <code>"X++"</code>, <code>"--X"</code>, <code>"X--"</code>.</li>
</ul>
```