<h2><a href="https://leetcode.com/problems/final-value-of-variable-after-performing-operations/">2011. 연산 수행 후 변수의 최종 값</a></h2><h3>쉬움</h3><hr><p>하나의 변수 <code>X</code>와 <strong>네 개의</strong> 연산만 있는 프로그래밍 언어가 있습니다:</p>

<ul>
	<li><code>++X</code> 과 <code>X++</code> 는 변수 <code>X</code>의 값을 <strong>1 증가</strong>시킵니다.</li>
	<li><code>--X</code> 과 <code>X--</code> 는 변수 <code>X</code>의 값을 <strong>1 감소</strong>시킵니다.</li>
</ul>

<p>초기 상태에서 <code>X</code>의 값은 <code>0</code>입니다.</p>

<p>연산 목록을 포함하는 문자열 배열 <code>operations</code>가 주어질 때, 모든 연산을 수행한 후의 <code>X</code>의 <strong>최종</strong> 값을 반환하세요.</p>

<p>&nbsp;</p>
<p><strong class="example">예시 1:</strong></p>

<pre>
<strong>입력:</strong> operations = [&quot;--X&quot;,&quot;X++&quot;,&quot;X++&quot;]
<strong>출력:</strong> 1
<strong>설명:</strong>&nbsp;연산은 다음과 같이 수행됩니다:
초기에는, X = 0.
--X: X가 1 감소하여, X =  0 - 1 = -1.
X++: X가 1 증가하여, X = -1 + 1 =  0.
X++: X가 1 증가하여, X =  0 + 1 =  1.
</pre>

<p><strong class="example">예시 2:</strong></p>

<pre>
<strong>입력:</strong> operations = [&quot;++X&quot;,&quot;++X&quot;,&quot;X++&quot;]
<strong>출력:</strong> 3
<strong>설명:</strong> 연산은 다음과 같이 수행됩니다:
초기에는, X = 0.
++X: X가 1 증가하여, X = 0 + 1 = 1.
++X: X가 1 증가하여, X = 1 + 1 = 2.
X++: X가 1 증가하여, X = 2 + 1 = 3.
</pre>

<p><strong class="example">예시 3:</strong></p>

<pre>
<strong>입력:</strong> operations = [&quot;X++&quot;,&quot;++X&quot;,&quot;--X&quot;,&quot;X--&quot;]
<strong>출력:</strong> 0
<strong>설명:</strong>&nbsp;연산은 다음과 같이 수행됩니다:
초기에는, X = 0.
X++: X가 1 증가하여, X = 0 + 1 = 1.
++X: X가 1 증가하여, X = 1 + 1 = 2.
--X: X가 1 감소하여, X = 2 - 1 = 1.
X--: X가 1 감소하여, X = 1 - 1 = 0.
</pre>

<p>&nbsp;</p>
<p><strong>제약 조건:</strong></p>

<ul>
	<li><code>1 &lt;= operations.length &lt;= 100</code></li>
	<li><code>operations[i]</code> 는 <code>&quot;++X&quot;</code>, <code>&quot;X++&quot;</code>, <code>&quot;--X&quot;</code>, 또는 <code>&quot;X--&quot;</code> 중 하나입니다.</li>
</ul>