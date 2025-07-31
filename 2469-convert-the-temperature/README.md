<h2><a href="https://leetcode.com/problems/convert-the-temperature">2469. 온도 변환</a></h2><h3>쉬운 문제</h3><hr><p>당신은 <strong>섭씨로 된 온도</strong>를 나타내는 소수점 두 자리로 반올림 된 0 이상인 실수 <code>celsius</code>를 받았습니다.</p>

<p>섭씨를 <strong>켈빈</strong>과 <strong>화씨</strong>로 변환하여 배열 <code>ans = [kelvin, fahrenheit]</code>로 반환해야 합니다.</p>

<p>배열 <code>ans</code>를 반환하세요. 실제 답의 <code>10<sup>-5</sup></code> 이내의 오차는 허용됩니다.</p>

<p><strong>참고:</strong></p>

<ul>
    <li><code>켈빈 = 섭씨 + 273.15</code></li>
    <li><code>화씨 = 섭씨 * 1.80 + 32.00</code></li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> celsius = 36.50
<strong>출력:</strong> [309.65000,97.70000]
<strong>설명:</strong> 섭씨 36.50도를 변환하면 켈빈은 309.65, 화씨는 97.70이 됩니다.
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> celsius = 122.11
<strong>출력:</strong> [395.26000,251.79800]
<strong>설명:</strong> 섭씨 122.11도를 변환하면 켈빈은 395.26, 화씨는 251.798이 됩니다.
</pre>

<p>&nbsp;</p>
<p><strong>제약사항:</strong></p>

<ul>
    <li><code>0 &lt;= celsius &lt;= 1000</code></li>
</ul>