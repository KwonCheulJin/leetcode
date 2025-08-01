#!/usr/bin/env tsx

/**
 * 테스트 데이터 삽입 스크립트
 * leetcode_problems 테이블에 샘플 데이터 추가
 */

import 'dotenv/config';
import { SupabaseService } from '../src/services/supabase.js';
import { ProblemInfo } from '../src/types/leetcode.js';
import { TranslationResult } from '../src/services/translator.js';

async function insertTestData(): Promise<void> {
  console.log('🧪 테스트 데이터 삽입 시작\n');

  try {
    const supabase = new SupabaseService();

    // 샘플 문제 정보
    const problemInfo: ProblemInfo = {
      problemNumber: 1,
      title: 'Two Sum',
      titleEnglish: 'Two Sum',
      difficulty: 'Easy',
      tags: ['Array', 'Hash Table'],
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      descriptionEnglish: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      constraints: [
        '2 ≤ nums.length ≤ 10⁴',
        '-10⁹ ≤ nums[i] ≤ 10⁹',
        '-10⁹ ≤ target ≤ 10⁹',
        'Only one valid answer exists.'
      ],
      examples: [
        {
          input: 'nums = [2,7,11,15], target = 9',
          output: '[0,1]',
          explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
        }
      ],
      solutionCode: `function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement)!, i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}`,
      solutionLanguage: 'typescript',
      leetcodeUrl: 'https://leetcode.com/problems/two-sum',
      githubUrl: 'https://github.com/KwonCheulJin/leetcode/tree/main/0001-two-sum'
    };

    // 샘플 번역 결과
    const translation: TranslationResult = {
      titleKorean: '두 수의 합',
      descriptionKorean: '정수 배열 nums와 정수 target이 주어졌을 때, 두 수를 더해서 target이 되는 두 수의 인덱스를 반환하세요.',
      constraintsKorean: [
        '2 ≤ nums.length ≤ 10⁴',
        '-10⁹ ≤ nums[i] ≤ 10⁹',
        '-10⁹ ≤ target ≤ 10⁹',
        '정답은 단 하나만 존재합니다.'
      ],
      explanation: '해시 테이블을 사용하여 각 원소의 complement를 찾습니다. 현재 원소와 complement의 합이 target과 같으면 두 인덱스를 반환합니다.',
      approach: '1. 해시 맵을 생성합니다.\n2. 배열을 순회하면서 각 원소에 대해 complement(target - 현재값)를 계산합니다.\n3. complement가 해시 맵에 있으면 인덱스를 반환합니다.\n4. 없으면 현재 원소를 해시 맵에 저장하고 다음으로 진행합니다.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)'
    };

    console.log('💾 테스트 데이터 저장 중...');
    const result = await supabase.saveProblemData(problemInfo, translation);
    
    if (result.success) {
      console.log(`✅ 테스트 데이터 저장 성공: ID ${result.id}`);
      console.log('\n📊 테이블 정보 확인을 위해 npm run db:info 를 실행해보세요.');
    } else {
      console.log('❌ 테스트 데이터 저장 실패');
    }

  } catch (error) {
    console.error('❌ 테스트 데이터 삽입 실패:', error);
    process.exit(1);
  }
}

// 스크립트 실행
if (import.meta.url === `file://${process.argv[1]}`) {
  insertTestData();
}