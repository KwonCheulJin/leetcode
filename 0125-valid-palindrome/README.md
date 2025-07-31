<h2><a href="https://leetcode.com/problems/valid-palindrome">125. 유효한 팰린드롬</a></h2><h3>쉬움</h3><hr><p>문구가 <strong>팰린드롬</strong>이 되려면, 모든 대문자를 소문자로 변환하고 알파벳과 숫자를 제외한 모든 비알파벳 문자를 제거한 후, 앞뒤로 읽었을 때 동일한 경우를 말합니다. 알파벳 문자에는 문자와 숫자가 포함됩니다.</p>

<p>문자열 <code>s</code>가 주어졌을 때, 이것이 <strong>팰린드롬</strong>인 경우 <code>true</code>를 반환하고, 그렇지 않으면 <code>false</code>를 반환하세요.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> s = &quot;A man, a plan, a canal: Panama&quot;
<strong>출력:</strong> true
<strong>설명:</strong> &quot;amanaplanacanalpanama&quot;은 팰린드롬입니다.
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> s = &quot;race a car&quot;
<strong>출력:</strong> false
<strong>설명:</strong> &quot;raceacar&quot;은 팰린드롬이 아닙니다.
</pre>

<p><strong class="example">예제 3:</strong></p>

<pre>
<strong>입력:</strong> s = &quot; &quot;
<strong>출력:</strong> true
<strong>설명:</strong> s는 비알파벳 문자를 제거하면 빈 문자열 &quot;&quot;이 됩니다.
빈 문자열은 앞뒤로 읽었을 때 동일하므로, 팰린드롬입니다.
</pre>

<p>&nbsp;</p>
<p><strong>제약조건:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 2 * 10<sup>5</sup></code></li>
	<li><code>s</code>는 출력 가능한 ASCII 문자로만 구성됩니다.</li>
</ul>