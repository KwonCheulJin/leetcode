function twoSum(nums: number[], target: number): number[] {
    const complement = new Map()

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i]

        if (complement.has(num)) {
            return [complement.get(num), i]
        }

        complement.set(target-num, i)
    }
};