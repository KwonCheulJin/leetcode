# TODO - LeetCode 자동화 시스템 완성

## 🔧 GitHub Actions 설정 (필수)

### 1. GitHub Secrets 설정
GitHub 리포지토리 → Settings → Secrets and variables → Actions에서 다음 시크릿 추가:

```
OPENAI_API_KEY=your_openai_api_key_here
SUPABASE_URL=your_supabase_project_url_here  
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

**시크릿 값 획득 방법:**
- **OPENAI_API_KEY**: OpenAI 플랫폼 (https://platform.openai.com) → API Keys에서 생성
- **SUPABASE_URL**: Supabase 대시보드 → 프로젝트 Settings → API → Project URL
- **SUPABASE_SERVICE_ROLE_KEY**: 같은 API 섹션의 service_role secret key (anon key 아님!)

### 2. 워크플로우 테스트
```bash
# 기존 문제 디렉토리를 약간 수정해서 테스트
echo "# Test update" >> 0001-two-sum/README.md
git add .
git commit -m "test: trigger workflow"
git push origin main
```

## 🧪 자동화 시스템 검증

### 1. 로컬 테스트 실행
```bash
# 변경사항 감지 로직 테스트
npm run auto:detect-changes

# 개별 문제 처리 테스트
npm run data:process -- --problem=1
```

### 2. GitHub Actions 모니터링
- GitHub 리포지토리 → Actions 탭에서 워크플로우 실행 상태 확인
- "LeetCode Auto Database Update" 워크플로우 로그 점검

## 📊 데이터 품질 확인

### 1. 데이터베이스 상태 점검
```bash
# 현재 저장된 문제 통계 확인
npm run data:stats

# Supabase 대시보드에서 데이터 품질 확인:
# - 영어 제목이 올바르게 저장되었는지
# - 태그가 적절히 분류되었는지  
# - 제약 조건이 제대로 저장되었는지
```

### 2. 누락된 데이터 보완
- README.en.md가 없는 문제들 확인 및 생성
- 데이터베이스에서 빈 필드나 오류 데이터 점검

## 🚀 새로운 문제 해결 워크플로우

### 1. 일반적인 사용법
1. LeetCode 문제 해결 (로컬)
2. 솔루션 파일 작성 (`.ts` 또는 `.js`)
3. README.md 작성 (한국어)
4. GitHub에 푸시
5. **자동으로 처리됨**: 영어 번역 생성 → 데이터베이스 업데이트 → 통계 갱신

### 2. 수동 처리 (필요시)
```bash
# 특정 문제 영어 번역 생성
npm run fix:english problem [문제번호]

# 특정 문제 데이터베이스 업데이트  
npm run data:process -- --problem=[문제번호]
```

## 🔍 문제 해결 가이드

### 일반적인 오류들
1. **시크릿 설정 오류**: GitHub Secrets 값 확인
2. **Supabase 연결 오류**: URL과 SERVICE_ROLE_KEY 재확인
3. **문제 디렉토리 패턴 불일치**: `0000-problem-name` 형식 확인
4. **API 사용량 초과**: OpenAI API 크레딧 확인

### 성공 확인 방법
GitHub Actions 실행 후 다음 메시지 확인:
```
🎉 LeetCode Auto Update Completed!
   📝 Problem: #125 (0125-valid-palindrome)
   ✅ Database updated successfully
   🌐 English translation processed
   📊 Statistics refreshed
```

## 📈 향후 개선 사항 (선택사항)

### 1. 기능 확장
- [ ] 여러 문제 동시 처리 지원
- [ ] 난이도별 자동 분류 개선
- [ ] 솔루션 패턴 자동 태깅
- [ ] 성능 최적화 (API 호출 최소화)

### 2. 모니터링 강화
- [ ] Slack/Discord 알림 연동
- [ ] 데이터 품질 자동 검증
- [ ] API 사용량 모니터링 대시보드

### 3. 문서화 개선
- [ ] 블로그 포스팅 자동 생성
- [ ] 문제 해결 패턴 분석 리포트
- [ ] 학습 진도 추적 시스템

---

## 📝 현재 상태 요약

✅ **완료된 작업:**
- LeetCode 데이터 처리 시스템 구축
- Supabase 데이터베이스 연동
- OpenAI 번역 시스템 구현
- GitHub Actions 자동화 워크플로우 생성
- 45개 기존 문제 데이터베이스 저장 완료
- 데이터 품질 문제 해결 (영어 제목, 태그, 제약조건)

🔧 **설정 필요:**
- GitHub Secrets 설정 (OPENAI_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
- 워크플로우 테스트 및 검증

🎯 **목표:**
완전 자동화된 LeetCode 문제 해결 → 데이터베이스 저장 → 블로그 포스팅 시스템