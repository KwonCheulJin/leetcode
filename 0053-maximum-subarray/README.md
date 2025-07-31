<h2><a href="https://leetcode.com/problems/maximum-subarray">53. Maximum Subarray</a></h2><h3>중간</h3><hr><p>정수 배열 <code>nums</code>가 주어졌을 때, 합이 가장 큰 <span data-keyword="subarray-nonempty">부분 배열</span>을 찾고, <em>그 합</em>을 반환하십시오.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> nums = [-2,1,-3,4,-1,2,1,-5,4]
<strong>출력:</strong> 6
<strong>설명:</strong> 부분 배열 [4,-1,2,1]의 합이 6으로 가장 큽니다.
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> nums = [1]
<strong>출력:</strong> 1
<strong>설명:</strong> 부분 배열 [1]의 합이 1로 가장 큽니다.
</pre>

<p><strong class="example">예제 3:</strong></p>

<pre>
<strong>입력:</strong> nums = [5,4,-1,7,8]
<strong>출력:</strong> 23
<strong>설명:</strong> 부분 배열 [5,4,-1,7,8]의 합이 23으로 가장 큽니다.
</pre>

<p>&nbsp;</p>
<p><strong>제약 조건:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>
</ul>

<p>&nbsp;</p>
<p><strong>추가 문제:</strong> <code>O(n)</code> 솔루션을 알아냈다면, <strong>분할 정복</strong> 접근법을 사용하여 좀 더 세밀한 솔루션을 구현해 보세요.</p>