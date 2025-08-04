## [88. Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array)

### Easy

Two integer arrays `nums1` and `nums2` are sorted in **non-decreasing order**, and `m` and `n` represent the number of elements in `nums1` and `nums2`, respectively.

**Merge** `nums1` and `nums2` into a single array in non-decreasing order.

The final sorted array should not be returned by the function, but instead be stored inside the array `nums1`. To accommodate this, `nums1` has a length of `m + n`, where the first `m` elements are the elements to be merged, and the last `n` elements are initialized to `0` and should be ignored. The length of `nums2` is `n`.

 

**Example 1:**

```
**Input:** nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
**Output:** [1,2,2,3,5,6]
**Explanation:** The arrays to be merged are [1,2,3] and [2,5,6].
The merged result is [1,2,2,3,5,6], and the underlined elements come from nums1.
```

**Example 2:**

```
**Input:** nums1 = [1], m = 1, nums2 = [], n = 0
**Output:** [1]
**Explanation:** The arrays to be merged are [1] and [].
The merged result is [1].
```

**Example 3:**

```
**Input:** nums1 = [0], m = 0, nums2 = [1], n = 1
**Output:** [1]
**Explanation:** The arrays to be merged are [] and [1].
The merged result is [1].
Since m = 0, nums1 has no elements. The 0 is there to ensure the merged result fits into nums1.
```

 

**Constraints:**

- ```nums1.length == m + n```
- ```nums2.length == n```
- ```0 -10⁴ ``

 

**Follow-up: **Can you come up with an algorithm that runs in `O(m + n)` time?