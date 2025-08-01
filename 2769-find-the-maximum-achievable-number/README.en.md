<h2><a href="https://leetcode.com/problems/find-the-maximum-achievable-number">2769. Find the Maximum Achievable Number</a></h2><h3>Easy</h3><hr><p>Two integers <code>num</code> and <code>t</code> are given. A <strong>maximum achievable number</strong> is defined as a number that can be made equal to <code>num</code> after applying the following operation:</p>

<ul>
	<li>Increase or decrease the number by <code>1</code>, while simultaneously increasing or decreasing <code>num</code> by <code>1</code>.</li>
</ul>

<p>Return the <strong>maximum achievable number</strong> after applying the operation at most <code>t</code> times.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">num = 4, t = 1</span></p>

<p><strong>Output:</strong> <span class="example-io">6</span></p>

<p><strong>Explanation:</strong></p>

<p>By applying the operation once, we can make the maximum achievable number equal to <code>num</code>:</p>

<ul>
	<li>Decrease the maximum achievable number by 1, and increase <code>num</code> by 1.</li>
</ul>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">num = 3, t = 2</span></p>

<p><strong>Output:</strong> <span class="example-io">7</span></p>

<p><strong>Explanation:</strong></p>

<p>By applying the operation twice, we can make the maximum achievable number equal to <code>num</code>:</p>

<ul>
	<li>Decrease the maximum achievable number by 1, and increase <code>num</code> by 1.</li>
</ul>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= num, t &lt;= 50</code></li>
</ul>