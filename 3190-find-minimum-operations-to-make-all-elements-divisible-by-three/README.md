<h2><a href="https://leetcode.com/problems/find-minimum-operations-to-make-all-elements-divisible-by-three">3190. 모든 요소가 3으로 나누어지게 만들기 위한 최소 연산 찾기</a></h2><h3>쉬움</h3><hr><p>정수 배열 <code>nums</code>가 주어집니다. 한 번의 연산으로 <code>nums</code>의 <strong>어떠한</strong> 요소에 1을 더하거나 뺄 수 있습니다.</p>

<p>모든 <code>nums</code> 요소를 3으로 나누어지게 만들기 위한 <strong>최소</strong> 연산 횟수를 반환하세요.</p>

<p>&nbsp;</p>
<p><strong class="example">예시 1:</strong></p>

<div class="example-block">
<p><strong>입력:</strong> <span class="example-io">nums = [1,2,3,4]</span></p>

<p><strong>출력:</strong> <span class="example-io">3</span></p>

<p><strong>설명:</strong></p>

<p>모든 배열 요소는 3번의 연산으로 3으로 나누어지게 만들 수 있습니다:</p>

<ul>
	<li>1에서 1을 뺍니다.</li>
	<li>2에 1을 더합니다.</li>
	<li>4에서 1을 뺍니다.</li>
</ul>
</div>

<p><strong class="example">예시 2:</strong></p>

<div class="example-block">
<p><strong>입력:</strong> <span class="example-io">nums = [3,6,9]</span></p>

<p><strong>출력:</strong> <span class="example-io">0</span></p>
</div>

<p>&nbsp;</p>
<p><strong>제약 조건:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 50</code></li>
	<li><code>1 &lt;= nums[i] &lt;= 50</code></li>
</ul>
