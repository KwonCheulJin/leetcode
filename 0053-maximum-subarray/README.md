<h2><a href="https://leetcode.com/problems/maximum-subarray">53. 최대 부분 배열</a></h2><h3>중간</h3><hr><p>정수 배열 <code>nums</code>가 주어질 때, 가장 큰 합을 가지는 <span data-keyword="subarray-nonempty">부분 배열</span>을 찾아 <em>그 합</em>을 반환하세요.</p>

<p>&nbsp;</p>
<p><strong class="example">예시 1:</strong></p>

<pre>
<strong>입력:</strong> nums = [-2,1,-3,4,-1,2,1,-5,4]
<strong>출력:</strong> 6
<strong>설명:</strong> 부분 배열 [4,-1,2,1]이 가장 큰 합 6을 가집니다.
</pre>

<p><strong class="example">예시 2:</strong></p>

<pre>
<strong>입력:</strong> nums = [1]
<strong>출력:</strong> 1
<strong>설명:</strong> 부분 배열 [1]이 가장 큰 합 1을 가집니다.
</pre>

<p><strong class="example">예시 3:</strong></p>

<pre>
<strong>입력:</strong> nums = [5,4,-1,7,8]
<strong>출력:</strong> 23
<strong>설명:</strong> 부분 배열 [5,4,-1,7,8]이 가장 큰 합 23을 가집니다.
</pre>

<p>&nbsp;</p>
<p><strong>제약사항:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>
</ul>

<p>&nbsp;</p>
<p><strong>추가 문제:</strong> 만약 <code>O(n)</code> 해법을 알아낸 경우, <strong>분할 정복</strong> 접근 방법을 사용하여 더 미묘한 해결책을 코딩해보세요.</p>
