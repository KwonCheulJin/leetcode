<h2><a href="https://leetcode.com/problems/remove-duplicates-from-sorted-list">83. 정렬된 리스트에서 중복 제거</a></h2><h3>쉬움</h3><hr><p>정렬된 연결 리스트의 <code>head</code>가 주어지면, <em>각 요소가 한 번만 나타나도록 모든 중복을 삭제하십시오</em>. <em>정렬된<strong> 연결 리스트</strong>를 반환하세요</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/04/list1.jpg" style="width: 302px; height: 242px;" />
<pre>
<strong>입력:</strong> head = [1,1,2]
<strong>출력:</strong> [1,2]
</pre>

<p><strong class="example">예제 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/04/list2.jpg" style="width: 542px; height: 222px;" />
<pre>
<strong>입력:</strong> head = [1,1,2,3,3]
<strong>출력:</strong> [1,2,3]
</pre>

<p>&nbsp;</p>
<p><strong>제약 조건:</strong></p>

<ul>
	<li>리스트의 노드 수는 <code>[0, 300]</code> 범위입니다.</li>
	<li><code>-100 &lt;= Node.val &lt;= 100</code></li>
	<li>리스트는 오름차순으로 <strong>정렬</strong>되어 있는 것이 보장됩니다.</li>
</ul>