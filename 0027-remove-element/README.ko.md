<h2><a href="https://leetcode.com/problems/remove-element">27. 요소 제거</a></h2><h3>쉬움</h3><hr><p>정수 배열 <code>nums</code>와 정수 <code>val</code>이 주어졌을 때, <code>nums</code>에서 <code>val</code>의 모든 발생을 <a href="https://en.wikipedia.org/wiki/In-place_algorithm" target="_blank"><strong>제자리에서</strong></a> 제거하세요. 요소의 순서는 변경될 수 있습니다. 그런 다음 <em><code>val</code>과 같지 않은</em> <code>nums</code>의 요소 수를 반환합니다.</p>

<p><code>nums</code>에서 <code>val</code>과 같지 않은 요소의 수를 <code>k</code>라고 가정할 때, 승인을 받기 위해 다음 작업을 수행해야 합니다:</p>

<ul>
	<li>배열 <code>nums</code>을 변경하여 <code>nums</code>의 처음 <code>k</code> 요소가 <code>val</code>과 같지 않은 요소를 포함하도록 합니다. <code>nums</code>의 나머지 요소들은 중요하지 않으며 <code>nums</code>의 크기도 중요하지 않습니다.</li>
	<li><code>k</code>를 반환하세요.</li>
</ul>

<p><strong>커스텀 판정기:</strong></p>

<p>판정기는 다음 코드로 솔루션을 테스트할 것입니다:</p>

<pre>
int[] nums = [...]; // 입력 배열
int val = ...; // 제거할 값
int[] expectedNums = [...]; // 정답 배열로 올바른 길이입니다.
                            // 값이 val과 같지 않은 상태로 정렬되어 있습니다.

int k = removeElement(nums, val); // 여러분의 구현을 호출합니다

assert k == expectedNums.length;
sort(nums, 0, k); // nums의 처음 k 요소를 정렬합니다
for (int i = 0; i &lt; actualLength; i++) {
    assert nums[i] == expectedNums[i];
}
</pre>

<p>모든 단언이 성공하면, 솔루션이 <strong>승인</strong>됩니다.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> nums = [3,2,2,3], val = 3
<strong>출력:</strong> 2, nums = [2,2,_,_]
<strong>설명:</strong> 함수는 k = 2를 반환해야 하며, nums의 처음 두 요소는 2이어야 합니다.
반환한 k 이후의 요소는 중요하지 않으므로 언더스코어로 표시했습니다.
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> nums = [0,1,2,2,3,0,4,2], val = 2
<strong>출력:</strong> 5, nums = [0,1,4,0,3,_,_,_]
<strong>설명:</strong> 함수는 k = 5를 반환해야 하며, nums의 처음 다섯 요소는 0, 0, 1, 3, 4이어야 합니다.
다섯 요소는 어떤 순서로 반환되어도 상관없습니다.
반환한 k 이후의 요소는 중요하지 않으므로 언더스코어로 표시했습니다.
</pre>

<p>&nbsp;</p>
<p><strong>제약 조건:</strong></p>

<ul>
	<li><code>0 &lt;= nums.length &lt;= 100</code></li>
	<li><code>0 &lt;= nums[i] &lt;= 50</code></li>
	<li><code>0 &lt;= val &lt;= 100</code></li>
</ul>