<h2><a href="https://leetcode.com/problems/memoize">2623. Memoize</a></h2><h3>중간</h3><hr><p>주어진 함수 <code>fn</code>에 대해, 그 함수의 <strong>메모이제이션된</strong> 버전을 반환하세요.</p>

<p><strong>메모이제이션된</strong> 함수는 동일한 입력값으로 두 번 호출되지 않는 함수입니다. 대신, 캐시된 값을 반환합니다.</p>

<p>가능한 입력 함수는 <strong>세 가지</strong>가 있다고 가정할 수 있습니다: <code>sum</code>, <code>fib</code>, 및 <code>factorial</code>.</p>

<ul>
	<li><code>sum</code>은 두 정수 <code>a</code>와 <code>b</code>를 받아 <code>a + b</code>를 반환합니다. <code>a != b</code>일 때 인자 <code>(b, a)</code>에 대해 값이 이미 캐시되어 있는 경우, 인자 <code>(a, b)</code>에는 사용할 수 없습니다. 예를 들어, 인자가 <code>(3, 2)</code>와 <code>(2, 3)</code>일 경우, 두 번의 별도 호출이 이루어져야 합니다.</li>
	<li><code>fib</code>는 단일 정수 <code>n</code>를 받아 <code>n &lt;= 1</code>일 때 <code>1</code> 또는 그렇지 않으면 <code>fib(n - 1) + fib(n - 2)</code>를 반환합니다.</li>
	<li><code>factorial</code>은 단일 정수 <code>n</code>을 받아 <code>n &lt;= 1</code>일 때 <code>1</code> 또는 그렇지 않으면 <code>factorial(n - 1) * n</code>를 반환합니다.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong>
fnName = &quot;sum&quot;
actions = [&quot;call&quot;,&quot;call&quot;,&quot;getCallCount&quot;,&quot;call&quot;,&quot;getCallCount&quot;]
values = [[2,2],[2,2],[],[1,2],[]]
<strong>출력:</strong> [4,4,1,3,2]
<strong>설명:</strong>
const sum = (a, b) =&gt; a + b;
const memoizedSum = memoize(sum);
memoizedSum(2, 2); // &quot;call&quot; - 4를 반환합니다. (2, 2)는 처음 본 것이므로 sum()이 호출되었습니다.
memoizedSum(2, 2); // &quot;call&quot; - 4를 반환합니다. 같은 입력이 이미 있었으므로 sum()은 호출되지 않았습니다.
// &quot;getCallCount&quot; - 총 호출 수: 1
memoizedSum(1, 2); // &quot;call&quot; - 3을 반환합니다. (1, 2)는 처음 본 것이므로 sum()이 호출되었습니다.
// &quot;getCallCount&quot; - 총 호출 수: 2
</pre>

<p><strong class="example">예제 2:</strong></p>

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
memoFactorial(2); // &quot;call&quot; - 2를 반환합니다. 이미 2가 있었으므로 factorial은 호출되지 않았습니다.
// &quot;getCallCount&quot; - 총 호출 수: 2
memoFactorial(3); // &quot;call&quot; - 6을 반환합니다. 이미 3이 있었으므로 factorial은 호출되지 않았습니다.
// &quot;getCallCount&quot; - 총 호출 수: 2
</pre>

<p><strong class="example">예제 3:</strong></p>

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
<p><strong>제약 조건:</strong></p>

<ul>
	<li><code>0 &lt;= a, b &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= n &lt;= 10</code></li>
	<li><code>1 &lt;= actions.length &lt;= 10<sup>5</sup></code></li>
	<li><code>actions.length === values.length</code></li>
	<li><code>actions[i]</code>는 &quot;call&quot;과 &quot;getCallCount&quot; 중 하나입니다.</li>
	<li><code>fnName</code>은 &quot;sum&quot;, &quot;factorial&quot;, 또는 &quot;fib&quot; 중 하나입니다.</li>
</ul>