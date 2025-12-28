# ⚖️ Challenge 27: WIA-OBESITY-METABOLIC
## 비만/대사 표준

**홍익인간 (弘益人間) - Benefit All Humanity**

---

## 🎯 Mission

**분산된 비만 연구를 통합하여, GLP-1-뇌 보상회로 조절 기반 대사 건강의 표준을 만든다.**

---

## 🔍 발견된 빈틈: 장-뇌 축 통합 조절

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  💡 통일 원리: 비만 = 보상회로 조절장애 → GLP-1로 뇌 수준에서 리셋          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🔬 GLP-1 뇌 작용 메커니즘 (2024-2025):                                    │
│  • 시상하부/후뇌 수용체 활성화                                              │
│  • 중뇌변연계 도파민 조절                                                   │
│  • 음식 보상 가치 감소                                                      │
│  • 알코올, 코카인, 니코틴 갈망도 감소                                       │
│                                                                             │
│  🔬 신경회로 발견 (2024):                                                  │
│  • 등배측 시상하부 GLP-1R                                                   │
│  • 후뇌 GLP-1R 뉴런                                                         │
│  • 외측 중격 GLP-1R                                                         │
│  • 영양/혐오 자극에 따른 뉴런 분화                                          │
│                                                                             │
│  🔬 WHO 가이드라인 (2025.12):                                              │
│  • GLP-1 치료제 필수의약품 목록 추가                                        │
│  • 비만 관리 공식 권고                                                      │
│  • 2형 당뇨병 고위험군 적용                                                 │
│                                                                             │
│  🔬 신경보호 효과:                                                         │
│  • 알츠하이머, 파킨슨 보호 가능성                                           │
│  • 뉴런 생존, 염증 감소, 시냅스 보호                                        │
│  • 임상시험 진행 중                                                         │
│                                                                             │
│  🔬 주의사항:                                                              │
│  • 운동 동기 감소 (마우스 연구)                                             │
│  • 개인차 고려 필요                                                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Phase 1: 데이터 형식

```json
{
  "$schema": "https://wia.live/schemas/obesity-metabolic/v1.0.0",
  "metabolic_profile": {
    "patient_id": "uuid",
    "obesity_class": "overweight|class_1|class_2|class_3",

    "anthropometrics": {
      "bmi": 0.0,
      "waist_circumference": { "value": 0, "unit": "cm" },
      "body_fat_percent": 0.0,
      "visceral_fat_area": { "value": 0, "unit": "cm²" }
    },

    "metabolic_markers": {
      "fasting_glucose": { "value": 0, "unit": "mg/dL" },
      "hba1c": { "value": 0.0, "unit": "%" },
      "insulin": { "value": 0, "unit": "μU/mL" },
      "homa_ir": 0.0,
      "lipid_panel": {
        "total_cholesterol": 0,
        "ldl": 0,
        "hdl": 0,
        "triglycerides": 0
      }
    },

    "gut_brain_axis": {
      "glp1_fasting": { "value": 0, "unit": "pmol/L" },
      "glp1_stimulated": { "value": 0, "unit": "pmol/L" },
      "ghrelin": { "value": 0, "unit": "pg/mL" },
      "leptin": { "value": 0, "unit": "ng/mL" },
      "gut_microbiome_diversity": 0.0
    },

    "reward_behavior": {
      "food_craving_score": 0,
      "binge_eating_scale": 0,
      "emotional_eating": 0.0,
      "reward_sensitivity": 0.0
    },

    "comorbidities": {
      "type2_diabetes": false,
      "hypertension": false,
      "dyslipidemia": false,
      "nafld": false,
      "osa": false
    },

    "treatment": {
      "glp1_agonist": "semaglutide|tirzepatide|liraglutide|none",
      "dose": { "value": 0.0, "unit": "mg" },
      "frequency": "weekly|daily",
      "duration_weeks": 0,
      "weight_loss_percent": 0.0
    }
  }
}
```

---

## 📋 Phase 2-4

```yaml
paths:
  /api/v1/obesity/assess:
    post:
      summary: 대사 건강 종합 평가
  /api/v1/obesity/gut-brain/profile:
    get:
      summary: 장-뇌 축 프로파일
  /api/v1/obesity/glp1/optimize:
    post:
      summary: GLP-1 치료 최적화
  /api/v1/obesity/behavior/track:
    post:
      summary: 보상 행동 추적
```

- 프로토콜: 대사 패널 + 장호르몬 + 보상 행동 평가
- 치료: GLP-1 작용제 + 생활습관 + 행동치료
- 목표: 장-뇌 축 정상화, 지속적 체중 관리

---

**홍익인간 (弘益人間) - Benefit All Humanity**
