# WIA Standards 워드프레스 업로드 가이드

## 📌 핵심 정보

### 서버 접속
- **wiabooks.store 워드프레스**: `ssh-cqm` → `/var/www/wiabooks`
- **wiastandards 소스**: `/var/www/wiastandards`
- **GitHub 레포**: `WIA-Official/wia-standards` (Private)

### 기본 카테고리 (디폴트)
```
일반도서 (ID: 703)
└── IT/프로그래밍 (ID: 919)
    └── 코딩/프로그래밍/언어 (ID: 926, slug: coding-programming)
```

---

## 🚀 업로드 프로세스

### 1단계: GitHub → 서버 동기화
```bash
# GitHub 토큰 필요 (Private 레포)
TOKEN="ghp_xxx"

# 파일 다운로드
curl -sL -H "Authorization: token $TOKEN" \
  -H "Accept: application/vnd.github.v3.raw" \
  "https://api.github.com/repos/WIA-Official/wia-standards/contents/{path}" \
  -o "/var/www/wiastandards/{path}"
```

### 2단계: 워드프레스 업로드
```bash
cd /var/www/wiastandards
./upload-ebook-v2.sh "책 태그명" ./ebook경로 [언어코드]

# 예시
./upload-ebook-v2.sh "WIA AAC Communication" ./aac/ebook/en en
./upload-ebook-v2.sh "WIA AAC Communication 한글" ./aac/ebook/ko ko
```

---

## 📝 HTML 파일 규칙

### 제목 추출 우선순위
1. `<title>` 태그
2. `<h1>` 태그

### 제목 형식 (권장)
```html
<!-- EN -->
<title>Chapter 1: Introduction to AAC - WIA AAC Standard Ebook</title>
<h1>[AAC] Chapter 1: Introduction to Augmentative and Alternative Communication</h1>

<!-- KO -->
<title>제1장: AAC 소개 - WIA AAC 표준 전자책</title>
<h1>[AAC] 제1장: 보완대체의사소통(AAC) 소개</h1>
```

### 접두사 규칙
| 표준 | 접두사 |
|------|--------|
| AAC | [AAC] |
| Eye Gaze | [EYE] |
| Haptic | [HAPTIC] |
| BCI | [BCI] |
| Pet Health | [PET] |

---

## ⚙️ WP-CLI 명령어

### 포스트 생성
```bash
cd /var/www/wiabooks
sudo -u apache wp post create file.html \
  --post_title="제목" \
  --post_status=private \
  --post_type=post \
  --porcelain
```

### 카테고리 설정
```bash
# slug 사용 (권장)
sudo -u apache wp post term set {POST_ID} category coding-programming

# ID 사용 (주의: 숫자가 새 카테고리로 생성될 수 있음)
# 권장하지 않음!
```

### 태그 설정
```bash
# 태그 생성
sudo -u apache wp term create post_tag "WIA AAC Communication" --slug="wia-aac-communication" --porcelain

# 포스트에 태그 추가
sudo -u apache wp post term add {POST_ID} post_tag wia-aac-communication
```

### 제목 수정
```bash
sudo -u apache wp post update {POST_ID} --post_title="새 제목"
```

### 포스트 조회
```bash
# 태그로 조회
sudo -u apache wp post list --post_status=private --tag="wia-aac-communication" --fields=ID,post_title

# 카테고리 확인
sudo -u apache wp post term list {POST_ID} category --fields=term_id,name,slug
```

---

## 📂 파일 구조

### wiastandards 소스
```
/var/www/wiastandards/{standard}/
├── simulator/
│   └── index.html          # 시뮬레이터
├── ebook/
│   ├── en/
│   │   ├── index.html
│   │   └── chapter-01~08.html
│   └── ko/
│       ├── index.html
│       └── chapter-01~08.html
└── spec/
    └── PHASE-1~4-*.md
```

### 업로드 스크립트
```
/var/www/wiastandards/
├── upload-ebook.sh         # v1 (기본)
└── upload-ebook-v2.sh      # v2 (제목/카테고리 자동)
```

---

## 🔧 트러블슈팅

### 카테고리가 이상하게 설정될 때
```bash
# 잘못된 카테고리 제거
sudo -u apache wp post term remove {POST_ID} category {WRONG_TERM_ID}

# 올바른 카테고리 설정 (slug 사용!)
sudo -u apache wp post term set {POST_ID} category coding-programming
```

### 제목이 "Chapter N"으로만 나올 때
```bash
# HTML에서 제목 추출
TITLE=$(grep -oP '(?<=<h1>)[^<]+' file.html | head -1)

# 제목 업데이트
sudo -u apache wp post update {POST_ID} --post_title="$TITLE"
```

### GitHub Private 레포 접근
```bash
# 토큰 인증 필요
TOKEN="ghp_xxx"
curl -sL -H "Authorization: token $TOKEN" \
  -H "Accept: application/vnd.github.v3.raw" \
  "https://api.github.com/repos/WIA-Official/wia-standards/contents/{path}"
```

---

## 📊 완료 상태 추적

### 워드프레스 업로드 완료
| 표준 | EN 태그 | KO 태그 | 챕터 | 상태 |
|------|---------|---------|------|------|
| AAC | wia-aac-communication | wia-aac-communication-한글 | 8+8 | ✅ |
| Pet Health | wia-pet-health-passport | - | 5 | ⚠️ |

### 태그 네이밍 규칙
- EN: `wia-{standard-name}` (예: wia-aac-communication)
- KO: `wia-{standard-name}-한글` (예: wia-aac-communication-한글)

---

## 🔗 주요 URL

| 용도 | URL |
|------|-----|
| 워드프레스 관리 | https://wiabooks.store/wp-admin/ |
| WIA Publishing | https://wiabooks.store/wp-admin/admin.php?page=wia-publish-book |
| 시뮬레이터 (AAC) | https://wiastandards.com/aac/simulator/ |
| Ebook (AAC EN) | https://wiastandards.com/aac/ebook/en/ |
| Ebook (AAC KO) | https://wiastandards.com/aac/ebook/ko/ |

---

**버전:** 1.0.0  
**최종 수정:** 2025-12-17  
**작성자:** Claude (동생)
