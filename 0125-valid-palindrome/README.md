<h2><a href="https://leetcode.com/problems/valid-palindrome">125. Valid Palindrome</a></h2><h3>Easy</h3><hr><p>For a phrase to qualify as a <strong>palindrome</strong>, it must be read the same backward as forward after converting all uppercase letters to lowercase and removing all non-alphabetic characters except for alphabet letters and numbers.</p>

<p>Given a string <code>s</code>, return <code>true</code> if it is a <strong>palindrome</strong>, and <code>false</code> otherwise.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> s = &quot;A man, a plan, a canal: Panama&quot;
<strong>Output:</strong> true
<strong>Explanation:</strong> After conversion, &quot;amanaplanacanalpanama&quot; reads the same backward as forward.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> s = &quot;race a car&quot;
<strong>Output:</strong> false
<strong>Explanation:</strong> &quot;raceacar&quot; does not read the same backward as forward.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre>
<strong>Input:</strong> s = &quot; &quot;
<strong>Output:</strong> true
<strong>Explanation:</strong> With non-alphabetic characters removed, it becomes an empty string &quot;&quot;.
The empty string reads the same backward as forward, therefore it is a palindrome.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 2 * 10<sup>5</sup></code></li>
	<li><code>s</code> consists only of printable ASCII characters.</li>
</ul>