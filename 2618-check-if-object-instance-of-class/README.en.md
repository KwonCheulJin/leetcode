<h2><a href="https://leetcode.com/problems/check-if-object-instance-of-class">2618. 객체가 클래스 인스턴스인지 확인하기</a></h2><h3>중간</h3><hr><p>주어진 값이 특정 클래스 또는 슈퍼클래스의 인스턴스인지 확인하는 함수를 작성하세요. 이 문제에서, 객체는 해당 클래스의 메서드에 접근할 수 있는 경우 그 클래스의 인스턴스로 간주됩니다.</p>

<p>함수에 전달할 수 있는 데이터 유형에 대한 제한은 없습니다. 예를 들어, 값이나 클래스가 <code>undefined</code>일 수도 있습니다.</p>

<p>&nbsp;</p>
<p><strong class="example">예시 1:</strong></p>

<pre>
<strong>입력:</strong> func = () =&gt; checkIfInstanceOf(new Date(), Date)
<strong>출력:</strong> true
<strong>설명: </strong>Date 생성자가 반환하는 객체는 정의상 Date의 인스턴스입니다.
</pre>

<p><strong class="example">예시 2:</strong></p>

<pre>
<strong>입력:</strong> func = () =&gt; { class Animal {}; class Dog extends Animal {}; return checkIfInstanceOf(new Dog(), Animal); }
<strong>출력:</strong> true
<strong>설명:</strong>
class Animal {};
class Dog extends Animal {};
checkIfInstanceOf(new Dog(), Animal); // true

Dog는 Animal의 서브클래스입니다. 따라서, Dog 객체는 Dog와 Animal의 인스턴스입니다.</pre>

<p><strong class="example">예시 3:</strong></p>

<pre>
<strong>입력:</strong> func = () =&gt; checkIfInstanceOf(Date, Date)
<strong>출력:</strong> false
<strong>설명: </strong>Date 생성자는 논리적으로 자체의 인스턴스일 수 없습니다.
</pre>

<p><strong class="example">예시 4:</strong></p>

<pre>
<strong>입력:</strong> func = () =&gt; checkIfInstanceOf(5, Number)
<strong>출력:</strong> true
<strong>설명: </strong>5는 Number입니다. "instanceof" 키워드는 false를 반환할 수 있습니다. 하지만, "toFixed()" 같은 Number 메서드에 접근하기 때문에 Number의 인스턴스로 간주됩니다.
</pre>