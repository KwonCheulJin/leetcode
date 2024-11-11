/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    let p1 = m - 1; // nums1의 마지막 유효 요소 인덱스
    let p2 = n - 1; // nums2의 마지막 요소 인덱스
    let p = m + n - 1; // nums1의 마지막 인덱스

    while (p2 >= 0) {
        if (p1 >= 0 && nums1[p1] > nums2[p2]) {
            nums1[p] = nums1[p1];
            p1--;
        } else {
            nums1[p] = nums2[p2];
            p2--;
        }
        p--;
    }
}
