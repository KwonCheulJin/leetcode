```html
<h2><a href="https://leetcode.com/problems/sort-the-students-by-their-kth-score">2545. Sort the Students by Their Kth Score</a></h2><h3>Medium</h3><hr><p>There is a class of <code>m</code> students and <code>n</code> exams. A <strong>0-indexed</strong> <code>m x n</code> integer matrix <code>score</code> is given, where each row represents a student and <code>score[i][j]</code> is the score of the <code>i<sup>th</sup></code> student in the <code>j<sup>th</sup></code> exam. The matrix <code>score</code> contains only <strong>distinct</strong> integers.</p>

<p>Additionally, an integer <code>k</code> is given. Sort the students (i.e., the rows of the matrix) based on their scores in the <code>k<sup>th</sup></code> (<strong>0-indexed</strong>) exam in descending order.</p>

<p>Return the matrix after sorting.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/11/30/example1.png" style="width: 600px; height: 136px;" />
<pre>
<strong>Input:</strong> score = [[10,6,9,1],[7,5,11,2],[4,8,3,15]], k = 2
<strong>Output:</strong> [[7,5,11,2],[10,6,9,1],[4,8,3,15]]
<strong>Explanation:</strong> In the above diagram, S represents students and E represents exams.
- The student at index 1 scored 11 in exam 2, achieving the highest score and ranked 1st.
- The student at index 0 scored 9 in exam 2, achieving the second highest score and ranked 2nd.
- The student at index 2 scored 3 in exam 2, achieving the lowest score and ranked 3rd.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/11/30/example2.png" style="width: 486px; height: 121px;" />
<pre>
<strong>Input:</strong> score = [[3,4],[5,6]], k = 0
<strong>Output:</strong> [[5,6],[3,4]]
<strong>Explanation:</strong> In the above diagram, S represents students and E represents exams.
- The student at index 1 scored 5 in exam 0, achieving the highest score and ranked 1st.
- The student at index 0 scored 3 in exam 0, achieving the lowest score and ranked 2nd.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>m == score.length</code></li>
	<li><code>n == score[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 250</code></li>
	<li><code>1 &lt;= score[i][j] &lt;= 10<sup>5</sup></code></li>
	<li><code>score</code> contains <strong>distinct</strong> integers.</li>
	<li><code>0 &lt;= k &lt; n</code></li>
</ul>
```