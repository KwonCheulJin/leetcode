<h2><a href="https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string">28. 문자열 내 첫 번째 발생의 인덱스 찾기</a></h2><h3>쉬움</h3><hr><p>두 문자열 <code>needle</code>과 <code>haystack</code>이 주어질 때, <code>haystack</code>에서 <code>needle</code>이 처음으로 발생하는 인덱스를 반환하거나, <code>needle</code>이 <code>haystack</code>의 일부가 아니면 <code>-1</code>을 반환하십시오.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> haystack = "sadbutsad", needle = "sad"
<strong>출력:</strong> 0
<strong>설명:</strong> "sad"는 인덱스 0과 6에서 발생합니다. 첫 번째 발생은 인덱스 0에 있으므로 0을 반환합니다.
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> haystack = "leetcode", needle = "leeto"
<strong>출력:</strong> -1
<strong>설명:</strong> "leeto"는 "leetcode"에서 발생하지 않았으므로 -1을 반환합니다.
</pre>

<p>&nbsp;</p>
<p><strong>제약 조건:</strong></p>

<ul>
	<li><code>1 &lt;= haystack.length, needle.length &lt;= 10<sup>4</sup></code></li>
	<li><code>haystack</code>과 <code>needle</code>은 소문자 영어 문자로만 구성되어 있습니다.</li>
</ul>