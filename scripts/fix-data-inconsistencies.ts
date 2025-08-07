#!/usr/bin/env tsx

import { config } from 'dotenv';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { SupabaseService } from '../src/services/supabase.js';
import { MarkdownParser } from '../src/utils/parser.js';

config();

interface ProblemDataIssue {
  problemNumber: number;
  issues: string[];
  hasKoreanReadme: boolean;
  hasEnglishReadme: boolean;
  koreanReadmeData?: any;
  englishReadmeData?: any;
}

class DataConsistencyFixer {
  private supabase: SupabaseService;

  constructor() {
    this.supabase = new SupabaseService();
  }

  /**
   * 특정 문제들의 데이터 일관성 문제 수정
   */
  async fixSpecificProblems(problemNumbers: number[]): Promise<void> {
    console.log(`🔍 ${problemNumbers.length}개 문제의 데이터 일관성 검사 시작...`);

    for (const problemNumber of problemNumbers) {
      console.log(`\n📋 문제 ${problemNumber} 검사 중...`);
      
      try {
        const issue = await this.analyzeIndividualProblem(problemNumber);
        if (issue.issues.length > 0) {
          console.log(`❌ 문제 발견: ${issue.issues.join(', ')}`);
          await this.fixIndividualProblem(issue);
        } else {
          console.log(`✅ 문제 ${problemNumber}: 데이터 일관성 정상`);
        }
      } catch (error) {
        console.error(`❌ 문제 ${problemNumber} 처리 실패:`, error);
      }
    }
  }

  /**
   * 개별 문제 분석
   */
  private async analyzeIndividualProblem(problemNumber: number): Promise<ProblemDataIssue> {
    const issue: ProblemDataIssue = {
      problemNumber,
      issues: [],
      hasKoreanReadme: false,
      hasEnglishReadme: false
    };

    // 1. 데이터베이스에서 현재 데이터 조회
    const dbRecord = await this.supabase.checkExistingProblem(problemNumber);
    if (!dbRecord) {
      issue.issues.push('데이터베이스에 레코드 없음');
      return issue;
    }

    // 2. README 파일들 확인
    const problemDir = this.findProblemDirectory(problemNumber);
    if (!problemDir) {
      issue.issues.push('문제 디렉토리 없음');
      return issue;
    }

    const koreanReadmePath = join(problemDir, 'README.md');
    const englishReadmePath = join(problemDir, 'README.en.md');

    issue.hasKoreanReadme = existsSync(koreanReadmePath);
    issue.hasEnglishReadme = existsSync(englishReadmePath);

    // 3. README 파일에서 데이터 추출
    if (issue.hasKoreanReadme) {
      try {
        const koreanContent = readFileSync(koreanReadmePath, 'utf-8');
        issue.koreanReadmeData = this.extractReadmeData(koreanContent, 'korean');
      } catch (error) {
        console.error(`한국어 README 읽기 실패 (${problemNumber}):`, error);
      }
    }

    if (issue.hasEnglishReadme) {
      try {
        const englishContent = readFileSync(englishReadmePath, 'utf-8');
        issue.englishReadmeData = this.extractReadmeData(englishContent, 'english');
      } catch (error) {
        console.error(`영어 README 읽기 실패 (${problemNumber}):`, error);
      }
    }

    // 4. 데이터 일관성 검사
    this.checkDataConsistency(dbRecord, issue);

    return issue;
  }

