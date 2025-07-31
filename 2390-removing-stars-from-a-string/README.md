<h2><a href="https://leetcode.com/problems/removing-stars-from-a-string">2390. Removing Stars from a String</a></h2><h3>Medium</h3><hr><p>Given a string <code>s</code> which includes stars <code>*</code>, you can perform the following operation in one move:</p>

<ul>
	<li>Choose a star in <code>s</code>.</li>
	<li>Remove the closest <strong>non-star</strong> character to the left of the chosen star, and also remove the star itself.</li>
</ul>

<p>Return the string after all the <strong>stars</strong> have been removed.</p>

<p><strong>Note:</strong></p>

<ul>
	<li>The input will be generated such that the operation is always possible.</li>
	<li>It can be shown that the resulting string will always be unique.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> s = &quot;leet**cod*e&quot;
<strong>Output:</strong> &quot;lecoe&quot;
<strong>Explanation:</strong> Performing the removals from left to right:
- The closest character to the 1st star is &#39;t&#39; in &quot;lee<strong><u>t</u></strong>**cod*e&quot;.  <code>s</code> becomes &quot;lee*cod*e&quot;.
- The closest character to the 2nd star is &#39;e&#39; in &quot;le<strong><u>e</u></strong>*cod*e&quot;. <code>s</code> becomes &quot;lecod*e&quot;.
- The closest character to the 3rd star is &#39;d&#39; in &quot;leco<strong><u>d</u></strong>*e&quot;. <code>s</code> becomes &quot;lecoe&quot;.
Return &quot;lecoe&quot; after all stars have been removed.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> s = &quot;erase*****&quot;
<strong>Output:</strong> &quot;&quot;
<strong>Explanation:</strong> The entire string is removed, therefore return an empty string.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s</code> consists of lowercase English letters and stars <code>*</code>.</li>
	<li>The operation above can be performed on <code>s</code>.</li>
</ul>