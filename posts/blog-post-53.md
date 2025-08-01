---
title: '53. 최대 부분 배열'
titleEn: '53. Maximum Subarray'
problemNumber: 53
difficulty: 'Medium'
tags: ['Array']
leetcodeUrl: 'https://leetcode.com/problems/maximum-subarray/'
githubUrl: 'https://github.com/KwonCheulJin/leetcode/tree/main/0053-maximum-subarray'
createdAt: '2025-08-01T02:37:03.635Z'
slug: 'leetcode-53-maximum-sub-array'
---

---
title: '53. 최대 부분 배열'
titleEn: '53. Maximum Subarray'
problemNumber: 53
difficulty: 'Medium'
tags: ['Array']
leetcodeUrl: 'https://leetcode.com/problems/maximum-subarray/'
githubUrl: 'https://github.com/KwonCheulJin/leetcode/tree/main/0053-maximum-subarray'
createdAt: '2025. 8. 1.'
---

# 53. 최대 부분 배열

## 문제 설명

정수 배열 nums가 주어질 때, 가장 큰 합을 가지는 부분 배열을 찾아 그 합을 반환하세요.

 
예시 1:


입력: nums = [-2,1,-3,4,-1,2,1,-5,4]
출력: 6
설명: 부분 배열 [4,-1,2,1]이 가장 큰 합 6을 가집니다.


예시 2:


입력: nums = [1]
출력: 1
설명: 부분 배열 [1]이 가장 큰 합 1을 가집니다.


예시 3:


입력: nums = [5,4,-1,7,8]
출력: 23
설명: 부분 배열 [5,4,-1,7,8]이 가장 큰 합 23을 가집니다.

### 원문 (English)

Given an integer array nums, find the subarray with the largest sum, and return its sum.

 
Example 1:


Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.


Example 2:


Input: nums = [1]
Output: 1
Explanation: The subarray [1] has the largest sum 1.


Example 3:


Input: nums = [5,4,-1,7,8]
Output: 23
Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.

## 제약 조건

- 1 <= nums.length <= 105  
- -104 <= nums[i] <= 104

## 해결 방법

### 접근 방식

이 문제는 카데인 알고리즘(Kadane's Algorithm)을 사용하여 해결할 수 있습니다. 배열을 순회하면서 현재까지의 연속 부분합을 계산하고, 이 값과 현재 요소를 비교하여 더 큰 값을 선택하여 `currentSum`을 갱신합니다. 이 과정에서 전체 최대 부분합인 `maxSum`을 지속적으로 업데이트합니다. 핵심 아이디어는 현재 요소를 포함하는 부분합을 계속 추적하여 가장 큰 합을 찾는 것입니다.

### 코드 구현

```typescript
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
```

### 복잡도 분석

- **시간 복잡도**: O(n) - 주어진 배열을 한 번 순회하면서 각 요소에 대해 상수 시간 연산을 수행하므로, 시간 복잡도는 O(n)입니다.
- **공간 복잡도**: O(1) - 추가적인 배열이나 리스트를 사용하지 않고, 상수 개수의 변수만 사용하므로, 공간 복잡도는 O(1)입니다.

## 설명

이 문제는 주어진 정수 배열에서 가장 큰 합을 가지는 연속된 부분 배열을 찾아 그 합을 반환하는 문제입니다. 이 문제를 해결하기 위해 우리는 "카데인 알고리즘(Kadane's Algorithm)"을 사용합니다. 이 알고리즘은 효율적으로 최대 부분 배열 합을 찾는 방법을 제공합니다.

### 1. 알고리즘의 핵심 아이디어

카데인 알고리즘의 핵심은 현재 위치까지의 최대 부분합을 계산하면서, 그 합이 음수가 되면 새로운 부분 배열을 시작하는 것입니다. 이를 통해 우리는 전체 배열을 한 번 순회하면서 최대 부분합을 찾을 수 있습니다.

### 2. 코드의 주요 로직 설명

코드는 배열을 순회하면서 두 가지 값을 지속적으로 업데이트합니다:
- `currentSum`: 현재 인덱스까지의 연속된 부분 배열의 최대 합
- `maxSum`: 지금까지 발견된 최대 부분 배열의 합

### 3. 각 단계별 동작 과정

1. **초기화**: 배열이 비어 있는 경우 0을 반환합니다. 그렇지 않으면 `currentSum`과 `maxSum`을 배열의 첫 번째 요소로 초기화합니다. 이는 첫 번째 요소를 시작으로 부분 배열을 고려하기 위함입니다.

2. **배열 순회**: 두 번째 요소부터 배열의 끝까지 순회합니다.
   - 각 요소에서 `currentSum`을 업데이트합니다. 이때, `currentSum`은 현재 요소 단독으로 시작하는 것이 더 큰지, 아니면 이전의 `currentSum`에 현재 요소를 더하는 것이 더 큰지를 비교하여 결정합니다.
   - `maxSum`을 업데이트합니다. 이는 `maxSum`과 `currentSum` 중 더 큰 값을 선택하여 지금까지의 최대 부분합을 유지합니다.

3. **결과 반환**: 배열을 모두 순회한 후 `maxSum`에는 최대 부분 배열의 합이 저장되어 있으므로 이를 반환합니다.

### 4. 핵심 변수들의 역할

- `currentSum`: 현재까지의 연속된 부분 배열의 최대 합을 저장합니다. 이 값은 음수가 되면 새로운 부분 배열을 시작하게 됩니다.
- `maxSum`: 지금까지 발견된 최대 부분 배열의 합을 저장합니다. 이는 최종적으로 반환할 값입니다.

### 5. 왜 이 방법이 효과적인지

이 방법은 배열을 한 번만 순회하므로 시간 복잡도가 O(n)으로 매우 효율적입니다. 각 요소에서 가능한 두 가지 선택(현재 요소 단독 또는 이전 누적합에 현재 요소 추가) 중 최적의 선택을 하므로, 전체 배열을 탐색하면서 최대 부분합을 찾을 수 있습니다. 이 알고리즘은 불필요한 계산을 피하고, 부분 배열의 시작과 끝을 동적으로 결정하기 때문에 매우 효과적입니다.

이렇게 카데인 알고리즘을 통해 문제를 효율적으로 해결할 수 있습니다. 초보자도 쉽게 이해할 수 있도록 단계별로 설명을 드렸으니, 이 알고리즘을 활용하여 다양한 문제를 해결해 보시길 바랍니다.

## 관련 문제

다음 주제들과 관련된 문제들을 더 풀어보세요: **Array**

---

_이 문제는 [LeetCode 53](https://leetcode.com/problems/maximum-subarray/)에서 확인할 수 있습니다._