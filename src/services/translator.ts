import 'dotenv/config';
import OpenAI from 'openai';
import { ProblemInfo } from '../types/leetcode.js';

export interface TranslationResult {
  titleKorean: string;
  descriptionKorean: string;
  constraintsKorean: string[];
  explanation: string;
  approach: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export class Translator {
  private openai: OpenAI;
  private cache: Map<string, TranslationResult> = new Map();

  constructor() {
    this.openai = new OpenAI();
  }

  /**
   * 전체 문제 번역 (제목, 설명, 해설 생성)
   */
  async translateProblem(problemInfo: ProblemInfo): Promise<TranslationResult> {
    const cacheKey = `${problemInfo.problemNumber}-${problemInfo.titleEnglish}`;
    
    if (this.cache.has(cacheKey)) {
      console.log(`💾 캐시에서 번역 결과 로드: ${problemInfo.problemNumber}`);
      return this.cache.get(cacheKey)!;
    }

    console.log(`🌐 문제 번역 시작: ${problemInfo.problemNumber} - ${problemInfo.titleEnglish}`);

    try {
      // 이미 한국어 번역이 있다면 그대로 사용, 없으면 번역
      const titleKorean = problemInfo.title || await this.translateTitle(problemInfo.titleEnglish);
      const descriptionKorean = problemInfo.description || await this.translateProblemDescription(problemInfo.descriptionEnglish);
      
      // 제약조건 번역
      const constraintsKorean = await this.translateConstraints(problemInfo.constraints);
      
      // 코드 해설 생성
      const explanation = await this.generateExplanation(problemInfo.solutionCode, problemInfo.descriptionEnglish);
      
      // 접근 방식 설명 생성
      const approach = await this.generateApproach(problemInfo.solutionCode, problemInfo.descriptionEnglish);
      
      // 복잡도 분석
      const complexity = await this.analyzeComplexity(problemInfo.solutionCode, problemInfo.titleEnglish);

      const result: TranslationResult = {
        titleKorean,
        descriptionKorean,
        constraintsKorean,
        explanation,
        approach,
        timeComplexity: complexity.time,
        spaceComplexity: complexity.space
      };

      this.cache.set(cacheKey, result);
      console.log(`✅ 번역 완료: ${problemInfo.problemNumber}`);
      
      return result;
    } catch (error) {
      console.error(`❌ 번역 실패 (${problemInfo.problemNumber}):`, error);
      throw error;
    }
  }

  /**
   * 문제 제목 번역
   */
  async translateTitle(englishTitle: string): Promise<string> {
    const prompt = `다음 LeetCode 문제 제목을 자연스러운 한국어로 번역해주세요. 번호는 그대로 유지하고, 기술적 용어는 적절히 한국어로 표현해주세요.

제목: "${englishTitle}"

번역 시 고려사항:
- 문제 번호는 그대로 유지
- 기술적 의미를 정확히 전달
- 자연스러운 한국어 표현 사용
- 간결하고 명확하게

번역된 제목만 반환해주세요.`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a professional translator specializing in technical content.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3
      });

