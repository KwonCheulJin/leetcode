import { readFileSync } from 'fs';
import { join } from 'path';
import { ProblemInfo } from '../types/leetcode.js';
import { TranslationResult } from './translator.js';
import { SlugGenerator } from '../utils/slugify.js';
import { CodeFormatter } from '../utils/formatter.js';

export interface BlogPostData {
  frontMatter: {
    title: string;
    titleEn: string;
    problemNumber: number;
    difficulty: string;
    tags: string[];
    leetcodeUrl: string;
    githubUrl: string;
    createdAt: string;
    slug: string;
  };
  content: string;
  markdownContent: string;
}

export class BlogGenerator {
  private templateContent: string;
  private templatePath: string;

  constructor(templatePath?: string) {
    this.templatePath = templatePath || join(process.cwd(), 'src', 'templates', 'blog-post.md');
    this.loadTemplate();
  }

  /**
   * 블로그 포스팅 생성
   */
  async generateBlogPost(
    problemInfo: ProblemInfo,
    translation: TranslationResult
  ): Promise<BlogPostData> {
    try {
      console.log(`📝 블로그 포스팅 생성 중: ${problemInfo.problemNumber}`);

      // Front Matter 데이터 생성
      const frontMatter = this.createFrontMatter(problemInfo, translation);
      
      // 템플릿 변수 데이터 준비
      const templateData = this.prepareTemplateData(problemInfo, translation);
      
      // 템플릿에 데이터 적용
      const content = this.replaceTemplateVariables(this.templateContent, templateData);
      
      // 최종 마크다운 생성 (Front Matter + Content)
      const markdownContent = this.generateFinalMarkdown(frontMatter, content);

      console.log(`✅ 블로그 포스팅 생성 완료: ${problemInfo.problemNumber}`);

      return {
        frontMatter,
        content,
        markdownContent
      };
    } catch (error) {
      console.error(`❌ 블로그 포스팅 생성 실패 (${problemInfo.problemNumber}):`, error);
      throw error;
    }
  }

  /**
   * Front Matter 생성
   */
  private createFrontMatter(problemInfo: ProblemInfo, translation: TranslationResult) {
    const slug = SlugGenerator.createBlogSlug(translation.titleKorean, problemInfo.problemNumber);
    
    return {
      title: translation.titleKorean,
      titleEn: problemInfo.titleEnglish,
      problemNumber: problemInfo.problemNumber,
      difficulty: problemInfo.difficulty,
      tags: problemInfo.tags,
      leetcodeUrl: problemInfo.leetcodeUrl,
      githubUrl: problemInfo.githubUrl,
      createdAt: new Date().toISOString(),
      slug
    };
  }

  /**
   * 템플릿 데이터 준비
   */
  private prepareTemplateData(problemInfo: ProblemInfo, translation: TranslationResult) {
    return {
      titleKorean: translation.titleKorean,
      titleEnglish: problemInfo.titleEnglish,
      problemNumber: problemInfo.problemNumber,
      difficulty: problemInfo.difficulty,
      tags: this.formatTags(problemInfo.tags),
      leetcodeUrl: problemInfo.leetcodeUrl,
      githubUrl: problemInfo.githubUrl,
      createdAt: new Date().toLocaleDateString('ko-KR'),
      problemDescriptionKorean: translation.descriptionKorean,
      problemDescriptionEnglish: problemInfo.descriptionEnglish || '영어 설명이 없습니다.',
      constraints: this.formatConstraints(translation.constraintsKorean),
      approachExplanation: translation.approach,
      language: problemInfo.solutionLanguage,
      solutionCode: this.formatSolutionCode(problemInfo.solutionCode, problemInfo.solutionLanguage),
      timeComplexity: translation.timeComplexity,
      spaceComplexity: translation.spaceComplexity,
      explanationKorean: translation.explanation,
      relatedProblems: this.generateRelatedProblems(problemInfo.tags, problemInfo.difficulty)
    };
  }

  /**
   * 태그 포매팅
   */
  private formatTags(tags: string[]): string {
    return tags.map(tag => `'${tag}'`).join(', ');
  }

  /**
   * 제약조건 포매팅
   */
  private formatConstraints(constraints: string[]): string {
    if (constraints.length === 0) return '제약조건이 없습니다.';
    
    return constraints
      .map(constraint => `- ${constraint}`)
      .join('\n');
  }

  /**
   * 솔루션 코드 포매팅
   */
  private formatSolutionCode(code: string, language: 'typescript' | 'javascript'): string {
    return CodeFormatter.formatCode(code, language);
  }

