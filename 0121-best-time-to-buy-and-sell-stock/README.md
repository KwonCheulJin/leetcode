<h2><a href="https://leetcode.com/problems/best-time-to-buy-and-sell-stock">121. 주식을 사고 팔기 가장 좋은 시점</a></h2><h3>쉬움</h3><hr><p>배열 <code>prices</code>가 주어집니다. 여기서 <code>prices[i]</code>는 <code>i<sup>번째</sup></code> 날의 주식 가격입니다.</p>

<p>한 주식을 사기 위해 <strong>단 하루</strong>를 선택하고, 그 주식을 팔기 위해 <strong>미래의 다른 날</strong>을 선택하여 이익을 최대화하고 싶습니다.</p>

<p>이 거래에서 얻을 수 있는 <em>최대 이익을 반환</em>하세요. 만약 어떤 이익도 얻을 수 없다면, <code>0</code>을 반환하세요.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> prices = [7,1,5,3,6,4]
<strong>출력:</strong> 5
<strong>설명:</strong> 2일차에 구매(가격 = 1)하고 5일차에 판매(가격 = 6), 이익 = 6-1 = 5.
2일차에 구매하고 1일차에 판매하는 것은 허용되지 않음. 구매 후에 판매해야 합니다.
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> prices = [7,6,4,3,1]
<strong>출력:</strong> 0
<strong>설명:</strong> 이 경우에는 거래가 이루어지지 않으며 최대 이익 = 0입니다.
</pre>

<p>&nbsp;</p>
<p><strong>제약 조건:</strong></p>

<ul>
	<li><code>1 &lt;= prices.length &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= prices[i] &lt;= 10<sup>4</sup></code></li>
</ul>