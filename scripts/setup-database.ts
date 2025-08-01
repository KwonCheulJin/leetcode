#!/usr/bin/env tsx

/**
 * Supabase 데이터베이스 설정 스크립트
 * leetcode_problems 테이블 생성 및 초기 설정
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';

class DatabaseSetup {
  private client: any;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('🚨 Supabase 환경 변수가 설정되지 않았습니다.');
    }

    this.client = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase 클라이언트 초기화 완료');
  }

  /**
   * 데이터베이스 연결 테스트
   */
  async testConnection(): Promise<boolean> {
    try {
      console.log('🔗 Supabase 연결 테스트 중...');
      
      // 간단한 SQL 쿼리로 연결 테스트 (현재 시간 조회)
      const { data, error } = await this.client.rpc('get_current_timestamp');

      // 함수가 없어도 연결은 되었다는 의미이므로 성공으로 처리
      if (error && (error.code === 'PGRST202' || error.code === '42883')) {
        console.log('✅ Supabase 연결 성공 (함수 없음은 정상)');
        return true;
      }

      if (error) {
        console.error('❌ 연결 테스트 실패:', error);
        return false;
      }

      console.log('✅ Supabase 연결 성공');
      console.log('📅 서버 시간:', data);
      return true;
    } catch (error) {
      console.error('❌ 연결 오류:', error);
      return false;
    }
  }

  /**
   * 기존 테이블 존재 여부 확인
   */
  async checkTableExists(): Promise<boolean> {
    try {
      console.log('🔍 기존 leetcode_problems 테이블 확인 중...');
      
      // 테이블에서 직접 조회해보기 (존재하지 않으면 에러 발생)
      const { data, error } = await this.client
        .from('leetcode_problems')
        .select('id')
        .limit(1);

      if (error) {
        if (error.code === '42P01') { // relation does not exist
          console.log('ℹ️  leetcode_problems 테이블이 존재하지 않습니다.');
          return false;
        } else {
          console.error('❌ 테이블 확인 실패:', error);
          return false;
        }
      }

      console.log('⚠️  leetcode_problems 테이블이 이미 존재합니다.');
      return true;
    } catch (error) {
      console.error('❌ 테이블 확인 오류:', error);
      return false;
    }
  }

  /**
   * SQL 스키마 파일 실행
   */
  async executeSchema(): Promise<boolean> {
    try {
      console.log('📄 SQL 스키마 파일 로드 중...');
      
      const schemaPath = join(process.cwd(), 'docs', 'leetcode-problems-schema.sql');
      const sqlSchema = readFileSync(schemaPath, 'utf-8');
      
      console.log('🚀 데이터베이스 스키마 실행 중...');
      
      // SQL을 개별 문장으로 분리하여 실행
      const statements = sqlSchema
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

      for (const statement of statements) {
        try {
          console.log(`📝 실행 중: ${statement.substring(0, 50)}...`);
          
          const { error } = await this.client.rpc('exec_sql', {
            sql: statement
          });

          if (error && !error.message.includes('already exists')) {
            console.error(`❌ SQL 실행 실패: ${statement.substring(0, 100)}...`);
            console.error('오류:', error);
            return false;
          }
        } catch (error) {
          console.error(`❌ 문장 실행 오류: ${statement.substring(0, 100)}...`);
          console.error('오류:', error);
        }
      }

      console.log('✅ 데이터베이스 스키마 실행 완료');
      return true;
    } catch (error) {
      console.error('❌ 스키마 실행 실패:', error);
      return false;
    }
  }

  /**
   * SQL 문 실행 (Supabase의 쿼리 빌더 대신 직접 SQL 실행)
   */
  async executeSql(sql: string): Promise<boolean> {
    try {
      const { error } = await this.client.rpc('exec_sql', { sql });
      if (error) {
        console.error(`❌ SQL 실행 실패: ${sql.substring(0, 50)}...`);
        console.error('오류:', error);
        return false;
      }
      return true;
    } catch (error) {
      console.error(`❌ SQL 실행 오류: ${sql.substring(0, 50)}...`);
      console.error('오류:', error);
      return false;
    }
  }

  /**
   * 테이블 생성 (Supabase Dashboard에서 실행할 SQL 제공)
   */
  async createTableDirect(): Promise<boolean> {
    try {
      console.log('🏗️  leetcode_problems 테이블 생성 안내');
      console.log('📋 다음 SQL을 Supabase Dashboard의 SQL Editor에서 실행해주세요:\n');

      const fullSQL = `
-- LeetCode 문제 데이터를 위한 leetcode_problems 테이블 생성
CREATE TABLE IF NOT EXISTS leetcode_problems (
  id SERIAL PRIMARY KEY,
  problem_number INTEGER NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  title_korean VARCHAR(255) NOT NULL,
  difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  tags TEXT[],
  description_english TEXT NOT NULL,
  description_korean TEXT NOT NULL,
  constraints_english TEXT[],
  constraints_korean TEXT[],
  examples JSONB,
  solution_code TEXT NOT NULL,
  solution_language VARCHAR(50) NOT NULL,
  explanation_korean TEXT,
  approach_korean TEXT,
  time_complexity VARCHAR(100),
  space_complexity VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  leetcode_url VARCHAR(500),
  github_url VARCHAR(500),
  is_premium BOOLEAN DEFAULT false,
  acceptance_rate DECIMAL(5,2),
  submission_count INTEGER DEFAULT 0
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_leetcode_problems_number ON leetcode_problems(problem_number);
CREATE INDEX IF NOT EXISTS idx_leetcode_problems_difficulty ON leetcode_problems(difficulty);
CREATE INDEX IF NOT EXISTS idx_leetcode_problems_tags ON leetcode_problems USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_leetcode_problems_created_at ON leetcode_problems(created_at);

-- RLS (Row Level Security) 정책 (호환성 수정)
ALTER TABLE leetcode_problems ENABLE ROW LEVEL SECURITY;

-- 기존 정책이 있다면 삭제 후 재생성
DROP POLICY IF EXISTS "Public read access" ON leetcode_problems;
CREATE POLICY "Public read access" ON leetcode_problems FOR SELECT USING (true);

-- 코멘트 추가
COMMENT ON TABLE leetcode_problems IS 'LeetCode 문제 데이터 저장 테이블';
COMMENT ON COLUMN leetcode_problems.problem_number IS 'LeetCode 문제 번호';
COMMENT ON COLUMN leetcode_problems.title IS '영어 원제';
COMMENT ON COLUMN leetcode_problems.title_korean IS '한국어 번역 제목';
COMMENT ON COLUMN leetcode_problems.difficulty IS '문제 난이도 (Easy, Medium, Hard)';
COMMENT ON COLUMN leetcode_problems.tags IS '문제 태그 배열';
COMMENT ON COLUMN leetcode_problems.description_english IS '영어 문제 설명';
COMMENT ON COLUMN leetcode_problems.description_korean IS '한국어 번역 문제 설명';
COMMENT ON COLUMN leetcode_problems.constraints_english IS '영어 제약조건 배열';
COMMENT ON COLUMN leetcode_problems.constraints_korean IS '한국어 번역 제약조건 배열';
COMMENT ON COLUMN leetcode_problems.examples IS '예제 데이터 (JSON)';
COMMENT ON COLUMN leetcode_problems.solution_code IS '해결 코드';
COMMENT ON COLUMN leetcode_problems.solution_language IS '프로그래밍 언어 (typescript, javascript)';
COMMENT ON COLUMN leetcode_problems.explanation_korean IS '한국어 코드 해설';
COMMENT ON COLUMN leetcode_problems.approach_korean IS '한국어 접근 방식 설명';
COMMENT ON COLUMN leetcode_problems.time_complexity IS '시간 복잡도';
COMMENT ON COLUMN leetcode_problems.space_complexity IS '공간 복잡도';
COMMENT ON COLUMN leetcode_problems.slug IS 'URL 슬래그 (SEO 친화적)';
COMMENT ON COLUMN leetcode_problems.leetcode_url IS 'LeetCode 문제 URL';
COMMENT ON COLUMN leetcode_problems.github_url IS 'GitHub 소스코드 URL';
COMMENT ON COLUMN leetcode_problems.is_premium IS '프리미엄 문제 여부';
COMMENT ON COLUMN leetcode_problems.acceptance_rate IS '문제 정답률';
COMMENT ON COLUMN leetcode_problems.submission_count IS '제출 횟수';
      `;

      console.log('─'.repeat(80));
      console.log(fullSQL);
      console.log('─'.repeat(80));
      
      console.log('\n🌐 Supabase Dashboard 접속 방법:');
      console.log(`1. https://supabase.com/dashboard 접속`);
      console.log(`2. 프로젝트 선택`);
      console.log(`3. 좌측 메뉴에서 "SQL Editor" 클릭`);
      console.log(`4. 위의 SQL 코드를 복사하여 붙여넣기`);
      console.log(`5. "Run" 버튼 클릭하여 실행`);
      
      console.log('\n⚠️  수동으로 테이블을 생성한 후 npm run db:info 로 확인해주세요.');
      
      return true;
    } catch (error) {
      console.error('❌ 테이블 생성 안내 실패:', error);
      return false;
    }
  }

  /**
   * 테이블 정보 조회
   */
  async getTableInfo(): Promise<void> {
    try {
      console.log('📊 테이블 정보 조회 중...');

      // 먼저 테이블 존재 여부 확인
      const tableExists = await this.checkTableExists();
      
      if (!tableExists) {
        console.log('❌ leetcode_problems 테이블이 존재하지 않습니다.');
        console.log('💡 npm run db:setup 명령으로 테이블을 생성해주세요.');
        return;
      }

      // 테이블 행 수 확인
      const { count, error: countError } = await this.client
        .from('leetcode_problems')
        .select('*', { count: 'exact', head: true });

      if (countError) {
        console.error('❌ 테이블 정보 조회 실패:', countError);
        return;
      }

      console.log('\n📋 leetcode_problems 테이블 정보:');
      console.log('═'.repeat(50));
      console.log(`📈 총 레코드 수: ${count || 0}개`);
      console.log(`🗄️  테이블 상태: 정상`);
      
      if (count && count > 0) {
        // 샘플 데이터 조회
        const { data: sample, error: sampleError } = await this.client
          .from('leetcode_problems')
          .select('problem_number, title_korean, difficulty, created_at')
          .order('created_at', { ascending: false })
          .limit(5);

        if (!sampleError && sample && sample.length > 0) {
          console.log('\n📝 최근 데이터 (최신 5개):');
          console.log('─'.repeat(70));
          console.log('번호'.padEnd(6) + '제목'.padEnd(30) + '난이도'.padEnd(10) + '생성일');
          console.log('─'.repeat(70));
          
          sample.forEach((row: any) => {
            const date = new Date(row.created_at).toLocaleDateString('ko-KR');
            console.log(
              row.problem_number.toString().padEnd(6) +
              (row.title_korean || '').substring(0, 28).padEnd(30) +
              row.difficulty.padEnd(10) +
              date
            );
          });
        }

        // 난이도별 통계
        const { data: stats, error: statsError } = await this.client
          .from('leetcode_problems')
          .select('difficulty')
          .order('difficulty');

        if (!statsError && stats) {
          const difficultyCount: { [key: string]: number } = {};
          stats.forEach((row: any) => {
            difficultyCount[row.difficulty] = (difficultyCount[row.difficulty] || 0) + 1;
          });

          console.log('\n📊 난이도별 통계:');
          console.log('─'.repeat(30));
          Object.entries(difficultyCount).forEach(([difficulty, count]) => {
            console.log(`${difficulty.padEnd(10)}: ${count}개`);
          });
        }
      } else {
        console.log('\n💡 테이블이 비어있습니다. 데이터를 추가해보세요:');
        console.log('   npm run data:process -- --problem=53');
      }

      console.log('\n✅ 테이블 정보 조회 완료');

    } catch (error) {
      console.error('❌ 테이블 정보 조회 오류:', error);
    }
  }

  /**
   * 전체 설정 프로세스 실행
   */
  async setupDatabase(): Promise<void> {
    console.log('🚀 Supabase 데이터베이스 설정 시작\n');

    try {
      // 1. 연결 테스트
      const connectionOk = await this.testConnection();
      if (!connectionOk) {
        throw new Error('데이터베이스 연결 실패');
      }

      // 2. 기존 테이블 확인
      const tableExists = await this.checkTableExists();
      
      // 3. 테이블 생성 (존재하지 않는 경우)
      if (!tableExists) {
        const created = await this.createTableDirect();
        if (!created) {
          throw new Error('테이블 생성 실패');
        }
      }

      // 4. 테이블 정보 출력
      await this.getTableInfo();

      console.log('\n🎉 데이터베이스 설정 완료!');
      console.log('💡 이제 npm run data:process 명령으로 데이터를 처리할 수 있습니다.');

    } catch (error) {
      console.error('\n❌ 데이터베이스 설정 실패:', error);
      process.exit(1);
    }
  }
}

// 스크립트 실행
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'setup';

  try {
    const setup = new DatabaseSetup();

    switch (command) {
      case 'test':
        await setup.testConnection();
        break;
      case 'info':
        await setup.getTableInfo();
        break;
      case 'setup':
      default:
        await setup.setupDatabase();
        break;
    }
  } catch (error) {
    console.error('❌ 스크립트 실행 실패:', error);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { DatabaseSetup };