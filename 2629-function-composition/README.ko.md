<h2><a href="https://leetcode.com/problems/function-composition">2629. 함수 합성</a></h2><h3>쉬움</h3><hr><p>함수들의 배열 <code>[f<span style="font-size: 10.8333px;">1</span>, f<sub>2</sub>, f<sub>3</sub>, ..., f<sub>n</sub>]</code>가 주어졌을 때, 해당 함수들의 배열이 <strong>합성 함수</strong>인 새로운 함수 <code>fn</code>을 반환하세요.</p>

<p><code>[f(x), g(x), h(x)]</code>의&nbsp;<strong>함수 합성</strong>은&nbsp;<code>fn(x) = f(g(h(x)))</code>입니다.</p>

<p>함수의 빈 목록의&nbsp;<strong>함수 합성</strong>&nbsp;은&nbsp;<strong>항등 함수</strong>&nbsp;<code>f(x) = x</code>입니다.</p>

<p>배열에 있는 각 함수는 하나의 정수를 입력으로 받아들여 하나의 정수를 출력으로 반환한다고 가정할 수 있습니다.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> functions = [x =&gt; x + 1, x =&gt; x * x, x =&gt; 2 * x], x = 4
<strong>출력:</strong> 65
<strong>설명:</strong>
오른쪽에서 왼쪽으로 평가합니다 ...
x = 4부터 시작합니다.
2 * (4) = 8
(8) * (8) = 64
(64) + 1 = 65
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> functions = [x =&gt; 10 * x, x =&gt; 10 * x, x =&gt; 10 * x], x = 1
<strong>출력:</strong> 1000
<strong>설명:</strong>
오른쪽에서 왼쪽으로 평가합니다 ...
10 * (1) = 10
10 * (10) = 100
10 * (100) = 1000
</pre>

<p><strong class="example">예제 3:</strong></p>

<pre>
<strong>입력:</strong> functions = [], x = 42
<strong>출력:</strong> 42
<strong>설명:</strong>
0개의 함수의 합성은 항등 함수입니다</pre>

<p>&nbsp;</p>
<p><strong>제한 사항:</strong></p>

<ul>
	<li><code><font face="monospace">-1000 &lt;= x &lt;= 1000</font></code></li>
	<li><code><font face="monospace">0 &lt;= functions.length &lt;= 1000</font></code></li>
	<li>모든 함수는 하나의 정수를 받아들이고 반환합니다</li>
</ul>