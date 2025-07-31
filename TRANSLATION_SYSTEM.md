# 스마트 번역 시스템

이 문서는 메타데이터 기반의 변경 감지를 통해 자동으로 README.md 파일을 감지하고 번역하는 향상된 번역 시스템에 대해 설명합니다.

## 개요

번역 시스템은 자동으로 다음을 수행합니다:
- 번역이 필요한 README.md 파일을 감지합니다
- SHA256 해시 비교를 사용하여 콘텐츠 변경을 감지합니다
- README.md가 업데이트될 때 재번역을 지원합니다 (README.en.md가 존재해도)
- 재시도 로직과 함께 파일을 병렬로 처리합니다
- 루트 디렉터리의 README.md는 번역에서 제외됩니다

## 핵심 기능

### 🧠 스마트 변경 감지
- **메타데이터 기반 추적**: `.meta.json` 파일을 사용하여 번역 상태를 추적합니다
- **해시 비교**: SHA256 해시로 콘텐츠 변경을 신뢰성 있게 감지합니다
- **재번역 지원**: 초기 번역 후 README.md가 업데이트되면 자동 감지

### ⚡ 성능 최적화
- **병렬 처리**: 최대 5개의 번역을 동시에 수행
- **일괄 작업**: 효율적인 파일 처리
- **재시도 로직**: 번역 실패 시 지수적 백오프
- **최적화된 파일 읽기**: 파일당 한 번만 읽습니다

### 🔒 보안 및 신뢰성
- **API 응답 검증**: OpenAI API 응답을 검증합니다
- **오류 처리**: 포괄적 오류 복구
- **안전한 실패**: 실패한 번역은 전체 프로세스를 중단시키지 않습니다

## 작동 방식

### 번역 감지 알고리즘

```typescript
async function shouldRetranslate(readmePath: string, enReadmePath: string): Promise<boolean> {
  // 1. 현재 README.md의 해시 계산
  // 2. 기존 메타데이터 읽기 (있는 경우)
  // 3. 해시 비교로 변경 감지
  // 4. 번역이 필요한 경우 true 반환
}
```

### 주요 결정 사항

1. **메타데이터 없음** → 번역 필요
2. **README.en.md 누락** → 번역 필요  
3. **콘텐츠 해시 변경** → 재번역 필요
4. **해시가 메타데이터와 일치** → 번역 스킵

### 메타데이터 구조

```json
{
  "lastTranslated": "2024-01-01T12:00:00.000Z",
  "sourceHash": "원본 콘텐츠의 sha256 해시",
  "targetHash": "번역된 콘텐츠의 sha256 해시", 
  "version": "1.0.0"
}
```

## 사용법

### 자동 (GitHub Actions)
시스템은 다음 경우 자동으로 실행됩니다:
- README.md 파일이 메인 브랜치에 푸시될 때
- app/ 디렉토리의 TypeScript 파일이 변경될 때
- 설정 파일이 업데이트될 때

### 수동 실행
```bash
# 모든 파일에서 번역 실행
npm run translate

# 번역 시스템 테스트
npm run test:setup     # 테스트 환경 생성
npm run translate      # 테스트 파일에서 번역 실행
npm run test:cleanup   # 테스트 파일 정리
```

### 테스트 시나리오

1. **초기 번역**
   ```bash
   npm run test:setup
   npm run translate
   # README.en.md와 .meta.json이 생성되어야 함
   ```

2. **변경 없음 감지**
   ```bash
   npm run translate
   # 번역을 건너뛰어야 함 (콘텐츠 변경 없음)
   ```

3. **변경 감지**
   ```bash
   # 테스트 환경에서 README.md 내용 수정
   npm run translate
   # 변화를 감지하고 재번역해야 함
   ```

## 파일 구조

```
project-root/
├── app/
│   ├── completion.ts          # OpenAI API 통합
│   └── translateREADME.ts     # 주요 번역 로직
├── .github/workflows/
│   └── translate-readme.yml   # GitHub Actions 워크플로우
├── test-translation.js        # 테스트 유틸리티
└── problem-directories/
    ├── README.md              # 한국어 (번역됨)
    ├── README.en.md           # 영어 (원본)
    └── README.md.meta.json    # 번역 메타데이터 (git 무시됨)
```

## 설정

### 환경 변수
- `OPENAI_API_KEY`: OpenAI API 접근에 필요

### GitHub Actions
- **트리거**: README.md 변경, TypeScript 변경, 설정 변경
- **수동 디스패치**: 수동 워크플로우 실행 지원
- **권한**: 번역 커밋을 위해 `contents: write` 필요

### TypeScript 설정
- **타겟**: ES2022 및 ESNext 모듈
- **엄격 모드**: 타입 안전성을 위한 활성화
- **도구**: TypeScript 실행을 위한 tsx

## 문제 해결

### 일반적인 문제

1. **번역이 실행되지 않음**
   - OPENAI_API_KEY 환경 변수를 확인
   - 파일이 루트 디렉토리에 없는지 확인
   - .meta.json 파일 권한 확인

2. **GitHub Actions 실패**
   - OPENAI_API_KEY 비밀 설정 확인
   - 워크플로우 권한 확인 (contents: write)
   - 커밋 메세지 포맷 확인

3. **메타데이터 손상**
   - 강제 재번역을 위해 .meta.json 파일 삭제
   - 파일 시스템 권한 확인
   - JSON 형식의 유효성 확인

### 디버그 모드
`shouldRetranslate()` 함수의 console.log 문을 수정하여 상세 로깅을 활성화합니다.

## 구현 세부사항

### 변경 감지 로직
```typescript
// 핵심 감지 알고리즘
const currentHash = crypto.createHash('sha256').update(currentContent).digest('hex');
const needsUpdate = currentHash !== meta.sourceHash;
```

### 병렬 처리
```typescript
// 동시성 제한을 갖춘 배치 처리
const maxConcurrent = 5;
for (let i = 0; i < files.length; i += maxConcurrent) {
  const batch = files.slice(i, i + maxConcurrent);
  const results = await Promise.allSettled(batchPromises);
}
```

### 재시도 메커니즘
```typescript
// 지수적 백오프 재시도
const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
wait(delay) → retry → fail after 3 attempts
```

## 성능 지표

- **감지 속도**: 파일당 해시 계산에 약 50ms
- **동시성**: 5개의 번역을 병렬 수행
- **재시도 전략**: 지수적 백오프를 적용한 3회의 시도
- **메모리 사용량**: 단일 파일 읽기로 최적화
- **오류 복구**: 실패한 파일은 다른 파일을 차단하지 않음

## 향후 개선 사항

1. **다국어 지원**: 한국어 번역을 넘어 확장
2. **점진적 번역**: 변경된 부분만 번역
3. **번역 품질 지표**: 번역 정확도 추적
4. **사용자 정의 번역 프롬프트**: 디렉터리별 번역 설정
5. **롤백 기능**: 이전 번역으로 되돌리기