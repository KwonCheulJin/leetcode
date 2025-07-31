import fs from 'fs/promises';
import { execSync } from 'child_process';
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
 * 텍스트가 영어 내용인지 확인합니다.
 */
function isEnglishContent(content: string): boolean {
  const koreanRegex = /[가-힣]/;
  return !koreanRegex.test(content);
}

/**
 * 주어진 텍스트를 한국어로 번역합니다.
 */
async function translateText(text: string): Promise<string | null> {
  try {
    const response = await completion(text);
    
    if (!validateApiResponse(response)) {
      throw new Error('Invalid API response: empty or missing content');
    }
    
    return response.choices[0]?.message?.content || null;
  } catch (error) {
    console.error('Error in translation:', error);
    return null;
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
    console.log(`Translation metadata saved for ${readmePath}`);
  } catch (error) {
    console.warn(`Failed to save metadata for ${readmePath}:`, error);
  }
}

/**
 * README 파일을 처리합니다.
 */
async function processReadme(file: string): Promise<void> {
  const dir = path.dirname(file);
  const enReadmePath = path.join(dir, 'README.en.md');

  try {
    console.log(`Translating ${file}`);
    
    const hasEnReadme = await doesFileExist(enReadmePath);
    let sourceContent: string;
    
    if (hasEnReadme) {
      sourceContent = await fs.readFile(enReadmePath, 'utf8');
      console.log(`Using existing README.en.md as source for ${file}`);
    } else {
      const currentContent = await fs.readFile(file, 'utf8');
      
      if (isEnglishContent(currentContent)) {
        sourceContent = currentContent;
        await fs.writeFile(enReadmePath, currentContent);
        console.log(`Backed up English README.md to README.en.md for ${file}`);
      } else {
        console.log(`README.md already in Korean for ${file}, skipping translation`);
        return;
      }
    }
    
    const translatedContent = await translateText(sourceContent);
    
    if (!translatedContent) {
      throw new Error('Translation failed');
    }
    
    await Promise.all([
      fs.writeFile(file, translatedContent),
      saveTranslationMeta(file, sourceContent, translatedContent)
    ]);
    console.log(`Translation completed for ${file}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Translation failed for ${file}:`, errorMessage);
    throw error;
  }
}

/**
 * Git에서 변경된 README.md 파일들을 찾습니다.
 * GitHub Actions 환경에서는 fetch-depth: 2로 설정되어 있어야 함
 */
function getChangedReadmeFiles(): string[] {
  try {
    // GitHub Actions에서는 HEAD~1과 HEAD 비교
    // 로컬에서는 working directory의 변경사항도 고려
    let gitCommand = 'git diff --name-only HEAD~1 HEAD';
    
    // GitHub Actions 환경인지 확인
    if (process.env.GITHUB_ACTIONS === 'true') {
      console.log('🔧 GitHub Actions environment detected');
      gitCommand = 'git diff --name-only HEAD~1 HEAD';
    } else {
      console.log('🔧 Local environment detected');
      // 로컬에서는 staged와 unstaged 변경사항도 포함
      gitCommand = 'git diff --name-only HEAD~1 HEAD && git diff --name-only --cached && git diff --name-only';
    }
    
    const changedFiles = execSync(gitCommand, { encoding: 'utf8' })
      .split('\n')
      .filter(file => file.trim())
      .filter(file => file.endsWith('/README.md') && file.match(/^\d{4}-/)) // LeetCode 패턴만
      .map(file => {
        const absolutePath = path.resolve(file);
        console.log(`  📄 Changed: ${file} -> ${absolutePath}`);
        return absolutePath;
      });

    // 중복 제거
    const uniqueFiles = [...new Set(changedFiles)];
    console.log(`Found ${uniqueFiles.length} changed README.md files:`);
    uniqueFiles.forEach(file => console.log(`  - ${path.relative(process.cwd(), file)}`));
    
    return uniqueFiles;
  } catch (error) {
    console.warn('Error getting changed files from git:', error);
    return [];
  }
}

/**
 * 새로 추가된 README.md 파일들을 찾습니다.
 */
function getNewReadmeFiles(): string[] {
  try {
    // LeetHub는 새 문제를 커밋할 때 새 파일을 추가함
    // 최근 커밋에서 추가된 파일들을 찾기
    const newFiles = execSync('git diff --name-only --diff-filter=A HEAD~1 HEAD', { encoding: 'utf8' })
      .split('\n')
      .filter(file => file.trim())
      .filter(file => file.endsWith('/README.md') && file.match(/^\d{4}-/))
      .map(file => {
        const absolutePath = path.resolve(file);
        console.log(`  📄 New: ${file} -> ${absolutePath}`);
        return absolutePath;
      });

    console.log(`Found ${newFiles.length} new README.md files:`);
    newFiles.forEach(file => console.log(`  - ${path.relative(process.cwd(), file)}`));
    
    return newFiles;
  } catch (error) {
    console.warn('Error getting new files from git:', error);
    return [];
  }
}

/**
 * 메인 실행 함수
 */
async function main() {
  try {
    console.log('🔍 Finding changed and new README files...');
    
    const changedFiles = getChangedReadmeFiles();
    const newFiles = getNewReadmeFiles();
    
    // 중복 제거
    const allFiles = [...new Set([...changedFiles, ...newFiles])];
    
    if (allFiles.length === 0) {
      console.log('✅ No README files to translate');
      return;
    }

    console.log(`\n📋 Processing ${allFiles.length} README files...`);
    
    const results = await Promise.allSettled(
      allFiles.map(file => processReadme(file))
    );

    const successful = results.filter(result => result.status === 'fulfilled').length;
    const failed = results.filter(result => result.status === 'rejected').length;

    console.log(`\n✨ Translation completed: ${successful} successful, ${failed} failed`);
    
    if (failed > 0) {
      console.log('\n❌ Failed translations:');
      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          console.log(`  - ${allFiles[index]}: ${result.reason}`);
        }
      });
    }
  } catch (error) {
    console.error('Translation process failed:', error);
    process.exit(1);
  }
}

// 스크립트 직접 실행 시에만 main 함수 호출
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}