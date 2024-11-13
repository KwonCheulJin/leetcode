<h2><a href="https://leetcode.com/problems/removing-stars-from-a-string">2390. 문자열에서 별 제거하기</a></h2><h3>중간</h3><hr><p>문자열 <code>s</code>가 주어지며, 이 문자열에는 별 <code>*</code>이 포함되어 있습니다.</p>

<p>하나의 작업에서, 다음을 수행할 수 있습니다:</p>

<ul>
	<li><code>s</code>에서 별 하나를 선택합니다.</li>
	<li>선택한 별의 <strong>왼쪽</strong>에서 가장 가까운 <strong>별이 아닌</strong> 문자를 제거하고, 별 자체도 제거합니다.</li>
</ul>

<p>모든 <strong>별</strong>이 제거된 후의 문자열을 반환하세요.</p>

<p><strong>참고:</strong></p>

<ul>
	<li>입력은 작업이 항상 가능하도록 생성됩니다.</li>
	<li>결과 문자열이 항상 유일하다는 것을 보여줄 수 있습니다.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> s = &quot;leet**cod*e&quot;
<strong>출력:</strong> &quot;lecoe&quot;
<strong>설명:</strong> 왼쪽에서 오른쪽으로 제거를 수행합니다:
- 첫 번째 별에 가장 가까운 문자는 &quot;lee<strong><u>t</u></strong>**cod*e&quot;의 &#39;t&#39;입니다. s는 &quot;lee*cod*e&quot;가 됩니다.
- 두 번째 별에 가장 가까운 문자는 &quot;le<strong><u>e</u></strong>*cod*e&quot;의 &#39;e&#39;입니다. s는 &quot;lecod*e&quot;가 됩니다.
- 세 번째 별에 가장 가까운 문자는 &quot;leco<strong><u>d</u></strong>*e&quot;의 &#39;d&#39;입니다. s는 &quot;lecoe&quot;가 됩니다.
더 이상 별이 없으므로 &quot;lecoe&quot;를 반환합니다.</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> s = &quot;erase*****&quot;
<strong>출력:</strong> &quot;&quot;
<strong>설명:</strong> 전체 문자열이 제거되므로, 빈 문자열을 반환합니다.
</pre>

<p>&nbsp;</p>
<p><strong>제약 조건:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s</code>는 소문자 영어 알파벳 및 별 <code>*</code>로 구성됩니다.</li>
	<li>위 작업은 <code>s</code>에서 수행 가능합니다.</li>
</ul>