function containsDuplicate(nums: number[]): boolean {
    const memoNums = new Map()

    for (let i = 0; i < nums.length; i++) {
        if (memoNums.has(nums[i])) {
            return true
        } else {
            memoNums.set(nums[i], i)
        }
    }

    return false
};