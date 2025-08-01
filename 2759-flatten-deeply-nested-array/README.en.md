```html
<h2><a href="https://leetcode.com/problems/flatten-deeply-nested-array">2759. Flatten Deeply Nested Array</a></h2><h3>Medium</h3><hr><p><strong>A multi-dimensional</strong> array <code>arr</code> and a depth <code>n</code> are given, return the <strong>flattened</strong> version of the array.</p>

<p><strong>A multi-dimensional</strong> array is a recursive data structure that can contain integers or other <strong>multi-dimensional</strong> arrays.</p>

<p>A <strong>flattened</strong> array is a version of the array where some or all of the sub-arrays are removed and replaced with the actual elements of those sub-arrays. This flattening operation should only be performed when the current nesting depth is less than <code>n</code>. The depth of the first element of the array is considered to be <code>0</code>.</p>

<p>Do not use the built-in <code>Array.flat</code> method to solve this problem.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input</strong>
arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
n = 0
<strong>Output</strong>
[1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]

<strong>Explanation</strong>
When n=0 is passed, the original array is always returned. This is because the smallest depth of the sub-arrays (0) is not less than n=0. Therefore, no sub-arrays should be flattened.</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input</strong>
arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
n = 1
<strong>Output</strong>
[1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11], 12, 13, 14, 15]

<strong>Explanation</strong>
Sub-arrays starting with 4, 7, and 13 are all flattened. This is because their depth is 0. However, [9, 10, 11] is not flattened because its depth is 1.</pre>

<p><strong class="example">Example 3:</strong></p>

<pre>
<strong>Input</strong>
arr = [[1, 2, 3], [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
n = 2
<strong>Output</strong>
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

<strong>Explanation</strong>
The maximum depth of all sub-arrays is 1. Therefore, all are flattened.</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>0 &lt;= number of elements in arr &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= number of sub-arrays in arr &lt;= 10<sup>5</sup></code></li>
	<li><code>maxDepth &lt;= 1000</code></li>
	<li><code>-1000 &lt;= each number &lt;= 1000</code></li>
	<li><code><font face="monospace">0 &lt;= n &lt;= 1000</font></code></li>
</ul>
```