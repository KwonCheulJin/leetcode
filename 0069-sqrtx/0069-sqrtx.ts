function mySqrt(x: number): number {
  if (x < 2) return x;

  let left = 1;
  let right = Math.floor(x / 2);

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const squared = mid * mid;

    if (squared === x) {
      return mid;
    } else if (squared < x) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  // 반복문을 빠져나온 시점에서 right는 sqrt(x)보다 작거나 같은 최대 정수
  return right;
}