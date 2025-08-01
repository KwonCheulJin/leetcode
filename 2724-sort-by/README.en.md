```html
<h2><a href="https://leetcode.com/problems/sort-by">2724. Sort By</a></h2><h3>Easy</h3><hr><p>Given an array <code>arr</code> and a function <code>fn</code>, return a sorted array <code>sortedArr</code>. The function <code>fn</code> is assumed to return numbers, which determine the sorting order of <code>sortedArr</code>. <code>sortedArr</code> should be sorted in <strong>ascending</strong> order based on the output of <code>fn</code>.</p>

<p>It can be assumed that the function <code>fn</code> does not return duplicate numbers for the given array.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> arr = [5, 4, 1, 2, 3], fn = (x) =&gt; x
<strong>Output:</strong> [1, 2, 3, 4, 5]
<strong>Explanation:</strong> Since fn returns the numbers as they are, the array is sorted in ascending order.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> arr = [{"x": 1}, {"x": 0}, {"x": -1}], fn = (d) =&gt; d.x
<strong>Output:</strong> [{"x": -1}, {"x": 0}, {"x": 1}]
<strong>Explanation:</strong> fn returns the value for the "x" key. Therefore, the array is sorted based on those values.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre>
<strong>Input:</strong> arr = [[3, 4], [5, 2], [10, 1]], fn = (x) =&gt; x[1]
<strong>Output:</strong> [[10, 1], [5, 2], [3, 4]]
<strong>Explanation:</strong> The array is sorted in ascending order based on the number at index=1.&nbsp;
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>arr</code> is a valid JSON array</li>
	<li><code>fn</code> is a function that returns a number</li>
	<li><code>1 &lt;= arr.length &lt;= 5 * 10<sup>5</sup></code></li>
</ul>
```