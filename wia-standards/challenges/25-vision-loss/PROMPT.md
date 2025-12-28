# 👁️ Challenge 25: WIA-VISION-LOSS
## 시력손실 표준

**홍익인간 (弘益人間) - Benefit All Humanity**

---

## 🎯 Mission

**분산된 망막 연구를 통합하여, 옵토제네틱스-유전자치료 융합 기반 시력 회복의 표준을 만든다.**

---

## 🔍 발견된 빈틈: 돌연변이 비의존적 시력 회복

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  💡 통일 원리: 시력손실 = 광수용체 기능상실 → 옵토제네틱스로 대체           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🔬 MCO-010 돌파구 (Nanoscope, 2025):                                      │
│  • 유전자 돌연변이와 무관한 단일 치료                                       │
│  • 외부 장치(고글) 불필요                                                   │
│  • 50% 환자 3줄 시력 향상                                                   │
│  • 2.5년 이상 지속 효과                                                     │
│  • FDA BLA 제출 (2025년 6월)                                               │
│                                                                             │
│  🔬 옵토제네틱스 원리:                                                     │
│  • 광민감 옵신 단백질을 망막에 도입                                         │
│  • 양극세포가 광수용체 역할 대체                                            │
│  • 가시광선 스펙트럼 전체 반응                                              │
│  • 빠른 반응 속도로 움직임 추적 가능                                        │
│                                                                             │
│  🔬 기존 유전자치료와 차이:                                                │
│  • 기존: 특정 돌연변이 교정, 남은 시력 보존                                 │
│  • 옵토제네틱스: 잃어버린 시력 회복                                         │
│  • 돌연변이/질환 무관하게 적용 가능                                         │
│                                                                             │
│  🔬 추가 파이프라인:                                                       │
│  • SpliceBio SB-007: Stargardt 질환                                        │
│  • GenSight GS030: 색소성 망막염                                           │
│  • Ray Therapeutics RTx-015                                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Phase 1: 데이터 형식

```json
{
  "$schema": "https://wia.live/schemas/vision-loss/v1.0.0",
  "vision_profile": {
    "patient_id": "uuid",
    "diagnosis": "retinitis_pigmentosa|stargardt|lca|amd|glaucoma|diabetic_retinopathy",
    "ird_classification": "rod_cone|cone_rod|macular|syndromic",

    "visual_function": {
      "bcva_right": { "logmar": 0.0, "snellen": "string" },
      "bcva_left": { "logmar": 0.0, "snellen": "string" },
      "visual_field": { "right_degrees": 0, "left_degrees": 0 },
      "contrast_sensitivity": 0.0,
      "color_vision": "normal|reduced|absent"
    },

    "retinal_structure": {
      "oct_central_thickness": { "value": 0, "unit": "μm" },
      "ellipsoid_zone_preserved": false,
      "outer_nuclear_layer": "intact|thinning|absent",
      "retinal_pigment_epithelium": "normal|atrophic|disrupted"
    },

    "genetic_diagnosis": {
      "gene": "string",
      "variant": "string",
      "pathogenicity": "pathogenic|likely_pathogenic",
      "inheritance": "AD|AR|XL"
    },

    "treatment_eligibility": {
      "optogenetics_candidate": true,
      "gene_replacement_candidate": false,
      "retinal_cells_remaining": true,
      "light_perception": true
    },

    "intervention": {
      "type": "optogenetics|gene_replacement|gene_editing",
      "product": "MCO-010|Luxturna|other",
      "vector": "AAV2|AAV8",
      "route": "intravitreal|subretinal"
    }
  }
}
```

---

## 📋 Phase 2-4

```yaml
paths:
  /api/v1/vision-loss/assess:
    post:
      summary: 시력 종합 평가
  /api/v1/vision-loss/genetic/diagnose:
    post:
      summary: 유전자 진단
  /api/v1/vision-loss/optogenetics/eligibility:
    post:
      summary: 옵토제네틱스 적격성 평가
  /api/v1/vision-loss/therapy/protocol:
    post:
      summary: 치료 프로토콜 수립
```

- 프로토콜: 시기능검사 + OCT + 유전자검사 + 전기생리
- 치료: 옵토제네틱스 (돌연변이 무관) + 유전자 대체 (특정 돌연변이)
- 목표: 법적 실명 탈출, 일상생활 자립

---

**홍익인간 (弘益人間) - Benefit All Humanity**
