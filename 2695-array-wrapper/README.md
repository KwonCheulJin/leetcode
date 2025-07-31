<h2><a href="https://leetcode.com/problems/array-wrapper">2695. 배열 래퍼</a></h2><h3>쉬움</h3><hr><p>정수 배열을 생성자에서 수용하는 <code>ArrayWrapper</code> 클래스를 만드세요. 이 클래스는 두 가지 기능이 있어야 합니다:</p>

<ul>
	<li>이 클래스의 두 인스턴스가 <code>+</code> 연산자로 함께 더해질 때, 결과값은 두 배열의 모든 요소의 합입니다.</li>
	<li>인스턴스에 대해 <code>String()</code> 함수가 호출되면, 콤마로 구분된 문자열이 대괄호로 둘러싸인 형태로 반환됩니다. 예를 들어, <code>[1,2,3]</code>.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> nums = [[1,2],[3,4]], operation = "Add"
<strong>출력:</strong> 10
<strong>설명:</strong>
const obj1 = new ArrayWrapper([1,2]);
const obj2 = new ArrayWrapper([3,4]);
obj1 + obj2; // 10
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> nums = [[23,98,42,70]], operation = "String"
<strong>출력:</strong> "[23,98,42,70]"
<strong>설명:</strong>
const obj = new ArrayWrapper([23,98,42,70]);
String(obj); // "[23,98,42,70]"
</pre>

<p><strong class="example">예제 3:</strong></p>

<pre>
<strong>입력:</strong> nums = [[],[]], operation = "Add"
<strong>출력:</strong> 0
<strong>설명:</strong>
const obj1 = new ArrayWrapper([]);
const obj2 = new ArrayWrapper([]);
obj1 + obj2; // 0
</pre>

<p>&nbsp;</p>
<p><strong>제약 조건:</strong></p>

<ul>
	<li><code>0 &lt;= nums.length &lt;= 1000</code></li>
	<li><code>0 &lt;= nums[i] &lt;= 1000</code></li>
	<li><code>참고: nums는 생성자에 전달된 배열입니다</code></li>
</ul>