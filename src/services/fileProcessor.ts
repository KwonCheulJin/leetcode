import { readFileSync, readdirSync, existsSync, statSync } from 'fs';
import { join, extname } from 'path';
import { ProblemInfo } from '../types/leetcode.js';
import { PROBLEM_NUMBER_REGEX, SOLUTION_FILE_EXTENSIONS, LEETCODE_BASE_URL, GITHUB_BASE_URL } from '../config/constants.js';
import { MarkdownParser } from '../utils/parser.js';
import { CodeFormatter } from '../utils/formatter.js';

export class FileProcessor {
  private baseDir: string;

  constructor(baseDir: string = process.cwd()) {
    this.baseDir = baseDir;
  }

  /**
   * 모든 문제 디렉토리 스캔
   */
  async scanAllProblems(): Promise<string[]> {
    try {
      const items = readdirSync(this.baseDir);
      
      return items
        .filter(item => {
          const fullPath = join(this.baseDir, item);
          return statSync(fullPath).isDirectory() && PROBLEM_NUMBER_REGEX.test(item);
        })
        .sort(); // 문제 번호 순으로 정렬
    } catch (error) {
      console.error('문제 디렉토리 스캔 실패:', error);
      return [];
    }
  }

  /**
   * 특정 문제 디렉토리에서 문제 정보 읽기
   */
  async readLeetCodeProblem(problemPath: string): Promise<ProblemInfo | null> {
    try {
      const fullPath = join(this.baseDir, problemPath);
      
      if (!existsSync(fullPath)) {
        console.error(`디렉토리가 존재하지 않습니다: ${fullPath}`);
        return null;
      }

      // README 파일 읽기 (한국어 우선, 없으면 영어)
      const readmeContent = this.readReadmeFile(fullPath);
      if (!readmeContent) {
        console.error(`README 파일을 찾을 수 없습니다: ${fullPath}`);
        return null;
      }

      // 솔루션 코드 읽기
      const solutionInfo = this.readSolutionCode(fullPath);
      if (!solutionInfo) {
        console.error(`솔루션 파일을 찾을 수 없습니다: ${fullPath}`);
        return null;
      }

      // README에서 문제 정보 추출
      const problemInfo = this.extractProblemInfo(readmeContent);
      
      // 영어 README가 있다면 영어 설명도 읽기
      const englishDescription = this.readEnglishDescription(fullPath);

      // 문제 번호 추출
      const problemNumber = MarkdownParser.extractProblemNumber(readmeContent);
      if (problemNumber === 0) {
        console.error(`문제 번호를 추출할 수 없습니다: ${problemPath}`);
        return null;
      }

      // URL 생성
      const leetcodeUrl = this.generateLeetCodeUrl(problemNumber, problemInfo.titleEnglish);
      const githubUrl = `${GITHUB_BASE_URL}/${problemPath}`;

      return {
        problemNumber,
        title: problemInfo.title,
        titleEnglish: problemInfo.titleEnglish,
        difficulty: problemInfo.difficulty,
        tags: problemInfo.tags,
        description: problemInfo.description,
        descriptionEnglish: englishDescription,
        constraints: problemInfo.constraints,
        examples: problemInfo.examples,
        solutionCode: solutionInfo.code,
        solutionLanguage: solutionInfo.language,
        leetcodeUrl,
        githubUrl
      };
    } catch (error) {
      console.error(`문제 읽기 실패 (${problemPath}):`, error);
      return null;
    }
  }

  /**
   * README 파일 읽기 (한국어 우선)
   */
  private readReadmeFile(problemDir: string): string | null {
    const readmePaths = [
      join(problemDir, 'README.md'),
      join(problemDir, 'README.en.md')
    ];

    for (const readmePath of readmePaths) {
      if (existsSync(readmePath)) {
        try {
          return readFileSync(readmePath, 'utf-8');
        } catch (error) {
          console.error(`README 읽기 실패 (${readmePath}):`, error);
        }
      }
    }

    return null;
  }

