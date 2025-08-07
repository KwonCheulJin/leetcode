# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 지침을 제공합니다.

## 저장소 개요

이것은 [LeetHub v3](https://github.com/raphaelheinz/LeetHub-3.0)로 관리되는 LeetCode 문제 해결 저장소입니다. 주로 TypeScript와 JavaScript로 작성된 알고리즘 솔루션이 문제 번호와 이름으로 구성되어 있습니다.

**현재 프로젝트 목표**: LeetCode 문제 해결 후 자동으로 번역된 문제 설명과 해결 코드를 Supabase에 저장하는 시스템을 구축합니다.

## 주요 명령어

### 번역 스크립트

- `npm run translate` - 스마트 감지 시스템을 사용하여 모든 README.md 파일을 한국어로 번역
- `npm run translate:file <파일경로>` - 개별 파일을 번역 (예: `npm run translate:file TRANSLATION_SYSTEM.md`)
- `npm run translate:file <파일경로> -- --force` - 메타데이터 무시하고 강제 번역
- `npm run translate:changed` - 마지막 커밋에서 변경된 README 파일만 번역

### 데이터 처리 스크립트

- `npm run data:process` - 전체 LeetCode 문제를 번역하여 Supabase에 저장
- `npm run data:process -- --problem <문제번호>` - 특정 문제만 처리 (예: `npm run data:process -- --problem 53`)
- `npm run data:stats` - 저장된 문제 통계 확인

### 테스트 스크립트

- `npm test` - 번역 시스템 통합 테스트 실행
- `npm run test:run` - 번역 시스템 통합 테스트 실행 (별칭)
- `npm run test:data` - 데이터 처리 시스템 테스트 실행
- `npm run test:setup` - 테스트 환경 설정만 실행
- `npm run test:cleanup` - 테스트 환경 정리
- `npm run type-check` - TypeScript 타입 검사

### 데이터 품질 관리 스크립트

- `npm run math:check` - 수학 표기법 이슈 검사
- `npm run math:fix` - 수학 표기법 자동 수정
- `npm run html:check` - HTML 제약조건 결과 확인
- `npm run migrate:html` - HTML 제약조건으로 마이그레이션

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
├── src/                        # 데이터 처리 시스템
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
├── scripts/                   # 유지보수 스크립트
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

## 데이터 처리 시스템

이 시스템은 LeetCode 문제를 번역하고 구조화하여 Supabase에 저장하는 것에 집중합니다.

### 환경 설정

#### .env 파일

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
    "typescript": "^5.0.0",
    "ts-node": "^10.9.0"
  }
}
```

### Supabase 데이터베이스 스키마

#### leetcode_problems 테이블

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

## 스마트 번역 시스템

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
npm run data:process -- --problem=53
```

#### 2. 전체 문제 일괄 처리
```bash
npm run data:process -- --all --force
```

#### 3. 통계 확인
```bash
npm run data:stats
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

## 작업 가이드라인

이 코드베이스에서 작업할 때:

### 기존 시스템 유지

- 새로운 문제에 대해 기존 디렉토리 구조 유지
- `.ts` 파일에 대해 TypeScript 타이핑 규칙 준수
- 커밋하기 전에 LeetCode 예제에 대해 솔루션 테스트
- 번역 시스템의 스마트 감지 기능을 활용하여 README 파일 관리
- 타입 검사 (`npm run type-check`) 통과 확인

### 데이터 처리 시스템 개발 우선순위

1. **파일 처리 서비스** - 기존 LeetCode 문제 구조 파싱
2. **번역 서비스** - 기존 번역 시스템과 연동
3. **Supabase 연동** - 데이터베이스 저장 및 조회
4. **메인 워크플로우** 통합 - 전체 프로세스 자동화
5. **에러 처리 및 로깅** - 안정성 확보

### 테스트 케이스

- 단일 문제 처리 테스트 (53번 권장)
- 번역 품질 검증
- Supabase 저장/조회 테스트
- 에러 상황 처리 테스트

**커뮤니케이션 언어**: 이 저장소에서 작업할 때 모든 할일, 응답, 설명에 **한국어**를 사용하세요.

자세한 번역 시스템 내용은 `TRANSLATION_SYSTEM.md`를 참조하세요.