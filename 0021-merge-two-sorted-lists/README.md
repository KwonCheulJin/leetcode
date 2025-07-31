<h2><a href="https://leetcode.com/problems/merge-two-sorted-lists/">21. 두 개의 정렬된 리스트 병합하기</a></h2><h3>쉬움</h3><hr><p>정렬된 연결 리스트 <code>list1</code>과 <code>list2</code>의 머리(head)를 받았습니다.</p>

<p>두 리스트를 하나의 <strong>정렬된</strong> 리스트로 병합하세요. 이 리스트는 첫 번째, 두 번째 리스트의 노드를 이어 붙여 만들어야 합니다.</p>

<p>병합된 연결 리스트의 <em>머리(head)를 반환</em>하세요.</p>

<p>&nbsp;</p>
<p><strong class="example">예시 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/03/merge_ex1.jpg" style="width: 662px; height: 302px;" />
<pre>
<strong>입력:</strong> list1 = [1,2,4], list2 = [1,3,4]
<strong>출력:</strong> [1,1,2,3,4,4]
</pre>

<p><strong class="example">예시 2:</strong></p>

<pre>
<strong>입력:</strong> list1 = [], list2 = []
<strong>출력:</strong> []
</pre>

<p><strong class="example">예시 3:</strong></p>

<pre>
<strong>입력:</strong> list1 = [], list2 = [0]
<strong>출력:</strong> [0]
</pre>

<p>&nbsp;</p>
<p><strong>제약 조건:</strong></p>

<ul>
	<li>두 리스트의 노드 개수는 <code>[0, 50]</code> 범위 안에 있습니다.</li>
	<li><code>-100 &lt;= Node.val &lt;= 100</code></li>
	<li><code>list1</code>과 <code>list2</code> 모두 <strong>비감소</strong> 순서로 정렬되어 있습니다.</li>
</ul>