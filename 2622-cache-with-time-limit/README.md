<h2><a href="https://leetcode.com/problems/cache-with-time-limit">2622. 제한된 시간의 캐시</a></h2><h3>보통</h3><hr><p>각 키에 <strong>만료 시간</strong>이 연관되어 있는 키-값 쌍을 설정하고 얻을 수 있는 클래스를 작성하십시오.</p>

<p>이 클래스에는 세 가지 공개 메서드가 있습니다:</p>

<p><code>set(key, value, duration)</code>: 정수 <code>key</code>, 정수 <code>value</code>, 그리고 밀리초 단위의 <code>duration</code>을 받습니다. <code>duration</code>이 경과하면 키는 접근할 수 없어야 합니다. 만료되지 않은 동일한 키가 이미 존재하면 이 메서드는 <code>true</code>를 반환하고, 그렇지 않으면 <code>false</code>를 반환해야 합니다. 이미 키가 존재하는 경우 값과 지속 시간은 덮어써야 합니다.</p>

<p><code>get(key)</code>: 만료되지 않은 키가 존재하면 연관된 값을 반환해야 합니다. 그렇지 않으면 <code>-1</code>을 반환해야 합니다.</p>

<p><code>count()</code>: 만료되지 않은 키의 개수를 반환합니다.</p>

<p>&nbsp;</p>
<p><strong class="example">예제 1:</strong></p>

<pre>
<strong>입력:</strong> 
actions = ["TimeLimitedCache", "set", "get", "count", "get"]
values = [[], [1, 42, 100], [1], [], [1]]
timeDelays = [0, 0, 50, 50, 150]
<strong>출력:</strong> [null, false, 42, 1, -1]
<strong>설명:</strong>
t=0에서, 캐시가 생성됩니다.
t=0에서, 키-값 쌍 (1: 42)이 100ms의 시간 제한과 함께 추가됩니다. 값이 존재하지 않으므로 false가 반환됩니다.
t=50에서, key=1이 요청되며 값 42가 반환됩니다.
t=50에서, count()가 호출되며 캐시에 활성 키가 하나 있습니다.
t=100에서, key=1이 만료됩니다.
t=150에서, get(1)이 호출되지만 캐시는 비어 있으므로 -1이 반환됩니다.
</pre>

<p><strong class="example">예제 2:</strong></p>

<pre>
<strong>입력:</strong> 
actions = ["TimeLimitedCache", "set", "set", "get", "get", "get", "count"]
values = [[], [1, 42, 50], [1, 50, 100], [1], [1], [1], []]
timeDelays = [0, 0, 40, 50, 120, 200, 250]
<strong>출력:</strong> [null, false, true, 50, 50, -1, 0]
<strong>설명:</strong>
t=0에서, 캐시가 생성됩니다.
t=0에서, 키-값 쌍 (1: 42)이 50ms의 시간 제한과 함께 추가됩니다. 값이 존재하지 않으므로 false가 반환됩니다.
t=40에서, 키-값 쌍 (1: 50)이 100ms의 시간 제한과 함께 추가됩니다. 아직 만료되지 않은 값이 이미 존재했으므로 true가 반환되고 오래된 값이 덮어써집니다.
t=50에서, get(1)이 호출되어 50이 반환됩니다.
t=120에서, get(1)이 호출되어 50이 반환됩니다.
t=140에서, key=1이 만료됩니다.
t=200에서, get(1)이 호출되지만 캐시는 비어 있으므로 -1이 반환됩니다.
t=250에서, count()는 0을 반환합니다. 캐시가 비어 있기 때문입니다.
</pre>

<p>&nbsp;</p>
<p><strong>제한 사항:</strong></p>

<ul>
	<li><code>0 &lt;= key, value &lt;= 10<sup>9</sup></code></li>
	<li><code>0 &lt;= duration &lt;= 1000</code></li>
	<li><code>1 &lt;= actions.length &lt;= 100</code></li>
	<li><code>actions.length === values.length</code></li>
	<li><code>actions.length === timeDelays.length</code></li>
	<li><code>0 &lt;= timeDelays[i] &lt;= 1450</code></li>
	<li><code>actions[i]</code>는 "TimeLimitedCache", "set", "get" 및 "count" 중 하나입니다</li>
	<li>첫 번째 동작은 항상 "TimeLimitedCache"이며 0밀리초 지연과 함께 즉시 실행되어야 합니다</li>
</ul>