<h2><a href="https://leetcode.com/problems/to-be-or-not-to-be">2704. 존재 여부</a></h2><h3>쉬움</h3><hr><p>개발자가 자신의 코드를 테스트할 수 있도록 <code>expect</code> 함수를 작성하세요. 이 함수는 임의의 값 <code>val</code>을 받아 아래의 두 가지 기능을 수행하는 객체를 반환해야 합니다.</p>

<ul>
	<li><code>toBe(val)</code>는 다른 값을 받아 두 값이 <code>===</code>로 동일하면 <code>true</code>를 반환합니다. 만약 같지 않으면 <code>"Not Equal"</code>이라는 오류를 발생해야 합니다.</li>
	<li><code>notToBe(val)</code>는 다른 값을 받아 두 값이 <code>!==</code>로 서로 다르면 <code>true</code>를 반환합니다. 만약 같다면 <code>"Equal"</code>이라는 오류를 발생해야 합니다.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="예제">예제 1:</strong></p>

<pre>
<strong>입력:</strong> func = () =&gt; expect(5).toBe(5)
<strong>출력:</strong> {"value": true}
<strong>설명:</strong> 5 === 5이므로 이 표현식은 true를 반환합니다.
</pre>

<p><strong class="예제">예제 2:</strong></p>

<pre>
<strong>입력:</strong> func = () =&gt; expect(5).toBe(null)
<strong>출력:</strong> {"error": "Not Equal"}
<strong>설명:</strong> 5 !== null이므로 이 표현식은 "Not Equal" 오류를 발생시킵니다.
</pre>

<p><strong class="예제">예제 3:</strong></p>

<pre>
<strong>입력:</strong> func = () =&gt; expect(5).notToBe(null)
<strong>출력:</strong> {"value": true}
<strong>설명:</strong> 5 !== null이므로 이 표현식은 true를 반환합니다.
</pre>