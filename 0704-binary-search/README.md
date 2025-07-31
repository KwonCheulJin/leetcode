<h2><a href="https://leetcode.com/problems/binary-search">704. 이진 탐색</a></h2><h3>쉬움</h3><hr><p>오름차순으로 정렬된 정수 배열 <code>nums</code>와 정수 <code>target</code>이 주어졌을 때, <code>nums</code>에서 <code>target</code>을 탐색하는 함수를 작성하세요. <code>target</code>이 존재하면 그 인덱스를 반환하세요. 존재하지 않으면 <code>-1</code>을 반환하세요.</p>

<p>당신은 <code>O(log n)</code> 실행 시간 복잡도를 갖는 알고리즘을 작성해야 합니다.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> nums = [-1,0,3,5,9,12], target = 9
<strong>출력:</strong> 4
<strong>설명:</strong> 9는 nums에 존재하며 그 인덱스는 4입니다.
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> nums = [-1,0,3,5,9,12], target = 2
<strong>출력:</strong> -1
<strong>설명:</strong> 2는 nums에 존재하지 않으므로 -1을 반환합니다.
</pre>

<p>&nbsp;</p>
<p><strong>제약:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
	<li><code>-10<sup>4</sup> &lt; nums[i], target &lt; 10<sup>4</sup></code></li>
	<li><code>nums</code>의 모든 정수는 <strong>고유</strong>합니다.</li>
	<li><code>nums</code>는 오름차순으로 정렬되어 있습니다.</li>
</ul>