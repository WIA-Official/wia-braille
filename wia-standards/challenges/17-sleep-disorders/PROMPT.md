# 😴 Challenge 17: WIA-SLEEP-DISORDERS
## 수면장애 표준

**홍익인간 (弘益人間) - Benefit All Humanity**

---

## 🎯 Mission

**분산된 수면 연구를 통합하여, 글림파틱-일주기 동기화 기반 수면 건강의 표준을 만든다.**

---

## 🔍 발견된 빈틈: 글림파틱-일주기 동기화

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  💡 통일 원리: 수면 건강 = 글림파틱 청소 + 일주기 리듬 동기화                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🔬 글림파틱 시스템:                                                        │
│  • 수면 중 뇌 대사 폐기물 제거                                              │
│  • Aβ, 타우 등 신경독성 물질 청소                                           │
│  • 수면 장애 → 축적 → 신경퇴행                                              │
│                                                                             │
│  🔬 일주기 리듬 연결:                                                       │
│  • 글림파틱 기능 낮에 낮음, 밤에 높음                                       │
│  • 글루코코르티코이드 리듬과 동기화                                          │
│  • 시간 조직이 정밀한 타이밍에 필수                                          │
│                                                                             │
│  🔬 파킨슨/알츠하이머 연결:                                                 │
│  • 수면 장애가 PD 진행 가속                                                  │
│  • ALPS 지수로 글림파틱 기능 측정                                           │
│  • 조기 수면 개입으로 신경보호                                               │
│                                                                             │
│  🔬 치료 표적:                                                              │
│  • 글림파틱-수막림프 경로                                                    │
│  • 일주기 리듬 재설정                                                        │
│  • 수면 구조 최적화                                                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Phase 1: 데이터 형식

```json
{
  "$schema": "https://wia.live/schemas/sleep-disorders/v1.0.0",
  "sleep_profile": {
    "patient_id": "uuid",
    "disorder_type": "insomnia|osa|circadian|rls|narcolepsy|parasomnia",

    "polysomnography": {
      "tst": { "value": 0.0, "unit": "hours" },
      "sleep_efficiency": 0.0,
      "sleep_latency": { "value": 0.0, "unit": "minutes" },
      "rem_latency": { "value": 0.0, "unit": "minutes" },
      "stages": {
        "n1_percent": 0.0,
        "n2_percent": 0.0,
        "n3_percent": 0.0,
        "rem_percent": 0.0
      },
      "ahi": 0.0,
      "plm_index": 0.0
    },

    "circadian": {
      "chronotype": "morning|intermediate|evening",
      "dim_light_melatonin_onset": "ISO8601",
      "core_body_temp_minimum": "ISO8601",
      "social_jetlag": { "value": 0.0, "unit": "hours" }
    },

    "glymphatic": {
      "alps_index": 0.0,
      "dtimri_metrics": {},
      "clearance_efficiency": 0.0
    },

    "assessment": {
      "psqi": { "score": 0, "max": 21 },
      "isi": { "score": 0, "max": 28 },
      "ess": { "score": 0, "max": 24 },
      "stop_bang": { "score": 0, "risk": "low|moderate|high" }
    },

    "wearable_data": {
      "sleep_duration_avg": 0.0,
      "sleep_regularity_index": 0.0,
      "hrv_during_sleep": 0.0
    }
  }
}
```

---

## 📋 Phase 2-4

```yaml
paths:
  /api/v1/sleep/assess:
    post:
      summary: 수면 종합 평가
  /api/v1/sleep/glymphatic/{patient_id}:
    get:
      summary: 글림파틱 기능 평가
  /api/v1/sleep/circadian/optimize:
    post:
      summary: 일주기 최적화 계획
```

- 프로토콜: PSG + 일주기 평가 + 글림파틱 MRI
- 치료: CBT-I + 광치료 + 수면 위생 + CPAP
- 목표: 글림파틱 청소 최적화, 신경보호

---

**홍익인간 (弘益人間) - Benefit All Humanity**
