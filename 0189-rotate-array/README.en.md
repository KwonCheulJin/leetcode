<h2><a href="https://leetcode.com/problems/rotate-array">189. Rotate Array</a></h2><h3>Medium</h3><hr><p>Given an integer array <code>nums</code>, rotate the array to the right by <code>k</code> steps, where <code>k</code> is a non-negative integer.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> nums = [1,2,3,4,5,6,7], k = 3
<strong>Output:</strong> [5,6,7,1,2,3,4]
<strong>Explanation:</strong>
After rotating the array to the right by 1 step: [7,1,2,3,4,5,6]
After rotating the array to the right by 2 steps: [6,7,1,2,3,4,5]
After rotating the array to the right by 3 steps: [5,6,7,1,2,3,4]
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> nums = [-1,-100,3,99], k = 2
<strong>Output:</strong> [3,99,-1,-100]
<strong>Explanation:</strong>
After rotating the array to the right by 1 step: [99,-1,-100,3]
After rotating the array to the right by 2 steps: [3,99,-1,-100]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>
	<li><code>0 &lt;= k &lt;= 10<sup>5</sup></code></li>
</ul>

<p>&nbsp;</p>
<p><strong>Follow-up:</strong></p>

<ul>
	<li>Try to come up with as many solutions as you can for this problem. There are at least <strong>three</strong> different ways to solve it.</li>
	<li>Can you solve it in-place with <code>O(1)</code> extra space?</li>
</ul>