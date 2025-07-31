<h2><a href="https://leetcode.com/problems/memoize">2623. 메모이즈</a></h2><h3>중간 단계</h3><hr><p>함수 <code>fn</code>이 주어졌을 때, 그 함수의 <strong>메모이즈된</strong> 버전을 반환합니다.</p>

<p><strong>메모이즈</strong> 함수란 같은 입력값으로 두 번 호출되지 않는 함수입니다. 대신에 캐시된 값을 반환합니다.</p>

<p>입력 함수는 <strong>3</strong>가지가 있을 수 있다고 가정합니다: <code>sum</code><strong>, </strong><code>fib</code><strong>, </strong>및 <code>factorial</code><strong>.</strong></p>

<ul>
	<li><code>sum</code><strong> </strong>은 두 개의 정수 <code>a</code>와 <code>b</code>를 받아 <code>a + b</code>를 반환합니다. 만약 <code>a != b</code>인 <code>(b, a)</code> 인수에 대해 값이 이미 캐시되어 있다면, 그것은 <code>(a, b)</code> 인수들에 대해 사용될 수 없습니다. 예를 들어, 인수가 <code>(3, 2)</code>와 <code>(2, 3)</code>일 경우, 두 번의 별도 호출이 이루어져야 합니다.</li>
	<li><code>fib</code><strong> </strong>는 한 개의 정수 <code>n</code>을 받아서 <code>n &lt;= 1</code>이면 <code>1</code>을 반환하고, 그렇지 않으면 <code>fib(n - 1) + fib(n - 2)</code>를 반환합니다.</li>
	<li><code>factorial</code>은 한 개의 정수 <code>n</code>을 받아서 <code>n &lt;= 1</code>이면 <code>1</code>을 반환하고, 그렇지 않으면 <code>factorial(n - 1) * n</code>을 반환합니다.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">예시 1:</strong></p>

<pre>
<strong>입력:</strong>
fnName = &quot;sum&quot;
actions = [&quot;call&quot;,&quot;call&quot;,&quot;getCallCount&quot;,&quot;call&quot;,&quot;getCallCount&quot;]
values = [[2,2],[2,2],[],[1,2],[]]
<strong>출력:</strong> [4,4,1,3,2]
<strong>설명:</strong>
const sum = (a, b) =&gt; a + b;
const memoizedSum = memoize(sum);
memoizedSum(2, 2); // &quot;call&quot; - 4를 반환합니다. (2, 2)는 이전에 보지 않았기 때문에 sum()이 호출되었습니다.
memoizedSum(2, 2); // &quot;call&quot; - 4를 반환합니다. 그러나 동일한 입력값이 이전에 보았기 때문에 sum()은 호출되지 않았습니다.
// &quot;getCallCount&quot; - 총 호출 수: 1
memoizedSum(1, 2); // &quot;call&quot; - 3을 반환합니다. (1, 2)는 이전에 보지 않았기 때문에 sum()이 호출되었습니다.
// &quot;getCallCount&quot; - 총 호출 수: 2
</pre>

<p><strong class="example">예시 2:</strong></p>

<pre>
<strong>입력:
</strong>fnName = &quot;factorial&quot;
actions = [&quot;call&quot;,&quot;call&quot;,&quot;call&quot;,&quot;getCallCount&quot;,&quot;call&quot;,&quot;getCallCount&quot;]
values = [[2],[3],[2],[],[3],[]]
<strong>출력:</strong> [2,6,2,2,6,2]
<strong>설명:</strong>
const factorial = (n) =&gt; (n &lt;= 1) ? 1 : (n * factorial(n - 1));
const memoFactorial = memoize(factorial);
memoFactorial(2); // &quot;call&quot; - 2를 반환합니다.
memoFactorial(3); // &quot;call&quot; - 6을 반환합니다.
memoFactorial(2); // &quot;call&quot; - 2를 반환합니다. 그러나 2는 이전에 보았기 때문에 factorial은 호출되지 않았습니다.
// &quot;getCallCount&quot; - 총 호출 수: 2
memoFactorial(3); // &quot;call&quot; - 6을 반환합니다. 그러나 3은 이전에 보았기 때문에 factorial은 호출되지 않았습니다.
// &quot;getCallCount&quot; - 총 호출 수: 2
</pre>

<p><strong class="example">예시 3:</strong></p>

<pre>
<strong>입력:
</strong>fnName = &quot;fib&quot;
actions = [&quot;call&quot;,&quot;getCallCount&quot;]
values = [[5],[]]
<strong>출력:</strong> [8,1]
<strong>설명:
</strong>fib(5) = 8 // &quot;call&quot;
// &quot;getCallCount&quot; - 총 호출 수: 1
</pre>

<p>&nbsp;</p>
<p><strong>제약 사항:</strong></p>

<ul>
	<li><code>0 &lt;= a, b &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= n &lt;= 10</code></li>
	<li><code>1 &lt;= actions.length &lt;= 10<sup>5</sup></code></li>
	<li><code>actions.length === values.length</code></li>
	<li><code>actions[i]</code>는 &quot;call&quot; 또는 &quot;getCallCount&quot; 중 하나입니다.</li>
	<li><code>fnName</code>은 &quot;sum&quot;, &quot;factorial&quot;, &quot;fib&quot; 중 하나입니다.</li>
</ul>