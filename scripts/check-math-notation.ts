#!/usr/bin/env tsx

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config();

async function checkMathNotation() {
  const client = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  console.log('🔍 수학 표기법 변환 결과 확인 중...');
  
  // 문제 9번 (팰린드롬) 확인
  const { data: problem9 } = await client
    .from('leetcode_problems')
    .select('id, problem_number, constraints_korean, constraints_english')
    .eq('problem_number', 9)
    .single();
  
  console.log('\n📋 문제 9번 (팰린드롬 숫자):');
  console.log('한국어 제약조건:', problem9?.constraints_korean);
  console.log('영어 제약조건:', problem9?.constraints_english);

  // 다른 수학 표기법이 있을 수 있는 문제들 확인
  const { data: mathProblems } = await client
    .from('leetcode_problems')
    .select('id, problem_number, constraints_korean')
    .or('constraints_korean.ilike.%2^%,constraints_korean.ilike.%sup%,constraints_korean.ilike.%31%')
    .limit(5);

  console.log('\n📊 수학 표기법을 포함한 다른 문제들:');
  mathProblems?.forEach(problem => {
    console.log(`문제 ${problem.problem_number}:`, problem.constraints_korean);
  });
}

checkMathNotation().catch(console.error);