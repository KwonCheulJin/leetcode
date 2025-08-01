```html
<h2><a href="https://leetcode.com/problems/merge-sorted-array">88. Merge Sorted Array</a></h2><h3>Easy</h3><hr><p>Two integer arrays <code>nums1</code> and <code>nums2</code> are sorted in <strong>non-decreasing order</strong>, and <code>m</code> and <code>n</code> represent the number of elements in <code>nums1</code> and <code>nums2</code>, respectively.</p>

<p><strong>Merge</strong> <code>nums1</code> and <code>nums2</code> into a single array in non-decreasing order.</p>

<p>The final sorted array should not be returned by the function, but instead be stored inside the array <code>nums1</code>. To accommodate this, <code>nums1</code> has a length of <code>m + n</code>, where the first <code>m</code> elements are the elements to be merged, and the last <code>n</code> elements are initialized to <code>0</code> and should be ignored. The length of <code>nums2</code> is <code>n</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
<strong>Output:</strong> [1,2,2,3,5,6]
<strong>Explanation:</strong> The arrays to be merged are [1,2,3] and [2,5,6].
The merged result is [<u>1</u>,<u>2</u>,2,<u>3</u>,5,6], and the underlined elements come from nums1.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> nums1 = [1], m = 1, nums2 = [], n = 0
<strong>Output:</strong> [1]
<strong>Explanation:</strong> The arrays to be merged are [1] and [].
The merged result is [1].
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre>
<strong>Input:</strong> nums1 = [0], m = 0, nums2 = [1], n = 1
<strong>Output:</strong> [1]
<strong>Explanation:</strong> The arrays to be merged are [] and [1].
The merged result is [1].
Since m = 0, nums1 has no elements. The 0 is there to ensure the merged result fits into nums1.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>nums1.length == m + n</code></li>
	<li><code>nums2.length == n</code></li>
	<li><code>0 &lt;= m, n &lt;= 200</code></li>
	<li><code>1 &lt;= m + n &lt;= 200</code></li>
	<li><code>-10<sup>9</sup> &lt;= nums1[i], nums2[j] &lt;= 10<sup>9</sup></code></li>
</ul>

<p>&nbsp;</p>
<p><strong>Follow-up: </strong>Can you come up with an algorithm that runs in <code>O(m + n)</code> time?</p>
```