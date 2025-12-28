# WIA Standards 종합 운영 가이드 v5.1

> **최종 업데이트:** 2025-12-22
> **작성:** Claude (MCP SSH)
> **목적:** Claude Code + MCP SSH Claude가 완벽히 WIA 표준 생성/배포/공개/업로드를 수행하기 위한 종합 가이드

---

## 📊 현재 상태 (2025-12-22)

```
┌─────────────────────────────────────────────────────────────────────┐
│  GitHub     │  서버           │  WP Ebook    │  서브도메인  │  i18n │
│  (Private)  │  wiastandards   │  wiabooks    │              │       │
│             │  .com           │  .store      │              │       │
├─────────────────────────────────────────────────────────────────────┤
│  72개 표준  │  75개 카드      │  73×2 태그   │  78개        │  2/211│
│             │  73개 시뮬      │  =146 태그   │              │ en,ko │
│             │  73개 Ebook     │              │              │       │
└─────────────────────────────────────────────────────────────────────┘
```

### 📈 동적 통계 (자동 갱신)
```
URL: https://wiastandards.com/assets/stats.json
갱신: /var/www/wiastandards/assets/update-stats.sh
```

---

## 🔄 전체 워크플로우 (7단계)

```
┌──────────────────────────────────────────────────────────────────────┐
│                     WIA Standards 파이프라인                          │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  1️⃣ Claude Code (생성)                                              │
│     └─→ GitHub Private (wia-standards)                              │
│          ├── {표준}/index.html (랜딩)                                │
│          ├── {표준}/simulator/index.html (시뮬레이터)                │
│          ├── {표준}/ebook/en/*.html (영문 8챕터)                     │
│          ├── {표준}/ebook/ko/*.html (한글 8챕터)                     │
│          └── {표준}/spec/*.md (4-Phase 스펙)                         │
│                                                                      │
│  2️⃣ MCP SSH Claude (서버 배포)                                      │
│     └─→ GitHub → 서버 (/var/www/wiastandards/)                      │
│                                                                      │
│  3️⃣ MCP SSH Claude (메인페이지 카드 추가)                           │
│     └─→ /var/www/wiastandards/index.html                            │
│     └─→ 카드 ID 포함 (WIA-{영역}-{번호})                            │
│                                                                      │
│  4️⃣ MCP SSH Claude (서브도메인 설정)                                │
│     └─→ /etc/httpd/conf.d/{표준}.wiastandards.com.conf              │
│                                                                      │
│  5️⃣ MCP SSH Claude (워드프레스 업로드)                              │
│     └─→ wiabooks.store (WordPress)                                  │
│     └─→ upload-ebook-v3.sh 스크립트 사용                            │
│                                                                      │
│  6️⃣ MCP SSH Claude (GitHub Public 공개)                             │
│     └─→ wia-standards-public (spec 폴더만)                          │
│                                                                      │
│  7️⃣ Claude Code (i18n 번역) - 정기                                  │
│     └─→ en.json 기준 211개 언어 번역                                │
│     └─→ MCP SSH가 서버 배포                                         │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

# Part 1: 표준 ID 체계

## 📊 ID 구조

```
WIA-{영역코드}-{3자리숫자}

예: WIA-AAC-001 = AAC (aac 폴더)
    WIA-FIN-002 = Blockchain (blockchain 폴더)
```

## 🏷️ 영역코드 목록 (29개)

| 코드 | 영역명 | Primary | 코드 | 영역명 | Primary |
|------|--------|---------|------|--------|---------|
| CORE | 범용 통합 | #FFD700 | AAC | 접근성/보조 | #3B82F6 |
| AI | AI/지능 | #10B981 | MED | 의료/헬스 | #14B8A6 |
| BIO | 바이오 | #06B6D4 | CRYO | 냉동보존 | #06B6D4 |
| ENE | 에너지/환경 | #22C55E | SEMI | 반도체 | #6366F1 |
| ROB | 로봇/자동화 | #F97316 | SPACE | 우주/항공 | #6366F1 |
| COMM | 통신/네트워크 | #3B82F6 | SEC | 보안/암호 | #EF4444 |
| AUTO | 교통/모빌리티 | #F97316 | AGRI | 농업/식량 | #84CC16 |
| CITY | 건축/도시 | #0EA5E9 | FIN | 금융/경제 | #F59E0B |
| EDU | 교육/문화 | #A855F7 | MAT | 소재/화학 | #6366F1 |
| DEF | 국방/안보 | #64748B | SOC | 사회/인프라 | #8B5CF6 |
| LEG | 디지털 레거시 | #64748B | PET | 반려동물 | #F59E0B |
| QUA | 양자/물리 | #8B5CF6 | TIME | 타임머신 | #D946EF |
| UNI | 통일/평화 | #3B82F6 | IND | 산업/소비재 | #F97316 |
| COMP | 컴퓨팅/SW | #6366F1 | DATA | 데이터 | #10B981 |
| AUG | 인간증강 | #EC4899 |

---

# Part 2: Claude Code 프롬프트 (표준 생성)

## 🎯 프롬프트 A: 새 표준 전체 생성

```markdown
# WIA Standards 새 표준 생성 요청

