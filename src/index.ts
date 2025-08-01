#!/usr/bin/env node

import 'dotenv/config';
import { FileProcessor } from './services/fileProcessor.js';
import { Translator } from './services/translator.js';
import { BlogGenerator } from './services/blogGenerator.js';
import { SupabaseService } from './services/supabase.js';
import { ProcessingOptions, ProcessingResult } from './types/index.js';

class LeetCodeDataProcessor {
  private fileProcessor: FileProcessor;
  private translator: Translator;
  private blogGenerator: BlogGenerator;
  private supabaseService: SupabaseService | null = null;

  constructor() {
    this.fileProcessor = new FileProcessor();
    this.translator = new Translator();
    this.blogGenerator = new BlogGenerator();
    
    // Supabase는 환경 변수가 제대로 설정된 경우에만 초기화
    try {
      this.supabaseService = new SupabaseService();
    } catch (error) {
      console.log('⚠️  Supabase 초기화 실패 - 환경 변수를 확인하세요');
    }
  }

  /**
   * 단일 문제 처리
   */
  async processSingleProblem(problemPath: string, options: ProcessingOptions = {}): Promise<ProcessingResult> {
    const startTime = Date.now();
    
    try {
      console.log(`🚀 문제 처리 시작: ${problemPath}`);
      
      // 1. 문제 정보 로드
      console.log('📂 문제 정보 로드 중...');
      const problemInfo = await this.fileProcessor.readLeetCodeProblem(problemPath);
      
      if (!problemInfo) {
        throw new Error(`문제 정보를 로드할 수 없습니다: ${problemPath}`);
      }

      console.log(`✅ 문제 로드 완료: ${problemInfo.title} (${problemInfo.problemNumber})`);

      // 2. 번역 실행
      console.log('🌐 번역 실행 중...');
      const translationResult = await this.translator.translateProblem(problemInfo);
      console.log('✅ 번역 완료');

      // 3. 블로그 포스팅 생성
      console.log('📝 블로그 포스팅 생성 중...');
      const blogPost = await this.blogGenerator.generateBlogPost(problemInfo, translationResult);
      console.log('✅ 블로그 포스팅 생성 완료');

      // 4. Supabase에 저장 (옵션)
      if (this.supabaseService && !options.dryRun) {
        console.log('💾 데이터베이스에 저장 중...');
        const saveResult = await this.supabaseService.saveProblemData(problemInfo, translationResult);
        
        if (saveResult.success) {
          console.log(`✅ 데이터베이스 저장 완료: ID ${saveResult.id}`);
        }
      } else if (!this.supabaseService) {
        console.log('⚠️  Supabase 미설정 - 데이터베이스 저장 건너뜀');
      } else if (options.dryRun) {
        console.log('🔍 Dry Run 모드 - 데이터베이스 저장 건너뜀');
      }

      const endTime = Date.now();
      const duration = endTime - startTime;

      console.log(`🎉 처리 완료: ${problemPath} (${duration}ms)`);
      console.log('─'.repeat(50));

      return {
        success: true,
        problemNumber: problemInfo.problemNumber,
        message: `성공적으로 처리됨 (${duration}ms)`
      };

    } catch (error) {
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      console.error(`❌ 처리 실패: ${problemPath} (${duration}ms)`);
      console.error('오류:', error);
      console.log('─'.repeat(50));

      return {
        success: false,
        problemNumber: 0,
        message: error instanceof Error ? error.message : '알 수 없는 오류',
        error: error instanceof Error ? error : new Error(String(error))
      };
    }
  }

