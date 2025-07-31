<h2><a href="https://leetcode.com/problems/contains-duplicate">217. 중복 요소 포함 여부</a></h2><h3>쉬움</h3><hr><p>정수 배열 <code>nums</code>가 주어질 때, 배열 내 어떤 값이 <strong>적어도 두 번</strong> 나타나면 <code>true</code>를 반환하고, 모든 요소가 서로 다르면 <code>false</code>를 반환합니다.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<div class="example-block">
<p><strong>입력:</strong> <span class="example-io">nums = [1,2,3,1]</span></p>

<p><strong>출력:</strong> <span class="example-io">true</span></p>

<p><strong>설명:</strong></p>

<p>요소 1은 인덱스 0과 3에서 발생합니다.</p>
</div>

<p><strong class="example">예제 2:</strong></p>

<div class="example-block">
<p><strong>입력:</strong> <span class="example-io">nums = [1,2,3,4]</span></p>

<p><strong>출력:</strong> <span class="example-io">false</span></p>

<p><strong>설명:</strong></p>

<p>모든 요소가 서로 다릅니다.</p>
</div>

<p><strong class="example">예제 3:</strong></p>

<div class="example-block">
<p><strong>입력:</strong> <span class="example-io">nums = [1,1,1,3,3,4,3,2,4,2]</span></p>

<p><strong>출력:</strong> <span class="example-io">true</span></p>
</div>

<p>&nbsp;</p>
<p><strong>제약 조건:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
	<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
</ul>