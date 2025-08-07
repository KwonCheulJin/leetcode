#!/usr/bin/env ts-node

/**
 * LeetCode Description 정제 스크립트 (개선 버전)
 * 
 * 이 스크립트는 description_english와 description_korean에서
 * 예제 섹션을 완전히 제거하는 전용 스크립트입니다.
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
  description_english: string;
  description_korean: string;
}

/**
 * 영어 설명에서 예제 섹션을 제거합니다.
 * "Example 1:", "Example 2:", "Example 3:" 등의 섹션을 완전히 제거합니다.
 */
function cleanDescriptionEnglish(description: string): string {
  let cleanedDescription = description;
  
  // 다양한 예제 패턴들을 순차적으로 제거
  const patterns = [
    // 기본 패턴: "Example 1:" 부터 다음 "Example" 또는 "Constraints" 또는 문서 끝까지
    /\s*Example\s+\d+\s*:[^\n]*[\s\S]*?(?=\s*Example\s+\d+\s*:|Constraints\s*:|Follow\s*up\s*:|Note\s*:|$)/gi,
    
    // 남은 단독 예제들
    /\n\s*Example\s+\d+\s*:[^\n]*[\s\S]*?$/gi,
    
    // 중간에 있는 예제들 (다른 섹션 전까지)
    /\n\s*Example\s+\d+\s*:[^\n]*[\s\S]*?(?=\n\s*[A-Z][a-z]+\s*:)/gi,
    
    // 더 유연한 패턴 (공백과 줄바꿈을 고려)
    /\n\s*Example\s+\d+\s*:\s*[\s\S]*?(?=\n\s*\w+\s*:|$)/gi
  ];
  
  // 각 패턴을 순차적으로 적용
  patterns.forEach(pattern => {
    cleanedDescription = cleanedDescription.replace(pattern, '');
  });
  
  // 정리 작업
  cleanedDescription = cleanedDescription
    .replace(/\n\s*\n\s*\n+/g, '\n\n') // 연속된 줄바꿈 정리
    .replace(/\s+$/gm, '') // 각 라인 끝의 공백 제거
    .trim(); // 앞뒤 공백 제거
  
  return cleanedDescription;
}

/**
 * 한국어 설명에서 예제 섹션을 제거합니다.
 * "예제 1:", "예시 1:", "예제 2:" 등의 섹션을 완전히 제거합니다.
 */
function cleanDescriptionKorean(description: string): string {
  let cleanedDescription = description;
  
  // 다양한 한국어 예제 패턴들을 순차적으로 제거
  const patterns = [
    // 기본 패턴: "예제 1:" 또는 "예시 1:" 부터 다음 예제 또는 "제약" 또는 문서 끝까지
    /\s*예[제시]\s*\d+\s*:[^\n]*[\s\S]*?(?=\s*예[제시]\s*\d+\s*:|제약[^\n]*:|$)/g,
    
    // 남은 단독 예제들
    /\n\s*예[제시]\s*\d+\s*:[^\n]*[\s\S]*?$/g,
    
    // 중간에 있는 예제들 (다른 섹션 전까지)
    /\n\s*예[제시]\s*\d+\s*:[^\n]*[\s\S]*?(?=\n\s*[가-힣A-Z][가-힣a-z]*\s*:|$)/g,
    
    // 더 유연한 패턴
    /\n\s*예[제시]\s*\d+\s*:\s*[\s\S]*?(?=\n\s*\w+\s*:|$)/g
  ];
  
  // 각 패턴을 순차적으로 적용
  patterns.forEach(pattern => {
    cleanedDescription = cleanedDescription.replace(pattern, '');
  });
  
  // 정리 작업
  cleanedDescription = cleanedDescription
    .replace(/\n\s*\n\s*\n+/g, '\n\n') // 연속된 줄바꿈 정리
    .replace(/\s+$/gm, '') // 각 라인 끝의 공백 제거
    .trim(); // 앞뒤 공백 제거
  
  return cleanedDescription;
}

/**
 * 단일 문제의 description을 정제합니다.
 */
function cleanProblemDescriptions(problem: LeetCodeProblem): { 
  description_english?: string; 
  description_korean?: string; 
} {
  const updates: { description_english?: string; description_korean?: string } = {};
  
  // 영어 설명 정제
  const cleanedEnglish = cleanDescriptionEnglish(problem.description_english);
  if (cleanedEnglish !== problem.description_english) {
    updates.description_english = cleanedEnglish;
  }
  
  // 한국어 설명 정제
  const cleanedKorean = cleanDescriptionKorean(problem.description_korean);
  if (cleanedKorean !== problem.description_korean) {
    updates.description_korean = cleanedKorean;
  }
  
  return updates;
}

