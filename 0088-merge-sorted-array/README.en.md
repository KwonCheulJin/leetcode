<h2><a href="https://leetcode.com/problems/merge-sorted-array">88. Merge Sorted Array</a></h2><h3>Easy</h3><hr><p>정렬된 <strong>비감소 순서</strong>의 두 정수 배열 <code>nums1</code>과 <code>nums2</code>, 그리고 각각 <code>nums1</code>과 <code>nums2</code>에 있는 요소의 개수를 나타내는 두 정수 <code>m</code>과 <code>n</code>이 주어집니다.</p>

<p><strong>병합하여</strong> <code>nums1</code>과 <code>nums2</code>를 <strong>비감소 순서</strong>로 정렬된 단일 배열로 만들어 보세요.</p>

<p>최종 정렬된 배열은 함수에 의해 반환되지 않고, 대신 <em>배열 </em><code>nums1</code> 내에 저장되어야 합니다. 이를 위해 <code>nums1</code>은 길이가 <code>m + n</code>으로 설정되어 있으며, 처음 <code>m</code>개의 요소는 병합될 요소를 나타내고, 마지막 <code>n</code>개의 요소는 <code>0</code>으로 설정되어 무시되어야 합니다. <code>nums2</code>는 길이가 <code>n</code>입니다.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
<strong>출력:</strong> [1,2,2,3,5,6]
<strong>설명:</strong> 병합하려는 배열은 [1,2,3]과 [2,5,6]입니다.
병합 결과는 [<u>1</u>,<u>2</u>,2,<u>3</u>,5,6]이며 밑줄 친 요소는 nums1에서 비롯된 것입니다.
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> nums1 = [1], m = 1, nums2 = [], n = 0
<strong>출력:</strong> [1]
<strong>설명:</strong> 병합하려는 배열은 [1]과 []입니다.
병합 결과는 [1]입니다.
</pre>

<p><strong class="example">예제 3:</strong></p>

<pre>
<strong>입력:</strong> nums1 = [0], m = 0, nums2 = [1], n = 1
<strong>출력:</strong> [1]
<strong>설명:</strong> 병합하려는 배열은 []과 [1]입니다.
병합 결과는 [1]입니다.
m = 0 이기 때문에 nums1에는 요소가 없는 점에 유의하세요. 이 0은 단지 병합 결과가 nums1에 맞춰지도록 하기 위함입니다.
</pre>

<p>&nbsp;</p>
<p><strong>제약 조건:</strong></p>

<ul>
	<li><code>nums1.length == m + n</code></li>
	<li><code>nums2.length == n</code></li>
	<li><code>0 &lt;= m, n &lt;= 200</code></li>
	<li><code>1 &lt;= m + n &lt;= 200</code></li>
	<li><code>-10<sup>9</sup> &lt;= nums1[i], nums2[j] &lt;= 10<sup>9</sup></code></li>
</ul>

<p>&nbsp;</p>
<p><strong>추가 과제: </strong><code>O(m + n)</code> 시간에 실행되는 알고리즘을 생각해 볼 수 있습니까?</p>