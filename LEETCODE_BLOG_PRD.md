# LeetCode 자동 블로그 포스팅 시스템 PRD

## 1. 제품 개요

### 1.1 제품명

**LeetCode Auto Blog Publisher** - LeetCode 문제 해결을 자동으로 블로그에 포스팅하는 시스템

### 1.2 제품 비전

개발자가 LeetCode 문제를 해결하면, 별도의 수작업 없이 자동으로 구조화된 블로그 포스트가 생성되어 개인 블로그에 게시되는 완전 자동화 시스템을 구축한다.

### 1.3 배경 및 동기

- **현재 상황**: 40+ LeetCode 문제 해결 완료, 체계적인 저장소 관리
- **문제점**: 수동 블로그 포스팅으로 인한 시간 소모 및 일관성 부족
- **기회**: 기존 번역 시스템 인프라 활용 가능, Supabase 블로그 운영 중

## 2. 목표 및 성공 지표

### 2.1 비즈니스 목표

- **주목표**: 블로그 포스팅 자동화를 통한 콘텐츠 생산성 95% 향상
- **부목표**: SEO 최적화된 일관된 콘텐츠 품질 확보
- **장기목표**: 개발자 포트폴리오 강화 및 브랜딩 효과

### 2.2 성공 지표 (KPI)

- **효율성**: 포스팅 시간 95% 단축 (수동 30분 → 자동 1분)
- **일관성**: 포스트 품질 점수 90% 이상 (템플릿 표준화)
- **안정성**: 자동 포스팅 성공률 99% 이상
- **SEO**: 검색 노출 30% 증가 (구조화된 메타데이터)
- **사용자 경험**: 블로그 체류시간 25% 증가

## 3. 타겟 사용자

### 3.1 주요 사용자

- **1차 사용자**: 본인 (시스템 운영자)
- **2차 사용자**: 블로그 독자 (개발자, 취업 준비생)

### 3.2 사용자 페르소나

**개발자 권철진**

- LeetCode 문제를 꾸준히 해결하는 개발자
- 개인 블로그 운영을 통한 지식 공유 및 포트폴리오 구축
- 반복적인 포스팅 작업의 자동화 필요성 인식

## 4. 핵심 기능 요구사항

### 4.1 MVP (Minimum Viable Product)

#### 4.1.1 데이터 추출 및 저장

- **기능**: 기존 LeetCode 문제 데이터 자동 추출
- **세부사항**:
  - README.md 파싱하여 문제 설명 추출
  - 솔루션 코드 (.ts/.js) 자동 분석
  - Supabase 데이터베이스에 구조화된 형태로 저장
- **성공 기준**: 40+ 기존 문제 100% 정확한 데이터 추출

#### 4.1.2 자동 블로그 포스트 생성

- **기능**: 표준화된 템플릿으로 블로그 포스트 자동 생성
- **세부사항**:
  - 마크다운 형식의 포스트 생성
  - 문제 설명, 해결 접근법, 코드, 복잡도 분석 포함
  - SEO 최적화를 위한 메타데이터 자동 생성
- **성공 기준**: 모든 포스트 일관된 형식 및 완전한 내용 포함

#### 4.1.3 GitHub Actions 기반 자동화

- **기능**: 코드 푸시 시 자동 블로그 업데이트
- **세부사항**:
  - 기존 번역 워크플로우 확장
  - 변경 감지 시 자동 데이터 동기화
  - 실패 시 자동 재시도 로직
- **성공 기준**: 푸시 후 5분 내 블로그 업데이트 완료

### 4.2 고급 기능 (Phase 2)

#### 4.2.1 다국어 지원

- **기능**: 한국어/영어 버전 블로그 포스트 동시 생성
- **세부사항**: 기존 번역 시스템과 연동

#### 4.2.2 성능 분석 및 통계

- **기능**: 문제별 조회수, 인기도 추적
- **세부사항**: Supabase Analytics 연동

#### 4.2.3 소셜 미디어 연동

- **기능**: 새 포스트 자동 소셜 미디어 공유
- **세부사항**: Twitter, LinkedIn API 연동

## 5. 기술 요구사항

### 5.1 시스템 아키텍처

```
GitHub Repository (LeetCode Solutions)
    ↓ (GitHub Actions Trigger)
Data Extraction Script
    ↓ (Parsed Data)
Supabase Database
    ↓ (Structured Data)
Blog Post Generator
    ↓ (Generated Content)
Blog Platform API
    ↓ (Published Post)
End User Blog
```

### 5.2 데이터베이스 스키마

#### 5.2.1 leetcode_problems 테이블

