import fs from 'fs/promises';
import path from 'path';
import { completion } from './completion.js';

/**
 * 파일이 존재하는지 확인합니다.
 * @param {string} filePath - 확인할 파일 경로
 * @returns {Promise<boolean>} 파일 존재 여부
 */
async function doesFileExist(filePath) {
  return fs
    .access(filePath)
    .then(() => true)
    .catch(() => false);
}

/**
 * 주어진 텍스트를 한국어로 번역합니다.
 * @param {string} text - 번역할 텍스트
 * @returns {Promise<string|null>} 번역된 텍스트 또는 실패 시 null
 */
async function translateText(text) {
  try {
    const response = await completion(text);
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error in translation:', error);
    return null;
  }
}

/**
 * README.md 파일을 README.ko.md로 번역하여 저장합니다.
 * @param {string} filePath - README.md 파일 경로
 * @returns {Promise<void>}
 */
async function translateFile(filePath) {
  const content = await fs.readFile(filePath, 'utf8');
  const translatedContent = await translateText(content);

  if (!translatedContent) {
    throw new Error('Translation failed');
  }

  return translatedContent;
}

/**
 * 디렉토리를 재귀적으로 탐색하여 README.md 파일을 찾습니다.
 * @param {string} dir - 탐색할 디렉토리 경로
 * @returns {Promise<string[]>} README.md 파일 경로 목록
 */
async function findReadmeFiles(dir) {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name === 'node_modules') continue;

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findReadmeFiles(fullPath)));
    } else if (entry.isFile()) {
      const dirPath = path.dirname(fullPath);
      const koReadmePath = path.join(dirPath, 'README.ko.md');
      const readmePath = path.join(dirPath, 'README.md');

      // README.ko.md가 없고 README.md가 있는 경우만 처리
      const hasKoReadme = await doesFileExist(koReadmePath);
      if (!hasKoReadme && (await doesFileExist(readmePath))) {
        files.push(readmePath);
      }
    }
  }

  return files;
}

/**
 * README 파일을 처리합니다.
 * @param {string} file - 처리할 README 파일 경로
 */
async function processReadme(file) {
  const dir = path.dirname(file);
  const koReadmePath = path.join(dir, 'README.ko.md');

  try {
    console.log(`Translating ${file}`);
    const translatedContent = await translateFile(file);
    await fs.writeFile(koReadmePath, translatedContent);
    console.log(`Translation completed for ${file}`);
  } catch (error) {
    console.error(`Translation failed for ${file}:`, error.message);
  }
}

/**
 * 메인 실행 함수
 */
async function main() {
  try {
    const readmeFiles = await findReadmeFiles('.');
    for (const file of readmeFiles) {
      await processReadme(file);
    }
  } catch (error) {
    console.error('Error in main process:', error);
  }
}

main();
