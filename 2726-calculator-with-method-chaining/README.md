<h2><a href="https://leetcode.com/problems/calculator-with-method-chaining">2726. 메서드 체이닝이 가능한 계산기</a></h2><h3>쉬움</h3><hr><p><code>Calculator</code> 클래스를 설계하세요. 이 클래스는 덧셈, 뺄셈, 곱셈, 나눗셈 및 거듭제곱 연산을 제공해야 합니다. 또한 메서드 체이닝을 사용하여 연속적인 연산을 수행할 수 있어야 합니다. <code>Calculator</code> 클래스의 생성자는 <code>result</code>의 초기 값으로 사용되는 숫자를 받아야 합니다.</p>

<p><font face="monospace"><code>Calculator</code> </font>클래스는 다음 메서드를 포함해야 합니다:</p>

<ul>
	<li><code>add</code> - 주어진 숫자 <code>value</code>를 <code>result</code>에 더하고 업데이트된 <code>Calculator</code>를 반환합니다.</li>
	<li><code>subtract</code> - 주어진 숫자 <code>value</code>를 <code>result</code>에서 빼고 업데이트된 <code>Calculator</code>를 반환합니다.</li>
	<li><code>multiply</code> - <code>result</code>에 주어진 숫자 <code>value</code>를 곱하고 업데이트된 <code>Calculator</code>를 반환합니다.</li>
	<li><code>divide</code> - <code>result</code>를 주어진 숫자 <code>value</code>로 나누고 업데이트된 <code>Calculator</code>를 반환합니다. 만약 주어진 값이 <code>0</code>이라면, <code>"Division by zero is not allowed"</code>라는 오류를 발생시켜야 합니다.</li>
	<li><code>power</code> - <code>result</code>를 주어진 숫자 <code>value</code>의 거듭제곱으로 만들고 업데이트된 <code>Calculator</code>를 반환합니다.</li>
	<li><code>getResult</code> - <code>result</code>를 반환합니다.</li>
</ul>

<p>솔루션은 실제 결과의 <code>10<sup>-5</sup></code> 이내로 정확하면 정답으로 간주됩니다.</p>

<p>&nbsp;</p>
<p><strong class="example">예시 1:</strong></p>

<pre>
<strong>입력:</strong> 
actions = ["Calculator", "add", "subtract", "getResult"], 
values = [10, 5, 7]
<strong>출력:</strong> 8
<strong>설명:</strong> 
new Calculator(10).add(5).subtract(7).getResult() // 10 + 5 - 7 = 8
</pre>

<p><strong class="example">예시 2:</strong></p>

<pre>
<strong>입력:</strong> 
actions = ["Calculator", "multiply", "power", "getResult"], 
values = [2, 5, 2]
<strong>출력:</strong> 100
<strong>설명:</strong> 
new Calculator(2).multiply(5).power(2).getResult() // (2 * 5) ^ 2 = 100
</pre>

<p><strong class="example">예시 3:</strong></p>

<pre>
<strong>입력:</strong> 
actions = ["Calculator", "divide", "getResult"], 
values = [20, 0]
<strong>출력:</strong> "Division by zero is not allowed"
<strong>설명:</strong> 
new Calculator(20).divide(0).getResult() // 20 / 0 

0으로 나누는 것은 불가능하므로 오류가 발생해야 합니다.
</pre>

<p>&nbsp;</p>
<p><strong>제약 사항:</strong></p>

<ul>
	<li><code>actions</code>는 문자열의 유효한 JSON 배열입니다.</li>
	<li><code>values</code>는 숫자의 유효한 JSON 배열입니다.</li>
	<li><code>2 &lt;= actions.length &lt;= 2 * 10<sup>4</sup></code></li>
	<li><code>1 &lt;= values.length &lt;= 2 * 10<sup>4</sup> - 1</code></li>
	<li><code>actions[i]</code>는 "Calculator", "add", "subtract", "multiply", "divide", "power", "getResult" 중 하나입니다.</li>
	<li>첫 번째 액션은 항상 "Calculator"입니다.</li>
	<li>마지막 액션은 항상 "getResult"입니다.</li>
</ul>