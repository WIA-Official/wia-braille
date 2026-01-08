# 🕯️ Challenge 32: WIA-DEATH-GRIEF
## 죽음과 슬픔 표준

**홍익인간 (弘益人間) - Benefit All Humanity**

---

## 🎯 Mission

**분산된 사별 지원을 통합하여, 다학제 돌봄-인지 회복력 기반 애도 건강의 표준을 만든다.**

---

## 📊 현재 상태 분석: 분산된 복잡성

```
사별 지원이 파편화되어 있음:
├── 완화의료와 사별지원 연계 단절
├── 위험 평가 체계 부재
├── 보편적 vs 표적 vs 전문 개입 미분화
├── 비암 환자 지원 부족
├── 농촌/소외 지역 접근성 제한
├── 국가 수준 투자 부족
├── 복잡 애도 조기 발견 미흡
├── 다학제 팀 협력 부족
└── 코로나19로 임종 동행 제한
```

---

## 🔍 발견된 빈틈: 통합 사별 케어 연속체

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  💡 통일 원리: 애도 = 자연스러운 과정 → 위험 기반 개입으로 복잡 애도 예방   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🔬 사별의 공중보건 영향:                                                  │
│  • 사망 위험 증가                                                           │
│  • 지연성 애도장애, 우울, 불안                                              │
│  • 심장병, 암 위험 증가                                                     │
│  • 자살 위험 증가                                                           │
│                                                                             │
│  🔬 케어 연속성 부재:                                                      │
│  • 완화의료와 사별지원 연계 미흡                                            │
│  • 비암 환자, 고령자, 농촌 거주자 접근 제한                                 │
│  • 국가 수준 투자 부족                                                      │
│                                                                             │
│  🔬 사별 지원 가이드라인 (2025):                                           │
│  • 위험 평가 기반 개입 계획                                                 │
│  • 예상 사별 시작부터 지원                                                  │
│  • 다학제 팀 접근                                                           │
│  • 중등도/고위험 시 심리/정신과 의뢰                                        │
│                                                                             │
│  🔬 코로나19 영향:                                                         │
│  • 제한 조치로 임종 동행 불가                                               │
│  • 병원 중심 케어의 한계                                                    │
│  • 개인화된 대안 케어 필요                                                  │
│                                                                             │
│  🔬 회복력 구축:                                                           │
│  • 사회적 연결 강화                                                         │
│  • 재정적 어려움 해결                                                       │
│  • 존엄한 임종 환경 조성                                                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Phase 1: 데이터 형식

```json
{
  "$schema": "https://wia.live/schemas/death-grief/v1.0.0",
  "bereavement_profile": {
    "person_id": "uuid",
    "relationship_to_deceased": "spouse|parent|child|sibling|friend|other",

    "loss_context": {
      "date_of_death": "ISO8601",
      "cause_of_death": "illness|sudden|suicide|accident|violence|other",
      "expected": false,
      "able_to_say_goodbye": false,
      "present_at_death": false,
      "covid_restrictions_affected": false
    },

    "grief_assessment": {
      "prolonged_grief_inventory": { "score": 0, "risk": "low|moderate|high" },
      "brief_grief_questionnaire": { "score": 0 },
      "phq9_depression": { "score": 0 },
      "gad7_anxiety": { "score": 0 },
      "suicidal_ideation": false
    },

    "risk_factors": {
      "pre_existing_mental_health": false,
      "concurrent_stressors": [],
      "financial_hardship": false,
      "social_isolation": false,
      "complicated_relationship": false,
      "prior_losses": 0
    },

    "protective_factors": {
      "social_support_score": 0.0,
      "meaning_making_ability": 0.0,
      "coping_skills": 0.0,
      "spiritual_resources": false
    },

    "support_needs": {
      "level": "universal|targeted|specialist",
      "services_recommended": [],
      "intervention_urgency": "routine|soon|urgent"
    },

    "care_plan": {
      "assigned_support": "peer|counselor|psychologist|psychiatrist",
      "sessions_completed": 0,
      "progress_notes": [],
      "outcome_measures": []
    }
  }
}
```

---

## 📋 Phase 2-4

```yaml
paths:
  /api/v1/grief/assess:
    post:
      summary: 애도 위험 평가
  /api/v1/grief/support/match:
    post:
      summary: 지원 서비스 매칭
  /api/v1/grief/care-plan/create:
    post:
      summary: 케어 계획 수립
  /api/v1/grief/outcome/track:
    get:
      summary: 회복 추적
```

- 프로토콜: 예상 사별부터 위험 평가 + 계층화된 개입
- 지원: 보편적 지원 → 표적 개입 → 전문 치료
- 목표: 복잡 애도 예방, 건강한 애도 과정 지원

---

## 🔧 WIA 패턴 적용

```
분산된 복잡성          →    통일 원리              →    보편적 해결
─────────────────────────────────────────────────────────────────
파편화된 사별 지원     →  "통합 케어 연속체"     →    모든 사별자 지원
(N개)                  →     (1개)                 →      (∞)
```

**핵심 공식:**
```
Bereavement_Care = f(Risk_Assessment, Tiered_Intervention, Multidisciplinary_Team)
Grief_Health ∝ Early_Support × Personalization × Continuity_of_Care
```

---

## 📁 /create-standard 파일 구조

```
death-grief/
├── index.html                    # 랜딩페이지 (다크테마, --primary: #6366F1)
├── simulator/
│   └── index.html                # 시뮬레이터 (5탭, 99개 언어)
├── ebook/
│   ├── en/                       # 영문 Ebook (8챕터, 각 15KB+)
│   │   ├── index.html
│   │   ├── chapter-01.html       # Introduction to Bereavement Care
│   │   ├── chapter-02.html       # Current State of Grief Support
│   │   ├── chapter-03.html       # The Integrated Care Continuum
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
| 1 | 📊 Data Format | 사별 프로파일 JSON 편집기/검증기 |
| 2 | 🔢 Algorithms | 위험 평가 계산, 개입 수준 결정 |
| 3 | 📡 Protocol | 예상 사별 지원, 계층화 개입 워크플로우 |
| 4 | 🔗 Integration | 완화의료 연동, 다학제 팀 협업 |
| 5 | 🧪 Test | 애도 평가 도구, 케어 플랜 생성, QR코드 |

---

## 📚 Ebook 8챕터 구조

| Ch | EN Title | KO Title |
|:--:|----------|----------|
| 1 | Introduction to Bereavement Care | 사별 케어 소개 |
| 2 | Current State of Grief Support | 애도 지원 현황 |
| 3 | The Integrated Care Continuum | 통합 케어 연속체 |
| 4 | Phase 1: Data Format Standards | 데이터 형식 표준 |
| 5 | Phase 2: API Interface Design | API 인터페이스 설계 |
| 6 | Phase 3: Bereavement Protocols | 사별 지원 프로토콜 |
| 7 | Phase 4: System Integration | 시스템 통합 |
| 8 | Implementation & Evidence-Based Practice | 구현 및 근거 기반 실천 |

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
