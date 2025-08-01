```html
<h2><a href="https://leetcode.com/problems/maximum-number-of-coins-you-can-get">1561. Maximum Number of Coins You Can Get</a></h2><h3>Medium</h3><hr><p>There are <code>3n</code> piles of coins of varying sizes. You and your friends will take the piles of coins as follows:</p>

<ul>
	<li>In each step, select <strong>any </strong><code>3</code> piles of coins (they do not have to be consecutive).</li>
	<li>Alice will choose the pile with the maximum number of coins from the selected piles.</li>
	<li>You will then choose the pile with the maximum number of coins from the remaining piles.</li>
	<li>Your friend Bob will take the last pile.</li>
	<li>This process is repeated until there are no more piles of coins.</li>
</ul>

<p>Given an integer array <code>piles</code>, where <code>piles[i]</code> represents the number of coins in the <code>i<sup>th</sup></code> pile.</p>

<p>Return the maximum number of coins you can get.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> piles = [2,4,1,2,7,8]
<strong>Output:</strong> 9
<strong>Explanation: </strong>Select the triplet (2, 7, 8). Alice chooses the pile with 8 coins, you choose the pile with <strong>7</strong> coins, and Bob takes the last pile.
Select the triplet (1, 2, 4). Alice chooses the pile with 4 coins, you choose the pile with <strong>2</strong> coins, and Bob takes the last pile.
The maximum number of coins you can get is: 7 + 2 = 9.
In contrast, if you select this array (1, <strong>2</strong>, 8), (2, <strong>4</strong>, 7), you would only get 2 + 4 = 6 coins, which is not optimal.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> piles = [2,4,5]
<strong>Output:</strong> 4
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre>
<strong>Input:</strong> piles = [9,8,7,6,5,1,2,3,4]
<strong>Output:</strong> 18
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>3 &lt;= piles.length &lt;= 10<sup>5</sup></code></li>
	<li><code>piles.length % 3 == 0</code></li>
	<li><code>1 &lt;= piles[i] &lt;= 10<sup>4</sup></code></li>
</ul>
```