  /**
   * 영어 설명 읽기
   */
  private readEnglishDescription(problemDir: string): string {
    const englishReadmePath = join(problemDir, 'README.en.md');
    
    if (existsSync(englishReadmePath)) {
      try {
        const content = readFileSync(englishReadmePath, 'utf-8');
        return MarkdownParser.extractDescription(content);
      } catch (error) {
        console.error(`영어 README 읽기 실패:`, error);
      }
    }

    return '';
  }

  /**
   * 솔루션 코드 파일 읽기
   */
  private readSolutionCode(problemDir: string): { code: string; language: 'typescript' | 'javascript' } | null {
    try {
      const files = readdirSync(problemDir);
      
      // TypeScript 파일 우선 검색
      for (const ext of SOLUTION_FILE_EXTENSIONS) {
        const solutionFiles = files.filter(file => 
          file.endsWith(ext) && !file.includes('README')
        );

        if (solutionFiles.length > 0) {
          const solutionFile = solutionFiles[0]; // 첫 번째 파일 사용
          const solutionPath = join(problemDir, solutionFile);
          const code = readFileSync(solutionPath, 'utf-8');
          
          return {
            code: CodeFormatter.formatCode(code, ext === '.ts' ? 'typescript' : 'javascript'),
            language: ext === '.ts' ? 'typescript' : 'javascript'
          };
        }
      }

      return null;
    } catch (error) {
      console.error(`솔루션 코드 읽기 실패:`, error);
      return null;
    }
  }

  /**
   * README 내용에서 문제 정보 추출
   */
  private extractProblemInfo(readmeContent: string): {
    title: string;
    titleEnglish: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    tags: string[];
    description: string;
    constraints: string[];
    examples: any[];
  } {
    const titles = MarkdownParser.extractTitle(readmeContent);
    const difficulty = MarkdownParser.extractDifficulty(readmeContent);
    const description = MarkdownParser.extractDescription(readmeContent);
    const constraints = MarkdownParser.extractConstraints(readmeContent);
    const examples = MarkdownParser.extractExamples(readmeContent);
    const tags = MarkdownParser.extractTags(titles.korean, description);

    return {
      title: titles.korean,
      titleEnglish: titles.english,
      difficulty,
      tags,
      description,
      constraints,
      examples
    };
  }

  /**
   * LeetCode URL 생성
   */
  private generateLeetCodeUrl(problemNumber: number, title: string): string {
    // 문제 번호를 기반으로 한 간단한 URL 생성
    // 실제로는 문제별 slug가 다를 수 있으므로 매핑 테이블이 필요할 수 있음
    const slugMapping: { [key: number]: string } = {
      1: 'two-sum',
      9: 'palindrome-number',
      13: 'roman-to-integer',
      14: 'longest-common-prefix',
      20: 'valid-parentheses',
      21: 'merge-two-sorted-lists',
      26: 'remove-duplicates-from-sorted-array',
      27: 'remove-element',
      28: 'find-the-index-of-the-first-occurrence-in-a-string',
      53: 'maximum-subarray',
      80: 'remove-duplicates-from-sorted-array-ii',
      88: 'merge-sorted-array',
      121: 'best-time-to-buy-and-sell-stock',
      125: 'valid-palindrome',
      189: 'rotate-array',
      217: 'contains-duplicate',
      242: 'valid-anagram',
      704: 'binary-search'
    };

    const slug = slugMapping[problemNumber] || `problem-${problemNumber}`;
    return `${LEETCODE_BASE_URL}/${slug}/`;
  }

  /**
   * 특정 문제 번호로 문제 찾기
   */
  async findProblemByNumber(problemNumber: number): Promise<string | null> {
    const problems = await this.scanAllProblems();
    const targetProblem = problems.find(problem => 
      problem.startsWith(problemNumber.toString().padStart(4, '0'))
    );
    
    return targetProblem || null;
  }

  /**
   * 문제 디렉토리 존재 확인
   */
  problemExists(problemPath: string): boolean {
    const fullPath = join(this.baseDir, problemPath);
    return existsSync(fullPath) && statSync(fullPath).isDirectory();
  }
}