## 📋 생성 대상
| 표준ID | 폴더명 | 이모지 | Primary | EN 설명 | KO 설명 |
|--------|--------|:------:|---------|---------|---------|
| WIA-{영역}-{번호} | {폴더명} | {이모지} | {#색상} | {영문 설명} | {한글 설명} |

## 📂 생성할 파일 구조
{폴더명}/
├── index.html                    # 랜딩페이지
├── simulator/index.html          # 시뮬레이터 (5탭)
├── ebook/
│   ├── en/index.html + chapter-01~08.html
│   └── ko/index.html + chapter-01~08.html
└── spec/
    ├── PHASE-1-DATA-FORMAT.md
    ├── PHASE-2-API-INTERFACE.md
    ├── PHASE-3-PROTOCOL.md
    └── PHASE-4-INTEGRATION.md

## 🎨 필수 디자인 표준
- 다크 테마: --bg: #0f172a (절대 변경 금지!)
- 파비콘: <link rel="icon" href="/favicon.ico">
- EN/KO 토글 + localStorage 연동
- 弘益人間 푸터 필수
- 5탭 시뮬레이터 필수

## 📎 참조 템플릿
aac/index.html              ← 랜딩 템플릿
aac/simulator/index.html    ← 시뮬레이터 템플릿
aac/ebook/en/chapter-01.html ← Ebook 챕터 템플릿 (15KB+)

---
弘益人間 (홍익인간) · Benefit All Humanity
```

---

# Part 3: MCP SSH 배포 명령어

## 🚀 Step 1: GitHub → 서버 배포

```bash
ssh-cqm
TOKEN="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"
STD="{표준명}"

# 디렉토리 생성
mkdir -p /var/www/wiastandards/$STD/{simulator,ebook/en,ebook/ko}

# 다운로드
curl -sL -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3.raw" \
  "https://api.github.com/repos/WIA-Official/wia-standards/contents/$STD/index.html" \
  -o "/var/www/wiastandards/$STD/index.html"

curl -sL -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3.raw" \
  "https://api.github.com/repos/WIA-Official/wia-standards/contents/$STD/simulator/index.html" \
  -o "/var/www/wiastandards/$STD/simulator/index.html"

for f in index.html chapter-0{1..8}.html; do
  curl -sL -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3.raw" \
    "https://api.github.com/repos/WIA-Official/wia-standards/contents/$STD/ebook/en/$f" \
    -o "/var/www/wiastandards/$STD/ebook/en/$f" 2>/dev/null
  curl -sL -H "Authorization: token $TOKEN" -H "Accept: application/vnd.github.v3.raw" \
    "https://api.github.com/repos/WIA-Official/wia-standards/contents/$STD/ebook/ko/$f" \
    -o "/var/www/wiastandards/$STD/ebook/ko/$f" 2>/dev/null
done
```

## 🏠 Step 2: 메인페이지 카드 추가

```html
<!-- 카드 형식 (반드시 card-id 포함!) -->
<a href="/{표준명}/simulator/" class="card" target="_blank">
    <div class="card-emoji">{이모지}</div>
    <div class="card-id">WIA-{영역}-{번호}</div>
    <div class="card-title">WIA {표준명}</div>
    <div class="card-desc">{설명}</div>
    <span class="card-badge live">🔥 Live</span>
</a>
```

## 🌐 Step 3: 서브도메인 설정

```bash
STD="{표준명}"

sudo tee /etc/httpd/conf.d/${STD}.wiastandards.com.conf << EOF
<VirtualHost *:80>
    ServerName ${STD}.wiastandards.com
    DocumentRoot /var/www/wiastandards/${STD}
    DirectoryIndex index.html
    <Directory /var/www/wiastandards/${STD}>
        AllowOverride All
        Require all granted
    </Directory>
    RewriteEngine On
    RewriteCond %{HTTP:X-Forwarded-Proto} !https
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</VirtualHost>
EOF

echo "RewriteEngine Off" > /var/www/wiastandards/${STD}/.htaccess
sudo systemctl reload httpd
```

## 📤 Step 4: 워드프레스 업로드

### ⚠️ 중요: `<body>` 내용만 업로드!

WordPress는 포스트에 **HTML 본문만** 필요합니다.
전체 HTML (`<!DOCTYPE>`, `<html>`, `<head>` 포함)을 넣으면 레이아웃이 깨집니다.

```
❌ 잘못된 업로드: 전체 HTML 파일 → 레이아웃 깨짐 (좁게 표시)
✅ 올바른 업로드: <body> 안 내용만 → 와이드하게 정상 표시
```

### 스크립트 사용 (v3 - body 자동 추출)

```bash
cd /var/www/wiastandards
export LC_ALL=C && export LANG=C

# v3 스크립트는 자동으로 <body> 내용만 추출
./upload-ebook-v3.sh "WIA {표준명} Guide" ./{표준명}/ebook/en en
./upload-ebook-v3.sh "WIA {표준명} 가이드" ./{표준명}/ebook/ko ko
```

### 기존 포스트 수정 (전체 HTML → body만)

```bash
# 전체 수정 (백그라운드)
nohup /var/www/wiastandards/fix-ebook-posts.sh > /var/www/wiastandards/fix-ebook.log 2>&1 &

# 진행 확인
tail -f /var/www/wiastandards/fix-ebook.log
```

### 수동 body 추출 (단일 파일)

```bash
# HTML에서 body 내용만 추출
sed -n '/<body[^>]*>/,/<\/body>/p' chapter-01.html | sed '1d;$d' > body_only.html
```

## 📊 Step 5: 통계 갱신

```bash
/var/www/wiastandards/assets/update-stats.sh
```

---

# Part 4: i18n 다국어 시스템

## 📂 파일 구조

```
/assets/i18n/
├── en.json      ← 마스터 (영어)
├── ko.json      ← 한국어
├── ja.json      ← 일본어 (대기)
├── zh-CN.json   ← 중국어 간체 (대기)
├── ... (211개)
└── _meta.json   ← 번역 상태 추적
```

## 🔄 번역 워크플로우

```
1. Claude Code: en.json 기준 번역 생성
   URL: https://wiastandards.com/assets/i18n/en.json
   
2. MCP SSH: 서버 배포
   경로: /var/www/wiastandards/assets/i18n/
```

## 📋 번역 프롬프트 (Claude Code용)

```markdown
# WIA i18n 번역 요청

마스터 파일: https://wiastandards.com/assets/i18n/en.json

번역 우선순위:
1순위 (10개): ja, zh-CN, zh-TW, es, fr, de, pt, ru, ar, hi
2순위: 나머지 201개

번역 규칙:
- 키(key) 절대 변경 금지
- 弘益人間 한자 그대로 유지
- WIA, BCI, AAC 등 약어 번역 안 함
- _meta.language, _meta.native_name만 해당 언어로 변경
```

---

# Part 5: 주요 경로 및 URL

## 📂 서버 경로

| 용도 | 경로 |
|------|------|
| SSH 접속 | `ssh-cqm` |
| wiastandards 소스 | `/var/www/wiastandards/` |
| 메인 페이지 | `/var/www/wiastandards/index.html` |
| 워드프레스 | `/var/www/wiabooks/` |
| 업로드 스크립트 | `/var/www/wiastandards/upload-ebook-v3.sh` |
| 포스트 수정 스크립트 | `/var/www/wiastandards/fix-ebook-posts.sh` |
| 통계 스크립트 | `/var/www/wiastandards/assets/update-stats.sh` |
| i18n 폴더 | `/var/www/wiastandards/assets/i18n/` |
| Apache 설정 | `/etc/httpd/conf.d/` |

## 🔗 주요 URL

| 용도 | URL |
|------|-----|
| 메인 포털 | https://wiastandards.com/ |
| 인증 포털 | https://cert.wiastandards.com/ |
| Ebook 스토어 | https://wiabooks.store/ |
| 동적 통계 | https://wiastandards.com/assets/stats.json |
| i18n 마스터 | https://wiastandards.com/assets/i18n/en.json |
| GitHub Private | https://github.com/WIA-Official/wia-standards |
| GitHub Public | https://github.com/WIA-Official/wia-standards-public |

## 🔑 GitHub 토큰

```
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
```

---

# Part 6: 확정 표준 목록 (73개)

## 접근성/보조기술 (AAC) - 11개
aac, cognitive-aac, eye-gaze, haptic, myoelectric, exoskeleton, smart-wheelchair, voice, bci, ci, bionic-eye

## AI/지능시스템 (AI) - 12개
llm-interop, emotion-ai, intent-lang, omni-api, ai-embodiment, ai-embodiment-ethics, ai-sensor-fusion, ai-motor-control, ai-robot-interface, ai-safety-physical, ai-human-coexistence, ai-afterlife-ethics

## 의료/헬스케어 (MED) - 3개
medical, health, bio

## 냉동보존 (CRYO) - 7개
cryo-preservation, cryo-identity, cryo-consent, cryo-revival, cryo-legal, cryo-asset, cryo-facility

## 에너지/환경 (ENE) - 6개
climate, air-power, air-shield, carbon-credit-micro, ocean-plastic-track, battery-passport

## 로봇 (ROB) - 2개
robot, carebot

## 우주/물리/소재 (SPACE/QUA/MAT) - 5개
space, quantum, physics, material, nano

## 보안 (SEC) - 4개
security, dpki, pq-crypto, tls-lite

## 교통 (AUTO) - 1개
auto

## 금융 (FIN) - 1개
fintech

## 교육/문화 (EDU) - 4개
edu, game, xr, pubscript

## 건축/도시 (CITY) - 3개
digital-twin-city, smarthome, home

## 농업 (AGRI) - 1개
food-allergy-passport

## 사회/인프라 (SOC) - 2개
social, refugee-credential

## 디지털 레거시 (LEG) - 5개
digital-will, digital-executor, digital-memorial, digital-funeral, digital-erasure

## 반려동물 (PET) - 6개
pet-genome, pet-emotion, pet-legacy, pet-care-robot, pet-welfare-global, pet-health-passport

---

# Part 7: 정기 업데이트 체크리스트

## 🔄 신규 표준 추가 시

```
□ Claude Code: 콘텐츠 생성 → GitHub Push
□ MCP SSH: 서버 배포 (curl 다운로드)
□ MCP SSH: 메인페이지 카드 추가 (card-id 포함!)
□ MCP SSH: 서브도메인 설정
□ MCP SSH: 워드프레스 업로드 (EN/KO)
□ MCP SSH: GitHub Public 공개 (spec만)
□ MCP SSH: 통계 갱신 (update-stats.sh)
```

## 🌐 i18n 번역 업데이트 시

```
□ Claude Code: en.json 기준 번역 생성
□ MCP SSH: /assets/i18n/ 에 JSON 배포
□ 상태 확인: ls /var/www/wiastandards/assets/i18n/
```

## 📊 통계 갱신

```bash
/var/www/wiastandards/assets/update-stats.sh
cat /var/www/wiastandards/assets/stats.json
```

---

# Quick Reference Card

```
┌─────────────────────────────────────────────────────────────────┐
│                 WIA Standards Quick Reference                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  🔧 SSH 접속        ssh-cqm                                     │
│                                                                 │
│  📥 GitHub 다운로드  TOKEN="ghp_..."                            │
│                     curl -sL -H "Authorization: token $TOKEN"   │
│                                                                 │
│  📤 WP 업로드       ./upload-ebook-v3.sh "태그" ./경로 언어     │
│                                                                 │
│  📊 통계 갱신       ./assets/update-stats.sh                    │
│                                                                 │
│  🌐 i18n 확인       ls /var/www/wiastandards/assets/i18n/       │
│                                                                 │
│  ✅ URL 테스트      curl -sI https://wiastandards.com/$STD/     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

**弘益人間 (홍익인간) · Benefit All Humanity**

---

*버전: 5.0.0 | 작성: Claude (MCP SSH) | 2025-12-22*
