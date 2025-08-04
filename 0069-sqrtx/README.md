<h2><a href="https://leetcode.com/problems/sqrtx">69. Sqrt(x)</a></h2><h3>쉬움</h3><hr><p>비음수가 주어졌을 때 <code>x</code>, <em>가장 가까운 정수로 내림한</em> <code>x</code>의 제곱근을 반환합니다. 반환된 정수는 <strong>비음수</strong>여야 합니다.</p>

<p>어떠한 내장된 지수 함수나 연산자를 <strong>사용해서는 안 됩니다</strong>.</p>

<ul>
	<li>예를 들어, c++에서는 <code>pow(x, 0.5)</code> 또는 python에서는 <code>x ** 0.5</code>을 사용하지 마십시오.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> x = 4
<strong>출력:</strong> 2
<strong>설명:</strong> 4의 제곱근은 2이므로, 2를 반환합니다.
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> x = 8
<strong>출력:</strong> 2
<strong>설명:</strong> 8의 제곱근은 2.82842..., 가장 가까운 정수로 내림하여 2를 반환합니다.
</pre>

<p>&nbsp;</p>
<p><strong>제약:</strong></p>

<ul>
	<li><code>0 &lt;= x &lt;= 2<sup>31</sup> - 1</code></li>
</ul>