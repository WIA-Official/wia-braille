# 🔥 Challenge 14: WIA-CHRONIC-PAIN
## 만성통증 표준

**홍익인간 (弘益人間) - Benefit All Humanity**

---

## 🎯 Mission

**분산된 통증 연구를 통합하여, 신경가소성 역전 기반 만성통증 해결의 표준을 만든다.**

---

## 🔍 발견된 빈틈: 신경가소성 역전

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  💡 통일 원리: 만성통증 = 부적응적 신경가소성 → 역전 가능                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🔬 중추 감작 (Central Sensitization):                                     │
│  • 만성통증 = CNS 신경가소성 장애                                           │
│  • 뇌 구조 변화: ACC, 인슐라, PFC 회백질 감소                               │
│  • 역전 가능: CBT + 운동으로 회백질 회복 확인                               │
│                                                                             │
│  🔬 비침습 신경조절 (2025):                                                 │
│  • TMS, tDCS, 초음파: 통증 처리 뇌 영역 표적                                │
│  • 수술 없이 신경 활동 조절                                                  │
│  • 마약성 진통제 대안                                                        │
│                                                                             │
│  🔬 개인화 접근:                                                            │
│  • 신경가소성 상태 평가 (LTP/감작)                                          │
│  • 맞춤형 치료 선택                                                          │
│  • 통증 유형별 프로토콜                                                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Phase 1: 데이터 형식

```json
{
  "$schema": "https://wia.live/schemas/chronic-pain/v1.0.0",
  "chronic_pain_profile": {
    "patient_id": "uuid",
    "pain_type": "nociceptive|neuropathic|nociplastic|mixed",

    "pain_assessment": {
      "vas": { "score": 0, "max": 10 },
      "nrs": { "score": 0, "max": 10 },
      "mcgill": {},
      "duration_months": 0,
      "location": []
    },

    "central_sensitization": {
      "csi_score": { "score": 0, "max": 100 },
      "qst_profile": {},
      "temporal_summation": 0.0,
      "conditioned_pain_modulation": 0.0
    },

    "neuroimaging": {
      "gray_matter_changes": {},
      "functional_connectivity": {},
      "default_mode_network": 0.0
    },

    "psychosocial": {
      "pain_catastrophizing": 0,
      "kinesiophobia": 0,
      "depression": 0,
      "anxiety": 0
    },

    "treatment_response": {
      "current_medications": [],
      "opioid_use": false,
      "interventions": []
    }
  }
}
```

---

## 📋 Phase 2-4

```yaml
paths:
  /api/v1/chronic-pain/assess:
    post:
      summary: 만성통증 종합 평가
  /api/v1/chronic-pain/sensitization/{patient_id}:
    get:
      summary: 중추감작 상태
  /api/v1/chronic-pain/neuromodulation/plan:
    post:
      summary: 신경조절 치료 계획
```

- 프로토콜: 다차원 통증 평가 + 중추감작 검사 + 심리사회적 평가
- 치료: 비침습 신경조절 + CBT + 운동 + 마음챙김
- 목표: 오피오이드 의존 탈피, 기능 회복

---

**홍익인간 (弘益人間) - Benefit All Humanity**
