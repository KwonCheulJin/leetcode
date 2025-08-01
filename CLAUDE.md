# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 지침을 제공합니다.

## 저장소 개요

이것은 [LeetHub v3](https://github.com/raphaelheinz/LeetHub-3.0)로 관리되는 LeetCode 문제 해결 저장소입니다. 주로 TypeScript와 JavaScript로 작성된 알고리즘 솔루션이 문제 번호와 이름으로 구성되어 있습니다.

**현재 프로젝트 목표**: LeetCode 문제 해결 후 자동으로 번역된 문제 설명과 해결 코드를 Supabase에 저장하는 시스템을 구축합니다. 블로그 관련 기능은 [jin-blog](https://github.com/KwonCheulJin/jin-blog) 프로젝트에서 이어서 작업됩니다.

## 주요 명령어

### 번역 스크립트

- `npm run translate` - 스마트 감지 시스템을 사용하여 모든 README.md 파일을 한국어로 번역
- `npm run translate:file <파일경로>` - 개별 파일을 번역 (예: `npm run translate:file TRANSLATION_SYSTEM.md`)
- `npm run translate:file <파일경로> -- --force` - 메타데이터 무시하고 강제 번역
- `npm run translate:changed` - 마지막 커밋에서 변경된 README 파일만 번역

### 데이터 처리 스크립트 (신규)

- `npm run data:process` - 전체 LeetCode 문제를 번역하여 Supabase에 저장
- `npm run data:process -- --problem <문제번호>` - 특정 문제만 처리 (예: `npm run data:process -- --problem 0053-maximum-subarray`)
- `npm run data:translate` - 문제 설명만 번역
- `npm run data:upload` - 번역된 데이터를 Supabase에 업로드
- `npm run data:sync` - 로컬 변경사항과 Supabase 데이터 동기화

### 테스트 스크립트

- `npm test` - 번역 시스템 통합 테스트 실행
- `npm run test:run` - 번역 시스템 통합 테스트 실행 (별칭)
- `npm run test:data` - 데이터 처리 시스템 테스트 실행
- `npm run test:setup` - 테스트 환경 설정만 실행
- `npm run test:cleanup` - 테스트 환경 정리
- `npm run type-check` - TypeScript 타입 검사

## 코드 아키텍처

### 디렉토리 구조

```
leetcode/
├── CLAUDE.md                    # Claude Code 작업 가이드
├── README.md                    # 프로젝트 소개
├── TRANSLATION_SYSTEM.md       # 번역 시스템 문서
├── package.json                 # 의존성 및 스크립트
├── .env                        # 환경 변수 (Supabase, OpenAI API 키)
├── app/                        # 번역 시스템 코어
│   ├── completion.ts
│   ├── translateREADME.ts
│   └── translateSingle.ts
├── src/                        # 데이터 처리 시스템 (신규)
│   ├── index.ts               # 메인 실행 파일
│   ├── types/
│   │   ├── index.ts          # 공통 타입 정의
│   │   ├── leetcode.ts       # LeetCode 관련 타입
│   │   └── supabase.ts       # Supabase 관련 타입
│   ├── services/
│   │   ├── translator.ts      # 번역 서비스
│   │   ├── supabase.ts       # Supabase 클라이언트
│   │   └── fileProcessor.ts  # 파일 처리 서비스
│   ├── utils/
│   │   ├── parser.ts         # README 파싱 유틸리티
│   │   ├── formatter.ts      # 데이터 포매터
│   │   └── slugify.ts        # URL slug 생성
│   └── config/
│       └── constants.ts      # 상수 정의
├── test/                      # 테스트 파일들
├── {문제번호}-{kebab-case-제목}/  # LeetCode 문제 디렉토리들
│   ├── 솔루션파일.js/.ts
│   ├── README.md             # 한국어 번역본
│   ├── README.en.md          # 영어 원본
│   └── README.md.meta.json   # 번역 메타데이터
└── stats.json                # 문제 해결 통계
```

### 솔루션 파일

- TypeScript (`.ts`) 또는 JavaScript (`.js`)로 구현
- LeetCode 함수 시그니처 규칙 준수
- TypeScript 솔루션은 적절한 타입 어노테이션 포함

## 데이터 처리 시스템 (신규)

이 시스템은 LeetCode 문제를 번역하고 구조화하여 Supabase에 저장하는 것에 집중합니다. 블로그 관련 기능은 [jin-blog](https://github.com/KwonCheulJin/jin-blog) 프로젝트에서 담당합니다.

### 환경 설정

#### .env 파일

```env
# Supabase 설정
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# 번역 API 설정
OPENAI_API_KEY=your_openai_api_key

# GitHub 설정 (선택사항)
GITHUB_TOKEN=your_github_token
GITHUB_REPO=KwonCheulJin/leetcode
```

#### 필요한 의존성

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "openai": "^4.20.0",
    "marked": "^11.0.0",
    "gray-matter": "^4.0.3",
    "slugify": "^1.6.6",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/marked": "^6.0.0",
    "@types/slugify": "^1.1.2",
    "typescript": "^5.0.0",
    "ts-node": "^10.9.0"
  }
}
```

### Supabase 데이터베이스 스키마

#### leetcode_problems 테이블 (신규)

```sql
CREATE TABLE leetcode_problems (
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
CREATE INDEX idx_leetcode_problems_number ON leetcode_problems(problem_number);
CREATE INDEX idx_leetcode_problems_difficulty ON leetcode_problems(difficulty);
CREATE INDEX idx_leetcode_problems_tags ON leetcode_problems USING GIN(tags);
CREATE INDEX idx_leetcode_problems_created_at ON leetcode_problems(created_at);

-- RLS (Row Level Security) 정책
ALTER TABLE leetcode_problems ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON leetcode_problems FOR SELECT USING (true);
```

### 핵심 서비스

#### 1. 파일 처리 서비스 (`services/fileProcessor.ts`)

**역할**: LeetCode 문제 디렉토리에서 필요한 정보를 추출하고 구조화하는 핵심 서비스

**주요 기능**:

- 문제 디렉토리 스캔 및 파일 목록 수집
- README.md와 README.en.md 파싱하여 문제 정보 추출
- 솔루션 코드 파일 (.ts/.js) 읽기 및 분석
- 메타데이터 (난이도, 태그, 제약조건) 파싱
- 파일 경로 및 URL 생성

```typescript
export interface ProblemInfo {
  problemNumber: number;
  title: string;
  titleEnglish: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  description: string;
  descriptionEnglish: string;
  constraints: string[];
  examples: Example[];
  solutionCode: string;
  solutionLanguage: 'typescript' | 'javascript';
  leetcodeUrl: string;
  githubUrl: string;
}

export class FileProcessor {
  async readLeetCodeProblem(problemPath: string): Promise<ProblemInfo> {
    // 1. 디렉토리 내 파일 목록 확인
    // 2. README.md 또는 README.en.md 파싱
    // 3. 솔루션 파일 읽기 및 언어 감지
    // 4. 메타데이터 추출 및 구조화
    // 5. URL 생성 (LeetCode, GitHub)
  }

  async extractProblemInfo(
    readmeContent: string
  ): Promise<Partial<ProblemInfo>> {
    // 정규식을 사용하여 문제 정보 파싱
    // - 제목 추출 (# 제목)
    // - 난이도 추출
    // - 예제 파싱 (Input/Output)
    // - 제약조건 파싱
    // - 태그 추출
  }

  async readSolutionCode(
    problemPath: string
  ): Promise<{ code: string; language: string }> {
    // .ts 또는 .js 파일 찾기
    // 코드 내용 읽기
    // 언어 타입 결정
    // 코드 정리 (주석 제거 옵션)
  }

  async scanAllProblems(): Promise<string[]> {
    // 모든 문제 디렉토리 스캔
    // 정규식으로 문제 번호 형식 매칭 (예: /^\d{4}-/)
    // 정렬된 문제 목록 반환
  }
}
```

#### 2. 번역 서비스 (`services/translator.ts`)

**역할**: OpenAI API를 활용하여 영어 문제를 자연스러운 한국어로 번역하고 코드 설명을 생성

**주요 기능**:

- 문제 설명의 정확한 번역 (기술 용어 보존)
- 문제 제목 번역
- 코드 해설 생성 (알고리즘 접근법, 시간/공간 복잡도 분석)
- 번역 품질 검증 및 후처리
- 캐싱을 통한 중복 번역 방지

```typescript
export interface TranslationResult {
  titleKorean: string;
  descriptionKorean: string;
  constraintsKorean: string[];
  explanation: string;
  approach: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export class Translator {
  private openai: OpenAI;
  private cache: Map<string, TranslationResult> = new Map();

  async translateProblemDescription(englishText: string): Promise<string> {
    // OpenAI GPT를 사용한 문제 설명 번역
    // 프롬프트 엔지니어링:
    // - 기술 용어는 영어 그대로 유지
    // - 자연스러운 한국어 문체
    // - 예제 형식 보존
    // - 수학 표기법 유지
  }

  async translateTitle(englishTitle: string): Promise<string> {
    // 간결하면서도 의미를 정확히 전달하는 제목 번역
    // 한국어 기술 문서 제목 관례 적용
  }

  async generateExplanation(
    code: string,
    problemDescription: string
  ): Promise<string> {
    // 코드 분석을 통한 상세한 한국어 해설 생성
    // - 알고리즘 접근법 설명
    // - 핵심 아이디어 요약
    // - 코드 라인별 설명 (필요시)
    // - 최적화 포인트 언급
  }

  async analyzeComplexity(
    code: string,
    problemType: string
  ): Promise<{ time: string; space: string }> {
    // 코드 분석을 통한 시간/공간 복잡도 자동 계산
    // Big O 표기법으로 결과 반환
  }

  private async validateTranslation(
    original: string,
    translated: string
  ): Promise<boolean> {
    // 번역 품질 검증
    // - 길이 비교 (너무 짧거나 긴 번역 체크)
    // - 기술 용어 누락 확인
    // - 의미 보존 여부 검증
  }
}
```

#### 3. Supabase 서비스 (`services/supabase.ts`)

**역할**: Supabase 데이터베이스와의 모든 상호작용을 담당하는 데이터 레이어

**주요 기능**:

- LeetCode 문제 데이터 CRUD 작업
- 중복 데이터 확인 및 관리
- 배치 작업 지원
- 에러 처리 및 재시도 로직
- 데이터 백업 및 복원

```typescript
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

export class SupabaseService {
  private client: SupabaseClient;

  async saveProblem(problemData: LeetCodeProblemRecord): Promise<{id: number, success: boolean}> {
    // 1. 중복 검사 (problem_number 기준)
    // 2. 데이터 유효성 검증
    // 3. INSERT 또는 UPDATE 실행
    // 4. 결과 반환 및 에러 처리
  }

  async checkExistingProblem(problemNumber: number): Promise<LeetCodeProblemRecord | null> {
    // problem_number로 기존 문제 존재 여부 확인
    // 업데이트가 필요한지 판단하기 위한 메타데이터 비교
  }

  async updateProblem(id: number, problemData: Partial<LeetCodeProblemRecord>): Promise<boolean> {
    // 기존 문제 데이터 업데이트
    // updated_at 자동 갱신
    // 변경 이력 로깅
  }

  async batchInsertProblems(problems: LeetCodeProblemRecord[]): Promise<{success: number, failed: number}> {
    // 여러 문제 일괄 삽입
    // 트랜잭션 처리
    // 부분 실패 시 롤백 또는 계속 진행 옵션
  }

  async getAllProblems(filters?: {difficulty?: string, tags?: string[]}): Promise<LeetCodeProblemRecord[]> {
    // 저장된 모든 문제 조회
    // 필터링 및 정렬 옵션
    // 페이지네이션 지원
  }

  async deleteProblem(problemNumber: number): Promise<boolean> {
    // 문제 데이터 삭제 (소프트 삭제 옵션)
    // 관련 데이터 정리
  }

  async getProblemsForBlog(): Promise<LeetCodeProblemRecord[]> {
    // jin-blog 프로젝트에서 사용할 데이터 조회
    // 블로그에 필요한 형태로 데이터 구조화
  }

  private async handleDatabaseError(error: any): Promise<void> {
    // 데이터베이스 에러 로깅 및 처리
    // 재시도 로직 구현
    // 사용자 친화적 에러 메시지 생성
  }

  async healthCheck(): Promise<boolean> {
    // 데이터베이스 연결 상태 확인
    // 테이블 스키마 검증
  }
}베이스 에러 로깅 및 처리
    // 재시도 로직 구현
    // 사용자 친화적 에러 메시지 생성
  }

  async healthCheck(): Promise<boolean> {
    // 데이터베이스 연결 상태 확인
    // 테이블 스키마 검증
  }
}
```

### 추가 타입 정의

#### `types/index.ts` - 공통 타입

```typescript
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
```

#### `types/leetcode.ts` - LeetCode 관련 타입

```typescript
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type SolutionLanguage = 'typescript' | 'javascript';

export interface LeetCodeProblem {
  id: number;
  title: string;
  titleSlug: string;
  difficulty: Difficulty;
  tags: string[];
  isPaidOnly: boolean;
  url: string;
}
```

#### `types/supabase.ts` - Supabase 관련 타입

```typescript
export interface Database {
  public: {
    Tables: {
      posts: {
        Row: PostRecord;
        Insert: Omit<PostRecord, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<PostRecord, 'id' | 'created_at'>>;
      };
    };
  };
}
```

#### `templates/blog-post.md`

````markdown
---
title: '{{titleKorean}}'
titleEn: '{{titleEnglish}}'
problemNumber: { { problemNumber } }
difficulty: '{{difficulty}}'
tags: [{ { tags } }]
leetcodeUrl: '{{leetcodeUrl}}'
githubUrl: '{{githubUrl}}'
createdAt: '{{createdAt}}'
---

# {{titleKorean}}

## 문제 설명

{{problemDescriptionKorean}}

### 원문 (English)

{{problemDescriptionEnglish}}

## 제약 조건

{{constraints}}

## 해결 방법

### 접근 방식

{{approachExplanation}}

### 코드 구현

```{{language}}
{{solutionCode}}
```
````

### 복잡도 분석

- **시간 복잡도**: {{timeComplexity}}
- **공간 복잡도**: {{spaceComplexity}}

## 설명

{{explanationKorean}}

## 관련 문제

{{relatedProblems}}

---

_이 문제는 [LeetCode {{problemNumber}}]({{leetcodeUrl}})에서 확인할 수 있습니다._

````

## 스마트 번역 시스템 (기존)

`app/` 디렉토리에는 개선된 자동 번역 시스템이 포함되어 있습니다:

### 핵심 파일

- `completion.ts` - OpenAI API 통합 및 응답 검증
- `translateREADME.ts` - 메인 번역 로직:
  - SHA256 해시 기반 변경 감지
  - 메타데이터 추적으로 재번역 지원
  - 병렬 처리 및 재시도 로직
  - 루트 README.md 제외
- `translateSingle.ts` - 개별 파일 번역 로직:
  - 단일 파일 처리에 최적화
  - 상세한 로깅 및 진행 상황 표시
  - 강제 번역 모드 지원

### 테스트 파일

- `test/translationTest.ts` - 번역 시스템 통합 테스트:
  - TypeScript로 작성된 포괄적 테스트 스위트
  - 초기 번역, 변경 감지, 재번역 시나리오 검증
  - 자동화된 테스트 결과 보고서 생성
  - 성능 및 안정성 측정

### 추적 시스템

- `stats.json` - 난이도별 해결된 문제 추적 및 파일 해시 관리
- LeetHub 통합으로 자동 업데이트

## 개발 패턴

### 문제 해결 접근법

- 알고리즘 효율성에 중점
- 공통 패턴: 해시 테이블, 투 포인터, 동적 프로그래밍, 스택
- 반복적 및 함수형 프로그래밍 스타일 모두 사용

### 파일 명명 규칙

- LeetCode URL 구조 따름: `{번호}-{kebab-case-제목}`
- 솔루션 파일은 디렉토리 이름과 일치

## 실행 워크플로우

### 데이터 처리 워크플로우

#### 1. 단일 문제 처리
```bash
npm run data:process -- --problem 0053-maximum-subarray
````

#### 2. 전체 문제 일괄 처리

```bash
npm run data:process -- --all
```

#### 3. 번역만 실행

```bash
npm run data:translate -- --problem 0053-maximum-subarray
```

#### 4. Supabase 업로드만 실행

```bash
npm run data:upload -- --problem 0053-maximum-subarray
```

#### 5. 데이터 동기화

```bash
npm run data:sync  # 로컬 변경사항과 Supabase 동기화
```

### 기존 번역 시스템

#### 자동 실행 (GitHub Actions)

다음의 경우 자동으로 실행됩니다:

- main 브랜치에 README.md 파일 푸시
- app/ 디렉토리의 TypeScript 파일 변경
- 설정 파일 업데이트

#### 수동 실행

```bash
# 전체 번역
npm run translate        # 모든 파일에 대해 번역 실행

# 개별 파일 번역
npm run translate:file <파일경로>                    # 개별 파일 번역
npm run translate:file TRANSLATION_SYSTEM.md        # 예시: 특정 파일 번역
npm run translate:file README.md -- --force         # 강제 번역 모드

# 통합 테스트
npm test                 # 전체 번역 시스템 테스트 실행
npm run test:setup       # 테스트 환경만 생성
npm run test:cleanup     # 테스트 환경 정리
```

## 에러 처리 및 로깅

### 로그 레벨

- `INFO`: 일반적인 처리 과정
- `WARN`: 경고 (번역 실패, 중복 데이터 등)
- `ERROR`: 오류 (API 실패, DB 연결 오류 등)

### 에러 처리 전략

1. **번역 실패**: 재시도 로직 (최대 3회)
2. **Supabase 연결 실패**: 지수 백오프 재시도
3. **파일 읽기 실패**: 명확한 에러 메시지 출력

## Claude Code 작업 전 필수 준비사항

### 1. 프로젝트 초기 설정

#### TypeScript 설정 (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "allowJs": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/types/*": ["src/types/*"],
      "@/services/*": ["src/services/*"],
      "@/utils/*": ["src/utils/*"]
    }
  },
  "include": ["src/**/*", "app/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

#### 환경 변수 템플릿 (`.env.example`)

```env
# Supabase 설정 (필수)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# OpenAI API 설정 (필수)
OPENAI_API_KEY=sk-your_openai_api_key_here

# GitHub 설정 (선택사항)
GITHUB_TOKEN=ghp_your_github_token_here
GITHUB_REPO=KwonCheulJin/leetcode

# 블로그 설정 (jin-blog 프로젝트에서 사용)
BLOG_BASE_URL=https://your-blog.com
AUTHOR_NAME=Your Name
AUTHOR_EMAIL=your-email@example.com

# 처리 옵션
MAX_CONCURRENT_TRANSLATIONS=3
TRANSLATION_RETRY_COUNT=3
BATCH_PROCESSING_SIZE=10

# 로깅 설정
LOG_LEVEL=info
LOG_FILE_PATH=logs/blog-automation.log
```

### 2. package.json 스크립트 전체 구성

#### 추가 필요한 scripts 섹션

```json
{
  "scripts": {
    "dev": "ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "type-check": "tsc --noEmit",

    "data:process": "ts-node src/index.ts process",
    "data:process:single": "ts-node src/index.ts process --problem",
    "data:translate": "ts-node src/index.ts translate",
    "data:upload": "ts-node src/index.ts upload",
    "data:sync": "ts-node src/index.ts sync",

    "db:setup": "ts-node src/scripts/setupDatabase.ts",
    "db:migrate": "ts-node src/scripts/migrate.ts",
    "db:seed": "ts-node src/scripts/seedData.ts",

    "test:data": "jest src/**/*.test.ts",
    "test:integration": "jest src/tests/integration/**/*.test.ts",
    "test:unit": "jest src/tests/unit/**/*.test.ts",

    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix",
    "format": "prettier --write src/**/*.ts"
  }
}
```

### 3. 프로젝트 구조 보완

#### 추가 필요한 디렉토리

```
├── src/
│   ├── scripts/               # 데이터베이스 설정 및 마이그레이션
│   │   ├── setupDatabase.ts
│   │   ├── migrate.ts
│   │   └── seedData.ts
│   ├── tests/                 # 테스트 파일들
│   │   ├── unit/
│   │   ├── integration/
│   │   └── fixtures/          # 테스트용 샘플 데이터
│   ├── middleware/            # 에러 처리, 로깅 미들웨어
│   │   ├── errorHandler.ts
│   │   ├── logger.ts
│   │   └── rateLimiter.ts
│   └── cli/                   # CLI 명령어 처리
│       ├── commands/
│       └── index.ts
├── logs/                      # 로그 파일 저장소
├── docs/                      # 추가 문서
│   ├── API.md
│   ├── TROUBLESHOOTING.md
│   └── DEPLOYMENT.md
└── .github/
    └── workflows/
        └── blog-automation.yml   # GitHub Actions
```

### 4. 데이터베이스 설정 스크립트 (`src/scripts/setupDatabase.ts`)

```typescript
// Supabase 테이블 자동 생성 및 초기 설정
import { createClient } from '@supabase/supabase-js';

export async function setupDatabase() {
  // 1. posts 테이블 생성
  // 2. 인덱스 생성
  // 3. RLS 정책 설정
  // 4. 초기 데이터 시드
}
```

### 5. CLI 인터페이스 구성

#### 명령어 구조 계획

```bash
# 기본 사용법
npm run data:process              # 모든 문제 처리
npm run data:process -- --problem 53  # 특정 문제만 처리
npm run data:process -- --dry-run     # 실제 저장 없이 테스트
npm run data:process -- --force       # 기존 데이터 덮어쓰기

# 개별 작업
npm run data:translate -- --problem 53
npm run data:upload -- --problem 53

# 관리 작업
npm run db:setup                  # 데이터베이스 초기 설정
npm run data:sync                 # 로컬과 Supabase 데이터 동기화
```

### 6. 로깅 및 모니터링 시스템

#### 로그 레벨 및 형식 정의

```typescript
export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  problemNumber?: number;
  action?: string;
  duration?: number;
  error?: Error;
}
```

### 7. 에러 처리 전략

#### 에러 타입 정의 및 복구 전략

```typescript
export class BlogAutomationError extends Error {
  constructor(
    message: string,
    public code: string,
    public problemNumber?: number,
    public retryable: boolean = false
  ) {
    super(message);
  }
}

// 에러 코드 정의
export const ERROR_CODES = {
  FILE_NOT_FOUND: 'FILE_NOT_FOUND',
  TRANSLATION_FAILED: 'TRANSLATION_FAILED',
  SUPABASE_CONNECTION_FAILED: 'SUPABASE_CONNECTION_FAILED',
  INVALID_PROBLEM_FORMAT: 'INVALID_PROBLEM_FORMAT',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
} as const;
```

### 8. 성능 최적화 고려사항

#### 동시성 제어 및 레이트 리미팅

```typescript
export interface ProcessingConfig {
  maxConcurrentTranslations: number;
  translationRetryCount: number;
  retryDelayMs: number;
  batchSize: number;
  rateLimitPerMinute: number;
}
```

### 9. 테스트 데이터 준비

#### 샘플 LeetCode 문제 디렉토리 (`src/tests/fixtures/`)

- 테스트용 README.md 파일들
- 다양한 난이도의 샘플 문제
- 에러 상황 시뮬레이션을 위한 잘못된 형식의 파일들

### 10. 개발 도구 설정

#### ESLint 설정 (`.eslintrc.js`)

#### Prettier 설정 (`.prettierrc`)

#### Jest 설정 (`jest.config.js`)

**커뮤니케이션 언어**: 이 저장소에서 작업할 때 모든 할일, 응답, 설명에 **한국어**를 사용하세요.

## 작업 가이드라인

이 코드베이스에서 작업할 때:

### 기존 시스템 유지

- 새로운 문제에 대해 기존 디렉토리 구조 유지
- `.ts` 파일에 대해 TypeScript 타이핑 규칙 준수
- 커밋하기 전에 LeetCode 예제에 대해 솔루션 테스트
- 번역 시스템의 스마트 감지 기능을 활용하여 README 파일 관리
- 타입 검사 (`npm run type-check`) 통과 확인

### 블로그 자동화 시스템 개발 우선순위

1. **파일 처리 서비스** 구현 - 기존 LeetCode 문제 구조 파싱
2. **번역 서비스** 구현 - 기존 번역 시스템과 연동
3. **Supabase 연동** 구현 - 데이터베이스 저장 및 조회 (블로그 생성은 jin-blog에서)
4. **메인 워크플로우** 통합 - 전체 프로세스 자동화
5. **에러 처리 및 로깅** 추가 - 안정성 확보

### 테스트 케이스

- 단일 문제 처리 테스트 (0053-maximum-subarray 권장)
- 번역 품질 검증
- Supabase 저장/조회 테스트
- 에러 상황 처리 테스트

## 추가 고려사항

### 성능 최적화

- 병렬 처리로 여러 문제 동시 번역
- 번역 결과 캐싱
- Supabase 배치 삽입

### 확장성

- 다른 프로그래밍 언어 지원 (Python, Java, C++ 등)
- 다른 온라인 저지 플랫폼 지원
- 블로그 플랫폼 연동 (예: Notion, Tistory)

### 품질 관리

- 번역 품질 검증 로직
- 코드 분석 및 복잡도 자동 계산
- 중복 제거 및 데이터 무결성 체크

자세한 번역 시스템 내용은 `TRANSLATION_SYSTEM.md`를 참조하세요.
