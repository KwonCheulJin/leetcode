/**
 * LeetCode 데이터 처리 시스템 통합 테스트
 */

import { LeetCodeDataProcessor } from '../src/index.js';
import { FileProcessor } from '../src/services/fileProcessor.js';
import { Translator } from '../src/services/translator.js';
import { BlogGenerator } from '../src/services/blogGenerator.js';
import { writeFileSync, existsSync, unlinkSync } from 'fs';

class DataTestSuite {
  private processor: LeetCodeDataProcessor;
  private testResults: { [key: string]: boolean } = {};
  
  constructor() {
    this.processor = new LeetCodeDataProcessor();
  }

  /**
   * 모든 테스트 실행
   */
  async runAllTests(): Promise<void> {
    console.log('🧪 LeetCode 데이터 처리 시스템 통합 테스트 시작...\n');
    
    const tests = [
      { name: '파일 처리 서비스', method: this.testFileProcessor },
      { name: '번역 서비스', method: this.testTranslator },
      { name: '데이터 구조화 서비스', method: this.testDataStructuring },
      { name: '전체 워크플로우', method: this.testFullWorkflow },
      { name: '배치 처리', method: this.testBatchProcessing },
      { name: '에러 처리', method: this.testErrorHandling }
    ];

    for (const test of tests) {
      try {
        console.log(`🔄 ${test.name} 테스트 시작...`);
        await test.method.call(this);
        this.testResults[test.name] = true;
        console.log(`✅ ${test.name} 테스트 통과\n`);
      } catch (error) {
        this.testResults[test.name] = false;
        console.error(`❌ ${test.name} 테스트 실패:`, error);
        console.log();
      }
    }

    this.printTestSummary();
  }

  /**
   * 파일 처리 서비스 테스트
   */
  private async testFileProcessor(): Promise<void> {
    const processor = new FileProcessor();
    
    // 1. 문제 스캔 테스트
    const problems = await processor.scanAllProblems();
    if (problems.length === 0) {
      throw new Error('문제를 찾을 수 없습니다');
    }
    console.log(`   📁 ${problems.length}개 문제 발견`);

    // 2. 특정 문제 읽기 테스트
    const problemInfo = await processor.readLeetCodeProblem('0053-maximum-subarray');
    if (!problemInfo) {
      throw new Error('문제 정보를 읽을 수 없습니다');
    }
    console.log(`   📖 문제 정보 읽기 성공: ${problemInfo.title}`);

    // 3. 문제 번호로 찾기 테스트
    const foundProblem = await processor.findProblemByNumber(53);
    if (!foundProblem) {
      throw new Error('문제 번호로 찾기 실패');
    }
    console.log(`   🔍 문제 번호 검색 성공: ${foundProblem}`);
  }

  /**
   * 번역 서비스 테스트
   */
  private async testTranslator(): Promise<void> {
    const translator = new Translator();
    const processor = new FileProcessor();
    
    const problemInfo = await processor.readLeetCodeProblem('0053-maximum-subarray');
    if (!problemInfo) {
      throw new Error('테스트용 문제 정보 로드 실패');
    }

    const translationResult = await translator.translateProblem(problemInfo);
    
    if (!translationResult.titleKorean) {
      throw new Error('제목 번역 실패');
    }
    if (!translationResult.descriptionKorean) {
      throw new Error('설명 번역 실패');
    }
    if (!translationResult.explanation) {
      throw new Error('해설 생성 실패');
    }
    
    console.log(`   🌐 번역 성공: ${translationResult.titleKorean}`);
    console.log(`   💡 해설 길이: ${translationResult.explanation.length} 문자`);
    
    // 캐시 테스트
    const cacheSize = translator.getCacheSize();
    if (cacheSize === 0) {
      throw new Error('캐시 기능 작동 안함');
    }
    console.log(`   💾 캐시 크기: ${cacheSize}`);
  }

