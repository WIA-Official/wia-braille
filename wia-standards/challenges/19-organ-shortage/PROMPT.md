# 🫀 Challenge 19: WIA-ORGAN-SHORTAGE
## 장기 부족 표준

**홍익인간 (弘益人間) - Benefit All Humanity**

---

## 🎯 Mission

**분산된 장기 이식 연구를 통합하여, 이종이식-바이오프린팅 융합 기반 장기 공급의 표준을 만든다.**

---

## 🔍 발견된 빈틈: 무제한 장기 공급 플랫폼

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  💡 통일 원리: 장기 부족 = 공급 제한 → 바이오공학으로 무제한 공급           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🔬 장기 부족 위기:                                                        │
│  • 미국에서만 10만 3천 명 대기                                              │
│  • 매일 17명 대기 중 사망                                                   │
│  • 수요-공급 격차 해소 불가                                                 │
│                                                                             │
│  🔬 이종이식 진전 (2024-2025):                                             │
│  • eGenesis: 돼지 신장 이식 임상시험 승인 (2024.12)                        │
│  • United Therapeutics: UKidney 첫 이식 2025년 중반 예정                   │
│  • 유전자 편집으로 면역 거부반응 최소화                                     │
│                                                                             │
│  🔬 3D 바이오프린팅:                                                       │
│  • 세포+하이드로겔 바이오잉크                                               │
│  • AI 통합: 폐쇄루프 모니터링, 혈관 설계                                   │
│  • Organovo: 간 패치 마우스 이식 성공 (28일 혈관화)                        │
│                                                                             │
│  🔬 핵심 과제:                                                             │
│  • 혈관화: 두꺼운 조직 내 산소/영양 공급                                   │
│  • 거부반응: 면역 적합성 확보                                               │
│  • 기능성: 생리적 기능 구현                                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Phase 1: 데이터 형식

```json
{
  "$schema": "https://wia.live/schemas/organ-shortage/v1.0.0",
  "organ_profile": {
    "patient_id": "uuid",
    "organ_needed": "kidney|liver|heart|lung|pancreas|intestine",
    "urgency": "urgent|high|medium|stable",

    "waitlist_status": {
      "registered_date": "ISO8601",
      "unos_status": "string",
      "waiting_time_days": 0,
      "geographic_region": "string"
    },

    "immunological": {
      "blood_type": "A|B|AB|O",
      "hla_typing": {},
      "pra_percent": 0,
      "crossmatch_history": []
    },

    "alternative_options": {
      "xenotransplant_eligible": true,
      "bioprinted_organ_eligible": true,
      "living_donor_available": false,
      "domino_transplant_option": false
    },

    "xenotransplant": {
      "genetic_modifications": [],
      "trial_enrollment": "string",
      "immunosuppression_protocol": "string"
    },

    "bioprinted_organ": {
      "organ_type": "string",
      "vascularization_status": "none|partial|complete",
      "maturation_days": 0,
      "functionality_score": 0.0
    }
  }
}
```

---

## 📋 Phase 2-4

```yaml
paths:
  /api/v1/organ-shortage/waitlist/status:
    get:
      summary: 대기자 현황 조회
  /api/v1/organ-shortage/xenotransplant/eligibility:
    post:
      summary: 이종이식 적격성 평가
  /api/v1/organ-shortage/bioprint/order:
    post:
      summary: 바이오프린팅 장기 주문
  /api/v1/organ-shortage/match:
    post:
      summary: 최적 매칭 알고리즘
```

- 프로토콜: 면역 타이핑 + 대안 옵션 평가 + 매칭
- 치료: 기존 이식 + 이종이식 + 바이오프린팅
- 목표: 대기자 제로, 맞춤형 장기 제공

---

**홍익인간 (弘益人間) - Benefit All Humanity**
