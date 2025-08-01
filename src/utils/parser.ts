import { readFileSync } from 'fs';
import { Example } from '../types/index.js';

export class MarkdownParser {
  /**
   * README 파일에서 문제 제목 추출
   */
  static extractTitle(content: string): { korean: string; english: string } {
    // 한국어 제목 추출 (첫 번째 h2 태그 또는 # 헤더)
    const koreanTitleMatch = content.match(/<h2><a[^>]*>(\d+\.\s*[^<]+)<\/a><\/h2>|^#\s*(\d+\.\s*.+)$/m);
    const korean = koreanTitleMatch ? (koreanTitleMatch[1] || koreanTitleMatch[2]).trim() : '';

    // 영어 제목은 a href에서 추출 (예: "https://leetcode.com/problems/two-sum"에서 "Two Sum")
    const problemNumberMatch = korean.match(/^(\d+)\./); 
    const hrefMatch = content.match(/<a href="https:\/\/leetcode\.com\/problems\/([^"]+)">/);
    
    let english = '';
    if (problemNumberMatch && hrefMatch) {
      const problemNumber = problemNumberMatch[1];
      const slug = hrefMatch[1];
      // slug에서 영어 제목 생성 (kebab-case를 Title Case로 변환)
      const title = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      english = `${problemNumber}. ${title}`;
    }

    return { korean, english };
  }

  /**
   * 난이도 추출
   */
  static extractDifficulty(content: string): 'Easy' | 'Medium' | 'Hard' {
    const difficultyMatch = content.match(/<h3>(쉬움|중간|어려움|Easy|Medium|Hard)<\/h3>/i);
    if (difficultyMatch) {
      const difficulty = difficultyMatch[1].toLowerCase();
      if (difficulty === '쉬움' || difficulty === 'easy') return 'Easy';
      if (difficulty === '중간' || difficulty === 'medium') return 'Medium';
      if (difficulty === '어려움' || difficulty === 'hard') return 'Hard';
    }
    return 'Medium'; // 기본값
  }

  /**
   * 문제 설명 추출
   */
  static extractDescription(content: string): string {
    // HTML 태그 제거하고 텍스트만 추출
    const cleanContent = content
      .replace(/<[^>]*>/g, '') // HTML 태그 제거
      .replace(/&nbsp;/g, ' ') // &nbsp; 공백으로 변환
      .replace(/&lt;/g, '<')   // HTML 엔티티 변환
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');

    // 제목과 난이도 다음부터 제약사항 이전까지 추출
    const descriptionMatch = cleanContent.match(/(?:어려움|중간|쉬움|Hard|Medium|Easy)\s*(.*?)(?:제약사항|Constraints):/s);
    return descriptionMatch ? descriptionMatch[1].trim() : '';
  }

  /**
   * 예제 추출
   */
  static extractExamples(content: string): Example[] {
    const examples: Example[] = [];
    
    // 예시 패턴 매칭
    const exampleRegex = /예시\s*\d+.*?입력:\s*([^\n]+).*?출력:\s*([^\n]+)(?:.*?설명:\s*([^\n]+))?/gs;
    
    let match;
    while ((match = exampleRegex.exec(content)) !== null) {
      examples.push({
        input: match[1].trim(),
        output: match[2].trim(),
        explanation: match[3]?.trim()
      });
    }

    return examples;
  }

  /**
   * 제약조건 추출
   */
  static extractConstraints(content: string): string[] {
    const constraints: string[] = [];
    
    // 제약사항/제약 조건 섹션 찾기 (여러 패턴 지원)
    const constraintsPatterns = [
      /제약\s*사항.*?<ul>(.*?)<\/ul>/s,
      /제약\s*조건.*?<ul>(.*?)<\/ul>/s,
      /Constraints.*?<ul>(.*?)<\/ul>/s
    ];
    
    for (const pattern of constraintsPatterns) {
      const constraintsMatch = content.match(pattern);
      if (constraintsMatch) {
        const listItems = constraintsMatch[1].match(/<li>(.*?)<\/li>/gs);
        if (listItems) {
          listItems.forEach(item => {
            const cleanItem = item
              .replace(/<[^>]*>/g, '')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&nbsp;/g, ' ')
              .replace(/&amp;/g, '&')
              .trim();
            if (cleanItem) {
              constraints.push(cleanItem);
            }
          });
        }
        break; // 첫 번째 매치를 찾으면 중단
      }
    }

