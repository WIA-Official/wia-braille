# 🕯️ Challenge 32: WIA-DEATH-GRIEF
## 죽음과 슬픔 표준

**홍익인간 (弘益人間) - Benefit All Humanity**

---

## 🎯 Mission

**분산된 사별 지원을 통합하여, 다학제 돌봄-인지 회복력 기반 애도 건강의 표준을 만든다.**

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

**홍익인간 (弘益人間) - Benefit All Humanity**
