# 🧠 Challenge 04: WIA-CONSCIOUSNESS
## 의식의 과학적 이해 표준

**홍익인간 (弘益人間) - Benefit All Humanity**

> 이 프롬프트는 `/create-standard WIA-CONSCIOUSNESS` 실행 시 사용됩니다.

---

## 🎯 Mission

**분산된 의식 이론들을 통합하여, 의식의 과학적 측정과 이해를 위한 표준을 만든다.**

---

## 📊 현재 상태 분석: 분산된 복잡성

```
수십 가지 의식 이론이 각각 따로 연구됨:
├── 통합정보이론 (IIT)
├── 글로벌 워크스페이스 이론 (GWT)
├── 고차 사고 이론 (HOT)
├── 예측 처리 이론
├── 양자 의식 이론
├── 신경상관자 (NCC) 연구
├── 명상/변성 의식 연구
└── 마취/수면 의식 연구
```

---

## 🔍 발견된 빈틈 (통일 원리): 정보 통합 지수 (Φ)

### 2024-2025 웹서치 핵심 발견

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  💡 통일 원리: 의식 = 정보 통합의 양과 질 (Φ)                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🔬 IIT 4.0 (PLOS Computational Biology, 2024):                            │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Φ-structure = 의식의 질 (quality)                                       │
│  • Φ 총합 = 의식의 양 (quantity)                                           │
│  • 경험의 본질적 속성을 물리적 용어로 공식화                                 │
│  • 공리(axioms) → 공준(postulates) → 수학적 표현                           │
│  📎 https://journals.plos.org/ploscompbiol/article?id=10.1371/journal...   │
│                                                                             │
│  🔬 IIT vs GNW 대규모 실증 연구 (Nature, 2025):                            │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • 256명 대상 fMRI, MEG, iEEG 다중모달 연구                                │
│  • IIT와 GNW 이론 직접 비교                                                 │
│  • 결과: 두 이론 모두 일부 예측 맞고 일부 틀림                              │
│  • IIT 도전: 후부 피질 지속 동기화 부재                                     │
│  • GNW 도전: 전두엽 표상 제한적                                             │
│  📎 https://www.nature.com/articles/s41586-025-08888-1                      │
│                                                                             │
│  🔬 AI 의식 측정 모델 (Neural Computing, 2024):                            │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • IIT 기반 AI 시스템 의식 측정 모델 개발                                   │
│  • Tononi의 이론을 AI 인지 시스템에 적용                                    │
│  • 정보 통합 관점에서 의식 이해                                              │
│  📎 https://link.springer.com/article/10.1007/s00521-024-10584-6            │
│                                                                             │
│  🔬 Φ 계산의 한계 (2024-2025):                                             │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • Φ의 정확한 계산 = 계산적으로 난해 (intractable)                          │
│  • 실용적 근사 방법 연구 진행 중                                             │
│  • PCI (Perturbational Complexity Index) = 실용적 대안                      │
│                                                                             │
│  🔬 IIT Wiki v1.0 (Wisconsin, 2024):                                       │
│  ─────────────────────────────────────────────────────────────────────────  │
│  • IIT 이론의 완전한 공식 문서화                                             │
│  • 수학적 정의와 계산 방법 표준화                                            │
│  📎 https://centerforsleepandconsciousness.psychiatry.wisc.edu/...          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔧 WIA 패턴 적용

```
분산된 복잡성          →    통일 원리           →    보편적 해결
─────────────────────────────────────────────────────────────────
수십 의식 이론         →  "정보 통합 지수 Φ"   →    의식 측정 표준
(N개)                  →       (1개)            →        (∞)
```

**핵심 공식:**
```
Φ (Big Phi) = 시스템의 환원 불가능한 통합 정보량
의식 수준 ∝ Φ
PCI = 실용적 측정 가능한 Φ의 근사치
```

---

## 📁 /create-standard 파일 구조