/**
 * 메인 실행 함수
 */
async function main() {
  try {
    console.log('🚀 LeetCode Description 정제를 시작합니다...');
    
    // 예제가 포함된 문제들만 조회
    const { data: problems, error } = await supabase
      .from('leetcode_problems')
      .select('id, problem_number, title, description_english, description_korean')
      .or(`description_english.ilike.%Example 1%,description_english.ilike.%Example 2%,description_english.ilike.%Example 3%,description_korean.ilike.%예제 1%,description_korean.ilike.%예제 2%,description_korean.ilike.%예제 3%,description_korean.ilike.%예시 1%,description_korean.ilike.%예시 2%,description_korean.ilike.%예시 3%`)
      .order('problem_number');
    
    if (error) {
      throw error;
    }
    
    if (!problems || problems.length === 0) {
      console.log('📭 예제가 포함된 문제 데이터가 없습니다.');
      return;
    }
    
    console.log(`📋 총 ${problems.length}개의 문제에서 예제 섹션을 제거합니다.`);
    
    let processedCount = 0;
    let updatedCount = 0;
    
    // 각 문제별로 처리
    for (const problem of problems) {
      try {
        const updates = cleanProblemDescriptions(problem as LeetCodeProblem);
        
        if (Object.keys(updates).length > 0) {
          // 업데이트 실행
          const { error: updateError } = await supabase
            .from('leetcode_problems')
            .update({
              ...updates,
              updated_at: new Date().toISOString()
            })
            .eq('id', problem.id);
          
          if (updateError) {
            console.error(`❌ 문제 ${problem.problem_number} 업데이트 실패:`, updateError.message);
          } else {
            updatedCount++;
            console.log(`✅ 문제 ${problem.problem_number} (${problem.title}) 업데이트 완료`);
            
            // 업데이트된 필드 표시
            const updatedFields = Object.keys(updates);
            console.log(`   📝 정제된 필드: ${updatedFields.join(', ')}`);
            
            // 수정 내용 미리보기
            if (updates.description_english) {
              const preview = updates.description_english.substring(0, 100) + '...';
              console.log(`   🔤 영어 설명: ${preview}`);
            }
            if (updates.description_korean) {
              const preview = updates.description_korean.substring(0, 100) + '...';
              console.log(`   🔠 한국어 설명: ${preview}`);
            }
          }
        } else {
          console.log(`⭐ 문제 ${problem.problem_number} (${problem.title}) - 이미 정제됨`);
        }
        
        processedCount++;
        
        // 진행률 표시 (5개마다)
        if (processedCount % 5 === 0) {
          console.log(`📊 진행률: ${processedCount}/${problems.length} (${Math.round(processedCount / problems.length * 100)}%)`);
        }
        
      } catch (problemError) {
        console.error(`❌ 문제 ${problem.problem_number} 처리 중 오류:`, problemError);
      }
    }
    
    console.log('\n🎉 Description 정제 완료!');
    console.log(`📊 처리된 문제: ${processedCount}개`);
    console.log(`✅ 업데이트된 문제: ${updatedCount}개`);
    console.log(`⭐ 이미 정제됨: ${processedCount - updatedCount}개`);
    
    // 검증 쿼리 실행
    console.log('\n🔍 정제 결과 검증 중...');
    const { count: remainingCount } = await supabase
      .from('leetcode_problems')
      .select('*', { count: 'exact' })
      .or(`description_english.ilike.%Example 1%,description_english.ilike.%Example 2%,description_english.ilike.%Example 3%,description_korean.ilike.%예제 1%,description_korean.ilike.%예제 2%,description_korean.ilike.%예제 3%,description_korean.ilike.%예시 1%,description_korean.ilike.%예시 2%,description_korean.ilike.%예시 3%`);
    
    if (remainingCount === 0) {
      console.log('🎯 완벽! 모든 예제 섹션이 제거되었습니다.');
    } else {
      console.log(`⚠️  아직 ${remainingCount}개의 문제에 예제 섹션이 남아있습니다.`);
    }
    
  } catch (error) {
    console.error('❌ 스크립트 실행 중 오류 발생:', error);
    process.exit(1);
  }
}

// 스크립트 실행 (ES Module 환경)
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { cleanDescriptionEnglish, cleanDescriptionKorean, cleanProblemDescriptions };