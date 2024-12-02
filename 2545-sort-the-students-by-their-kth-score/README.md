<h2><a href="https://leetcode.com/problems/sort-the-students-by-their-kth-score">2545. 학생들을 해당하는 k번째 점수로 정렬하기</a></h2><h3>중간</h3><hr><p><code>m</code>명의 학생과 <code>n</code>개의 시험이 있는 반이 있습니다. <strong>0-인덱스</strong> <code>m x n</code> 정수 행렬 <code>score</code>가 주어졌으며, 각 행은 한 학생을 나타내고 <code>score[i][j]</code>는 <code>i<sup>th</sup></code> 학생이 <code>j<sup>th</sup></code> 시험에서 받은 점수를 나타냅니다. 행렬 <code>score</code>는 <strong>서로 다른</strong> 정수만 포함합니다.</p>

<p>또한 정수 <code>k</code>가 주어집니다. <code>k<sup>th</sup></code> (<strong>0-인덱스</strong>) 시험에서의 점수를 기준으로 학생들(즉, 행렬의 행들)을 높은 점수에서 낮은 점수 순으로 정렬하십시오.</p>

<p>정렬 후의 행렬을 반환하십시오.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/11/30/example1.png" style="width: 600px; height: 136px;" />
<pre>
<strong>입력:</strong> score = [[10,6,9,1],[7,5,11,2],[4,8,3,15]], k = 2
<strong>출력:</strong> [[7,5,11,2],[10,6,9,1],[4,8,3,15]]
<strong>설명:</strong> 위의 그림에서 S는 학생을, E는 시험을 나타냅니다.
- 인덱스 1인 학생이 시험 2에서 11점을 받아 가장 높은 점수를 받아 1등을 했습니다.
- 인덱스 0인 학생은 시험 2에서 9점을 받아 두 번째로 높은 점수를 받아 2등을 했습니다.
- 인덱스 2인 학생은 시험 2에서 3점을 받아 가장 낮은 점수를 받아 3등을 했습니다.
</pre>

<p><strong class="example">예제 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/11/30/example2.png" style="width: 486px; height: 121px;" />
<pre>
<strong>입력:</strong> score = [[3,4],[5,6]], k = 0
<strong>출력:</strong> [[5,6],[3,4]]
<strong>설명:</strong> 위의 그림에서 S는 학생을, E는 시험을 나타냅니다.
- 인덱스 1인 학생이 시험 0에서 5점을 받아 가장 높은 점수를 받아 1등을 했습니다.
- 인덱스 0인 학생은 시험 0에서 3점을 받아 가장 낮은 점수를 받아 2등을 했습니다.
</pre>

<p>&nbsp;</p>
<p><strong>제약 사항:</strong></p>

<ul>
	<li><code>m == score.length</code></li>
	<li><code>n == score[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 250</code></li>
	<li><code>1 &lt;= score[i][j] &lt;= 10<sup>5</sup></code></li>
	<li><code>score</code>는 <strong>서로 다른</strong> 정수들로 이루어져 있습니다.</li>
	<li><code>0 &lt;= k &lt; n</code></li>
</ul>