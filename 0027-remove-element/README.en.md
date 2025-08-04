## [27. Remove Element](https://leetcode.com/problems/remove-element)

### Easy

Given an integer array `nums` and an integer `val`, remove all occurrences of `val` in `nums` in **in-place**. The order of elements may be changed. Finally, return the number of elements in `nums` that are not equal to `val`.

Let `k` be the number of elements in `nums` that are not equal to `val`. You must do the following to ensure correctness:

- Modify the array `nums` such that the first `k` elements of `nums` contain all the elements that are not equal to `val`. The remaining elements of `nums` can be ignored.
- Return `k`.

**Custom Judge:**

The judge will test your solution with the following code:

```
int[] nums = [...]; // input array
int val = ...; // value to remove
int[] expectedNums = [...]; // the expected answer with correct length.
                            // It does not contain the value val.

int k = removeElement(nums, val); // call your implemented function

assert k == expectedNums.length;
sort(nums, 0, k); // sort the first k elements of nums
for (int i = 0; i < actualLength; i++) {
    assert nums[i] == expectedNums[i];
}
```

If all assertions pass, then your solution will be **accepted**.

 

**Example 1:**

```
**Input:** nums = [3,2,2,3], val = 3
**Output:** 2, nums = [2,2,_,_]
**Explanation:** The function should return k = 2, with the first two elements of nums being 2.
The elements beyond k do not matter (hence the underscores).
```

**Example 2:**

```
**Input:** nums = [0,1,2,2,3,0,4,2], val = 2
**Output:** 5, nums = [0,1,4,0,3,_,_,_]
**Explanation:** The function should return k = 5, with the first five elements of nums being 0, 1, 3, 4, and 0.
The order of the elements does not matter.
The elements beyond k do not matter (hence the underscores).
```

 

**Constraints:**

- ```0 <= nums.length <= 100```
- ```0 <= nums[i] <= 50```
- ```0 <= val <= 100```