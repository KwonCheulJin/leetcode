<h2><a href="https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii">80. 정렬된 배열에서 중복 제거 II</a></h2><h3>중간</h3><hr><p>비내림차순으로 정렬된 정수 배열 <code>nums</code>가 주어졌을 때, 일부 중복을 <a href="https://en.wikipedia.org/wiki/In-place_algorithm" target="_blank"><strong>제자리</strong></a>에서 제거하여 각 고유 요소가 <strong>최대 두 번</strong> 나타나도록 하세요. 요소의 <strong>상대적인 순서</strong>는 <strong>동일하게</strong> 유지되어야 합니다.</p>

<p>일부 언어에서는 배열의 길이를 변경하는 것이 불가능하므로, 대신 결과를 배열 <code>nums</code>의 <strong>첫 부분</strong>에 배치해야 합니다. 더 정확히 말하면, 중복을 제거한 후 <code>k</code> 개의 요소가 있는 경우, <code>nums</code>의 첫 <code>k</code> 요소가 최종 결과를 유지하게 해야 합니다. 첫 <code>k</code> 요소 이후에 무엇이 남아 있는지는 중요하지 않습니다.</p>

<p>최종 결과를 <code>nums</code>의 처음 <code>k</code> 자리로 배치한 후 <code>k</code>를 반환하세요.</p>

<p>다른 배열을 위한 추가 공간을 할당하지 <strong>마세요</strong>. 추가로 O(1) 메모리를 사용하며 <strong>입력 배열을 <a href="https://en.wikipedia.org/wiki/In-place_algorithm" target="_blank">제자리</a>에서 수정하여</strong> 이 작업을 수행해야 합니다.</p>

<p><strong>사용자 정의 판사:</strong></p>

<p>판사는 다음 코드로 당신의 솔루션을 테스트할 것입니다:</p>

<pre>
int[] nums = [...]; // 입력 배열
int[] expectedNums = [...]; // 올바른 길이를 가진 예상 답안

int k = removeDuplicates(nums); // 당신의 구현을 호출합니다

assert k == expectedNums.length;
for (int i = 0; i < k; i++) {
    assert nums[i] == expectedNums[i];
}
</pre>

<p>모든 주장이 통과하면, 당신의 솔루션은 <strong>허용</strong>될 것입니다.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> nums = [1,1,1,2,2,3]
<strong>출력:</strong> 5, nums = [1,1,2,2,3,_]
<strong>설명:</strong> 당신의 함수는 k = 5를 반환해야 하며, nums의 첫 다섯 요소는 각각 1, 1, 2, 2, 3이어야 합니다.
반환된 k 이후에 남아있는 것은 중요하지 않습니다(그래서 밑줄로 표현됩니다).
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> nums = [0,0,1,1,1,1,2,3,3]
<strong>출력:</strong> 7, nums = [0,0,1,1,2,3,3,_,_]
<strong>설명:</strong> 당신의 함수는 k = 7을 반환해야 하며, nums의 첫 일곱 요소는 각각 0, 0, 1, 1, 2, 3, 3이어야 합니다.
반환된 k 이후에 남아있는 것은 중요하지 않습니다(그래서 밑줄로 표현됩니다).
</pre>

<p>&nbsp;</p>
<p><strong>제약 조건:</strong></p>

<ul>
	<li><code>1 <= nums.length <= 3 * 10<sup>4</sup></code></li>
	<li><code>-10<sup>4</sup> <= nums[i] <= 10<sup>4</sup></code></li>
	<li><code>nums</code>는 <strong>비내림차순</strong>으로 정렬되어 있습니다.</li>
</ul>