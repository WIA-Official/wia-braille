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

## 📊 현재 상태 분석: 분산된 복잡성

```
수십 가지 자가면역질환이 각각 따로 연구됨:
├── 류마티스 관절염 (RA)
├── 전신홍반루푸스 (SLE)
├── 다발성경화증 (MS)
├── 제1형 당뇨병 (T1D)
├── 염증성 장질환 (IBD)
├── 건선 (Psoriasis)
├── 하시모토 갑상선염
├── 그레이브스병
├── 쇼그렌 증후군
└── 강직성 척추염
```

---

## 🔧 WIA 패턴 적용

```
분산된 복잡성          →    통일 원리           →    보편적 해결
─────────────────────────────────────────────────────────────────
수십 자가면역질환       →  "Treg-마이크로바이옴 축"  →  모든 환자 면역 관용 회복
(N개)                  →     (1개)              →      (∞)
```

**핵심 공식:**
```
Immune Tolerance = f(Treg Function, Microbiome Balance, SCFA Production)
Disease Activity ∝ 1 / (Treg Suppression × SCFA Level)
```

---

## 📁 /create-standard 파일 구조

```
autoimmune/
├── index.html                    # 랜딩페이지 (다크테마, --primary: #E11D48)
├── simulator/
│   └── index.html                # 시뮬레이터 (5탭, 99개 언어)
├── ebook/
│   ├── en/                       # 영문 Ebook (8챕터, 각 15KB+)
│   │   ├── index.html
│   │   ├── chapter-01.html       # Introduction to Autoimmune Diseases
│   │   ├── chapter-02.html       # Current Challenges in Treatment
│   │   ├── chapter-03.html       # The Treg-Microbiome Axis
│   │   ├── chapter-04.html       # Phase 1: Data Format
│   │   ├── chapter-05.html       # Phase 2: API Interface
│   │   ├── chapter-06.html       # Phase 3: Protocol
│   │   ├── chapter-07.html       # Phase 4: Integration
│   │   └── chapter-08.html       # Implementation Guide
│   └── ko/                       # 한글 Ebook (8챕터, 각 15KB+)
├── spec/
│   ├── PHASE-1-DATA-FORMAT.md    # 5KB+
│   ├── PHASE-2-API-INTERFACE.md  # 5KB+
│   ├── PHASE-3-PROTOCOL.md       # 5KB+
│   └── PHASE-4-INTEGRATION.md    # 5KB+
├── api/typescript/
│   ├── src/types.ts
│   ├── src/index.ts
│   └── package.json
└── README.md
```

---

## 🖥️ 시뮬레이터 5탭 구조

| Tab | 이름 | 기능 |
|-----|------|------|
| 1 | 📊 Data Format | 자가면역 프로파일 JSON 편집기/검증기 |
| 2 | 🔢 Algorithms | Treg 기능 계산기, Th17/Treg 비율 분석 |
| 3 | 📡 Protocol | API 테스트, Treg 평가 프로토콜 시뮬레이션 |
| 4 | 🔗 Integration | FHIR 변환, 장내 미생물 분석 연동 데모 |
| 5 | 🧪 Test | 치료 반응 시뮬레이션, QR코드 생성 |

---

## 📚 Ebook 8챕터 구조

| Ch | EN Title | KO Title |
|:--:|----------|----------|
| 1 | Introduction to Autoimmune Diseases | 자가면역질환 소개 |
| 2 | Current Treatment Challenges | 현재 치료의 과제 |
| 3 | The Treg-Microbiome Axis Principle | Treg-마이크로바이옴 축 원리 |
| 4 | Phase 1: Data Format Standards | 데이터 형식 표준 |
| 5 | Phase 2: API Interface Design | API 인터페이스 설계 |
| 6 | Phase 3: Clinical Protocols | 임상 프로토콜 |
| 7 | Phase 4: System Integration | 시스템 통합 |
| 8 | Implementation & Treatment Guide | 구현 및 치료 가이드 |

---

## ✅ 품질 체크리스트

```
□ index.html          - 다크테마, --primary: #E11D48
□ simulator/          - 99개 언어 드롭다운 필수!
□ ebook/en/           - 9개 파일, 각 15KB 이상
□ ebook/ko/           - 9개 파일, 실제 한글 (복붙 금지!)
□ spec/               - 4개 파일, 각 5KB 이상
□ api/typescript/     - SDK 구현
```

---

**홍익인간 (弘益人間) - Benefit All Humanity**
