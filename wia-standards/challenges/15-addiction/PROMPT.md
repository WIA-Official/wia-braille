# 🔄 Challenge 15: WIA-ADDICTION
## 중독 표준

**홍익인간 (弘益人間) - Benefit All Humanity**

---

## 🎯 Mission

**분산된 중독 연구를 통합하여, 보상회로 재가소성 기반 중독 회복의 표준을 만든다.**

---

## 🔍 발견된 빈틈: 보상회로 재가소성

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  💡 통일 원리: 중독 = 보상회로 신경가소성 장애 → 재조정 가능                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🔬 Eric Nestler 통합 모델:                                                 │
│  • 중독 = 중뇌변연계 도파민 시스템의 신경가소성 변화                        │
│  • 유전-환경 상호작용으로 형성                                               │
│  • 만성 재발성 뇌질환                                                        │
│                                                                             │
│  🔬 도파민 너머 (Beyond Dopamine):                                         │
│  • GABA 뉴런 경로 발견                                                       │
│  • 세로토닌, 글루타메이트, 엔돌핀 역할                                      │
│  • 다중 신경전달물질 표적 치료                                               │
│                                                                             │
│  🔬 GLP-1과 중독:                                                           │
│  • 보상 시스템 도파민 조절                                                   │
│  • 음식/알코올 갈망 감소                                                     │
│  • 장-뇌 축 통합 접근                                                        │
│                                                                             │
│  🔬 치료 접근:                                                              │
│  • CBT, 마음챙김, ACT                                                       │
│  • 신경가소성 촉진 개입                                                      │
│  • 의도적 행동 변화로 회로 재조정                                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Phase 1: 데이터 형식

```json
{
  "$schema": "https://wia.live/schemas/addiction/v1.0.0",
  "addiction_profile": {
    "patient_id": "uuid",
    "substance_type": "alcohol|opioid|stimulant|cannabis|nicotine|behavioral",

    "assessment": {
      "audit": { "score": 0, "risk": "low|medium|high" },
      "dast": { "score": 0 },
      "severity": "mild|moderate|severe",
      "duration_years": 0,
      "previous_treatments": 0
    },

    "neurobiology": {
      "reward_sensitivity": 0.0,
      "impulsivity": 0.0,
      "stress_reactivity": 0.0,
      "craving_intensity": { "score": 0, "max": 10 }
    },

    "genetics": {
      "drd2_variants": [],
      "oprm1_variants": [],
      "comt_variants": [],
      "family_history": true
    },

    "recovery_capital": {
      "social_support": 0.0,
      "housing_stability": 0.0,
      "employment": 0.0,
      "mental_health": 0.0
    },

    "treatment": {
      "mat": { "medication": "string", "adherence": 0.0 },
      "therapy": [],
      "support_groups": true,
      "abstinence_days": 0
    }
  }
}
```

---

## 📋 Phase 2-4

```yaml
paths:
  /api/v1/addiction/assess:
    post:
      summary: 중독 종합 평가
  /api/v1/addiction/craving/track:
    post:
      summary: 갈망 추적
  /api/v1/addiction/recovery/plan:
    post:
      summary: 회복 계획 수립
```

- 프로토콜: 다차원 평가 + MAT + 심리치료 + 사회적 지원
- 목표: 보상회로 재조정, 장기 회복 유지

---

## 📊 현재 상태 분석: 분산된 복잡성

```
다양한 중독이 각각 따로 치료됨:
├── 알코올 중독
├── 오피오이드 중독
├── 코카인/암페타민 중독
├── 니코틴 중독
├── 대마 중독
├── 도박 중독
├── 게임 중독
├── 인터넷 중독
├── 음식 중독
└── 쇼핑 중독
```

---

## 🔧 WIA 패턴 적용

```
분산된 복잡성          →    통일 원리           →    보편적 해결
─────────────────────────────────────────────────────────────────
다양한 중독            →  "보상회로 재가소성"   →    모든 환자 회복
(N개)                  →     (1개)              →      (∞)
```

**핵심 공식:**
```
Recovery Potential = f(Reward Circuit Plasticity, Dopamine Balance, Craving Control)
Relapse Risk ∝ 1 / (Neuroplasticity × Recovery Capital)
```

---

## 📁 /create-standard 파일 구조

```
addiction/
├── index.html                    # 랜딩페이지 (다크테마, --primary: #7C3AED)
├── simulator/
│   └── index.html                # 시뮬레이터 (5탭, 99개 언어)
├── ebook/
│   ├── en/                       # 영문 Ebook (8챕터, 각 15KB+)
│   │   ├── index.html
│   │   ├── chapter-01.html       # Introduction to Addiction Science
│   │   ├── chapter-02.html       # Current Treatment Challenges
│   │   ├── chapter-03.html       # The Reward Circuit Principle
│   │   ├── chapter-04.html       # Phase 1: Data Format
│   │   ├── chapter-05.html       # Phase 2: API Interface
│   │   ├── chapter-06.html       # Phase 3: Protocol
│   │   ├── chapter-07.html       # Phase 4: Integration
│   │   └── chapter-08.html       # Implementation Guide
│   └── ko/                       # 한글 Ebook (8챕터, 각 15KB+)
├── spec/
│   ├── PHASE-1-DATA-FORMAT.md    # 5KB+
│   ├── PHASE-2-API-INTERFACE.md  # 5KB+
│   ├── PHASE-3-PROTOCOL.md       # 5KB+
│   └── PHASE-4-INTEGRATION.md    # 5KB+
├── api/typescript/
│   ├── src/types.ts
│   ├── src/index.ts
│   └── package.json
└── README.md
```

---

## 🖥️ 시뮬레이터 5탭 구조

| Tab | 이름 | 기능 |
|-----|------|------|
| 1 | 📊 Data Format | 중독 프로파일 JSON 편집기/검증기 |
| 2 | 🔢 Algorithms | 갈망 강도 계산기, 재발 위험 평가 |
| 3 | 📡 Protocol | API 테스트, 회복 프로토콜 시뮬레이션 |
| 4 | 🔗 Integration | FHIR 변환, MAT 모니터링 연동 데모 |
| 5 | 🧪 Test | 치료 반응 시뮬레이션, QR코드 생성 |

---

## 📚 Ebook 8챕터 구조

| Ch | EN Title | KO Title |
|:--:|----------|----------|
| 1 | Introduction to Addiction Science | 중독 과학 소개 |
| 2 | Current Treatment Challenges | 현재 치료의 과제 |
| 3 | The Reward Circuit Plasticity Principle | 보상회로 재가소성 원리 |
| 4 | Phase 1: Data Format Standards | 데이터 형식 표준 |
| 5 | Phase 2: API Interface Design | API 인터페이스 설계 |
| 6 | Phase 3: Recovery Protocols | 회복 프로토콜 |
| 7 | Phase 4: System Integration | 시스템 통합 |
| 8 | Implementation & Recovery Guide | 구현 및 회복 가이드 |

---

## ✅ 품질 체크리스트

```
□ index.html          - 다크테마, --primary: #7C3AED
□ simulator/          - 99개 언어 드롭다운 필수!
□ ebook/en/           - 9개 파일, 각 15KB 이상
□ ebook/ko/           - 9개 파일, 실제 한글 (복붙 금지!)
□ spec/               - 4개 파일, 각 5KB 이상
□ api/typescript/     - SDK 구현
```

---

**홍익인간 (弘益人間) - Benefit All Humanity**
