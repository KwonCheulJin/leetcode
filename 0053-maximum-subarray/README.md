<h2><a href="https://leetcode.com/problems/maximum-subarray">53. 최대 부분 배열</a></h2><h3>중간</h3><hr><p>정수 배열 <code>nums</code>가 주어졌을 때, 가장 큰 합을 가지는 <span data-keyword="subarray-nonempty">부분 배열</span>을 찾아 <em>그 합</em>을 반환하시오.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> nums = [-2,1,-3,4,-1,2,1,-5,4]
<strong>출력:</strong> 6
<strong>설명:</strong> 부분 배열 [4,-1,2,1]은 가장 큰 합 6을 가집니다.
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> nums = [1]
<strong>출력:</strong> 1
<strong>설명:</strong> 부분 배열 [1]은 가장 큰 합 1을 가집니다.
</pre>

<p><strong class="example">예제 3:</strong></p>

<pre>
<strong>입력:</strong> nums = [5,4,-1,7,8]
<strong>출력:</strong> 23
<strong>설명:</strong> 부분 배열 [5,4,-1,7,8]은 가장 큰 합 23을 가집니다.
</pre>

<p>&nbsp;</p>
<p><strong>제약:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>
</ul>

<p>&nbsp;</p>
<p><strong>후속 작업:</strong> 만약 <code>O(n)</code> 해결책을 알아냈다면, 좀 더 미묘한 방법인 <strong>분할 정복</strong> 방법을 사용해 또 다른 해결책을 코딩해 보세요.</p>