    return constraints;
  }

  /**
   * 태그 추출 (README에서 직접 추출하기 어려우므로 문제 유형으로 추정)
   */
  static extractTags(title: string, description: string): string[] {
    const tags: string[] = [];
    
    const titleLower = title.toLowerCase();
    const descriptionLower = description.toLowerCase();
    const combinedText = `${titleLower} ${descriptionLower}`;
    
    // 더 정교한 알고리즘 패턴 감지
    if (combinedText.includes('array') || combinedText.includes('배열') || 
        combinedText.includes('nums') || combinedText.includes('arr')) {
      tags.push('Array');
    }
    if (combinedText.includes('string') || combinedText.includes('문자열') ||
        combinedText.includes('character') || combinedText.includes('text')) {
      tags.push('String');
    }
    if (combinedText.includes('hash') || combinedText.includes('해시') ||
        combinedText.includes('map') || combinedText.includes('dictionary')) {
      tags.push('Hash Table');
    }
    if (combinedText.includes('two') && combinedText.includes('pointer') ||
        combinedText.includes('투 포인터') || combinedText.includes('양쪽')) {
      tags.push('Two Pointers');
    }
    if (combinedText.includes('sort') || combinedText.includes('정렬') ||
        combinedText.includes('sorted')) {
      tags.push('Sorting');
    }
    if (combinedText.includes('binary') && combinedText.includes('search') ||
        combinedText.includes('이진') && combinedText.includes('탐색')) {
      tags.push('Binary Search');
    }
    if (combinedText.includes('dynamic') || combinedText.includes('dp') ||
        combinedText.includes('동적') || combinedText.includes('프로그래밍')) {
      tags.push('Dynamic Programming');
    }
    if (combinedText.includes('greedy') || combinedText.includes('탐욕')) {
      tags.push('Greedy');
    }
    if (combinedText.includes('tree') || combinedText.includes('트리') ||
        combinedText.includes('binary tree')) {
      tags.push('Tree');
    }
    if (combinedText.includes('graph') || combinedText.includes('그래프')) {
      tags.push('Graph');
    }
    if (combinedText.includes('stack') || combinedText.includes('스택')) {
      tags.push('Stack');
    }
    if (combinedText.includes('queue') || combinedText.includes('큐')) {
      tags.push('Queue');
    }
    if (combinedText.includes('math') || combinedText.includes('수학') ||
        combinedText.includes('계산') || combinedText.includes('arithmetic')) {
      tags.push('Math');
    }
    
    return tags.length > 0 ? tags : ['Algorithm'];
  }

  /**
   * 문제 번호 추출
   */
  static extractProblemNumber(content: string): number {
    const match = content.match(/(\d+)\./);
    return match ? parseInt(match[1], 10) : 0;
  }

  /**
   * LeetCode URL 생성
   */
  static generateLeetCodeUrl(problemNumber: number, title: string): string {
    // 영어 제목에서 slug 생성 (간단한 변환)
    const slug = title
      .toLowerCase()
      .replace(/^\d+\.\s*/, '') // 번호와 점 제거
      .replace(/[^a-z0-9\s]/g, '') // 특수문자 제거
      .replace(/\s+/g, '-') // 공백을 하이픈으로
      .replace(/-+/g, '-') // 연속 하이픈 제거
      .replace(/^-|-$/g, ''); // 앞뒤 하이픈 제거
    
    return `https://leetcode.com/problems/${slug}/`;
  }
}