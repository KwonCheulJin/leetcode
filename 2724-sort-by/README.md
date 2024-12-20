<h2><a href="https://leetcode.com/problems/sort-by">2724. 정렬 기준</a></h2><h3>쉬움</h3><hr><p>배열 <code>arr</code>과 함수 <code>fn</code>이 주어질 때, 정렬된 배열 <code>sortedArr</code>를 반환하세요. <code>fn</code>은 숫자만 반환하며, 이 숫자들이 <code>sortedArr</code>의 정렬 순서를 결정한다고 가정할 수 있습니다. <code>sortedArr</code>는 <code>fn</code>의 출력으로 <strong>오름차순</strong>으로 정렬되어야 합니다.</p>

<p>주어진 배열에 대해 <code>fn</code>이 결코 숫자를 중복시키지 않는다고 가정할 수 있습니다.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> arr = [5, 4, 1, 2, 3], fn = (x) =&gt; x
<strong>출력:</strong> [1, 2, 3, 4, 5]
<strong>설명:</strong> fn은 단순히 전달된 숫자를 반환하므로 배열은 오름차순으로 정렬됩니다.
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> arr = [{&quot;x&quot;: 1}, {&quot;x&quot;: 0}, {&quot;x&quot;: -1}], fn = (d) =&gt; d.x
<strong>출력:</strong> [{&quot;x&quot;: -1}, {&quot;x&quot;: 0}, {&quot;x&quot;: 1}]
<strong>설명:</strong> fn은 &quot;x&quot; 키의 값을 반환합니다. 따라서 이 값에 기초하여 배열이 정렬됩니다.
</pre>

<p><strong class="example">예제 3:</strong></p>

<pre>
<strong>입력:</strong> arr = [[3, 4], [5, 2], [10, 1]], fn = (x) =&gt; x[1]
<strong>출력:</strong> [[10, 1], [5, 2], [3, 4]]
<strong>설명:</strong> arr은 인덱스=1의 숫자에 의해 오름차순으로 정렬됩니다.&nbsp;
</pre>

<p>&nbsp;</p>
<p><strong>제약 조건:</strong></p>

<ul>
	<li><code>arr</code>은 유효한 JSON 배열입니다</li>
	<li><code>fn</code>은 숫자를 반환하는 함수입니다</li>
	<li><code>1 &lt;= arr.length &lt;= 5 * 10<sup>5</sup></code></li>
</ul>