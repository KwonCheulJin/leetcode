#!/usr/bin/env tsx

import { config } from 'dotenv';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { createClient } from '@supabase/supabase-js';

config();

class ConstraintsMathFixer {
  private client;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    this.client = createClient(supabaseUrl, supabaseKey);
  }

  /**
   * 수학 표기법을 마크다운 형식으로 변환 (개선된 버전)
   */
  convertMathNotation(text: string): string {
    return text
      // <code> 태그 내의 수학 표기법 처리
      .replace(/<code>([^<]*<sup>[^<]*<\/sup>[^<]*)<\/code>/g, (match, content) => {
        const converted = content
          .replace(/<sup>([^<]*)<\/sup>/g, '^$1^')
          .replace(/<sub>([^<]*)<\/sub>/g, '~$1~')
          .replace(/&nbsp;/g, ' ')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&');
        return `\`${converted}\``;
      })
      // 일반 수학 표기법
      .replace(/<sup>([^<]*)<\/sup>/g, '^$1^')
      .replace(/<sub>([^<]*)<\/sub>/g, '~$1~')
      // HTML 엔티티 변환
      .replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');
  }

  /**
   * 향상된 제약조건 추출
   */
  extractConstraints(content: string): { korean: string[], english: string[] } {
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
              .replace(/<\/li>/, '');
            
            // 수학 표기법 변환
            constraint = this.convertMathNotation(constraint);
            
            // 나머지 HTML 태그 제거
            constraint = constraint
              .replace(/<[^>]*>/g, '')
              .trim();
            
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
              .replace(/<\/li>/, '');
            
            // 수학 표기법 변환
            constraint = this.convertMathNotation(constraint);
            
            // 나머지 HTML 태그 제거
            constraint = constraint
              .replace(/<[^>]*>/g, '')
              .trim();
            
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
   * 특정 문제의 constraints를 다시 추출하고 업데이트
   */
  async fixConstraintsById(id: number): Promise<boolean> {
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
      console.log(`🔧 ID ${id} (문제 ${problemNumber}) constraints 재처리 중...`);

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

      // 한국어 README에서 제약조건 추출
      if (existsSync(koreanReadmePath)) {
        try {
          const koreanContent = readFileSync(koreanReadmePath, 'utf-8');
          const extracted = this.extractConstraints(koreanContent);
          koreanConstraints = extracted.korean;
          console.log(`  ✅ 한국어 제약조건 추출: ${koreanConstraints.length}개`);
        } catch (error) {
          console.error(`  ❌ 한국어 README 파싱 실패:`, error);
        }
      }

      // 영어 README에서 제약조건 추출
      if (existsSync(englishReadmePath)) {
        try {
          const englishContent = readFileSync(englishReadmePath, 'utf-8');
          const extracted = this.extractConstraints(englishContent);
          englishConstraints = extracted.english;
          console.log(`  ✅ 영어 제약조건 추출: ${englishConstraints.length}개`);
        } catch (error) {
          console.error(`  ❌ 영어 README 파싱 실패:`, error);
        }
      }

      // 업데이트할 데이터 준비
      const updateData: any = {};
      let hasUpdates = false;

      if (koreanConstraints.length > 0 && 
          (!currentData.constraints_korean || currentData.constraints_korean.length === 0)) {
        updateData.constraints_korean = koreanConstraints;
        hasUpdates = true;
        console.log(`  📝 한국어 제약조건 업데이트:`, koreanConstraints);
      }

      if (englishConstraints.length > 0 && 
          (!currentData.constraints_english || currentData.constraints_english.length === 0)) {
        updateData.constraints_english = englishConstraints;
        hasUpdates = true;
        console.log(`  📝 영어 제약조건 업데이트:`, englishConstraints);
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

        console.log(`✅ ID ${id}: constraints 업데이트 완료`);
        return true;
      } else {
        console.log(`ℹ️ ID ${id}: constraints 업데이트 필요 없음`);
        return true;
      }

    } catch (error) {
      console.error(`❌ ID ${id}: 처리 실패`, error);
      return false;
    }
  }

  /**
   * 여러 ID의 constraints 일괄 수정
   */
  async fixMultipleConstraints(ids: number[]): Promise<void> {
    console.log(`🔧 ${ids.length}개 ID의 constraints 수정 시작...`);
    
    let successCount = 0;
    let failCount = 0;

    for (const id of ids) {
      const success = await this.fixConstraintsById(id);
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
      
      // 각 요청 사이에 짧은 지연
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`\n📊 constraints 수정 결과:`);
    console.log(`  성공: ${successCount}개`);
    console.log(`  실패: ${failCount}개`);
  }
}

// 메인 실행
async function main() {
  const fixer = new ConstraintsMathFixer();
  
  // constraints가 누락된 ID들
  const constraintIssueIds = [7, 15, 16, 27, 29, 34, 41, 46];
  
  console.log('🎯 constraints 및 수학 표기법 수정 시작...');
  await fixer.fixMultipleConstraints(constraintIssueIds);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { ConstraintsMathFixer };