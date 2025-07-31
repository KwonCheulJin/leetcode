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
 * @param filePath - 확인할 파일 경로
 * @returns 파일 존재 여부
 */
async function doesFileExist(filePath: string): Promise<boolean> {
  return fs
    .access(filePath)
    .then(() => true)
    .catch(() => false);
}

/**
 * 주어진 텍스트를 한국어로 번역합니다.
 * @param text - 번역할 텍스트
 * @returns 번역된 텍스트 또는 실패 시 null
 */
async function translateText(text: string): Promise<string | null> {
  try {
    const response = await completion(text);
    
    // API 응답 유효성 검증
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
 * 절대 경로의 README.md 파일인지 확인합니다.
 * @param filePath - 검사할 파일 경로
 * @param rootDir - 루트 디렉토리 경로
 * @returns 절대 경로의 README.md 파일 여부
 */
function isRootReadme(filePath: string, rootDir: string): boolean {
  const normalizedPath = path.normalize(filePath);
  const normalizedRoot = path.normalize(rootDir);
  const relativePath = path.relative(normalizedRoot, normalizedPath);
  
  // 루트 디렉토리의 README.md인지 확인
  return relativePath === 'README.md';
}

/**
 * 재번역이 필요한지 스마트 감지 (Git 호환 방식)
 * @param readmePath - README.md 파일 경로
 * @param enReadmePath - README.en.md 파일 경로
 * @returns 재번역 필요 여부
 */
async function shouldRetranslate(readmePath: string, enReadmePath: string): Promise<boolean> {
  try {
    // README.en.md 존재 여부 확인
    const hasEnReadme = await doesFileExist(enReadmePath);
    if (!hasEnReadme) {
      console.log(`README.en.md missing for ${readmePath}, translation needed`);
      return true;
    }

    // 파일 수정 시간 비교
    const readmeStats = await fs.stat(readmePath);
    const enReadmeStats = await fs.stat(enReadmePath);
    
    // README.md가 README.en.md보다 최근에 수정되었으면 재번역 필요
    if (readmeStats.mtime > enReadmeStats.mtime) {
      console.log(`README.md modified after translation for ${readmePath}, re-translation needed`);
      return true;
    }

    // 메타데이터가 있으면 해시 비교도 수행 (로컬 개발용)
    const metaPath = `${readmePath}.meta.json`;
    try {
      const metaContent = await fs.readFile(metaPath, 'utf8');
      const meta: TranslationMeta = JSON.parse(metaContent);
      
      const currentContent = await fs.readFile(readmePath, 'utf8');
      const currentHash = crypto.createHash('sha256').update(currentContent).digest('hex');
      
      const needsUpdate = currentHash !== meta.sourceHash;
      if (needsUpdate) {
        console.log(`Content hash changed for ${readmePath}, re-translation needed`);
        return true;
      }
    } catch {
      // 메타데이터 없음은 정상 (GitHub Actions 환경)
    }
    
    console.log(`No changes detected for ${readmePath}, skipping translation`);
    return false;
    
  } catch (error) {
    console.warn(`Error checking translation status for ${readmePath}:`, error);
    return true; // 오류 시 번역 진행
  }
}

/**
 * 번역 후 메타데이터 저장
 * @param readmePath - README.md 파일 경로
 * @param sourceContent - 원본 내용
 * @param translatedContent - 번역된 내용
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
 * 디렉토리를 재귀적으로 탐색하여 README.md 파일을 찾습니다.
 * @param dir - 탐색할 디렉토리 경로
 * @param rootDir - 루트 디렉토리 경로 (절대 경로 README.md 제외용)
 * @returns README.md 파일 경로 목록
 */
async function findReadmeFiles(dir: string, rootDir: string = dir): Promise<string[]> {
  const files: string[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.') || entry.name.endsWith('.meta.json')) continue;

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findReadmeFiles(fullPath, rootDir)));
    } else if (entry.isFile() && entry.name === 'README.md') {
      const dirPath = path.dirname(fullPath);
      const enReadmePath = path.join(dirPath, 'README.en.md');
      const readmePath = fullPath;

      // README.md가 있고 절대 경로가 아닌 경우
      if (!isRootReadme(readmePath, rootDir)) {
        // 스마트 감지: 재번역이 필요한 경우만 포함
        if (await shouldRetranslate(readmePath, enReadmePath)) {
          files.push(readmePath);
        }
      }
    }
  }

  return files;
}

/**
 * README 파일을 처리합니다.
 * @param file - 처리할 README 파일 경로
 */
async function processReadme(file: string): Promise<void> {
  const dir = path.dirname(file);
  const enReadmePath = path.join(dir, 'README.en.md');

  try {
    console.log(`Translating ${file}`);
    // 파일 내용을 한 번만 읽어서 재사용
    const originalContent = await fs.readFile(file, 'utf8');
    const translatedContent = await translateText(originalContent);
    
    if (!translatedContent) {
      throw new Error('Translation failed');
    }
    
    // 원본과 번역본을 병렬로 저장
    await Promise.all([
      fs.writeFile(enReadmePath, originalContent), // 기존 README.md를 README.en.md로 저장
      fs.writeFile(file, translatedContent), // 번역된 내용을 README.md로 저장
      saveTranslationMeta(file, originalContent, translatedContent) // 메타데이터 저장
    ]);
    console.log(`Translation completed for ${file}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Translation failed for ${file}:`, errorMessage);
    throw error; // 재시도를 위해 에러 전파
  }
}

/**
 * 재시도 로직이 포함된 번역 함수
 * @param file - 처리할 README 파일 경로
 * @param maxRetries - 최대 재시도 횟수
 */
async function processReadmeWithRetry(file: string, maxRetries: number = 3): Promise<void> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await processReadme(file);
      return; // 성공하면 즉시 반환
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.warn(`Translation attempt ${attempt}/${maxRetries} failed for ${file}: ${errorMessage}`);
      
      if (attempt === maxRetries) {
        console.error(`All ${maxRetries} attempts failed for ${file}`);
        throw error;
      }
      
      // 재시도 전 대기 (지수 백오프)
      const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

/**
 * 메인 실행 함수 (병렬 처리 지원)
 */
async function main(): Promise<void> {
  try {
    const readmeFiles = await findReadmeFiles('.');
    console.log(`Found ${readmeFiles.length} README files to translate`);
    
    // 병렬 처리로 성능 개선 (최대 5개 동시 처리)
    const maxConcurrent = 5;
    const results = [];
    
    for (let i = 0; i < readmeFiles.length; i += maxConcurrent) {
      const batch = readmeFiles.slice(i, i + maxConcurrent);
      const batchPromises = batch.map(file => processReadmeWithRetry(file).catch(error => {
        console.error(`Failed to process ${file}:`, error.message);
        return null; // 실패한 파일은 null로 처리하여 전체 중단 방지
      }));
      
      const batchResults = await Promise.allSettled(batchPromises);
      results.push(...batchResults);
    }
    
    // 결과 요약
    const successful = results.filter(result => result.status === 'fulfilled').length;
    const failed = results.length - successful;
    console.log(`Translation completed: ${successful} successful, ${failed} failed`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in main process:', errorMessage);
  }
}

main();