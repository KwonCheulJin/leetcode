#!/usr/bin/env tsx

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config();

async function checkHtmlResults() {
  const client = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  console.log('📝 HTML 제약조건 적용 결과 확인 중...');
  
  // HTML 태그가 포함된 제약조건 찾기
  const { data: htmlProblems } = await client
    .from('leetcode_problems')
    .select('problem_number, title_korean, constraints_korean')
    .not('constraints_korean', 'is', null);

  if (!htmlProblems) return;

  const htmlResults: any[] = [];
  
  htmlProblems.forEach(problem => {
    if (problem.constraints_korean) {
      const hasHtml = problem.constraints_korean.some((constraint: string) => 
        constraint.includes('<') && constraint.includes('>')
      );
      if (hasHtml) {
        htmlResults.push(problem);
      }
    }
  });

  console.log(`\n🎯 HTML 형태 제약조건이 적용된 문제: ${htmlResults.length}개\n`);

  // 샘플 5개 출력
  htmlResults.slice(0, 5).forEach((problem, index) => {
    console.log(`${index + 1}. 문제 ${problem.problem_number}: ${problem.title_korean}`);
    console.log(`   제약조건: ${problem.constraints_korean[0]}`);
    console.log('');
  });

  // 수학 표기법 특별 케이스들
  console.log('🔍 수학 표기법 특별 케이스들:');
  const mathCases = htmlResults.filter(problem => 
    problem.constraints_korean.some((constraint: string) => 
      constraint.includes('<sup>') || constraint.includes('<sub>')
    )
  );

  mathCases.slice(0, 3).forEach((problem, index) => {
    console.log(`${index + 1}. 문제 ${problem.problem_number}:`);
    const mathConstraint = problem.constraints_korean.find((constraint: string) => 
      constraint.includes('<sup>') || constraint.includes('<sub>')
    );
    console.log(`   ${mathConstraint}`);
    console.log('');
  });

  console.log(`📊 수학 표기법 포함 문제: ${mathCases.length}개`);
}

checkHtmlResults().catch(console.error);