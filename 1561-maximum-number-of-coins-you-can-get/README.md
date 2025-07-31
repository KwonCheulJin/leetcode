<h2><a href="https://leetcode.com/problems/maximum-number-of-coins-you-can-get">1561. 당신이 얻을 수 있는 최대 동전 수</a></h2><h3>중간</h3><hr><p>크기가 다양한 도전의 더미가 <code>3n</code>개 있습니다. 당신과 친구들은 다음과 같이 동전 더미를 가져갈 것입니다:</p>

<ul>
	<li>각 단계에서 <strong>아무 </strong><code>3</code>개의 동전 더미를 선택합니다 (반드시 연속적일 필요는 없습니다).</li>
	<li>알리스는 선택한 더미 중 최대 숫자의 동전이 있는 더미를 선택합니다.</li>
	<li>당신은 다음으로 최대 숫자의 동전이 있는 더미를 선택합니다.</li>
	<li>당신의 친구 밥은 마지막 더미를 선택합니다.</li>
	<li>더 이상 동전 더미가 없을 때까지 반복합니다.</li>
</ul>

<p>정수 배열 <code>piles</code>가 주어질 때, <code>piles[i]</code>는 <code>i<sup>번째</sup></code> 더미에 있는 동전의 수를 나타냅니다.</p>

<p>여러분이 가질 수 있는 최대 동전 수를 반환하세요.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> piles = [2,4,1,2,7,8]
<strong>출력:</strong> 9
<strong>설명: </strong>트리플릿 (2, 7, 8)을 선택합니다. 알리스가 8 동전이 있는 더미를 선택하고, 당신은 <strong>7</strong> 동전이 있는 더미를 선택하며, 밥은 마지막 더미를 가져갑니다.
트리플릿 (1, 2, 4)을 선택합니다. 알리스가 4 동전이 있는 더미를 선택하고, 당신은 <strong>2</strong> 동전이 있는 더미를 선택하며, 밥은 마지막 더미를 가져갑니다.
당신이 얻을 수 있는 최대 동전 수는: 7 + 2 = 9입니다.
반면 이 배열을 선택할 경우 (1, <strong>2</strong>, 8), (2, <strong>4</strong>, 7) 당신은 단지 2 + 4 = 6 동전을 얻어 최적이 아닙니다.
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
