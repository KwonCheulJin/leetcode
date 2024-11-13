<h2><a href="https://leetcode.com/problems/valid-palindrome">125. Valid Palindrome</a></h2><h3>쉬움</h3><hr><p>어떤 구문은 모든 대문자를 소문자로 변환하고 모든 영숫자가 아닌 문자를 제거한 후 앞뒤로 동일하게 읽힐 경우 <strong>회문</strong>입니다. 영숫자 문자는 문자와 숫자를 포함합니다.</p>

<p>문자열 <code>s</code>가 주어질 때, 회문이면 <em><code>true</code>를 반환하고, 그렇지 않으면 <code>false</code>를 반환</em>하세요.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> s = &quot;A man, a plan, a canal: Panama&quot;
<strong>출력:</strong> true
<strong>설명:</strong> &quot;amanaplanacanalpanama&quot;는 회문입니다.
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> s = &quot;race a car&quot;
<strong>출력:</strong> false
<strong>설명:</strong> &quot;raceacar&quot;는 회문이 아닙니다.
</pre>

<p><strong class="example">예제 3:</strong></p>

<pre>
<strong>입력:</strong> s = &quot; &quot;
<strong>출력:</strong> true
<strong>설명:</strong> 모든 영숫자가 아닌 문자를 제거하면 s는 &quot;&quot;가 됩니다.
빈 문자열은 앞뒤로 동일하게 읽히므로 회문입니다.
</pre>

<p>&nbsp;</p>
<p><strong>제약 조건:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 2 * 10<sup>5</sup></code></li>
	<li><code>s</code>는 프린트 가능한 ASCII 문자로만 구성됩니다.</li>
</ul>