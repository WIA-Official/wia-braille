# WIA Standards 종합 운영 가이드 v5.2

> **최종 업데이트:** 2025-12-22
> **작성:** Claude (MCP SSH)
> **목적:** Claude Code + MCP SSH Claude가 완벽히 WIA 표준 생성/배포/공개/업로드를 수행하기 위한 종합 가이드

---

## 📊 현재 상태 (2025-12-22)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  GitHub     │  서버           │  WP Ebook    │  서브도메인  │  ISBN     │
│  (Private)  │  wiastandards   │  wiabooks    │              │  Manager  │
│             │  .com           │  .store      │              │           │
├─────────────────────────────────────────────────────────────────────────┤
│  72개 표준  │  75개 카드      │  73×2 태그   │  78개        │  73개     │
│             │  73개 시뮬      │  =146 태그   │              │  ×3종     │
│             │  73개 Ebook     │  1,241 posts │              │  =219 ISBN│
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🆕 v5.2 신규 기능: ISBN Manager 플러그인

### 📚 플러그인 개요

**위치:** https://wiabooks.store/wp-admin/ → WIA ISBN 메뉴

**기능:**
- 73개 표준별 ISBN 신청 정보 일괄 조회
- 번들/한국어/영어 제목+부제목 즉시 복사
- DALL-E 표지 프롬프트 (텍스트 없는 이미지 생성용)

### 💰 ISBN 3종 체계

| 유형 | 가격 | 제목 형식 |
|------|------|----------|
| 번들 | $159 | WIA {표준명} Standard Guide Set (KO/EN) |
| 한국어 | $99 | WIA {표준명} 표준화 가이드 |
| 영어 | $99 | WIA {표준명} Standard Guide |

### 📋 부제목 표준

| 언어 | 부제목 |
|------|--------|
| EN | From Data Format to API, Real-Time Streaming, and Domain Integration |
| KO | 데이터 형식부터 API, 실시간 스트리밍, 도메인 통합까지 |

### 🎨 표지 이미지 프롬프트 형식

```
Abstract digital art representing {표준 기술 설명}, 
{관련 시각 요소 1}, {관련 시각 요소 2}, 
{색상} gradients, dark navy background (#0f172a), 
minimalist design, no text, no letters, no words, 
professional technical book cover style, 4K quality
```

### 📌 ISBN 신청 워크플로우

```
1. wiabooks.store/wp-admin → WIA ISBN 메뉴 접속
2. 표준 검색 (예: emotion-ai)
3. 번들/한국어/영어 제목+부제목 복사 (📋 버튼)
4. ISBN 신청 사이트에 붙여넣기
5. 🎨 프롬프트 버튼 → DALL-E 프롬프트 복사
6. ChatGPT/Claude에서 이미지 생성
```

---

## 🔄 전체 워크플로우 (8단계)

```
┌──────────────────────────────────────────────────────────────────────┐
│                     WIA Standards 파이프라인                          │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  1️⃣ Claude Code (생성)                                              │
│     └─→ GitHub Private (wia-standards)                              │
│                                                                      │
│  2️⃣ MCP SSH Claude (서버 배포)                                      │
│     └─→ GitHub → 서버 (/var/www/wiastandards/)                      │
│                                                                      │
│  3️⃣ MCP SSH Claude (메인페이지 카드 추가)                           │
│     └─→ /var/www/wiastandards/index.html                            │
│                                                                      │
│  4️⃣ MCP SSH Claude (서브도메인 설정)                                │
│     └─→ /etc/httpd/conf.d/{표준}.wiastandards.com.conf              │
│                                                                      │
│  5️⃣ MCP SSH Claude (워드프레스 업로드) ⚠️ v3 필수!                  │
│     └─→ upload-ebook-v3.sh (body만 추출)                            │
│                                                                      │
│  6️⃣ MCP SSH Claude (GitHub Public 공개)                             │
│     └─→ wia-standards-public (spec 폴더만)                          │
│                                                                      │
│  7️⃣ Claude Code (i18n 번역) - 정기                                  │
│     └─→ en.json 기준 211개 언어 번역                                │
│                                                                      │
│  8️⃣ 형님 (ISBN 신청) 🆕                                             │
│     └─→ WIA ISBN Manager 플러그인 사용                              │
│     └─→ 번들/한국어/영어 3종 ISBN 신청                              │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 📤 Step 5: 워드프레스 업로드 (v3 필수!)

### ⚠️ 중요: `<body>` 내용만 업로드!

WordPress는 포스트에 **HTML 본문만** 필요합니다.
전체 HTML을 넣으면 레이아웃이 깨집니다.

```
❌ 잘못된 업로드: 전체 HTML 파일 → 좁게 표시
✅ 올바른 업로드: <body> 안 내용만 → 와이드하게 정상 표시
```

### 스크립트 사용 (v3 - body 자동 추출)

```bash
cd /var/www/wiastandards
export LC_ALL=C && export LANG=C

