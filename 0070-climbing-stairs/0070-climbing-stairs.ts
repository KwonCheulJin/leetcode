function climbStairs(n: number): number {
  if (n <= 2) return n;

  let prev1 = 1; // ways(1)
  let prev2 = 2; // ways(2)

  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev1 = prev2;
    prev2 = current;
  }

  return prev2;
}