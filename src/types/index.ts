export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface ProcessingOptions {
  force?: boolean;
  dryRun?: boolean;
  problemNumber?: number;
  batchSize?: number;
}

export interface ProcessingResult {
  success: boolean;
  problemNumber: number;
  message: string;
  error?: Error;
}

export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type SolutionLanguage = 'typescript' | 'javascript';