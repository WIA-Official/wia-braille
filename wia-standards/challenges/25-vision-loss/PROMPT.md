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

## 📊 현재 상태 분석: 분산된 복잡성

```
망막 질환 치료의 파편화:
├── 유전자별 치료법 분산 (RPE65, ABCA4, RPGR 등 150+ 유전자)
├── 보조 기기 의존 (흰 지팡이, 점자, 스크린리더)
├── 유전자 대체 치료 (Luxturna - RPE65만)
├── 줄기세포 치료 (RPE 이식 시도)
├── 옵토제네틱스 1세대 (고글 필요, 제한적)
├── 신경보호 치료 (진행 지연, 회복 불가)
├── 망막 임플란트 (저해상도, 수술 위험)
├── 시각 재활 훈련 (적응만 가능)
└── 돌연변이 특이적 접근의 한계
```

---

## 🔧 WIA 패턴 적용

```
분산된 복잡성          →    통일 원리           →    보편적 해결
─────────────────────────────────────────────────────────────────
150+ 유전자 돌연변이   →  "옵토제네틱스"      →   돌연변이 무관 시력 회복
(N개)                  →     (1개)              →      (∞)
```

**핵심 공식:**
```
Vision Recovery = Optogenetics (Mutation-Independent) + Remaining Retinal Cells
MCO-010 Approach = Light-Sensitive Opsin → Bipolar Cells → Vision Restoration
Success Rate = f(Retinal Cell Viability, Light Perception, Treatment Timing)
```

---

## 📁 /create-standard 파일 구조

```
vision-loss/
├── index.html                    # 랜딩페이지 (--primary: #8B5CF6)
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
| 1 | 📊 Data Format | 시력 프로파일 JSON, 유전자 진단 |
| 2 | 🔢 Algorithms | 옵토제네틱스 적격성 평가, 예후 예측 |
| 3 | 📡 Protocol | 시기능검사, OCT 분석, 전기생리 |
| 4 | 🔗 Integration | EHR 연동, 유전자 데이터베이스 |
| 5 | 🧪 Test | MCO-010 시뮬레이션, 시력 회복 시나리오 |

---

## 📚 Ebook 8챕터 구조

| Ch | EN Title | KO Title |
|:--:|----------|----------|
| 1 | The Darkness: Inherited Retinal Diseases | 어둠: 유전성 망막 질환 |
| 2 | Optogenetics: Light Beyond Genes | 옵토제네틱스: 유전자를 넘어선 빛 |
| 3 | MCO-010 Breakthrough | MCO-010 돌파구 |
| 4 | Phase 1: Data Format | 데이터 형식 |
| 5 | Phase 2: API Interface | API 인터페이스 |
| 6 | Phase 3: Clinical Protocols | 임상 프로토콜 |
| 7 | Phase 4: Healthcare Integration | 의료 시스템 통합 |
| 8 | A World Where All Can See | 모두가 볼 수 있는 세상 |

---

## ✅ 품질 체크리스트

```
□ index.html          - 다크테마, --primary: #8B5CF6 (시력)
□ simulator/          - 99개 언어, 옵토제네틱스 시각화
□ ebook/en/           - 9개 파일, 각 15KB+
□ ebook/ko/           - 9개 파일, 실제 한글
□ spec/               - 4개 파일, 각 5KB+
□ MCO-010 데이터      - Nanoscope 임상시험 결과
□ 유전자 패널         - 150+ IRD 유전자 커버리지
□ OCT 통합            - 망막 구조 분석 알고리즘
□ 적격성 기준         - 남은 망막세포, 광각 여부
□ 접근성 고려         - 점자, 스크린리더 호환
```

---

**홍익인간 (弘益人間) - Benefit All Humanity**
