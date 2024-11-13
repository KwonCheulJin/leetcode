<h2><a href="https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string">28. 문자열 안에서 첫 번째 발생한 인덱스 찾기</a></h2><h3>쉬움</h3><hr><p>두 문자열 <code>needle</code>과 <code>haystack</code>이 주어졌을 때, <code>needle</code>이 <code>haystack</code>에 처음으로 출현하는 인덱스를 반환하고, <code>needle</code>이 <code>haystack</code>의 부분이 아니면 <code>-1</code>을 반환합니다.</p>

<p>&nbsp;</p>
<p><strong class="example">예시 1:</strong></p>

<pre>
<strong>입력:</strong> haystack = &quot;sadbutsad&quot;, needle = &quot;sad&quot;
<strong>출력:</strong> 0
<strong>설명:</strong> &quot;sad&quot;는 인덱스 0과 6에서 나타납니다.
처음 발생한 것은 인덱스 0이므로, 0을 반환합니다.
</pre>

<p><strong class="example">예시 2:</strong></p>

<pre>
<strong>입력:</strong> haystack = &quot;leetcode&quot;, needle = &quot;leeto&quot;
<strong>출력:</strong> -1
<strong>설명:</strong> &quot;leeto&quot;는 &quot;leetcode&quot;에 나타나지 않으므로, -1을 반환합니다.
</pre>

<p>&nbsp;</p>
<p><strong>제약 사항:</strong></p>

<ul>
	<li><code>1 &lt;= haystack.length, needle.length &lt;= 10<sup>4</sup></code></li>
	<li><code>haystack</code>과 <code>needle</code>은 소문자 영어 문자만 포함합니다.</li>
</ul>