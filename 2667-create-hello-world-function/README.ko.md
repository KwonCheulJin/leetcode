<h2><a href="https://leetcode.com/problems/create-hello-world-function">2667. Hello World 함수 만들기</a></h2><h3>쉬움</h3><hr>함수 <code>createHelloWorld</code>를 작성하세요.&nbsp;이 함수는 항상 <code>&quot;Hello World&quot;</code>를 반환하는 새 함수를 반환해야 합니다.
<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> args = []
<strong>출력:</strong> &quot;Hello World&quot;
<strong>설명:</strong>
const f = createHelloWorld();
f(); // &quot;Hello World&quot;

createHelloWorld에서 반환된 함수는 항상 &quot;Hello World&quot;를 반환해야 합니다.
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> args = [{},null,42]
<strong>출력:</strong> &quot;Hello World&quot;
<strong>설명:</strong>
const f = createHelloWorld();
f({}, null, 42); // &quot;Hello World&quot;

함수에 어떤 인수들이 전달되더라도 항상 &quot;Hello World&quot;를 반환해야 합니다.
</pre>

<p>&nbsp;</p>
<p><strong>제약 사항:</strong></p>

<ul>
	<li><code>0 &lt;= args.length &lt;= 10</code></li>
</ul>