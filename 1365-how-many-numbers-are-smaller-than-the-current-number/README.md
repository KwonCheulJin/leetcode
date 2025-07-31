<h2><a href="https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number">1365. 현재 숫자보다 작은 숫자의 수</a></h2><h3>쉬움</h3><hr><p>배열 <code>nums</code>가 주어질 때, 각 <code>nums[i]</code>에 대해, 배열에서 그것보다 작은 수가 몇 개 있는지 찾으십시오. 즉, 각 <code>nums[i]</code>에 대해 <code>j != i</code> <strong>그리고</strong> <code>nums[j] &lt; nums[i]</code>인 유효한 <code>j</code>의 수를 세어야 합니다.</p>

<p>결과를 배열로 반환하십시오.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> nums = [8,1,2,2,3]
<strong>출력:</strong> [4,0,1,1,3]
<strong>설명:</strong> 
nums[0]=8보다 작은 수가 네 개 있습니다 (1, 2, 2 그리고 3). 
nums[1]=1보다 작은 수는 존재하지 않습니다.
nums[2]=2보다 작은 수가 하나 있습니다 (1). 
nums[3]=2보다 작은 수가 하나 있습니다 (1). 
nums[4]=3보다 작은 수가 세 개 있습니다 (1, 2 그리고 2).
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> nums = [6,5,4,8]
<strong>출력:</strong> [2,1,0,3]
</pre>

<p><strong class="example">예제 3:</strong></p>

<pre>
<strong>입력:</strong> nums = [7,7,7,7]
<strong>출력:</strong> [0,0,0,0]
</pre>

<p>&nbsp;</p>
<p><strong>제약사항:</strong></p>

<ul>
	<li><code>2 &lt;= nums.length &lt;= 500</code></li>
	<li><code>0 &lt;= nums[i] &lt;= 100</code></li>
</ul>