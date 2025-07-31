<h2><a href="https://leetcode.com/problems/counter-ii">2665. Counter II</a></h2><h3>쉬움</h3><hr><p>함수 <code>createCounter</code>를 작성하세요. 이 함수는 초기 정수 <code>init</code>를 받아야 합니다. 이 함수는 세 개의 함수를 가진 객체를 반환해야 합니다.</p>

<p>세 개의 함수는 다음과 같습니다:</p>

<ul>
	<li><code>increment()</code>는 현재 값을 1 증가시키고 그 값을 반환합니다.</li>
	<li><code>decrement()</code>는 현재 값을 1 감소시키고 그 값을 반환합니다.</li>
	<li><code>reset()</code>는 현재 값을 <code>init</code>로 설정하고 그 값을 반환합니다.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> init = 5, calls = [&quot;increment&quot;,&quot;reset&quot;,&quot;decrement&quot;]
<strong>출력:</strong> [6,5,4]
<strong>설명:</strong>
const counter = createCounter(5);
counter.increment(); // 6
counter.reset(); // 5
counter.decrement(); // 4
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> init = 0, calls = [&quot;increment&quot;,&quot;increment&quot;,&quot;decrement&quot;,&quot;reset&quot;,&quot;reset&quot;]
<strong>출력:</strong> [1,2,1,0,0]
<strong>설명:</strong>
const counter = createCounter(0);
counter.increment(); // 1
counter.increment(); // 2
counter.decrement(); // 1
counter.reset(); // 0
counter.reset(); // 0
</pre>

<p>&nbsp;</p>
<p><strong>제약 사항:</strong></p>

<ul>
	<li><code>-1000 &lt;= init &lt;= 1000</code></li>
	<li><code>0 &lt;= calls.length &lt;= 1000</code></li>
	<li><code>calls[i]</code>는 &quot;increment&quot;, &quot;decrement&quot;, &quot;reset&quot; 중 하나입니다.</li>
</ul>