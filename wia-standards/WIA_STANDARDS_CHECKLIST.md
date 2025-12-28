# WIA 표준 문서 체크리스트

## 확정 기준 (2025.12.15)

### 1. Authors 필드
```markdown
❌ **Authors**: Claude Code (Opus 4.5)
✅ **Authors**: Yeon Sam-Heum, Ph.D.
```

**적용:**
- 모든 Phase MD 파일
- 모든 Research MD 파일
- 권위 유지 필수

---

### 2. TOC (Table of Contents) 링크
```markdown
## Table of Contents

1. [Introduction](#introduction)
2. [Architecture](#architecture)
```

**요구사항:**
- 클릭 시 해당 섹션으로 스크롤 이동
- viewer.html에서 marked.js로 자동 ID 생성
- scroll-margin-top으로 헤더 가림 방지

**viewer.html 설정:**
```javascript
marked.use({
    headerIds: true,  // 자동 ID 생성
    mangle: false,    // ID 원본 유지
    gfm: true        // GitHub Markdown
});
```

---

### 3. 헤더 구조
```
┌──────────────────────────────────────────┐
│ [Logo] ←Home                   [← Back]  │
└──────────────────────────────────────────┘
```

---

## 체크리스트

### Material 표준
- [x] PHASE-1-DATA-FORMAT.md Authors 수정
- [x] PHASE-3-PROTOCOL.md Authors 수정  
- [x] PHASE-4-INTEGRATION.md Authors 수정
- [x] RESEARCH-PHASE-1.md Authors 수정
- [x] RESEARCH-PHASE-3.md Authors 수정
- [x] RESEARCH-PHASE-4.md Authors 수정

### AI 표준
- [x] PHASE-1-DATA-FORMAT.md Authors 수정
- [x] PHASE-3-PROTOCOL.md Authors 수정
- [x] PHASE-4-INTEGRATION.md Authors 수정
- [x] RESEARCH-PHASE-1.md Authors 수정
- [x] RESEARCH-PHASE-3.md Authors 수정
- [x] RESEARCH-PHASE-4.md Authors 수정

### Viewer
- [x] viewer.html TOC 링크 작동
- [x] 헤더 구조 표준화
- [x] wiastandards.com 배포
- [x] wia.live 배포

---

## 앞으로 추가될 표준

**동일하게 적용:**
- quantum.wiastandards.com
- physics.wiastandards.com
- climate.wiastandards.com
- health.wiastandards.com
- bio.wiastandards.com
- space.wiastandards.com

**체크 사항:**
1. Authors: Yeon Sam-Heum, Ph.D.
2. TOC 링크 작동 확인
3. 헤더 구조 표준 준수

---

## 변경 이력
- 2025.12.15: 기준 확정 (형 승인)
  - Authors 필드 표준화
  - TOC 링크 기능 구현
  - 헤더 구조 표준화
