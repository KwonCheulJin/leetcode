```html
<h2><a href="https://leetcode.com/problems/counter">2620. Counter</a></h2><h3>Easy</h3><hr><p>Given an integer <code>n</code>, return a function <code>counter</code>. This <code>counter</code> function initially returns <code>n</code>, and then every time it is called, it returns a value that is one greater than the previous value (<code>n</code>, <code>n + 1</code>, <code>n + 2</code>, etc.).</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> 
n = 10 
[&quot;call&quot;,&quot;call&quot;,&quot;call&quot;]
<strong>Output:</strong> [10,11,12]
<strong>Explanation:</strong> 
counter() = 10 // returns n when counter() is first called.
counter() = 11 // returns 1 more than the previous call.
counter() = 12 // returns 1 more than the previous call.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> 
n = -2
[&quot;call&quot;,&quot;call&quot;,&quot;call&quot;,&quot;call&quot;,&quot;call&quot;]
<strong>Output:</strong> [-2,-1,0,1,2]
<strong>Explanation:</strong> counter() initially returns -2. It then increments with each call.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>-1000 &lt;= n &lt;= 1000</code></li>
	<li><code>0 &lt;= calls.length &lt;= 1000</code></li>
	<li><code>calls[i] === &quot;call&quot;</code></li>
</ul>
```