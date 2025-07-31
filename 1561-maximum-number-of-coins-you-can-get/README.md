<h2><a href="https://leetcode.com/problems/maximum-number-of-coins-you-can-get">1561. 당신이 얻을 수 있는 최대 동전 수</a></h2><h3>중간</h3><hr><p><code>3n</code>개의 크기가 다양한 동전 더미가 있으며, 당신과 친구들이 다음과 같이 동전 더미를 가져갈 것입니다:</p>

<ul>
	<li>각 단계에서 <strong>임의의</strong> <code>3</code>개의 동전 더미를 선택합니다(반드시 연속적일 필요는 없음).</li>
	<li>당신이 선택하면, Alice가 동전이 가장 많은 더미를 고릅니다.</li>
	<li>다음으로 동전이 많은 더미를 당신이 고릅니다.</li>
	<li>당신의 친구 Bob은 마지막 더미를 고릅니다.</li>
	<li>동전 더미가 더 이상 없을 때까지 반복합니다.</li>
</ul>

<p>각 <code>piles[i]</code>가 <code>i<sup>번째</sup></code> 더미에 있는 동전의 수인 정수 배열 <code>piles</code>이 주어질 때,</p>

<p>당신이 가질 수 있는 최대 동전 수를 반환하세요.</p>

<p>&nbsp;</p>
<p><strong class="example">예시 1:</strong></p>

<pre>
<strong>입력:</strong> piles = [2,4,1,2,7,8]
<strong>출력:</strong> 9
<strong>설명: </strong>단체 (2, 7, 8)을 선택하고, Alice가 8개의 동전이 있는 더미를 고르고, 당신이 <strong>7</strong>개의 동전이 있는 더미를 고르고, Bob이 마지막 더미를 고릅니다.
단체 (1, 2, 4)를 선택하고, Alice가 4개의 동전이 있는 더미를 고르고, 당신이 <strong>2</strong>개의 동전이 있는 더미를 고르고, Bob이 마지막 더미를 고릅니다.
당신이 가질 수 있는 최대 동전 수는: 7 + 2 = 9 입니다.
다른 한편으로, 이 배열 (1, <strong>2</strong>, 8), (2, <strong>4</strong>, 7)를 선택하면, 2 + 4 = 6 동전밖에 얻을 수 없으며 이는 최적이 아닙니다.
</pre>

<p><strong class="example">예시 2:</strong></p>

<pre>
<strong>입력:</strong> piles = [2,4,5]
<strong>출력:</strong> 4
</pre>

<p><strong class="example">예시 3:</strong></p>

<pre>
<strong>입력:</strong> piles = [9,8,7,6,5,1,2,3,4]
<strong>출력:</strong> 18
</pre>

<p>&nbsp;</p>
<p><strong>제약 사항:</strong></p>

<ul>
	<li><code>3 &lt;= piles.length &lt;= 10<sup>5</sup></code></li>
	<li><code>piles.length % 3 == 0</code></li>
	<li><code>1 &lt;= piles[i] &lt;= 10<sup>4</sup></code></li>
</ul>