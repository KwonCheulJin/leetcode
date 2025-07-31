#!/usr/bin/env tsx

/**
 * 개별 README.md 파일 번역 스크립트
 * 사용법: tsx app/translateSingle.ts <파일경로>
 */

import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { completion, validateApiResponse } from './completion.ts';

/**
 * 번역 메타데이터 인터페이스
 */
interface TranslationMeta {
  lastTranslated: string;
  sourceHash: string;
  targetHash: string;
  version: string;
}

/**
 * 파일이 존재하는지 확인합니다.
 */
async function doesFileExist(filePath: string): Promise<boolean> {
  return fs
    .access(filePath)
    .then(() => true)
    .catch(() => false);
}

/**
 * 주어진 텍스트를 한국어로 번역합니다.
 */
async function translateText(text: string): Promise<string | null> {
  try {
    console.log('🔄 OpenAI API로 번역 중...');
    const response = await completion(text);
    
    // API 응답 유효성 검증
    if (!validateApiResponse(response)) {
      throw new Error('Invalid API response: empty or missing content');
    }
    
    return response.choices[0]?.message?.content || null;
  } catch (error) {
    console.error('❌ 번역 오류:', error);
    return null;
  }
}

/**
 * 절대 경로의 README.md 파일인지 확인합니다.
 */
function isRootReadme(filePath: string): boolean {
  const absolutePath = path.resolve(filePath);
  const rootPath = path.resolve('./README.md');
  return absolutePath === rootPath;
}

/**
 * 재번역이 필요한지 스마트 감지
 */
async function shouldRetranslate(readmePath: string, enReadmePath: string, force: boolean = false): Promise<boolean> {
  if (force) {
    console.log('🔥 강제 번역 모드');
    return true;
  }

  const metaPath = `${readmePath}.meta.json`;
  
  try {
    // 현재 README.md 해시 계산
    const currentContent = await fs.readFile(readmePath, 'utf8');
    const currentHash = crypto.createHash('sha256').update(currentContent).digest('hex');
    
    // 메타데이터 읽기
    let meta: TranslationMeta;
    try {
      const metaContent = await fs.readFile(metaPath, 'utf8');
      meta = JSON.parse(metaContent);
    } catch {
      // 메타데이터가 없으면 번역 필요
      console.log('📝 메타데이터가 없습니다. 번역이 필요합니다.');
      return true;
    }
    
    // README.en.md 존재 여부 확인
    const hasEnReadme = await doesFileExist(enReadmePath);
    if (!hasEnReadme) {
      console.log('📄 README.en.md가 없습니다. 번역이 필요합니다.');
      return true;
    }
    
    // 해시 비교
    const needsUpdate = currentHash !== meta.sourceHash;
    if (needsUpdate) {
      console.log('🔍 콘텐츠가 변경되었습니다. 재번역이 필요합니다.');
    } else {
      console.log('✨ 변경사항이 없습니다. 번역을 건너뜁니다.');
    }
    
    return needsUpdate;
  } catch (error) {
    console.warn('⚠️ 번역 상태 확인 중 오류:', error);
    return true; // 오류 시 번역 진행
  }
}

/**
 * 번역 후 메타데이터 저장
 */
async function saveTranslationMeta(readmePath: string, sourceContent: string, translatedContent: string): Promise<void> {
  const metaPath = `${readmePath}.meta.json`;
  
  const sourceHash = crypto.createHash('sha256').update(sourceContent).digest('hex');
  const targetHash = crypto.createHash('sha256').update(translatedContent).digest('hex');
  
  const meta: TranslationMeta = {
    lastTranslated: new Date().toISOString(),
    sourceHash,
    targetHash,
    version: '1.0.0'
  };
  
  try {
    await fs.writeFile(metaPath, JSON.stringify(meta, null, 2));
    console.log('💾 번역 메타데이터가 저장되었습니다');
  } catch (error) {
    console.warn('⚠️ 메타데이터 저장 실패:', error);
  }
}

