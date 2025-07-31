<h2><a href="https://leetcode.com/problems/merge-sorted-array">88. 정렬된 배열 합치기</a></h2><h3>초급</h3><hr><p>두 개의 정수 배열 <code>nums1</code>과 <code>nums2</code>가 <strong>비내림차순</strong>으로 정렬되어 있고 <code>m</code>과 <code>n</code>은 각각 <code>nums1</code>과 <code>nums2</code> 안에 있는 요소의 개수를 나타냅니다.</p>

<p><strong>병합</strong> <code>nums1</code>과 <code>nums2</code>를 하나의 배열로 비내림차순으로 정렬하세요.</p>

<p>최종 정렬된 배열은 함수에서 반환되지 않고, 대신 배열 <code>nums1</code> 내부에 저장됩니다. 이를 위해 <code>nums1</code>의 길이는 <code>m + n</code>이며, 처음 <code>m</code>개의 요소는 병합되어야 할 요소를 나타내고, 마지막 <code>n</code>개의 요소는 <code>0</code>으로 설정되어 무시됩니다. <code>nums2</code>의 길이는 <code>n</code>입니다.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
<strong>출력:</strong> [1,2,2,3,5,6]
<strong>설명:</strong> 병합할 배열은 [1,2,3]과 [2,5,6]입니다.
병합 결과는 [<u>1</u>,<u>2</u>,2,<u>3</u>,5,6]이고, 밑줄 친 요소들은 nums1에서 나왔습니다.
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
m = 0이므로 nums1에는 요소가 없습니다. 0은 병합 결과가 nums1에 맞출 수 있도록 있는 것입니다.
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
<p><strong>추가 과제: </strong><code>O(m + n)</code> 시간에 작동하는 알고리즘을 생각해낼 수 있나요?</p>
