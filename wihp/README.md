# WIHP - WIA International Hangul Phonology

## 모든 언어를 한글로 읽는다 | 7,000+ Languages → Hangul

**홍익인간 (弘益人間) - Benefit All Humanity**

---

## 개요

**WIHP (WIA International Hangul Phonology, 윕)**는 전 세계 7,000+ 언어의 음소를 한글로 표기하는 국제 표준 체계입니다.

```
IPA (1888):  /həˈloʊ/  → 언어학자만 읽음
WIHP (2025): 헐로우     → 누구나 읽음

한 번 배우면, 모두 읽는다.
```

---

## 디렉토리 구조

```
wihp/
├── README.md          ← 현재 문서
├── core/              ← 핵심 검증 문서
│   ├── README.md
│   └── korean-kor.md  ← WIHP 기준점 (한글 왕복 검증)
├── tier1/             ← 주요 언어 (예정)
├── tier2/             ← 확장 언어 (예정)
└── tier3/             ← 희귀 언어 (예정)
```

---

## WIHP 3대 자질

```
음소 = PL (조음 위치) + MN (조음 방법) + AR (기류 특성)

예시:
/p/ = PL01-MN01-AR01 → ㅂ (평음)
/pʰ/ = PL01-MN01-AR02 → ㅍ (격음)
/p͈/ = PL01-MN01-AR03 → ㅃ (경음)
```

### PL: Place of Articulation (조음 위치)
- PL01: 양순음 (Bilabial)
- PL04: 치조음 (Alveolar)
- PL08: 연구개음 (Velar)
- ... (총 11개)

### MN: Manner of Articulation (조음 방법)
- MN01: 파열음 (Plosive)
- MN02: 비음 (Nasal)
- MN05: 마찰음 (Fricative)
- ... (총 8개)

### AR: Airstream (기류 특성)
- AR01: 평음 (Plain)
- AR02: 격음 (Aspirated)
- AR03: 경음 (Tense)
- AR04: 유성음 (Voiced)
- ... (총 7개)

---

## WIA 생태계

| 체계 | 대상 | 원리 | 상태 |
|------|------|------|------|
| **WIA Braille** | 시각장애인 | IPA → 점자 | ✅ 완성 |
| **ISP** | 청각장애인 | 수어 → 5대 컴포넌트 | ✅ 완성 |
| **WIHP** | 전 인류 | IPA → 한글 | 🔄 진행 중 |

---

## Tier 구분

| Tier | 언어 수 | 설명 | 상태 |
|------|---------|------|------|
| Core | 1 | 한국어 (기준점) | ✅ 완성 |
| Tier 1 | 10-50 | 주요 세계 언어 | 📋 예정 |
| Tier 2 | 200 | 주요 지역 언어 | 📋 예정 |
| Tier 3 | 500+ | 희귀/원주민 언어 | 📋 예정 |

---

## 철학

```
세종대왕 (1443): 한글 → 한국어 보편적 읽기
연삼흠 (2025): WIHP → 전 인류 언어 보편적 읽기

600년의 완성.
```

---

© 2025 SmileStory Inc. / WIA - MIT License
