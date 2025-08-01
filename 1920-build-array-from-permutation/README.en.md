```html
<h2><a href="https://leetcode.com/problems/build-array-from-permutation">1920. Build Array from Permutation</a></h2><h3>Easy</h3><hr><p>Given a <strong>0-indexed permutation</strong> array <code>nums</code> of length <strong>n</strong> (0-indexed), create an array <code>ans</code> of the same length such that <code>ans[i] = nums[nums[i]]</code> and return it.</p>

<p>A <strong>0-indexed permutation</strong> array <code>nums</code> consists of <strong>distinct</strong> integers from <code>0</code> to <code>nums.length - 1</code> (inclusive).</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> nums = [0,2,1,5,3,4]
<strong>Output:</strong> [0,1,2,4,5,3]
<strong>Explanation:</strong> The array ans is constructed as follows:
ans = [nums[nums[0]], nums[nums[1]], nums[nums[2]], nums[nums[3]], nums[nums[4]], nums[nums[5]]]
    = [nums[0], nums[2], nums[1], nums[5], nums[3], nums[4]]
    = [0,1,2,4,5,3]</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> nums = [5,0,1,2,3,4]
<strong>Output:</strong> [4,5,0,1,2,3]
<strong>Explanation:</strong> The array ans is constructed as follows:
ans = [nums[nums[0]], nums[nums[1]], nums[nums[2]], nums[nums[3]], nums[nums[4]], nums[nums[5]]]
    = [nums[5], nums[0], nums[1], nums[2], nums[3], nums[4]]
    = [4,5,0,1,2,3]</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 1000</code></li>
	<li><code>0 &lt;= nums[i] &lt; nums.length</code></li>
	<li>The elements of <code>nums</code> are <strong>distinct</strong>.</li>
</ul>

<p>&nbsp;</p>
<p><strong>Follow-up:</strong> Can you solve this problem without using extra space? (i.e., with <code>O(1)</code> memory complexity)</p>
```