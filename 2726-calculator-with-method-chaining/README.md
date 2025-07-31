<h2><a href="https://leetcode.com/problems/calculator-with-method-chaining">2726. 메서드 체인으로 계산기</a></h2><h3>쉬움</h3><hr><p><code>Calculator</code> 클래스를 설계하세요. 이 클래스는 덧셈, 뺄셈, 곱셈, 나눗셈, 지수의 수학적 연산을 제공해야 합니다. 또한 메서드 체인을 사용하여 연속적인 연산을 수행할 수 있어야 합니다. <code>Calculator</code> 클래스 생성자는 <code>result</code>의 초기 값을 제공하는 숫자를 받아야 합니다.</p>

<p>당신의 <font face="monospace"><code>Calculator</code>&nbsp;</font> 클래스는 다음과 같은 메서드를 가져야 합니다:</p>

<ul>
	<li><code>add</code> - 이 메서드는 주어진 숫자 <code>value</code>를 <code>result</code>에 더하고 업데이트된 <code>Calculator</code>를 반환합니다.</li>
	<li><code>subtract</code> - 이 메서드는 주어진 숫자 <code>value</code>를 <code>result</code>에서 빼고 업데이트된 <code>Calculator</code>를 반환합니다.</li>
	<li><code>multiply</code> - 이 메서드는 <code>result</code>에 주어진 숫자 <code>value</code>를 곱하고 업데이트된 <code>Calculator</code>를 반환합니다.</li>
	<li><code>divide</code> - 이 메서드는 <code>result</code>를 주어진 숫자 <code>value</code>로 나누고 업데이트된 <code>Calculator</code>를 반환합니다. 전달된 값이 <code>0</code>인 경우, <code>&quot;Division by zero is not allowed&quot;</code> 오류가 발생해야 합니다.</li>
	<li><code>power</code> - 이 메서드는 <code>result</code>를 주어진 숫자 <code>value</code>의 지수로 거듭 제곱하고 업데이트된 <code>Calculator</code>를 반환합니다.</li>
	<li><code>getResult</code> - 이 메서드는 <code>result</code>를 반환합니다.</li>
</ul>

<p>실제 결과의 <code>10<sup>-5</sup></code> 내의 솔루션은 올바른 것으로 간주됩니다.</p>

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

0으로 나눌 수 없으므로 오류가 발생해야 합니다.
</pre>

<p>&nbsp;</p>
<p><strong>제약 사항:</strong></p>

<ul>
	<li><code>actions</code>는 문자열의 유효한 JSON 배열입니다.</li>
	<li><code>values</code>는 숫자의 유효한 JSON 배열입니다.</li>
	<li><code>2 &lt;= actions.length &lt;= 2 * 10<sup>4</sup></code></li>
	<li><code>1 &lt;= values.length &lt;= 2 * 10<sup>4</sup>&nbsp;- 1</code></li>
	<li><code>actions[i]</code>는 &quot;Calculator&quot;, &quot;add&quot;, &quot;subtract&quot;, &quot;multiply&quot;, &quot;divide&quot;, &quot;power&quot;, &quot;getResult&quot; 중 하나입니다.</li>
	<li>첫 번째 행동은 항상 &quot;Calculator&quot;입니다.</li>
	<li>마지막 행동은 항상 &quot;getResult&quot;입니다.</li>
</ul>