# 🌱 Challenge 05: WIA-SOIL-MICROBIOME
## 토양 마이크로바이옴 표준

**홍익인간 (弘益人間) - Benefit All Humanity**

> 이 프롬프트는 `/create-standard WIA-SOIL-MICROBIOME` 실행 시 사용됩니다.

---

## 🎯 Mission

**분산된 토양 미생물 연구를 통합하여, 지속 가능한 농업과 탄소 격리를 위한 표준을 만든다.**

---

## 📊 현재 상태 분석: 분산된 복잡성

```
토양 미생물 연구의 파편화:
├── 박테리아 연구 (따로)
├── 균류 연구 (따로)
├── 원생동물 연구 (따로)
├── 바이러스 연구 (따로)
├── 지역별 다른 분류 체계
├── 농업/환경/생태학 분리
└── 탄소 격리 연구 분리
```

---

## 🔍 발견된 빈틈 (통일 원리): 미생물 매개 탄소 격리

### 2024-2025 웹서치 핵심 발견

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  💡 통일 원리: 토양 미생물 = 탄소 격리의 핵심 조절자                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🔬 Soil Microbiome Consortium (mSystems, 2025):                           │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • "Soil Stars" - 기후 완화를 위한 토양 미생물 컨소시엄                     │
│  • 직접 개입: 미생물 균주, 컨소시엄, 파지, 토양 이식                        │
│  • 간접 개입: 토양 조건 관리, 첨가물로 군집 조절                            │
│  • 토양 탄소 저장 증가 + 온실가스 배출 감소                                 │
│  📎 https://journals.asm.org/doi/10.1128/msystems.01129-24                  │
│                                                                             │
│  🔬 보전 농업 + 온난화 연구 (Nature Communications, 2024.01):              │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • 온난화 + 보전 농업 = 토양 유기탄소 증가                                 │
│  • 균류 군집 가속화 + 미생물 탄소 이용 효율(CUE) 증가                      │
│  • 5년 이상 지속 시 더 강한 효과                                            │
│  • 식물 탄소 투입 → 균류 천이 → 미생물 성장 효율 → SOC 축적               │
│  📎 https://www.nature.com/articles/s41467-023-44647-4                      │
│                                                                             │
│  🔬 차세대 토양 탄소 방법 (BCG, 2024):                                     │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • 3가지 차세대 방법: 바이오차, 광물 풍화 촉진, 미생물                      │
│  • 토양 첨가물이 자연 과정을 "슈퍼차지"                                     │
│  • 2050년까지 연간 5기가톤 CO2 격리 잠재력                                  │
│  • 작물 수확량, 수분/영양 흡수, 생물다양성 개선 동시 달성                   │
│  📎 https://www.bcg.com/publications/2024/unearthing-soils-carbon-removal   │
│                                                                             │
│  🔬 미생물 기능과 지식 격차 (2024-2025):                                   │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • 핵심 격차: 식물 유래 탄소 → SOM 전환 과정                                │
│  • 어떤 미생물이 탄소 격리에 기여하는지 규명 필요                           │
│  • 균일 접종제의 생태적 영향 고려                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔧 WIA 패턴 적용

```
분산된 복잡성          →    통일 원리                   →    보편적 해결
─────────────────────────────────────────────────────────────────────────
수만 미생물 종         →  "미생물 탄소 효율 지수"      →    기후+식량 해결
(N개)                  →         (1개)                  →        (∞)
```

**핵심 공식:**
```
Soil Health Index = f(Microbial Diversity, CUE, Carbon Stock, Respiration)
Carbon Sequestration Rate = Plant Input × Microbial CUE × Stability Factor
```

---

## 📁 /create-standard 파일 구조

