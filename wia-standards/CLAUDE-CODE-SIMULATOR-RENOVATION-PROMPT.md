# 🔧 WIA 시뮬레이터 Climate 스타일 전면 리뉴얼 프롬프트

> **목적**: 28개 시뮬레이터를 Climate 스타일로 완벽하게 리뉴얼
> **작업자**: Claude Code
> **레포**: https://github.com/WIA-Official/wia-standards (Private)

---

## 🎯 작업 개요

28개 시뮬레이터를 **Climate 스타일** (5탭 + 다크 테마 + EN/KO 토글)로 완전 리뉴얼.

**골드 스탠다드 참조 파일**:
- `climate/simulator/index.html` ← 반드시 먼저 읽기!

---

## ⚠️ 절대 규칙 (위반 시 작업 무효)

1. **다크 테마 필수**: `--bg: #0f172a` (절대 변경 금지!)
2. **5탭 구조 필수**: Data, Algorithm, Protocol, Integration, Test
3. **EN/KO 토글 필수**: localStorage 연동
4. **기존 기능 100% 유지**: JavaScript 로직 절대 삭제 금지
5. **弘益人間 필수**: 히어로 + 푸터에 반드시 포함
6. **파비콘 필수**: `<link rel="icon" href="/favicon.ico">`

---

## 📋 리뉴얼 대상 28개

### 그룹 A: CRYO (7개) - Primary: #06B6D4

| 폴더명 | 이모지 | EN 제목 | KO 제목 | 설명 EN | 설명 KO |
|--------|:------:|---------|---------|---------|---------|
| cryo-preservation | ❄️ | Cryo Preservation | 냉동 보존 | Human cryopreservation protocols | 인체 냉동보존 프로토콜 |
| cryo-identity | 🆔 | Cryo Identity | 냉동 신원 | Cryonaut identity verification | 냉동인 신원 확인 |
| cryo-consent | ✍️ | Cryo Consent | 냉동 동의 | Preservation consent management | 보존 동의 관리 |
| cryo-revival | 🔄 | Cryo Revival | 냉동 소생 | Revival protocol simulation | 소생 프로토콜 시뮬레이션 |
| cryo-legal | ⚖️ | Cryo Legal | 냉동 법률 | Legal status of cryonauts | 냉동인 법적 지위 |
| cryo-asset | 💰 | Cryo Asset | 냉동 자산 | Asset management for cryonauts | 냉동인 자산 관리 |
| cryo-facility | 🏢 | Cryo Facility | 냉동 시설 | Facility standards & monitoring | 시설 표준 및 모니터링 |

### 그룹 B: PET (6개) - Primary: #F59E0B

| 폴더명 | 이모지 | EN 제목 | KO 제목 | 설명 EN | 설명 KO |
|--------|:------:|---------|---------|---------|---------|
| pet-genome | 🧬 | Pet Genome | 반려동물 유전체 | Pet genetic data standards | 반려동물 유전 데이터 표준 |
| pet-emotion | 💕 | Pet Emotion | 반려동물 감정 | Pet emotion recognition | 반려동물 감정 인식 |
| pet-legacy | 🌈 | Pet Legacy | 반려동물 유산 | Pet memorial & inheritance | 반려동물 추모 및 유산 |
| pet-care-robot | 🤖 | Pet Care Robot | 반려동물 돌봄 로봇 | Robot-assisted pet care | 로봇 보조 반려동물 돌봄 |
| pet-welfare-global | 🌍 | Pet Welfare Global | 글로벌 동물복지 | Global animal welfare standards | 글로벌 동물복지 표준 |
| pet-health-passport | 🐾 | Pet Health Passport | 반려동물 건강여권 | International pet health records | 국제 반려동물 건강 기록 |

### 그룹 C: Digital Death (5개) - Primary: #64748B

| 폴더명 | 이모지 | EN 제목 | KO 제목 | 설명 EN | 설명 KO |
|--------|:------:|---------|---------|---------|---------|
| digital-will | 📜 | Digital Will | 디지털 유언 | Digital testament management | 디지털 유언장 관리 |
| digital-executor | 👤 | Digital Executor | 디지털 유언집행자 | Digital estate executor | 디지털 유산 집행자 |
| digital-funeral | 🕯️ | Digital Funeral | 디지털 장례 | Online funeral services | 온라인 장례 서비스 |
| digital-memorial | 🪦 | Digital Memorial | 디지털 추모 | Digital memorial management | 디지털 추모 관리 |
| digital-erasure | 🗑️ | Digital Erasure | 디지털 삭제권 | Right to digital erasure | 디지털 삭제권 |

### 그룹 D: 기타 (10개) - 각자 Primary 색상

