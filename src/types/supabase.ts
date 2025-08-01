export interface LeetCodeProblemRecord {
  id?: number;
  problem_number: number;
  title: string;
  title_korean: string;
  difficulty: string;
  tags: string[];
  description_english: string;
  description_korean: string;
  constraints_english: string[];
  constraints_korean: string[];
  examples: any[];
  solution_code: string;
  solution_language: string;
  explanation_korean?: string;
  approach_korean?: string;
  time_complexity?: string;
  space_complexity?: string;
  slug: string;
  leetcode_url?: string;
  github_url?: string;
  is_premium?: boolean;
  acceptance_rate?: number;
  submission_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Database {
  public: {
    Tables: {
      leetcode_problems: {
        Row: LeetCodeProblemRecord;
        Insert: Omit<LeetCodeProblemRecord, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<LeetCodeProblemRecord, 'id' | 'created_at'>>;
      };
    };
  };
}