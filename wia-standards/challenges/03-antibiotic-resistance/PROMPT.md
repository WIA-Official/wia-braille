# 🦠 Challenge 03: WIA-AMR
## 항생제 내성 극복 표준 (Antimicrobial Resistance)

**홍익인간 (弘益人間) - Benefit All Humanity**

> 이 프롬프트는 `/create-standard WIA-AMR` 실행 시 사용됩니다.

---

## 🎯 Mission

**"박테리아 죽이기"에서 "박테리아 행동 조절"로 패러다임 전환, 내성 없는 치료 표준을 만든다.**

---

## 📊 현재 상태 분석: 분산된 복잡성

```
항생제 내성 위기:
├── 2025-2050: 3,900만 직접 사망 + 1.69억 간접 사망 예상
├── 연간 500만 명 사망 (현재)
├── 새 항생제 개발 정체 (40년간 새 클래스 없음)
├── 기존 접근: "박테리아 죽이기"
│   └── 살아남은 박테리아 = 내성 획득 (선택압)
└── 다제내성균(MDR) 확산
```

---

## 🔍 발견된 빈틈 (통일 원리): 박테리아 행동 조절 + Quorum Quenching

### 2024-2025 웹서치 핵심 발견

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  💡 통일 원리: 죽이지 않고 행동 조절 → 내성 선택압 제거                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🔬 Quorum Quenching (QQ) 연구 (PMC, 2024-2025):                           │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • QS(쿼럼 센싱) 방해 = 독성/바이오필름 감소 + 항생제/파지 효과 증가       │
│  • SsoPox-W263I 효소: AHL(N-아실 호모세린 락톤) 분해                       │
│  • 당뇨 족부 궤양 P. aeruginosa에서 독성 감소, 파지/항생제 민감도 증가     │
│  • 핵심: 죽이지 않으면 내성 선택압 없음!                                    │
│  📎 https://www.sciencedirect.com/science/article/pii/S2950194624001912    │
│                                                                             │
│  🔬 천연물 기반 QS 억제제 (PMC, 2025):                                     │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • 식물, 미생물, 해양생물 유래 QSI(Quorum Sensing Inhibitor)               │
│  • 신호 합성 억제, 수용체 길항, 신호분자 효소 분해, 유전자 발현 억제       │
│  • "내성 압력 유발 없이 독성 감소"                                         │
│  📎 https://pmc.ncbi.nlm.nih.gov/articles/PMC12242448/                      │
│                                                                             │
│  🔬 파지 치료 + QS 상호작용 (European J Clinical Microbio, 2025):           │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • QS가 바이오필름 형성 조절 → 파지 감염 억제                               │
│  • QQ + 파지 병용 = 시너지 효과                                             │
│  • 일부 파지는 QS 신호로 활성화될 때까지 휴면                               │
│  📎 https://link.springer.com/article/10.1007/s10096-025-05375-3            │
│                                                                             │
│  🔬 CRISPR-Cas + 파지 전달 (PMC, 2025):                                    │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • 파지 벡터로 CRISPR-Cas9 전달                                             │
│  • MDR 유전자/독성 인자 비활성화                                            │
│  • 내성균 재민감화                                                          │
│  📎 https://pmc.ncbi.nlm.nih.gov/articles/PMC11925186/                      │
│                                                                             │
│  🔬 QS와 다균종 감염 (PMC, 2024):                                          │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • QS가 다균종 감염에서 종간 상호작용 조절                                  │
│  • Furanones, AHL 유사체: 바이오필름/독성 감소                              │
│  📎 https://pmc.ncbi.nlm.nih.gov/articles/PMC11487952/                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔧 WIA 패턴 적용

```
분산된 복잡성          →    통일 원리                 →    보편적 해결
─────────────────────────────────────────────────────────────────────────
수천 항생제            →  "행동 조절 (QQ + Phage)"  →    내성 없는 치료
(N개)                  →        (1개)                →        (∞)
```

**핵심 공식:**
```
Anti-Virulence = f(Quorum Sensing Inhibition, Biofilm Disruption, Adhesion Block)
No Killing → No Selection Pressure → No Resistance
```

---

## 📁 /create-standard 파일 구조

