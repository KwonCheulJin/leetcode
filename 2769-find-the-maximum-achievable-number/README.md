<h2><a href="https://leetcode.com/problems/find-the-maximum-achievable-number">2769. 최대 달성 가능한 수 찾기</a></h2><h3>쉬움</h3><hr><p>두 정수 <code>num</code>과 <code>t</code>가 주어집니다. 다음과 같은 연산을 적용하여 <code>num</code>과 같게 만들 수 있으면 그 수는 <strong>달성 가능한 수</strong>입니다:</p>

<ul>
	<li>수를 <code>1</code> 증가시키거나 감소시키고 동시에 <code>num</code>을 <code>1</code> 증가시키거나 감소시킵니다.</li>
</ul>

<p>최대 <code>t</code>번 연산을 적용한 후 <strong>최대 달성 가능한 수</strong>를 반환하세요.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<div class="example-block">
<p><strong>입력:</strong> <span class="example-io">num = 4, t = 1</span></p>

<p><strong>출력:</strong> <span class="example-io">6</span></p>

<p><strong>설명:</strong></p>

<p>최대 달성 가능한 수를 <code>num</code>과 같게 만들기 위해 다음 연산을 한 번 적용하세요:</p>

<ul>
	<li>최대 달성 가능한 수를 1 감소시키고 <code>num</code>을 1 증가시킵니다.</li>
</ul>
</div>

<p><strong class="example">예제 2:</strong></p>

<div class="example-block">
<p><strong>입력:</strong> <span class="example-io">num = 3, t = 2</span></p>

<p><strong>출력:</strong> <span class="example-io">7</span></p>

<p><strong>설명:</strong></p>

<p>최대 달성 가능한 수를 <code>num</code>과 같게 만들기 위해 다음 연산을 두 번 적용하세요:</p>

<ul>
	<li>최대 달성 가능한 수를 1 감소시키고 <code>num</code>을 1 증가시킵니다.</li>
</ul>
</div>

<p>&nbsp;</p>
<p><strong>제약 조건:</strong></p>

<ul>
	<li><code>1 &lt;= num, t&nbsp;&lt;= 50</code></li>
</ul>