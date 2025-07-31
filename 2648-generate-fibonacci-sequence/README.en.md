<h2><a href="https://leetcode.com/problems/generate-fibonacci-sequence">2648. 피보나치 수열 생성</a></h2><h3>쉬움</h3><hr><p><strong>피보나치 수열</strong>을 산출하는 제너레이터 객체를 반환하는 제너레이터 함수를 작성하세요.</p>

<p><strong>피보나치 수열</strong>은 관계식 <code>X<sub>n</sub> = X<sub>n-1</sub> + X<sub>n-2</sub></code>에 의해 정의됩니다.</p>

<p>이 시리즈의 처음 몇 숫자는 <code>0, 1, 1, 2, 3, 5, 8, 13</code>입니다.</p>

<p>&nbsp;</p>
<p><strong class="example">예시 1:</strong></p>

<pre>
<strong>입력:</strong> callCount = 5
<strong>출력:</strong> [0,1,1,2,3]
<strong>설명:</strong>
const gen = fibGenerator();
gen.next().value; // 0
gen.next().value; // 1
gen.next().value; // 1
gen.next().value; // 2
gen.next().value; // 3
</pre>

<p><strong class="example">예시 2:</strong></p>

<pre>
<strong>입력:</strong> callCount = 0
<strong>출력:</strong> []
<strong>설명:</strong> gen.next()는 호출되지 않으므로 아무것도 출력되지 않습니다.
</pre>

<p>&nbsp;</p>
<p><strong>제약 조건:</strong></p>

<ul>
	<li><code>0 &lt;= callCount &lt;= 50</code></li>
</ul>