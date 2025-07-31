# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 지침을 제공합니다.

## 저장소 개요

이것은 [LeetHub v3](https://github.com/raphaelheinz/LeetHub-3.0)로 관리되는 LeetCode 문제 해결 저장소입니다. 주로 TypeScript와 JavaScript로 작성된 알고리즘 솔루션이 문제 번호와 이름으로 구성되어 있습니다.

## 주요 명령어

### 번역 스크립트

- `npm run translate` - 스마트 감지 시스템을 사용하여 모든 README.md 파일을 한국어로 번역
- `npm run translate:file <파일경로>` - 개별 파일을 번역 (예: `npm run translate:file TRANSLATION_SYSTEM.md`)
- `npm run translate:file <파일경로> -- --force` - 메타데이터 무시하고 강제 번역
- `npm run translate:changed` - 마지막 커밋에서 변경된 README 파일만 번역

### 테스트 스크립트

- `npm test` - 번역 시스템 통합 테스트 실행
- `npm run test:run` - 번역 시스템 통합 테스트 실행 (별칭)
- `npm run test:setup` - 테스트 환경 설정만 실행
- `npm run test:cleanup` - 테스트 환경 정리
- `npm run type-check` - TypeScript 타입 검사

## 코드 아키텍처

### 디렉토리 구조

- 각 LeetCode 문제는 `{문제번호}-{kebab-case-제목}/` 형식의 디렉토리를 가집니다
- 문제 디렉토리 구성:
  - 솔루션 파일 (`.js` 또는 `.ts`)
  - `README.md` (한국어, 번역된 버전)
  - `README.en.md` (영어 원본)
  - `README.md.meta.json` (번역 메타데이터, .gitignore에 포함)
- `app/` 디렉토리: 번역 시스템 코어 파일들
- `test/` 디렉토리: TypeScript 테스트 스크립트들

### 솔루션 파일

- TypeScript (`.ts`) 또는 JavaScript (`.js`)로 구현
- LeetCode 함수 시그니처 규칙 준수
- TypeScript 솔루션은 적절한 타입 어노테이션 포함

### 스마트 번역 시스템

`app/` 디렉토리에는 개선된 자동 번역 시스템이 포함되어 있습니다:

#### 핵심 파일

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

#### 테스트 파일

- `test/translationTest.ts` - 번역 시스템 통합 테스트:
  - TypeScript로 작성된 포괄적 테스트 스위트
  - 초기 번역, 변경 감지, 재번역 시나리오 검증
  - 자동화된 테스트 결과 보고서 생성
  - 성능 및 안정성 측정

#### 주요 기능

- **스마트 변경 감지**: README.en.md가 존재해도 README.md 업데이트 감지
- **메타데이터 추적**: `.meta.json`을 통한 번역 상태 관리
- **성능 최적화**: 최대 5개 동시 번역 처리
- **안정성**: 지수 백오프 재시도 및 오류 복구

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

## 언어 설정

**커뮤니케이션 언어**: 이 저장소에서 작업할 때 모든 할일, 응답, 설명에 **한국어**를 사용하세요.

## 작업 가이드라인

이 코드베이스에서 작업할 때:

- 새로운 문제에 대해 기존 디렉토리 구조 유지
- `.ts` 파일에 대해 TypeScript 타이핑 규칙 준수
- 커밋하기 전에 LeetCode 예제에 대해 솔루션 테스트
- 번역 시스템의 스마트 감지 기능을 활용하여 README 파일 관리
- 타입 검사 (`npm run type-check`) 통과 확인

## 번역 시스템 사용법

### 자동 실행 (GitHub Actions)

다음의 경우 자동으로 실행됩니다:

- main 브랜치에 README.md 파일 푸시
- app/ 디렉토리의 TypeScript 파일 변경
- 설정 파일 업데이트

### 수동 실행

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

자세한 내용은 `TRANSLATION_SYSTEM.md`를 참조하세요.
