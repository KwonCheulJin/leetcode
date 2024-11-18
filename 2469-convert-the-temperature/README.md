<h2><a href="https://leetcode.com/problems/convert-the-temperature">2469. 온도 변환</a></h2><h3>쉬움</h3><hr><p>소수점 두 자리로 반올림된 음수가 아닌 부동소수점 숫자인 <code>celsius</code>가 주어지며, 이는 <strong>섭씨 온도</strong>를 나타냅니다.</p>

<p>섭씨를 <strong>켈빈</strong>과 <strong>화씨</strong>로 변환하여 배열 <code>ans = [kelvin, fahrenheit]</code>로 반환해야 합니다.</p>

<p>배열 <code>ans</code>를 반환하세요. 실제 답에서 <code>10<sup>-5</sup></code> 내의 답은 정답으로 인정됩니다.</p>

<p><strong>참고:</strong></p>

<ul>
	<li><code>Kelvin = Celsius + 273.15</code></li>
	<li><code>Fahrenheit = Celsius * 1.80 + 32.00</code></li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> celsius = 36.50
<strong>출력:</strong> [309.65000,97.70000]
<strong>설명:</strong> 섭씨 36.50도는 켈빈으로 변환하면 309.65이고 화씨로 변환하면 97.70입니다.
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> celsius = 122.11
<strong>출력:</strong> [395.26000,251.79800]
<strong>설명:</strong> 섭씨 122.11도는 켈빈으로 변환하면 395.26이고 화씨로 변환하면 251.798입니다.
</pre>

<p>&nbsp;</p>
<p><strong>제약:</strong></p>

<ul>
	<li><code>0 &lt;= celsius &lt;= 1000</code></li>
</ul>