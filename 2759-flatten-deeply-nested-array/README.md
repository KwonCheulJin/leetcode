<h2><a href="https://leetcode.com/problems/flatten-deeply-nested-array">2759. 깊게 중첩된 배열 평탄화</a></h2><h3>중간</h3><hr><p><strong>다차원</strong> 배열 <code>arr</code>과 깊이 <code>n</code>이 주어졌을 때, 해당 배열의 <strong>평탄화된</strong> 버전을 반환하세요.</p>

<p><strong>다차원</strong> 배열은 정수나 다른 <strong>다차원</strong> 배열을 포함하는 재귀적 데이터 구조입니다.</p>

<p><strong>평탄화된</strong> 배열은 일부 또는 모든 서브 배열이 제거되고 그 서브 배열의 실제 요소로 대체된 배열 버전입니다. 이 평탄화 작업은 현재 중첩 깊이가 <code>n</code>보다 작을 때만 수행해야 합니다. 첫 번째 배열의 요소 깊이는 <code>0</code>으로 간주됩니다.</p>

<p>내장 <code>Array.flat</code> 메서드 없이 해결해 주세요.</p>

<p>&nbsp;</p>
<p><strong class="example">예 1:</strong></p>

<pre>
<strong>입력</strong>
arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
n = 0
<strong>출력</strong>
[1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]

<strong>설명</strong>
깊이 n=0을 전달하면 항상 원래 배열이 결과가 됩니다. 이는 서브 배열의 가능한 가장 작은 깊이(0)가 n=0보다 작지 않기 때문입니다. 따라서 아무런 서브 배열도 평탄화되지 않아야 합니다.</pre>

<p><strong class="example">예 2:</strong></p>

<pre>
<strong>입력</strong>
arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
n = 1
<strong>출력</strong>
[1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11], 12, 13, 14, 15]

<strong>설명</strong>
4, 7, 13으로 시작하는 서브 배열들은 모두 평탄화됩니다. 이는 해당 깊이 0이 1보다 작기 때문입니다. 그러나 [9, 10, 11]은 평탄화되지 않습니다. 이는 해당 깊이가 1이기 때문입니다.</pre>

<p><strong class="example">예 3:</strong></p>

<pre>
<strong>입력</strong>
arr = [[1, 2, 3], [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
n = 2
<strong>출력</strong>
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

<strong>설명</strong>
어떤 서브 배열의 최대 깊이는 1입니다. 따라서, 모두 평탄화됩니다.</pre>

<p>&nbsp;</p>
<p><strong>제약 조건:</strong></p>

<ul>
	<li><code>0 &lt;= arr 내 숫자 수 &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= arr 내 서브 배열 수 &lt;= 10<sup>5</sup></code></li>
	<li><code>최대 깊이 &lt;= 1000</code></li>
	<li><code>-1000 &lt;= 각 숫자 &lt;= 1000</code></li>
	<li><code><font face="monospace">0 &lt;= n &lt;= 1000</font></code></li>
</ul>