  /**
   * 데이터 구조화 서비스 테스트
   */
  private async testDataStructuring(): Promise<void> {
    const generator = new BlogGenerator();
    const processor = new FileProcessor();
    const translator = new Translator();

    const problemInfo = await processor.readLeetCodeProblem('0053-maximum-subarray');
    if (!problemInfo) {
      throw new Error('테스트용 문제 정보 로드 실패');
    }

    const translationResult = await translator.translateProblem(problemInfo);
    const structuredData = await generator.generateStructuredData(problemInfo, translationResult);

    if (!structuredData.description) {
      throw new Error('데이터 구조화 실패');
    }
    if (!structuredData.slug) {
      throw new Error('Slug 생성 실패');
    }
    if (structuredData.tags.length === 0) {
      throw new Error('태그 정보 누락');
    }

    console.log(`   📊 구조화된 데이터 크기: ${JSON.stringify(structuredData).length} 문자`);
    console.log(`   🔗 Slug: ${structuredData.slug}`);
    console.log(`   🏷️ 태그: ${structuredData.tags.join(', ')}`);

    // 파일 저장 테스트를 위한 임시 데이터 생성
    const testData = JSON.stringify(structuredData, null, 2);
    const testFilePath = `test-data-${Date.now()}.json`;
    writeFileSync(testFilePath, testData);
    
    if (!existsSync(testFilePath)) {
      throw new Error('파일 저장 실패');
    }
    
    // 테스트 파일 정리
    unlinkSync(testFilePath);
    console.log(`   💾 파일 저장/삭제 테스트 통과`);
  }

  /**
   * 전체 워크플로우 테스트
   */
  private async testFullWorkflow(): Promise<void> {
    const result = await this.processor.processSingleProblem('0053-maximum-subarray', {
      dryRun: true // 실제 DB 저장 방지
    });

    if (!result.success) {
      throw new Error(`워크플로우 실패: ${result.message}`);
    }

    console.log(`   🚀 전체 워크플로우 성공: ${result.message}`);
  }

  /**
   * 배치 처리 테스트
   */
  private async testBatchProcessing(): Promise<void> {
    const testProblems = ['0053-maximum-subarray', '0001-two-sum'];
    const availableProblems = [];

    // 사용 가능한 문제만 필터링
    for (const problem of testProblems) {
      const processor = new FileProcessor();
      if (processor.problemExists(problem)) {
        availableProblems.push(problem);
      }
    }

    if (availableProblems.length === 0) {
      throw new Error('배치 테스트용 문제를 찾을 수 없습니다');
    }

    const result = await this.processor.processBatchProblems(availableProblems, {
      dryRun: true,
      batchSize: 2
    });

    if (result.summary.failed > 0) {
      throw new Error(`배치 처리 중 ${result.summary.failed}개 실패`);
    }

    console.log(`   📦 배치 처리 성공: ${result.summary.success}/${result.summary.total}개`);
  }

  /**
   * 에러 처리 테스트
   */
  private async testErrorHandling(): Promise<void> {
    // 존재하지 않는 문제 처리
    const result = await this.processor.processSingleProblem('9999-nonexistent-problem', {
      dryRun: true
    });

    if (result.success) {
      throw new Error('존재하지 않는 문제에 대해 성공 결과 반환');
    }

    console.log(`   🚫 에러 처리 테스트 통과: ${result.message}`);
  }

  /**
   * 테스트 결과 요약 출력
   */
  private printTestSummary(): void {
    console.log('📊 테스트 결과 요약');
    console.log('═'.repeat(50));
    
    const totalTests = Object.keys(this.testResults).length;
    const passedTests = Object.values(this.testResults).filter(Boolean).length;
    const failedTests = totalTests - passedTests;

    Object.entries(this.testResults).forEach(([testName, passed]) => {
      const status = passed ? '✅' : '❌';
      console.log(`${status} ${testName}`);
    });

    console.log('═'.repeat(50));
    console.log(`📈 총 테스트: ${totalTests}개`);
    console.log(`✅ 통과: ${passedTests}개`);
    console.log(`❌ 실패: ${failedTests}개`);
    console.log(`📊 성공률: ${totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(1) : 0}%`);

    if (failedTests === 0) {
      console.log('\n🎉 모든 테스트가 통과되었습니다!');
    } else {
      console.log(`\n⚠️  ${failedTests}개 테스트가 실패했습니다.`);
    }
  }
}

// 프로그램 실행
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command === 'test' || command === undefined) {
    const testSuite = new DataTestSuite();
    await testSuite.runAllTests();
  } else {
    console.log('❌ 알 수 없는 명령어:', command);
    console.log('💡 사용법: npm run test:run');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ 테스트 실행 중 오류:', error);
    process.exit(1);
  });
}