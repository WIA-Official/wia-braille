# 🧬 Challenge 02: WIA-CANCER-METABOLISM
## 암 대사 기반 치료 표준

**홍익인간 (弘益人間) - Benefit All Humanity**

> 이 프롬프트는 `/create-standard WIA-CANCER-METABOLISM` 실행 시 사용됩니다.

---

## 🎯 Mission

**90년간 무시된 Warburg Effect를 기반으로, 암의 대사적 접근 치료 표준을 만든다.**

---

## 📊 현재 상태 분석: 분산된 복잡성

```
수천 가지 유전자 변이 추적:
├── 표적 치료 (수백 종류)
├── 면역 치료
├── 화학 요법
├── 방사선 치료
├── 각 암 종류별 별도 접근
└── 유전자 변이 중심 패러다임
```

---

## 🔍 발견된 빈틈 (통일 원리): Warburg Effect (대사 전환)

### 2024-2025 웹서치 핵심 발견

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  💡 통일 원리: 암세포 대사 = 포도당 발효 의존 = 굶기기 가능                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🔬 UCSF 췌장암 연구 (Nature, 2024.08):                                     │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • 케톤 식이 + eFT508(eIF4E 억제제) 병용                                    │
│  • 암세포의 지방 대사 차단 → 유일한 연료원 제거                             │
│  • 종양 성장 중단                                                           │
│  • "암세포를 굶겨 죽이는" 전략 입증                                         │
│  📎 https://www.ucsf.edu/news/2024/08/428251/ketogenic-diet-could-improve   │
│                                                                             │
│  🔬 Warburg Effect 100주년 (Cell, 2024):                                    │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • "100 years of the Warburg effect: A cancer metabolism endeavor"          │
│  • Otto Warburg 발견 재조명                                                 │
│  • 대부분 고형암이 동일한 대사 특성 공유                                    │
│  • 산소 존재해도 해당작용 의존 (aerobic glycolysis)                         │
│  📎 https://www.cell.com/cell/fulltext/S0092-8674(24)00700-1                │
│                                                                             │
│  🔬 교모세포종 임상 연구 (Frontiers in Nutrition, 2024):                    │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • 18명 GBM 환자, 케톤 식이 치료                                            │
│  • 6개월+ 케톤 식이 유지한 6명: 생존 36-43개월                              │
│  • 표준 치료 생존 14-16개월 대비 2-3배 연장                                 │
│  📎 https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut... │
│                                                                             │
│  🔬 케톤체 메커니즘 연구 (PMC, 2025):                                       │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • 케톤체 = 신호 매개체, 번역후 변형 동인, 염증/산화 조절                   │
│  • 암세포 = 케톤 활용 불가 (정상세포는 가능)                                │
│  • 대사 스트레스로 암세포 선택적 타격                                       │
│  📎 https://pmc.ncbi.nlm.nih.gov/articles/PMC11760447/                      │
│                                                                             │
│  🔬 진행 중인 임상시험 (2024):                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • NCT05090358: 케톤 식이 + Alpelisib (PIK3CA-변이 유방암)                  │
│  • NCT04631445: 케톤 식이 + 항암제 병용 (전이성 췌장암)                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔧 WIA 패턴 적용

```
분산된 복잡성          →    통일 원리           →    보편적 해결
─────────────────────────────────────────────────────────────────
수천 유전자 변이       →  "대사 전환"          →    대사 기반 치료
(N개)                  →     (1개)              →      (∞)
```

**핵심 공식:**
```
GKI (Glucose-Ketone Index) = Blood Glucose (mmol/L) / Blood Ketones (mmol/L)
치료 목표 GKI: 1.0 이하 (강력) / 2.0 이하 (치료적)
```

---

## 📁 /create-standard 파일 구조

