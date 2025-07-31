<h2><a href="https://leetcode.com/problems/roman-to-integer">13. 로마 숫자를 정수로</a></h2><h3>쉬움</h3><hr><p>로마 숫자는 일곱 가지 다른 기호로 표현됩니다: <code>I</code>, <code>V</code>, <code>X</code>, <code>L</code>, <code>C</code>, <code>D</code>, <code>M</code>.</p>

<pre>
<strong>기호</strong>       <strong>값</strong>
I             1
V             5
X             10
L             50
C             100
D             500
M             1000</pre>

<p>예를 들어, <code>2</code>는 로마 숫자로 <code>II</code>로 씁니다, 이는 단지 두 개의 일들이 더해진 것입니다. <code>12</code>는 <code>XII</code>, 이것은 간단히 <code>X + II</code>입니다. 숫자 <code>27</code>은 <code>XXVII</code>로 써지는데, 이는 <code>XX + V + II</code>입니다.</p>

<p>로마 숫자는 일반적으로 왼쪽에서 오른쪽으로 큰 것에서 작은 것 순서로 쓰여집니다. 그러나 숫자 4는 <code>IIII</code>가 아닙니다. 대신, 숫자 4는 <code>IV</code>로 씁니다. 왜냐하면 5 앞에 1이 있어서 4가 됩니다. 같은 원리가 9라는 숫자에도 적용되어 <code>IX</code>로 씁니다. 다음 여섯 가지 경우에 빼기가 사용됩니다:</p>

<ul>
	<li><code>I</code>는 <code>V</code>(5)와 <code>X</code>(10) 앞에 놓여 4와 9를 만듭니다.&nbsp;</li>
	<li><code>X</code>는 <code>L</code>(50)과 <code>C</code>(100) 앞에 놓여 40과 90을 만듭니다.&nbsp;</li>
	<li><code>C</code>는 <code>D</code>(500)와 <code>M</code>(1000) 앞에 놓여 400과 900을 만듭니다.</li>
</ul>

<p>주어진 로마 숫자를 정수로 변환하세요.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> s = "III"
<strong>출력:</strong> 3
<strong>설명:</strong> III = 3.
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> s = "LVIII"
<strong>출력:</strong> 58
<strong>설명:</strong> L = 50, V = 5, III = 3.
</pre>

<p><strong class="example">예제 3:</strong></p>

<pre>
<strong>입력:</strong> s = "MCMXCIV"
<strong>출력:</strong> 1994
<strong>설명:</strong> M = 1000, CM = 900, XC = 90, IV = 4.
</pre>

<p>&nbsp;</p>
<p><strong>제약 사항:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 15</code></li>
	<li><code>s</code>는 <code>(&#39;I&#39;, &#39;V&#39;, &#39;X&#39;, &#39;L&#39;, &#39;C&#39;, &#39;D&#39;, &#39;M&#39;)</code> 문자들만 포함합니다.</li>
	<li> <code>s</code>가 <code>[1, 3999]</code> 범위 내의 유효한 로마 숫자임이 <strong>보장</strong>됩니다.</li>
</ul>
