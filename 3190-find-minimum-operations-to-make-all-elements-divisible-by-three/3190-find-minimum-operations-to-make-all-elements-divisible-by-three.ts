function minimumOperations(nums: number[]): number {
    let count = 0;
    for (const num of nums) {
        if (num % 3 !== 0) count++
    }
    return count;
};