  /**
   * 여러 문제 일괄 처리
   */
  async processBatchProblems(problemPaths: string[], options: ProcessingOptions = {}): Promise<{
    results: ProcessingResult[];
    summary: { success: number; failed: number; total: number };
  }> {
    const results: ProcessingResult[] = [];
    const batchSize = options.batchSize || 5;
    
    console.log(`🔄 일괄 처리 시작: ${problemPaths.length}개 문제`);
    console.log(`⚙️  배치 크기: ${batchSize}, Dry Run: ${options.dryRun ? 'Yes' : 'No'}`);
    console.log();

    for (let i = 0; i < problemPaths.length; i += batchSize) {
      const batch = problemPaths.slice(i, i + batchSize);
      console.log(`📦 배치 ${Math.floor(i / batchSize) + 1}/${Math.ceil(problemPaths.length / batchSize)} 처리 중...`);
      
      const batchPromises = batch.map(problemPath => 
        this.processSingleProblem(problemPath, options)
      );

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // 배치 간 잠시 대기 (API 레이트 리밋 방지)
      if (i + batchSize < problemPaths.length) {
        console.log('⏳ 다음 배치까지 1초 대기...');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    const summary = {
      success: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      total: results.length
    };

    console.log('\n📊 일괄 처리 완료:');
    console.log(`   ✅ 성공: ${summary.success}개`);
    console.log(`   ❌ 실패: ${summary.failed}개`);
    console.log(`   📝 총합: ${summary.total}개`);

    return { results, summary };
  }

  /**
   * 모든 문제 처리
   */
  async processAllProblems(options: ProcessingOptions = {}): Promise<void> {
    console.log('🌟 모든 문제 처리 시작...');
    
    const allProblems = await this.fileProcessor.scanAllProblems();
    
    if (allProblems.length === 0) {
      console.log('❌ 처리할 문제가 없습니다.');
      return;
    }

    console.log(`📋 총 ${allProblems.length}개 문제 발견`);
    
    if (!options.force) {
      console.log('⚠️  모든 문제를 처리하시겠습니까? --force 플래그를 사용하여 확인하세요.');
      return;
    }

    await this.processBatchProblems(allProblems, options);
  }

  /**
   * 통계 정보 출력
   */
  async showStatistics(): Promise<void> {
    if (!this.supabaseService) {
      console.log('❌ Supabase가 설정되지 않아 통계를 조회할 수 없습니다.');
      return;
    }

    try {
      console.log('📊 통계 정보 조회 중...');
      const stats = await this.supabaseService.getStatistics();
      
      console.log('\n📈 LeetCode 문제 데이터 통계:');
      console.log('═'.repeat(50));
      console.log(`📝 총 해결 문제: ${stats.totalProblems}개`);
      console.log();
      console.log('📊 난이도별 분포:');
      if (Object.keys(stats.byDifficulty).length > 0) {
        Object.entries(stats.byDifficulty).forEach(([difficulty, count]) => {
          const percentage = stats.totalProblems > 0 ? ((count / stats.totalProblems) * 100).toFixed(1) : '0';
          console.log(`   ${difficulty.padEnd(8)}: ${count.toString().padStart(3)}개 (${percentage}%)`);
        });
      } else {
        console.log('   데이터 없음');
      }
      console.log();
      console.log('💻 언어별 분포:');
      if (Object.keys(stats.byLanguage).length > 0) {
        Object.entries(stats.byLanguage).forEach(([language, count]) => {
          const percentage = stats.totalProblems > 0 ? ((count / stats.totalProblems) * 100).toFixed(1) : '0';
          console.log(`   ${language.padEnd(10)}: ${count.toString().padStart(3)}개 (${percentage}%)`);
        });
      } else {
        console.log('   데이터 없음');
      }
      
      if (stats.recentProblems.length > 0) {
        console.log();
        console.log('📅 최근 해결 문제:');
        stats.recentProblems.forEach(problem => {
          const date = new Date(problem.created_at!).toLocaleDateString('ko-KR');
          const problemNumber = problem.problem_number?.toString() || '0';
          const titleKorean = problem.title_korean || '제목 없음';
          console.log(`   ${problemNumber.padStart(4)} - ${titleKorean} (${date})`);
        });
      }
      
    } catch (error) {
      console.error('❌ 통계 조회 실패:', error);
    }
  }
}

/**
 * CLI 인터페이스
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  const processor = new LeetCodeDataProcessor();

  // 명령어별 처리
  switch (command) {
    case 'process':
    case undefined: {
      const problemNumberArg = args.find(arg => arg.startsWith('--problem='));
      const problemNumber = problemNumberArg?.split('=')[1];
      
      const options: ProcessingOptions = {
        force: args.includes('--force'),
        dryRun: args.includes('--dry-run'),
        batchSize: parseInt(args.find(arg => arg.startsWith('--batch-size='))?.split('=')[1] || '5')
      };

      if (problemNumber) {
        // 특정 문제 처리
        const problemPath = await processor['fileProcessor'].findProblemByNumber(parseInt(problemNumber));
        if (problemPath) {
          await processor.processSingleProblem(problemPath, options);
        } else {
          console.log(`❌ 문제 번호 ${problemNumber}를 찾을 수 없습니다.`);
        }
      } else if (args.includes('--all')) {
        // 모든 문제 처리
        await processor.processAllProblems(options);
      } else {
        // 사용법 출력
        console.log('📚 LeetCode 데이터 처리 도구');
        console.log();
        console.log('사용법:');
        console.log('  npm run data:process -- --problem=53        특정 문제 처리');
        console.log('  npm run data:process -- --all --force       모든 문제 처리');
        console.log('  npm run data:process -- --all --dry-run     Dry Run 모드');
        console.log();
        console.log('기타 명령어:');
        console.log('  npm run data:stats                          통계 조회');
        console.log();
        console.log('옵션:');
        console.log('  --problem=<번호>    특정 문제 번호 처리');
        console.log('  --all              모든 문제 처리');
        console.log('  --force            확인 없이 실행');
        console.log('  --dry-run          실제 저장 없이 테스트');
        console.log('  --batch-size=<n>   배치 크기 (기본: 5)');
      }
      break;
    }
    
    case 'stats':
    case 'statistics': {
      await processor.showStatistics();
      break;
    }
    
    case 'translate': {
      console.log('🌐 번역만 실행하는 기능은 아직 구현되지 않았습니다.');
      console.log('💡 대신 --dry-run 옵션을 사용해보세요.');
      break;
    }
    
    case 'sync': {
      console.log('🔄 데이터 동기화 기능은 아직 구현되지 않았습니다.');
      break;
    }
    
    case 'upload': {
      console.log('☁️  업로드만 실행하는 기능은 아직 구현되지 않았습니다.');
      break;
    }
    
    
    default: {
      console.log(`❌ 알 수 없는 명령어: ${command}`);
      console.log('💡 사용 가능한 명령어: process, stats, translate, upload, sync');
      process.exit(1);
    }
  }
}

// 프로그램 실행
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ 프로그램 실행 중 오류 발생:', error);
    process.exit(1);
  });
}

export { LeetCodeDataProcessor };