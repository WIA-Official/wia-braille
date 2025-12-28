# 💔 Challenge 16: WIA-LONELINESS
## 외로움 표준

**홍익인간 (弘益人間) - Benefit All Humanity**

---

## 🎯 Mission

**분산된 외로움 연구를 통합하여, 옥시토신-주의 루프 기반 사회적 연결 회복의 표준을 만든다.**

---

## 🔍 발견된 빈틈: 옥시토신-주의 루프

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  💡 통일 원리: 외로움 = 옥시토신 시스템 조절장애 → 미세습관으로 회복         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  🔬 외로움 전염병 (2024-2025):                                             │
│  • 성인 50% 이상 정기적 외로움 경험                                         │
│  • 사망 위험 26% 증가 (담배 15개비/일과 동등)                               │
│  • 만성 염증, 면역 저하, 인지 저하                                          │
│                                                                             │
│  🔬 옥시토신 메커니즘:                                                      │
│  • 사회적 상호작용 → 옥시토신 분비 → 사회적 갈망 감소                       │
│  • 외로운 사람: 옥시토신 불균형 → 사회적 갈망 반응 억제                     │
│  • 악순환: 외로움 → 회피 → 더 외로움                                        │
│                                                                             │
│  🔬 미세습관 개입:                                                          │
│  • 30% 감소 수주 내 가능                                                    │
│  • 온전히 경청하기 같은 작은 행동                                            │
│  • 옥시토신 분비 촉진 → 신경 경로 형성                                      │
│                                                                             │
│  🔬 사회적 연결과 장수:                                                     │
│  • 사회적 유대 = 스트레스 완충 + 옥시토신 보호                              │
│  • 노화 인지 저하 방어                                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Phase 1: 데이터 형식

```json
{
  "$schema": "https://wia.live/schemas/loneliness/v1.0.0",
  "loneliness_profile": {
    "patient_id": "uuid",

    "assessment": {
      "ucla_loneliness": { "score": 0, "max": 80 },
      "social_isolation_index": 0.0,
      "perceived_social_support": 0.0,
      "social_network_size": 0
    },

    "biomarkers": {
      "oxytocin_level": { "value": 0.0, "unit": "pg/mL" },
      "cortisol": { "value": 0.0, "unit": "μg/dL" },
      "inflammatory_markers": { "crp": 0.0, "il6": 0.0 },
      "heart_rate_variability": { "rmssd": 0.0 }
    },

    "digital_phenotype": {
      "screen_time": 0.0,
      "social_media_hours": 0.0,
      "calls_per_week": 0,
      "in_person_interactions": 0,
      "home_time_percent": 0.0
    },

    "social_skills": {
      "empathy": 0.0,
      "social_anxiety": 0.0,
      "attachment_style": "secure|anxious|avoidant|disorganized"
    },

    "intervention_progress": {
      "micro_habits_completed": 0,
      "social_activities_weekly": 0,
      "connection_quality_score": 0.0
    }
  }
}
```

---

## 📋 Phase 2-4

```yaml
paths:
  /api/v1/loneliness/assess:
    post:
      summary: 외로움 종합 평가
  /api/v1/loneliness/connection/track:
    post:
      summary: 사회적 연결 추적
  /api/v1/loneliness/micro-habits:
    get:
      summary: 미세습관 추천
```

- 프로토콜: UCLA 척도 + 디지털 표현형 + 바이오마커
- 치료: 미세습관 설계 + 사회 기술 훈련 + 커뮤니티 연결
- 목표: 옥시토신 시스템 정상화, 의미있는 연결 형성

---

**홍익인간 (弘益人間) - Benefit All Humanity**
