/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallerNumbersThanCurrent = function(nums) {
    let temp = [...nums]
    temp.sort((a, b) => a - b)
    let map = new Map()

    temp.forEach((num, i) => {
        if(map.has(num)) return;
        map.set(num, i)
    })

    return nums.map(num => map.get(num))
};