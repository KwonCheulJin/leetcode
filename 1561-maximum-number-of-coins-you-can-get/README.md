<h2><a href="https://leetcode.com/problems/maximum-number-of-coins-you-can-get">1561. 최대 코인 수</a></h2><h3>중간</h3><hr><p><code>3n</code>개의 서로 다른 크기의 동전 무더기가 있고, 당신과 친구들이 다음과 같은 방법으로 동전 무더기를 가져갑니다:</p>

<ul>
	<li>각 단계에서 <strong>임의로 </strong><code>3</code>개의 동전 무더기를 선택합니다 (연속일 필요는 없음).</li>
	<li>선택한 무더기 중에서, 앨리스가 최대 개수의 동전이 있는 무더기를 선택합니다.</li>
	<li>당신은 다음으로 많은 동전이 있는 무더기를 선택합니다.</li>
	<li>당신의 친구 밥이 마지막 무더기를 선택합니다.</li>
	<li>모든 동전 무더기가 없어질 때까지 반복합니다.</li>
</ul>

<p>배열 <code>piles</code>가 주어질 때, <code>piles[i]</code>는 <code>i<sup>번째</sup></code> 무더기에 있는 동전의 수입니다.</p>

<p>당신이 가질 수 있는 최대 동전 수를 반환하세요.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> piles = [2,4,1,2,7,8]
<strong>출력:</strong> 9
<strong>설명:</strong> 무리를 선택합니다 (2, 7, 8), 앨리스는 8개의 동전이 있는 무더기를 선택하고, 당신은 <strong>7</strong>개의 동전이 있는 무더기를 선택하고, 밥은 마지막 무더기를 선택합니다.
무리를 선택합니다 (1, 2, 4), 앨리스는 4개의 동전이 있는 무더기를 선택하고, 당신은 <strong>2</strong>개의 동전이 있는 무더기를 선택하고, 밥은 마지막 무더기를 선택합니다.
당신이 가질 수 있는 최대 동전 수는: 7 + 2 = 9입니 다.
다른 방법으로 이 배열을 선택하면 (1, <strong>2</strong>, 8), (2, <strong>4</strong>, 7) 당신은 2 + 4 = 6개의 동전만 얻게 되며 비효율적입니다.
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