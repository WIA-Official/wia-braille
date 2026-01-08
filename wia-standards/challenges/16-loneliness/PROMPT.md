# 💔 Challenge 16: WIA-LONELINESS
## 외로움 표준

**홍익인간 (弘益人間) - Benefit All Humanity**

---

## 🎯 Mission

**분산된 외로움 연구를 통합하여, 옥시토신-주의 루프 기반 사회적 연결 회복의 표준을 만든다.**

---

## 🔍 발견된 빈틈: 옥시토신-주의 루프

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  💡 통일 원리: 외로움 = 옥시토신 시스템 조절장애 → 미세습관으로 회복         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🔬 외로움 전염병 (2024-2025):                                             │
│  • 성인 50% 이상 정기적 외로움 경험                                         │
│  • 사망 위험 26% 증가 (담배 15개비/일과 동등)                               │
│  • 만성 염증, 면역 저하, 인지 저하                                          │
│                                                                             │
│  🔬 옥시토신 메커니즘:                                                      │
│  • 사회적 상호작용 → 옥시토신 분비 → 사회적 갈망 감소                       │
│  • 외로운 사람: 옥시토신 불균형 → 사회적 갈망 반응 억제                     │
│  • 악순환: 외로움 → 회피 → 더 외로움                                        │
│                                                                             │
│  🔬 미세습관 개입:                                                          │
│  • 30% 감소 수주 내 가능                                                    │
│  • 온전히 경청하기 같은 작은 행동                                            │
│  • 옥시토신 분비 촉진 → 신경 경로 형성                                      │
│                                                                             │
│  🔬 사회적 연결과 장수:                                                     │
│  • 사회적 유대 = 스트레스 완충 + 옥시토신 보호                              │
│  • 노화 인지 저하 방어                                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Phase 1: 데이터 형식

```json
{
  "$schema": "https://wia.live/schemas/loneliness/v1.0.0",
  "loneliness_profile": {
    "patient_id": "uuid",

    "assessment": {
      "ucla_loneliness": { "score": 0, "max": 80 },
      "social_isolation_index": 0.0,
      "perceived_social_support": 0.0,
      "social_network_size": 0
    },

    "biomarkers": {
      "oxytocin_level": { "value": 0.0, "unit": "pg/mL" },
      "cortisol": { "value": 0.0, "unit": "μg/dL" },
      "inflammatory_markers": { "crp": 0.0, "il6": 0.0 },
      "heart_rate_variability": { "rmssd": 0.0 }
    },

    "digital_phenotype": {
      "screen_time": 0.0,
      "social_media_hours": 0.0,
      "calls_per_week": 0,
      "in_person_interactions": 0,
      "home_time_percent": 0.0
    },

    "social_skills": {
      "empathy": 0.0,
      "social_anxiety": 0.0,
      "attachment_style": "secure|anxious|avoidant|disorganized"
    },

    "intervention_progress": {
      "micro_habits_completed": 0,
      "social_activities_weekly": 0,
      "connection_quality_score": 0.0
    }
  }
}
```

---

## 📋 Phase 2-4

```yaml
paths:
  /api/v1/loneliness/assess:
    post:
      summary: 외로움 종합 평가
  /api/v1/loneliness/connection/track:
    post:
      summary: 사회적 연결 추적
  /api/v1/loneliness/micro-habits:
    get:
      summary: 미세습관 추천
```

- 프로토콜: UCLA 척도 + 디지털 표현형 + 바이오마커
- 치료: 미세습관 설계 + 사회 기술 훈련 + 커뮤니티 연결
- 목표: 옥시토신 시스템 정상화, 의미있는 연결 형성

---

## 📊 현재 상태 분석: 분산된 복잡성

```
다양한 외로움 형태가 각각 따로 접근됨:
├── 사회적 고립 (Social Isolation)
├── 정서적 외로움 (Emotional Loneliness)
├── 실존적 외로움 (Existential Loneliness)
├── 노년기 외로움
├── 청년 세대 외로움
├── 디지털 외로움
├── 이민자/이방인 외로움
├── 장애인 외로움
├── 만성질환 외로움
└── 상실 후 외로움
```

---

## 🔧 WIA 패턴 적용

```
분산된 복잡성          →    통일 원리           →    보편적 해결
─────────────────────────────────────────────────────────────────
다양한 외로움          →  "옥시토신-주의 루프"  →    모든 사람 연결 회복
(N개)                  →     (1개)              →      (∞)
```

**핵심 공식:**
```
Social Connection = f(Oxytocin Balance, Social Attention, Micro-habits)
Loneliness Relief ∝ Oxytocin System Function × Meaningful Interactions
```

---

## 📁 /create-standard 파일 구조

```
loneliness/
├── index.html                    # 랜딩페이지 (다크테마, --primary: #EC4899)
├── simulator/
│   └── index.html                # 시뮬레이터 (5탭, 99개 언어)
├── ebook/
│   ├── en/                       # 영문 Ebook (8챕터, 각 15KB+)
│   │   ├── index.html
│   │   ├── chapter-01.html       # Introduction to Loneliness Science
│   │   ├── chapter-02.html       # Current Social Challenges
│   │   ├── chapter-03.html       # The Oxytocin-Attention Loop
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
| 1 | 📊 Data Format | 외로움 프로파일 JSON 편집기/검증기 |
| 2 | 🔢 Algorithms | UCLA 외로움 척도 계산기, 연결 품질 분석 |
| 3 | 📡 Protocol | API 테스트, 디지털 표현형 추적 시뮬레이션 |
| 4 | 🔗 Integration | FHIR 변환, 웨어러블 사회활동 데이터 연동 |
| 5 | 🧪 Test | 미세습관 효과 시뮬레이션, QR코드 생성 |

---

## 📚 Ebook 8챕터 구조

| Ch | EN Title | KO Title |
|:--:|----------|----------|
| 1 | Introduction to Loneliness Science | 외로움 과학 소개 |
| 2 | Current Social Connection Crisis | 현재 사회적 연결의 위기 |
| 3 | The Oxytocin-Attention Loop Principle | 옥시토신-주의 루프 원리 |
| 4 | Phase 1: Data Format Standards | 데이터 형식 표준 |
| 5 | Phase 2: API Interface Design | API 인터페이스 설계 |
| 6 | Phase 3: Assessment Protocols | 평가 프로토콜 |
| 7 | Phase 4: System Integration | 시스템 통합 |
| 8 | Implementation & Connection Guide | 구현 및 연결 가이드 |

---

## ✅ 품질 체크리스트

```
□ index.html          - 다크테마, --primary: #EC4899
□ simulator/          - 99개 언어 드롭다운 필수!
□ ebook/en/           - 9개 파일, 각 15KB 이상
□ ebook/ko/           - 9개 파일, 실제 한글 (복붙 금지!)
□ spec/               - 4개 파일, 각 5KB 이상
□ api/typescript/     - SDK 구현
```

---

**홍익인간 (弘益人間) - Benefit All Humanity**
