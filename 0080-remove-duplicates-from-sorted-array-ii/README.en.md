## [80. Remove Duplicates from Sorted Array II](https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii)

### Medium

Given a sorted integer array `nums` in non-decreasing order, remove some duplicates in-place such that each unique element appears at most **twice**. The **relative order** of the elements should be kept the **same**.

Since it is impossible to change the length of the array in some languages, you must instead put the result in the **first part** of the array `nums`. Specifically, if there are `k` elements after removing the duplicates, then the first `k` elements of `nums` should hold the final result. It does not matter what you leave beyond the first `k` elements.

Return `k` after placing the final result in the first `k` slots of `nums`.

Do not allocate extra space for another array. You must do this by modifying the input array **in-place** and using only O(1) extra memory.

**Custom Judge:**

The judge will test your solution with the following code:

```
int[] nums = [...]; // input array
int[] expectedNums = [...]; // expected answer with correct length

int k = removeDuplicates(nums); // call your implementation

assert k == expectedNums.length;
for (int i = 0; i 1 
-10⁴ 
- ```nums` is sorted in **non-decreasing** order.``