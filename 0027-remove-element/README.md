<h2><a href="https://leetcode.com/problems/remove-element">27. 원소 제거</a></h2><h3>쉬움</h3><hr><p>정수 배열 <code>nums</code>와 정수 <code>val</code>이 주어졌을 때, <code>nums</code>에서 <code>val</code>의 모든 발생을 <a href="https://en.wikipedia.org/wiki/In-place_algorithm" target="_blank"><strong>제자리에서</strong></a> 제거합니다. 요소들의 순서는 변경될 수 있습니다. 그런 다음 <code>nums</code> 중 <code>val</code>과 같지 않은 요소의 수를 반환하세요.</p>

<p><code>nums</code>에서 <code>val</code>과 같지 않은 요소의 수를 <code>k</code>라고 할 때, 허용되기 위해 다음을 수행해야 합니다:</p>

<ul>
	<li>배열 <code>nums</code>를 변경하여 <code>nums</code>의 첫 번째 <code>k</code> 요소가 <code>val</code>과 같지 않은 요소를 포함하여야 합니다. <code>nums</code>의 남은 요소와 크기는 중요하지 않습니다.</li>
	<li><code>k</code>를 반환합니다.</li>
</ul>

<p><strong>커스텀 심사:</strong></p>

<p>심사관은 다음 코드로 해당 솔루션을 테스트할 것입니다:</p>

<pre>
int[] nums = [...]; // 입력 배열
int val = ...; // 제거할 값
int[] expectedNums = [...]; // 올바른 길이를 가진 예상 답안.
                            // 값이 val과 같은 것이 없습니다.

int k = removeElement(nums, val); // 구현한 함수 호출

assert k == expectedNums.length;
sort(nums, 0, k); // nums의 처음 k 요소를 정렬
for (int i = 0; i < actualLength; i++) {
    assert nums[i] == expectedNums[i];
}
</pre>

<p>모든 단언이 통과하면, 솔루션은 <strong>허용됩니다</strong>.</p>

<p>&nbsp;</p>
<p><strong class="example">예시 1:</strong></p>

<pre>
<strong>입력:</strong> nums = [3,2,2,3], val = 3
<strong>출력:</strong> 2, nums = [2,2,_,_]
<strong>설명:</strong> 함수는 k = 2를 반환해야 하며, nums의 처음 두 요소는 2가 됩니다.
반환된 k를 초과하는 내용은 중요하지 않습니다 (그래서 밑줄을 사용합니다).
</pre>

<p><strong class="example">예시 2:</strong></p>

<pre>
<strong>입력:</strong> nums = [0,1,2,2,3,0,4,2], val = 2
<strong>출력:</strong> 5, nums = [0,1,4,0,3,_,_,_]
<strong>설명:</strong> 함수는 k = 5를 반환해야 하며, nums의 처음 다섯 요소는 0, 0, 1, 3, 4를 포함해야 합니다.
다섯 요소는 어떤 순서로 반환되어도 무관합니다.
반환된 k를 초과하는 내용은 중요하지 않습니다 (그래서 밑줄을 사용합니다).
</pre>

<p>&nbsp;</p>
<p><strong>제약 조건:</strong></p>

<ul>
	<li><code>0 &lt;= nums.length &lt;= 100</code></li>
	<li><code>0 &lt;= nums[i] &lt;= 50</code></li>
	<li><code>0 &lt;= val &lt;= 100</code></li>
</ul>