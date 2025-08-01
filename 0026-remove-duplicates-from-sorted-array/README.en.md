```html
<h2><a href="https://leetcode.com/problems/remove-duplicates-from-sorted-array">26. Remove Duplicates from Sorted Array</a></h2><h3>Easy</h3><hr><p>Given an integer array <code>nums</code> sorted in <strong>non-decreasing</strong> order, remove the duplicates in-place such that each unique element appears <strong>only once</strong>. The <strong>relative order</strong> of the elements should be kept the same. Then return the number of unique elements in <em></em><code>nums</code>.</p>

<p>Let <code>k</code> be the number of unique elements in <code>nums</code>. You must do the following:</p>

<ul>
	<li>Modify the array <code>nums</code> such that the first <code>k</code> elements of <code>nums</code> contain the unique elements in the order they were originally present in <code>nums</code>. The remaining elements of <code>nums</code> are not important and can be ignored.</li>
	<li>Return <code>k</code>.</li>
</ul>

<p><strong>Custom Judge:</strong></p>

<p>The judge will test your solution using the following code:</p>

<pre>
int[] nums = [...]; // input array
int[] expectedNums = [...]; // the correct length of expected answer

int k = removeDuplicates(nums); // call your implementation

assert k == expectedNums.length;
for (int i = 0; i &lt; k; i++) {
    assert nums[i] == expectedNums[i];
}
</pre>

<p>If all assertions pass, your solution will be <strong>accepted</strong>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> nums = [1,1,2]
<strong>Output:</strong> 2, nums = [1,2,_]
<strong>Explanation:</strong> The function should return k = 2, where the first two elements of nums are 1 and 2 respectively.
The values after k do not matter, and are therefore represented with underscores.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> nums = [0,0,1,1,1,2,2,3,3,4]
<strong>Output:</strong> 5, nums = [0,1,2,3,4,_,_,_,_,_]
<strong>Explanation:</strong> The function should return k = 5, where the first five elements of nums are 0, 1, 2, 3, and 4 respectively.
The values after k do not matter, and are therefore represented with underscores.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 3 * 10<sup>4</sup></code></li>
	<li><code>-100 &lt;= nums[i] &lt;= 100</code></li>
	<li><code>nums</code> is sorted in <strong>non-decreasing</strong> order.</li>
</ul>
```