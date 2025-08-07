#!/usr/bin/env tsx

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

config();

async function checkTwoSumConstraints() {
  const client = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  console.log('🔍 두 수의 합 문제 제약조건 확인 중...');
  
  // 두 수의 합 문제(1번) 조회
  const { data, error } = await client
    .from('leetcode_problems')
    .select('problem_number, title_korean, constraints_korean, constraints_english')
    .eq('problem_number', 1);

  if (error) {
    console.error('❌ 데이터베이스 조회 실패:', error);
    return;
  }

  if (!data || data.length === 0) {
    console.log('❌ 두 수의 합 문제를 찾을 수 없습니다.');
    return;
  }

  const problem = data[0];
  console.log('📋 두 수의 합 문제 현재 상태:');
  console.log(`문제 번호: ${problem.problem_number}`);
  console.log(`제목: ${problem.title_korean}`);
  console.log('');
  
  console.log('🔤 한국어 제약조건:');
  if (problem.constraints_korean) {
    problem.constraints_korean.forEach((constraint: string, index: number) => {
      console.log(`  ${index + 1}. ${constraint}`);
      
      // HTML 태그가 포함되어 있는지 확인
      const hasHtml = constraint.includes('<') && constraint.includes('>');
      const hasMath = constraint.includes('²') || constraint.includes('^') || constraint.includes('<sup>') || constraint.includes('<sub>');
      
      console.log(`     HTML 포함: ${hasHtml ? '✅' : '❌'}`);
      console.log(`     수학 표기: ${hasMath ? '✅' : '❌'}`);
    });
  } else {
    console.log('  없음');
  }
  
  console.log('');
  console.log('🔤 영어 제약조건:');
  if (problem.constraints_english) {
    problem.constraints_english.forEach((constraint: string, index: number) => {
      console.log(`  ${index + 1}. ${constraint}`);
      
      // HTML 태그가 포함되어 있는지 확인
      const hasHtml = constraint.includes('<') && constraint.includes('>');
      const hasMath = constraint.includes('²') || constraint.includes('^') || constraint.includes('<sup>') || constraint.includes('<sub>');
      
      console.log(`     HTML 포함: ${hasHtml ? '✅' : '❌'}`);
      console.log(`     수학 표기: ${hasMath ? '✅' : '❌'}`);
    });
  } else {
    console.log('  없음');
  }

  // README 파일에서 실제 제약조건 확인
  console.log('\n📁 README 파일에서 제약조건 확인:');
  const problemDir = '0001-two-sum';
  
  if (existsSync(problemDir)) {
    const readmePath = join(problemDir, 'README.md');
    const readmeEnPath = join(problemDir, 'README.en.md');
    
    if (existsSync(readmePath)) {
      console.log('\n📝 README.md 내용:');
      const content = readFileSync(readmePath, 'utf-8');
      
      // 제약조건 부분 찾기
      const constraintMatch = content.match(/제약\s*조건.*?(<ul>.*?<\/ul>|(?:-|\*|\d+\.)\s.*?(?=\n\n|\n#|\n\*\*|\n$))/s);
      if (constraintMatch) {
        console.log('제약조건 섹션:');
        console.log(constraintMatch[0]);
      } else {
        console.log('제약조건 섹션을 찾을 수 없음');
      }
    }
    
    if (existsSync(readmeEnPath)) {
      console.log('\n📝 README.en.md 내용:');
      const content = readFileSync(readmeEnPath, 'utf-8');
      
      // 제약조건 부분 찾기
      const constraintMatch = content.match(/Constraints.*?(<ul>.*?<\/ul>|(?:-|\*|\d+\.)\s.*?(?=\n\n|\n#|\n\*\*|\n$))/s);
      if (constraintMatch) {
        console.log('제약조건 섹션:');
        console.log(constraintMatch[0]);
      } else {
        console.log('제약조건 섹션을 찾을 수 없음');
      }
    }
  } else {
    console.log(`❌ 문제 디렉토리 '${problemDir}'를 찾을 수 없습니다.`);
  }
}

checkTwoSumConstraints().catch(console.error);