<h2><a href="https://leetcode.com/problems/longest-common-prefix">14. 가장 긴 공통 접두사</a></h2><h3>쉬움</h3><hr><p>문자열 배열에서 가장 긴 공통 접두사 문자열을 찾는 함수를 작성하세요.</p>

<p>공통 접두사가 없다면, 빈 문자열 <code>&quot;&quot;</code>을 반환하세요.</p>

<p>&nbsp;</p>
<p><strong class="example">예시 1:</strong></p>

<pre>
<strong>입력:</strong> strs = [&quot;flower&quot;,&quot;flow&quot;,&quot;flight&quot;]
<strong>출력:</strong> &quot;fl&quot;
</pre>

<p><strong class="example">예시 2:</strong></p>

<pre>
<strong>입력:</strong> strs = [&quot;dog&quot;,&quot;racecar&quot;,&quot;car&quot;]
<strong>출력:</strong> &quot;&quot;
<strong>설명:</strong> 입력 문자열 간에 공통 접두사가 없습니다.
</pre>

<p>&nbsp;</p>
<p><strong>제약 조건:</strong></p>

<ul>
	<li><code>1 &lt;= strs.length &lt;= 200</code></li>
	<li><code>0 &lt;= strs[i].length &lt;= 200</code></li>
	<li><code>strs[i]</code>는 소문자 영어 문자로만 구성됩니다.</li>
</ul>