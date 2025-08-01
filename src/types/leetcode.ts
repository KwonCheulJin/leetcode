import { Difficulty, SolutionLanguage, Example } from './index.js';

export interface ProblemInfo {
  problemNumber: number;
  title: string;
  titleEnglish: string;
  difficulty: Difficulty;
  tags: string[];
  description: string;
  descriptionEnglish: string;
  constraints: string[];
  examples: Example[];
  solutionCode: string;
  solutionLanguage: SolutionLanguage;
  leetcodeUrl: string;
  githubUrl: string;
}

