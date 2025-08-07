<h2><a href="https://leetcode.com/problems/removing-stars-from-a-string">2390. 문자열에서 별표 제거하기</a></h2><h3>중간</h3><hr><p>별표 <code>*</code>를 포함한 문자열 <code>s</code>가 주어졌을 때, 별표가 남아 있지 않을 때까지 다음 작업을 수행할 수 있습니다:</p>

<ul>
	<li>문자열 <code>s</code>에서 별표를 선택합니다.</li>
	<li>별표의 왼쪽에 가장 가까운 <strong>별표가 아닌</strong> 문자를 제거하고, 별표 자체도 제거합니다.</li>
</ul>

<p>모든 별표가 제거된 후의 문자열을 반환합니다.</p>

<p><strong>참고:</strong></p>

<ul>
	<li>작업이 항상 가능하도록 입력이 생성됩니다.</li>
	<li>결과 문자열은 항상 유일함을 보일 수 있습니다.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> s = "leet**cod*e"
<strong>출력:</strong> "lecoe"
<strong>설명:</strong> 왼쪽에서 오른쪽으로 제거를 수행하면:
- 첫 번째 별표에 가장 가까운 문자는 "lee<strong><u>t</u></strong>**cod*e"이며, 't'를 제거하면 "lee*cod*e"가 됩니다.
- 두 번째 별표에 가장 가까운 문자는 "le<strong><u>e</u></strong>*cod*e"이며, 'e'를 제거하면 "lecod*e"가 됩니다.
- 세 번째 별표에 가장 가까운 문자는 "leco<strong><u>d</u></strong>*e"이며, 'd'를 제거하면 "lecoe"가 됩니다.
이제 별표가 없으며, "lecoe"가 반환됩니다.</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> s = "erase*****"
<strong>출력:</strong> ""
<strong>설명:</strong> 모든 문자가 제거되며, 빈 문자열이 반환됩니다.
</pre>

<p>&nbsp;</p>
<p><strong>제약 조건:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s</code>는 소문자 영어 알파벳과 별표 <code>*</code>로 구성됩니다.</li>
	<li><code>s</code>에 대해 작업이 가능하게 주어집니다.</li>
</ul>