<h2><a href="https://leetcode.com/problems/valid-palindrome">125. 유효한 회문</a></h2><h3>쉬움</h3><hr><p>문구가 <strong>회문</strong>이 되려면, 모든 대문자를 소문자로 변환하고 영숫자가 아닌 문자를 제거한 후에 앞에서부터 읽으나 뒤에서부터 읽으나 동일해야 합니다. 영숫자 문자는 문자와 숫자를 포함합니다.</p>

<p>문자열 <code>s</code>가 주어질 때, <code>true</code><em>를 반환하세요, 만약 그것이 <strong>회문</strong>이면</em>, 그렇지 않으면 <code>false</code><em>를 반환합니다</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">예시 1:</strong></p>

<pre>
<strong>입력:</strong> s = &quot;A man, a plan, a canal: Panama&quot;
<strong>출력:</strong> true
<strong>설명:</strong> &quot;amanaplanacanalpanama&quot;은 회문입니다.
</pre>

<p><strong class="example">예시 2:</strong></p>

<pre>
<strong>입력:</strong> s = &quot;race a car&quot;
<strong>출력:</strong> false
<strong>설명:</strong> &quot;raceacar&quot;는 회문이 아닙니다.
</pre>

<p><strong class="example">예시 3:</strong></p>

<pre>
<strong>입력:</strong> s = &quot; &quot;
<strong>출력:</strong> true
<strong>설명:</strong> 비영숫자 문자를 제거한 후 s는 빈 문자열 &quot;&quot;입니다.
빈 문자열은 앞뒤가 동일하므로 회문입니다.
</pre>

<p>&nbsp;</p>
<p><strong>제약 조건:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 2 * 10<sup>5</sup></code></li>
	<li><code>s</code>는 출력 가능한 ASCII 문자만 포함합니다.</li>
</ul>