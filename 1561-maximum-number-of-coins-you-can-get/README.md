<h2><a href="https://leetcode.com/problems/maximum-number-of-coins-you-can-get">1561. 당신이 얻을 수 있는 최대 동전 수</a></h2><h3>중간</h3><hr><p>크기가 다양한 <code>3n</code> 더미의 동전이 있으며, 당신과 친구들은 다음과 같이 동전 더미를 가져갈 것입니다:</p>

<ul>
	<li>각 단계에서, 당신은 <strong>어떤</strong> <code>3</code> 더미의 동전을 선택합니다 (반드시 연속적일 필요는 없습니다).</li>
	<li>당신의 선택에 따라, 앨리스는 가장 많은 동전이 있는 더미를 선택합니다.</li>
	<li>당신은 그 다음으로 많은 동전이 있는 더미를 선택합니다.</li>
	<li>당신의 친구 밥은 마지막 더미를 선택합니다.</li>
	<li>더 이상 동전 더미가 남지 않을 때까지 반복합니다.</li>
</ul>

<p>각 <code>piles[i]</code>가 <code>i<sup>번째</sup></code> 더미의 동전 수인 정수 배열 <code>piles</code>가 주어집니다.</p>

<p>당신이 가질 수 있는 최대 동전 수를 반환하세요.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> piles = [2,4,1,2,7,8]
<strong>출력:</strong> 9
<strong>설명: </strong>삼중항 (2, 7, 8)을 선택합니다. 앨리스는 8개의 동전이 있는 더미를 선택합니다. 당신은 <strong>7</strong>개의 동전이 있는 더미를 선택합니다. 밥은 마지막 것을 선택합니다.
삼중항 (1, 2, 4)을 선택합니다. 앨리스는 4개의 동전이 있는 더미를 선택합니다. 당신은 <strong>2</strong>개의 동전이 있는 더미를 선택합니다. 밥은 마지막 것을 선택합니다.
당신이 가질 수 있는 최대 동전 수는: 7 + 2 = 9입니다.
반면 이 정렬을 선택하면 (1, <strong>2</strong>, 8), (2, <strong>4</strong>, 7) 단지 2 + 4 = 6개의 동전을 얻을 수 있으며, 이는 최적이 아닙니다.
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