| 폴더명 | 이모지 | EN 제목 | KO 제목 | Primary | 설명 EN | 설명 KO |
|--------|:------:|---------|---------|---------|---------|---------|
| aac | ♿ | AAC | 보완대체의사소통 | #3B82F6 | Augmentative communication | 보완대체 의사소통 |
| refugee-credential | 🛂 | Refugee Credential | 난민 자격증명 | #8B5CF6 | Refugee identity verification | 난민 신원 확인 |
| llm-interop | 🤖 | LLM Interop | LLM 상호운용 | #10B981 | LLM interoperability | LLM 상호운용성 |
| ci | 🦻 | Cochlear Implant | 인공와우 | #8B5CF6 | Cochlear implant standards | 인공와우 표준 |
| battery-passport | 🔋 | Battery Passport | 배터리 여권 | #22C55E | Battery lifecycle tracking | 배터리 수명 추적 |
| digital-twin-city | 🏙️ | Digital Twin City | 디지털 트윈 도시 | #0EA5E9 | Smart city digital twin | 스마트 도시 디지털 트윈 |
| ai-afterlife-ethics | 👻 | AI Afterlife Ethics | AI 사후 윤리 | #8B5CF6 | AI ethics after death | 사후 AI 윤리 |
| ocean-plastic-track | 🌊 | Ocean Plastic Track | 해양 플라스틱 추적 | #0EA5E9 | Ocean plastic monitoring | 해양 플라스틱 모니터링 |
| home | 🏠 | Smart Home | 스마트홈 | #6366F1 | Smart home automation | 스마트홈 자동화 |
| social | 👥 | Social Welfare | 사회복지 | #8B5CF6 | Social welfare systems | 사회복지 시스템 |

---

## 🏗️ Climate 스타일 구조 (필수 적용)

### 1. HTML 기본 구조

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WIA {표준명} - Interactive Simulator</title>
    <style>
        /* CSS 변수 - 필수! */
        :root {
            --primary: {Primary색상};
            --primary-dark: {Primary어둡게};
            --secondary: #F59E0B;
            --danger: #ef4444;
            --bg: #0f172a;           /* ← 절대 변경 금지! */
            --bg-card: #1e293b;
            --text: #f8fafc;
            --text-muted: #94a3b8;
            --border: #334155;
        }
        /* ... Climate 스타일 CSS 전체 복사 ... */
    </style>
</head>
<body>
    <div class="container">
        <!-- 헤더 -->
        <!-- 히어로 -->
        <!-- 5탭 -->
        <!-- 5패널 -->
        <!-- 푸터 -->
    </div>
    <script>
        /* 언어 토글 + 기존 기능 */
    </script>
</body>
</html>
```

### 2. 헤더 (top-nav) - 필수!

```html
<div class="top-nav">
    <div class="nav-left">
        <a href="https://wiastandards.com" class="nav-home" target="_blank">🤟 WIA Standards</a>
        <div class="breadcrumb">
            <a href="https://wiastandards.com" target="_blank">Home</a>
            <span class="sep">›</span>
            <a href="https://wiastandards.com/{폴더명}/" target="_blank">{표준명}</a>
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
```

### 3. 히어로 섹션 - 필수!

```html
<section class="hero">
    <h1 data-en="{이모지} WIA {EN제목}" data-ko="{이모지} WIA {KO제목}">{이모지} WIA {EN제목}</h1>
    <p data-en="{EN설명}" data-ko="{KO설명}">{EN설명}</p>
    <p class="philosophy">弘益人間 · Benefit All Humanity</p>
</section>
```

### 4. 5탭 구조 - 필수!

```html
<div class="tabs">
    <div class="tab active" onclick="showPanel(0)" data-en="📊 Data Format" data-ko="📊 데이터 형식">📊 Data Format</div>
    <div class="tab" onclick="showPanel(1)" data-en="🔢 Algorithm" data-ko="🔢 알고리즘">🔢 Algorithm</div>
    <div class="tab" onclick="showPanel(2)" data-en="📡 Protocol" data-ko="📡 프로토콜">📡 Protocol</div>
    <div class="tab" onclick="showPanel(3)" data-en="🔗 Integration" data-ko="🔗 통합">🔗 Integration</div>
    <div class="tab" onclick="showPanel(4)" data-en="🧪 Test" data-ko="🧪 테스트">🧪 Test</div>
</div>
```

### 5. 패널 구조 - 필수!

```html
<div id="panel0" class="panel active">
    <h2 data-en="📊 Data Format" data-ko="📊 데이터 형식">📊 Data Format</h2>
    <!-- 기존 기능을 이 안에 배치 -->
