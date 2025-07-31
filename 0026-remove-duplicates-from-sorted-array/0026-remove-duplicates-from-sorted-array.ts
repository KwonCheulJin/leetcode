function removeDuplicates(nums: number[]): number {
      if (nums.length === 0) return 0;

  let slow = 1;

  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[fast - 1]) {
      nums[slow] = nums[fast];
      slow++;
    }
  }

  return slow;
};