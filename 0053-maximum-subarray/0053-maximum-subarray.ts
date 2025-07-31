function maxSubArray(nums: number[]): number {
      if (nums.length === 0) return 0;

  let currentSum = nums[0]; // 현재까지의 연속 부분합
  let maxSum = nums[0];     // 전체 최대 부분합

  for (let i = 1; i < nums.length; i++) {
    // 현재 값 단독 vs 이전 누적합에 현재 값을 더한 것 중 더 큰 값을 선택
    currentSum = Math.max(nums[i], currentSum + nums[i]);

    // 전체 최대값 갱신
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;

};