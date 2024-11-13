<h2><a href="https://leetcode.com/problems/two-sum">1. 두 수의 합</a></h2><h3>쉬움</h3><hr><p>정수 배열 <code>nums</code>와 정수 <code>target</code>이 주어졌을 때, <em><code>target</code>을 만들기 위해 두 숫자의 인덱스를 반환하세요.</em></p>

<p>각 입력은 <strong><em>정확히</em> 한 가지 해답</strong>이 있으며, <em>같은</em> 요소를 두 번 사용할 수 없다고 가정할 수 있습니다.</p>

<p>정답은 어떤 순서로든 반환할 수 있습니다.</p>

<p>&nbsp;</p>
<p><strong class="example">예시 1:</strong></p>

<pre>
<strong>입력:</strong> nums = [2,7,11,15], target = 9
<strong>출력:</strong> [0,1]
<strong>설명:</strong> nums[0] + nums[1] == 9 이므로, [0, 1]을 반환합니다.
</pre>

<p><strong class="example">예시 2:</strong></p>

<pre>
<strong>입력:</strong> nums = [3,2,4], target = 6
<strong>출력:</strong> [1,2]
</pre>

<p><strong class="example">예시 3:</strong></p>

<pre>
<strong>입력:</strong> nums = [3,3], target = 6
<strong>출력:</strong> [0,1]
</pre>

<p>&nbsp;</p>
<p><strong>제약 사항:</strong></p>

<ul>
	<li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
	<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
	<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>
	<li><strong>유효한 답이 오직 하나만 존재합니다.</strong></li>
</ul>

<p>&nbsp;</p>
<strong>추가 과제:&nbsp;</strong>O(n<sup>2</sup>)보다 낮은 시간 복잡도를 갖는 알고리즘을 생각해볼 수 있나요?