/**
 * README 파일을 처리합니다.
 */
async function processReadme(file: string, force: boolean = false): Promise<void> {
  const resolvedPath = path.resolve(file);
  const dir = path.dirname(resolvedPath);
  const enReadmePath = path.join(dir, 'README.en.md');

  try {
    console.log(`\n📖 파일 처리 중: ${resolvedPath}`);
    
    // 루트 README.md 제외
    if (isRootReadme(resolvedPath)) {
      console.log('🚫 루트 README.md는 번역에서 제외됩니다.');
      return;
    }

    // 파일 존재 여부 확인
    const exists = await doesFileExist(resolvedPath);
    if (!exists) {
      console.log('❌ 파일이 존재하지 않습니다:', resolvedPath);
      return;
    }

    // 재번역 필요 여부 확인
    const needsTranslation = await shouldRetranslate(resolvedPath, enReadmePath, force);
    if (!needsTranslation) {
      console.log('⏭️ 번역을 건너뜁니다.');
      return;
    }

    // 파일 내용 읽기
    const originalContent = await fs.readFile(resolvedPath, 'utf8');
    console.log(`📄 원본 내용 (${originalContent.length}자):`);
    console.log('─'.repeat(50));
    console.log(originalContent.substring(0, 200) + (originalContent.length > 200 ? '...' : ''));
    console.log('─'.repeat(50));

    // 번역 실행
    const translatedContent = await translateText(originalContent);
    
    if (!translatedContent) {
      throw new Error('번역 실패');
    }
    
    console.log(`\n🇰🇷 번역된 내용 (${translatedContent.length}자):`);
    console.log('─'.repeat(50));
    console.log(translatedContent.substring(0, 200) + (translatedContent.length > 200 ? '...' : ''));
    console.log('─'.repeat(50));

    // 원본과 번역본을 병렬로 저장
    await Promise.all([
      fs.writeFile(enReadmePath, originalContent), // 기존 README.md를 README.en.md로 저장
      fs.writeFile(resolvedPath, translatedContent), // 번역된 내용을 README.md로 저장
      saveTranslationMeta(resolvedPath, originalContent, translatedContent) // 메타데이터 저장
    ]);
    
    console.log('✅ 번역이 완료되었습니다!');
    console.log(`📁 저장된 파일:`);
    console.log(`   - README.md (한국어): ${resolvedPath}`);
    console.log(`   - README.en.md (영어): ${enReadmePath}`);
    console.log(`   - 메타데이터: ${resolvedPath}.meta.json`);
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ 번역 실패:', errorMessage);
    throw error;
  }
}

/**
 * 메인 실행 함수
 */
async function main(): Promise<void> {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('사용법:');
    console.log('  tsx app/translateSingle.ts <파일경로> [--force]');
    console.log('  npm run translate:file <파일경로> [-- --force]');
    console.log('');
    console.log('예시:');
    console.log('  tsx app/translateSingle.ts ./TRANSLATION_SYSTEM.md');
    console.log('  npm run translate:file TRANSLATION_SYSTEM.md');
    console.log('  npm run translate:file TRANSLATION_SYSTEM.md -- --force');
    console.log('');
    console.log('옵션:');
    console.log('  --force  메타데이터 무시하고 강제 번역');
    process.exit(1);
  }

  const filePath = args[0];
  const force = args.includes('--force');
  
  console.log('🚀 개별 파일 번역 시작');
  console.log(`📂 대상 파일: ${filePath}`);
  if (force) console.log('🔥 강제 번역 모드 활성화');
  
  try {
    await processReadme(filePath, force);
    console.log('\n🎉 번역 작업이 완료되었습니다!');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('\n💥 번역 작업 실패:', errorMessage);
    process.exit(1);
  }
}

// 스크립트가 직접 실행될 때만 main 함수 호출
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}