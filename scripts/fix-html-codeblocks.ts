#!/usr/bin/env tsx

/**
 * README.en.md 파일들에서 ```html``` 코드블럭을 제거하여 
 * HTML이 정상적인 마크다운으로 렌더링되도록 수정하는 스크립트
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';

class HtmlCodeBlockFixer {
  private baseDir: string;
  private fixedCount = 0;
  private totalFiles = 0;

  constructor() {
    this.baseDir = process.cwd();
    console.log('🔧 HTML 코드블럭 수정 도구 시작');
  }

  /**
   * 모든 문제 디렉토리 스캔
   */
  scanAllProblems(): string[] {
    try {
      const items = readdirSync(this.baseDir);
      const problemDirs = items
        .filter(item => {
          const fullPath = join(this.baseDir, item);
          return statSync(fullPath).isDirectory() && /^\d+-.+/.test(item);
        })
        .sort();
      
      console.log(`📋 총 ${problemDirs.length}개 문제 디렉토리 발견`);
      return problemDirs;
    } catch (error) {
      console.error('문제 디렉토리 스캔 실패:', error);
      return [];
    }
  }

  /**
   * 남은 HTML 태그들을 마크다운으로 변환
   */
  cleanupRemainingHtml(content: string): string {
    return content
      // 가장 먼저 제목과 난이도 분리 (가장 중요) - 더 포괄적인 패턴
      .replace(/(##\s*\[[^\]]+\]\([^)]+\))###\s*([A-Z][a-z]+)(.*)/g, '$1\n\n### $2\n\n$3')
      .replace(/(##\s*\[[^\]]+\]\([^)]+\))([A-Z][a-z]+)(.*)/g, '$1\n\n### $2\n\n$3')
      // <p>태그가 남아있는 경우 제거
      .replace(/<p>([^<]*(?:<[^>]*>[^<]*<\/[^>]*>[^<]*)*[^<]*)<\/p>/g, '$1\n\n')
      // <li>태그를 리스트 아이템으로 변환
      .replace(/^\s*<li>([^<]*(?:<[^>]*>[^<]*<\/[^>]*>[^<]*)*[^<]*)<\/li>/gm, '- $1')
      // <code>태그를 백틱으로 변환
      .replace(/<code>([^<]+)<\/code>/g, '`$1`')
      // <strong>태그를 볼드로 변환
      .replace(/<strong>([^<]+)<\/strong>/g, '**$1**')
      // <em>태그를 이탤릭으로 변환
      .replace(/<em>([^<]+)<\/em>/g, '*$1*')
      // <sup>태그를 위첨자로 변환
      .replace(/<sup>([^<]+)<\/sup>/g, '^$1')
      // 남은 HTML 태그 제거
      .replace(/<\/?[^>]+>/g, '')
      // HTML 엔티티 변환
      .replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      // 탭 문자를 공백으로 변환
      .replace(/\t/g, '')
      // 예제들 정리 (Example X: 를 **Example X:** 로 변환)
      .replace(/^- \*\*Example (\d+):?\*\*/gm, '**Example $1:**')
      // 입출력 항목들 정리
      .replace(/^- \*\*Input:\*\*/gm, 'Input:')
      .replace(/^- \*\*Output:\*\*/gm, 'Output:')
      .replace(/^- \*\*Explanation:\*\*/gm, 'Explanation:')
      // 제약조건 정리
      .replace(/^- ([\d<>=\-+*`][^\n]*)/gm, '- `$1`')
      // Follow-up 정리
      .replace(/^- \*\*Follow-up:?\*\*(.*)$/gm, '**Follow-up:**$1')
      // 연속된 줄바꿈 정리 (최대 2개)
      .replace(/\n{3,}/g, '\n\n')
      // 앞뒤 공백 제거
      .trim();
  }

  /**
   * HTML 코드블럭을 일반 마크다운으로 변환
   */
  fixHtmlCodeBlock(content: string): string {
    // ```html로 시작하고 ```로 끝나는 패턴 찾기
    const htmlBlockRegex = /^```html\s*\n([\s\S]*?)\n```$/gm;
    
    let newContent = content.replace(htmlBlockRegex, (match, htmlContent) => {
      console.log('  🔍 HTML 코드블럭 발견, 변환 중...');
      
      // HTML 태그를 마크다운으로 변환
      let converted = htmlContent
        // <h2><a href="...">제목</a></h2> -> ## [제목](링크)
        .replace(/<h2><a href="([^"]+)">([^<]+)<\/a><\/h2>/g, '## [$2]($1)')
        // <h3>난이도</h3> -> ### 난이도 (줄바꿈 추가)
        .replace(/<h3>([^<]+)<\/h3>/g, '\n\n### $1\n\n')
        // <hr> 제거
        .replace(/<hr\s*\/?>/g, '')
        // <p>텍스트</p> -> 텍스트 (두 줄바꿈)
        .replace(/<p>([^<]*(?:<[^p\/][^>]*>[^<]*<\/[^>]+>[^<]*)*[^<]*)<\/p>/g, '$1\n\n')
        // <code>코드</code> -> `코드`
        .replace(/<code>([^<]+)<\/code>/g, '`$1`')
        // <strong>텍스트</strong> -> **텍스트**
        .replace(/<strong>([^<]+)<\/strong>/g, '**$1**')
        // <em>텍스트</em> -> *텍스트*
        .replace(/<em>([^<]+)<\/em>/g, '*$1*')
        // <strong class="example">Example X:</strong> -> **Example X:**
        .replace(/<strong class="example">([^<]+)<\/strong>/g, '**$1**')
        // <pre>내용</pre> -> ```\n내용\n```
        .replace(/<pre>\s*([\s\S]*?)\s*<\/pre>/g, '\n```\n$1\n```\n')
        // <ul><li>항목</li></ul> -> - 항목
        .replace(/<ul>\s*<li>([^<]+)<\/li>\s*<\/ul>/g, '- $1')
        .replace(/<ul>([\s\S]*?)<\/ul>/g, (match, listContent) => {
          const items = listContent.replace(/<li>([^<]*(?:<[^\/][^>]*>[^<]*<\/[^>]+>[^<]*)*[^<]*)<\/li>/g, '- $1');
          return '\n' + items + '\n';
        })
        // <ol><li>항목</li></ol> -> 1. 항목
        .replace(/<ol>([\s\S]*?)<\/ol>/g, (match, listContent) => {
          let counter = 1;
          const items = listContent.replace(/<li>([^<]*(?:<[^\/][^>]*>[^<]*<\/[^>]+>[^<]*)*[^<]*)<\/li>/g, () => {
            return `${counter++}. $1`;
          });
          return '\n' + items + '\n';
        })
        // 남은 HTML 태그 제거
        .replace(/<\/?[^>]+>/g, '')
        // HTML 엔티티 변환
        .replace(/&nbsp;/g, ' ')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        // 제목과 난이도 사이에 줄바꿈 추가
        .replace(/(\]\([^)]+\))([A-Z][a-z]+)/g, '$1\n\n### $2')
        // 연속된 줄바꿈 정리 (최대 2개)
        .replace(/\n{3,}/g, '\n\n')
        // 앞뒤 공백 제거
        .trim();

      return converted;
    });

    return newContent;
  }

  /**
   * 특정 문제의 README.en.md 수정
   */
  fixProblem(problemDir: string): boolean {
    const readmePath = join(this.baseDir, problemDir, 'README.en.md');
    
    try {
      if (!existsSync(readmePath)) {
        return false;
      }

      const content = readFileSync(readmePath, 'utf-8');
      this.totalFiles++;

      console.log(`🔧 수정 중: ${problemDir}`);
      
      let fixedContent = content;
      let wasModified = false;

      // HTML 코드블럭이 있는 경우 처리
      if (content.includes('```html')) {
        console.log(`  🔍 HTML 코드블럭 발견, 변환 중...`);
        fixedContent = this.fixHtmlCodeBlock(fixedContent);
        wasModified = true;
      }

      // 남은 HTML 태그들 정리
      const cleanedContent = this.cleanupRemainingHtml(fixedContent);
      if (cleanedContent !== fixedContent) {
        console.log(`  🧹 남은 HTML 태그 정리 중...`);
        fixedContent = cleanedContent;
        wasModified = true;
      }

      if (!wasModified) {
        console.log(`  ℹ️ ${problemDir}: 수정할 내용 없음`);
        return false;
      }
      
      // 변경사항 저장
      writeFileSync(readmePath, fixedContent, 'utf-8');
      this.fixedCount++;
      console.log(`  ✅ 수정 완료: ${problemDir}`);
      return true;
    } catch (error) {
      console.error(`  ❌ 수정 실패: ${problemDir}`, error);
      return false;
    }
  }

  /**
   * 모든 문제 수정 실행
   */
  async fixAllProblems(): Promise<void> {
    const problemDirs = this.scanAllProblems();
    
    if (problemDirs.length === 0) {
      console.log('❌ 처리할 문제 디렉토리가 없습니다.');
      return;
    }

    console.log(`🚀 ${problemDirs.length}개 문제 처리 시작`);
    console.log('=' .repeat(50));

    for (const problemDir of problemDirs) {
      this.fixProblem(problemDir);
    }

    console.log('=' .repeat(50));
    console.log(`🎉 처리 완료!`);
    console.log(`📊 총 파일: ${this.totalFiles}개`);
    console.log(`✅ 수정된 파일: ${this.fixedCount}개`);
    console.log(`ℹ️ 변경 없음: ${this.totalFiles - this.fixedCount}개`);
  }

  /**
   * 특정 문제만 수정
   */
  async fixSpecificProblem(problemNumber: string): Promise<void> {
    const problemDirs = this.scanAllProblems();
    const targetDir = problemDirs.find(dir => 
      dir.startsWith(problemNumber.padStart(4, '0')) || 
      dir.includes(`-${problemNumber}-`) ||
      dir.startsWith(problemNumber + '-')
    );

    if (!targetDir) {
      console.log(`❌ 문제 번호 ${problemNumber}를 찾을 수 없습니다.`);
      return;
    }

    console.log(`🎯 특정 문제 수정: ${targetDir}`);
    const result = this.fixProblem(targetDir);
    
    if (result) {
      console.log(`🎉 문제 ${problemNumber} 수정 완료`);
    } else {
      console.log(`ℹ️ 문제 ${problemNumber} 수정 불필요`);
    }
  }
}

// 스크립트 실행
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  try {
    const fixer = new HtmlCodeBlockFixer();

    switch (command) {
      case 'all': {
        await fixer.fixAllProblems();
        break;
      }
      case 'problem': {
        const problemNumber = args[1];
        if (!problemNumber) {
          console.log('❌ 문제 번호를 입력하세요: npm run fix:html problem 1');
          process.exit(1);
        }
        await fixer.fixSpecificProblem(problemNumber);
        break;
      }
      default: {
        console.log('🛠️  HTML 코드블럭 수정 도구');
        console.log();
        console.log('사용법:');
        console.log('  npm run fix:html all              모든 README.en.md 수정');
        console.log('  npm run fix:html problem 1        특정 문제만 수정');
        console.log();
        console.log('설명:');
        console.log('  README.en.md 파일의 ```html``` 코드블럭을 제거하여');
        console.log('  HTML이 정상적인 마크다운으로 렌더링되도록 수정합니다.');
      }
    }
  } catch (error) {
    console.error('❌ 스크립트 실행 실패:', error);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { HtmlCodeBlockFixer };