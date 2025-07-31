<h2><a href="https://leetcode.com/problems/array-wrapper">2695. 배열 래퍼</a></h2><h3>쉬움</h3><hr><p>정수 배열을 생성자에 받아들이는 <code>ArrayWrapper</code>라는 클래스를 만드세요. 이 클래스는 두 가지 기능을 가져야 합니다:</p>

<ul>
	<li>이 클래스의 두 인스턴스가 <code>+</code> 연산자로 더해질 때, 결과 값은 두 배열의 모든 요소의 합입니다.</li>
	<li>인스턴스에 <code>String()</code> 함수를 호출하면, 대괄호로 감싸진 쉼표로 구분된 문자열을 반환합니다. 예를 들어, <code>[1,2,3]</code>.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">예시 1:</strong></p>

<pre>
<strong>입력:</strong> nums = [[1,2],[3,4]], operation = &quot;Add&quot;
<strong>출력:</strong> 10
<strong>설명:</strong>
const obj1 = new ArrayWrapper([1,2]);
const obj2 = new ArrayWrapper([3,4]);
obj1 + obj2; // 10
</pre>

<p><strong class="example">예시 2:</strong></p>

<pre>
<strong>입력:</strong> nums = [[23,98,42,70]], operation = &quot;String&quot;
<strong>출력:</strong> &quot;[23,98,42,70]&quot;
<strong>설명:</strong>
const obj = new ArrayWrapper([23,98,42,70]);
String(obj); // &quot;[23,98,42,70]&quot;
</pre>

<p><strong class="example">예시 3:</strong></p>

<pre>
<strong>입력:</strong> nums = [[],[]], operation = &quot;Add&quot;
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
	<li><code>0 &lt;= nums[i]&nbsp;&lt;= 1000</code></li>
	<li><code>참고: nums는 생성자에 전달된 배열입니다</code></li>
</ul>