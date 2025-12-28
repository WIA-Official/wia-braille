# 🔧 WIA 시뮬레이터 헤더/푸터 스타일 통일 가이드

## 📋 작업 개요
- **목표**: 28개 시뮬레이터를 Climate 스타일로 통일
- **작업 방식**: 한땀한땀 개별 수정 (일괄 스크립트 금지!)
- **서버**: CQM (ssh-cqm:exec)
- **경로**: /var/www/wiastandards/

---

## 🎯 Climate 스타일 표준 템플릿

### 헤더 (top-nav)
```html
<div class="top-nav">
    <div class="nav-left">
        <a href="https://wiastandards.com" class="nav-home" target="_blank">🤟 WIA Standards</a>
        <div class="breadcrumb">
            <a href="https://wiastandards.com" target="_blank">Home</a>
            <span class="sep">›</span>
            <a href="https://wiastandards.com/[STANDARD-ID]/" target="_blank">[STANDARD-NAME]</a>
            <span class="sep">›</span>
            <span class="current" data-en="Simulator" data-ko="시뮬레이터">Simulator</span>
        </div>
    </div>
    <div style="display: flex; align-items: center; gap: 25px;">
        <nav class="nav-links">
            <a href="https://cert.wiastandards.com" target="_blank" data-en="🏆 Certification" data-ko="🏆 인증">🏆 Certification</a>
            <a href="https://wiabooks.store" target="_blank" data-en="📚 Ebook" data-ko="📚 전자책">📚 Ebook</a>
            <a href="https://github.com/WIA-Official/wia-standards" target="_blank">GitHub</a>
        </nav>
        <div class="lang-switch">
            <button class="lang-btn active" onclick="setLang('en')">EN</button>
            <button class="lang-btn" onclick="setLang('ko')">KO</button>
        </div>
    </div>
</div>

<section class="hero" style="text-align: center; padding: 30px 0;">
    <h1 style="color: var(--primary); font-size: 2rem;" data-en="[EMOJI] [TITLE-EN]" data-ko="[EMOJI] [TITLE-KO]">[EMOJI] [TITLE-EN]</h1>
    <p style="color: var(--text-muted);" data-en="[DESC-EN]" data-ko="[DESC-KO]">[DESC-EN]</p>
    <p class="philosophy" style="color: #ffd700; margin-top: 10px;">弘益人間 · Benefit All Humanity</p>
</section>
```

### 푸터
```html
<footer>
    <p class="philosophy" style="color: #ffd700; font-size: 1.1rem;" data-en="弘益人間 · Benefit All Humanity" data-ko="弘益人間 · 널리 인간을 이롭게 하라">弘益人間 · Benefit All Humanity</p>
    <p style="color: var(--text-muted);" data-en="WIA [STANDARD-NAME]: [TAGLINE-EN]" data-ko="WIA [STANDARD-NAME]: [TAGLINE-KO]">WIA [STANDARD-NAME]: [TAGLINE-EN]</p>
    <div class="footer-links" style="display: flex; gap: 20px; justify-content: center; margin-top: 15px;">
        <a href="https://wiastandards.com" target="_blank" style="color: var(--text-muted); text-decoration: none;" data-en="🏠 Home" data-ko="🏠 홈">🏠 Home</a>
        <a href="https://wiastandards.com/#standards" target="_blank" style="color: var(--text-muted); text-decoration: none;" data-en="📋 All Standards" data-ko="📋 전체 표준">📋 All Standards</a>
        <a href="https://wiabooks.store" target="_blank" style="color: var(--text-muted); text-decoration: none;" data-en="📚 Ebook" data-ko="📚 전자책">📚 Ebook</a>
        <a href="https://github.com/WIA-Official/wia-standards" target="_blank" style="color: var(--text-muted); text-decoration: none;">GitHub</a>
    </div>
</footer>
```

### 필요한 CSS (없으면 추가)
```css
/* Top Navigation - Climate Style */
.top-nav { display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid var(--border); margin-bottom: 20px; flex-wrap: wrap; gap: 15px; }
.nav-left { display: flex; align-items: center; gap: 20px; }
.nav-home { color: var(--text); text-decoration: none; font-weight: bold; font-size: 1.1rem; }
.nav-home:hover { color: var(--primary); }
.breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--text-muted); }
.breadcrumb a { color: var(--text-muted); text-decoration: none; }
.breadcrumb a:hover { color: var(--primary); }
.breadcrumb .sep { color: var(--border); }
.breadcrumb .current { color: var(--primary); }
.nav-links { display: flex; gap: 20px; }
.nav-links a { color: var(--text-muted); text-decoration: none; font-size: 0.9rem; }
.nav-links a:hover { color: var(--primary); }
```

---

## 📝 수정 대상 28개 시뮬레이터

### 그룹 A: CRYO (7개)
| # | 경로 | 이모지 | 표준명 EN | 표준명 KO |
|---|------|:------:|-----------|-----------|
| 1 | cryo-preservation/simulator/index.html | ❄️ | Cryo Preservation | 냉동 보존 |
| 2 | cryo-identity/simulator/index.html | 🆔 | Cryo Identity | 냉동 신원 |
| 3 | cryo-consent/simulator/index.html | ✍️ | Cryo Consent | 냉동 동의 |
| 4 | cryo-revival/simulator/index.html | 🔄 | Cryo Revival | 냉동 소생 |
| 5 | cryo-legal/simulator/index.html | ⚖️ | Cryo Legal | 냉동 법률 |
| 6 | cryo-asset/simulator/index.html | 💰 | Cryo Asset | 냉동 자산 |
| 7 | cryo-facility/simulator/index.html | 🏢 | Cryo Facility | 냉동 시설 |

