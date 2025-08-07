#!/usr/bin/env tsx

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config();

async function fixProblem9Constraints() {
  const client = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  console.log('🔧 문제 9번의 제약조건 수학 표기법 수정 중...');

  // 올바른 제약조건 (수학 표기법 적용)
  const correctConstraintsKorean = ['-2^31^ <= x <= 2^31^ - 1'];
  const correctConstraintsEnglish = ['-2^31^ <= x <= 2^31^ - 1'];

  try {
    // 문제 9번 데이터 업데이트
    const { error } = await client
      .from('leetcode_problems')
      .update({
        constraints_korean: correctConstraintsKorean,
        constraints_english: correctConstraintsEnglish,
        updated_at: new Date().toISOString()
      })
      .eq('problem_number', 9);

    if (error) {
      console.error('❌ 업데이트 실패:', error);
      return;
    }

    console.log('✅ 문제 9번 제약조건 수정 완료');
    console.log('한국어:', correctConstraintsKorean);
    console.log('영어:', correctConstraintsEnglish);

    // 다른 수학 표기법이 있을 수 있는 문제들 확인 및 수정
    const problemsWithMath = [
      { number: 1, constraints: ['0 <= nums.length <= 10^4^', '2^31^ <= nums[i] <= 2^31^ - 1', '2^31^ <= target <= 2^31^ - 1'] },
      { number: 121, constraints: ['-2^31^ <= x <= 2^31^ - 1'] }
      // 더 많은 문제들이 있다면 여기에 추가
    ];

    for (const problem of problemsWithMath) {
      console.log(`\n🔧 문제 ${problem.number} 제약조건 확인 중...`);
      
      const { data, error: selectError } = await client
        .from('leetcode_problems')
        .select('constraints_korean, constraints_english')
        .eq('problem_number', problem.number)
        .single();

      if (selectError) {
        console.log(`❌ 문제 ${problem.number} 조회 실패`);
        continue;
      }

      const needsUpdate = (
        JSON.stringify(data.constraints_korean) !== JSON.stringify(problem.constraints) ||
        JSON.stringify(data.constraints_english) !== JSON.stringify(problem.constraints)
      );

      if (needsUpdate) {
        const { error: updateError } = await client
          .from('leetcode_problems')
          .update({
            constraints_korean: problem.constraints,
            constraints_english: problem.constraints,
            updated_at: new Date().toISOString()
          })
          .eq('problem_number', problem.number);

        if (updateError) {
          console.error(`❌ 문제 ${problem.number} 업데이트 실패:`, updateError);
        } else {
          console.log(`✅ 문제 ${problem.number} 제약조건 수정 완료:`, problem.constraints);
        }
      } else {
        console.log(`ℹ️ 문제 ${problem.number} 제약조건 이미 올바름`);
      }
    }

  } catch (error) {
    console.error('❌ 처리 중 오류:', error);
  }
}

fixProblem9Constraints().catch(console.error);