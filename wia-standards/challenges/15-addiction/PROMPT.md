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

**홍익인간 (弘益人間) - Benefit All Humanity**