### 그룹 B: PET (6개)
| # | 경로 | 이모지 | 표준명 EN | 표준명 KO |
|---|------|:------:|-----------|-----------|
| 8 | pet-genome/simulator/index.html | 🧬 | Pet Genome | 반려동물 유전체 |
| 9 | pet-emotion/simulator/index.html | 💕 | Pet Emotion | 반려동물 감정 |
| 10 | pet-legacy/simulator/index.html | 🌈 | Pet Legacy | 반려동물 유산 |
| 11 | pet-care-robot/simulator/index.html | 🤖 | Pet Care Robot | 반려동물 돌봄 로봇 |
| 12 | pet-welfare-global/simulator/index.html | 🌍 | Pet Welfare Global | 글로벌 동물복지 |
| 13 | pet-health-passport/simulator/index.html | 🐾 | Pet Health Passport | 반려동물 건강여권 |

### 그룹 C: Digital Death (5개)
| # | 경로 | 이모지 | 표준명 EN | 표준명 KO |
|---|------|:------:|-----------|-----------|
| 14 | digital-will/simulator/index.html | 📜 | Digital Will | 디지털 유언 |
| 15 | digital-executor/simulator/index.html | 👤 | Digital Executor | 디지털 유언집행자 |
| 16 | digital-funeral/simulator/index.html | 🕯️ | Digital Funeral | 디지털 장례 |
| 17 | digital-memorial/simulator/index.html | 🪦 | Digital Memorial | 디지털 추모 |
| 18 | digital-erasure/simulator/index.html | 🗑️ | Digital Erasure | 디지털 삭제권 |

### 그룹 D: 기타 (10개)
| # | 경로 | 이모지 | 표준명 EN | 표준명 KO |
|---|------|:------:|-----------|-----------|
| 19 | aac/simulator/index.html | ♿ | AAC | 보완대체의사소통 |
| 20 | refugee-credential/simulator/index.html | 🛂 | Refugee Credential | 난민 자격증명 |
| 21 | llm-interop/simulator/index.html | 🤖 | LLM Interop | LLM 상호운용 |
| 22 | ci/simulator/index.html | 🦻 | Cochlear Implant | 인공와우 |
| 23 | battery-passport/simulator/index.html | 🔋 | Battery Passport | 배터리 여권 |
| 24 | digital-twin-city/simulator/index.html | 🏙️ | Digital Twin City | 디지털 트윈 도시 |
| 25 | ai-afterlife-ethics/simulator/index.html | 👻 | AI Afterlife Ethics | AI 사후 윤리 |
| 26 | ocean-plastic-track/simulator/index.html | 🌊 | Ocean Plastic Track | 해양 플라스틱 추적 |
| 27 | home/simulator/index.html | 🏠 | Smart Home | 스마트홈 |
| 28 | social/simulator/index.html | 👥 | Social Welfare | 사회복지 |

---

## 🔧 개별 작업 절차 (각 시뮬레이터당)

### Step 1: 백업
```bash
cp /var/www/wiastandards/[PATH]/simulator/index.html /var/www/wiastandards/backups/[NAME]-backup-$(date +%Y%m%d%H%M%S).html
```

### Step 2: 현재 헤더 구조 확인
```bash
sed -n '/<body/,/<div class="tabs"\|<div class="panel/p' /var/www/wiastandards/[PATH]/simulator/index.html | head -30
```

### Step 3: 현재 푸터 구조 확인
```bash
sed -n '/<footer/,/<\/footer>/p' /var/www/wiastandards/[PATH]/simulator/index.html
```

### Step 4: CSS에 top-nav 스타일 있는지 확인
```bash
grep -c "\.top-nav\|\.nav-left" /var/www/wiastandards/[PATH]/simulator/index.html
```

### Step 5: Python으로 헤더 교체
```python
# 템플릿의 [STANDARD-ID], [STANDARD-NAME], [EMOJI], [TITLE-EN], [TITLE-KO], [DESC-EN], [DESC-KO] 치환하여 사용
```

### Step 6: Python으로 푸터 교체
```python
# 템플릿의 [STANDARD-NAME], [TAGLINE-EN], [TAGLINE-KO] 치환하여 사용
```

### Step 7: CSS 추가 (필요시)
```bash
# </style> 앞에 top-nav CSS 추가
```

### Step 8: 결과 확인
```bash
grep -c "nav-left" /var/www/wiastandards/[PATH]/simulator/index.html
curl -sI https://[SUBDOMAIN].wiastandards.com/simulator/ | head -3
```

### Step 9: Git 커밋 (그룹별)
```bash
cd /var/www/wiastandards
git add [PATH]/simulator/index.html
git commit -m "style([GROUP]): Apply Climate header/footer style to [NAME]"
```

---

## ✅ 완료 체크리스트

- [ ] 그룹 A: CRYO (7개)
- [ ] 그룹 B: PET (6개)
- [ ] 그룹 C: Digital Death (5개)
- [ ] 그룹 D: 기타 (10개)
- [ ] GitHub Push

---

## 📎 참조 파일 (Climate 스타일 예시)
- /var/www/wiastandards/climate/simulator/index.html
- /var/www/wiastandards/haptic/simulator/index.html
- /var/www/wiastandards/carbon-credit-micro/simulator/index.html

---

弘益人間 (홍익인간) · Benefit All Humanity
