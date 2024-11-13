<h2><a href="https://leetcode.com/problems/create-hello-world-function">2667. 헬로 월드 함수 생성</a></h2><h3>쉬움</h3><hr>함수 <code>createHelloWorld</code>를 작성하세요. 항상 <code>"Hello World"</code>를 반환하는 새 함수를 반환해야 합니다.
<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> args = []
<strong>출력:</strong> "Hello World"
<strong>설명:</strong>
const f = createHelloWorld();
f(); // "Hello World"

createHelloWorld 함수가 반환하는 함수는 항상 "Hello World"를 반환해야 합니다.
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> args = [{},null,42]
<strong>출력:</strong> "Hello World"
<strong>설명:</strong>
const f = createHelloWorld();
f({}, null, 42); // "Hello World"

함수에 전달되는 인자는 어떠한 것도 될 수 있지만 항상 "Hello World"를 반환해야 합니다.
</pre>

<p>&nbsp;</p>
<p><strong>제약조건:</strong></p>

<ul>
	<li><code>0 &lt;= args.length &lt;= 10</code></li>
</ul>