```html
<h2><a href="https://leetcode.com/problems/remove-element">27. Remove Element</a></h2><h3>Easy</h3><hr><p>Given an integer array <code>nums</code> and an integer <code>val</code>, remove all occurrences of <code>val</code> in <code>nums</code> in <a href="https://en.wikipedia.org/wiki/In-place_algorithm" target="_blank"><strong>in-place</strong></a>. The order of elements may be changed. Finally, return the number of elements in <code>nums</code> that are not equal to <code>val</code>.</p>

<p>Let <code>k</code> be the number of elements in <code>nums</code> that are not equal to <code>val</code>. You must do the following to ensure correctness:</p>

<ul>
	<li>Modify the array <code>nums</code> such that the first <code>k</code> elements of <code>nums</code> contain all the elements that are not equal to <code>val</code>. The remaining elements of <code>nums</code> can be ignored.</li>
	<li>Return <code>k</code>.</li>
</ul>

<p><strong>Custom Judge:</strong></p>

<p>The judge will test your solution with the following code:</p>

<pre>
int[] nums = [...]; // input array
int val = ...; // value to remove
int[] expectedNums = [...]; // the expected answer with correct length.
                            // It does not contain the value val.

int k = removeElement(nums, val); // call your implemented function

assert k == expectedNums.length;
sort(nums, 0, k); // sort the first k elements of nums
for (int i = 0; i &lt; actualLength; i++) {
    assert nums[i] == expectedNums[i];
}
</pre>

<p>If all assertions pass, then your solution will be <strong>accepted</strong>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> nums = [3,2,2,3], val = 3
<strong>Output:</strong> 2, nums = [2,2,_,_]
<strong>Explanation:</strong> The function should return k = 2, with the first two elements of nums being 2.
The elements beyond k do not matter (hence the underscores).
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> nums = [0,1,2,2,3,0,4,2], val = 2
<strong>Output:</strong> 5, nums = [0,1,4,0,3,_,_,_]
<strong>Explanation:</strong> The function should return k = 5, with the first five elements of nums being 0, 1, 3, 4, and 0.
The order of the elements does not matter.
The elements beyond k do not matter (hence the underscores).
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>0 &lt;= nums.length &lt;= 100</code></li>
	<li><code>0 &lt;= nums[i] &lt;= 50</code></li>
	<li><code>0 &lt;= val &lt;= 100</code></li>
</ul>
```