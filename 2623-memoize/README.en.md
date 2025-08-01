```html
<h2><a href="https://leetcode.com/problems/memoize">2623. Memoize</a></h2><h3>Medium</h3><hr><p>Given a function <code>fn</code>, return a <strong>memoized</strong> version of that function.</p>

<p>A <strong>memoized</strong> function is one that does not get called twice with the same input values. Instead, it returns cached values.</p>

<p>It is assumed that the input function can be one of <strong>3</strong> types: <code>sum</code><strong>, </strong><code>fib</code><strong>, </strong>and <code>factorial</code><strong>.</strong></p>

<ul>
	<li><code>sum</code><strong> </strong>takes two integers <code>a</code> and <code>b</code> and returns <code>a + b</code>. If there is already a cached value for the arguments <code>(b, a)</code> when <code>a != b</code>, it cannot be used for the arguments <code>(a, b)</code>. For example, if the arguments are <code>(3, 2)</code> and <code>(2, 3)</code>, two separate calls must be made.</li>
	<li><code>fib</code><strong> </strong>takes a single integer <code>n</code> and returns <code>1</code> if <code>n &lt;= 1</code>, otherwise it returns <code>fib(n - 1) + fib(n - 2)</code>.</li>
	<li><code>factorial</code> takes a single integer <code>n</code> and returns <code>1</code> if <code>n &lt;= 1</code>, otherwise it returns <code>factorial(n - 1) * n</code>.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong>
fnName = &quot;sum&quot;
actions = [&quot;call&quot;,&quot;call&quot;,&quot;getCallCount&quot;,&quot;call&quot;,&quot;getCallCount&quot;]
values = [[2,2],[2,2],[],[1,2],[]]
<strong>Output:</strong> [4,4,1,3,2]
<strong>Explanation:</strong>
const sum = (a, b) =&gt; a + b;
const memoizedSum = memoize(sum);
memoizedSum(2, 2); // &quot;call&quot; - returns 4. (2, 2) has not been seen before, so sum() was called.
memoizedSum(2, 2); // &quot;call&quot; - returns 4. However, since the same input has been seen before, sum() was not called.
// &quot;getCallCount&quot; - total call count: 1
memoizedSum(1, 2); // &quot;call&quot; - returns 3. (1, 2) has not been seen before, so sum() was called.
// &quot;getCallCount&quot; - total call count: 2
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:
</strong>fnName = &quot;factorial&quot;
actions = [&quot;call&quot;,&quot;call&quot;,&quot;call&quot;,&quot;getCallCount&quot;,&quot;call&quot;,&quot;getCallCount&quot;]
values = [[2],[3],[2],[],[3],[]]
<strong>Output:</strong> [2,6,2,2,6,2]
<strong>Explanation:</strong>
const factorial = (n) =&gt; (n &lt;= 1) ? 1 : (n * factorial(n - 1));
const memoFactorial = memoize(factorial);
memoFactorial(2); // &quot;call&quot; - returns 2.
memoFactorial(3); // &quot;call&quot; - returns 6.
memoFactorial(2); // &quot;call&quot; - returns 2. However, since 2 has been seen before, factorial was not called.
// &quot;getCallCount&quot; - total call count: 2
memoFactorial(3); // &quot;call&quot; - returns 6. However, since 3 has been seen before, factorial was not called.
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
	<li><code>fnName</code> is one of &quot;sum&quot;, &quot;factorial&quot;, &quot;fib&quot;.</li>
</ul>
```