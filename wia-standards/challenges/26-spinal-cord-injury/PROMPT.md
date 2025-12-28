# 🦴 Challenge 26: WIA-SPINAL-CORD-INJURY
## 척수손상 표준

**홍익인간 (弘益人間) - Benefit All Humanity**

---

## 🎯 Mission

**분산된 신경재생 연구를 통합하여, 신경줄기세포-생체재료 융합 기반 척수 기능 회복의 표준을 만든다.**

---

## 🔍 발견된 빈틈: 척수 특이적 신경줄기세포 이식

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  💡 통일 원리: 척수손상 = 신경망 단절 → 줄기세포 릴레이로 재연결             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🔬 UC San Diego Phase 1 (2024):                                           │
│  • 만성 척수손상 환자 4명 전원 안전하게 치료                                │
│  • 신경줄기세포 이식                                                        │
│  • "플로팅 캐뉼러" 혁신 전달법                                              │
│  • EMG에서 신경학적 개선 증거                                               │
│                                                                             │
│  🔬 핵심 발견:                                                             │
│  • 척수 특이적 줄기세포가 최적 결과                                         │
│  • 손상부위 양측에서 축삭 재생                                              │
│  • 신경 릴레이 형성으로 신호 전달 회복                                      │
│  • SOX9 유전자 발현 감소 시 운동뉴런 분화 증가                              │
│                                                                             │
│  🔬 복합 치료 전략:                                                        │
│  • 생체재료: 콜라겐 스캐폴드, 하이드로겔                                    │
│  • 성장인자: HGF (간세포성장인자)                                          │
│  • 줄기세포: 신경줄기세포, MSC                                              │
│  • 엑소좀: 세포 없는 치료 대안                                              │
│                                                                             │
│  🔬 적용 범위:                                                             │
│  • 불완전 손상: NS/PC 이식 효과적                                           │
│  • 완전 손상: 스캐폴드 + 성장인자 필요                                      │
│  • 만성 손상: 임상시험 활발                                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Phase 1: 데이터 형식

```json
{
  "$schema": "https://wia.live/schemas/spinal-cord-injury/v1.0.0",
  "sci_profile": {
    "patient_id": "uuid",
    "injury_level": "C1-C8|T1-T12|L1-L5|S1-S5",
    "asia_grade": "A|B|C|D|E",
    "injury_type": "complete|incomplete",
    "chronicity": "acute|subacute|chronic",

    "neurological_exam": {
      "motor_score_upper": { "right": 0, "left": 0 },
      "motor_score_lower": { "right": 0, "left": 0 },
      "sensory_light_touch": 0,
      "sensory_pin_prick": 0,
      "zone_of_partial_preservation": "string"
    },

    "imaging": {
      "mri_findings": {},
      "lesion_length": { "value": 0, "unit": "mm" },
      "spared_tissue": 0.0,
      "dti_metrics": {}
    },

    "functional_status": {
      "scim_score": { "score": 0, "max": 100 },
      "walking_index": { "score": 0, "max": 20 },
      "bladder_function": "reflex|voluntary|catheter",
      "bowel_function": "reflex|voluntary|assisted"
    },

    "treatment_eligibility": {
      "stem_cell_candidate": true,
      "scaffold_candidate": true,
      "growth_factor_candidate": true,
      "time_since_injury_days": 0
    },

    "intervention": {
      "type": "nsc_transplant|msc_exosome|scaffold|combination",
      "cell_source": "autologous|allogeneic|ipsc",
      "delivery_route": "intralesional|intrathecal",
      "scaffold_type": "collagen|hydrogel|none",
      "adjuvant": "HGF|BDNF|none"
    }
  }
}
```

---

## 📋 Phase 2-4

```yaml
paths:
  /api/v1/sci/assess:
    post:
      summary: 척수손상 종합 평가
  /api/v1/sci/imaging/analyze:
    post:
      summary: 영상 분석 (MRI, DTI)
  /api/v1/sci/therapy/design:
    post:
      summary: 맞춤 치료 설계
  /api/v1/sci/outcome/track:
    get:
      summary: 기능 회복 추적
```

- 프로토콜: ASIA 평가 + MRI/DTI + 기능 검사 + 적격성 평가
- 치료: 척수 특이적 NSC + 생체재료 스캐폴드 + 성장인자
- 목표: 신경 릴레이 형성, 기능적 회복

---

**홍익인간 (弘益人間) - Benefit All Humanity**
