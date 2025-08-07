import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { LeetCodeProblemRecord, Database } from '../types/supabase.js';
import { ProblemInfo } from '../types/leetcode.js';
import { TranslationResult } from './translator.js';
import { SlugGenerator } from '../utils/slugify.js';
import { CodeFormatter } from '../utils/formatter.js';
import { MarkdownParser } from '../utils/parser.js';

export class SupabaseService {
  private client: SupabaseClient<Database>;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase 환경 변수가 설정되지 않았습니다. SUPABASE_URL과 SUPABASE_SERVICE_ROLE_KEY를 확인하세요.');
    }

    this.client = createClient<Database>(supabaseUrl, supabaseKey);
    console.log('✅ Supabase 클라이언트 초기화 완료');
  }

  /**
   * LeetCode 문제 데이터 저장 (데이터 정제 포함)
   */
  async saveProblemData(
    problemInfo: ProblemInfo,
    translation: TranslationResult
  ): Promise<{ id: number; success: boolean }> {
    try {
      console.log(`💾 데이터베이스에 저장 중: ${problemInfo.problemNumber}`);

      // 기존 문제 데이터 확인
      const existingProblem = await this.checkExistingProblem(problemInfo.problemNumber);

      // 데이터 정제
      const cleanedData = this.cleanProblemData(problemInfo, translation);

      const problemData: LeetCodeProblemRecord = {
        problem_number: problemInfo.problemNumber,
        title: problemInfo.titleEnglish,
        title_korean: cleanedData.titleKorean,
        difficulty: problemInfo.difficulty,
        tags: problemInfo.tags,
        description_english: cleanedData.descriptionEnglish,
        description_korean: cleanedData.descriptionKorean,
        constraints_english: problemInfo.constraints,
        constraints_korean: cleanedData.constraintsKorean,
        examples: cleanedData.examples,
        solution_code: cleanedData.solutionCode,
        solution_language: problemInfo.solutionLanguage,
        explanation_korean: cleanedData.explanation,
        approach_korean: cleanedData.approach,
        time_complexity: cleanedData.timeComplexity,
        space_complexity: cleanedData.spaceComplexity,
        slug: SlugGenerator.createSlug(cleanedData.titleKorean, problemInfo.problemNumber),
        leetcode_url: problemInfo.leetcodeUrl,
        github_url: problemInfo.githubUrl,
        is_premium: false,
        submission_count: 0
      };

      let result;
      
      if (existingProblem) {
        // 업데이트
        console.log(`🔄 기존 문제 데이터 업데이트: ${problemInfo.problemNumber}`);
        result = await this.updateProblem(existingProblem.id!, problemData);
        return { id: existingProblem.id!, success: true };
      } else {
        // 새로 삽입
        console.log(`➕ 새 문제 데이터 생성: ${problemInfo.problemNumber}`);
        const { data, error } = await this.client
          .from('leetcode_problems')
          .insert(problemData)
          .select('id')
          .single();

        if (error) {
          console.error('데이터베이스 삽입 오류:', error);
          throw error;
        }

        console.log(`✅ 문제 데이터 저장 완료: ID ${data.id}`);
        return { id: data.id, success: true };
      }
    } catch (error) {
      console.error(`❌ 문제 데이터 저장 실패 (${problemInfo.problemNumber}):`, error);
      throw error;
    }
  }

  /**
   * 기존 문제 데이터 확인
   */
  async checkExistingProblem(problemNumber: number): Promise<LeetCodeProblemRecord | null> {
    try {
      const { data, error } = await this.client
        .from('leetcode_problems')
        .select('*')
        .eq('problem_number', problemNumber)
        .single();

      if (error) {
        if (error.code === 'PGRST116') { // No rows found
          return null;
        }
        throw error;
      }

      return data;
    } catch (error) {
      console.error(`기존 문제 데이터 확인 실패 (${problemNumber}):`, error);
      return null;
    }
  }

  /**
   * 문제 데이터 업데이트
   */
  async updateProblem(id: number, problemData: Partial<LeetCodeProblemRecord>): Promise<boolean> {
    try {
      const { error } = await this.client
        .from('leetcode_problems')
        .update({
          ...problemData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) {
        console.error('문제 데이터 업데이트 오류:', error);
        throw error;
      }

      console.log(`✅ 문제 데이터 업데이트 완료: ID ${id}`);
      return true;
    } catch (error) {
      console.error(`문제 데이터 업데이트 실패 (ID: ${id}):`, error);
      return false;
    }
  }

  /**
   * 포스팅 업데이트 (레거시 메서드)
   */
  async updatePost(id: number, postData: Partial<PostRecord>): Promise<boolean> {
    try {
      const { error } = await this.client
        .from('leetcode_problems')
        .update({
          ...postData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) {
        console.error('포스팅 업데이트 오류:', error);
        throw error;
      }

      console.log(`✅ 포스팅 업데이트 완료: ID ${id}`);
      return true;
    } catch (error) {
      console.error(`포스팅 업데이트 실패 (ID: ${id}):`, error);
      return false;
    }
  }

  /**
   * 문제 데이터 정제 (예제 섹션 제거, HTML 태그 정제, 코드 포매팅)
   */
  private cleanProblemData(
    problemInfo: ProblemInfo,
    translation: TranslationResult
  ): TranslationResult & { 
    descriptionEnglish: string;
    examples: any[];
    solutionCode: string;
  } {
    // 1. 영어 설명에서 예제 섹션 제거
    const cleanedDescriptionEnglish = this.cleanDescriptionEnglish(problemInfo.descriptionEnglish);
    
    // 2. 한국어 설명에서 예제 섹션 제거
    const cleanedDescriptionKorean = this.cleanDescriptionKorean(translation.descriptionKorean);
    
    // 3. Examples 배열에서 HTML 태그 제거
    const cleanedExamples = this.cleanExamples(problemInfo.examples);
    
    // 4. Solution Code 포매팅
    const formattedCode = CodeFormatter.formatCode(problemInfo.solutionCode, problemInfo.solutionLanguage);
    
    return {
      ...translation,
      descriptionEnglish: cleanedDescriptionEnglish,
      descriptionKorean: cleanedDescriptionKorean,
      examples: cleanedExamples,
      solutionCode: formattedCode
    };
  }

  /**
   * 영어 설명에서 예제 섹션을 제거합니다.
   */
  private cleanDescriptionEnglish(description: string): string {
    let cleanedDescription = description;
    
    // Example 패턴들을 순차적으로 제거
    const patterns = [
      // "Example 1:" 부터 "Example 2:" 또는 "Constraints" 또는 문서 끝까지
      /\s*Example\s+\d+\s*:[^\n]*[\s\S]*?(?=\s*Example\s+\d+\s*:|Constraints\s*:|Follow\s*up\s*:|Note\s*:|$)/gi,
      
      // 남은 단독 예제들
      /\n\s*Example\s+\d+\s*:[^\n]*[\s\S]*?$/gi,
      
      // 중간에 있는 예제들 (다른 섹션 전까지)
      /\n\s*Example\s+\d+\s*:[^\n]*[\s\S]*?(?=\n\s*[A-Z][a-z]+\s*:)/gi,
      
      // 더 유연한 패턴 (공백과 줄바꿈을 고려)
      /\n\s*Example\s+\d+\s*:\s*[\s\S]*?(?=\n\s*\w+\s*:|$)/gi
    ];
    
    // 각 패턴을 순차적으로 적용
    patterns.forEach(pattern => {
      cleanedDescription = cleanedDescription.replace(pattern, '');
    });
    
    // 정리 작업
    cleanedDescription = cleanedDescription
      .replace(/\n\s*\n\s*\n+/g, '\n\n') // 연속된 줄바꿈 정리
      .replace(/\s+$/gm, '') // 각 라인 끝의 공백 제거
      .trim(); // 앞뒤 공백 제거
    
    return cleanedDescription;
  }

  /**
   * 한국어 설명에서 예제 섹션을 제거합니다.
   */
  private cleanDescriptionKorean(description: string): string {
    let cleanedDescription = description;
    
    // 한국어 예제 패턴들을 순차적으로 제거
    const patterns = [
      // "예제 1:" 또는 "예시 1:" 부터 다음 예제 또는 "제약" 또는 문서 끝까지
      /\s*예[제시]\s*\d+\s*:[^\n]*[\s\S]*?(?=\s*예[제시]\s*\d+\s*:|제약[\s\S]*?:|Follow\s*up[\s\S]*?:|참고[\s\S]*?:|$)/g,
      
      // 남은 예제 섹션들 (단독으로 존재하는 경우)
      /\n\s*예[제시]\s*\d+\s*:[\s\S]*$/g,
      
      // 중간에 있는 예제 섹션들
      /\n\s*예[제시]\s*\d+\s*:[\s\S]*?(?=\n\s*[가-힣A-Z])/g
    ];
    
    patterns.forEach(pattern => {
      cleanedDescription = cleanedDescription.replace(pattern, '');
    });
    
    // 정리 작업
    cleanedDescription = cleanedDescription
      .replace(/\n\s*\n\s*\n+/g, '\n\n') // 연속된 줄바꿈 정리
      .replace(/\s+$/gm, '') // 각 라인 끝의 공백 제거
      .trim(); // 앞뒤 공백 제거
    
    return cleanedDescription;
  }

  /**
   * Examples 배열에서 HTML 태그 제거
   */
  private cleanExamples(examples: any[]): any[] {
    if (!Array.isArray(examples)) {
      return examples;
    }
    
    return examples.map(example => {
      if (typeof example === 'object' && example !== null) {
        const cleanedExample = { ...example };
        
        // input, output, explanation 필드에서 </strong> 태그 제거
        if (typeof cleanedExample.input === 'string') {
          cleanedExample.input = cleanedExample.input.replace(/<\/strong>\s*/g, '');
        }
        if (typeof cleanedExample.output === 'string') {
          cleanedExample.output = cleanedExample.output.replace(/<\/strong>\s*/g, '');
        }
        if (typeof cleanedExample.explanation === 'string') {
          cleanedExample.explanation = cleanedExample.explanation.replace(/<\/strong>\s*/g, '');
        }
        
        return cleanedExample;
      }
      return example;
    });
  }

  /**
   * 여러 포스팅 일괄 삽입
   */
  async batchInsertPosts(
    postsData: Array<{
      problemInfo: ProblemInfo;
      translation: TranslationResult;
    }>
  ): Promise<{ success: number; failed: number }> {
    let successCount = 0;
    let failedCount = 0;

    console.log(`🔄 ${postsData.length}개 포스팅 일괄 처리 시작...`);

    for (const { problemInfo, translation } of postsData) {
      try {
        await this.saveProblemData(problemInfo, translation);
        successCount++;
        console.log(`✅ 진행률: ${successCount + failedCount}/${postsData.length}`);
      } catch (error) {
        failedCount++;
        console.error(`❌ 문제 데이터 저장 실패 (${problemInfo.problemNumber}):`, error);
      }

      // API 레이트 리밋 방지를 위한 잠시 대기
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`🎉 일괄 처리 완료: 성공 ${successCount}개, 실패 ${failedCount}개`);
    return { success: successCount, failed: failedCount };
  }

  /**
   * 모든 포스팅 조회
   */
  async getAllPosts(filters?: {
    difficulty?: string;
    tags?: string[];
    limit?: number;
    offset?: number;
  }): Promise<PostRecord[]> {
    try {
      let query = this.client
        .from('leetcode_problems')
        .select('*')
        .order('problem_number', { ascending: true });

      // 필터 적용
      if (filters?.difficulty) {
        query = query.eq('difficulty', filters.difficulty);
      }

      if (filters?.tags && filters.tags.length > 0) {
        query = query.overlaps('tags', filters.tags);
      }

      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      if (filters?.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
      }

      const { data, error } = await query;

      if (error) {
        console.error('포스팅 조회 오류:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('포스팅 조회 실패:', error);
      throw error;
    }
  }

  /**
   * 특정 문제 번호로 포스팅 조회
   */
  async getPostByProblemNumber(problemNumber: number): Promise<PostRecord | null> {
    try {
      const { data, error } = await this.client
        .from('leetcode_problems')
        .select('*')
        .eq('problem_number', problemNumber)
        .single();

      if (error) {
        if (error.code === 'PGRST116') { // No rows found
          return null;
        }
        throw error;
      }

      return data;
    } catch (error) {
      console.error(`포스팅 조회 실패 (${problemNumber}):`, error);
      return null;
    }
  }

  /**
   * 포스팅 삭제
   */
  async deletePost(problemNumber: number): Promise<boolean> {
    try {
      const { error } = await this.client
        .from('leetcode_problems')
        .delete()
        .eq('problem_number', problemNumber);

      if (error) {
        console.error('포스팅 삭제 오류:', error);
        throw error;
      }

      console.log(`✅ 포스팅 삭제 완료: ${problemNumber}`);
      return true;
    } catch (error) {
      console.error(`포스팅 삭제 실패 (${problemNumber}):`, error);
      return false;
    }
  }

  /**
   * 데이터베이스 연결 상태 확인
   */
  async healthCheck(): Promise<boolean> {
    try {
      const { data, error } = await this.client
        .from('leetcode_problems')
        .select('count(*)')
        .limit(1);

      if (error) {
        console.error('헬스 체크 실패:', error);
        return false;
      }

      console.log('✅ 데이터베이스 연결 정상');
      return true;
    } catch (error) {
      console.error('헬스 체크 오류:', error);
      return false;
    }
  }

  /**
   * 통계 정보 조회
   */
  async getStatistics(): Promise<{
    totalProblems: number;
    byDifficulty: { [key: string]: number };
    byLanguage: { [key: string]: number };
    recentProblems: PostRecord[];
  }> {
    try {
      // 전체 문제 수
      const { count: totalProblems } = await this.client
        .from('leetcode_problems')
        .select('*', { count: 'exact' });

      // 난이도별 통계
      const { data: difficultyStats } = await this.client
        .from('leetcode_problems')
        .select('difficulty')
        .order('difficulty');

      const byDifficulty: { [key: string]: number } = {};
      difficultyStats?.forEach(post => {
        byDifficulty[post.difficulty] = (byDifficulty[post.difficulty] || 0) + 1;
      });

      // 언어별 통계
      const { data: languageStats } = await this.client
        .from('leetcode_problems')
        .select('solution_language')
        .order('solution_language');

      const byLanguage: { [key: string]: number } = {};
      languageStats?.forEach(post => {
        byLanguage[post.solution_language] = (byLanguage[post.solution_language] || 0) + 1;
      });

      // 최근 문제 (최근 5개)
      const { data: recentProblems } = await this.client
        .from('leetcode_problems')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      return {
        totalProblems: totalProblems || 0,
        byDifficulty,
        byLanguage,
        recentProblems: recentProblems || []
      };
    } catch (error) {
      console.error('통계 정보 조회 실패:', error);
      throw error;
    }
  }

  /**
   * 데이터베이스 에러 처리
   */
  private async handleDatabaseError(error: any): Promise<void> {
    console.error('데이터베이스 오류:', error);
    
    // 에러 타입별 처리
    if (error.code === 'PGRST301') {
      console.error('❌ 테이블을 찾을 수 없습니다. 데이터베이스 스키마를 확인하세요.');
    } else if (error.code === '23505') {
      console.error('❌ 중복 데이터입니다. 고유 제약 조건을 확인하세요.');
    } else if (error.code === '42P01') {
      console.error('❌ 테이블이 존재하지 않습니다. 마이그레이션을 실행하세요.');
    }
  }
}