<h2><a href="https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii">80. 정렬된 배열에서 중복 제거 II</a></h2><h3>중간</h3><hr><p>비내림차순으로 정렬된 정수 배열 <code>nums</code>가 주어졌을 때, 각 고유한 요소가 <strong>최대 두 번</strong>만 나타나도록 일부 중복을 <a href="https://en.wikipedia.org/wiki/In-place_algorithm" target="_blank"><strong>제자리에서</strong></a> 제거하십시오. 요소의 <strong>상대적 순서</strong>는 <strong>동일하게</strong> 유지되어야 합니다.</p>

<p>일부 언어에서는 배열의 길이를 변경할 수 없기 때문에, 대신 결과를 배열 <code>nums</code>의 <strong>첫 번째 부분</strong>에 배치해야 합니다. 보다 공식적으로는, 중복을 제거한 후에 <code>k</code>개의 요소가 있으면, <code>nums</code>의 처음 <code>k</code>개의 요소가 최종 결과를 가져야 합니다. 처음 <code>k</code>개 요소 이후에 남겨진 것들은 중요하지 않습니다.</p>

<p>최종 결과를 <code>nums</code>의 첫 <code>k</code>개의 슬롯에 배치한 후 <code>k</code>를 반환합니다.</p>

<p>다른 배열에 대한 여분의 공간을 할당하지 마십시오. O(1)의 여분의 메모리로 입력 배열을<strong> 제자리에서 <a href="https://en.wikipedia.org/wiki/In-place_algorithm" target="_blank">수정하여</a></strong> 이 작업을 수행해야 합니다.</p>

<p><strong>맞춤 심사관:</strong></p>

<p>심사관은 다음 코드로 당신의 솔루션을 테스트할 것입니다:</p>

<pre>
int[] nums = [...]; // 입력 배열
int[] expectedNums = [...]; // 올바른 길이를 가진 예상 답

int k = removeDuplicates(nums); // 당신의 구현을 호출

assert k == expectedNums.length;
for (int i = 0; i &lt; k; i++) {
    assert nums[i] == expectedNums[i];
}
</pre>

<p>모든 주장이 통과하면, 당신의 솔루션은 <strong>승인</strong>될 것입니다.</p>

<p>&nbsp;</p>
<p><strong class="example">예시 1:</strong></p>

<pre>
<strong>입력:</strong> nums = [1,1,1,2,2,3]
<strong>출력:</strong> 5, nums = [1,1,2,2,3,_]
<strong>설명:</strong> 함수는 k = 5를 반환해야 하며, nums의 처음 다섯 요소는 각각 1, 1, 2, 2, 3이어야 합니다.
반환된 k 이후에 무엇이 남아 있든 중요하지 않습니다 (따라서 밑줄로 표시됩니다).
</pre>

<p><strong class="example">예시 2:</strong></p>

<pre>
<strong>입력:</strong> nums = [0,0,1,1,1,1,2,3,3]
<strong>출력:</strong> 7, nums = [0,0,1,1,2,3,3,_,_]
<strong>설명:</strong> 함수는 k = 7을 반환해야 하며, nums의 처음 일곱 요소는 각각 0, 0, 1, 1, 2, 3, 3이어야 합니다.
반환된 k 이후에 무엇이 남아 있든 중요하지 않습니다 (따라서 밑줄로 표시됩니다).
</pre>

<p>&nbsp;</p>
<p><strong>제약 조건:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 3 * 10<sup>4</sup></code></li>
	<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>
	<li><code>nums</code>는 비내림차순으로 정렬되어 있습니다.</li>
</ul>