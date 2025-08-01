<h2><a href="https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number">1365. How Many Numbers Are Smaller Than the Current Number</a></h2><h3>Easy</h3><hr><p>Given an array <code>nums</code>, return an array representing how many numbers are smaller than each <code>nums[i]</code>. Specifically, for each <code>nums[i]</code>, count the number of valid <code>j</code>'s such that <code>j != i</code> <strong>and</strong> <code>nums[j] &lt; nums[i]</code>.</p>

<p>Return the answer as an array.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> nums = [8,1,2,2,3]
<strong>Output:</strong> [4,0,1,1,3]
<strong>Explanation:</strong>
For nums[0]=8, there are four numbers smaller than it (1, 2, 2, and 3).
For nums[1]=1, there are no numbers smaller than it.
For nums[2]=2, there is one number smaller than it (1).
For nums[3]=2, there is one number smaller than it (1).
For nums[4]=3, there are three numbers smaller than it (1, 2, and 2).
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> nums = [6,5,4,8]
<strong>Output:</strong> [2,1,0,3]
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre>
<strong>Input:</strong> nums = [7,7,7,7]
<strong>Output:</strong> [0,0,0,0]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= nums.length &lt;= 500</code></li>
	<li><code>0 &lt;= nums[i] &lt;= 100</code></li>
</ul>