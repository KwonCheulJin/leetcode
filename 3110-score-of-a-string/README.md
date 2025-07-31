<h2><a href="https://leetcode.com/problems/score-of-a-string/solutions/5241514/3110-score-of-a-string/">3110. 문자열의 점수</a></h2><h3>쉬움</h3><hr><p>문자열 <code>s</code>가 주어집니다. 문자열의 <strong>점수</strong>는 인접한 문자 간의 <strong>ASCII</strong> 값의 절대 차이의 합으로 정의됩니다.</p>

<p>문자열 <code>s</code>의 <strong>점수</strong>를 반환하세요.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<div class="example-block">
<p><strong>입력:</strong> <span class="example-io">s = "hello"</span></p>

<p><strong>출력:</strong> <span class="example-io">13</span></p>

<p><strong>설명:</strong></p>

<p><code>s</code> 에 있는 문자의 <strong>ASCII</strong> 값은: <code>'h' = 104</code>, <code>'e' = 101</code>, <code>'l' = 108</code>, <code>'o' = 111</code>. 따라서, <code>s</code> 의 점수는 <code>|104 - 101| + |101 - 108| + |108 - 108| + |108 - 111| = 3 + 7 + 0 + 3 = 13</code> 입니다.</p>
</div>

<p><strong class="example">예제 2:</strong></p>

<div class="example-block">
<p><strong>입력:</strong> <span class="example-io">s = "zaz"</span></p>

<p><strong>출력:</strong> <span class="example-io">50</span></p>

<p><strong>설명:</strong></p>

<p><code>s</code> 에 있는 문자의 <strong>ASCII</strong> 값은: <code>'z' = 122</code>, <code>'a' = 97</code>. 따라서, <code>s</code> 의 점수는 <code>|122 - 97| + |97 - 122| = 25 + 25 = 50</code> 입니다.</p>
</div>

<p>&nbsp;</p>
<p><strong>제약 사항:</strong></p>

<ul>
	<li><code>2 &lt;= s.length &lt;= 100</code></li>
	<li><code>s</code>는 소문자 영문자로만 구성됩니다.</li>
</ul>