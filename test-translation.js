#!/usr/bin/env node

/**
 * 번역 시스템 테스트 스크립트
 * 메타데이터 기반 변경 감지 시스템 검증용
 */

import fs from 'fs/promises';
import path from 'path';

async function createTestEnvironment() {
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

async function runTranslationTest() {
  try {
    console.log('🧪 Creating test environment...');
    const { testDir, problemDir, initialContent } = await createTestEnvironment();
    
    console.log('🔍 Running initial translation...');
    // 여기서 실제로는 tsx app/translateREADME.ts를 실행해야 하지만
    // 테스트를 위해 시뮬레이션
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
    console.error('❌ Test setup failed:', error.message);
  }
}

async function cleanupTest() {
  try {
    await fs.rm('./test-translation-env', { recursive: true, force: true });
    console.log('🧹 Test environment cleaned up');
  } catch (error) {
    console.warn('⚠️ Cleanup warning:', error.message);
  }
}

// 명령줄 인자 처리
const command = process.argv[2];

if (command === 'setup') {
  runTranslationTest();
} else if (command === 'cleanup') {
  cleanupTest();
} else {
  console.log('Usage:');
  console.log('  node test-translation.js setup   - Create test environment');
  console.log('  node test-translation.js cleanup - Remove test environment');
}