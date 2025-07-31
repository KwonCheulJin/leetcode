<h2><a href="https://leetcode.com/problems/memoize">2731. Memoize</a></h2><h3>중간</h3><hr><p>함수 <code>fn</code>이 주어질 때, 해당 함수의 <strong>메모이제이션된</strong> 버전을 반환하세요.</p>

<p><strong>메모이제이션된</strong> 함수는 동일한 입력 값으로 두 번 호출되지 않는 함수입니다. 대신 캐시된 값을 반환합니다.</p>

<p>다음과 같은 <strong>3가지</strong> 가능한 입력 함수가 있다고 가정할 수 있습니다: <code>sum</code>, <code>fib</code>, <code>factorial</code>.</p>

<ul>
	<li><code>sum</code>은 두 개의 정수 <code>a</code>와 <code>b</code>를 받아 <code>a + b</code>를 반환합니다. 만약 인자 <code>(b, a)</code>에 대해 이미 값이 캐시되었고 <code>a != b</code>인 경우, 인자 <code>(a, b)</code>에 대해 사용할 수 없습니다. 예를 들어, 인자가 <code>(3, 2)</code>와 <code>(2, 3)</code>인 경우 두 번의 개별 호출이 필요합니다.</li>
	<li><code>fib</code>는 하나의 정수 <code>n</code>을 받아 <font face="monospace"><code>n &lt;= 1</code></font>인 경우 <code>1</code>을, 그렇지 않은 경우 <font face="monospace"><code>fib(n - 1) + fib(n - 2)</code></font>를 반환합니다.</li>
	<li><code>factorial</code>은 하나의 정수 <code>n</code>을 받아 <code>n &lt;= 1</code>인 경우 <code>1</code>을, 그렇지 않은 경우 <code>factorial(n - 1) * n</code>을 반환합니다.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">예시 1:</strong></p>

<pre>
<strong>입력:</strong>
fnName = "sum"
actions = ["call","call","getCallCount","call","getCallCount"]
values = [[2,2],[2,2],[],[1,2],[]]
<strong>출력:</strong> [4,4,1,3,2]
<strong>설명:</strong>
const sum = (a, b) => a + b;
const memoizedSum = memoize(sum);
memoizedSum(2, 2); // "call" - 4를 반환합니다. (2, 2)가 이전에 보지 못했으므로 sum()이 호출됩니다.
memoizedSum(2, 2); // "call" - 4를 반환합니다. 그러나 동일한 입력이 이전에 보였으므로 sum()은 호출되지 않습니다.
// "getCallCount" - 총 호출 수: 1
memoizedSum(1, 2); // "call" - 3을 반환합니다. (1, 2)가 이전에 보지 못했으므로 sum()이 호출됩니다.
// "getCallCount" - 총 호출 수: 2
</pre>

<p><strong class="example">예시 2:</strong></p>

<pre>
<strong>입력:
</strong>fnName = "factorial"
actions = ["call","call","call","getCallCount","call","getCallCount"]
values = [[2],[3],[2],[],[3],[]]
<strong>출력:</strong> [2,6,2,2,6,2]
<strong>설명:</strong>
const factorial = (n) => (n <= 1) ? 1 : (n * factorial(n - 1));
const memoFactorial = memoize(factorial);
memoFactorial(2); // "call" - 2를 반환합니다.
memoFactorial(3); // "call" - 6을 반환합니다.
memoFactorial(2); // "call" - 2를 반환합니다. 그러나 2가 이전에 보였으므로 factorial은 호출되지 않습니다.
// "getCallCount" - 총 호출 수: 2
memoFactorial(3); // "call" - 6을 반환합니다. 그러나 3이 이전에 보였으므로 factorial은 호출되지 않습니다.
// "getCallCount" - 총 호출 수: 2
</pre>

<p><strong class="example">예시 3:</strong></p>

<pre>
<strong>입력:
</strong>fnName = "fib"
actions = ["call","getCallCount"]
values = [[5],[]]
<strong>출력:</strong> [8,1]
<strong>설명:
</strong>fib(5) = 8 // "call";
// "getCallCount" - 총 호출 수: 1
</pre>

<p>&nbsp;</p>
<p><strong>제약:</strong></p>

<ul>
	<li><code>0 &lt;= a, b &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= n &lt;= 10</code></li>
	<li><code>1 &lt;= actions.length &lt;= 10<sup>5</sup></code></li>
	<li><code>actions.length === values.length</code></li>
	<li><code>actions[i]</code>는 "call"과 "getCallCount" 중 하나입니다.</li>
	<li><code>fnName</code>은 "sum", "factorial", "fib" 중 하나입니다.</li>
</ul>