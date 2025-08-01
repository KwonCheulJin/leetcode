```html
<h2><a href="https://leetcode.com/problems/removing-stars-from-a-string">2390. Removing Stars from a String</a></h2><h3>Medium</h3><hr><p>Given a string <code>s</code> containing stars <code>*</code>, you can perform the following operation until there are no stars left:</p>

<ul>
	<li>Choose a star in the string <code>s</code>.</li>
	<li>Remove the closest <strong>non-star</strong> character to the left of the star, and also remove the star itself.</li>
</ul>

<p>Return the string after all the stars have been removed.</p>

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
- The closest character to the first star is &quot;lee<strong><u>t</u></strong>**cod*e&quot;, removing &#39;t&#39; leaves &quot;lee*cod*e&quot;.
- The closest character to the second star is &quot;le<strong><u>e</u></strong>*cod*e&quot;, removing &#39;e&#39; leaves &quot;lecod*e&quot;.
- The closest character to the third star is &quot;leco<strong><u>d</u></strong>*e&quot;, removing &#39;d&#39; leaves &quot;lecoe&quot;.
Now there are no stars, and &quot;lecoe&quot; is returned.</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> s = &quot;erase*****&quot;
<strong>Output:</strong> &quot;&quot;
<strong>Explanation:</strong> All characters are removed, returning an empty string.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s</code> consists of lowercase English letters and stars <code>*</code>.</li>
	<li>The operation can be performed on <code>s</code>.</li>
</ul>
```