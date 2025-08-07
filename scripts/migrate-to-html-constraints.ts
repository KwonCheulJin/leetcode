#!/usr/bin/env tsx

import { config } from 'dotenv';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { createClient } from '@supabase/supabase-js';

config();

/**
 * HTML 제약조건으로 마이그레이션 스크립트
 * 모든 LeetCode 문제의 제약조건을 HTML 형태로 변환하여 저장
 */
class HtmlConstraintsMigrator {
  private client;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    this.client = createClient(supabaseUrl, supabaseKey);
  }

  /**
   * 제약조건이 있는 모든 문제 조회
   */
  async getAllProblemsWithConstraints(): Promise<any[]> {
    const { data, error } = await this.client
      .from('leetcode_problems')
      .select('id, problem_number, constraints_korean, constraints_english')
      .or('constraints_korean.not.is.null,constraints_english.not.is.null');

    if (error) {
      console.error('문제 조회 실패:', error);
      return [];
    }

    return data || [];
  }

  /**
   * HTML 제약조건 추출 (기존 로직 재사용)
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
      .replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      .replace(/&#x2F;/g, '/')
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
      return null;
    }
  }

  /**
   * 전체 마이그레이션 실행
   */
  async migrateAllToHtml(): Promise<void> {
    console.log('🚀 HTML 제약조건 마이그레이션 시작...');

    // 제약조건이 있는 모든 문제 조회
    const problems = await this.getAllProblemsWithConstraints();
    console.log(`📊 총 ${problems.length}개 문제에 제약조건 발견`);

    let processedCount = 0;
    let successCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (const problem of problems) {
      processedCount++;
      console.log(`\n[${processedCount}/${problems.length}] 문제 ${problem.problem_number} 처리 중...`);

      try {
        // 이미 HTML 형태인지 확인
        const hasHtmlTags = (constraints: string[]) => {
          return constraints && constraints.some(c => 
            c.includes('<') && c.includes('>') && (
              c.includes('<code>') || 
              c.includes('<sup>') || 
              c.includes('<sub>')
            )
          );
        };

        const alreadyHtml = hasHtmlTags(problem.constraints_korean) || hasHtmlTags(problem.constraints_english);
        
        if (alreadyHtml) {
          console.log(`  ✅ 이미 HTML 형태로 저장됨`);
          skippedCount++;
          continue;
        }

        // README 파일에서 HTML 제약조건 추출
        const problemDir = this.findProblemDirectory(problem.problem_number);
        if (!problemDir) {
          console.log(`  ❌ 문제 디렉토리를 찾을 수 없음`);
          errorCount++;
          continue;
        }

        const koreanReadmePath = join(problemDir, 'README.md');
        const englishReadmePath = join(problemDir, 'README.en.md');

        let htmlConstraints = { korean: [] as string[], english: [] as string[] };
        let hasNewConstraints = false;

        // 한국어 README 처리
        if (existsSync(koreanReadmePath)) {
          const content = readFileSync(koreanReadmePath, 'utf-8');
          const extracted = this.extractHtmlConstraints(content);
          if (extracted.korean.length > 0) {
            htmlConstraints.korean = extracted.korean;
            hasNewConstraints = true;
            console.log(`  📝 한국어 HTML 제약조건: ${extracted.korean.length}개`);
          }
        }

        // 영어 README 처리
        if (existsSync(englishReadmePath)) {
          const content = readFileSync(englishReadmePath, 'utf-8');
          const extracted = this.extractHtmlConstraints(content);
          if (extracted.english.length > 0) {
            htmlConstraints.english = extracted.english;
            hasNewConstraints = true;
            console.log(`  📝 영어 HTML 제약조건: ${extracted.english.length}개`);
          }
        }

        // 데이터베이스 업데이트
        if (hasNewConstraints) {
          const updateData: any = { updated_at: new Date().toISOString() };
          
          if (htmlConstraints.korean.length > 0) {
            updateData.constraints_korean = htmlConstraints.korean;
          }
          if (htmlConstraints.english.length > 0) {
            updateData.constraints_english = htmlConstraints.english;
          }

          const { error } = await this.client
            .from('leetcode_problems')
            .update(updateData)
            .eq('id', problem.id);

          if (error) {
            console.error(`  ❌ 업데이트 실패:`, error.message);
            errorCount++;
          } else {
            console.log(`  ✅ HTML 제약조건 적용 완료`);
            successCount++;
          }
        } else {
          console.log(`  ℹ️ HTML 제약조건을 찾을 수 없음 (제약조건 없는 문제)`);
          skippedCount++;
        }

      } catch (error) {
        console.error(`  ❌ 처리 실패:`, error);
        errorCount++;
      }

      // 배치 간 잠시 대기
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // 최종 결과 출력
    console.log('\n🎉 HTML 제약조건 마이그레이션 완료!');
    console.log('📊 결과 요약:');
    console.log(`  처리된 문제: ${processedCount}개`);
    console.log(`  성공: ${successCount}개`);
    console.log(`  이미 HTML 형태: ${skippedCount}개`);
    console.log(`  오류: ${errorCount}개`);

    // 샘플 결과 보기
    if (successCount > 0) {
      console.log('\n🔍 샘플 결과 확인:');
      const { data: sample } = await this.client
        .from('leetcode_problems')
        .select('problem_number, constraints_korean')
        .not('constraints_korean', 'is', null)
        .limit(1)
        .single();

      if (sample) {
        console.log(`문제 ${sample.problem_number}:`, sample.constraints_korean);
      }
    }
  }

  /**
   * HTML 제약조건 통계
   */
  async getHtmlConstraintsStats(): Promise<void> {
    console.log('📊 HTML 제약조건 통계 분석 중...');

    const { data: allProblems } = await this.client
      .from('leetcode_problems')
      .select('problem_number, constraints_korean, constraints_english');

    if (!allProblems) return;

    let htmlCount = 0;
    let markdownCount = 0;
    let emptyCount = 0;

    for (const problem of allProblems) {
      const hasKorean = problem.constraints_korean && problem.constraints_korean.length > 0;
      const hasEnglish = problem.constraints_english && problem.constraints_english.length > 0;

      if (!hasKorean && !hasEnglish) {
        emptyCount++;
        continue;
      }

      const constraints = [...(problem.constraints_korean || []), ...(problem.constraints_english || [])];
      const hasHtml = constraints.some(c => c.includes('<') && c.includes('>'));

      if (hasHtml) {
        htmlCount++;
      } else {
        markdownCount++;
      }
    }

    console.log('\n📈 제약조건 형태 통계:');
    console.log(`  HTML 형태: ${htmlCount}개`);
    console.log(`  Markdown 형태: ${markdownCount}개`);
    console.log(`  제약조건 없음: ${emptyCount}개`);
    console.log(`  전체 문제: ${allProblems.length}개`);
    
    const htmlPercentage = ((htmlCount / (htmlCount + markdownCount)) * 100).toFixed(1);
    console.log(`\n🎯 HTML 변환율: ${htmlPercentage}%`);
  }
}

// 메인 실행
async function main() {
  const args = process.argv.slice(2);
  const migrator = new HtmlConstraintsMigrator();

  if (args.includes('--stats')) {
    await migrator.getHtmlConstraintsStats();
  } else if (args.includes('--migrate')) {
    await migrator.migrateAllToHtml();
  } else {
    console.log('🎯 HTML 제약조건 마이그레이션 도구');
    console.log('사용법:');
    console.log('  --stats    # HTML 제약조건 통계 확인');
    console.log('  --migrate  # 모든 문제를 HTML 제약조건으로 마이그레이션');
    console.log('\n💡 추천 순서:');
    console.log('  1. npm run migrate:html -- --stats     # 현재 상태 확인');
    console.log('  2. npm run migrate:html -- --migrate   # 마이그레이션 실행');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}