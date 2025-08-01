/**
 * 코드 포매팅 유틸리티
 */
export class CodeFormatter {
  /**
   * TypeScript/JavaScript 코드 정리
   */
  static formatCode(code: string, language: 'typescript' | 'javascript'): string {
    return code
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n')
      .trim();
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
   * 들여쓰기 정규화
   */
  static normalizeIndentation(code: string, spaces: number = 2): string {
    const lines = code.split('\n');
    const minIndent = Math.min(
      ...lines
        .filter(line => line.trim().length > 0)
        .map(line => line.match(/^\s*/)?.[0].length || 0)
    );

    return lines
      .map(line => {
        if (line.trim().length === 0) return '';
        return ' '.repeat(spaces) + line.slice(minIndent);
      })
      .join('\n')
      .trim();
  }

  /**
   * 마크다운 코드 블록 생성
   */
  static createCodeBlock(code: string, language: string): string {
    return `\`\`\`${language}\n${code}\n\`\`\``;
  }
}
