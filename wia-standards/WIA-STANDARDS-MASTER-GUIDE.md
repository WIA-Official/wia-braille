# WIA Standards Master Creation Guide
# 표준 생성 시 반드시 참조할 최종 가이드

> **Version:** 1.0.0
> **Updated:** 2024-12-18
> **Purpose:** 새 표준 생성 시 처음부터 표준 디자인으로 만들기 위한 마스터 가이드

---

## 🎯 핵심 원칙 (절대 규칙!)

```
1. 모든 페이지는 다크 테마 (#0f172a) - 예외 없음!
2. 모든 링크는 target="_blank" - 예외 없음!
3. 모든 텍스트는 data-en/data-ko 이중언어 - 예외 없음!
4. localStorage로 언어 설정 유지 - 예외 없음!
5. 弘益人間 푸터 필수 - 예외 없음!
6. 반응형 CSS 필수 - 예외 없음!
```

---

## 📂 표준 디렉토리 구조 (필수)

```
{표준명}/
├── index.html              # 랜딩페이지 (필수)
├── simulator/
│   └── index.html          # 시뮬레이터 (필수)
├── ebook/
│   ├── en/
│   │   ├── index.html
│   │   └── chapter-01~08.html
│   └── ko/
│       ├── index.html
│       └── chapter-01~08.html
├── spec/
│   ├── PHASE-1-DATA-FORMAT.md
│   ├── PHASE-2-API.md
│   ├── PHASE-3-PROTOCOL.md
│   └── PHASE-4-INTEGRATION.md
└── README.md
```

---

## 🎨 CSS 변수 (공통 - 모든 페이지 필수!)

```css
:root {
    --primary: #3B82F6;      /* ← 카테고리별 변경 */
    --primary-dark: #2563EB;
    --secondary: #10b981;
    --warning: #f59e0b;
    --danger: #ef4444;
    --bg: #0f172a;           /* ← 절대 변경 금지! */
    --bg-card: #1e293b;
    --text: #f8fafc;
    --text-muted: #94a3b8;
    --border: #334155;
}
```

---

## 🎨 카테고리별 Primary 색상

| 카테고리 | Primary | Hex | 표준 예시 |
|----------|---------|-----|-----------|
| 접근성 | Blue | `#3B82F6` | aac, haptic, voice, eye-gaze, bci |
| AI/기술 | Green | `#10B981` | llm-interop, ai, intent-lang |
| 냉동/저온 | Cyan | `#06B6D4` | cryo-* |
| 반려동물 | Amber | `#F59E0B` | pet-* |
| 인도주의 | Purple | `#8B5CF6` | refugee-credential |
| 에너지/환경 | Red | `#EF4444` | battery-passport, carbon-* |
| 보안/암호 | Pink | `#EC4899` | security, pq-crypto, dpki |
| 의료/건강 | Teal | `#14B8A6` | medical, health, bio |
| 게임/XR | Purple | `#A855F7` | game, xr |
| 스마트/로봇 | Orange | `#F97316` | smarthome, robot, carebot |
| 우주/물리 | Indigo | `#6366F1` | quantum, space, physics |
| 금융 | Green | `#22C55E` | fintech |
| 디지털사후 | Slate | `#64748B` | digital-death-* |
| 식품/농업 | Lime | `#84CC16` | food-*, ocean-* |
| 도시/인프라 | Sky | `#0EA5E9` | digital-twin-* |

---

## 📄 랜딩페이지 필수 요소

