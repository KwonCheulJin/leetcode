#!/usr/bin/env ts-node

/**
 * LeetCode 데이터 정제 스크립트
 * 
 * 이 스크립트는 다음 세 가지 작업을 수행합니다:
 * 1. description_korean에서 "예제 N:" 섹션들을 제거
 * 2. examples 배열의 각 객체에서 "</strong>" 태그를 제거
 * 3. solution_code 필드에 적절한 들여쓰기 적용
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// 환경 변수 로드
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ SUPABASE_URL과 SUPABASE_SERVICE_ROLE_KEY 환경 변수가 필요합니다.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface LeetCodeProblem {
  id: number;
  problem_number: number;
  title: string;
  description_korean: string;
  examples: Array<{
    input: string;
    output: string;
    explanation: string;
  }>;
  solution_code: string;
}

/**
 * 한국어 설명에서 예제 섹션을 제거합니다.
 * "예제 N:" 으로 시작하는 섹션들을 모두 제거합니다.
 */
function cleanDescriptionKorean(description: string): string {
  // 예제 섹션을 찾는 정규식
  // "예제 1:", "예제 2:" 등으로 시작하는 섹션을 찾아 제거
  const examplePattern = /예시?\s*\d+\s*:\s*[\s\S]*?(?=예시?\s*\d+\s*:|$)/g;
  
  let cleanedDescription = description;
  
  // 예제 섹션들을 제거
  cleanedDescription = cleanedDescription.replace(examplePattern, '');
  
  // 여러 개의 연속된 줄바꿈을 하나로 정리
  cleanedDescription = cleanedDescription.replace(/\n\s*\n\s*\n+/g, '\n\n');
  
  // 앞뒤 공백 제거
  cleanedDescription = cleanedDescription.trim();
  
  return cleanedDescription;
}

/**
 * examples 배열에서 HTML 태그를 제거합니다.
 */
function cleanExamples(examples: any[]): any[] {
  if (!Array.isArray(examples)) {
    return examples;
  }
  
  return examples.map(example => {
    if (typeof example === 'object' && example !== null) {
      const cleanedExample = { ...example };
      
      // input, output, explanation 필드에서 </strong> 태그 제거
      if (typeof cleanedExample.input === 'string') {
        cleanedExample.input = cleanedExample.input.replace(/<\/strong>\s*/g, '');
      }
      if (typeof cleanedExample.output === 'string') {
        cleanedExample.output = cleanedExample.output.replace(/<\/strong>\s*/g, '');
      }
      if (typeof cleanedExample.explanation === 'string') {
        cleanedExample.explanation = cleanedExample.explanation.replace(/<\/strong>\s*/g, '');
      }
      
      return cleanedExample;
    }
    return example;
  });
}

/**
 * TypeScript/JavaScript 코드에 적절한 들여쓰기를 적용합니다.
 */
function formatSolutionCode(code: string): string {
  const lines = code.split('\n');
  const formattedLines: string[] = [];
  let indentLevel = 0;
  const INDENT = '  '; // 2스페이스 들여쓰기
  
  for (let line of lines) {
    const trimmedLine = line.trim();
    
    if (trimmedLine === '') {
      formattedLines.push('');
      continue;
    }
    
    // 닫는 중괄호가 있는 경우 들여쓰기 레벨을 먼저 감소
    if (trimmedLine.includes('}')) {
      const closingBraces = (trimmedLine.match(/}/g) || []).length;
      const openingBraces = (trimmedLine.match(/{/g) || []).length;
      indentLevel = Math.max(0, indentLevel - (closingBraces - openingBraces));
    }
    
    // 현재 들여쓰기 레벨로 줄 추가
    formattedLines.push(INDENT.repeat(indentLevel) + trimmedLine);
    
    // 여는 중괄호가 있는 경우 들여쓰기 레벨 증가
    if (trimmedLine.includes('{')) {
      const openingBraces = (trimmedLine.match(/{/g) || []).length;
      const closingBraces = (trimmedLine.match(/}/g) || []).length;
      indentLevel += (openingBraces - closingBraces);
    }
  }
  
  return formattedLines.join('\n');
}

/**
 * 단일 문제 데이터를 정제합니다.
 */
function cleanProblemData(problem: LeetCodeProblem): Partial<LeetCodeProblem> {
  const updates: Partial<LeetCodeProblem> = {};
  
  // 1. description_korean 정제
  const cleanedDescription = cleanDescriptionKorean(problem.description_korean);
  if (cleanedDescription !== problem.description_korean) {
    updates.description_korean = cleanedDescription;
  }
  
  // 2. examples 정제
  const cleanedExamples = cleanExamples(problem.examples);
  if (JSON.stringify(cleanedExamples) !== JSON.stringify(problem.examples)) {
    updates.examples = cleanedExamples as any;
  }
  
  // 3. solution_code 포맷팅
  const formattedCode = formatSolutionCode(problem.solution_code);
  if (formattedCode !== problem.solution_code) {
    updates.solution_code = formattedCode;
  }
  
  return updates;
}

/**
 * 메인 실행 함수
 */
async function main() {
  try {
    console.log('🚀 LeetCode 데이터 정제를 시작합니다...');
    
    // 모든 문제 데이터 조회
    const { data: problems, error } = await supabase
      .from('leetcode_problems')
      .select('id, problem_number, title, description_korean, examples, solution_code')
      .order('problem_number');
    
    if (error) {
      throw error;
    }
    
    if (!problems || problems.length === 0) {
      console.log('📭 처리할 문제 데이터가 없습니다.');
      return;
    }
    
    console.log(`📋 총 ${problems.length}개의 문제를 처리합니다.`);
    
    let processedCount = 0;
    let updatedCount = 0;
    
    // 각 문제별로 처리
    for (const problem of problems) {
      try {
        const updates = cleanProblemData(problem as LeetCodeProblem);
        
        if (Object.keys(updates).length > 0) {
          // 업데이트 실행
          const { error: updateError } = await supabase
            .from('leetcode_problems')
            .update(updates)
            .eq('id', problem.id);
          
          if (updateError) {
            console.error(`❌ 문제 ${problem.problem_number} 업데이트 실패:`, updateError.message);
          } else {
            updatedCount++;
            console.log(`✅ 문제 ${problem.problem_number} (${problem.title}) 업데이트 완료`);
            
            // 업데이트된 필드 표시
            const updatedFields = Object.keys(updates);
            console.log(`   📝 수정된 필드: ${updatedFields.join(', ')}`);
          }
        } else {
          console.log(`⭐ 문제 ${problem.problem_number} (${problem.title}) - 수정 불필요`);
        }
        
        processedCount++;
        
        // 진행률 표시 (10개마다)
        if (processedCount % 10 === 0) {
          console.log(`📊 진행률: ${processedCount}/${problems.length} (${Math.round(processedCount / problems.length * 100)}%)`);
        }
        
      } catch (problemError) {
        console.error(`❌ 문제 ${problem.problem_number} 처리 중 오류:`, problemError);
      }
    }
    
    console.log('\n🎉 데이터 정제 완료!');
    console.log(`📊 처리된 문제: ${processedCount}개`);
    console.log(`✅ 업데이트된 문제: ${updatedCount}개`);
    console.log(`⭐ 수정 불필요: ${processedCount - updatedCount}개`);
    
  } catch (error) {
    console.error('❌ 스크립트 실행 중 오류 발생:', error);
    process.exit(1);
  }
}

// 스크립트 실행 (ES Module 환경)
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { cleanDescriptionKorean, cleanExamples, formatSolutionCode, cleanProblemData };