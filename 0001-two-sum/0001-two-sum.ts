function twoSum(nums: number[], target: number): number[] {
    const saveNums = new Map()

    for (let i = 0; i < nums.length; i++) {
        let num = nums[i]
        if (saveNums.has(num)) {
            return [saveNums.get(num), i]
        }
        saveNums.set(target - num, i)
    }
};