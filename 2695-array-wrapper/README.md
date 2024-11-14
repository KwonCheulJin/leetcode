<h2><a href="https://leetcode.com/problems/array-wrapper">2695. Array Wrapper</a></h2><h3>쉬움</h3><hr><p>정수 배열을 생성자의 인자로 받아들이는 <code>ArrayWrapper</code> 클래스를 만드세요. 이 클래스는 두 가지 기능을 가져야 합니다:</p>

<ul>
	<li>이 클래스의 두 인스턴스가 <code>+</code> 연산자로 서로 더해질 때, 결과 값은 두 배열의 모든 요소의 합이어야 합니다.</li>
	<li>인스턴스에 대해 <code>String()</code> 함수가 호출될 때, 대괄호로 둘러싸인 쉼표로 구분된 문자열을 반환해야 합니다. 예를 들어, <code>[1,2,3]</code>와 같이요.</li>
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
<p><strong>제약 사항:</strong></p>

<ul>
	<li><code>0 &lt;= nums.length &lt;= 1000</code></li>
	<li><code>0 &lt;= nums[i]&nbsp;&lt;= 1000</code></li>
	<li><code>참고: nums는 생성자에 전달되는 배열입니다</code></li>
</ul>