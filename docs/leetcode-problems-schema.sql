-- LeetCode 문제 데이터를 위한 leetcode_problems 테이블 생성

CREATE TABLE IF NOT EXISTS leetcode_problems (
  id SERIAL PRIMARY KEY,
  problem_number INTEGER NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  title_korean VARCHAR(255) NOT NULL,
  difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  tags TEXT[],
  description_english TEXT NOT NULL,
  description_korean TEXT NOT NULL,
  constraints_english TEXT[],
  constraints_korean TEXT[],
  examples JSONB,
  solution_code TEXT NOT NULL,
  solution_language VARCHAR(50) NOT NULL,
  explanation_korean TEXT,
  approach_korean TEXT,
  time_complexity VARCHAR(100),
  space_complexity VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  leetcode_url VARCHAR(500),
  github_url VARCHAR(500),
  is_premium BOOLEAN DEFAULT false,
  acceptance_rate DECIMAL(5,2),
  submission_count INTEGER DEFAULT 0
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_leetcode_problems_number ON leetcode_problems(problem_number);
CREATE INDEX IF NOT EXISTS idx_leetcode_problems_difficulty ON leetcode_problems(difficulty);
CREATE INDEX IF NOT EXISTS idx_leetcode_problems_tags ON leetcode_problems USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_leetcode_problems_created_at ON leetcode_problems(created_at);

-- RLS (Row Level Security) 정책
ALTER TABLE leetcode_problems ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Public read access" ON leetcode_problems FOR SELECT USING (true);

-- 코멘트 추가
COMMENT ON TABLE leetcode_problems IS 'LeetCode 문제 데이터 저장 테이블';
COMMENT ON COLUMN leetcode_problems.problem_number IS 'LeetCode 문제 번호';
COMMENT ON COLUMN leetcode_problems.title IS '영어 원제';
COMMENT ON COLUMN leetcode_problems.title_korean IS '한국어 번역 제목';
COMMENT ON COLUMN leetcode_problems.difficulty IS '문제 난이도 (Easy, Medium, Hard)';
COMMENT ON COLUMN leetcode_problems.tags IS '문제 태그 배열';
COMMENT ON COLUMN leetcode_problems.description_english IS '영어 문제 설명';
COMMENT ON COLUMN leetcode_problems.description_korean IS '한국어 번역 문제 설명';
COMMENT ON COLUMN leetcode_problems.constraints_english IS '영어 제약조건 배열';
COMMENT ON COLUMN leetcode_problems.constraints_korean IS '한국어 번역 제약조건 배열';
COMMENT ON COLUMN leetcode_problems.examples IS '예제 데이터 (JSON)';
COMMENT ON COLUMN leetcode_problems.solution_code IS '해결 코드';
COMMENT ON COLUMN leetcode_problems.solution_language IS '프로그래밍 언어 (typescript, javascript)';
COMMENT ON COLUMN leetcode_problems.explanation_korean IS '한국어 코드 해설';
COMMENT ON COLUMN leetcode_problems.approach_korean IS '한국어 접근 방식 설명';
COMMENT ON COLUMN leetcode_problems.time_complexity IS '시간 복잡도';
COMMENT ON COLUMN leetcode_problems.space_complexity IS '공간 복잡도';
COMMENT ON COLUMN leetcode_problems.slug IS 'URL 슬래그 (SEO 친화적)';
COMMENT ON COLUMN leetcode_problems.leetcode_url IS 'LeetCode 문제 URL';
COMMENT ON COLUMN leetcode_problems.github_url IS 'GitHub 소스코드 URL';
COMMENT ON COLUMN leetcode_problems.is_premium IS '프리미엄 문제 여부';
COMMENT ON COLUMN leetcode_problems.acceptance_rate IS '문제 정답률';
COMMENT ON COLUMN leetcode_problems.submission_count IS '제출 횟수';