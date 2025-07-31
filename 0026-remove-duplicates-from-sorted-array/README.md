<h2><a href="https://leetcode.com/problems/remove-duplicates-from-sorted-array">26. 정렬된 배열에서 중복 항목 제거</a></h2><h3>쉬움</h3><hr><p>정수 배열 <code>nums</code>가 <strong>오름차순</strong>으로 정렬되어 있을 때, 중복 항목을 <a href="https://en.wikipedia.org/wiki/In-place_algorithm" target="_blank"><strong>제자리</strong></a>에서 제거하여 각 고유 요소가 <strong>한번만</strong> 나타나도록 하세요. 요소의 <strong>상대적인 순서</strong>는 그대로 유지되어야 합니다. 그런 다음 <em></em><code>nums</code>의 고유 요소 수를 반환합니다.</p>

<p><code>nums</code>의 고유 요소 수를 <code>k</code>라고 할 때, 정답으로 인정받으려면 다음을 수행해야 합니다:</p>

<ul>
	<li>배열 <code>nums</code>를 변경하여, 처음 <code>k</code>개의 요소에 고유 요소가 <code>nums</code>에서 처음에 나타난 순서대로 포함되어야 합니다. 남은 <code>nums</code>의 요소들은 중요하지 않으며, <code>nums</code>의 크기도 중요하지 않습니다.</li>
	<li><code>k</code>를 반환합니다.</li>
</ul>

<p><strong>커스텀 판사:</strong></p>

<p>판사는 다음 코드로 솔루션을 테스트할 것입니다:</p>

<pre>
int[] nums = [...]; // 입력 배열
int[] expectedNums = [...]; // 올바른 길이의 예상 답변

int k = removeDuplicates(nums); // 구현을 호출합니다

assert k == expectedNums.length;
for (int i = 0; i &lt; k; i++) {
    assert nums[i] == expectedNums[i];
}
</pre>

<p>모든 주장이 통과하면, 솔루션은 <strong>승인</strong>됩니다.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> nums = [1,1,2]
<strong>출력:</strong> 2, nums = [1,2,_]
<strong>설명:</strong> 함수는 k = 2를 반환해야 하며, nums의 처음 두 요소는 각각 1과 2입니다.
반환된 k 이후의 값은 중요하지 않으며, 따라서 언더스코어로 표시되었습니다.
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> nums = [0,0,1,1,1,2,2,3,3,4]
<strong>출력:</strong> 5, nums = [0,1,2,3,4,_,_,_,_,_]
<strong>설명:</strong> 함수는 k = 5를 반환해야 하며, nums의 처음 다섯 요소는 각각 0, 1, 2, 3, 4입니다.
반환된 k 이후의 값은 중요하지 않으며, 따라서 언더스코어로 표시되었습니다.
</pre>

<p>&nbsp;</p>
<p><strong>제한사항:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 3 * 10<sup>4</sup></code></li>
	<li><code>-100 &lt;= nums[i] &lt;= 100</code></li>
	<li><code>nums</code>는 <strong>오름차순</strong>으로 정렬되어 있습니다.</li>
</ul>