```
consciousness/
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

## 📋 Phase 1: 데이터 형식

### 1.1 의식 지수 스키마

```json
{
  "$schema": "https://wia.live/schemas/consciousness/v1.0.0",
  "consciousness_index": {
    "subject_id": "uuid",
    "timestamp": "ISO8601",

    "iit_metrics": {
      "phi_estimate": { "value": 0.0, "unit": "bits" },
      "phi_structure": { "quality": "string" },
      "cause_effect_power": 0.0,
      "irreducibility": 0.0
    },

    "gnw_metrics": {
      "global_ignition": 0.0,
      "prefrontal_activation": 0.0,
      "broadcast_strength": 0.0
    },

    "practical_measures": {
      "pci": { "value": 0.0, "max": 1.0 },
      "complexity_index": 0.0,
      "lempel_ziv_complexity": 0.0
    },

    "state": {
      "condition": "awake|sleep_N1|sleep_N2|sleep_N3|REM|anesthesia|coma|VS|MCS",
      "arousal_level": 0.0,
      "awareness_level": 0.0
    },

    "measurement": {
      "method": "TMS-EEG|fMRI|MEG|iEEG|combined",
      "confidence": 0.0
    }
  }
}
```

### 1.2 의식 상태 분류

```json
{
  "consciousness_states": {
    "normal": ["awake", "drowsy", "sleep_stages"],
    "altered": ["meditation", "psychedelic", "hypnosis"],
    "pathological": ["coma", "vegetative_state", "minimally_conscious", "locked_in"],
    "artificial": ["anesthesia_levels"]
  }
}
```

---

## 📋 Phase 2: API 인터페이스

```yaml
paths:
  /api/v1/consciousness/measure:
    post:
      summary: 의식 수준 측정

  /api/v1/consciousness/state/{subject_id}:
    get:
      summary: 의식 상태 조회

  /api/v1/consciousness/phi/{subject_id}:
    get:
      summary: Φ 추정값 조회

  /api/v1/consciousness/pci/{subject_id}:
    get:
      summary: PCI 측정값 조회

  /api/v1/consciousness/compare:
    post:
      summary: 이론별 예측 비교 (IIT vs GNW)
```

---

## 📋 Phase 3: 프로토콜

### 3.1 측정 프로토콜
- **PCI 측정**: TMS-EEG 기반, 교란 복잡도 지수
- **EEG 복잡도**: Lempel-Ziv, 엔트로피 분석
- **fMRI 연결성**: 기능적 연결성, 네트워크 분석

### 3.2 해석 프로토콜
- **의식 장애 진단**: VS vs MCS 구별 (PCI 임계값)
- **마취 깊이 모니터링**: 실시간 PCI 추적
- **숨겨진 의식 탐지**: 명령 추종 fMRI

---

## 📋 Phase 4: 통합

- 마취과 모니터링 시스템
- 중환자실 의식 평가
- AI 시스템 의식 평가 프레임워크
- 연구 데이터 공유 플랫폼

---

## 🖥️ 시뮬레이터 5탭

| Tab | 이름 | 기능 |
|-----|------|------|
| 1 | 📊 Data Format | 의식 지수 JSON, Φ 시각화 |
| 2 | 🔢 Algorithms | PCI 계산기, 복잡도 분석 |
| 3 | 📡 Protocol | TMS-EEG 시뮬레이션 |
| 4 | 🔗 Integration | IIT/GNW 예측 비교 |
| 5 | 🧪 Test | 의식 상태 분류, AI 의식 테스트 |

---

## 📚 Ebook 8챕터

| Ch | EN Title | KO Title |
|:--:|----------|----------|
| 1 | The Mystery of Consciousness | 의식의 미스터리 |
| 2 | Theories of Consciousness | 의식 이론들 |
| 3 | Integrated Information Theory | 통합정보이론 |
| 4 | Phase 1: Data Format | 데이터 형식 |
| 5 | Phase 2: API Interface | API 인터페이스 |
| 6 | Phase 3: Protocols | 프로토콜 |
| 7 | Phase 4: Integration | 통합 |
| 8 | Ethics & AI Consciousness | 윤리와 AI 의식 |

---

## 📚 참고 자료 (2024-2025 웹서치)

- https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011465 (IIT 4.0)
- https://www.nature.com/articles/s41586-025-08888-1 (IIT vs GNW adversarial)
- https://link.springer.com/article/10.1007/s00521-024-10584-6 (AI consciousness)
- https://sites.dartmouth.edu/dujs/2024/12/16/integrated-information-theory...

---

## ⚠️ 윤리적 고려사항

```
의식 측정의 윤리적 함의:
- 의식 장애 환자의 권리와 치료 결정
- AI 의식 판단과 도덕적 지위
- 동물 의식과 복지
- 의식 데이터의 프라이버시
```

---

## ✅ 품질 체크리스트

```
□ index.html          - 다크테마, --primary: #8B5CF6 (AI/BCI)
□ simulator/          - 99개 언어, Φ 계산기
□ ebook/en/           - 9개 파일, 각 15KB+
□ ebook/ko/           - 9개 파일, 실제 한글
□ spec/               - 4개 파일, 각 5KB+
```

---

**홍익인간 (弘益人間) - Benefit All Humanity**
