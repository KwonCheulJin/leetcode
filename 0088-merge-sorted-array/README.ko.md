<h2><a href="https://leetcode.com/problems/merge-sorted-array">88. 합병 정렬 배열</a></h2><h3>쉬움</h3><hr><p>정수 배열 <code>nums1</code>과 <code>nums2</code>가 주어졌으며, 이들은 <strong>비감소 순서</strong>로 정렬되어 있고 각각 <code>m</code>과 <code>n</code>이라는 정수로 <code>nums1</code>과 <code>nums2</code>의 요소 수를 나타냅니다.</p>

<p><strong>합병</strong>하여 <code>nums1</code>과 <code>nums2</code>를 <strong>비감소 순서</strong>로 정렬된 단일 배열로 만드세요.</p>

<p>최종 정렬된 배열은 함수에 의해 반환되지 않고 대신 배열 <code>nums1</code> 안에 <em>저장</em>되어야 합니다. 이를 수용하기 위해 <code>nums1</code>의 길이는 <code>m + n</code>이며, 처음 <code>m</code>개의 요소는 병합되어야 할 요소를 나타내고, 마지막 <code>n</code>개의 요소는 <code>0</code>으로 설정되어 무시해야 합니다. <code>nums2</code>의 길이는 <code>n</code>입니다.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
<strong>출력:</strong> [1,2,2,3,5,6]
<strong>설명:</strong> 병합할 배열은 [1,2,3]과 [2,5,6]입니다.
병합 결과는 [<u>1</u>,<u>2</u>,2,<u>3</u>,5,6]이며, 밑줄 친 요소는 nums1에서 온 것입니다.
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> nums1 = [1], m = 1, nums2 = [], n = 0
<strong>출력:</strong> [1]
<strong>설명:</strong> 병합할 배열은 [1]과 []입니다.
병합 결과는 [1]입니다.
</pre>

<p><strong class="example">예제 3:</strong></p>

<pre>
<strong>입력:</strong> nums1 = [0], m = 0, nums2 = [1], n = 1
<strong>출력:</strong> [1]
<strong>설명:</strong> 병합할 배열은 []와 [1]입니다.
병합 결과는 [1]입니다.
m = 0이기 때문에 nums1에는 요소가 없습니다. 0은 병합 결과가 nums1에 맞도록 하기 위해 있는 것입니다.
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
<p><strong>추가 과제:</strong> <code>O(m + n)</code> 시간 내에 실행되는 알고리즘을 생각해 볼 수 있나요?</p>