### 1. Top Navigation (필수)
```html
<div class="top-nav">
    <div class="nav-left">
        <a href="https://wiastandards.com" class="nav-home" target="_blank">🤟 WIA Standards</a>
        <div class="breadcrumb">
            <a href="https://wiastandards.com" target="_blank">Home</a>
            <span class="sep">›</span>
            <a href="https://wiastandards.com/#standards" target="_blank">Standards</a>
            <span class="sep">›</span>
            <span class="current">{표준명-대문자}</span>
        </div>
    </div>
    <div class="nav-right">
        <nav class="nav-links">
            <a href="https://cert.wiastandards.com" target="_blank" data-en="🏆 Certification" data-ko="🏆 인증">🏆 Certification</a>
            <a href="https://wiabooks.store/reader/simulators/" target="_blank" data-en="🎮 Simulators" data-ko="🎮 시뮬레이터">🎮 Simulators</a>
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

### 2. Hero Section (필수)
```html
<section class="hero">
    <div class="hero-emoji">{이모지}</div>
    <h1 data-en="WIA {표준명} Standard" data-ko="WIA {표준명} 표준">...</h1>
    <p class="subtitle" data-en="{영문 부제}" data-ko="{한글 부제}">...</p>
    <p class="desc" data-en="{영문 설명}" data-ko="{한글 설명}">...</p>
</section>
```

### 3. Action Buttons (2개만!)
```html
<div class="actions">
    <a href="/simulator/" class="btn btn-primary" target="_blank" data-en="🎮 Try Simulator" data-ko="🎮 시뮬레이터 체험">🎮 Try Simulator</a>
    <a href="https://wiabooks.store/{표준명}/" class="btn btn-secondary" target="_blank" data-en="📚 Read Ebook" data-ko="📚 전자책 읽기">📚 Read Ebook</a>
</div>
```

### 4. Phases Grid (2열 2행, max-width: 500px)
```html
<div class="phases"> <!-- max-width: 500px; margin: 30px auto; -->
    <a href="..." class="phase done" target="_blank">
        <div class="phase-num">1</div>
        <div class="phase-title" data-en="Data Format" data-ko="데이터 형식">...</div>
        <div class="phase-status">✅ Complete</div>
    </a>
    <!-- 2, 3, 4 동일 -->
</div>
```

### 5. Footer (필수)
```html
<footer>
    <p class="philosophy" data-en="弘益人間 · Benefit All Humanity" data-ko="弘益人間 · 널리 인간을 이롭게 하라">弘益人間 · Benefit All Humanity</p>
    <p>WIA - World Certification Industry Association</p>
    <p>© 2025 MIT License</p>
    <div class="footer-links">
        <a href="https://wiastandards.com" target="_blank">🏠 Home</a>
        <a href="https://wiastandards.com/#standards" target="_blank">📋 All Standards</a>
        <a href="https://wiabooks.store" target="_blank">📚 Ebook</a>
        <a href="https://github.com/WIA-Official/wia-standards" target="_blank">GitHub</a>
    </div>
</footer>
```

### 6. 반응형 CSS (필수)
```css
@media (max-width: 768px) {
    .top-nav { flex-direction: column; gap: 15px; }
    .nav-right { flex-direction: column; gap: 15px; }
    .hero h1 { font-size: 2rem; }
    .breadcrumb { display: none; }
}
```

### 7. EN/KO 토글 JavaScript (필수)
```javascript
let currentLang = localStorage.getItem('wiaLang') || 'en';

function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('wiaLang', lang);
    document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = el.getAttribute('data-' + lang);
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase() === lang);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setLang(currentLang);
});
```

---

## 🎮 시뮬레이터 필수 요소

### 1. 5탭 구조 (필수, 가운데 정렬!)
```html
<div class="tabs"> <!-- justify-content: center; -->
    <div class="tab active" onclick="showPanel(0)" data-en="📊 Data Format" data-ko="📊 데이터 형식">📊 Data Format</div>
    <div class="tab" onclick="showPanel(1)" data-en="🔢 Algorithms" data-ko="🔢 알고리즘">🔢 Algorithms</div>
    <div class="tab" onclick="showPanel(2)" data-en="📡 Protocol" data-ko="📡 프로토콜">📡 Protocol</div>
    <div class="tab" onclick="showPanel(3)" data-en="🔗 Integration" data-ko="🔗 통합">🔗 Integration</div>
    <div class="tab" onclick="showPanel(4)" data-en="📱 QR & VC" data-ko="📱 QR & VC">📱 QR & VC</div>