  /**
   * 관련 문제 생성 (간단한 버전)
   */
  private generateRelatedProblems(tags: string[], difficulty: string): string {
    // TODO: 실제로는 데이터베이스에서 유사한 문제들을 찾아야 함
    const relatedTopics = tags.slice(0, 2); // 상위 2개 태그만 사용
    
    if (relatedTopics.length === 0) {
      return '관련 문제를 찾을 수 없습니다.';
    }

    return `다음 주제들과 관련된 문제들을 더 풀어보세요: **${relatedTopics.join(', ')}**`;
  }

  /**
   * 템플릿에서 변수 치환
   */
  private replaceTemplateVariables(template: string, data: any): string {
    let result = template;

    // {{variable}} 형식의 변수들을 실제 데이터로 치환
    Object.entries(data).forEach(([key, value]) => {
      const placeholder = new RegExp(`{{${key}}}`, 'g');
      const safeValue = this.escapeMarkdown(String(value));
      result = result.replace(placeholder, safeValue);
    });

    // 치환되지 않은 변수들 처리 (기본값 또는 제거)
    result = result.replace(/{{[^}]+}}/g, '');

    return result;
  }

  /**
   * 마크다운 이스케이프 처리
   */
  private escapeMarkdown(text: string): string {
    // 기본적인 마크다운 이스케이프 (필요에 따라 확장)
    return text
      .replace(/\|/g, '\\|') // 테이블 파이프 이스케이프
      .trim();
  }

  /**
   * 최종 마크다운 생성 (Front Matter + Content)
   */
  private generateFinalMarkdown(frontMatter: any, content: string): string {
    // YAML Front Matter 생성
    const yamlFrontMatter = this.generateYamlFrontMatter(frontMatter);
    
    return `---\n${yamlFrontMatter}\n---\n\n${content}`;
  }

  /**
   * YAML Front Matter 생성
   */
  private generateYamlFrontMatter(frontMatter: any): string {
    const yamlLines: string[] = [];
    
    Object.entries(frontMatter).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        yamlLines.push(`${key}: [${value.map(v => `'${v}'`).join(', ')}]`);
      } else if (typeof value === 'string') {
        yamlLines.push(`${key}: '${value.replace(/'/g, "''")}'`); // YAML 문자열 이스케이프
      } else {
        yamlLines.push(`${key}: ${value}`);
      }
    });

    return yamlLines.join('\n');
  }

  /**
   * 템플릿 로드
   */
  private loadTemplate(): void {
    try {
      this.templateContent = readFileSync(this.templatePath, 'utf-8');
      console.log(`✅ 템플릿 로드 완료: ${this.templatePath}`);
    } catch (error) {
      console.error(`❌ 템플릿 로드 실패 (${this.templatePath}):`, error);
      // 기본 템플릿 사용
      this.templateContent = this.getDefaultTemplate();
    }
  }

  /**
   * 기본 템플릿 (템플릿 파일이 없을 경우)
   */
  private getDefaultTemplate(): string {
    return `# {{titleKorean}}

## 문제 설명

{{problemDescriptionKorean}}

## 해결 방법

### 접근 방식

{{approachExplanation}}

### 코드 구현

\`\`\`{{language}}
{{solutionCode}}
\`\`\`

### 복잡도 분석

- **시간 복잡도**: {{timeComplexity}}
- **공간 복잡도**: {{spaceComplexity}}

## 설명

{{explanationKorean}}

---

_이 문제는 [LeetCode {{problemNumber}}]({{leetcodeUrl}})에서 확인할 수 있습니다._`;
  }

  /**
   * 새로운 템플릿 경로 설정
   */
  setTemplatePath(templatePath: string): void {
    this.templatePath = templatePath;
    this.loadTemplate();
  }

  /**
   * 현재 템플릿 내용 반환
   */
  getTemplateContent(): string {
    return this.templateContent;
  }

  /**
   * 구조화된 데이터 생성 (데이터 처리 시스템용)
   */
  async generateStructuredData(
    problemInfo: ProblemInfo,
    translation: TranslationResult
  ): Promise<{
    description: string;
    slug: string;
    tags: string[];
    difficulty: string;
    title: string;
    titleKorean: string;
  }> {
    const slug = SlugGenerator.createBlogSlug(translation.titleKorean, problemInfo.problemNumber);
    
    return {
      description: translation.descriptionKorean,
      slug,
      tags: problemInfo.tags,
      difficulty: problemInfo.difficulty,
      title: problemInfo.titleEnglish,
      titleKorean: translation.titleKorean
    };
  }
}