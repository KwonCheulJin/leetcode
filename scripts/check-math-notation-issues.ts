#!/usr/bin/env tsx

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config();

interface MathNotationIssue {
  problemNumber: number;
  titleKorean: string;
  issues: string[];
  koreanConstraints: string[];
  englishConstraints: string[];
}

async function checkMathNotationIssues() {
  const client = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  console.log('🔍 모든 문제의 수학 표기법 저장 상태 검사 중...');
  
  // 제약조건이 있는 모든 문제 조회
  const { data: problems, error } = await client
    .from('leetcode_problems')
    .select('problem_number, title_korean, constraints_korean, constraints_english')
    .or('constraints_korean.not.is.null,constraints_english.not.is.null')
    .order('problem_number');

  if (error) {
    console.error('❌ 데이터베이스 조회 실패:', error);
    return;
  }

  if (!problems || problems.length === 0) {
    console.log('❌ 제약조건이 있는 문제를 찾을 수 없습니다.');
    return;
  }

  const issuesFound: MathNotationIssue[] = [];
  let totalProblems = 0;
  let problemsWithMarkdownMath = 0;
  let problemsWithHtmlMath = 0;
  let problemsWithoutMath = 0;

  console.log(`📊 총 ${problems.length}개 문제 분석 중...`);

  for (const problem of problems) {
    totalProblems++;
    const issues: string[] = [];
    let hasMathNotation = false;
    let hasMarkdownMath = false;
    let hasHtmlMath = false;

    // 한국어 제약조건 검사
    if (problem.constraints_korean && problem.constraints_korean.length > 0) {
      problem.constraints_korean.forEach((constraint: string, index: number) => {
        // Markdown 수학 표기 검사 (^로 지수 표현)
        if (constraint.includes('^') && !constraint.includes('<sup>')) {
          hasMarkdownMath = true;
          hasMathNotation = true;
          issues.push(`한국어 제약조건 ${index + 1}: Markdown 수학 표기 (^) 발견`);
        }
        
        // HTML 수학 표기 검사
        if (constraint.includes('<sup>') || constraint.includes('<sub>')) {
          hasHtmlMath = true;
          hasMathNotation = true;
        }
        
        // 기타 수학 표기 패턴
        if (constraint.match(/\d+\s*\*\s*10\s*\^\s*\d+/) || constraint.match(/10\^\d+/)) {
          hasMarkdownMath = true;
          hasMathNotation = true;
          issues.push(`한국어 제약조건 ${index + 1}: 10^x 형태 표기 발견`);
        }
        
        // 2^31 같은 패턴
        if (constraint.match(/2\s*\^\s*31/) || constraint.match(/2\^31\^/)) {
          hasMarkdownMath = true;
          hasMathNotation = true;
          issues.push(`한국어 제약조건 ${index + 1}: 2^31 형태 표기 발견`);
        }
      });
    }

    // 영어 제약조건 검사
    if (problem.constraints_english && problem.constraints_english.length > 0) {
      problem.constraints_english.forEach((constraint: string, index: number) => {
        // Markdown 수학 표기 검사
        if (constraint.includes('^') && !constraint.includes('<sup>')) {
          hasMarkdownMath = true;
          hasMathNotation = true;
          issues.push(`영어 제약조건 ${index + 1}: Markdown 수학 표기 (^) 발견`);
        }
        
        // HTML 수학 표기 검사
        if (constraint.includes('<sup>') || constraint.includes('<sub>')) {
          hasHtmlMath = true;
          hasMathNotation = true;
        }
        
        // 기타 수학 표기 패턴
        if (constraint.match(/\d+\s*\*\s*10\s*\^\s*\d+/) || constraint.match(/10\^\d+/)) {
          hasMarkdownMath = true;
          hasMathNotation = true;
          issues.push(`영어 제약조건 ${index + 1}: 10^x 형태 표기 발견`);
        }
        
        // 2^31 같은 패턴
        if (constraint.match(/2\s*\^\s*31/) || constraint.match(/2\^31\^/)) {
          hasMarkdownMath = true;
          hasMathNotation = true;
          issues.push(`영어 제약조건 ${index + 1}: 2^31 형태 표기 발견`);
        }
      });
    }

    // 통계 집계
    if (hasMarkdownMath) {
      problemsWithMarkdownMath++;
    }
    if (hasHtmlMath) {
      problemsWithHtmlMath++;
    }
    if (!hasMathNotation) {
      problemsWithoutMath++;
    }

    // 문제가 있는 경우 목록에 추가
    if (issues.length > 0) {
      issuesFound.push({
        problemNumber: problem.problem_number,
        titleKorean: problem.title_korean,
        issues,
        koreanConstraints: problem.constraints_korean || [],
        englishConstraints: problem.constraints_english || []
      });
    }
  }

  // 결과 출력
  console.log('\n📈 수학 표기법 분석 결과:');
  console.log(`  전체 문제: ${totalProblems}개`);
  console.log(`  Markdown 수학 표기: ${problemsWithMarkdownMath}개`);
  console.log(`  HTML 수학 표기: ${problemsWithHtmlMath}개`);
  console.log(`  수학 표기 없음: ${problemsWithoutMath}개`);
  console.log(`  문제가 있는 문제: ${issuesFound.length}개`);

  if (issuesFound.length > 0) {
    console.log('\n🚨 수정이 필요한 문제들:');
    
    issuesFound.forEach((issue, index) => {
      console.log(`\n${index + 1}. 문제 ${issue.problemNumber}: ${issue.titleKorean}`);
      issue.issues.forEach(issueText => {
        console.log(`   ❌ ${issueText}`);
      });
      
      // 샘플 제약조건 표시 (첫 번째만)
      if (issue.koreanConstraints.length > 0) {
        console.log(`   📝 한국어 예시: "${issue.koreanConstraints[0]}"`);
      }
      if (issue.englishConstraints.length > 0) {
        console.log(`   📝 영어 예시: "${issue.englishConstraints[0]}"`);
      }
    });

    // 상위 10개 우선순위 문제
    console.log('\n🎯 우선 수정 대상 (상위 10개):');
    const priorityProblems = issuesFound
      .slice(0, 10)
      .map(issue => issue.problemNumber)
      .join(', ');
    console.log(priorityProblems);

    console.log('\n💡 권장사항:');
    console.log('  - Markdown 표기 (^)를 HTML 표기 (<sup>)로 변경');
    console.log('  - 10^4 → <code>10<sup>4</sup></code>');
    console.log('  - 2^31 → <code>2<sup>31</sup></code>');
    console.log('  - -2^31 <= x <= 2^31 - 1 → <code>-2<sup>31</sup> ≤ x ≤ 2<sup>31</sup> - 1</code>');
  } else {
    console.log('\n✅ 모든 문제의 수학 표기법이 올바르게 저장되어 있습니다!');
  }

  // 변환율 계산
  const conversionRate = problemsWithHtmlMath / (problemsWithHtmlMath + problemsWithMarkdownMath) * 100;
  console.log(`\n🎯 HTML 변환율: ${conversionRate.toFixed(1)}%`);

  return issuesFound;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  checkMathNotationIssues().catch(console.error);
}