<h2><a href="https://leetcode.com/problems/valid-parentheses">20. 유효한 괄호</a></h2><h3>쉬움</h3><hr><p>문자 <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code>, <code>']'</code> 만 포함된 문자열 <code>s</code>가 주어질 때, 입력 문자열이 유효한지 확인하세요.</p>

<p>입력 문자열이 유효하려면 다음을 만족해야 합니다:</p>

<ol>
	<li>여는 괄호는 반드시 같은 유형의 괄호로 닫혀야 합니다.</li>
	<li>여는 괄호는 올바른 순서로 닫혀야 합니다.</li>
	<li>모든 닫는 괄호는 해당하는 유형의 여는 괄호가 있어야 합니다.</li>
</ol>

<p>&nbsp;</p>
<p><strong class="example">예시 1:</strong></p>

<div class="example-block">
<p><strong>입력:</strong> <span class="example-io">s = "()" </span></p>

<p><strong>출력:</strong> <span class="example-io">true</span></p>
</div>

<p><strong class="example">예시 2:</strong></p>

<div class="example-block">
<p><strong>입력:</strong> <span class="example-io">s = "()[]{}"</span></p>

<p><strong>출력:</strong> <span class="example-io">true</span></p>
</div>

<p><strong class="example">예시 3:</strong></p>

<div class="example-block">
<p><strong>입력:</strong> <span class="example-io">s = "(]"</span></p>

<p><strong>출력:</strong> <span class="example-io">false</span></p>
</div>

<p><strong class="example">예시 4:</strong></p>

<div class="example-block">
<p><strong>입력:</strong> <span class="example-io">s = "([])"</span></p>

<p><strong>출력:</strong> <span class="example-io">true</span></p>
</div>

<p><strong class="example">예시 5:</strong></p>

<div class="example-block">
<p><strong>입력:</strong> <span class="example-io">s = "([)]"</span></p>

<p><strong>출력:</strong> <span class="example-io">false</span></p>
</div>

<p>&nbsp;</p>
<p><strong>제약 사항:</strong></p>

<ul>
	<li><code>1 <= s.length <= 10<sup>4</sup></code></li>
	<li><code>s</code>는 괄호만으로 구성되어 있습니다 <code>'()[]{}'</code>.</li>
</ul>