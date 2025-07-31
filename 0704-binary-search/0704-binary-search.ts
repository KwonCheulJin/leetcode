function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    if (nums[mid] < target) {
      left = mid + 1; // 오른쪽으로 범위를 줄임
    } else {
      right = mid - 1; // 왼쪽으로 범위를 줄임
    }
  }

  return -1; // 못 찾았을 경우
}