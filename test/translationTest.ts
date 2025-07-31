#!/usr/bin/env tsx

/**
 * 번역 시스템 테스트 스크립트 (TypeScript)
 * 메타데이터 기반 변경 감지 시스템 검증용
 */

import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';

/**
 * 테스트 환경 정보
 */
interface TestEnvironment {
  testDir: string;
  problemDir: string;
  initialContent: string;
}

/**
 * 테스트 시나리오 결과
 */
interface TestResult {
  scenario: string;
  passed: boolean;
  message: string;
  details?: string;
}

/**
 * 테스트 통계
 */
interface TestStats {
  total: number;
  passed: number;
  failed: number;
  duration: number;
}

/**
 * 테스트 환경을 생성합니다.
 */
async function createTestEnvironment(): Promise<TestEnvironment> {
  const testDir = './test-translation-env';
  const problemDir = path.join(testDir, '1-test-problem');
  
  // 테스트 디렉토리 생성
  await fs.mkdir(testDir, { recursive: true });
  await fs.mkdir(problemDir, { recursive: true });
  
  // 초기 README.md 파일 생성 (영어 원본)
  const initialContent = `# Test Problem

This is a test problem for translation system.

## Description
This problem tests the translation detection mechanism.

## Example
Input: test
Output: translated
`;

  await fs.writeFile(path.join(problemDir, 'README.md'), initialContent);
  console.log('✅ Test environment created');
  
  return { testDir, problemDir, initialContent };
}

/**
 * 파일이 존재하는지 확인합니다.
 */
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * 번역 명령어를 실행합니다.
 */
async function runTranslation(): Promise<{ success: boolean; output: string }> {
  try {
    const output = execSync('npm run translate', { 
      encoding: 'utf8',
      cwd: process.cwd(),
      timeout: 30000 // 30초 타임아웃
    });
    return { success: true, output };
  } catch (error) {
    const errorOutput = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, output: errorOutput };
  }
}

/**
 * 테스트 시나리오 1: 초기 번역
 */
