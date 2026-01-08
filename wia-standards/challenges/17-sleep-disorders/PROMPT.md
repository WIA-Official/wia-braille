# 😴 Challenge 17: WIA-SLEEP-DISORDERS
## 수면장애 표준

**홍익인간 (弘益人間) - Benefit All Humanity**

---

## 🎯 Mission

**분산된 수면 연구를 통합하여, 글림파틱-일주기 동기화 기반 수면 건강의 표준을 만든다.**

---

## 🔍 발견된 빈틈: 글림파틱-일주기 동기화

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  💡 통일 원리: 수면 건강 = 글림파틱 청소 + 일주기 리듬 동기화                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🔬 글림파틱 시스템:                                                        │
│  • 수면 중 뇌 대사 폐기물 제거                                              │
│  • Aβ, 타우 등 신경독성 물질 청소                                           │
│  • 수면 장애 → 축적 → 신경퇴행                                              │
│                                                                             │
│  🔬 일주기 리듬 연결:                                                       │
│  • 글림파틱 기능 낮에 낮음, 밤에 높음                                       │
│  • 글루코코르티코이드 리듬과 동기화                                          │
│  • 시간 조직이 정밀한 타이밍에 필수                                          │
│                                                                             │
│  🔬 파킨슨/알츠하이머 연결:                                                 │
│  • 수면 장애가 PD 진행 가속                                                  │
│  • ALPS 지수로 글림파틱 기능 측정                                           │
│  • 조기 수면 개입으로 신경보호                                               │
│                                                                             │
│  🔬 치료 표적:                                                              │
│  • 글림파틱-수막림프 경로                                                    │
│  • 일주기 리듬 재설정                                                        │
│  • 수면 구조 최적화                                                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Phase 1: 데이터 형식

```json
{
  "$schema": "https://wia.live/schemas/sleep-disorders/v1.0.0",
  "sleep_profile": {
    "patient_id": "uuid",
    "disorder_type": "insomnia|osa|circadian|rls|narcolepsy|parasomnia",

    "polysomnography": {
      "tst": { "value": 0.0, "unit": "hours" },
      "sleep_efficiency": 0.0,
      "sleep_latency": { "value": 0.0, "unit": "minutes" },
      "rem_latency": { "value": 0.0, "unit": "minutes" },
      "stages": {
        "n1_percent": 0.0,
        "n2_percent": 0.0,
        "n3_percent": 0.0,
        "rem_percent": 0.0
      },
      "ahi": 0.0,
      "plm_index": 0.0
    },

    "circadian": {
      "chronotype": "morning|intermediate|evening",
      "dim_light_melatonin_onset": "ISO8601",
      "core_body_temp_minimum": "ISO8601",
      "social_jetlag": { "value": 0.0, "unit": "hours" }
    },

    "glymphatic": {
      "alps_index": 0.0,
      "dtimri_metrics": {},
      "clearance_efficiency": 0.0
    },

    "assessment": {
      "psqi": { "score": 0, "max": 21 },
      "isi": { "score": 0, "max": 28 },
      "ess": { "score": 0, "max": 24 },
      "stop_bang": { "score": 0, "risk": "low|moderate|high" }
    },

    "wearable_data": {
      "sleep_duration_avg": 0.0,
      "sleep_regularity_index": 0.0,
      "hrv_during_sleep": 0.0
    }
  }
}
```

---

## 📋 Phase 2-4

```yaml
paths:
  /api/v1/sleep/assess:
    post:
      summary: 수면 종합 평가
  /api/v1/sleep/glymphatic/{patient_id}:
    get:
      summary: 글림파틱 기능 평가
  /api/v1/sleep/circadian/optimize:
    post:
      summary: 일주기 최적화 계획
```

- 프로토콜: PSG + 일주기 평가 + 글림파틱 MRI
- 치료: CBT-I + 광치료 + 수면 위생 + CPAP
- 목표: 글림파틱 청소 최적화, 신경보호

---

## 📊 현재 상태 분석: 분산된 복잡성

```
다양한 수면장애가 각각 따로 치료됨:
├── 불면증 (Insomnia)
├── 폐쇄성 수면무호흡증 (OSA)
├── 일주기 리듬 장애
├── 하지불안증후군 (RLS)
├── 기면증 (Narcolepsy)
├── 사건수면 (Parasomnia)
├── 렘수면행동장애 (RBD)
├── 지연수면위상증후군
├── 교대근무 수면장애
└── 비24시간 수면각성 장애
```

---

## 🔧 WIA 패턴 적용

```
분산된 복잡성          →    통일 원리           →    보편적 해결
─────────────────────────────────────────────────────────────────
다양한 수면장애         →  "글림파틱-일주기 동기화" →  모든 환자 수면 건강
(N개)                  →     (1개)              →      (∞)
```

**핵심 공식:**
```
Sleep Health = f(Glymphatic Clearance, Circadian Synchronization)
Neurodegeneration Risk ∝ 1 / (Glymphatic Function × Sleep Quality)
```

---

## 📁 /create-standard 파일 구조

```
sleep-disorders/
├── index.html                    # 랜딩페이지 (다크테마, --primary: #6366F1)
├── simulator/
│   └── index.html                # 시뮬레이터 (5탭, 99개 언어)
├── ebook/
│   ├── en/                       # 영문 Ebook (8챕터, 각 15KB+)
│   │   ├── index.html
│   │   ├── chapter-01.html       # Introduction to Sleep Science
│   │   ├── chapter-02.html       # Current Treatment Challenges
│   │   ├── chapter-03.html       # The Glymphatic-Circadian Principle
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
| 1 | 📊 Data Format | 수면 프로파일 JSON 편집기/검증기 |
| 2 | 🔢 Algorithms | ALPS 지수 계산기, 일주기 위상 분석 |
| 3 | 📡 Protocol | API 테스트, PSG 데이터 프로토콜 시뮬레이션 |
| 4 | 🔗 Integration | FHIR 변환, 웨어러블 수면 데이터 연동 |
| 5 | 🧪 Test | 치료 효과 시뮬레이션, QR코드 생성 |

---

## 📚 Ebook 8챕터 구조

| Ch | EN Title | KO Title |
|:--:|----------|----------|
| 1 | Introduction to Sleep Science | 수면 과학 소개 |
| 2 | Current Treatment Challenges | 현재 치료의 과제 |
| 3 | The Glymphatic-Circadian Principle | 글림파틱-일주기 동기화 원리 |
| 4 | Phase 1: Data Format Standards | 데이터 형식 표준 |
| 5 | Phase 2: API Interface Design | API 인터페이스 설계 |
| 6 | Phase 3: Assessment Protocols | 평가 프로토콜 |
| 7 | Phase 4: System Integration | 시스템 통합 |
| 8 | Implementation & Sleep Health Guide | 구현 및 수면 건강 가이드 |

---

## ✅ 품질 체크리스트

```
□ index.html          - 다크테마, --primary: #6366F1
□ simulator/          - 99개 언어 드롭다운 필수!
□ ebook/en/           - 9개 파일, 각 15KB 이상
□ ebook/ko/           - 9개 파일, 실제 한글 (복붙 금지!)
□ spec/               - 4개 파일, 각 5KB 이상
□ api/typescript/     - SDK 구현
```

---

**홍익인간 (弘益人間) - Benefit All Humanity**
