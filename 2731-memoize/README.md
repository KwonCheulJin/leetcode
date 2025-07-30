<h2><a href="https://leetcode.com/problems/memoize">2731. Memoize</a></h2><h3>Medium</h3><hr><p>주어진 함수 <code>fn</code>을 입력으로 받아 그 함수를 <strong>메모이제이션(memoized)</strong>한 버전을 반환하라.</p>

<p><strong>메모이제이션된</strong> 함수란 같은 입력으로 두 번 호출되지 않는 함수다. 대신에 캐시된 값을 반환한다.</p>

<p>입력 함수에는 <strong>3가지</strong>가 있을 수 있다고 가정할 수 있다:&nbsp;<code>sum</code><strong>, </strong><code>fib</code><strong>,&nbsp;</strong>그리고&nbsp;<code>factorial</code><strong>.</strong></p>

<ul>
	<li><code>sum</code><strong>&nbsp;</strong>은 두 개의 정수&nbsp;<code>a</code>와 <code>b</code>를 받아서 <code>a + b</code>를 반환한다.&nbsp;<code>(b, a)</code>에 대해 값이 이미 캐시되었고 <code>a != b</code>인 경우, <code>(a, b)</code>에 대해 사용할 수 없다고 가정한다. 예를 들어, 인자가 <code>(3, 2)</code>와 <code>(2, 3)</code>인 경우, 두 번의 개별 호출이 필요하다.</li>
	<li><code>fib</code><strong>&nbsp;</strong>은&nbsp;단일 정수&nbsp;<code>n</code>을 받아&nbsp;<code>1</code>을 반환하거나&nbsp;<font face="monospace"><code>n &lt;= 1</code> </font>또는&nbsp;<font face="monospace"><code>fib(n - 1) + fib(n - 2)</code>&nbsp;</font>를 반환한다.</li>
	<li><code>factorial</code>&nbsp;은 단일 정수&nbsp;<code>n</code>을 받아 <code>1</code>을 반환하거나&nbsp;<code>n &lt;= 1</code>&nbsp;또는&nbsp;<code>factorial(n - 1) * n</code>&nbsp;을 반환한다.</li>
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
memoizedSum(2, 2); // &quot;call&quot; - 4를 반환. sum()은 (2, 2)가 처음으로 사용되었기 때문에 호출되었다.
memoizedSum(2, 2); // &quot;call&quot; - 4를 반환. 그러나 같은 입력이 이전에 사용되었으므로 sum()은 호출되지 않았음.
// &quot;getCallCount&quot; - 총 호출 횟수: 1
memoizedSum(1, 2); // &quot;call&quot; - 3을 반환. (1, 2)가 처음으로 사용되었기 때문에 sum()이 호출되었다.
// &quot;getCallCount&quot; - 총 호출 횟수: 2
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
memoFactorial(2); // &quot;call&quot; - 2를 반환.
memoFactorial(3); // &quot;call&quot; - 6을 반환.
memoFactorial(2); // &quot;call&quot; - 2를 반환. 그러나 2가 이전에 사용되었기 때문에 factorial은 호출되지 않았다.
// &quot;getCallCount&quot; - 총 호출 횟수: 2
memoFactorial(3); // &quot;call&quot; - 6을 반환. 그러나 3이 이전에 사용되었기 때문에 factorial은 호출되지 않았다.
// &quot;getCallCount&quot; - 총 호출 횟수: 2
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
// &quot;getCallCount&quot; - 총 호출 횟수: 1
</pre>

<p>&nbsp;</p>
<p><strong>제약사항:</strong></p>

<ul>
	<li><code>0 &lt;= a, b &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= n &lt;= 10</code></li>
	<li><code>1 &lt;= actions.length &lt;= 10<sup>5</sup></code></li>
	<li><code>actions.length === values.length</code></li>
	<li><code>actions[i]</code>은 &quot;call&quot;과 &quot;getCallCount&quot; 중 하나이다</li>
	<li><code>fnName</code>은 &quot;sum&quot;, &quot;factorial&quot; 그리고&nbsp;&quot;fib&quot; 중 하나이다</li>
</ul>