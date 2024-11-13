<h2><a href="https://leetcode.com/problems/jewels-and-stones">771. 보석과 돌</a></h2><h3>쉬움</h3><hr><p>당신에게 보석 종류를 나타내는 <code>jewels</code> 문자열과 당신이 가지고 있는 돌을 나타내는 <code>stones</code> 문자열이 주어집니다. <code>stones</code>의 각 문자는 당신이 가지고 있는 돌의 종류입니다. 당신은 당신이 가지고 있는 돌 중 보석인 것이 몇 개인지 알고 싶습니다.</p>

<p>문자는 대소문자를 구분하므로, <code>&quot;a&quot;</code>는 <code>&quot;A&quot;</code>와 다른 종류의 돌로 간주됩니다.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>
<pre><strong>입력:</strong> jewels = "aA", stones = "aAAbbbb"
<strong>출력:</strong> 3
</pre><p><strong class="example">예제 2:</strong></p>
<pre><strong>입력:</strong> jewels = "z", stones = "ZZ"
<strong>출력:</strong> 0
</pre>
<p>&nbsp;</p>
<p><strong>제약사항:</strong></p>

<ul>
	<li><code>1 &lt;=&nbsp;jewels.length, stones.length &lt;= 50</code></li>
	<li><code>jewels</code>와 <code>stones</code>는 오직 영어 알파벳으로만 구성되어 있습니다.</li>
	<li><code>jewels</code>의 모든 문자는 <strong>고유</strong>합니다.</li>
</ul>