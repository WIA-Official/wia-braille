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

## 📊 현재 상태 분석: 분산된 복잡성

```
비만 치료의 파편화:
├── 식이요법 (저탄수화물, 케토, 지중해식, 간헐적 단식)
├── 운동 프로그램 (유산소, 근력, HIIT)
├── 행동치료 (CBT, 동기강화면담)
├── 약물치료 (GLP-1, 펜터민, 날트렉손/부프로피온)
├── 비만수술 (위우회술, 위소매절제술)
├── 호르몬 치료 (렙틴 저항성 접근)
├── 마이크로바이옴 조절 (프로바이오틱스)
├── 심리상담 (정서적 섭식 대응)
├── 대사 질환 관리 (당뇨, 고지혈증 별도 치료)
└── 재발률 높은 단편적 접근
```

---

## 🔧 WIA 패턴 적용

```
분산된 복잡성          →    통일 원리           →    보편적 해결
─────────────────────────────────────────────────────────────────
분산된 비만 치료법     →  "장-뇌 축 통합"     →   대사 건강 회복
(N개)                  →     (1개)              →      (∞)
```

**핵심 공식:**
```
Metabolic Health = GLP-1 (Brain Level) + Gut Hormone Balance + Reward Circuit Reset
Weight Loss Sustainability = Central Mechanism + Behavioral Change + Lifestyle
Gut-Brain Axis = Incretin Hormones + Dopamine Regulation + Satiety Signals
```

---

## 📁 /create-standard 파일 구조

```
obesity-metabolic/
├── index.html                    # 랜딩페이지 (--primary: #F59E0B)
├── simulator/
│   └── index.html                # 시뮬레이터 (5탭, 99개 언어)
├── ebook/
│   ├── en/                       # 영문 Ebook (8챕터)
│   └── ko/                       # 한글 Ebook (8챕터)
├── spec/
│   ├── PHASE-1-DATA-FORMAT.md
│   ├── PHASE-2-API-INTERFACE.md
│   ├── PHASE-3-PROTOCOL.md
│   └── PHASE-4-INTEGRATION.md
├── api/typescript/
└── README.md
```

---

## 🖥️ 시뮬레이터 5탭 구조

| Tab | 이름 | 기능 |
|-----|------|------|
| 1 | 📊 Data Format | 대사 프로파일 JSON, 장-뇌 축 마커 |
| 2 | 🔢 Algorithms | GLP-1 반응 예측, 체중 감량 모델링 |
| 3 | 📡 Protocol | 대사 평가, 보상 행동 분석, 치료 최적화 |
| 4 | 🔗 Integration | EHR 연동, 웨어러블 데이터, 행동 추적 |
| 5 | 🧪 Test | 장-뇌 축 시뮬레이션, 치료 반응 시나리오 |

---

## 📚 Ebook 8챕터 구조

| Ch | EN Title | KO Title |
|:--:|----------|----------|
| 1 | The Obesity Pandemic | 비만 팬데믹 |
| 2 | The Gut-Brain Axis Revolution | 장-뇌 축 혁명 |
| 3 | GLP-1: Beyond Weight Loss | GLP-1: 체중 감량을 넘어서 |
| 4 | Phase 1: Data Format | 데이터 형식 |
| 5 | Phase 2: API Interface | API 인터페이스 |
| 6 | Phase 3: Treatment Protocols | 치료 프로토콜 |
| 7 | Phase 4: Healthcare Integration | 의료 시스템 통합 |
| 8 | Sustainable Metabolic Health | 지속 가능한 대사 건강 |

---

## ✅ 품질 체크리스트

```
□ index.html          - 다크테마, --primary: #F59E0B (대사)
□ simulator/          - 99개 언어, 장-뇌 축 시각화
□ ebook/en/           - 9개 파일, 각 15KB+
□ ebook/ko/           - 9개 파일, 실제 한글
□ spec/               - 4개 파일, 각 5KB+
□ WHO 가이드라인      - 2025년 12월 업데이트 반영
□ GLP-1 메커니즘      - 뇌 수용체 분포, 보상회로 작용
□ 행동 척도           - Food Craving, Binge Eating Scale
□ 장기 안전성         - 신경보호, 중독 감소 효과
□ 접근성 고려         - 비용 장벽, 글로벌 접근성
```

---

**홍익인간 (弘益人間) - Benefit All Humanity**
