/**
 * 코드 포매팅 유틸리티
 */
export class CodeFormatter {
  /**
   * TypeScript/JavaScript 코드 정리 (적절한 들여쓰기 적용)
   */
  static formatCode(code: string, language: 'typescript' | 'javascript'): string {
    return this.formatWithIndentation(code);
  }

  /**
   * 코드에 적절한 들여쓰기를 적용합니다.
   */
  static formatWithIndentation(code: string): string {
    const lines = code.split('\n');
    const formattedLines: string[] = [];
    let indentLevel = 0;
    const INDENT = '  '; // 2스페이스 들여쓰기
    
    for (let line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine === '') {
        formattedLines.push('');
        continue;
      }
      
      // 닫는 중괄호가 있는 경우 들여쓰기 레벨을 먼저 감소
      if (trimmedLine.includes('}')) {
        const closingBraces = (trimmedLine.match(/}/g) || []).length;
        const openingBraces = (trimmedLine.match(/{/g) || []).length;
        indentLevel = Math.max(0, indentLevel - (closingBraces - openingBraces));
      }
      
      // 현재 들여쓰기 레벨로 줄 추가
      formattedLines.push(INDENT.repeat(indentLevel) + trimmedLine);
      
      // 여는 중괄호가 있는 경우 들여쓰기 레벨 증가
      if (trimmedLine.includes('{')) {
        const openingBraces = (trimmedLine.match(/{/g) || []).length;
        const closingBraces = (trimmedLine.match(/}/g) || []).length;
        indentLevel += (openingBraces - closingBraces);
      }
    }
    
    return formattedLines.join('\n').trim();
  }

  /**
   * 코드에서 주석 제거 (선택적)
   */
  static removeComments(code: string): string {
    return code
      .replace(/\/\*[\s\S]*?\*\//g, '') // 블록 주석 제거
      .replace(/\/\/.*$/gm, '') // 라인 주석 제거
      .replace(/^\s*\n/gm, '') // 빈 줄 제거
      .trim();
  }

  /**
   * 들여쓰기 정규화 (수업 계층별 올바른 들여쓰기 적용)
   */
  static normalizeIndentation(code: string, spaces: number = 2): string {
    // 새로운 포매팅 시스템 사용
    return this.formatWithIndentation(code);
  }

  /**
   * 기존 들여쓰기 제거 후 새로 적용
   */
  static resetAndReindent(code: string, spaces: number = 2): string {
    const lines = code.split('\n');
    const minIndent = Math.min(
      ...lines
        .filter(line => line.trim().length > 0)
        .map(line => line.match(/^\s*/)?.[0].length || 0)
    );

    // 기존 들여쓰기를 모두 제거하고 새로 적용
    const normalizedCode = lines
      .map(line => {
        if (line.trim().length === 0) return '';
        return line.slice(minIndent);
      })
      .join('\n')
      .trim();

    return this.formatWithIndentation(normalizedCode);
  }

  /**
   * 마크다운 코드 블록 생성
   */
  static createCodeBlock(code: string, language: string): string {
    return `\`\`\`${language}\n${code}\n\`\`\``;
  }
}
