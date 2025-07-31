<h2><a href="https://leetcode.com/problems/rotate-array">189. Rotate Array</a></h2><h3>중간</h3><hr><p>정수 배열 <code>nums</code>가 주어질 때, 배열을 <code>k</code>번 오른쪽으로 회전하세요. 여기서 <code>k</code>는 음수가 아닙니다.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> nums = [1,2,3,4,5,6,7], k = 3
<strong>출력:</strong> [5,6,7,1,2,3,4]
<strong>설명:</strong>
오른쪽으로 1번 회전합니다: [7,1,2,3,4,5,6]
오른쪽으로 2번 회전합니다: [6,7,1,2,3,4,5]
오른쪽으로 3번 회전합니다: [5,6,7,1,2,3,4]
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> nums = [-1,-100,3,99], k = 2
<strong>출력:</strong> [3,99,-1,-100]
<strong>설명:</strong> 
오른쪽으로 1번 회전합니다: [99,-1,-100,3]
오른쪽으로 2번 회전합니다: [3,99,-1,-100]
</pre>

<p>&nbsp;</p>
<p><strong>제약 조건:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>
	<li><code>0 &lt;= k &lt;= 10<sup>5</sup></code></li>
</ul>

<p>&nbsp;</p>
<p><strong>추가 과제:</strong></p>

<ul>
	<li>가능한 많은 해결책을 생각해 보세요. 적어도 <strong>세 가지</strong> 다른 방법이 있습니다.</li>
	<li><code>O(1)</code>의 추가 공간으로 제자리에서 해결할 수 있습니까?</li>
</ul>