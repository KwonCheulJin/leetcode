<h2><a href="https://leetcode.com/problems/valid-parentheses">20. 유효한 괄호</a></h2><h3>쉬움</h3><hr><p>문자열 <code>s</code>가 <code>&#39;(&#39;</code>, <code>&#39;)&#39;</code>, <code>&#39;{&#39;</code>, <code>&#39;}&#39;</code>, <code>&#39;[&#39;</code> 및 <code>&#39;]&#39;</code> 문자로만 이루어져 있을 때, 입력 문자열이 유효한지 판별하세요.</p>

<p>입력 문자열이 유효하려면 다음 조건을 만족해야 합니다:</p>

<ol>
	<li>열린 괄호는 같은 종류의 괄호로 닫혀야 합니다.</li>
	<li>열린 괄호는 올바른 순서로 닫혀야 합니다.</li>
	<li>모든 닫힌 괄호는 대응하는 같은 종류의 열린 괄호가 있어야 합니다.</li>
</ol>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<div class="example-block">
<p><strong>입력:</strong> <span class="example-io">s = &quot;()&quot;</span></p>

<p><strong>출력:</strong> <span class="example-io">true</span></p>
</div>

<p><strong class="example">예제 2:</strong></p>

<div class="example-block">
<p><strong>입력:</strong> <span class="example-io">s = &quot;()[]{}&quot;</span></p>

<p><strong>출력:</strong> <span class="example-io">true</span></p>
</div>

<p><strong class="example">예제 3:</strong></p>

<div class="example-block">
<p><strong>입력:</strong> <span class="example-io">s = &quot;(]&quot;</span></p>

<p><strong>출력:</strong> <span class="example-io">false</span></p>
</div>

<p><strong class="example">예제 4:</strong></p>

<div class="example-block">
<p><strong>입력:</strong> <span class="example-io">s = &quot;([])&quot;</span></p>

<p><strong>출력:</strong> <span class="example-io">true</span></p>
</div>

<p>&nbsp;</p>
<p><strong>제약 사항:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 10<sup>4</sup></code></li>
	<li><code>s</code>는 괄호 <code>&#39;()[]{}&#39;</code>로만 구성되어 있습니다.</li>
</ul>