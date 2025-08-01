```html
<h2><a href="https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii">80. Remove Duplicates from Sorted Array II</a></h2><h3>Medium</h3><hr><p>Given a sorted integer array <code>nums</code> in non-decreasing order, remove some duplicates in-place such that each unique element appears at most <strong>twice</strong>. The <strong>relative order</strong> of the elements should be kept the <strong>same</strong>.</p>

<p>Since it is impossible to change the length of the array in some languages, you must instead put the result in the <strong>first part</strong> of the array <code>nums</code>. Specifically, if there are <code>k</code> elements after removing the duplicates, then the first <code>k</code> elements of <code>nums</code> should hold the final result. It does not matter what you leave beyond the first <code>k</code> elements.</p>

<p>Return <code>k</code> after placing the final result in the first <code>k</code> slots of <code>nums</code>.</p>

<p>Do not allocate extra space for another array. You must do this by modifying the input array <strong>in-place</strong> and using only O(1) extra memory.</p>

<p><strong>Custom Judge:</strong></p>

<p>The judge will test your solution with the following code:</p>

<pre>
int[] nums = [...]; // input array
int[] expectedNums = [...]; // expected answer with correct length

int k = removeDuplicates(nums); // call your implementation

assert k == expectedNums.length;
for (int i = 0; i < k; i++) {
    assert nums[i] == expectedNums[i];
}
</pre>

<p>If all assertions pass, your solution will be <strong>accepted</strong>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> nums = [1,1,1,2,2,3]
<strong>Output:</strong> 5, nums = [1,1,2,2,3,_]
<strong>Explanation:</strong> Your function should return k = 5, with the first five elements of nums being 1, 1, 2, 2, 3.
The elements beyond k do not matter (hence they are represented with underscores).
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> nums = [0,0,1,1,1,1,2,3,3]
<strong>Output:</strong> 7, nums = [0,0,1,1,2,3,3,_,_]
<strong>Explanation:</strong> Your function should return k = 7, with the first seven elements of nums being 0, 0, 1, 1, 2, 3, 3.
The elements beyond k do not matter (hence they are represented with underscores).
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 <= nums.length <= 3 * 10<sup>4</sup></code></li>
	<li><code>-10<sup>4</sup> <= nums[i] <= 10<sup>4</sup></code></li>
	<li><code>nums</code> is sorted in <strong>non-decreasing</strong> order.</li>
</ul>
```