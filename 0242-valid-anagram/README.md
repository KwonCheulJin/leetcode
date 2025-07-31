<h2><a href="https://leetcode.com/problems/valid-anagram">242. 유효한 애너그램</a></h2><h3>쉬움</h3><hr><p>두 문자열 <code>s</code>와 <code>t</code>가 주어졌을 때, <code>t</code>가 <code>s</code>의 <span data-keyword="anagram">애너그램</span>이면 <code>true</code>를 반환하고, 그렇지 않으면 <code>false</code>를 반환하세요.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<div class="example-block">
<p><strong>입력:</strong> <span class="example-io">s = "anagram", t = "nagaram"</span></p>

<p><strong>출력:</strong> <span class="example-io">true</span></p>
</div>

<p><strong class="example">예제 2:</strong></p>

<div class="example-block">
<p><strong>입력:</strong> <span class="example-io">s = "rat", t = "car"</span></p>

<p><strong>출력:</strong> <span class="example-io">false</span></p>
</div>

<p>&nbsp;</p>
<p><strong>제약사항:</strong></p>

<ul>
	<li><code>1 &lt;= s.length, t.length &lt;= 5 * 10<sup>4</sup></code></li>
	<li><code>s</code>와 <code>t</code>는 소문자 영어 알파벳으로 이루어져 있습니다.</li>
</ul>

<p>&nbsp;</p>
<p><strong>고려할 사항:</strong> 입력에 유니코드 문자가 포함된다면 어떻게 해결 방식을 적용할 수 있을까요?</p>