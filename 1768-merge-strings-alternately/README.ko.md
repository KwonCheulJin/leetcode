<h2><a href="https://leetcode.com/problems/merge-strings-alternately">1768. 번갈아가며 문자열 합치기</a></h2><h3>쉬움</h3><hr><p>두 개의 문자열 <code>word1</code>과 <code>word2</code>가 주어집니다. <code>word1</code>로 시작하여 번갈아가며 글자를 추가하는 방식으로 문자열을 합치세요. 한 문자열이 다른 문자열보다 길 경우, 추가적인 글자를 합쳐진 문자열 끝에 붙이십시오.</p>

<p>합쳐진 문자열을 반환하세요.</p>

<p>&nbsp;</p>
<p><strong class="example">예시 1:</strong></p>

<pre>
<strong>입력:</strong> word1 = &quot;abc&quot;, word2 = &quot;pqr&quot;
<strong>출력:</strong> &quot;apbqcr&quot;
<strong>설명:</strong>&nbsp;합쳐진 문자열은 다음과 같이 합쳐집니다:
word1:  a   b   c
word2:    p   q   r
합친 후: a p b q c r
</pre>

<p><strong class="example">예시 2:</strong></p>

<pre>
<strong>입력:</strong> word1 = &quot;ab&quot;, word2 = &quot;pqrs&quot;
<strong>출력:</strong> &quot;apbqrs&quot;
<strong>설명:</strong>&nbsp;word2가 더 길기 때문에, &quot;rs&quot;가 끝에 추가됩니다.
word1:  a   b 
word2:    p   q   r   s
합친 후: a p b q   r   s
</pre>

<p><strong class="example">예시 3:</strong></p>

<pre>
<strong>입력:</strong> word1 = &quot;abcd&quot;, word2 = &quot;pq&quot;
<strong>출력:</strong> &quot;apbqcd&quot;
<strong>설명:</strong>&nbsp;word1이 더 길기 때문에, &quot;cd&quot;가 끝에 추가됩니다.
word1:  a   b   c   d
word2:    p   q 
합친 후: a p b q c   d
</pre>

<p>&nbsp;</p>
<p><strong>제약사항:</strong></p>

<ul>
	<li><code>1 &lt;= word1.length, word2.length &lt;= 100</code></li>
	<li><code>word1</code>과 <code>word2</code>는 소문자 영어 글자로 구성됩니다.</li>
</ul>