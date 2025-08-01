```html
<h2><a href="https://leetcode.com/problems/memoize">2731. Memoize</a></h2><h3>Medium</h3><hr><p>Given a function <code>fn</code>, return its <strong>memoized</strong> version.</p>

<p>A <strong>memoized</strong> function does not get called twice with the same input. Instead, it returns the cached value.</p>

<p>There are <strong>3</strong> possible input functions: <code>sum</code><strong>, </strong><code>fib</code><strong>, </strong>and&nbsp;<code>factorial</code><strong>.</strong></p>

<ul>
	<li><code>sum</code><strong>&nbsp;</strong>takes two integers&nbsp;<code>a</code> and <code>b</code> and returns <code>a + b</code>. If there is no cached value for the arguments <code>(b, a)</code>, it cannot be used for a call with <code>(a, b)</code>. For example, if the arguments are <code>(3, 2)</code> and <code>(2, 3)</code>, two different calls must be made.</li>
	<li><code>fib</code><strong>&nbsp;</strong>takes a single integer&nbsp;<code>n</code> and returns <code>1</code> if&nbsp;<code>n &lt;= 1</code>, otherwise it returns&nbsp;<code>fib(n - 1) + fib(n - 2)</code>.</li>
	<li><code>factorial</code>&nbsp;takes a single integer&nbsp;<code>n</code> and returns <code>1</code>&nbsp;if&nbsp;<code>n &lt;= 1</code>, otherwise it returns&nbsp;<code>factorial(n - 1) * n</code>.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong>
fnName = &quot;sum&quot;
actions = [&quot;call&quot;,&quot;call&quot;,&quot;getCallCount&quot;,&quot;call&quot;,&quot;getCallCount&quot;]
values = [[2,2],[2,2],[],[1,2],[]]
<strong>Output:</strong> [4, 4, 1, 3, 2]
<strong>Explanation:</strong>
const sum = (a, b) =&gt; a + b;
const memoizedSum = memoize(sum);
memoizedSum(2, 2); // &quot;call&quot; - returns 4. (2, 2) was not seen before, so sum() was called.
memoizedSum(2, 2); // &quot;call&quot; - returns 4. But since the same input was seen before, sum() was not called.
// &quot;getCallCount&quot; - total call count: 1
memoizedSum(1, 2); // &quot;call&quot; - returns 3. (1, 2) was not seen before, so sum() was called.
// &quot;getCallCount&quot; - total call count: 2
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:
</strong>fnName = &quot;factorial&quot;
actions = [&quot;call&quot;,&quot;call&quot;,&quot;call&quot;,&quot;getCallCount&quot;,&quot;call&quot;,&quot;getCallCount&quot;]
values = [[2],[3],[2],[],[3],[]]
<strong>Output:</strong> [2, 6, 2, 2, 6, 2]
<strong>Explanation:</strong>
const factorial = (n) =&gt; (n &lt;= 1) ? 1 : (n * factorial(n - 1));
const memoFactorial = memoize(factorial);
memoFactorial(2); // &quot;call&quot; - returns 2.
memoFactorial(3); // &quot;call&quot; - returns 6.
memoFactorial(2); // &quot;call&quot; - returns 2. But since 2 was seen before, factorial was not called.
// &quot;getCallCount&quot; - total call count: 2
memoFactorial(3); // &quot;call&quot; - returns 6. But since 3 was seen before, factorial was not called.
// &quot;getCallCount&quot; - total call count: 2
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre>
<strong>Input:
</strong>fnName = &quot;fib&quot;
actions = [&quot;call&quot;,&quot;getCallCount&quot;]
values = [[5],[]]
<strong>Output:</strong> [8,1]
<strong>Explanation:
</strong>fib(5) = 8 // &quot;call&quot;
// &quot;getCallCount&quot; - total call count: 1
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>0 &lt;= a, b &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= n &lt;= 10</code></li>
	<li><code>1 &lt;= actions.length &lt;= 10<sup>5</sup></code></li>
	<li><code>actions.length === values.length</code></li>
	<li><code>actions[i]</code> is either &quot;call&quot; or &quot;getCallCount&quot;.</li>
	<li><code>fnName</code> is one of &quot;sum&quot;, &quot;factorial&quot;, and&nbsp;&quot;fib&quot;.</li>
</ul>
```