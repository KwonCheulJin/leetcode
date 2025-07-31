<h2><a href="https://leetcode.com/problems/flatten-deeply-nested-array">2759. 깊게 중첩된 배열 평탄화</a></h2><h3>중간</h3><hr><p><strong>다차원</strong> 배열 <code>arr</code>과 깊이 <code>n</code>이 주어졌을 때, 그 배열의 <strong>평탄화된</strong> 버전을 반환하세요.</p>

<p><strong>다차원</strong> 배열은 정수 또는 다른 <strong>다차원</strong> 배열을 포함하는 재귀적인 데이터 구조입니다.</p>

<p><strong>평탄화된</strong> 배열은 일부 또는 모든 하위 배열이 제거되고 해당 하위 배열의 실제 요소로 대체된 배열의 버전입니다. 이 평탄화 작업은 현재 중첩의 깊이가 <code>n</code>보다 작을 경우에만 수행되어야 합니다. 첫 번째 배열의 요소 깊이는 <code>0</code>으로 간주됩니다.</p>

<p>내장된 <code>Array.flat</code> 메서드를 사용하지 않고 해결하세요.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력</strong>
arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
n = 0
<strong>출력</strong>
[1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]

<strong>설명</strong>
깊이 n=0을 전달하면 항상 원래 배열이 반환됩니다. 이는 하위 배열의 최소 가능한 깊이(0)가 n=0보다 작지 않기 때문입니다. 따라서 하위 배열은 평탄화되지 않습니다.</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력</strong>
arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
n = 1
<strong>출력</strong>
[1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11], 12, 13, 14, 15]

<strong>설명</strong>
4, 7, 그리고 13로 시작하는 하위 배열은 모두 평탄화됩니다. 이는 이들의 깊이 0이 1보다 작기 때문입니다. 그러나 [9, 10, 11]은 깊이가 1이므로 평탄화되지 않습니다.</pre>

<p><strong class="example">예제 3:</strong></p>

<pre>
<strong>입력</strong>
arr = [[1, 2, 3], [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
n = 2
<strong>출력</strong>
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

<strong>설명</strong>
어떤 하위 배열의 최대 깊이는 1입니다. 따라서 모두 평탄화됩니다.</pre>

<p>&nbsp;</p>
<p><strong>제약 사항:</strong></p>

<ul>
	<li><code>0 &lt;= arr의 숫자 수 &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= arr의 하위 배열 수 &lt;= 10<sup>5</sup></code></li>
	<li><code>최대 깊이 &lt;= 1000</code></li>
	<li><code>-1000 &lt;= 각 숫자 &lt;= 1000</code></li>
	<li><code><font face="monospace">0 &lt;= n &lt;= 1000</font></code></li>
</ul>