```
amr/
├── index.html                    # 랜딩페이지 (--primary: #EF4444)
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

### 1.1 박테리아 행동 프로파일

```json
{
  "$schema": "https://wia.live/schemas/amr/v1.0.0",
  "bacterial_behavior_profile": {
    "sample_id": "uuid",
    "timestamp": "ISO8601",

    "identification": {
      "species": "string",
      "strain": "string",
      "gram": "positive|negative",
      "method": "16S_rRNA|MALDI-TOF|WGS"
    },

    "quorum_sensing": {
      "qs_system": "AHL|AIP|AI-2|PQS",
      "signal_level": { "value": 0.0, "unit": "nM" },
      "qs_activity": 0.0
    },

    "virulence_phenotype": {
      "biofilm_formation": { "value": 0.0, "max": 1.0 },
      "motility": { "swimming": 0.0, "swarming": 0.0, "twitching": 0.0 },
      "adhesion": 0.0,
      "toxin_production": 0.0,
      "virulence_factors": ["list"]
    },

    "resistance_profile": {
      "mdr": true,
      "xdr": false,
      "pdr": false,
      "resistant_to": ["antibiotic_list"],
      "sensitive_to": ["antibiotic_list"],
      "resistance_genes": ["list"]
    }
  }
}
```

### 1.2 박테리오파지 데이터베이스

```json
{
  "phage_profile": {
    "phage_id": "uuid",
    "taxonomy": {
      "family": "string",
      "genus": "string",
      "species": "string"
    },
    "host_range": {
      "target_species": ["list"],
      "target_strains": ["list"],
      "specificity": 0.0
    },
    "lytic_efficiency": {
      "eop": 0.0,
      "burst_size": 0,
      "latent_period_min": 0
    },
    "safety_profile": {
      "lysogenic": false,
      "toxin_genes": false,
      "resistance_genes": false
    }
  }
}
```

### 1.3 Quorum Quenching 개입

```json
{
  "qq_intervention": {
    "type": "enzymatic|small_molecule|natural_product",
    "agent": {
      "name": "string",
      "mechanism": "signal_synthesis_inhibitor|receptor_antagonist|signal_degrader",
      "target_qs_system": "AHL|AIP|AI-2"
    },
    "expected_effects": {
      "biofilm_reduction": 0.0,
      "virulence_reduction": 0.0,
      "antibiotic_sensitization": 0.0
    }
  }
}
```

---

## 📋 Phase 2: API 인터페이스

```yaml
paths:
  /api/v1/bacteria/identify:
    post:
      summary: 박테리아 동정

  /api/v1/bacteria/behavior/{sample_id}:
    get:
      summary: 행동 프로파일 조회

  /api/v1/phage/match:
    post:
      summary: 최적 파지 매칭

  /api/v1/qq/recommend:
    post:
      summary: Quorum Quenching 전략 권장

  /api/v1/treatment/recommend:
    post:
      summary: 복합 치료 권장 (QQ + Phage + 저용량 항생제)
```

---

## 📋 Phase 3: 프로토콜

### 3.1 진단 프로토콜
- 신속 균 동정 (MALDI-TOF, 16S rRNA)
- QS 활성 측정
- 바이오필름 형성능 평가
- 내성 유전자 검출

### 3.2 치료 프로토콜
- **QQ 단독**: 만성 감염, 바이오필름 기반 감염
- **QQ + Phage**: 급성 MDR 감염
- **QQ + 저용량 항생제**: 기존 치료 보조

---

## 📋 Phase 4: 통합

- 병원 감염관리 시스템 연동
- 글로벌 AMR 감시 네트워크 (GLASS)
- 파지 뱅크 데이터베이스 연동
- 임상 결과 데이터 공유

---

## 🖥️ 시뮬레이터 5탭

| Tab | 이름 | 기능 |
|-----|------|------|
| 1 | 📊 Data Format | 박테리아/파지 프로파일 JSON |
| 2 | 🔢 Algorithms | 파지 매칭, QQ 효과 예측 |
| 3 | 📡 Protocol | 치료 프로토콜 시뮬레이션 |
| 4 | 🔗 Integration | 병원 시스템 연동, GLASS 연동 |
| 5 | 🧪 Test | 치료 효과 예측, 내성 발생 시뮬레이션 |

---

## 📚 Ebook 8챕터

| Ch | EN Title | KO Title |
|:--:|----------|----------|
| 1 | The AMR Crisis | 항생제 내성 위기 |
| 2 | Beyond Killing: Behavior Control | 죽이기를 넘어: 행동 조절 |
| 3 | Quorum Sensing & Quenching | 쿼럼 센싱과 퀜칭 |
| 4 | Phase 1: Data Format | 데이터 형식 |
| 5 | Phase 2: API Interface | API 인터페이스 |
| 6 | Phase 3: Protocols | 프로토콜 |
| 7 | Phase 4: Integration | 통합 |
| 8 | Implementation Guide | 구현 가이드 |

---

## 📚 참고 자료 (2024-2025 웹서치)

- https://www.sciencedirect.com/science/article/pii/S2950194624001912 (Quorum Quenching)
- https://pmc.ncbi.nlm.nih.gov/articles/PMC12242448/ (Natural QSI)
- https://link.springer.com/article/10.1007/s10096-025-05375-3 (Phages and QS)
- https://pmc.ncbi.nlm.nih.gov/articles/PMC11925186/ (Phage therapy updates)
- https://pmc.ncbi.nlm.nih.gov/articles/PMC11487952/ (QS and polymicrobial)
- https://academic.oup.com/jacamr/article/6/1/dlae017/7604231 (Phage resistance evasion)

---

## ✅ 품질 체크리스트

```
□ index.html          - 다크테마, --primary: #EF4444 (보안/의료)
□ simulator/          - 99개 언어, 파지 매칭 도구
□ ebook/en/           - 9개 파일, 각 15KB+
□ ebook/ko/           - 9개 파일, 실제 한글
□ spec/               - 4개 파일, 각 5KB+
```

---

**홍익인간 (弘益人間) - Benefit All Humanity**