</div>

<div id="panel1" class="panel">
    <h2 data-en="🔢 Algorithm" data-ko="🔢 알고리즘">🔢 Algorithm</h2>
    <!-- ... -->
</div>

<!-- panel2, panel3, panel4 동일 구조 -->
```

### 6. 푸터 - 필수!

```html
<footer>
    <p class="philosophy" style="color: #ffd700; font-size: 1.1rem;" 
       data-en="弘益人間 · Benefit All Humanity" 
       data-ko="弘益人間 · 널리 인간을 이롭게 하라">弘益人間 · Benefit All Humanity</p>
    <p style="color: var(--text-muted);" 
       data-en="WIA {EN표준명}: {EN태그라인}" 
       data-ko="WIA {KO표준명}: {KO태그라인}">WIA {EN표준명}: {EN태그라인}</p>
    <div class="footer-links" style="display: flex; gap: 20px; justify-content: center; margin-top: 15px;">
        <a href="https://wiastandards.com" target="_blank" style="color: var(--text-muted); text-decoration: none;" data-en="🏠 Home" data-ko="🏠 홈">🏠 Home</a>
        <a href="https://wiastandards.com/#standards" target="_blank" style="color: var(--text-muted); text-decoration: none;" data-en="📋 All Standards" data-ko="📋 전체 표준">📋 All Standards</a>
        <a href="https://wiabooks.store" target="_blank" style="color: var(--text-muted); text-decoration: none;" data-en="📚 Ebook" data-ko="📚 전자책">📚 Ebook</a>
        <a href="https://github.com/WIA-Official/wia-standards" target="_blank" style="color: var(--text-muted); text-decoration: none;">GitHub</a>
    </div>
</footer>
```

### 7. JavaScript - 필수 함수!

```javascript
// 패널 전환
function showPanel(index) {
    document.querySelectorAll('.panel').forEach((p, i) => {
        p.classList.toggle('active', i === index);
    });
    document.querySelectorAll('.tab').forEach((t, i) => {
        t.classList.toggle('active', i === index);
    });
}

// 언어 전환
function setLang(lang) {
    localStorage.setItem('wiaLang', lang);
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent === lang.toUpperCase());
    });
    document.querySelectorAll('[data-en][data-ko]').forEach(el => {
        el.textContent = el.getAttribute('data-' + lang);
    });
}

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('wiaLang') || 'en';
    setLang(savedLang);
});
```

---

## 🔧 작업 프로세스 (각 시뮬레이터당)

### Step 1: 기존 파일 분석
```
1. 기존 HTML 구조 파악
2. 기존 JavaScript 기능 목록 작성
3. 기존 폼/입력 요소 파악
```

### Step 2: Climate 템플릿 적용
```
1. climate/simulator/index.html 복사
2. Primary 색상 변경
3. 헤더/히어로 정보 변경
4. 푸터 정보 변경
```

### Step 3: 기존 기능 5탭에 배치
```
기존 기능 → 5탭 분류:
- 데이터 입력/등록 → Tab 1 (Data Format)
- 계산/분석 → Tab 2 (Algorithm)
- API/통신 → Tab 3 (Protocol)
- 통합/시나리오 → Tab 4 (Integration)
- 테스트/검증 → Tab 5 (Test)
```

### Step 4: EN/KO 번역 적용
```
모든 텍스트에 data-en, data-ko 속성 추가
```

### Step 5: 테스트
```
1. 5탭 전환 동작 확인
2. EN/KO 전환 동작 확인
3. 기존 기능 동작 확인
4. 반응형 확인
```

---

## 📎 필수 CSS (Climate에서 복사)

```css
/* Reset & Base */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; line-height: 1.6; }
.container { max-width: 1200px; margin: 0 auto; padding: 20px; }

/* Top Navigation */
.top-nav { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--border); margin-bottom: 10px; flex-wrap: wrap; gap: 15px; }
.nav-left { display: flex; align-items: center; gap: 20px; }
.nav-home { color: var(--text); text-decoration: none; font-weight: bold; }
.nav-home:hover { color: var(--primary); }
.breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--text-muted); }
.breadcrumb a { color: var(--text-muted); text-decoration: none; }
.breadcrumb a:hover { color: var(--primary); }
.breadcrumb .sep { color: var(--border); }
.breadcrumb .current { color: var(--primary); font-weight: 500; }
.nav-links { display: flex; gap: 15px; }
.nav-links a { color: var(--text-muted); text-decoration: none; font-size: 0.85rem; }
.nav-links a:hover { color: var(--primary); }

