#!/usr/bin/env tsx

import { config } from 'dotenv';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { createClient } from '@supabase/supabase-js';

config();

class HtmlConstraintsProcessor {
  private client;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    this.client = createClient(supabaseUrl, supabaseKey);
  }

  /**
   * HTML 제약조건 추출 (원본 HTML 태그 보존)
   */
  extractHtmlConstraints(content: string): { korean: string[], english: string[] } {
    const constraints = { korean: [] as string[], english: [] as string[] };

    // 한국어 제약조건 패턴들
    const koreanPatterns = [
      /<p><strong>제약\s*조건:<\/strong><\/p>[\s\S]*?<ul>(.*?)<\/ul>/s,
      /<strong>제약\s*조건:<\/strong>[\s\S]*?<ul>(.*?)<\/ul>/s,
      /제약\s*조건:[\s\S]*?<ul>(.*?)<\/ul>/s
    ];

    // 영어 제약조건 패턴들  
    const englishPatterns = [
      /<p><strong>Constraints:<\/strong><\/p>[\s\S]*?<ul>(.*?)<\/ul>/s,
      /<strong>Constraints:<\/strong>[\s\S]*?<ul>(.*?)<\/ul>/s,
      /Constraints:[\s\S]*?<ul>(.*?)<\/ul>/s
    ];

    // 한국어 제약조건 추출
    for (const pattern of koreanPatterns) {
      const match = content.match(pattern);
      if (match) {
        const listItems = match[1].match(/<li>(.*?)<\/li>/gs);
        if (listItems) {
          listItems.forEach(item => {
            let constraint = item
              .replace(/<li>/, '')
              .replace(/<\/li>/, '')
              .trim();
            
            // HTML 엔티티만 디코딩하고 태그는 보존
            constraint = this.decodeHtmlEntitiesOnly(constraint);
            
            if (constraint) {
              constraints.korean.push(constraint);
            }
          });
        }
        break;
      }
    }

    // 영어 제약조건 추출
    for (const pattern of englishPatterns) {
      const match = content.match(pattern);
      if (match) {
        const listItems = match[1].match(/<li>(.*?)<\/li>/gs);
        if (listItems) {
          listItems.forEach(item => {
            let constraint = item
              .replace(/<li>/, '')
              .replace(/<\/li>/, '')
              .trim();
            
            // HTML 엔티티만 디코딩하고 태그는 보존
            constraint = this.decodeHtmlEntitiesOnly(constraint);
            
            if (constraint) {
              constraints.english.push(constraint);
            }
          });
        }
        break;
      }
    }

    return constraints;
  }

  /**
   * HTML 엔티티만 디코딩 (태그는 보존)
   */
  decodeHtmlEntitiesOnly(text: string): string {
    return text
      .replace(/&nbsp;/g, ' ')     // 공백
      .replace(/&lt;/g, '<')      // <
      .replace(/&gt;/g, '>')      // >
      .replace(/&amp;/g, '&')     // &
      .replace(/&quot;/g, '"')    // "
      .replace(/&#x27;/g, "'")    // '
      .replace(/&#x2F;/g, '/')    // /
      .trim();
  }

  /**
   * 문제 번호로 디렉토리 찾기
   */
  findProblemDirectory(problemNumber: number): string | null {
    const paddedNumber = problemNumber.toString().padStart(4, '0');
    const currentDir = process.cwd();
    
    try {
      const entries = readdirSync(currentDir, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.isDirectory() && entry.name.startsWith(`${paddedNumber}-`)) {
          return join(currentDir, entry.name);
        }
      }
      
      return null;
    } catch (error) {
      console.error(`디렉토리 검색 실패 (${problemNumber}):`, error);
      return null;
    }
  }

  /**
   * 특정 문제의 HTML 제약조건 추출 및 저장
   */
  async processHtmlConstraintsById(id: number): Promise<boolean> {
    try {
      // 현재 데이터 조회
      const { data: currentData, error } = await this.client
        .from('leetcode_problems')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !currentData) {
        console.error(`❌ ID ${id}: 데이터 조회 실패`);
        return false;
      }

      const problemNumber = currentData.problem_number;
      console.log(`🔧 ID ${id} (문제 ${problemNumber}) HTML 제약조건 처리 중...`);

      // README 파일들 찾기
      const problemDir = this.findProblemDirectory(problemNumber);
      if (!problemDir) {
        console.error(`❌ ID ${id}: 문제 디렉토리를 찾을 수 없음`);
        return false;
      }

      const koreanReadmePath = join(problemDir, 'README.md');
      const englishReadmePath = join(problemDir, 'README.en.md');

      let koreanConstraints: string[] = [];
      let englishConstraints: string[] = [];

      // 한국어 README에서 HTML 제약조건 추출
      if (existsSync(koreanReadmePath)) {
        try {
          const koreanContent = readFileSync(koreanReadmePath, 'utf-8');
          const extracted = this.extractHtmlConstraints(koreanContent);
          koreanConstraints = extracted.korean;
          console.log(`  ✅ 한국어 HTML 제약조건 추출: ${koreanConstraints.length}개`);
          if (koreanConstraints.length > 0) {
            console.log(`      예시: ${koreanConstraints[0]}`);
          }
        } catch (error) {
          console.error(`  ❌ 한국어 README 파싱 실패:`, error);
        }
      }

      // 영어 README에서 HTML 제약조건 추출
      if (existsSync(englishReadmePath)) {
        try {
          const englishContent = readFileSync(englishReadmePath, 'utf-8');
          const extracted = this.extractHtmlConstraints(englishContent);
          englishConstraints = extracted.english;
          console.log(`  ✅ 영어 HTML 제약조건 추출: ${englishConstraints.length}개`);
          if (englishConstraints.length > 0) {
            console.log(`      예시: ${englishConstraints[0]}`);
          }
        } catch (error) {
          console.error(`  ❌ 영어 README 파싱 실패:`, error);
        }
      }

      // 업데이트할 데이터 준비
      const updateData: any = {};
      let hasUpdates = false;

      if (koreanConstraints.length > 0) {
        updateData.constraints_korean = koreanConstraints;
        hasUpdates = true;
        console.log(`  📝 한국어 HTML 제약조건 업데이트 예정`);
      }

      if (englishConstraints.length > 0) {
        updateData.constraints_english = englishConstraints;
        hasUpdates = true;
        console.log(`  📝 영어 HTML 제약조건 업데이트 예정`);
      }

      // 데이터베이스 업데이트
      if (hasUpdates) {
        updateData.updated_at = new Date().toISOString();
        
        const { error: updateError } = await this.client
          .from('leetcode_problems')
          .update(updateData)
          .eq('id', id);

        if (updateError) {
          console.error(`❌ ID ${id}: 업데이트 실패`, updateError);
          return false;
        }

        console.log(`✅ ID ${id}: HTML 제약조건 업데이트 완료`);
        return true;
      } else {
        console.log(`ℹ️ ID ${id}: HTML 제약조건이 없는 문제`);
        return true;
      }

    } catch (error) {
      console.error(`❌ ID ${id}: 처리 실패`, error);
      return false;
    }
  }

  /**
   * 여러 ID의 HTML 제약조건 일괄 처리
   */
  async processMultipleHtmlConstraints(ids: number[]): Promise<void> {
    console.log(`🔧 ${ids.length}개 ID의 HTML 제약조건 처리 시작...`);
    
    let successCount = 0;
    let failCount = 0;

    for (const id of ids) {
      const success = await this.processHtmlConstraintsById(id);
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
      
      // 각 요청 사이에 짧은 지연
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`\n📊 HTML 제약조건 처리 결과:`);
    console.log(`  성공: ${successCount}개`);
    console.log(`  실패: ${failCount}개`);
  }

  /**
   * HTML vs Markdown 비교 테스트
   */
  async compareFormats(problemNumber: number): Promise<void> {
    console.log(`🔍 문제 ${problemNumber}의 HTML vs Markdown 형태 비교:`);

    const { data, error } = await this.client
      .from('leetcode_problems')
      .select('constraints_korean, constraints_english')
      .eq('problem_number', problemNumber)
      .single();

    if (error || !data) {
      console.error(`❌ 문제 ${problemNumber} 조회 실패`);
      return;
    }

    console.log('\n📋 현재 저장된 형태 (Markdown):');
    console.log('한국어:', data.constraints_korean);
    console.log('영어:', data.constraints_english);

    // HTML 형태 추출
    const problemDir = this.findProblemDirectory(problemNumber);
    if (problemDir) {
      const readmePath = join(problemDir, 'README.md');
      if (existsSync(readmePath)) {
        const content = readFileSync(readmePath, 'utf-8');
        const htmlConstraints = this.extractHtmlConstraints(content);
        
        console.log('\n📋 HTML 형태 (제안된 방식):');
        console.log('한국어:', htmlConstraints.korean);
        console.log('영어:', htmlConstraints.english);

        console.log('\n🎨 블로그 렌더링 미리보기:');
        if (htmlConstraints.korean.length > 0) {
          console.log(`HTML: ${htmlConstraints.korean[0]}`);
          console.log('↓ 브라우저 렌더링 ↓');
          // HTML을 시각적으로 표현 (실제로는 브라우저에서 렌더링됨)
          const rendered = htmlConstraints.korean[0]
            .replace(/<code>/g, '`')
            .replace(/<\/code>/g, '`')
            .replace(/<sup>/g, '^')
            .replace(/<\/sup>/g, '^')
            .replace(/&nbsp;/g, ' ');
          console.log(`시각화: ${rendered}`);
        }
      }
    }
  }
}

// 메인 실행
async function main() {
  const args = process.argv.slice(2);
  const processor = new HtmlConstraintsProcessor();

  if (args.includes('--compare')) {
    // 문제 9번으로 비교 테스트
    await processor.compareFormats(9);
  } else if (args.includes('--process-sample')) {
    // 샘플 문제들 처리
    const sampleIds = [3]; // 문제 9번 (ID 3)
    await processor.processMultipleHtmlConstraints(sampleIds);
  } else if (args.includes('--process-all')) {
    // 제약조건이 있는 모든 문제 처리
    const allIds = [3, 11, 1]; // 예시: 문제 9, 121, 1번
    await processor.processMultipleHtmlConstraints(allIds);
  } else {
    console.log('🎯 HTML 제약조건 처리기 사용법:');
    console.log('  --compare         # HTML vs Markdown 형태 비교');
    console.log('  --process-sample  # 샘플 문제 HTML 제약조건 적용');
    console.log('  --process-all     # 모든 문제 HTML 제약조건 적용');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}