```sql
CREATE TABLE leetcode_problems (
  id SERIAL PRIMARY KEY,
  problem_number INTEGER UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  title_slug VARCHAR(255) NOT NULL,
  difficulty VARCHAR(10) NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  description TEXT NOT NULL,
  description_ko TEXT NOT NULL,
  constraints TEXT,
  examples JSONB,
  tags VARCHAR(50)[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 5.2.2 leetcode_solutions 테이블

```sql
CREATE TABLE leetcode_solutions (
  id SERIAL PRIMARY KEY,
  problem_id INTEGER REFERENCES leetcode_problems(id),
  solution_code TEXT NOT NULL,
  language VARCHAR(20) NOT NULL,
  time_complexity VARCHAR(50),
  space_complexity VARCHAR(50),
  approach_description TEXT,
  approach_description_ko TEXT,
  file_path VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 5.2.3 blog_posts 테이블

```sql
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  problem_id INTEGER REFERENCES leetcode_problems(id),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 5.3 기술 스택

- **Backend**: Node.js, TypeScript
- **Database**: Supabase (PostgreSQL)
- **CI/CD**: GitHub Actions
- **Blog Platform**: Next.js + MDX (예상)
- **Deployment**: Vercel/Netlify

### 5.4 필요한 패키지 및 의존성

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.x",
    "cheerio": "^1.x",
    "gray-matter": "^4.x",
    "slugify": "^1.x"
  },
  "scripts": {
    "sync:blog": "tsx app/syncToBlog.ts",
    "extract:data": "tsx app/extractLeetCodeData.ts",
    "migrate:initial": "tsx app/initialMigration.ts"
  }
}
```

### 5.5 환경 변수

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
BLOG_API_ENDPOINT=your_blog_api_endpoint
BLOG_API_KEY=your_blog_api_key
```

### 5.6 성능 요구사항

- **응답 시간**: 데이터 추출 및 포스트 생성 < 2분
- **가용성**: 99.9% 업타임
- **확장성**: 100+ 문제까지 확장 가능
- **동시성**: 배치 처리 시 최대 10개 동시 처리

## 6. 사용자 경험 (UX) 요구사항

### 6.1 자동화 워크플로우

1. **개발자 행동**: LeetCode 문제 해결 후 GitHub 푸시
2. **시스템 반응**: 자동 감지 및 데이터 추출
3. **결과**: 5분 내 블로그에 포스트 자동 게시
4. **알림**: 성공/실패 상태 이메일 또는 Slack 알림

### 6.2 블로그 독자 경험

- **일관된 형식**: 모든 LeetCode 포스트 동일한 구조
- **명확한 네비게이션**: 난이도별, 알고리즘별 분류
- **검색 최적화**: 문제 번호, 제목, 태그로 쉬운 검색
- **모바일 친화적**: 반응형 디자인으로 모든 기기 지원

### 6.3 포스트 구조

```markdown
# [LeetCode 번호] 문제 제목

## 📋 문제 설명

[한국어 번역된 문제 설명]

## 🎯 해결 접근법

[알고리즘 접근법 설명]

## 💻 솔루션 코드

[구문 강조된 코드]

## ⚡ 복잡도 분석

- 시간 복잡도: O(n)
- 공간 복잡도: O(1)

## 🔑 핵심 포인트

[주요 학습 내용]

## 🏷️ 태그

[알고리즘 분류 태그]
```

## 7. 데이터 처리 로직

### 7.1 데이터 추출 인터페이스

```typescript
interface LeetCodeProblem {
  problemNumber: number;
  title: string;
  titleSlug: string;
  difficulty: string;
  description: string;
  descriptionKo: string;
  solutions: Solution[];
}

interface Solution {
  code: string;
  language: string;
  filePath: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  approach?: string;
}
```

### 7.2 블로그 포스트 생성 로직

```typescript
function generateBlogPost(problem: LeetCodeProblem): string {
  return `
# ${problem.title} (LeetCode ${problem.problemNumber})

## 📋 문제 설명
${problem.descriptionKo}

## 🎯 해결 접근법
${generateApproachSection(problem.solutions)}

## 💻 솔루션 코드
${generateCodeSection(problem.solutions)}

## ⚡ 복잡도 분석
- **시간 복잡도**: ${problem.solutions[0].timeComplexity || 'O(n)'}
- **공간 복잡도**: ${problem.solutions[0].spaceComplexity || 'O(1)'}

## 🔑 핵심 포인트
${generateKeyPoints(problem)}
`;
}
```

## 8. 비기능적 요구사항

### 8.1 보안 요구사항

- **API 키 관리**: GitHub Secrets를 통한 안전한 키 관리
- **데이터 암호화**: Supabase RLS (Row Level Security) 적용
- **접근 제어**: 읽기 전용 공개 접근, 쓰기는 인증된 사용자만

### 8.2 유지보수성

- **코드 품질**: TypeScript 엄격 모드, ESLint/Prettier 적용
- **테스트**: 단위 테스트 80% 이상 커버리지
- **문서화**: 모든 API 및 함수 JSDoc 문서화
- **모니터링**: 로그 수집 및 에러 추적 시스템

### 8.3 확장성

- **모듈화**: 기능별 독립적인 모듈 구조
- **플러그인 시스템**: 새로운 블로그 플랫폼 쉽게 추가 가능
- **설정 관리**: YAML 기반 설정 파일로 유연한 구성

## 9. 제약사항 및 가정

### 9.1 기술적 제약사항

- **GitHub Actions**: 월 2,000분 무료 제한 (예상 사용량: 100분/월)
- **Supabase**: 무료 플랜 데이터베이스 크기 제한 (500MB, 충분함)
- **API 호출 제한**: 블로그 플랫폼별 API 호출 제한 준수

### 9.2 비즈니스 제약사항

- **개발 시간**: 3주 내 MVP 완성
- **예산**: 무료 서비스 활용 ($0 운영비)
- **유지보수**: 주 1회 모니터링 및 업데이트

### 9.3 가정사항

- LeetCode 문제 해결 패턴 지속 (주 2-3문제)
- 기존 디렉토리 구조 및 파일 형식 유지
- Supabase 블로그 플랫폼 계속 사용

## 10. 위험 요소 및 대응 방안

### 10.1 기술적 위험

- **위험**: GitHub Actions 장애
- **대응**: 로컬 실행 스크립트 백업 준비

- **위험**: Supabase 서비스 중단
- **대응**: 로컬 PostgreSQL 백업 시스템

- **위험**: 블로그 플랫폼 API 변경
- **대응**: 어댑터 패턴으로 플랫폼별 독립성 확보

### 10.2 운영상 위험

- **위험**: 대량 데이터 처리 시 성능 저하
- **대응**: 배치 처리 및 큐 시스템 도입

- **위험**: 잘못된 데이터 추출로 인한 포스트 품질 저하
- **대응**: 데이터 검증 및 승인 워크플로우 구현

## 11. 구현 로드맵

### 11.1 Phase 1: MVP (3주)

- **Week 1**: 데이터베이스 스키마 및 추출 로직
  - Supabase 프로젝트 설정 및 테이블 생성
  - 기존 LeetCode 데이터 파싱 로직 개발
  - 초기 데이터 마이그레이션 스크립트
- **Week 2**: 자동화 시스템 및 템플릿 엔진
  - GitHub Actions 워크플로우 확장
  - 블로그 포스트 템플릿 엔진 개발
  - 실시간 동기화 로직 구현
- **Week 3**: 블로그 연동 및 테스트
  - 블로그 플랫폼 API 연동
  - 전체 시스템 통합 테스트
  - 에러 처리 및 재시도 로직

### 11.2 Phase 2: 고도화 (4주)

- **Week 4**: 다국어 지원 및 SEO 최적화
- **Week 5**: 성능 모니터링 및 분석 도구
- **Week 6**: 소셜 미디어 연동
- **Week 7**: 사용자 피드백 반영 및 최적화

### 11.3 Phase 3: 확장 (ongoing)

- 새로운 블로그 플랫폼 지원
- AI 기반 포스트 품질 개선
- 커뮤니티 기능 추가

## 12. 성공 측정 및 KPI

### 12.1 개발 단계 KPI

- **코드 커버리지**: 80% 이상
- **빌드 성공률**: 95% 이상
- **배포 시간**: 평균 5분 이하

### 12.2 운영 단계 KPI

- **자동 포스팅 성공률**: 99% 이상
- **포스트 생성 시간**: 평균 2분 이하
- **블로그 트래픽 증가**: 월 30% 증가
- **사용자 참여도**: 댓글 및 공유 수 20% 증가

### 12.3 비즈니스 KPI

- **시간 절약**: 월 10시간 이상 절약
- **콘텐츠 일관성**: 품질 점수 90% 이상
- **SEO 성능**: 검색 노출 30% 증가
- **포트폴리오 효과**: GitHub 스타 및 팔로워 20% 증가

## 13. 현재 코드베이스 정보

### 13.1 기존 인프라 활용

- **번역 시스템**: `app/translateREADME.ts`, `app/completion.ts` 재활용
- **메타데이터 관리**: `.meta.json` 시스템 확장
- **GitHub Actions**: 기존 워크플로우 확장
- **TypeScript 설정**: 기존 `tsconfig.json`, 테스트 환경 활용

### 13.2 디렉토리 구조 확장

```
leetcode/
├── app/
│   ├── completion.ts (기존)
│   ├── translateREADME.ts (기존)
│   ├── extractLeetCodeData.ts (신규)
│   ├── syncToBlog.ts (신규)
│   └── blogPostGenerator.ts (신규)
├── {문제번호}-{제목}/ (기존 40+ 디렉토리)
│   ├── README.md (기존)
│   ├── README.en.md (기존)
│   ├── {문제}.ts/.js (기존)
│   └── blog-metadata.json (신규)
└── LEETCODE_BLOG_PRD.md (이 문서)
```

### 13.3 기존 패키지 활용

```json
{
  "existing": {
    "typescript": "^5.x",
    "tsx": "^4.x",
    "@types/node": "^20.x"
  },
  "new_additions": {
    "@supabase/supabase-js": "^2.x",
    "cheerio": "^1.x",
    "gray-matter": "^4.x",
    "slugify": "^1.x"
  }
}
```

---

**문서 버전**: v1.0

**참고 문서**:

- `CLAUDE.md`: 프로젝트 기본 설정 및 가이드라인
- `TRANSLATION_SYSTEM.md`: 기존 번역 시스템 문서
- `README.md`: 프로젝트 개요 및 사용법