/* Language Switch */
.lang-switch { display: flex; gap: 10px; }
.lang-btn { padding: 8px 16px; border: 1px solid var(--border); background: transparent; color: var(--text); border-radius: 6px; cursor: pointer; transition: all 0.2s; }
.lang-btn.active { background: var(--primary); border-color: var(--primary); }
.lang-btn:hover { border-color: var(--primary); }

/* Hero */
.hero { text-align: center; padding: 40px 0; }
.hero h1 { font-size: 2.5rem; margin-bottom: 15px; background: linear-gradient(90deg, var(--primary), var(--secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.hero p { color: var(--text-muted); font-size: 1.1rem; }
.hero .philosophy { color: #ffd700; font-size: 1rem; margin-top: 10px; }

/* Tabs */
.tabs { display: flex; justify-content: center; gap: 10px; margin-bottom: 30px; flex-wrap: wrap; }
.tab { padding: 12px 24px; border: 1px solid var(--border); background: var(--bg-card); color: var(--text); border-radius: 8px; cursor: pointer; transition: all 0.2s; }
.tab.active { background: var(--primary); border-color: var(--primary); }
.tab:hover { border-color: var(--primary); }

/* Panels */
.panel { display: none; background: var(--bg-card); border-radius: 12px; padding: 30px; border: 1px solid var(--border); }
.panel.active { display: block; }
.panel h2 { margin-bottom: 20px; color: var(--primary); display: flex; align-items: center; gap: 10px; }

/* Buttons */
.btn { padding: 12px 24px; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: 600; transition: all 0.2s; }
.btn-primary { background: var(--primary); color: white; }
.btn-primary:hover { background: var(--primary-dark); transform: translateY(-2px); }
.btn-secondary { background: var(--bg); border: 1px solid var(--border); color: var(--text); }
.btn-center { display: flex; justify-content: center; gap: 15px; margin-top: 20px; }

/* Output */
.output { background: var(--bg); border: 1px solid var(--border); border-radius: 8px; padding: 20px; margin-top: 20px; font-family: 'Monaco', 'Menlo', monospace; font-size: 0.85rem; white-space: pre-wrap; max-height: 400px; overflow-y: auto; }

/* Forms */
input, select, textarea { background: var(--bg); border: 1px solid var(--border); color: var(--text); padding: 10px 15px; border-radius: 6px; font-size: 1rem; width: 100%; }
input:focus, select:focus, textarea:focus { outline: none; border-color: var(--primary); }
label { display: block; margin-bottom: 8px; color: var(--text-muted); font-size: 0.9rem; }

/* Grid */
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; }

/* Cards */
.card { background: var(--bg); border: 1px solid var(--border); border-radius: 10px; padding: 20px; }
.card h3 { color: var(--primary); margin-bottom: 15px; }

/* Footer */
footer { margin-top: 60px; padding: 30px 0; border-top: 1px solid var(--border); text-align: center; color: var(--text-muted); }

/* Responsive */
@media (max-width: 768px) {
    .top-nav { flex-direction: column; gap: 15px; }
    .nav-left { flex-direction: column; gap: 10px; }
    .hero h1 { font-size: 1.8rem; }
    .tabs { flex-direction: column; }
    .tab { width: 100%; text-align: center; }
    .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
}
```

---

## ✅ 완료 체크리스트 (각 파일당)

```
□ 다크 테마 적용 (--bg: #0f172a)
□ Primary 색상 적용
□ 파비콘 적용
□ top-nav 헤더 적용
□ 히어로 섹션 (弘益人間 포함)
□ 5탭 구조 적용
□ 5패널 구조 적용
□ 기존 기능 5탭에 분배
□ EN/KO 토글 동작
□ localStorage 연동
□ 푸터 (弘益人間 포함)
□ 반응형 CSS 적용
□ 모든 외부 링크 target="_blank"
```

---

## 🚀 작업 순서

1. **먼저 climate/simulator/index.html 완전히 분석**
2. **그룹 A (CRYO 7개)** → 커밋
3. **그룹 B (PET 6개)** → 커밋
4. **그룹 C (Digital Death 5개)** → 커밋
5. **그룹 D (기타 10개)** → 커밋
6. **최종 테스트 + Push**

---

## 💡 팁

- 기존 raw HTML은 `<div class="card">` 로 감싸서 스타일 적용
- 기존 `<h2>[1] 제목</h2>` → `<h3 data-en="..." data-ko="...">제목</h3>`
- 기존 `<form>` 그대로 유지, 스타일만 적용
- 기존 JavaScript 함수 절대 삭제 금지!

---

**弘益人間 (홍익인간) · Benefit All Humanity**

---

*작성: Claude (MCP SSH) | 2025-12-27*
