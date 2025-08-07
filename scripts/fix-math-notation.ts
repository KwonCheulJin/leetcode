#!/usr/bin/env tsx

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config();

/**
 * 수학 표기법 수정 스크립트
 * Markdown 형태의 수학 표기를 HTML 형태로 변환
 */
class MathNotationFixer {
  private client;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    this.client = createClient(supabaseUrl, supabaseKey);
  }

  /**
   * 수학 표기법을 HTML 형태로 변환
   */
  convertMathToHtml(text: string): string {
    let converted = text;

    // 1. -2^31 특별 케이스 먼저 처리
    converted = converted.replace(/-2\^31\^?/g, '<code>-2<sup>31</sup></code>');
    
    // 2. 일반적인 숫자^숫자 형태를 HTML로 변환
    converted = converted.replace(/(\d+)\^(\d+)\^?/g, (match, base, exp) => {
      return `<code>${base}<sup>${exp}</sup></code>`;
    });

    // 3. 기타 지수 표현 (변수^숫자 패턴)
    converted = converted.replace(/([a-zA-Z_]\w*)\^(\d+)\^?/g, (match, base, exp) => {
      return `<code>${base}<sup>${exp}</sup></code>`;
    });

    // 4. 부등호를 수학적 기호로 변환
    converted = converted.replace(/<=/g, '≤');
    converted = converted.replace(/>=/g, '≥');

    // 5. 중복 code 태그 제거 (예: <code><code>10<sup>5</sup></code></code>)
    converted = converted.replace(/<code>\s*<code>/g, '<code>');
    converted = converted.replace(/<\/code>\s*<\/code>/g, '</code>');

    // 6. 공백 정리
    converted = converted.replace(/\s+/g, ' ').trim();

    return converted;
  }

  /**
   * 특정 문제의 수학 표기법 수정
   */
  async fixProblemMathNotation(problemNumber: number): Promise<boolean> {
    console.log(`🔧 문제 ${problemNumber} 수학 표기법 수정 중...`);

    try {
      // 현재 데이터 조회
      const { data: problem, error: fetchError } = await this.client
        .from('leetcode_problems')
        .select('id, constraints_korean, constraints_english')
        .eq('problem_number', problemNumber)
        .single();

      if (fetchError) {
        console.error(`❌ 문제 ${problemNumber} 조회 실패:`, fetchError.message);
        return false;
      }

      let updated = false;
      const updateData: any = { updated_at: new Date().toISOString() };

      // 한국어 제약조건 수정
      if (problem.constraints_korean && problem.constraints_korean.length > 0) {
        const updatedKoreanConstraints = problem.constraints_korean.map((constraint: string) => {
          const originalConstraint = constraint;
          const convertedConstraint = this.convertMathToHtml(constraint);
          
          if (originalConstraint !== convertedConstraint) {
            console.log(`  📝 한국어: "${originalConstraint}" → "${convertedConstraint}"`);
            updated = true;
          }
          
          return convertedConstraint;
        });
        
        updateData.constraints_korean = updatedKoreanConstraints;
      }

      // 영어 제약조건 수정
      if (problem.constraints_english && problem.constraints_english.length > 0) {
        const updatedEnglishConstraints = problem.constraints_english.map((constraint: string) => {
          const originalConstraint = constraint;
          const convertedConstraint = this.convertMathToHtml(constraint);
          
          if (originalConstraint !== convertedConstraint) {
            console.log(`  📝 영어: "${originalConstraint}" → "${convertedConstraint}"`);
            updated = true;
          }
          
          return convertedConstraint;
        });
        
        updateData.constraints_english = updatedEnglishConstraints;
      }

      // 데이터베이스 업데이트
      if (updated) {
        const { error: updateError } = await this.client
          .from('leetcode_problems')
          .update(updateData)
          .eq('id', problem.id);

        if (updateError) {
          console.error(`❌ 문제 ${problemNumber} 업데이트 실패:`, updateError.message);
          return false;
        }

        console.log(`✅ 문제 ${problemNumber} 수학 표기법 수정 완료`);
      } else {
        console.log(`ℹ️ 문제 ${problemNumber}는 수정할 내용이 없음`);
      }

      return true;

    } catch (error) {
      console.error(`❌ 문제 ${problemNumber} 처리 중 오류:`, error);
      return false;
    }
  }

  /**
   * 여러 문제의 수학 표기법 일괄 수정
   */
  async fixMultipleProblems(problemNumbers: number[]): Promise<void> {
    console.log('🚀 수학 표기법 일괄 수정 시작...');
    console.log(`📊 대상 문제: ${problemNumbers.join(', ')}`);

    let successCount = 0;
    let failureCount = 0;

    for (let i = 0; i < problemNumbers.length; i++) {
      const problemNumber = problemNumbers[i];
      console.log(`\n[${i + 1}/${problemNumbers.length}] 문제 ${problemNumber} 처리`);

      const success = await this.fixProblemMathNotation(problemNumber);
      if (success) {
        successCount++;
      } else {
        failureCount++;
      }

      // 서버 부하 방지를 위한 잠시 대기
      if (i < problemNumbers.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }

    console.log('\n🎉 수학 표기법 수정 완료!');
    console.log('📊 결과 요약:');
    console.log(`  성공: ${successCount}개`);
    console.log(`  실패: ${failureCount}개`);
    console.log(`  전체: ${problemNumbers.length}개`);

    // 수정 후 샘플 확인
    if (successCount > 0) {
      console.log('\n🔍 수정 결과 샘플:');
      const sampleProblem = problemNumbers[0];
      const { data } = await this.client
        .from('leetcode_problems')
        .select('problem_number, title_korean, constraints_korean')
        .eq('problem_number', sampleProblem)
        .single();

      if (data && data.constraints_korean) {
        console.log(`문제 ${data.problem_number}: ${data.title_korean}`);
        console.log('한국어 제약조건:');
        data.constraints_korean.forEach((constraint: string, index: number) => {
          console.log(`  ${index + 1}. ${constraint}`);
        });
      }
    }
  }

  /**
   * 변환 테스트
   */
  testConversion(): void {
    console.log('🧪 수학 표기법 변환 테스트:');
    
    const testCases = [
      '0 <= nums.length <= 10^4^',
      '2^31^ <= nums[i] <= 2^31^ - 1',
      '-2^31^ <= target <= 2^31^ - 1',
      '1 <= s.length <= 10^5',
      '0 <= arr에 있는 숫자의 개수 <= 10^5',
      '-2^31^ <= x <= 2^31^ - 1'
    ];

    testCases.forEach((testCase, index) => {
      const converted = this.convertMathToHtml(testCase);
      console.log(`${index + 1}. 원본: "${testCase}"`);
      console.log(`   변환: "${converted}"`);
      console.log('');
    });
  }
}

