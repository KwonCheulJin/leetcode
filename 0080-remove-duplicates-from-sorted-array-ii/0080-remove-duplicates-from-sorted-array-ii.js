/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
 let count = {}
 let p = 0;
 for (let num of nums) {
    count[num] = (count[num] || 0) + 1

    if (count[num] <= 2) {
        nums[p] = num
        p++
    }
 }
 return p
};