</div>
```

### 2. 버튼 가운데 정렬 (필수!)
```html
<div class="btn-center"> <!-- display: flex; justify-content: center; -->
    <button class="btn btn-primary" onclick="action()">Button</button>
</div>
```

### 3. Panel 전환 JavaScript
```javascript
function showPanel(index) {
    document.querySelectorAll('.panel').forEach((p, i) => p.classList.toggle('active', i === index));
    document.querySelectorAll('.tab').forEach((t, i) => t.classList.toggle('active', i === index));
}
```

### 4. 반응형 CSS (필수)
```css
@media (max-width: 768px) {
    .top-nav { flex-direction: column; gap: 15px; text-align: center; }
    .nav-left { flex-direction: column; gap: 10px; }
    .nav-links { flex-wrap: wrap; justify-content: center; gap: 10px; }
    .tabs { flex-direction: column; align-items: center; }
    .tab { width: 100%; text-align: center; }
    .hero h1 { font-size: 1.8rem; }
    .breadcrumb { display: none; }
    footer .links { flex-direction: column; gap: 10px; }
    footer .links a { display: block; }
}
```

---

## ✅ 체크리스트 (새 표준 생성 시 확인)

### 랜딩페이지 (index.html)
- [ ] 다크 테마 (#0f172a)
- [ ] 카테고리별 --primary 색상
- [ ] top-nav + breadcrumb
- [ ] nav-links (Cert, Sims, Ebook, GitHub)
- [ ] EN/KO 토글 + localStorage
- [ ] 모든 텍스트 data-en/data-ko
- [ ] 모든 링크 target="_blank"
- [ ] 액션 버튼 2개 (Simulator, Ebook)
- [ ] Phases 2열 2행 (max-width: 500px)
- [ ] 弘益人間 푸터
- [ ] 반응형 @media

### 시뮬레이터 (simulator/index.html)
- [ ] 다크 테마 (#0f172a)
- [ ] 카테고리별 --primary 색상
- [ ] top-nav + breadcrumb
- [ ] nav-links
- [ ] EN/KO 토글 + localStorage
- [ ] 5탭 구조 (Data, Algorithm, Protocol, Integration, QR)
- [ ] 탭 가운데 정렬 (justify-content: center)
- [ ] 버튼 가운데 정렬 (btn-center)
- [ ] 모든 텍스트 data-en/data-ko
- [ ] 모든 링크 target="_blank"
- [ ] 弘益人間 푸터
- [ ] 반응형 @media

---

## ❌ 하지 말 것!

```
❌ 밝은 배경 (white, #ffffff, gradient)
❌ target="_blank" 누락
❌ data-en/data-ko 누락
❌ localStorage 미사용
❌ 弘益人間 푸터 누락
❌ 반응형 @media 누락
❌ 탭 3개 또는 4개 (5개 필수!)
❌ 좌측 정렬 버튼 (가운데 정렬!)
❌ View Spec 버튼 (Phases와 중복!)
```

---

## 🔄 새 표준 생성 워크플로우

```
1. 표준명 결정 (예: food-allergy-passport)
2. 카테고리 확인 → Primary 색상 결정
3. 랜딩페이지 템플릿 복사 → 커스터마이징
4. 시뮬레이터 템플릿 복사 → 5탭 내용 작성
5. Ebook 8챕터 (EN/KO) 작성
6. Spec 4개 Phase MD 작성
7. 체크리스트 확인
8. GitHub 푸시
9. 서버 배포 (수정 없이 그대로!)
```

---

## 📎 참조 템플릿

- **랜딩페이지**: `aac/index.html`
- **시뮬레이터**: `refugee-credential/simulator/index.html`

---

**弘益人間 (홍익인간) · Benefit All Humanity**
