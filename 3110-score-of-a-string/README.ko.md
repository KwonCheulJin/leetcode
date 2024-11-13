<h2><a href="https://leetcode.com/problems/score-of-a-string/solutions/5241514/3110-score-of-a-string/">3110. 문자열의 점수</a></h2><h3>쉬움</h3><hr><p>문자열 <code>s</code>가 주어집니다. 문자열의 <strong>점수</strong>는 인접한 문자들의 <strong>ASCII</strong> 값의 차의 절대값의 합으로 정의됩니다.</p>

<p>문자열 <code>s</code>의 <strong>점수</strong>를 반환하세요.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<div class="example-block">
<p><strong>입력:</strong> <span class="example-io">s = &quot;hello&quot;</span></p>

<p><strong>출력:</strong> <span class="example-io">13</span></p>

<p><strong>설명:</strong></p>

<p>문자열 <code>s</code>의 각 문자들의 <strong>ASCII</strong> 값은 다음과 같습니다: <code>&#39;h&#39; = 104</code>, <code>&#39;e&#39; = 101</code>, <code>&#39;l&#39; = 108</code>, <code>&#39;o&#39; = 111</code>. 따라서 문자열 <code>s</code>의 점수는 <code>|104 - 101| + |101 - 108| + |108 - 108| + |108 - 111| = 3 + 7 + 0 + 3 = 13</code>입니다.</p>
</div>

<p><strong class="example">예제 2:</strong></p>

<div class="example-block">
<p><strong>입력:</strong> <span class="example-io">s = &quot;zaz&quot;</span></p>

<p><strong>출력:</strong> <span class="example-io">50</span></p>

<p><strong>설명:</strong></p>

<p>문자열 <code>s</code>의 각 문자들의 <strong>ASCII</strong> 값은 다음과 같습니다: <code>&#39;z&#39; = 122</code>, <code>&#39;a&#39; = 97</code>. 따라서 문자열 <code>s</code>의 점수는 <code>|122 - 97| + |97 - 122| = 25 + 25 = 50</code>입니다.</p>
</div>

<p>&nbsp;</p>
<p><strong>제약 조건:</strong></p>

<ul>
	<li><code>2 &lt;= s.length &lt;= 100</code></li>
	<li><code>s</code>는 소문자 영어 알파벳으로만 구성됩니다.</li>
</ul>