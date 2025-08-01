#!/usr/bin/env tsx

/**
 * README.en.md 파일들을 영어로 번역하는 스크립트
 * 현재 한국어 내용을 그대로 복사한 파일들을 실제 영어로 번역
 */

import 'dotenv/config';
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import OpenAI from 'openai';

class EnglishReadmeTranslator {
  private openai: OpenAI;
  private baseDir: string;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY 환경 변수가 설정되지 않았습니다.');
    }

    this.openai = new OpenAI({ apiKey });
    this.baseDir = process.cwd();
    console.log('✅ OpenAI 클라이언트 초기화 완료');
  }

  /**
   * 모든 문제 디렉토리 스캔
   */
  async scanAllProblems(): Promise<string[]> {
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
   * 한국어 README를 영어로 번역
   */
  async translateToEnglish(koreanContent: string, problemNumber: string): Promise<string> {
    try {
      const prompt = `
다음은 LeetCode 문제 번호 ${problemNumber}의 한국어 README 파일입니다. 
이를 정확한 영어로 번역해주세요. 번역할 때 다음 규칙을 지켜주세요:

1. HTML 태그 구조는 그대로 유지
2. LeetCode 문제의 표준적인 영어 표현 사용
3. 제목은 LeetCode 공식 영어 제목으로 변경
4. 기술적 용어는 표준 영어 용어 사용
5. 예시, 제약조건 등은 정확히 번역

한국어 내용:
${koreanContent}

영어로 번역된 결과만 반환해주세요.
`;

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a professional translator specializing in technical documentation and LeetCode problems. Translate Korean content to accurate, natural English while maintaining HTML structure and technical accuracy.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      });

      const translation = response.choices[0]?.message?.content?.trim();
      if (!translation) {
        throw new Error('번역 결과가 비어있습니다.');
      }

      return translation;
    } catch (error) {
      console.error(`번역 실패 (문제 ${problemNumber}):`, error);
      throw error;
    }
  }

  /**
   * 단일 문제의 README.en.md 수정
   */
  async fixSingleProblem(problemDir: string): Promise<boolean> {
    try {
      const problemPath = join(this.baseDir, problemDir);
      const readmePath = join(problemPath, 'README.md');
      const englishReadmePath = join(problemPath, 'README.en.md');

      // README.md 파일 확인
      if (!existsSync(readmePath)) {
        console.log(`⚠️  README.md 파일이 없습니다: ${problemDir}`);
        return false;
      }

      // 한국어 README 내용 읽기
      const koreanContent = readFileSync(readmePath, 'utf-8');
      
      // 문제 번호 추출
      const problemNumberMatch = problemDir.match(/^(\d+)-/);
      const problemNumber = problemNumberMatch ? problemNumberMatch[1] : '0';

      console.log(`🌐 번역 시작: ${problemDir} (문제 ${problemNumber})`);

      // 영어로 번역
      const englishContent = await this.translateToEnglish(koreanContent, problemNumber);

      // README.en.md 파일에 쓰기
      writeFileSync(englishReadmePath, englishContent, 'utf-8');
      
      console.log(`✅ 번역 완료: ${problemDir}`);
      return true;
    } catch (error) {
      console.error(`❌ 번역 실패: ${problemDir}`, error);
      return false;
    }
  }

  /**
   * 모든 문제의 README.en.md 수정
   */
  async fixAllProblems(force: boolean = false): Promise<void> {
    const problemDirs = await this.scanAllProblems();
    
    if (problemDirs.length === 0) {
      console.log('❌ 수정할 문제가 없습니다.');
      return;
    }

    if (!force) {
      console.log('⚠️  모든 README.en.md 파일을 번역하시겠습니까? --force 플래그를 사용하여 확인하세요.');
      return;
    }

    let successCount = 0;
    let failedCount = 0;

    for (const problemDir of problemDirs) {
      try {
        const success = await this.fixSingleProblem(problemDir);
        if (success) {
          successCount++;
        } else {
          failedCount++;
        }

        // API 레이트 리밋 방지를 위한 잠시 대기
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (error) {
        console.error(`❌ 처리 실패: ${problemDir}`, error);
        failedCount++;
      }

      console.log(`📊 진행률: ${successCount + failedCount}/${problemDirs.length}`);
    }

    console.log('\n🎉 번역 완료:');
    console.log(`   ✅ 성공: ${successCount}개`);
    console.log(`   ❌ 실패: ${failedCount}개`);
  }

  /**
   * 특정 문제만 수정
   */
  async fixSpecificProblem(problemNumber: string): Promise<void> {
    const problemDirs = await this.scanAllProblems();
    const targetDir = problemDirs.find(dir => dir.startsWith(`${problemNumber.padStart(4, '0')}`));

    if (!targetDir) {
      console.log(`❌ 문제 번호 ${problemNumber}를 찾을 수 없습니다.`);
      return;
    }

    const success = await this.fixSingleProblem(targetDir);
    if (success) {
      console.log(`🎉 문제 ${problemNumber} 번역 완료`);
    } else {
      console.log(`❌ 문제 ${problemNumber} 번역 실패`);
    }
  }
}

// 스크립트 실행
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  try {
    const translator = new EnglishReadmeTranslator();

    switch (command) {
      case 'all': {
        const force = args.includes('--force');
        await translator.fixAllProblems(force);
        break;
      }
      case 'problem': {
        const problemNumber = args[1];
        if (!problemNumber) {
          console.log('❌ 문제 번호를 입력하세요: npm run fix:english problem 53');
          process.exit(1);
        }
        await translator.fixSpecificProblem(problemNumber);
        break;
      }
      default: {
        console.log('📚 README.en.md 영어 번역 도구');
        console.log();
        console.log('사용법:');
        console.log('  npm run fix:english all --force           모든 README.en.md 번역');
        console.log('  npm run fix:english problem 53            특정 문제만 번역');
        console.log();
        console.log('옵션:');
        console.log('  --force              확인 없이 모든 파일 번역');
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

export { EnglishReadmeTranslator };