./upload-ebook-v3.sh "WIA {표준명} Guide" ./{표준명}/ebook/en en
./upload-ebook-v3.sh "WIA {표준명} 가이드" ./{표준명}/ebook/ko ko
```

### 기존 포스트 수정 (전체 HTML → body만)

```bash
# 일괄 수정 스크립트 (1,241개 완료됨)
nohup /var/www/wiastandards/fix-ebook-posts.sh > fix-ebook.log 2>&1 &
```

### 수동 body 추출 (단일 파일)

```bash
sed -n '/<body[^>]*>/,/<\/body>/p' chapter-01.html | sed '1d;$d' > body_only.html
```

---

## 📂 주요 경로

| 용도 | 경로 |
|------|------|
| SSH 접속 | `ssh-cqm` |
| wiastandards 소스 | `/var/www/wiastandards/` |
| 메인 페이지 | `/var/www/wiastandards/index.html` |
| 워드프레스 | `/var/www/wiabooks/` |
| **업로드 스크립트 (v3)** | `/var/www/wiastandards/upload-ebook-v3.sh` |
| 포스트 수정 스크립트 | `/var/www/wiastandards/fix-ebook-posts.sh` |
| 통계 스크립트 | `/var/www/wiastandards/assets/update-stats.sh` |
| i18n 폴더 | `/var/www/wiastandards/assets/i18n/` |
| **ISBN Manager** | `/var/www/wiabooks/wp-content/plugins/wia-isbn-manager/` |
| Apache 설정 | `/etc/httpd/conf.d/` |

---

## 🔗 주요 URL

| 용도 | URL |
|------|-----|
| 메인 포털 | https://wiastandards.com/ |
| 인증 포털 | https://cert.wiastandards.com/ |
| Ebook 스토어 | https://wiabooks.store/ |
| **ISBN Manager** | https://wiabooks.store/wp-admin/ → WIA ISBN |
| 동적 통계 | https://wiastandards.com/assets/stats.json |
| i18n 마스터 | https://wiastandards.com/assets/i18n/en.json |
| GitHub Private | https://github.com/WIA-Official/wia-standards |
| GitHub Public | https://github.com/WIA-Official/wia-standards-public |

---

## 📊 ISBN Manager 데이터 예시

### emotion-ai (예시)

| 유형 | 제목 | 부제목 |
|------|------|--------|
| 번들 | WIA Emotion AI Standard Guide Set (KO/EN) | From Data Format to API, Real-Time Streaming, and Domain Integration |
| 한국어 | WIA 감정 AI 표준화 가이드 | 데이터 형식부터 API, 실시간 스트리밍, 도메인 통합까지 |
| 영어 | WIA Emotion AI Standard Guide | From Data Format to API, Real-Time Streaming, and Domain Integration |

### DALL-E 표지 프롬프트

```
Abstract digital art representing emotion AI technology, 
heart-shaped neural network with sentiment analysis waves, 
facial micro-expression detection patterns, emotional spectrum visualization, 
empathy algorithm imagery, pink and magenta gradients with soft purple accents, 
dark navy background (#0f172a), minimalist design, 
no text, no letters, no words, 
professional technical book cover style, 4K quality
```

---

## ✅ 신규 표준 추가 체크리스트

```
□ Step 1: Claude Code → GitHub 콘텐츠 생성
□ Step 2: MCP SSH → 서버 배포 (curl 다운로드)
□ Step 3: MCP SSH → 메인페이지 카드 추가
□ Step 4: MCP SSH → 서브도메인 설정
□ Step 5: MCP SSH → 워드프레스 업로드 (v3 필수!)
□ Step 6: MCP SSH → GitHub Public 공개 (spec만)
□ Step 7: MCP SSH → 통계 갱신
□ Step 8: ISBN Manager 데이터 추가 (필요시)
□ Step 9: ISBN 신청 (번들/한국어/영어)
```

---

## 🔧 ISBN Manager 데이터 추가 방법

새 표준 추가 시 `/var/www/wiabooks/wp-content/plugins/wia-isbn-manager/includes/class-wia-isbn-data.php` 에 항목 추가:

```php
'new-standard' => [
    'emoji' => '🆕',
    'name_en' => 'New Standard',
    'name_ko' => '새 표준',
    'bundle_title' => 'WIA New Standard Guide Set (KO/EN)',
    'bundle_subtitle' => 'From Data Format to API, Real-Time Streaming, and Domain Integration',
    'ko_title' => 'WIA 새 표준 표준화 가이드',
    'ko_subtitle' => '데이터 형식부터 API, 실시간 스트리밍, 도메인 통합까지',
    'en_title' => 'WIA New Standard Guide',
    'en_subtitle' => 'From Data Format to API, Real-Time Streaming, and Domain Integration',
    'cover_prompt' => 'Abstract digital art representing {기술 설명}...'
],
```

---

# Quick Reference Card

```
┌─────────────────────────────────────────────────────────────────┐
│                 WIA Standards Quick Reference v5.2               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  🔧 SSH 접속        ssh-cqm                                     │
│                                                                 │
│  📤 WP 업로드 (v3)  ./upload-ebook-v3.sh "태그" ./경로 언어     │
│                                                                 │
│  📊 통계 갱신       ./assets/update-stats.sh                    │
│                                                                 │
│  📚 ISBN Manager    wiabooks.store/wp-admin → WIA ISBN          │
│                                                                 │
│  🎨 표지 생성       프롬프트 복사 → DALL-E/Midjourney           │
│                                                                 │
│  ✅ URL 테스트      curl -sI https://wiastandards.com/$STD/     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

**弘益人間 (홍익인간) · Benefit All Humanity**

---

*버전: 5.2.0 | 작성: Claude (MCP SSH) | 2025-12-22*