```
cancer-metabolism/
├── index.html                    # 랜딩페이지 (--primary: #10B981)
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

## 📋 Phase 1: 데이터 형식

### 1.1 대사 프로파일 스키마

```json
{
  "$schema": "https://wia.live/schemas/cancer-metabolism/v1.0.0",
  "metabolic_profile": {
    "patient_id": "uuid",
    "timestamp": "ISO8601",
    "cancer_type": "string",

    "warburg_metrics": {
      "glucose_uptake_suv": { "value": 0.0, "unit": "SUV_max" },
      "lactate_production": { "value": 0.0, "unit": "mmol/L" },
      "oxygen_consumption": { "value": 0.0, "unit": "ml/min/kg" },
      "warburg_index": { "value": 0.0, "max": 1.0 }
    },

    "glucose_ketone_index": {
      "blood_glucose": { "value": 0.0, "unit": "mmol/L" },
      "blood_ketones": { "value": 0.0, "unit": "mmol/L" },
      "gki": { "value": 0.0, "interpretation": "therapeutic|moderate|baseline" }
    },

    "metabolic_flexibility": {
      "ketone_utilization": 0.0,
      "fat_oxidation_rate": 0.0,
      "insulin_sensitivity": 0.0
    },

    "tumor_metabolism": {
      "pet_ct_suv_max": 0.0,
      "lactate_tumor": 0.0,
      "hypoxia_score": 0.0
    }
  }
}
```

### 1.2 케톤 개입 프로토콜

```json
{
  "ketogenic_intervention": {
    "type": "classic|modified|mct|targeted",
    "macros": {
      "fat_percent": 70,
      "protein_percent": 25,
      "carb_percent": 5,
      "calories": 1800
    },
    "fasting_protocol": {
      "type": "intermittent|extended|time_restricted",
      "fasting_hours": 16,
      "eating_window": 8
    },
    "monitoring": {
      "gki_target": 2.0,
      "measurement_frequency": "2x_daily",
      "adjustment_rules": []
    }
  }
}
```

---

## 📋 Phase 2: API 인터페이스

```yaml
paths:
  /api/v1/cancer/metabolic-profile:
    post:
      summary: 대사 프로파일 생성/업데이트

  /api/v1/cancer/gki/{patient_id}:
    get:
      summary: GKI 히스토리 조회

  /api/v1/cancer/intervention/ketogenic:
    post:
      summary: 케톤 개입 프로토콜 생성

  /api/v1/cancer/warburg-index/{patient_id}:
    get:
      summary: Warburg Index 조회

  /api/v1/cancer/treatment/recommend:
    post:
      summary: 치료 조합 권장
```

---

## 📋 Phase 3: 프로토콜

### 3.1 대사 평가 프로토콜
- PET-CT SUV_max 해석 표준
- 혈액 대사 마커: 포도당, 케톤, 젖산, 인슐린
- GKI 계산 및 해석

### 3.2 케톤 식이 프로토콜
- **도입기 (1-2주)**: 점진적 탄수화물 감소, 적응 모니터링
- **치료기**: GKI 2.0 이하 유지, 영양 보충
- **유지기**: 개인화 조정, 장기 순응도

### 3.3 표준 치료 병행
- 화학요법 + 케톤 식이 타이밍
- 면역요법 + 대사 지원
- 방사선 + 케톤 민감화

---

## 📋 Phase 4: 통합

- 종양내과 EMR 연동
- 영양사 플랫폼 연동
- 연속혈당측정기(CGM) 통합
- 임상시험 데이터 표준

---

## 🖥️ 시뮬레이터 5탭 구조

| Tab | 이름 | 기능 |
|-----|------|------|
| 1 | 📊 Data Format | 대사 프로파일 JSON 편집기, GKI 계산기 |
| 2 | 🔢 Algorithms | Warburg Index 계산, 칼로리/매크로 계산 |
| 3 | 📡 Protocol | 케톤 식이 프로토콜 시뮬레이션 |
| 4 | 🔗 Integration | CGM 연동 데모, PET-CT 해석 |
| 5 | 🧪 Test | GKI 추적 시뮬레이션, 치료 반응 예측 |

---

## 📚 Ebook 8챕터

| Ch | EN Title | KO Title |
|:--:|----------|----------|
| 1 | Introduction to Cancer Metabolism | 암 대사 소개 |
| 2 | The Warburg Effect: 100 Years Later | Warburg 효과: 100년 후 |
| 3 | GKI and Metabolic Therapy | GKI와 대사 치료 |
| 4 | Phase 1: Data Format | 데이터 형식 |
| 5 | Phase 2: API Interface | API 인터페이스 |
| 6 | Phase 3: Protocols | 프로토콜 |
| 7 | Phase 4: Integration | 통합 |
| 8 | Implementation Guide | 구현 가이드 |

---

## 📚 참고 자료 (2024-2025 웹서치)

- https://www.ucsf.edu/news/2024/08/428251/ketogenic-diet-could-improve-response-pancreatic-cancer-therapy
- https://www.cell.com/cell/fulltext/S0092-8674(24)00700-1
- https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2024.1489812/full
- https://pmc.ncbi.nlm.nih.gov/articles/PMC11760447/
- https://onlinelibrary.wiley.com/doi/10.1002/cam4.71244

---

## ⚠️ 주의사항

```
이 표준은 기존 치료를 대체하지 않습니다.
의료 전문가의 감독 하에 보조적으로 사용되어야 합니다.
임상시험 NCT05090358, NCT04631445 등 진행 중.
```

---

## ✅ 품질 체크리스트

```
□ index.html          - 다크테마, --primary: #10B981
□ simulator/          - 99개 언어, GKI 계산기 포함
□ ebook/en/           - 9개 파일, 각 15KB+
□ ebook/ko/           - 9개 파일, 실제 한글
□ spec/               - 4개 파일, 각 5KB+
```

---

**홍익인간 (弘益人間) - Benefit All Humanity**
