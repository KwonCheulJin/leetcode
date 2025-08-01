# GitHub Actions 자동 업데이트 설정 가이드

이 문서는 새로운 LeetCode 문제가 GitHub에 푸시될 때 자동으로 데이터베이스를 업데이트하는 GitHub Actions 워크플로우 설정 방법을 설명합니다.

## 🚀 기능 개요

- **자동 감지**: 새로운 LeetCode 문제 디렉토리 변경사항 자동 감지
- **영어 번역**: README.en.md 파일이 없으면 자동 생성
- **데이터베이스 업데이트**: Supabase 데이터베이스에 문제 정보 자동 저장
- **단일 문제 처리**: 한 번에 하나의 문제만 처리하여 안정성 보장
- **자동 커밋**: 생성된 영어 번역 파일 자동 커밋

## 📋 필수 설정

### 1. GitHub Secrets 설정

GitHub 리포지토리 → Settings → Secrets and variables → Actions에서 다음 시크릿을 추가해야 합니다:

```
OPENAI_API_KEY=your_openai_api_key_here
SUPABASE_URL=your_supabase_project_url_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

#### 시크릿 값 획득 방법:

1. **OPENAI_API_KEY**
   - OpenAI 플랫폼 (https://platform.openai.com) 접속
   - API Keys 섹션에서 새 키 생성
   - 생성된 키를 복사하여 설정

2. **SUPABASE_URL**
   - Supabase 대시보드 (https://supabase.com/dashboard) 접속
   - 프로젝트 Settings → API 섹션
   - Project URL 복사

3. **SUPABASE_SERVICE_ROLE_KEY**
   - Supabase 대시보드의 같은 API 섹션
   - service_role secret key 복사 (anon key 아님!)

### 2. 워크플로우 파일 확인

`.github/workflows/leetcode-auto-update.yml` 파일이 올바르게 생성되어 있는지 확인합니다.

## 🔄 작동 방식

### 트리거 조건
```yaml
on:
  push:
    branches: [ main ]
    paths:
      - '[0-9][0-9][0-9][0-9]-*/**'
      - '[0-9][0-9][0-9][0-9][0-9]-*/**'
```

- `main` 브랜치에 푸시
- 4자리 또는 5자리 숫자로 시작하는 디렉토리 변경사항만 감지
- 예: `0001-two-sum/`, `2620-counter/` 등

### 처리 과정

1. **변경사항 감지**
   ```bash
   git diff --name-only HEAD~1 HEAD
   ```
   - 최근 커밋에서 변경된 파일 목록 추출
   - LeetCode 문제 디렉토리 패턴 매칭

2. **문제 번호 추출**
   ```bash
   # "0001-two-sum" → "1"
   # "2620-counter" → "2620"
   ```

3. **영어 번역 생성** (필요시)
   ```bash
   npm run fix:english problem $PROBLEM_NUMBER
   ```

4. **데이터베이스 업데이트**
   ```bash
   npm run data:process -- --problem=$PROBLEM_NUMBER
   ```

5. **자동 커밋** (영어 번역 파일 생성된 경우)

## 📝 사용법

### 일반적인 워크플로우

1. **로컬에서 LeetCode 문제 해결**
   ```bash
   # 새 문제 디렉토리 생성 (LeetHub 자동 또는 수동)
   mkdir 0050-new-problem
   cd 0050-new-problem
   
   # 솔루션 파일 작성
   vim solution.ts
   
   # README.md 작성 (한국어)
   vim README.md
   ```

2. **GitHub에 푸시**
   ```bash
   git add .
   git commit -m "Add: 50. New Problem solution"
   git push origin main
   ```

3. **자동 처리 확인**
   - GitHub Actions 탭에서 워크플로우 실행 상태 확인
   - 성공 시 데이터베이스에 자동 저장됨
   - README.en.md 파일이 자동 생성되어 커밋됨

### 수동 트리거 (테스트 목적)

워크플로우를 수동으로 테스트하려면:

```bash
# 기존 문제 디렉토리의 파일을 약간 수정
echo "# Test update" >> 0001-two-sum/README.md
git add .
git commit -m "test: trigger workflow"
git push origin main
```

## 🔍 모니터링 및 디버깅

### GitHub Actions 로그 확인

1. GitHub 리포지토리 → Actions 탭
2. "LeetCode Auto Database Update" 워크플로우 클릭
3. 각 단계별 로그 확인

### 일반적인 문제 해결

1. **시크릿 설정 오류**
   ```
   Error: OPENAI_API_KEY not found
   ```
   → GitHub Secrets에 올바른 API 키 설정 확인

2. **Supabase 연결 오류**
   ```
   Error: Could not connect to Supabase
   ```
   → SUPABASE_URL과 SERVICE_ROLE_KEY 확인

3. **문제 디렉토리 패턴 불일치**
   ```
   No LeetCode problem changes detected
   ```
   → 디렉토리명이 `0000-problem-name` 패턴인지 확인

### 성공적인 실행 예시

```
🎉 LeetCode Auto Update Completed!
   📝 Problem: #125 (0125-valid-palindrome)
   ✅ Database updated successfully
   🌐 English translation processed
   📊 Statistics refreshed
```

## ⚠️ 주의사항

1. **단일 문제 처리**: 한 번에 하나의 문제만 처리됩니다
2. **API 사용량**: OpenAI API 사용량이 발생합니다
3. **커밋 권한**: Actions가 자동 커밋할 수 있도록 권한이 설정되어 있습니다
4. **브랜치 보호**: main 브랜치에 보호 규칙이 있다면 Actions 예외 설정 필요

## 🔧 커스터마이징

### 처리할 브랜치 변경
```yaml
branches: [ main, development ]  # 여러 브랜치 추가
```

### 배치 크기 조정
```yaml
- name: Process multiple problems
  run: |
    # 여러 문제 동시 처리 (신중하게 사용)
    for problem in $PROBLEMS; do
      npm run data:process -- --problem=$problem
    done
```

### 알림 추가
```yaml
- name: Send notification
  uses: actions/slack@v1
  with:
    message: "New LeetCode problem processed: #${{ steps.extract-number.outputs.number }}"
```

이 설정을 통해 LeetCode 문제를 푸시할 때마다 자동으로 데이터베이스가 업데이트되는 완전 자동화된 워크플로우를 구현할 수 있습니다.