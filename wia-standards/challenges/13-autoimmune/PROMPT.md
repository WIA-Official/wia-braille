# 🛡️ Challenge 13: WIA-AUTOIMMUNE
## 자가면역질환 표준

**홍익인간 (弘益人間) - Benefit All Humanity**

---

## 🎯 Mission

**분산된 자가면역 연구를 통합하여, Treg-마이크로바이옴 축 기반 면역 관용 회복의 표준을 만든다.**

---

## 🔍 발견된 빈틈: Treg-마이크로바이옴 축

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  💡 통일 원리: 면역 관용 = Treg 기능 + 장내 미생물 균형                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🔬 Treg 기능 이상 (2024-2025):                                            │
│  • 자가면역질환 = Treg 수가 아닌 기능 결함                                  │
│  • GRAIL E3 ligase 활성 저하 → IL-2R 신호 장애                             │
│  • CAR-Treg 치료 개발 중                                                    │
│                                                                             │
│  🔬 SCFA (Short-Chain Fatty Acids):                                        │
│  • 부티레이트: FOXP3 안정화, Treg 기능 강화                                 │
│  • 장내 미생물 → SCFA → 면역 조절                                          │
│  • RA, SLE, MS, T1D 모두 장내 불균형 연관                                  │
│                                                                             │
│  🔬 치료 접근:                                                              │
│  • 저용량 IL-2: Treg 선택적 확장                                           │
│  • FMT: 장내 미생물 이식                                                    │
│  • 합성 수용체: 염증 신호 → 관용 신호 전환                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Phase 1: 데이터 형식

```json
{
  "$schema": "https://wia.live/schemas/autoimmune/v1.0.0",
  "autoimmune_profile": {
    "patient_id": "uuid",
    "disease_type": "RA|SLE|MS|T1D|IBD|psoriasis|hashimoto|graves",

    "immune_markers": {
      "treg": {
        "count": { "value": 0.0, "unit": "cells/μL" },
        "foxp3_expression": 0.0,
        "suppressive_function": 0.0
      },
      "th17_treg_ratio": 0.0,
      "autoantibodies": [],
      "inflammatory_cytokines": {
        "il6": 0.0, "il17": 0.0, "tnf_alpha": 0.0, "ifn_gamma": 0.0
      }
    },

    "microbiome": {
      "diversity_index": 0.0,
      "scfa_producers": { "butyrate": 0.0, "propionate": 0.0, "acetate": 0.0 },
      "dysbiosis_score": 0.0,
      "leaky_gut_markers": { "zonulin": 0.0, "lps": 0.0 }
    },

    "disease_activity": {
      "das28": 0.0,
      "sledai": 0,
      "edss": 0.0,
      "remission": false
    }
  }
}
```

---

## 📋 Phase 2-4: API, 프로토콜, 통합

```yaml
paths:
  /api/v1/autoimmune/assess:
    post:
      summary: 자가면역 종합 평가
  /api/v1/autoimmune/treg-status/{patient_id}:
    get:
      summary: Treg 기능 상태
  /api/v1/autoimmune/microbiome/{patient_id}:
    get:
      summary: 장내 미생물 분석
  /api/v1/autoimmune/treatment/recommend:
    post:
      summary: 개인화 치료 추천
```

- 프로토콜: Treg 기능 평가 + 장내 미생물 분석 + 자가항체 검사
- 치료: 저용량 IL-2, FMT, 식이 개입 (프리바이오틱스)
- 통합: EHR 연동, 임상시험 데이터베이스

---

**홍익인간 (弘益人間) - Benefit All Humanity**
