<h2><a href="https://leetcode.com/problems/merge-strings-alternately">1768. 번갈아 문자열 합치기</a></h2><h3>쉬움</h3><hr><p>두 문자열 <code>word1</code>와 <code>word2</code>가 주어집니다. <code>word1</code>로 시작하여 번갈아가며 문자를 추가하여 문자열을 병합하세요. 만약 한 문자열이 다른 문자열보다 길다면, 병합된 문자열 끝에 나머지 문자를 추가하세요.</p>

<p>병합된 문자열을 반환합니다.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> word1 = "abc", word2 = "pqr"
<strong>출력:</strong> "apbqcr"
<strong>설명:</strong>&nbsp;병합된 문자열은 다음과 같이 병합됩니다:
word1:  a   b   c
word2:    p   q   r
병합된: a p b q c r
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> word1 = "ab", word2 = "pqrs"
<strong>출력:</strong> "apbqrs"
<strong>설명:</strong>&nbsp;word2가 더 길기 때문에 "rs"가 끝에 추가됩니다.
word1:  a   b 
word2:    p   q   r   s
병합된: a p b q   r   s
</pre>

<p><strong class="example">예제 3:</strong></p>

<pre>
<strong>입력:</strong> word1 = "abcd", word2 = "pq"
<strong>출력:</strong> "apbqcd"
<strong>설명:</strong>&nbsp;word1이 더 길기 때문에 "cd"가 끝에 추가됩니다.
word1:  a   b   c   d
word2:    p   q 
병합된: a p b q c   d
</pre>

<p>&nbsp;</p>
<p><strong>제약사항:</strong></p>

<ul>
	<li><code>1 &lt;= word1.length, word2.length &lt;= 100</code></li>
	<li><code>word1</code>와 <code>word2</code>는 소문자 영어 문자로 구성되어 있습니다.</li>
</ul>