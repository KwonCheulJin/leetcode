<h2><a href="https://leetcode.com/problems/maximum-number-of-coins-you-can-get">1561. 최대 동전 수익</a></h2><h3>중간 난이도</h3><hr><p><code>3n</code> 개의 다양한 크기의 동전 더미가 있고, 여러분과 친구들이 다음과 같이 동전 더미를 가져가게 됩니다:</p>

<ul>
	<li>각 단계에서, 여러분은 <strong>아무</strong> <code>3</code> 개의 동전 더미를 선택합니다 (반드시 연속할 필요는 없습니다).</li>
	<li>선택한 더미 중에서, 앨리스는 가장 많은 동전이 있는 더미를 선택합니다.</li>
	<li>여러분은 두 번째로 많은 동전이 있는 더미를 선택합니다.</li>
	<li>여러분의 친구 밥은 마지막 남은 더미를 선택합니다.</li>
	<li>동전 더미가 더 이상 남지 않을 때까지 반복합니다.</li>
</ul>

<p>정수 배열 <code>piles</code>가 주어지고, 여기서 <code>piles[i]</code>는 <code>i<sup>번째</sup></code> 더미에 있는 동전의 수를 나타냅니다.</p>

<p>여러분이 가질 수 있는 최대 동전 수를 반환하세요.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> piles = [2,4,1,2,7,8]
<strong>출력:</strong> 9
<strong>설명: </strong>삼중조 (2, 7, 8)을 선택하면, 앨리스는 8개의 동전이 있는 더미를 선택하고, 여러분은 <strong>7</strong>개의 동전이 있는 더미를 선택하며, 밥은 마지막 더미를 선택합니다.
삼중조 (1, 2, 4)를 선택하면, 앨리스는 4개의 동전이 있는 더미를 선택하고, 여러분은 <strong>2</strong>개의 동전이 있는 더미를 선택하며, 밥은 마지막 더미를 선택합니다.
여러분이 가질 수 있는 최대 동전 수익은: 7 + 2 = 9입니다.
다른 방법으로 (1, <strong>2</strong>, 8), (2, <strong>4</strong>, 7)을 선택하면, 여러분은 2 + 4 = 6개의 동전만 가지게 되어 최적이 아닙니다.
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> piles = [2,4,5]
<strong>출력:</strong> 4
</pre>

<p><strong class="example">예제 3:</strong></p>

<pre>
<strong>입력:</strong> piles = [9,8,7,6,5,1,2,3,4]
<strong>출력:</strong> 18
</pre>

<p>&nbsp;</p>
<p><strong>제약 조건:</strong></p>

<ul>
	<li><code>3 &lt;= piles.length &lt;= 10<sup>5</sup></code></li>
	<li><code>piles.length % 3 == 0</code></li>
	<li><code>1 &lt;= piles[i] &lt;= 10<sup>4</sup></code></li>
</ul>