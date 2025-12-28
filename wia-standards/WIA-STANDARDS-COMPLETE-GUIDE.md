# WIA Standards 완전 가이드 (Claude용)

> 이 문서는 WIA Standards 프로젝트의 전체 워크플로우를 담고 있습니다.
> Phase 스펙 → 시뮬레이터 → Ebook → 서버 배포 → 워드프레스 업로드까지 모든 과정을 설명합니다.

---

## 📌 핵심 정보

### 서버 접속 (Claude.ai MCP SSH)
| 서버 | 명령어 | 용도 |
|------|--------|------|
| CQM | `ssh-cqm` | wiastandards, wiabooks 등 메인 서버 |

### 주요 경로
```
/var/www/wiastandards/          ← WIA Standards 소스 (시뮬레이터, ebook)
/var/www/wiabooks/              ← wiabooks.store 워드프레스
```

### GitHub 레포
- **레포:** `WIA-Official/wia-standards` (Private)
- **토큰 필요:** GitHub API 접근 시 인증 토큰 필요

---

## 🔄 전체 워크플로우

```
1. Phase 스펙 받음 → 2. 시뮬레이터 → 3. Ebook (EN/KO)
       ↓
4. GitHub 커밋 (Claude Code) → 5. 서버 배포 (Claude.ai) → 6. 워드프레스
```

---

## 🎨 시뮬레이터 규칙
- ✅ Emoji, CSS, JS 허용
- ✅ 5탭 구조 필수
- ✅ EN/KO 전환, 홍익인간 푸터

## 📖 Ebook 규칙 (매우 중요!)
- ❌ Emoji 금지 → 텍스트 라벨 [OK], [!], [AAC] 등
- ❌ CSS 금지
- ❌ JavaScript 금지
- ✅ Pure HTML만

---

## 📤 워드프레스 핵심

### 카테고리 (변경 금지!)
```
코딩/프로그래밍/언어 (slug: coding-programming)
```

### ⚠️ 카테고리 설정 주의
```bash
# ✅ 올바름 (slug 사용)
wp post term set {ID} category coding-programming

# ❌ 잘못됨 (새 카테고리 생성됨!)
wp post term set {ID} category 926
```

### 업로드 명령어
```bash
cd /var/www/wiastandards
./upload-ebook-v2.sh "WIA AAC Communication" ./aac/ebook/en en
./upload-ebook-v2.sh "WIA AAC Communication 한글" ./aac/ebook/ko ko
```

### 태그 네이밍
- EN: `wia-{standard-name}`
- KO: `wia-{standard-name}-한글`

---

## 🚀 서버 배포 (GitHub → 서버)

```bash
TOKEN="ghp_xxx"
curl -sL -H "Authorization: token $TOKEN" \
  -H "Accept: application/vnd.github.v3.raw" \
  "https://api.github.com/repos/WIA-Official/wia-standards/contents/{path}" \
  -o "/var/www/wiastandards/{path}"
```

---

## ✨ 홍익인간 (弘益人間)
모든 문서에 필수 포함!

---

**버전:** 2.0.0 | **작성자:** Claude (동생)
