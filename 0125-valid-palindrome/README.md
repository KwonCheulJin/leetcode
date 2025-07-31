<h2><a href="https://leetcode.com/problems/valid-palindrome">125. Valid Palindrome</a></h2><h3>Easy</h3><hr><p>To determine if a phrase is a <strong>palindrome</strong>, convert all uppercase letters into lowercase letters, remove all non-alphabetic characters except for letters and numbers, and then check if it reads the same forwards and backwards. Alphabetic characters include both letters and numbers.</p>

<p>Given a string <code>s</code>, return <code>true</code> if it is a <strong>palindrome</strong>; otherwise, return <code>false</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> s = &quot;A man, a plan, a canal: Panama&quot;
<strong>Output:</strong> true
<strong>Explanation:</strong> &quot;amanaplanacanalpanama&quot; is a palindrome.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> s = &quot;race a car&quot;
<strong>Output:</strong> false
<strong>Explanation:</strong> &quot;raceacar&quot; is not a palindrome.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre>
<strong>Input:</strong> s = &quot; &quot;
<strong>Output:</strong> true
<strong>Explanation:</strong> After removing non-alphabetic characters, the string becomes an empty string &quot;&quot;.
An empty string reads the same forwards and backwards, thus it is a palindrome.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 2 * 10<sup>5</sup></code></li>
	<li><code>s</code> consists only of printable ASCII characters.</li>
</ul>