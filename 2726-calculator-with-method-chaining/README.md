<h2><a href="https://leetcode.com/problems/calculator-with-method-chaining">2726. 메서드 체인으로 구현된 계산기</a></h2><h3>쉬움</h3><hr><p><code>Calculator</code> 클래스를 설계하세요. 이 클래스는 덧셈, 뺄셈, 곱셈, 나눗셈, 제곱 연산을 제공해야 합니다. 또한 메서드 체이닝을 통해 연속적인 연산이 가능해야 합니다. <code>Calculator</code> 클래스 생성자는 <code>result</code>의 초기값으로 사용될 숫자를 받아야 합니다.</p>

<p><font face="monospace"><code>Calculator</code>&nbsp;</font>클래스는 다음과 같은 메서드를 가져야 합니다:</p>

<ul>
	<li><code>add</code> - 주어진 숫자 <code>value</code>를 <code>result</code>에 더하고 업데이트된 <code>Calculator</code>를 반환하는 메서드입니다.</li>
	<li><code>subtract</code> -&nbsp;주어진 숫자 <code>value</code>를 <code>result</code>에서 빼고 업데이트된 <code>Calculator</code>를 반환하는 메서드입니다.</li>
	<li><code>multiply</code> -&nbsp;<code>result</code>를 주어진 숫자 <code>value</code>로 곱하고 업데이트된 <code>Calculator</code>를 반환하는 메서드입니다.</li>
	<li><code>divide</code> -&nbsp;<code>result</code>를 주어진 숫자 <code>value</code>로 나누고 업데이트된 <code>Calculator</code>를 반환하는 메서드입니다. 만약 전달된 값이 <code>0</code>이라면, <code>&quot;Division by zero is not allowed&quot;</code>라는 오류를 발생시켜야 합니다.</li>
	<li><code>power</code> -&nbsp;<code>result</code>를 주어진 숫자 <code>value</code>의 제곱으로 올리고 업데이트된 <code>Calculator</code>를 반환하는 메서드입니다.</li>
	<li><code>getResult</code> -&nbsp;<code>result</code>를 반환하는 메서드입니다.</li>
</ul>

<p>실제 결과와 <code>10<sup>-5</sup></code>&nbsp;이내의 차이는 올바른 것으로 간주됩니다.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> 
actions = [&quot;Calculator&quot;, &quot;add&quot;, &quot;subtract&quot;, &quot;getResult&quot;], 
values = [10, 5, 7]
<strong>출력:</strong> 8
<strong>설명:</strong> 
new Calculator(10).add(5).subtract(7).getResult() // 10 + 5 - 7 = 8
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> 
actions = [&quot;Calculator&quot;, &quot;multiply&quot;, &quot;power&quot;, &quot;getResult&quot;], 
values = [2, 5, 2]
<strong>출력:</strong> 100
<strong>설명:</strong> 
new Calculator(2).multiply(5).power(2).getResult() // (2 * 5) ^ 2 = 100
</pre>

<p><strong class="example">예제 3:</strong></p>

<pre>
<strong>입력:</strong> 
actions = [&quot;Calculator&quot;, &quot;divide&quot;, &quot;getResult&quot;], 
values = [20, 0]
<strong>출력:</strong> &quot;Division by zero is not allowed&quot;
<strong>설명:</strong> 
new Calculator(20).divide(0).getResult() // 20 / 0 

0으로 나눌 수 없기 때문에 오류를 발생시켜야 합니다.
</pre>

<p>&nbsp;</p>
<p><strong>제약사항:</strong></p>

<ul>
	<li><code>actions</code>는 유효한 문자열 배열(JSON)입니다.</li>
	<li><code>values</code>는 유효한 숫자 배열(JSON)입니다.</li>
	<li><code>2 &lt;= actions.length &lt;= 2 * 10<sup>4</sup></code></li>
	<li><code>1 &lt;= values.length &lt;= 2 * 10<sup>4</sup>&nbsp;- 1</code></li>
	<li><code>actions[i]</code>는 &quot;Calculator&quot;, &quot;add&quot;, &quot;subtract&quot;, &quot;multiply&quot;, &quot;divide&quot;, &quot;power&quot;, &quot;getResult&quot; 중 하나입니다.</li>
	<li>첫 번째 action은 항상 &quot;Calculator&quot;입니다.</li>
	<li>마지막 action은 항상 &quot;getResult&quot;입니다.</li>
</ul>