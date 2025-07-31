<h2><a href="https://leetcode.com/problems/convert-the-temperature">2469. 온도 변환하기</a></h2><h3>쉬움</h3><hr><p>두 소수점 자리로 반올림된 음수가 아닌 부동 소수점 숫자 <code>celsius</code>가 주어집니다. 이는 <strong>섭씨 온도</strong>를 나타냅니다.</p>

<p>섭씨 온도를 <strong>켈빈</strong>과 <strong>화씨</strong>로 변환하여 배열 <code>ans = [kelvin, fahrenheit]</code>로 반환해야 합니다.</p>

<p><em>배열 <code>ans</code>를 반환하십시오. </em>실제 정답에서 <code>10<sup>-5</sup></code> 이내의 답은 허용됩니다.</p>

<p><strong>참고:</strong></p>

<ul>
	<li><code>케빈 = 섭씨 + 273.15</code></li>
	<li><code>화씨 = 섭씨 * 1.80 + 32.00</code></li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">예시 1:</strong></p>

<pre>
<strong>입력:</strong> celsius = 36.50
<strong>출력:</strong> [309.65000,97.70000]
<strong>설명:</strong> 36.50 섭씨 온도를 켈빈으로 변환하면 309.65이고, 화씨로 변환하면 97.70입니다.
</pre>

<p><strong class="example">예시 2:</strong></p>

<pre>
<strong>입력:</strong> celsius = 122.11
<strong>출력:</strong> [395.26000,251.79800]
<strong>설명:</strong> 122.11 섭씨 온도를 켈빈으로 변환하면 395.26이고, 화씨로 변환하면 251.798입니다.
</pre>

<p>&nbsp;</p>
<p><strong>제약사항:</strong></p>

<ul>
	<li><code>0 &lt;= celsius &lt;= 1000</code></li>
</ul>