      return response.choices[0].message.content?.trim() || englishTitle;
    } catch (error) {
      console.error('제목 번역 실패:', error);
      return englishTitle;
    }
  }

  /**
   * 문제 설명 번역
   */
  async translateProblemDescription(englishText: string): Promise<string> {
    if (!englishText.trim()) return '';

    const prompt = `다음 LeetCode 문제 설명을 자연스러운 한국어로 번역해주세요.

문제 설명:
${englishText}

번역 시 고려사항:
- 기술 용어는 일반적으로 사용되는 한국어 표현 사용 (예: array → 배열, string → 문자열)
- 코드 예제의 변수명과 함수명은 그대로 유지
- 자연스러운 한국어 문체로 번역
- 원문의 의미와 구조를 정확히 전달
- HTML 태그나 마크다운 형식은 제거하고 순수 텍스트로

번역된 내용만 반환해주세요.`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a professional translator specializing in technical content.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3
      });

      return response.choices[0].message.content?.trim() || englishText;
    } catch (error) {
      console.error('문제 설명 번역 실패:', error);
      return englishText;
    }
  }

  /**
   * 제약조건 번역
   */
  async translateConstraints(constraints: string[]): Promise<string[]> {
    if (constraints.length === 0) return [];

    const constraintsText = constraints.join('\n');
    const prompt = `다음 LeetCode 문제의 제약조건들을 한국어로 번역해주세요. 각 제약조건을 한 줄씩 번역해주세요.

제약조건:
${constraintsText}

번역 시 고려사항:
- 수학적 표기법과 부등호는 그대로 유지
- 변수명은 그대로 유지
- 기술적 정확성 유지
- 각 제약조건을 별도 줄로 구분

번역된 제약조건들을 한 줄씩 반환해주세요.`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a professional translator specializing in technical content.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3
      });

      const translatedText = response.choices[0].message.content?.trim() || constraintsText;
      return translatedText.split('\n').filter(line => line.trim().length > 0);
    } catch (error) {
      console.error('제약조건 번역 실패:', error);
      return constraints;
    }
  }

  /**
   * 코드 해설 생성
   */
  async generateExplanation(code: string, problemDescription: string): Promise<string> {
    const prompt = `다음 LeetCode 문제 해결 코드에 대한 상세한 한국어 해설을 작성해주세요.

문제 설명:
${problemDescription}

해결 코드:
\`\`\`
${code}
\`\`\`

해설에 포함할 내용:
1. 알고리즘의 핵심 아이디어
2. 코드의 주요 로직 설명
3. 각 단계별 동작 과정
4. 핵심 변수들의 역할
5. 왜 이 방법이 효과적인지

해설은 초보자도 이해할 수 있도록 친근하고 명확하게 작성해주세요.`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are an expert algorithm instructor who explains code clearly in Korean.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.4
      });

      return response.choices[0].message.content?.trim() || '해설을 생성할 수 없습니다.';
    } catch (error) {
      console.error('코드 해설 생성 실패:', error);
      return '해설을 생성할 수 없습니다.';
    }
  }

  /**
   * 접근 방식 설명 생성
   */
  async generateApproach(code: string, problemDescription: string): Promise<string> {
    const prompt = `다음 LeetCode 문제에 대한 해결 접근 방식을 간단명료하게 설명해주세요.

문제 설명:
${problemDescription}

해결 코드:
\`\`\`
${code}
\`\`\`

접근 방식 설명에 포함할 내용:
1. 어떤 알고리즘/자료구조를 사용했는지
2. 문제를 어떻게 분해해서 접근했는지
3. 핵심 아이디어를 한 문장으로

2-3문장으로 간결하게 설명해주세요.`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are an expert algorithm instructor who explains approaches concisely in Korean.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3
      });

      return response.choices[0].message.content?.trim() || '접근 방식을 설명할 수 없습니다.';
    } catch (error) {
      console.error('접근 방식 생성 실패:', error);
      return '접근 방식을 설명할 수 없습니다.';
    }
  }

  /**
   * 시간/공간 복잡도 분석
   */
  async analyzeComplexity(code: string, problemTitle: string): Promise<{ time: string; space: string }> {
    const prompt = `다음 알고리즘 코드의 시간 복잡도와 공간 복잡도를 Big O 표기법으로만 간단히 분석해주세요.

코드:
\`\`\`
${code}
\`\`\`

다음 형식으로 응답해주세요 (설명 없이 복잡도만):
시간: O(n)
공간: O(1)`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are an expert in algorithm complexity analysis. Provide only Big O notation without explanations.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.1
      });

      const content = response.choices[0].message.content?.trim() || '';
      const timeMatch = content.match(/시간:\s*([^\n]+)/);
      const spaceMatch = content.match(/공간:\s*([^\n]+)/);

      // 길이 제한을 위해 최대 50자까지만 사용
      const timeComplexity = timeMatch?.[1]?.trim().substring(0, 50) || 'O(n)';
      const spaceComplexity = spaceMatch?.[1]?.trim().substring(0, 50) || 'O(1)';

      return {
        time: timeComplexity,
        space: spaceComplexity
      };
    } catch (error) {
      console.error('복잡도 분석 실패:', error);
      return {
        time: 'O(n)',
        space: 'O(1)'
      };
    }
  }

  /**
   * 번역 품질 검증
   */
  private async validateTranslation(original: string, translated: string): Promise<boolean> {
    // 기본적인 품질 검증
    if (!translated || translated.trim().length === 0) return false;
    if (translated === original) return false;
    if (translated.length < original.length * 0.3) return false; // 너무 짧은 번역
    if (translated.length > original.length * 5) return false; // 너무 긴 번역

    return true;
  }

  /**
   * 캐시 초기화
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * 캐시 크기 반환
   */
  getCacheSize(): number {
    return this.cache.size;
  }
}