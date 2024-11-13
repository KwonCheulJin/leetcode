<h2><a href="https://leetcode.com/problems/palindrome-number">9. 팰린드롬 숫자</a></h2><h3>쉬움</h3><hr><p>정수 <code>x</code>가 주어질 때, <code>x</code>가 <span data-keyword="palindrome-integer"><em><strong>팰린드롬</strong></em></span>이면 <code>true</code>를 반환하고, 그렇지 않으면 <code>false</code>를 반환합니다.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> x = 121
<strong>출력:</strong> true
<strong>설명:</strong> 121은 왼쪽에서 오른쪽, 오른쪽에서 왼쪽으로 읽어도 동일합니다.
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> x = -121
<strong>출력:</strong> false
<strong>설명:</strong> 왼쪽에서 오른쪽으로 읽으면 -121입니다. 오른쪽에서 왼쪽으로 읽으면 121-가 됩니다. 따라서 팰린드롬이 아닙니다.
</pre>

<p><strong class="example">예제 3:</strong></p>

<pre>
<strong>입력:</strong> x = 10
<strong>출력:</strong> false
<strong>설명:</strong> 오른쪽에서 왼쪽으로 읽으면 01입니다. 따라서 팰린드롬이 아닙니다.
</pre>

<p>&nbsp;</p>
<p><strong>제약 조건:</strong></p>

<ul>
	<li><code>-2<sup>31</sup>&nbsp;&lt;= x &lt;= 2<sup>31</sup>&nbsp;- 1</code></li>
</ul>

<p>&nbsp;</p>
<strong>추가 질문:</strong> 정수를 문자열로 변환하지 않고 해결할 수 있습니까?