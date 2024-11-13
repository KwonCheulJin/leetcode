<h2><a href="https://leetcode.com/problems/counter">2620. Counter</a></h2><h3>쉬움</h3><hr><p>정수 <code>n</code>이 주어졌을 때, <code>counter</code> 함수를 반환하세요. 이 <code>counter</code> 함수는 처음에는 <code>n</code>을 반환하고, 그 이후 호출될 때마다 이전 값보다 1씩 증가된 값을 반환합니다 (<code>n</code>, <code>n + 1</code>, <code>n + 2</code> 등).</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> 
n = 10 
[&quot;call&quot;,&quot;call&quot;,&quot;call&quot;]
<strong>출력:</strong> [10,11,12]
<strong>설명: 
</strong>counter() = 10 // counter()가 처음 호출될 때, n을 반환합니다.
counter() = 11 // 이전 호출보다 1 더 큰 값을 반환합니다.
counter() = 12 // 이전 호출보다 1 더 큰 값을 반환합니다.
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> 
n = -2
[&quot;call&quot;,&quot;call&quot;,&quot;call&quot;,&quot;call&quot;,&quot;call&quot;]
<strong>출력:</strong> [-2,-1,0,1,2]
<strong>설명:</strong> counter()는 처음에 -2를 반환합니다. 이후 각 호출 후에 1씩 증가합니다.
</pre>

<p>&nbsp;</p>
<p><strong>제약 조건:</strong></p>

<ul>
	<li><code>-1000<sup>&nbsp;</sup>&lt;= n &lt;= 1000</code></li>
	<li><code>0 &lt;= calls.length &lt;= 1000</code></li>
	<li><code>calls[i] === &quot;call&quot;</code></li>
</ul>