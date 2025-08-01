#!/usr/bin/env tsx

/**
 * VARCHAR 길이 제한 문제 해결 스크립트
 * time_complexity와 space_complexity 컬럼을 TEXT로 변경
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

async function fixVarcharColumns() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('🚨 Supabase 환경 변수가 설정되지 않았습니다.');
    process.exit(1);
  }

  const client = createClient(supabaseUrl, supabaseKey);
  console.log('✅ Supabase 클라이언트 초기화 완료');

  try {
    console.log('🔧 VARCHAR 컬럼을 TEXT로 변경 중...');
    
    // time_complexity 컬럼 변경
    console.log('📝 time_complexity 컬럼 변경 중...');
    const { error: error1 } = await client.rpc('exec_sql', {
      sql: 'ALTER TABLE leetcode_problems ALTER COLUMN time_complexity TYPE TEXT;'
    });

    if (error1) {
      console.error('❌ time_complexity 컬럼 변경 실패:', error1);
    } else {
      console.log('✅ time_complexity 컬럼 변경 완료');
    }

    // space_complexity 컬럼 변경
    console.log('📝 space_complexity 컬럼 변경 중...');
    const { error: error2 } = await client.rpc('exec_sql', {
      sql: 'ALTER TABLE leetcode_problems ALTER COLUMN space_complexity TYPE TEXT;'
    });

    if (error2) {
      console.error('❌ space_complexity 컬럼 변경 실패:', error2);
    } else {
      console.log('✅ space_complexity 컬럼 변경 완료');
    }

    if (error1 || error2) {
      console.log('\n⚠️  일부 컬럼 변경에 실패했습니다. Supabase Dashboard에서 다음 SQL을 실행해주세요:');
      console.log('─'.repeat(80));
      console.log('ALTER TABLE leetcode_problems ALTER COLUMN time_complexity TYPE TEXT;');
      console.log('ALTER TABLE leetcode_problems ALTER COLUMN space_complexity TYPE TEXT;');
      console.log('─'.repeat(80));
    } else {
      console.log('\n🎉 모든 VARCHAR 컬럼이 TEXT로 성공적으로 변경되었습니다!');
    }

  } catch (error) {
    console.error('❌ 스크립트 실행 실패:', error);
    console.log('\n⚠️  수동으로 Supabase Dashboard에서 다음 SQL을 실행해주세요:');
    console.log('─'.repeat(80));
    console.log('ALTER TABLE leetcode_problems ALTER COLUMN time_complexity TYPE TEXT;');
    console.log('ALTER TABLE leetcode_problems ALTER COLUMN space_complexity TYPE TEXT;');
    console.log('─'.repeat(80));
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  fixVarcharColumns();
}