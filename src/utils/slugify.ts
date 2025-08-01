import slugify from 'slugify';

/**
 * URL slug 생성 유틸리티
 */
export class SlugGenerator {
  /**
   * 한국어 제목을 영어 slug로 변환
   */
  static createSlug(title: string, problemNumber: number): string {
    // 문제 번호와 점 제거
    const cleanTitle = title.replace(/^\d+\.\s*/, '');
    
    // 한국어 제목을 영어로 매핑 (주요 문제들)
    const titleMapping: { [key: string]: string } = {
      '최대 부분 배열': 'maximum-subarray',
      '두 수의 합': 'two-sum',
      '팰린드롬 수': 'palindrome-number',
      '로마 숫자를 정수로': 'roman-to-integer',
      '가장 긴 공통 접두사': 'longest-common-prefix',
      '유효한 괄호': 'valid-parentheses',
      '두 정렬된 연결 리스트 병합': 'merge-two-sorted-lists',
      '정렬된 배열에서 중복 제거': 'remove-duplicates-from-sorted-array',
      '요소 제거': 'remove-element',
      '문자열에서 첫 번째 출현 인덱스 찾기': 'find-the-index-of-the-first-occurrence-in-a-string',
      '주식을 사고팔기 가장 좋은 시간': 'best-time-to-buy-and-sell-stock',
      '유효한 팰린드롬': 'valid-palindrome',
      '배열 회전': 'rotate-array',
      '중복 포함': 'contains-duplicate',
      '유효한 아나그램': 'valid-anagram',
      '이진 탐색': 'binary-search'
    };

    const mappedTitle = titleMapping[cleanTitle];
    if (mappedTitle) {
      return `${problemNumber}-${mappedTitle}`;
    }

    // 매핑이 없는 경우 자동 생성
    const englishSlug = slugify(cleanTitle, {
      lower: true,
      strict: true,
      locale: 'en'
    });

    return `${problemNumber}-${englishSlug}`;
  }

  /**
   * 파일 경로에서 slug 추출
   */
  static extractSlugFromPath(problemPath: string): string {
    const pathParts = problemPath.split('/');
    const dirName = pathParts[pathParts.length - 1];
    return dirName;
  }

  /**
   * slug에서 문제 번호 추출
   */
  static extractProblemNumber(slug: string): number {
    const match = slug.match(/^(\d{4})-/);
    return match ? parseInt(match[1], 10) : 0;
  }

  /**
   * 블로그 포스팅용 slug 생성 (한국어 제목 기반)
   */
  static createBlogSlug(koreanTitle: string, problemNumber: number): string {
    const cleanTitle = koreanTitle.replace(/^\d+\.\s*/, '');
    
    // 한국어를 로마자로 변환하는 간단한 매핑
    const koreanToRoman: { [key: string]: string } = {
      '최대': 'maximum',
      '부분': 'sub',
      '배열': 'array',
      '두': 'two',
      '수': 'number',
      '합': 'sum',
      '팰린드롬': 'palindrome',
      '로마': 'roman',
      '숫자': 'number',
      '정수': 'integer',
      '가장': 'longest',
      '긴': 'long',
      '공통': 'common',
      '접두사': 'prefix',
      '유효한': 'valid',
      '괄호': 'parentheses',
      '정렬된': 'sorted',
      '연결': 'linked',
      '리스트': 'list',
      '병합': 'merge',
      '중복': 'duplicate',
      '제거': 'remove',
      '요소': 'element',
      '문자열': 'string',
      '첫': 'first',
      '번째': 'th',
      '출현': 'occurrence',
      '인덱스': 'index',
      '찾기': 'find',
      '주식': 'stock',
      '사고팔기': 'buy-sell',
      '시간': 'time',
      '회전': 'rotate',
      '포함': 'contains',
      '아나그램': 'anagram',
      '이진': 'binary',
      '탐색': 'search'
    };

    let englishTitle = cleanTitle;
    Object.entries(koreanToRoman).forEach(([korean, english]) => {
      englishTitle = englishTitle.replace(new RegExp(korean, 'g'), english);
    });

    const slug = slugify(englishTitle, {
      lower: true,
      strict: true,
      locale: 'en'
    });

    return `leetcode-${problemNumber}-${slug}`;
  }
}