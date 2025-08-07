#!/usr/bin/env tsx

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config();

const targetIds = [3,4,7,9,10,11,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,34,36,38,39,41,42,44,45,46,47,48];

async function analyzeSpecificIds() {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const client = createClient(supabaseUrl, supabaseKey);

  console.log('🔍 특정 ID들의 데이터 상태 분석 중...');
  
  const issues: { [key: number]: string[] } = {};
  
  for (const id of targetIds) {
    try {
      const { data, error } = await client
        .from('leetcode_problems')
        .select('id, problem_number, title, title_korean, description_english, description_korean, constraints_english, constraints_korean, examples')
        .eq('id', id)
        .single();
      
      if (error) {
        console.log(`❌ ID ${id}: 조회 실패 - ${error.message}`);
        continue;
      }
      
      const problemIssues: string[] = [];
      
      if (!data.title) problemIssues.push('title');
      if (!data.title_korean) problemIssues.push('title_korean');
      if (!data.description_english) problemIssues.push('description_english');
      if (!data.description_korean) problemIssues.push('description_korean');
      if (!data.constraints_english || data.constraints_english.length === 0) problemIssues.push('constraints_english');
      if (!data.constraints_korean || data.constraints_korean.length === 0) problemIssues.push('constraints_korean');
      if (!data.examples || data.examples.length === 0) problemIssues.push('examples');
      
      if (problemIssues.length > 0) {
        issues[id] = problemIssues;
        console.log(`❌ ID ${id} (문제 ${data.problem_number}): ${problemIssues.join(', ')}`);
      } else {
        console.log(`✅ ID ${id} (문제 ${data.problem_number}): 데이터 완전`);
      }
      
    } catch (error) {
      console.error(`❌ ID ${id} 처리 실패:`, error);
    }
  }
  
  // 요약 출력
  console.log('\n📊 분석 결과 요약:');
  console.log(`총 검사 대상: ${targetIds.length}개`);
  console.log(`문제가 있는 ID: ${Object.keys(issues).length}개`);
  console.log(`완전한 데이터: ${targetIds.length - Object.keys(issues).length}개`);
  
  if (Object.keys(issues).length > 0) {
    console.log('\n🔍 문제별 세부사항:');
    for (const [id, issueList] of Object.entries(issues)) {
      console.log(`  ID ${id}: ${issueList.join(', ')}`);
    }
  }
}

analyzeSpecificIds().catch(console.error);