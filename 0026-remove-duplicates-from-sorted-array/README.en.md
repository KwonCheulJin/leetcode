## [26. Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array)

### Easy

Given an integer array `nums` sorted in **non-decreasing** order, remove the duplicates in-place such that each unique element appears **only once**. The **relative order** of the elements should be kept the same. Then return the number of unique elements in `nums`.

Let `k` be the number of unique elements in `nums`. You must do the following:

- Modify the array `nums` such that the first `k` elements of `nums` contain the unique elements in the order they were originally present in `nums`. The remaining elements of `nums` are not important and can be ignored.
- Return `k`.

**Custom Judge:**

The judge will test your solution using the following code:

```
int[] nums = [...]; // input array
int[] expectedNums = [...]; // the correct length of expected answer

int k = removeDuplicates(nums); // call your implementation

assert k == expectedNums.length;
for (int i = 0; i 1 
- ```-100 <= nums[i] <= 100```
- ```nums` is sorted in **non-decreasing** order.``