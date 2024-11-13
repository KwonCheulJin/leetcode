<h2><a href="https://leetcode.com/problems/build-array-from-permutation">1920. 순열로부터 배열 구성하기</a></h2><h3>쉬움</h3><hr><p><strong>0부터 시작하는 순열</strong> <code>nums</code> (<strong>0으로 인덱스됨</strong>)이 주어질 때, 배열 <code>ans</code>를 <strong>같은 길이</strong>로 구성하여 <code>ans[i] = nums[nums[i]]</code>이 되도록 하고, 이를 반환하세요.</p>

<p><strong>0부터 시작하는 순열</strong> <code>nums</code>는 <code>0</code>부터 <code>nums.length - 1</code> (<strong>포함</strong>)까지의 <strong>서로 다른</strong> 정수들로 이루어진 배열입니다.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> nums = [0,2,1,5,3,4]
<strong>출력:</strong> [0,1,2,4,5,3]<strong>
설명:</strong> 배열 ans는 다음과 같이 구성됩니다:
ans = [nums[nums[0]], nums[nums[1]], nums[nums[2]], nums[nums[3]], nums[nums[4]], nums[nums[5]]]
    = [nums[0], nums[2], nums[1], nums[5], nums[3], nums[4]]
    = [0,1,2,4,5,3]</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> nums = [5,0,1,2,3,4]
<strong>출력:</strong> [4,5,0,1,2,3]
<strong>설명:</strong> 배열 ans는 다음과 같이 구성됩니다:
ans = [nums[nums[0]], nums[nums[1]], nums[nums[2]], nums[nums[3]], nums[nums[4]], nums[nums[5]]]
    = [nums[5], nums[0], nums[1], nums[2], nums[3], nums[4]]
    = [4,5,0,1,2,3]</pre>

<p>&nbsp;</p>
<p><strong>제약 사항:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 1000</code></li>
	<li><code>0 &lt;= nums[i] &lt; nums.length</code></li>
	<li><code>nums</code>의 요소는 <strong>서로 다릅니다</strong>.</li>
</ul>

<p>&nbsp;</p>
<p><strong>후속 조치:</strong> 추가 공간을 사용하지 않고도 이 문제를 해결할 수 있나요? (<code>O(1)</code> 메모리, 즉, 상수 공간 복잡도로)</p>