  /**
   * README에서 데이터 추출
   */
  private extractReadmeData(content: string, language: 'korean' | 'english'): any {
    const data: any = {};

    // 제목 추출 (HTML과 마크다운 형식 모두 지원)
    let titleMatch = content.match(/^##\s*\[(\d+\.\s*[^\]]+)\]/m);
    if (!titleMatch) {
      // HTML 형식: <h2><a href="...">title</a></h2>
      titleMatch = content.match(/<h2><a[^>]*>(\d+\.\s*[^<]+)<\/a><\/h2>/);
    }
    data.title = titleMatch ? titleMatch[1].trim() : null;

    // 난이도 추출 (HTML과 마크다운 형식 모두 지원)
    let difficultyMatch = content.match(/^###\s*(쉬움|중간|어려움|Easy|Medium|Hard)/m);
    if (!difficultyMatch) {
      // HTML 형식: <h3>쉬움</h3>
      difficultyMatch = content.match(/<h3>(쉬움|중간|어려움|Easy|Medium|Hard)<\/h3>/);
    }
    data.difficulty = difficultyMatch ? difficultyMatch[1] : null;

    // 설명 추출 (HTML 태그 정리 포함)
    let description = '';
    if (content.includes('<p>')) {
      // HTML 형식 파싱
      description = this.extractHtmlDescription(content);
    } else {
      // 마크다운 형식 파싱
      description = MarkdownParser.extractDescription(content);
    }
    data.description = description || null;

    // 제약조건 추출 (HTML과 마크다운 형식 모두 지원)
    let constraints: string[] = [];
    if (content.includes('<ul>')) {
      // HTML 형식의 제약조건 (이 문제는 제약조건이 없을 수 있음)
      constraints = this.extractHtmlConstraints(content);
    } else {
      constraints = MarkdownParser.extractConstraints(content);
    }
    data.constraints = constraints.length > 0 ? constraints : null;

    // 예제 추출 (HTML과 마크다운 형식 모두 지원)
    let examples: any[] = [];
    if (content.includes('<strong class="예제">') || content.includes('<strong>Example')) {
      // HTML 형식의 예제
      examples = this.extractHtmlExamples(content);
    } else {
      examples = MarkdownParser.extractExamples(content);
    }
    data.examples = examples.length > 0 ? examples : null;

    return data;
  }

  /**
   * HTML 형식의 설명 추출
   */
  private extractHtmlDescription(content: string): string {
    // <h3> 태그 이후부터 예제 이전까지 추출
    const descriptionMatch = content.match(/<h3>[^<]*<\/h3><hr>([^]*?)(?=<p><strong|$)/s);
    if (!descriptionMatch) return '';

    let description = descriptionMatch[1]
      .replace(/<[^>]*>/g, '') // HTML 태그 제거
      .replace(/&nbsp;/g, ' ') // &nbsp; 공백으로 변환
      .replace(/&lt;/g, '<')   // HTML 엔티티 변환
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .trim();

    return description;
  }

  /**
   * HTML 형식의 제약조건 추출
   */
  private extractHtmlConstraints(content: string): string[] {
    const constraints: string[] = [];
    
    // "제약 사항:" 또는 "Constraints:" 이후의 <ul> 태그 찾기
    const constraintsMatch = content.match(/(?:제약\s*사항|Constraints).*?<ul>(.*?)<\/ul>/s);
    if (constraintsMatch) {
      const listItems = constraintsMatch[1].match(/<li>(.*?)<\/li>/gs);
      if (listItems) {
        listItems.forEach(item => {
          const cleanItem = item
            .replace(/<[^>]*>/g, '')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .trim();
          if (cleanItem) {
            constraints.push(cleanItem);
          }
        });
      }
    }

    return constraints;
  }

  /**
   * HTML 형식의 예제 추출
   */
  private extractHtmlExamples(content: string): any[] {
    const examples: any[] = [];
    
    // 예제 패턴: <strong class="예제">예제 1:</strong> 또는 <strong>Example 1:</strong>
    const exampleRegex = /<strong[^>]*>(?:예제|Example)\s*(\d+):<\/strong>[\s\S]*?<pre>(.*?)<\/pre>/gs;
    
    let match;
    while ((match = exampleRegex.exec(content)) !== null) {
      const exampleContent = match[2];
      
      // 입력/출력/설명 파싱
      const inputMatch = exampleContent.match(/<strong>(?:입력|Input):<\/strong>\s*([^\n<]*)/);
      const outputMatch = exampleContent.match(/<strong>(?:출력|Output):<\/strong>\s*([^\n<]*)/);
      const explanationMatch = exampleContent.match(/<strong>(?:설명|Explanation):<\/strong>\s*([^\n<]*)/);
      
      const example: any = {};
      if (inputMatch) {
        example.input = inputMatch[1].trim().replace(/&gt;/g, '>').replace(/&lt;/g, '<');
      }
      if (outputMatch) {
        example.output = outputMatch[1].trim();
      }
      if (explanationMatch) {
        example.explanation = explanationMatch[1].trim();
      }
      
      if (example.input || example.output) {
        examples.push(example);
      }
    }
    
    return examples;
  }

  /**
   * 데이터 일관성 검사
   */
  private checkDataConsistency(dbRecord: any, issue: ProblemDataIssue): void {
    // 제목 검사
    if (!dbRecord.title || !dbRecord.title_korean) {
      if (issue.englishReadmeData?.title || issue.koreanReadmeData?.title) {
        issue.issues.push('title/title_korean 누락 (README에 데이터 존재)');
      } else {
        issue.issues.push('title/title_korean 누락');
      }
    }

    // 설명 검사
    if (!dbRecord.description_english || !dbRecord.description_korean) {
      if (issue.englishReadmeData?.description || issue.koreanReadmeData?.description) {
        issue.issues.push('description 누락 (README에 데이터 존재)');
      } else {
        issue.issues.push('description 누락');
      }
    }

    // 제약조건 검사
    if (!dbRecord.constraints_english || dbRecord.constraints_english.length === 0 ||
        !dbRecord.constraints_korean || dbRecord.constraints_korean.length === 0) {
      if (issue.englishReadmeData?.constraints || issue.koreanReadmeData?.constraints) {
        issue.issues.push('constraints 누락 (README에 데이터 존재)');
      } else {
        issue.issues.push('constraints 누락');
      }
    }

    // 예제 검사
    if (!dbRecord.examples || dbRecord.examples.length === 0) {
      if (issue.englishReadmeData?.examples || issue.koreanReadmeData?.examples) {
        issue.issues.push('examples 누락 (README에 데이터 존재)');
      } else {
        issue.issues.push('examples 누락');
      }
    }
  }

  /**
   * 개별 문제 수정
   */
  private async fixIndividualProblem(issue: ProblemDataIssue): Promise<void> {
    console.log(`🔧 문제 ${issue.problemNumber} 수정 중...`);

    const updateData: any = {};
    let hasUpdates = false;

    // 제목 수정
    if (issue.issues.some(i => i.includes('title'))) {
      if (issue.englishReadmeData?.title) {
        updateData.title = issue.englishReadmeData.title;
        hasUpdates = true;
        console.log(`  📝 영어 제목 추가: ${issue.englishReadmeData.title}`);
      }
      if (issue.koreanReadmeData?.title) {
        updateData.title_korean = issue.koreanReadmeData.title;
        hasUpdates = true;
        console.log(`  📝 한국어 제목 추가: ${issue.koreanReadmeData.title}`);
      }
    }

    // 설명 수정
    if (issue.issues.some(i => i.includes('description'))) {
      if (issue.englishReadmeData?.description) {
        updateData.description_english = issue.englishReadmeData.description;
        hasUpdates = true;
        console.log(`  📝 영어 설명 추가 (${issue.englishReadmeData.description.length} chars)`);
      }
      if (issue.koreanReadmeData?.description) {
        updateData.description_korean = issue.koreanReadmeData.description;
        hasUpdates = true;
        console.log(`  📝 한국어 설명 추가 (${issue.koreanReadmeData.description.length} chars)`);
      }
    }

    // 제약조건 수정
    if (issue.issues.some(i => i.includes('constraints'))) {
      if (issue.englishReadmeData?.constraints) {
        updateData.constraints_english = issue.englishReadmeData.constraints;
        hasUpdates = true;
        console.log(`  📝 영어 제약조건 추가 (${issue.englishReadmeData.constraints.length}개)`);
      }
      if (issue.koreanReadmeData?.constraints) {
        updateData.constraints_korean = issue.koreanReadmeData.constraints;
        hasUpdates = true;
        console.log(`  📝 한국어 제약조건 추가 (${issue.koreanReadmeData.constraints.length}개)`);
      }
    }

    // 예제 수정
    if (issue.issues.some(i => i.includes('examples'))) {
      const examples = issue.koreanReadmeData?.examples || issue.englishReadmeData?.examples;
      if (examples) {
        updateData.examples = examples;
        hasUpdates = true;
        console.log(`  📝 예제 추가 (${examples.length}개)`);
      }
    }

    // 데이터베이스 업데이트
    if (hasUpdates) {
      const dbRecord = await this.supabase.checkExistingProblem(issue.problemNumber);
      if (dbRecord) {
        await this.supabase.updateProblem(dbRecord.id!, updateData);
        console.log(`✅ 문제 ${issue.problemNumber} 수정 완료`);
      } else {
        console.error(`❌ 문제 ${issue.problemNumber}: 데이터베이스 레코드를 찾을 수 없음`);
      }
    } else {
      console.log(`ℹ️ 문제 ${issue.problemNumber}: 수정할 데이터가 없음`);
    }
  }

  /**
   * 문제 디렉토리 찾기
   */
  private findProblemDirectory(problemNumber: number): string | null {
    const paddedNumber = problemNumber.toString().padStart(4, '0');
    const currentDir = process.cwd();
    
    // 패턴: 0001-two-sum, 0053-maximum-subarray 등
    const pattern = new RegExp(`^${paddedNumber}-`);
    
    try {
      const entries = readdirSync(currentDir, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.isDirectory() && pattern.test(entry.name)) {
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
   * 모든 문제의 빈 필드 검사
   */
  async analyzeEmptyFields(): Promise<void> {
    console.log('🔍 모든 문제의 빈 필드 분석 중...');

    try {
      const allProblems = await this.supabase.getAllPosts();
      
      const emptyFieldsStats = {
        title: 0,
        title_korean: 0,
        description_english: 0,
        description_korean: 0,
        constraints_english: 0,
        constraints_korean: 0,
        examples: 0
      };

      const problemsWithIssues: number[] = [];

      for (const problem of allProblems) {
        let hasIssue = false;

        if (!problem.title) {
          emptyFieldsStats.title++;
          hasIssue = true;
        }
        if (!problem.title_korean) {
          emptyFieldsStats.title_korean++;
          hasIssue = true;
        }
        if (!problem.description_english) {
          emptyFieldsStats.description_english++;
          hasIssue = true;
        }
        if (!problem.description_korean) {
          emptyFieldsStats.description_korean++;
          hasIssue = true;
        }
        if (!problem.constraints_english || problem.constraints_english.length === 0) {
          emptyFieldsStats.constraints_english++;
          hasIssue = true;
        }
        if (!problem.constraints_korean || problem.constraints_korean.length === 0) {
          emptyFieldsStats.constraints_korean++;
          hasIssue = true;
        }
        if (!problem.examples || problem.examples.length === 0) {
          emptyFieldsStats.examples++;
          hasIssue = true;
        }

        if (hasIssue) {
          problemsWithIssues.push(problem.problem_number);
        }
      }

      console.log('\n📊 빈 필드 통계:');
      console.log(`  title 누락: ${emptyFieldsStats.title}개`);
      console.log(`  title_korean 누락: ${emptyFieldsStats.title_korean}개`);
      console.log(`  description_english 누락: ${emptyFieldsStats.description_english}개`);
      console.log(`  description_korean 누락: ${emptyFieldsStats.description_korean}개`);
      console.log(`  constraints_english 누락: ${emptyFieldsStats.constraints_english}개`);
      console.log(`  constraints_korean 누락: ${emptyFieldsStats.constraints_korean}개`);
      console.log(`  examples 누락: ${emptyFieldsStats.examples}개`);
      
      console.log(`\n⚠️ 문제가 있는 총 ${problemsWithIssues.length}개 문제:`);
      console.log(problemsWithIssues.join(', '));

    } catch (error) {
      console.error('빈 필드 분석 실패:', error);
    }
  }
}

// 메인 실행 부분
async function main() {
  const args = process.argv.slice(2);
  const fixer = new DataConsistencyFixer();

  if (args.includes('--analyze-all')) {
    await fixer.analyzeEmptyFields();
  } else if (args.includes('--fix-specific')) {
    // 특정 문제들 수정
    const specificProblems = [2622, 2704];
    await fixer.fixSpecificProblems(specificProblems);
  } else if (args.includes('--fix-all-issues')) {
    // 문제가 있는 모든 문제들 수정
    const problemNumbers = [9, 13, 14, 26, 28, 69, 70, 80, 83, 88, 121, 125, 217, 242, 704, 771, 782, 1365, 1561, 1768, 1920, 2011, 2390, 2469, 2545, 2618, 2620, 2622, 2629, 2665, 2667, 2704, 2724, 2731, 2759, 2769, 3110];
    console.log(`🔄 총 ${problemNumbers.length}개 문제 일괄 수정 시작...`);
    
    // 배치 처리 (5개씩)
    for (let i = 0; i < problemNumbers.length; i += 5) {
      const batch = problemNumbers.slice(i, i + 5);
      console.log(`\n📦 배치 ${Math.floor(i/5) + 1}/${Math.ceil(problemNumbers.length/5)}: ${batch.join(', ')}`);
      await fixer.fixSpecificProblems(batch);
      
      // 배치 간 잠시 대기
      if (i + 5 < problemNumbers.length) {
        console.log('⏳ 잠시 대기 중... (2초)');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  } else {
    console.log('사용법:');
    console.log('  tsx scripts/fix-data-inconsistencies.ts --analyze-all      # 모든 문제 분석');
    console.log('  tsx scripts/fix-data-inconsistencies.ts --fix-specific     # 특정 문제들 수정');
    console.log('  tsx scripts/fix-data-inconsistencies.ts --fix-all-issues   # 모든 문제 일괄 수정');
  }
}

// 스크립트로 직접 실행된 경우에만 main 함수 호출
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { DataConsistencyFixer };