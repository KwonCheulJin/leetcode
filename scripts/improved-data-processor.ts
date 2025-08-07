#!/usr/bin/env tsx

import { config } from 'dotenv';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { createClient } from '@supabase/supabase-js';

config();

interface ExtractedData {
  title?: string;
  titleKorean?: string;
  difficulty?: string;
  description?: string;
  descriptionKorean?: string;
  constraints?: string[];
  constraintsKorean?: string[];
  examples?: any[];
}

class ImprovedDataProcessor {
  private client;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    this.client = createClient(supabaseUrl, supabaseKey);
  }

  /**
   * HTML 형식의 README 파싱
   */
  parseHtmlReadme(content: string, language: 'korean' | 'english'): ExtractedData {
    const data: ExtractedData = {};

    // 제목 추출
    const titleMatch = content.match(/<h2><a[^>]*>([^<]+)<\/a><\/h2>/);
    if (titleMatch) {
      if (language === 'korean') {
        data.titleKorean = titleMatch[1].trim();
      } else {
        data.title = titleMatch[1].trim();
      }
    }

    // 난이도 추출
    const difficultyMatch = content.match(/<h3>(쉬움|중간|어려움|Easy|Medium|Hard)<\/h3>/);
    if (difficultyMatch) {
      const difficulty = difficultyMatch[1];
      switch (difficulty) {
        case '쉬움':
        case 'Easy':
          data.difficulty = 'Easy';
          break;
        case '중간':
        case 'Medium':
          data.difficulty = 'Medium';
          break;
        case '어려움':
        case 'Hard':
          data.difficulty = 'Hard';
          break;
      }
    }

    // 설명 추출 (문제 설명 부분만, 예제는 제외)
    const descriptionMatch = content.match(/<h3>[^<]*<\/h3><hr>(.*?)(?=<p[^>]*class[^>]*example|<p[^>]*><strong[^>]*class[^>]*example|<p[^>]*><strong[^>]*>예제)/s);
    if (descriptionMatch) {
      let description = descriptionMatch[1]
        .replace(/<[^>]*>/g, '') // HTML 태그 제거
        .replace(/&nbsp;/g, ' ')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/\s+/g, ' ')
        .trim();
      
      if (language === 'korean') {
        data.descriptionKorean = description;
      } else {
        data.description = description;
      }
    }

    // 제약조건 추출
    const constraintsMatch = content.match(/<p><strong>제약\s*조건:<\/strong><\/p>[\s\S]*?<ul>(.*?)<\/ul>/s) ||
                           content.match(/<strong>제약\s*조건:<\/strong>[\s\S]*?<ul>(.*?)<\/ul>/s) ||
                           content.match(/<p><strong>Constraints:<\/strong><\/p>[\s\S]*?<ul>(.*?)<\/ul>/s) ||
                           content.match(/<strong>Constraints:<\/strong>[\s\S]*?<ul>(.*?)<\/ul>/s);

    if (constraintsMatch) {
      const constraints: string[] = [];
      const listItems = constraintsMatch[1].match(/<li>(.*?)<\/li>/gs);
      
      if (listItems) {
        listItems.forEach(item => {
          let constraint = item
            .replace(/<li>/, '')
            .replace(/<\/li>/, '')
            .replace(/<[^>]*>/g, '') // HTML 태그 제거
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .trim();

          // 수학 표기법 마크다운 변환
          constraint = this.convertMathNotation(constraint);
          
          if (constraint) {
            constraints.push(constraint);
          }
        });
      }
      
      if (language === 'korean') {
        data.constraintsKorean = constraints;
      } else {
        data.constraints = constraints;
      }
    }

    // 예제 추출
    const examples: any[] = [];
    const exampleRegex = /<(?:p[^>]*class[^>]*example|p[^>]*><strong[^>]*class[^>]*example|strong[^>]*>예제\s*\d+|strong[^>]*>Example\s*\d+)/gi;
    
    // 더 정확한 예제 패턴
    const examplePatterns = [
      // 한국어 예제: <p><strong class="example">예제 1:</strong></p>
      /<p><strong[^>]*class[^>]*example[^>]*>예제\s*(\d+):<\/strong><\/p>[\s\S]*?<pre>(.*?)<\/pre>/gs,
      // 영어 예제: <strong>Example 1:</strong>
      /<strong[^>]*>Example\s*(\d+):<\/strong>[\s\S]*?<pre>(.*?)<\/pre>/gs,
      // 한국어 변형: <strong class="example">예제 1:</strong>
      /<strong[^>]*class[^>]*example[^>]*>예제\s*(\d+):<\/strong>[\s\S]*?<pre>(.*?)<\/pre>/gs
    ];

    for (const pattern of examplePatterns) {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const exampleNumber = match[1];
        const exampleContent = match[2];
        
        const example = this.parseExampleContent(exampleContent);
        if (example.input || example.output) {
          examples.push({
            ...example,
            exampleNumber: parseInt(exampleNumber)
          });
        }
      }
    }
    
    data.examples = examples;

    return data;
  }

  /**
   * 예제 내용 파싱
   */
  parseExampleContent(content: string): any {
    const example: any = {};

    // 입력/출력/설명 패턴
    const inputMatch = content.match(/<strong>(?:입력|Input):<\/strong>\s*([^\n<]*(?:<[^>]*>[^\n<]*)*)/);
    const outputMatch = content.match(/<strong>(?:출력|Output):<\/strong>\s*([^\n<]*(?:<[^>]*>[^\n<]*)*)/);
    const explanationMatch = content.match(/<strong>(?:설명|Explanation):<\/strong>\s*([^\n<]*(?:<[^>]*>[^\n<]*)*)/);

    if (inputMatch) {
      example.input = inputMatch[1]
        .replace(/<[^>]*>/g, '')
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&amp;/g, '&')
        .trim();
    }

    if (outputMatch) {
      example.output = outputMatch[1]
        .replace(/<[^>]*>/g, '')
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&amp;/g, '&')
        .trim();
    }

    if (explanationMatch) {
      example.explanation = explanationMatch[1]
        .replace(/<[^>]*>/g, '')
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&amp;/g, '&')
        .trim();
    }

    return example;
  }

  /**
   * 수학 표기법을 마크다운 형식으로 변환
   */
  convertMathNotation(text: string): string {
    return text
      // 지수 표기법: <sup>31</sup> → ^31^
      .replace(/<sup>([^<]*)<\/sup>/g, '^$1^')
      // 하첨자 표기법: <sub>31</sub> → ~31~  
      .replace(/<sub>([^<]*)<\/sub>/g, '~$1~')
      // 2<sup>31</sup> - 1 → 2^31^ - 1
      .replace(/(\d+)\s*<sup>([^<]*)<\/sup>/g, '$1^$2^')
      // -2<sup>31</sup> → -2^31^
      .replace(/-(\d+)\s*<sup>([^<]*)<\/sup>/g, '-$1^$2^');
  }

  /**
   * 문제 번호로 디렉토리 찾기
   */
  findProblemDirectory(problemNumber: number): string | null {
    const paddedNumber = problemNumber.toString().padStart(4, '0');
    const currentDir = process.cwd();
    
    try {
      const entries = readdirSync(currentDir, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.isDirectory() && entry.name.startsWith(`${paddedNumber}-`)) {
          return join(currentDir, entry.name);
        }
      }
      
      return null;
    } catch (error) {
      console.error(`디렉토리 검색 실패 (${problemNumber}):`, error);
      return null;
    }
  }

  /**
   * 특정 ID의 문제 데이터 재처리
   */
  async reprocessProblemById(id: number): Promise<boolean> {
    try {
      // 1. 현재 데이터베이스 데이터 조회
      const { data: currentData, error: fetchError } = await this.client
        .from('leetcode_problems')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError || !currentData) {
        console.error(`❌ ID ${id}: 데이터 조회 실패`);
        return false;
      }

      const problemNumber = currentData.problem_number;
      console.log(`🔄 ID ${id} (문제 ${problemNumber}) 재처리 중...`);

      // 2. README 파일들 찾기
      const problemDir = this.findProblemDirectory(problemNumber);
      if (!problemDir) {
        console.error(`❌ ID ${id}: 문제 디렉토리를 찾을 수 없음`);
        return false;
      }

      const koreanReadmePath = join(problemDir, 'README.md');
      const englishReadmePath = join(problemDir, 'README.en.md');

      let koreanData: ExtractedData = {};
      let englishData: ExtractedData = {};

      // 3. 한국어 README 파싱
      if (existsSync(koreanReadmePath)) {
        try {
          const koreanContent = readFileSync(koreanReadmePath, 'utf-8');
          koreanData = this.parseHtmlReadme(koreanContent, 'korean');
          console.log(`  ✅ 한국어 README 파싱 완료`);
        } catch (error) {
          console.error(`  ❌ 한국어 README 파싱 실패:`, error);
        }
      }

      // 4. 영어 README 파싱
      if (existsSync(englishReadmePath)) {
        try {
          const englishContent = readFileSync(englishReadmePath, 'utf-8');
          englishData = this.parseHtmlReadme(englishContent, 'english');
          console.log(`  ✅ 영어 README 파싱 완료`);
        } catch (error) {
          console.error(`  ❌ 영어 README 파싱 실패:`, error);
        }
      }

      // 5. 업데이트할 데이터 준비
      const updateData: any = {};
      
      if (!currentData.title && englishData.title) {
        updateData.title = englishData.title;
        console.log(`  📝 title 추가: ${englishData.title}`);
      }
      
      if (!currentData.title_korean && koreanData.titleKorean) {
        updateData.title_korean = koreanData.titleKorean;
        console.log(`  📝 title_korean 추가: ${koreanData.titleKorean}`);
      }
      
      if (!currentData.description_english && englishData.description) {
        updateData.description_english = englishData.description;
        console.log(`  📝 description_english 추가 (${englishData.description.length} chars)`);
      }
      
      if (!currentData.description_korean && koreanData.descriptionKorean) {
        updateData.description_korean = koreanData.descriptionKorean;
        console.log(`  📝 description_korean 추가 (${koreanData.descriptionKorean.length} chars)`);
      }
      
      if ((!currentData.constraints_english || currentData.constraints_english.length === 0) && 
          englishData.constraints && englishData.constraints.length > 0) {
        updateData.constraints_english = englishData.constraints;
        console.log(`  📝 constraints_english 추가 (${englishData.constraints.length}개)`);
      }
      
      if ((!currentData.constraints_korean || currentData.constraints_korean.length === 0) && 
          koreanData.constraintsKorean && koreanData.constraintsKorean.length > 0) {
        updateData.constraints_korean = koreanData.constraintsKorean;
        console.log(`  📝 constraints_korean 추가 (${koreanData.constraintsKorean.length}개)`);
      }
      
      if ((!currentData.examples || currentData.examples.length === 0) && 
          (koreanData.examples?.length || englishData.examples?.length)) {
        const examples = koreanData.examples?.length ? koreanData.examples : englishData.examples;
        updateData.examples = examples;
        console.log(`  📝 examples 추가 (${examples!.length}개)`);
      }

      // 6. 데이터베이스 업데이트
      if (Object.keys(updateData).length > 0) {
        updateData.updated_at = new Date().toISOString();
        
        const { error: updateError } = await this.client
          .from('leetcode_problems')
          .update(updateData)
          .eq('id', id);

        if (updateError) {
          console.error(`❌ ID ${id}: 데이터베이스 업데이트 실패`, updateError);
          return false;
        }

        console.log(`✅ ID ${id}: 데이터 업데이트 완료`);
        return true;
      } else {
        console.log(`ℹ️ ID ${id}: 업데이트할 데이터 없음`);
        return true;
      }

    } catch (error) {
      console.error(`❌ ID ${id}: 재처리 실패`, error);
      return false;
    }
  }

  /**
   * 여러 ID들을 배치로 재처리
   */
  async reprocessMultipleIds(ids: number[]): Promise<void> {
    console.log(`🔄 ${ids.length}개 ID 재처리 시작...`);
    
    let successCount = 0;
    let failCount = 0;

    for (const id of ids) {
      const success = await this.reprocessProblemById(id);
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
      
      // 각 요청 사이에 짧은 지연
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`\n📊 재처리 결과:`);
    console.log(`  성공: ${successCount}개`);
    console.log(`  실패: ${failCount}개`);
  }
}

// 메인 실행
async function main() {
  const processor = new ImprovedDataProcessor();
  
  const targetIds = [3,4,7,9,10,11,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,34,36,38,39,41,42,44,45,46,47,48];
  
  // 배치 처리 (5개씩)
  for (let i = 0; i < targetIds.length; i += 5) {
    const batch = targetIds.slice(i, i + 5);
    console.log(`\n📦 배치 ${Math.floor(i/5) + 1}/${Math.ceil(targetIds.length/5)}: ID ${batch.join(', ')}`);
    
    await processor.reprocessMultipleIds(batch);
    
    // 배치 간 잠시 대기
    if (i + 5 < targetIds.length) {
      console.log('⏳ 배치 간 대기... (2초)');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}