async function testInitialTranslation(env: TestEnvironment): Promise<TestResult> {
  const scenario = '초기 번역 테스트';
  
  try {
    // 번역 실행
    const result = await runTranslation();
    
    if (!result.success) {
      return {
        scenario,
        passed: false,
        message: '번역 실행 실패',
        details: result.output
      };
    }

    // README.en.md 파일 생성 확인
    const enReadmePath = path.join(env.problemDir, 'README.en.md');
    const hasEnReadme = await fileExists(enReadmePath);
    
    if (!hasEnReadme) {
      return {
        scenario,
        passed: false,
        message: 'README.en.md 파일이 생성되지 않았습니다.'
      };
    }

    // 메타데이터 파일 생성 확인 (선택적)
    const metaPath = path.join(env.problemDir, 'README.md.meta.json');
    const hasMetadata = await fileExists(metaPath);
    
    return {
      scenario,
      passed: true,
      message: '초기 번역 성공',
      details: `README.en.md: 생성됨, 메타데이터: ${hasMetadata ? '생성됨' : '없음'}`
    };
    
  } catch (error) {
    return {
      scenario,
      passed: false,
      message: '테스트 실행 중 오류 발생',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * 테스트 시나리오 2: 변경 없음 감지
 */
async function testNoChangesDetection(env: TestEnvironment): Promise<TestResult> {
  const scenario = '변경 없음 감지 테스트';
  
  try {
    // 두 번째 번역 실행
    const result = await runTranslation();
    
    if (!result.success) {
      return {
        scenario,
        passed: false,
        message: '번역 실행 실패',
        details: result.output
      };
    }

    // "skipping translation" 메시지 확인
    const hasSkipMessage = result.output.includes('skipping translation') || 
                          result.output.includes('건너뜁') ||
                          result.output.includes('No changes detected');
    
    return {
      scenario,
      passed: hasSkipMessage,
      message: hasSkipMessage ? '변경 없음 정상 감지' : '불필요한 재번역이 수행됨',
      details: `출력에서 건너뛰기 메시지 확인: ${hasSkipMessage ? '성공' : '실패'}`
    };
    
  } catch (error) {
    return {
      scenario,
      passed: false,
      message: '테스트 실행 중 오류 발생',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * 테스트 시나리오 3: 변경 감지
 */
async function testChangeDetection(env: TestEnvironment): Promise<TestResult> {
  const scenario = '변경 감지 테스트';
  
  try {
    // README.md 내용 변경
    const updatedContent = `# Test Problem (Updated)

This is an UPDATED test problem for translation system.

## Description
This problem tests the translation detection mechanism with changes.

## Example
Input: test
Output: translated (updated)

## Additional Section
This is a new section added to test change detection.
`;

    await fs.writeFile(path.join(env.problemDir, 'README.md'), updatedContent);
    
    // 잠시 대기 (파일 수정 시간 차이를 위해)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 번역 실행
    const result = await runTranslation();
    
    if (!result.success) {
      return {
        scenario,
        passed: false,
        message: '번역 실행 실패',
        details: result.output
      };
    }

    // 재번역 메시지 확인
    const hasRetranslationMessage = result.output.includes('re-translation needed') || 
                                   result.output.includes('재번역') ||
                                   result.output.includes('modified after translation');
    
    return {
      scenario,
      passed: hasRetranslationMessage,
      message: hasRetranslationMessage ? '변경 감지 및 재번역 성공' : '변경이 감지되지 않음',
      details: `출력에서 재번역 메시지 확인: ${hasRetranslationMessage ? '성공' : '실패'}`
    };
    
  } catch (error) {
    return {
      scenario,
      passed: false,
      message: '테스트 실행 중 오류 발생',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * 모든 테스트를 실행합니다.
 */
async function runAllTests(): Promise<void> {
  const startTime = Date.now();
  console.log('🧪 번역 시스템 통합 테스트 시작...');
  console.log('─'.repeat(60));
  
  try {
    // 테스트 환경 생성
    const env = await createTestEnvironment();
    
    const testResults: TestResult[] = [];
    
    // 테스트 시나리오 실행
    console.log('\n📋 테스트 시나리오 실행 중...');
    
    console.log('\n1️⃣ 초기 번역 테스트...');
    const test1 = await testInitialTranslation(env);
    testResults.push(test1);
    console.log(`   ${test1.passed ? '✅' : '❌'} ${test1.message}`);
    if (test1.details) console.log(`   💬 ${test1.details}`);
    
    console.log('\n2️⃣ 변경 없음 감지 테스트...');
    const test2 = await testNoChangesDetection(env);
    testResults.push(test2);
    console.log(`   ${test2.passed ? '✅' : '❌'} ${test2.message}`);
    if (test2.details) console.log(`   💬 ${test2.details}`);
    
    console.log('\n3️⃣ 변경 감지 테스트...');
    const test3 = await testChangeDetection(env);
    testResults.push(test3);
    console.log(`   ${test3.passed ? '✅' : '❌'} ${test3.message}`);
    if (test3.details) console.log(`   💬 ${test3.details}`);
    
    // 테스트 결과 요약
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    const stats: TestStats = {
      total: testResults.length,
      passed: testResults.filter(r => r.passed).length,
      failed: testResults.filter(r => !r.passed).length,
      duration
    };
    
    console.log('\n' + '─'.repeat(60));
    console.log('📊 테스트 결과 요약');
    console.log('─'.repeat(60));
    console.log(`총 테스트: ${stats.total}`);
    console.log(`통과: ${stats.passed} ✅`);
    console.log(`실패: ${stats.failed} ❌`);
    console.log(`실행 시간: ${stats.duration}ms`);
    console.log(`성공률: ${Math.round((stats.passed / stats.total) * 100)}%`);
    
    if (stats.failed > 0) {
      console.log('\n❌ 실패한 테스트:');
      testResults.filter(r => !r.passed).forEach(result => {
        console.log(`   • ${result.scenario}: ${result.message}`);
      });
      process.exit(1);
    } else {
      console.log('\n🎉 모든 테스트가 성공했습니다!');
    }
    
  } catch (error) {
    console.error('❌ 테스트 실행 중 치명적 오류:', error);
    process.exit(1);
  }
}

/**
 * 테스트 환경을 정리합니다.
 */
async function cleanupTest(): Promise<void> {
  try {
    await fs.rm('./test-translation-env', { recursive: true, force: true });
    console.log('🧹 Test environment cleaned up');
  } catch (error) {
    console.warn('⚠️ Cleanup warning:', error instanceof Error ? error.message : 'Unknown error');
  }
}

/**
 * 간단한 테스트 환경만 설정합니다.
 */
async function setupTest(): Promise<void> {
  try {
    console.log('🧪 Creating test environment...');
    const { testDir, problemDir, initialContent } = await createTestEnvironment();
    
    console.log('🔍 Running initial translation...');
    console.log('📝 Initial README.md content:');
    console.log(initialContent);
    
    // README.md 내용 변경 시뮬레이션
    console.log('\n🔄 Simulating README.md update...');
    const updatedContent = `# Test Problem (Updated)

This is an UPDATED test problem for translation system.

## Description
This problem tests the translation detection mechanism with changes.

## Example
Input: test
Output: translated (updated)

## Additional Section
This is a new section added to test change detection.
`;

    await fs.writeFile(path.join(problemDir, 'README.md'), updatedContent);
    console.log('📝 Updated README.md content:');
    console.log(updatedContent);
    
    console.log('\n✅ Test setup complete. You can now run:');
    console.log('   npm run translate');
    console.log('   to test the smart detection system');
    
    console.log('\n📋 Test scenarios to verify:');
    console.log('1. Initial translation creates README.en.md and .meta.json');
    console.log('2. No changes: should skip translation');
    console.log('3. Content changes: should detect and re-translate');
    console.log('4. Metadata validation works correctly');
    
  } catch (error) {
    console.error('❌ Test setup failed:', error instanceof Error ? error.message : 'Unknown error');
  }
}

/**
 * 메인 실행 함수
 */
async function main(): Promise<void> {
  const command = process.argv[2];

  switch (command) {
    case 'setup':
      await setupTest();
      break;
    case 'cleanup':
      await cleanupTest();
      break;
    case 'run':
    case 'test':
      await runAllTests();
      break;
    default:
      console.log('Usage:');
      console.log('  tsx test/translationTest.ts setup   - Create test environment');
      console.log('  tsx test/translationTest.ts test    - Run all tests');
      console.log('  tsx test/translationTest.ts cleanup - Remove test environment');
      console.log('');
      console.log('NPM Scripts:');
      console.log('  npm run test:setup     - Create test environment');
      console.log('  npm run test:run       - Run all tests');
      console.log('  npm run test:cleanup   - Remove test environment');
  }
}

// 스크립트가 직접 실행될 때만 main 함수 호출
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ Script execution failed:', error);
    process.exit(1);
  });
}