```
soil-microbiome/
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

### 1.1 토양 마이크로바이옴 스키마

```json
{
  "$schema": "https://wia.live/schemas/soil-microbiome/v1.0.0",
  "soil_microbiome": {
    "sample_id": "uuid",
    "timestamp": "ISO8601",
    "location": {
      "latitude": 0.0,
      "longitude": 0.0,
      "depth_cm": 0,
      "land_use": "cropland|grassland|forest|wetland"
    },

    "diversity": {
      "shannon_index": 0.0,
      "simpson_index": 0.0,
      "species_richness": 0,
      "evenness": 0.0
    },

    "functional_groups": {
      "nitrogen_fixers": { "abundance": 0.0, "activity": 0.0 },
      "decomposers": { "abundance": 0.0, "activity": 0.0 },
      "mycorrhizae": { "arbuscular": 0.0, "ectomycorrhizal": 0.0 },
      "carbon_stabilizers": 0.0,
      "methanogens": 0.0,
      "methanotrophs": 0.0
    },

    "carbon_metrics": {
      "microbial_biomass_c": { "value": 0.0, "unit": "mg/kg" },
      "carbon_use_efficiency": 0.0,
      "respiration_rate": { "value": 0.0, "unit": "mg_CO2/kg/day" },
      "soil_organic_carbon": { "value": 0.0, "unit": "g/kg" }
    },

    "soil_health_index": {
      "composite_score": 0.0,
      "interpretation": "excellent|good|moderate|poor|degraded"
    }
  }
}
```

### 1.2 탄소 격리 프로토콜

```json
{
  "carbon_sequestration": {
    "intervention_type": "biochar|enhanced_weathering|microbial_inoculant|cover_crop",
    "baseline_soc": 0.0,
    "current_soc": 0.0,
    "sequestration_rate": { "value": 0.0, "unit": "tCO2/ha/year" },
    "permanence_years": 0,
    "verification_method": "direct_measurement|modeling|remote_sensing"
  }
}
```

---

## 📋 Phase 2: API 인터페이스

```yaml
paths:
  /api/v1/soil/analyze:
    post:
      summary: 토양 샘플 분석

  /api/v1/soil/microbiome/{sample_id}:
    get:
      summary: 마이크로바이옴 프로파일 조회

  /api/v1/soil/health-index/{location}:
    get:
      summary: 토양 건강 지수 조회

  /api/v1/soil/carbon-sequestration:
    post:
      summary: 탄소 격리량 계산

  /api/v1/soil/intervention/recommend:
    post:
      summary: 개입 방법 권장
```

---

## 📋 Phase 3: 프로토콜

### 3.1 샘플링 프로토콜
- 표준 샘플링 깊이 (0-10, 10-30, 30-60 cm)
- 계절별 샘플링 타이밍
- DNA 추출 및 보존 표준

### 3.2 분석 프로토콜
- 16S/ITS 앰플리콘 시퀀싱
- 메타게노믹스 (기능 분석)
- qPCR (특정 기능 유전자)

### 3.3 탄소 MRV 프로토콜
- 측정 (Measurement): 직접 샘플링 + 모델링
- 보고 (Reporting): 표준 형식
- 검증 (Verification): 제3자 검증

---

## 📋 Phase 4: 통합

- 정밀 농업 플랫폼 연동
- 탄소 크레딧 거래소 연동
- 위성 원격 탐사 통합
- 국가 토양 데이터베이스 연동

---

## 🖥️ 시뮬레이터 5탭

| Tab | 이름 | 기능 |
|-----|------|------|
| 1 | 📊 Data Format | 마이크로바이옴 프로파일 JSON |
| 2 | 🔢 Algorithms | 토양 건강 지수, 탄소 격리 계산 |
| 3 | 📡 Protocol | 샘플링/분석 시뮬레이션 |
| 4 | 🔗 Integration | 탄소 크레딧 계산, MRV |
| 5 | 🧪 Test | 개입 효과 예측, 지도 시각화 |

---

## 📚 Ebook 8챕터

| Ch | EN Title | KO Title |
|:--:|----------|----------|
| 1 | The Hidden World Beneath | 발밑의 숨겨진 세계 |
| 2 | Soil & Climate Crisis | 토양과 기후 위기 |
| 3 | Microbial Carbon Cycling | 미생물 탄소 순환 |
| 4 | Phase 1: Data Format | 데이터 형식 |
| 5 | Phase 2: API Interface | API 인터페이스 |
| 6 | Phase 3: Protocols | 프로토콜 |
| 7 | Phase 4: Integration | 통합 |
| 8 | Regenerative Agriculture | 재생 농업 |

---

## 📚 참고 자료 (2024-2025 웹서치)

- https://journals.asm.org/doi/10.1128/msystems.01129-24 (Soil Stars)
- https://www.nature.com/articles/s41467-023-44647-4 (Conservation agriculture)
- https://www.bcg.com/publications/2024/unearthing-soils-carbon-removal (BCG)
- https://www.niab.com/links-between-soil-microbiome-and-carbon-sequestration
- https://www.fao.org/soils-portal/soil-biodiversity

---

## ✅ 품질 체크리스트

```
□ index.html          - 다크테마, --primary: #10B981 (환경)
□ simulator/          - 99개 언어, 탄소 계산기
□ ebook/en/           - 9개 파일, 각 15KB+
□ ebook/ko/           - 9개 파일, 실제 한글
□ spec/               - 4개 파일, 각 5KB+
```

---

**홍익인간 (弘益人間) - Benefit All Humanity**
