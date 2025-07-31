<h2><a href="https://leetcode.com/problems/memoize">2731. 메모이즈</a></h2><h3>중간</h3><hr><p>주어진 함수 <code>fn</code>에 대해, 그 함수의&nbsp;<strong>메모이즈된</strong>&nbsp;버전을 반환하세요.</p>

<p><strong>메모이즈된</strong>&nbsp;함수는 동일한 입력으로 두 번 호출되지 않습니다. 대신에, 캐시된 값을 반환합니다.</p>

<p>다음과 같은&nbsp;<strong>3</strong>가지 입력 함수: <code>sum</code><strong>, </strong><code>fib</code><strong>,&nbsp;</strong>및&nbsp;<code>factorial</code><strong>을 가정할 수 있습니다.</strong></p>

<ul>
	<li><code>sum</code>&nbsp;함수는 두 정수&nbsp;<code>a</code>와 <code>b</code>를 받고 <code>a + b</code>를 반환합니다. 이미 캐시된 값이 인수 <code>(b, a)</code>에 대해 존재할 경우, <code>a != b</code>일 때 그 값을 <code>(a, b)</code>에 사용할 수 없습니다. 예를 들어, 인수가 <code>(3, 2)</code>와 <code>(2, 3)</code>라면, 두 번 호출이 필요합니다.</li>
	<li><code>fib</code>&nbsp;함수는 정수&nbsp;<code>n</code> 하나를 받고 <font face="monospace"><code>n &lt;= 1</code></font>에 대해 <code>1</code>을 반환하고, 그렇지 않으면&nbsp;<font face="monospace"><code>fib(n - 1) + fib(n - 2)</code>&nbsp;</font>를 반환합니다.</li>
	<li><code>factorial</code>&nbsp;함수는 정수&nbsp;<code>n</code> 하나를 받고&nbsp;<code>n &lt;= 1</code>에 대해 <code>1</code>을 반환하고, 그렇지 않으면&nbsp;<code>factorial(n - 1) * n</code>&nbsp;를 반환합니다.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong>
fnName = "sum"
actions = ["call","call","getCallCount","call","getCallCount"]
values = [[2,2],[2,2],[],[1,2],[]]
<strong>출력:</strong> [4, 4, 1, 3, 2]
<strong>설명:</strong>
const sum = (a, b) => a + b;
const memoizedSum = memoize(sum);
memoizedSum(2, 2); // "call" - 4를 반환합니다. (2, 2)는 이전에 본 적이 없으므로 sum()이 호출됩니다.
memoizedSum(2, 2); // "call" - 4를 반환합니다. 그러나 같은 입력을 이전에 본 적이 있기 때문에 sum()은 호출되지 않습니다.
// "getCallCount" - 총 호출 수: 1
memoizedSum(1, 2); // "call" - 3를 반환합니다. (1, 2)는 이전에 본 적이 없으므로 sum()이 호출됩니다.
// "getCallCount" - 총 호출 수: 2
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:
</strong>fnName = "factorial"
actions = ["call","call","call","getCallCount","call","getCallCount"]
values = [[2],[3],[2],[],[3],[]]
<strong>출력:</strong> [2, 6, 2, 2, 6, 2]
<strong>설명:</strong>
const factorial = (n) => (n ≤ 1) ? 1 : (n * factorial(n - 1));
const memoFactorial = memoize(factorial);
memoFactorial(2); // "call" - 2를 반환합니다.
memoFactorial(3); // "call" - 6를 반환합니다.
memoFactorial(2); // "call" - 2를 반환합니다. 그러나 2는 이전에 본 적이 있으므로 factorial은 호출되지 않습니다.
// "getCallCount" - 총 호출 수: 2
memoFactorial(3); // "call" - 6를 반환합니다. 그러나 3은 이전에 본 적이 있으므로 factorial은 호출되지 않습니다.
// "getCallCount" - 총 호출 수: 2
</pre>

<p><strong class="example">예제 3:</strong></p>

<pre>
<strong>입력:
</strong>fnName = "fib"
actions = ["call","getCallCount"]
values = [[5],[]]
<strong>출력:</strong> [8, 1]
<strong>설명:</strong>
fib(5) = 8 // "call"
// "getCallCount" - 총 호출 수: 1
</pre>

<p>&nbsp;</p>
<p><strong>제약 조건:</strong></p>

<ul>
	<li><code>0 &lt;= a, b &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= n &lt;= 10</code></li>
	<li><code>1 &lt;= actions.length &lt;= 10<sup>5</sup></code></li>
	<li><code>actions.length === values.length</code></li>
	<li><code>actions[i]</code>는 "call"과 "getCallCount" 중 하나입니다.</li>
	<li><code>fnName</code>는 "sum", "factorial" 및 "fib" 중 하나입니다.</li>
</ul>