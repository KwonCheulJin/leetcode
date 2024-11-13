<h2><a href="https://leetcode.com/problems/to-be-or-not-to-be">2704. To Be Or Not To Be</a></h2><h3>Easy</h3><hr><p>개발자들이 코드를 테스트할 수 있도록 돕는 <code>expect</code> 함수를 작성하세요. 이 함수는 임의의 값 <code>val</code>을 받아들이고 다음 두 가지 함수를 포함하는 객체를 반환해야 합니다.</p>

<ul>
	<li><code>toBe(val)</code>은 또 다른 값을 수락하며 두 값이 <code>===</code> 일치할 경우 <code>true</code>를 반환합니다. 만약 두 값이 같지 않다면, <code>&quot;Not Equal&quot;</code> 오류를 던져야 합니다.</li>
	<li><code>notToBe(val)</code>은 또 다른 값을 수락하며 두 값이 <code>!==</code> 일치하지 않을 경우 <code>true</code>를 반환합니다. 만약 두 값이 같다면, <code>&quot;Equal&quot;</code> 오류를 던져야 합니다.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> func = () =&gt; expect(5).toBe(5)
<strong>출력:</strong> {&quot;value&quot;: true}
<strong>설명:</strong> 5 === 5 이므로 이 표현식은 true를 반환합니다.
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> func = () =&gt; expect(5).toBe(null)
<strong>출력:</strong> {&quot;error&quot;: &quot;Not Equal&quot;}
<strong>설명:</strong> 5 !== null 이므로 이 표현식은 &quot;Not Equal&quot; 오류를 던집니다.
</pre>

<p><strong class="example">예제 3:</strong></p>

<pre>
<strong>입력:</strong> func = () =&gt; expect(5).notToBe(null)
<strong>출력:</strong> {&quot;value&quot;: true}
<strong>설명:</strong> 5 !== null 이므로 이 표현식은 true를 반환합니다.
</pre>