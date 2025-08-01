```html
<h2><a href="https://leetcode.com/problems/to-be-or-not-to-be">2704. To Be or Not to Be</a></h2><h3>Easy</h3><hr><p>Implement the <code>expect</code> function to allow developers to test their code. This function should take an arbitrary value <code>val</code> and return an object that performs the following two functionalities.</p>

<ul>
	<li><code>toBe(val)</code> takes another value and returns <code>true</code> if both values are strictly equal (using <code>===</code>). If they are not equal, it should throw an error with the message <code>"Not Equal"</code>.</li>
	<li><code>notToBe(val)</code> takes another value and returns <code>true</code> if both values are strictly different (using <code>!==</code>). If they are equal, it should throw an error with the message <code>"Equal"</code>.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> func = () =&gt; expect(5).toBe(5)
<strong>Output:</strong> {"value": true}
<strong>Explanation:</strong> Since 5 === 5, this expression returns true.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> func = () =&gt; expect(5).toBe(null)
<strong>Output:</strong> {"error": "Not Equal"}
<strong>Explanation:</strong> Since 5 !== null, this expression throws a "Not Equal" error.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre>
<strong>Input:</strong> func = () =&gt; expect(5).notToBe(null)
<strong>Output:</strong> {"value": true}
<strong>Explanation:</strong> Since 5 !== null, this expression returns true.
</pre>
```