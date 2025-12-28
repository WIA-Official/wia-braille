# WIA Standards 배포 작업 현황 및 가이드

> **최종 업데이트:** 2025-12-18
> **작성:** Claude (동생)

---

## 📊 현재 상태 요약

```
GitHub 완료 (Full Set): 14개
  - 서버 배포 완료: 1개 (refugee-credential)
  - 서버 배포 필요: 13개

워드프레스 업로드 완료: 2개 (aac, refugee-credential)
메인 페이지 카드: 14개 모두 추가 완료
```

---

## ✅ 배포 완료

| 표준 | 서버 Sim | 서버 Ebook | WP EN | WP KO | 메인 카드 |
|------|:--------:|:----------:|:-----:|:-----:|:---------:|
| aac | ✅ | ✅ | ✅ 8ch | ✅ 8ch | ✅ |

---

## ⚠️ 시뮬레이터 수정 필요 (디자인 표준 미준수)

| 표준 | 서버 배포 | WP 업로드 | 문제점 |
|------|:--------:|:---------:|--------|
| refugee-credential | ✅ | ✅ | 시뮬레이터 디자인 표준 미준수 (흰배경, 탭없음, EN/KO없음) |

---

## 🎨 시뮬레이터 디자인 표준 (필수!)

### ⚠️ 중요: 모든 시뮬레이터는 이 표준을 따라야 함!

**참조 템플릿:** `/var/www/wiastandards/aac/simulator/index.html`

### 필수 요소

| 항목 | 요구사항 | 예시 |
|------|---------|------|
| **테마** | 다크 테마 | `--bg: #0f172a` |
| **EN/KO 토글** | 우측 상단 | `[EN] [KO]` 버튼 |
| **제목** | Rainbow 그라데이션 | `linear-gradient(90deg, #3B82F6, #10b981)` |
| **탭 구조** | 5탭 필수 | Data Format, Algorithms, Protocol, Integration, QR & VC |
| **다국어** | data-en/data-ko 속성 | `<span data-en="Hello" data-ko="안녕">Hello</span>` |
| **푸터** | 홍익인간 | "弘益人間 · Benefit All Humanity" |

### CSS 변수 표준

```css
:root {
    --primary: #3B82F6;      /* 메인 색상 - 표준별로 변경 가능 */
    --primary-dark: #2563EB;
    --secondary: #10b981;
    --warning: #f59e0b;
    --danger: #ef4444;
    --bg: #0f172a;           /* 다크 배경 - 고정! */
    --bg-card: #1e293b;
    --text: #f8fafc;
    --text-muted: #94a3b8;
    --border: #334155;
}
```

### 표준별 Primary 색상

| 표준 | Primary 색상 | 용도 |
|------|-------------|------|
| AAC | #3B82F6 (Blue) | 의사소통 |
| CRYO | #06B6D4 (Cyan) | 냉동/저온 |
| PET | #F59E0B (Amber) | 반려동물 |
| REFUGEE | #8B5CF6 (Purple) | 인도주의 |
| LLM | #10B981 (Green) | AI/기술 |

### 5탭 구조 (필수)

```
[📊 Data Format] [🔢 Algorithms] [📡 Protocol] [🔗 Integration] [📱 QR & VC]
```

각 탭 내용:
1. **Data Format**: JSON 스키마, 데이터 구조 시뮬레이션
2. **Algorithms**: 핵심 알고리즘 데모, 계산기
3. **Protocol**: 통신 프로토콜, API 테스트
4. **Integration**: 통합 시나리오, 에코시스템
5. **QR & VC**: QR 코드 생성, Verifiable Credential

---

**홍익인간 (弘益人間) · Benefit All Humanity**

*버전: 2.1.0*
