<h2><a href="https://leetcode.com/problems/roman-to-integer">13. 로마 숫자를 정수로 변환</a></h2><h3>쉬움</h3><hr><p>로마 숫자는 다음과 같은 일곱 가지 다른 기호로 표현됩니다:&nbsp;<code>I</code>, <code>V</code>, <code>X</code>, <code>L</code>, <code>C</code>, <code>D</code> 및 <code>M</code>.</p>

<pre>
<strong>기호</strong>       <strong>값</strong>
I             1
V             5
X             10
L             50
C             100
D             500
M             1000</pre>

<p>예를 들어,&nbsp;<code>2</code>는 로마 숫자로 <code>II</code>로 씁니다. 이는 단순히 두 개의 1이 합쳐진 것입니다. <code>12</code>는&nbsp;<code>XII</code>로 쓰며, 이는 단순히 <code>X + II</code>입니다. 숫자 <code>27</code>은 <code>XXVII</code>로 쓰며, 이는 <code>XX + V + II</code>입니다.</p>

<p>로마 숫자는 일반적으로 왼쪽에서 오른쪽으로 큰 순서로 씁니다. 그러나 숫자 4의 경우는 <code>IIII</code>가 아니라 <code>IV</code>로 씁니다. 이는 5 앞에 1이 와서 4가 되는 것입니다. 같은 원리가 숫자 9에도 적용되어, <code>IX</code>로 씁니다. 아래의 여섯 경우에서 뺄셈이 사용됩니다:</p>

<ul>
	<li><code>I</code>는 <code>V</code> (5)와 <code>X</code> (10) 앞에 와서 4와 9를 만듭니다.&nbsp;</li>
	<li><code>X</code>는 <code>L</code> (50)과 <code>C</code> (100) 앞에 와서 40과 90을 만듭니다.&nbsp;</li>
	<li><code>C</code>는 <code>D</code> (500)과 <code>M</code> (1000) 앞에 와서 400과 900을 만듭니다.</li>
</ul>

<p>로마 숫자가 주어졌을 때, 이를 정수로 변환하세요.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> s = &quot;III&quot;
<strong>출력:</strong> 3
<strong>설명:</strong> III = 3.
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> s = &quot;LVIII&quot;
<strong>출력:</strong> 58
<strong>설명:</strong> L = 50, V= 5, III = 3.
</pre>

<p><strong class="example">예제 3:</strong></p>

<pre>
<strong>입력:</strong> s = &quot;MCMXCIV&quot;
<strong>출력:</strong> 1994
<strong>설명:</strong> M = 1000, CM = 900, XC = 90 그리고 IV = 4.
</pre>

<p>&nbsp;</p>
<p><strong>제약 조건:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 15</code></li>
	<li><code>s</code>는 오직 <code>(&#39;I&#39;, &#39;V&#39;, &#39;X&#39;, &#39;L&#39;, &#39;C&#39;, &#39;D&#39;, &#39;M&#39;)</code> 문자만을 포함합니다.</li>
	<li><code>s</code>는 <code>[1, 3999]</code> 범위 내의 유효한 로마 숫자인 것이 <strong>보장</strong>됩니다.</li>
</ul>