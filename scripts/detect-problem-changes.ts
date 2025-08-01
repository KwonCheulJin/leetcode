#!/usr/bin/env tsx

/**
 * GitHub Actions에서 사용되는 변경사항 감지 로직을 로컬에서 테스트하는 스크립트
 */

import { execSync } from 'child_process';

class ProblemChangeDetector {
  /**
   * Git diff를 사용해 변경된 LeetCode 문제 디렉토리 감지
   */
  detectChangedProblems(commitRange: string = 'HEAD~1 HEAD'): string[] {
    try {
      console.log(`🔍 변경사항 감지 중... (${commitRange})`);
      
      // Git diff로 변경된 파일 목록 가져오기
      const changedFiles = execSync(`git diff --name-only ${commitRange}`, { 
        encoding: 'utf-8' 
      }).trim().split('\n').filter(file => file.length > 0);

      console.log('📁 변경된 파일들:');
      changedFiles.forEach(file => console.log(`   ${file}`));

      // LeetCode 문제 디렉토리 패턴 매칭
      const problemDirs = new Set<string>();
      const problemPattern = /^([0-9]{4,5}-[^/]+)\//;

      for (const file of changedFiles) {
        const match = file.match(problemPattern);
        if (match) {
          problemDirs.add(match[1]);
        }
      }

      const detectedProblems = Array.from(problemDirs);
      
      console.log('\n🎯 감지된 LeetCode 문제 디렉토리들:');
      if (detectedProblems.length > 0) {
        detectedProblems.forEach(dir => console.log(`   ✅ ${dir}`));
      } else {
        console.log('   ❌ 감지된 문제 없음');
      }

      return detectedProblems;
    } catch (error) {
      console.error('❌ 변경사항 감지 실패:', error);
      return [];
    }
  }

  /**
   * 문제 디렉토리에서 문제 번호 추출
   */
  extractProblemNumber(problemDir: string): number | null {
    const match = problemDir.match(/^([0-9]+)/);
    if (match) {
      // 앞의 0 제거하고 숫자로 변환
      return parseInt(match[1], 10);
    }
    return null;
  }

  /**
   * 전체 테스트 실행
   */
  runTest(commitRange?: string): void {
    console.log('🚀 LeetCode 문제 변경사항 감지 테스트\n');

    const changedProblems = this.detectChangedProblems(commitRange);
    
    if (changedProblems.length === 0) {
      console.log('\n📝 결과: 처리할 LeetCode 문제가 없습니다.');
      return;
    }

    // 첫 번째 문제만 처리 (GitHub Actions와 동일한 로직)
    const firstProblem = changedProblems[0];
    const problemNumber = this.extractProblemNumber(firstProblem);

    console.log(`\n📋 처리 대상:`);
    console.log(`   📁 디렉토리: ${firstProblem}`);
    console.log(`   🔢 문제 번호: ${problemNumber}`);

    if (problemNumber) {
      console.log(`\n🎯 실행될 명령어:`);
      console.log(`   1. npm run fix:english problem ${problemNumber}`);
      console.log(`   2. npm run data:process -- --problem=${problemNumber}`);
      console.log(`   3. git add ${firstProblem}/README.en.md (if created)`);
      console.log(`   4. git commit -m "feat: Add English translation for problem ${problemNumber}"`);
    }

    if (changedProblems.length > 1) {
      console.log(`\n⚠️  주의: ${changedProblems.length}개 문제가 감지되었지만, 첫 번째 문제만 처리됩니다.`);
      console.log('   나머지 문제들:');
      changedProblems.slice(1).forEach(dir => {
        const num = this.extractProblemNumber(dir);
        console.log(`   - ${dir} (문제 ${num})`);
      });
    }
  }
}

// 스크립트 실행부
function main() {
  const args = process.argv.slice(2);
  const commitRange = args[0];

  const detector = new ProblemChangeDetector();
  detector.runTest(commitRange);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { ProblemChangeDetector };