// 메인 실행 함수
async function main() {
  const args = process.argv.slice(2);
  const fixer = new MathNotationFixer();

  if (args.includes('--test')) {
    fixer.testConversion();
    return;
  }

  if (args.includes('--problem')) {
    const problemIndex = args.indexOf('--problem');
    const problemNumber = parseInt(args[problemIndex + 1]);
    
    if (isNaN(problemNumber)) {
      console.error('❌ 올바른 문제 번호를 입력하세요.');
      return;
    }
    
    await fixer.fixProblemMathNotation(problemNumber);
    return;
  }

  if (args.includes('--fix-issues')) {
    // 이전에 발견된 문제가 있는 문제들 수정
    const problematicNumbers = [1, 9, 20, 121, 189, 2390, 2759];
    await fixer.fixMultipleProblems(problematicNumbers);
    return;
  }

  // 사용법 출력
  console.log('🎯 수학 표기법 수정 도구');
  console.log('사용법:');
  console.log('  --test              # 변환 테스트 실행');
  console.log('  --problem <번호>    # 특정 문제 수정');
  console.log('  --fix-issues        # 이슈가 있는 모든 문제 수정');
  console.log('');
  console.log('💡 예시:');
  console.log('  npx tsx scripts/fix-math-notation.ts --test');
  console.log('  npx tsx scripts/fix-math-notation.ts --problem 1');
  console.log('  npx tsx scripts/fix-math-notation.ts --fix-issues');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}