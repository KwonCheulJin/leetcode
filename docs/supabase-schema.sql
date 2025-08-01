-- LeetCode 블로그 포스팅을 위한 posts 테이블 생성

CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  problem_number INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  title_korean VARCHAR(255) NOT NULL,
  difficulty VARCHAR(20) NOT NULL,
  tags TEXT[],
  problem_description_english TEXT NOT NULL,
  problem_description_korean TEXT NOT NULL,
  solution_code TEXT NOT NULL,
  solution_language VARCHAR(50) NOT NULL,
  explanation_korean TEXT,
  time_complexity VARCHAR(100),
  space_complexity VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  leetcode_url VARCHAR(500),
  github_url VARCHAR(500)
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_posts_problem_number ON posts(problem_number);
CREATE INDEX IF NOT EXISTS idx_posts_difficulty ON posts(difficulty);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at);
CREATE INDEX IF NOT EXISTS idx_posts_tags ON posts USING GIN(tags);

-- 문제 번호 고유 제약 조건 추가
ALTER TABLE posts ADD CONSTRAINT unique_problem_number UNIQUE (problem_number);

-- 코멘트 추가
COMMENT ON TABLE posts IS 'LeetCode 문제 해결 블로그 포스팅 저장 테이블';
COMMENT ON COLUMN posts.problem_number IS 'LeetCode 문제 번호';
COMMENT ON COLUMN posts.title IS '영어 원제';
COMMENT ON COLUMN posts.title_korean IS '한국어 번역 제목';
COMMENT ON COLUMN posts.difficulty IS '문제 난이도 (Easy, Medium, Hard)';
COMMENT ON COLUMN posts.tags IS '문제 태그 배열';
COMMENT ON COLUMN posts.problem_description_english IS '영어 문제 설명';
COMMENT ON COLUMN posts.problem_description_korean IS '한국어 번역 문제 설명';
COMMENT ON COLUMN posts.solution_code IS '해결 코드';
COMMENT ON COLUMN posts.solution_language IS '프로그래밍 언어 (typescript, javascript)';
COMMENT ON COLUMN posts.explanation_korean IS '한국어 코드 해설';
COMMENT ON COLUMN posts.time_complexity IS '시간 복잡도';
COMMENT ON COLUMN posts.space_complexity IS '공간 복잡도';
COMMENT ON COLUMN posts.slug IS 'URL 슬래그 (SEO 친화적)';
COMMENT ON COLUMN posts.leetcode_url IS 'LeetCode 문제 URL';
COMMENT ON COLUMN posts.github_url IS 'GitHub 소스코드 URL';