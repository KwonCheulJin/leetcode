<h2><a href="https://leetcode.com/problems/rotate-array">189. Rotate Array</a></h2><h3>중간</h3><hr><p>정수 배열 <code>nums</code>가 주어졌을 때, 배열을 오른쪽으로 <code>k</code> 단계 회전시킵니다. 여기서 <code>k</code>는 음수가 아닙니다.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> nums = [1,2,3,4,5,6,7], k = 3
<strong>출력:</strong> [5,6,7,1,2,3,4]
<strong>설명:</strong>
1단계 오른쪽으로 회전: [7,1,2,3,4,5,6]
2단계 오른쪽으로 회전: [6,7,1,2,3,4,5]
3단계 오른쪽으로 회전: [5,6,7,1,2,3,4]
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> nums = [-1,-100,3,99], k = 2
<strong>출력:</strong> [3,99,-1,-100]
<strong>설명:</strong> 
1단계 오른쪽으로 회전: [99,-1,-100,3]
2단계 오른쪽으로 회전: [3,99,-1,-100]
</pre>

<p>&nbsp;</p>
<p><strong>제약 사항:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>
	<li><code>0 &lt;= k &lt;= 10<sup>5</sup></code></li>
</ul>

<p>&nbsp;</p>
<p><strong>고려 사항:</strong></p>

<ul>
	<li>이 문제를 해결하는 여러 가지 해결책을 구상해 보십시오. 최소 <strong>세 가지</strong> 방법이 있습니다.</li>
	<li><code>O(1)</code>의 추가 공간을 사용하여 in-place로 해결할 수 있습니까?</li>
</ul>