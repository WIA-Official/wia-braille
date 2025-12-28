# WIA 표준 생성 명령어

사용자가 입력한 표준명: $ARGUMENTS

---

## ⚠️ 품질 경고 (반드시 읽을 것!)

> **이전 표준들에서 발견된 품질 문제를 방지하기 위해 아래 기준을 반드시 준수하세요!**
> 품질 이슈 목록: `docs/WIA_품질_이슈.md` 참조

### 필수 품질 기준 체크리스트

```
□ index.html          - 랜딩페이지 존재
□ simulator/          - 99개 언어 드롭다운 필수!
□ ebook/en/           - 9개 파일 (index + 8챕터), 각 15KB 이상
□ ebook/ko/           - 9개 파일, 실제 한글 번역 (영어 복붙 절대 금지!)
□ spec/               - 4개 파일 (PHASE-1~4.md), 각 5KB 이상
```

### 절대 하지 말 것
- ❌ KO ebook에 영어 복붙
- ❌ 15KB 미만 챕터 생성
- ❌ Simulator 언어 드롭다운 누락
- ❌ Spec 단일 파일로 생성 (4개 분리 필수!)
- ❌ Landing Ebook 링크를 로컬 경로로 설정

---

## 지시사항

### 1단계: 예정 표준 목록에서 찾기
- `docs/WIA_예정_표준.md` 파일에서 해당 표준명 검색
- 설명과 예정된 기능 확인
- 없으면 사용자에게 간단한 설명 요청

### 2단계: 가이드 및 기존 표준 참조
- `docs/WIA_생성_가이드.md` 패턴 따라 생성
- `docs/WIA_완성_표준.md` 완성 표준 구조 참고
- **⚠️ Ebook은 반드시 `docs/WIA_Ebook_Master_Prompt.md` 참조!**
- 기존 표준 폴더 (예: emotion-ai, cryo-preservation) 참고

### 3단계: 생성할 전체 파일 구조

```
{표준명}/
├── index.html                    # 랜딩페이지 (다크테마, 이모지 애니메이션)
├── simulator/
│   └── index.html                # 시뮬레이터 (5탭 구조)
├── ebook/
│   ├── en/                       # 영문 Ebook (8챕터)
│   │   ├── index.html            # 목차
│   │   ├── chapter-01.html       # Ch1: Introduction
│   │   ├── chapter-02.html       # Ch2: Current Challenges
│   │   ├── chapter-03.html       # Ch3: Standard Overview
│   │   ├── chapter-04.html       # Ch4: Phase 1 - Data Format
│   │   ├── chapter-05.html       # Ch5: Phase 2 - API Interface
│   │   ├── chapter-06.html       # Ch6: Phase 3 - Protocol
│   │   ├── chapter-07.html       # Ch7: Phase 4 - Integration
│   │   └── chapter-08.html       # Ch8: Implementation
│   └── ko/                       # 한글 Ebook (8챕터)
│       ├── index.html            # 목차
│       ├── chapter-01.html       # Ch1: 소개
│       ├── chapter-02.html       # Ch2: 현재 과제
│       ├── chapter-03.html       # Ch3: 표준 개요
│       ├── chapter-04.html       # Ch4: 데이터 형식
│       ├── chapter-05.html       # Ch5: API 인터페이스
│       ├── chapter-06.html       # Ch6: 프로토콜
│       ├── chapter-07.html       # Ch7: 통합
│       └── chapter-08.html       # Ch8: 구현 및 인증
├── spec/
│   ├── PHASE-1-DATA-FORMAT.md    # 데이터 형식 (5KB 이상!)
│   ├── PHASE-2-API-INTERFACE.md  # API 인터페이스 (5KB 이상!)
│   ├── PHASE-3-PROTOCOL.md       # 프로토콜 (5KB 이상!)
│   └── PHASE-4-INTEGRATION.md    # 통합 (5KB 이상!)
├── api/
│   └── typescript/
│       ├── src/
│       │   ├── types.ts          # 타입 정의
│       │   └── index.ts          # SDK 구현
│       └── package.json
├── cli/
│   └── {표준명}.sh               # CLI 도구 (해당되는 경우)
└── README.md                     # 사용 가이드
```

### 4단계: 필수 디자인 표준

#### 공통 CSS 변수 (다크테마 필수!)
```css
:root {
    --primary: #3B82F6;      /* 카테고리별 변경 */
    --primary-dark: #2563EB;
    --secondary: #10b981;
    --bg: #0f172a;           /* ← 고정! 절대 변경 금지 */
    --bg-card: #1e293b;
    --text: #f8fafc;
    --text-muted: #94a3b8;
    --border: #334155;
}
```

#### 카테고리별 Primary 색상
| 카테고리 | Hex | 표준 예시 |
|----------|-----|----------|
| 접근성 | `#3B82F6` | AAC, Braille, BCI |
| AI/로봇 | `#8B5CF6` | AI-Embodiment 시리즈 |
| 환경/기술 | `#10B981` | Climate, LLM |
| 금융/반려동물 | `#F59E0B` | Fintech, PET 시리즈 |
| 우주/첨단 | `#06B6D4` | Space, Nano, CRYO |
| 보안 | `#EF4444` | Security, DPKI |
| 감정AI | `#EC4899` | Emotion-AI |

#### 랜딩페이지 필수 요소
```
□ 다크 테마 (--bg: #0f172a)
□ 파비콘 (<link rel="icon" href="/favicon.ico">)
□ 이모지 pulse 애니메이션
□ EN/KO 토글 + localStorage
□ 弘益人間 히어로 + 푸터
□ 4-Phase 카드 (Data, API, Protocol, Integration)
□ 통계 섹션 (4개)
□ 배지 섹션 (6개)
□ 반응형 CSS
□ 모든 외부 링크 target="_blank"
```

#### 시뮬레이터 5탭 구조 (필수!)
```
Tab 1: 📊 Data Format - 데이터 구조, JSON 스키마
Tab 2: 🔢 Algorithms - 핵심 알고리즘, 계산기
Tab 3: 📡 Protocol - 통신, API 테스트
Tab 4: 🔗 Integration - 통합 시나리오
Tab 5: 🧪 Test - QR코드, 검증, 테스트
```

#### 시뮬레이터 99개 언어 드롭다운 (필수!)
```html
<!-- 참조 템플릿: /aac/simulator/index.html -->
<select id="language-select">
    <option value="en">English</option>
    <option value="ko">한국어</option>
    <option value="ja">日本語</option>
    <option value="zh">中文</option>
    <!-- ... 99개 언어 전체 포함 필수! -->
</select>
```
> ⚠️ 언어 드롭다운 누락 시 품질 검사 실패!

#### 랜딩페이지 Ebook 링크 형식 (필수!)
```html
<!-- 올바른 형식 -->
<a href="https://wiabooks.store/tag/wia-{표준명}/" target="_blank">
    📚 Ebook 보기
</a>

<!-- ❌ 잘못된 형식 (절대 사용 금지!) -->
<a href="ebook/en/index.html">  <!-- 로컬 경로 X -->
```

#### 이모지 애니메이션 CSS
```css
.hero-emoji {
    font-size: 80px;
    margin-bottom: 20px;
    animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.15); }
}
```

### 5단계: Ebook 생성 (⚠️ 핵심!)

> **🚨 반드시 `docs/WIA_Ebook_Master_Prompt.md` 참조!**

#### 품질 기준 (필수!)

| 항목 | 최소 기준 | 권장 기준 |
|------|----------|----------|
| **챕터당 크기** | 15KB | 20-25KB |
| **섹션 수 (h2)** | 6개 | 8-10개 |
| **전체 Ebook** | 120KB | 160-200KB |
| **테이블** | 챕터당 2개 | 3-5개 |
| **코드 블록** | 기술 챕터 2개 | 3-5개 |

#### 8챕터 구조

| Ch | EN 제목 | KO 제목 | 내용 |
|:--:|---------|---------|------|
| 1 | Introduction | 소개 | 정의, 시장, 역사, 활용 사례 |
| 2 | Current Challenges | 현재 과제 | 산업 문제점, 상호운용 이슈 |
| 3 | Standard Overview | 표준 개요 | WIA 아키텍처, 4-Phase |
| 4 | Phase 1: Data Format | 데이터 형식 | JSON 스키마, 타입 정의 |
| 5 | Phase 2: API Interface | API 인터페이스 | REST API, 인증, SDK |
| 6 | Phase 3: Protocol | 프로토콜 | 실시간 스트리밍, 보안 |
| 7 | Phase 4: Integration | 통합 | 시스템 통합, 모니터링 |
| 8 | Implementation | 구현 및 인증 | 체크리스트, WIA 인증 |

#### 각 챕터 필수 섹션 (⚠️ 누락 금지!)

```
□ 8-10개 h2 섹션
□ Chapter Summary (Key Takeaways 5개)
□ Review Questions (6개)
□ Looking Ahead (다음 장 예고)
□ 테이블 2-5개
□ 코드 블록 (기술 챕터)
□ 弘益人間 blockquote (Ch1 또는 Ch7)
```

#### 참조 템플릿 (품질 표준!)
```
emotion-ai/ebook/en/     ← 최고 품질 (832KB, 평균 23KB/챕터)
pet-health-passport/ebook/en/
battery-passport/ebook/en/
```

### 6단계: 핵심 원칙
- 弘益人間 (홍익인간) 철학 반영
- WIA Family 관계 명시 (해당되는 경우)
- 실용적이고 바로 사용 가능한 코드
- 한국어 + 영어 병기
- 모든 외부 링크 `target="_blank"`

### 7단계: 완료 후
1. git commit 및 push
2. `docs/WIA_완성_표준.md` 에 추가
3. 배포 안내 출력:

```
╔══════════════════════════════════════════════════════════════╗
║  📦 WIA-{표준명} 생성 완료!                                  ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  생성된 파일:                                                ║
║  ├── index.html           (랜딩페이지)                       ║
║  ├── simulator/index.html (시뮬레이터 5탭)                   ║
║  ├── ebook/en/            (영문 8챕터, 160KB+)               ║
║  ├── ebook/ko/            (한글 8챕터, 160KB+)               ║
║  ├── spec/                (스펙 문서)                        ║
║  ├── api/typescript/      (SDK)                              ║
║  └── README.md                                               ║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║  ⚠️ Ebook 품질 검증:                                         ║
║  for f in ebook/en/chapter-*.html; do                        ║
║    echo "$f: $(wc -c < $f) bytes"                            ║
║  done                                                        ║
║  → 각 챕터 15KB 이상이어야 함!                               ║
╠══════════════════════════════════════════════════════════════╣
║  다음 단계 (MCP SSH Claude):                                 ║
║  1. 서버 배포: curl로 /var/www/wiastandards/ 다운로드        ║
║  2. 메인페이지: index.html에 카드 추가                       ║
║  3. 서브도메인: Apache 설정                                  ║
║  4. 워드프레스: upload-ebook-v3.sh (body만 업로드)           ║
║  5. ISBN 신청: wiabooks.store/wp-admin → WIA ISBN            ║
╚══════════════════════════════════════════════════════════════╝
```

## 예시

```
/create-standard WIA-BLOCKCHAIN
```

→ WIA-BLOCKCHAIN 전체 생성:
- 랜딩페이지 (index.html)
- 시뮬레이터 (simulator/index.html, 5탭)
- Ebook EN (index.html + 8챕터, **160KB+ 필수**)
- Ebook KO (index.html + 8챕터, **160KB+ 필수**)
- 스펙 문서 (spec/WIA-BLOCKCHAIN-v1.0.md)
- TypeScript SDK (api/typescript/)
- CLI (해당시)
- README.md

**총 25+ 파일 자동 생성!**

---

## 🔍 생성 후 품질 검증 (필수!)

표준 생성 완료 후, 반드시 아래 검증을 수행하세요:

### 자동 검증 스크립트
```bash
# 표준 폴더에서 실행
STANDARD="표준명"

echo "=== 품질 검증: $STANDARD ==="

# 1. Landing 확인
[ -f "index.html" ] && echo "✅ Landing 존재" || echo "❌ Landing 누락!"

# 2. Simulator 확인
[ -f "simulator/index.html" ] && echo "✅ Simulator 존재" || echo "❌ Simulator 누락!"

# 3. Ebook EN 확인 (9개, 각 15KB 이상)
EN_COUNT=$(ls -1 ebook/en/*.html 2>/dev/null | wc -l)
echo "📚 EN Ebook: $EN_COUNT개"
for f in ebook/en/chapter-*.html; do
  SIZE=$(wc -c < "$f" 2>/dev/null || echo 0)
  [ "$SIZE" -lt 15000 ] && echo "⚠️ $f: ${SIZE}B (15KB 미만!)"
done

# 4. Ebook KO 확인 (9개, 각 15KB 이상, 한글 확인)
KO_COUNT=$(ls -1 ebook/ko/*.html 2>/dev/null | wc -l)
echo "📚 KO Ebook: $KO_COUNT개"
for f in ebook/ko/chapter-*.html; do
  SIZE=$(wc -c < "$f" 2>/dev/null || echo 0)
  [ "$SIZE" -lt 15000 ] && echo "⚠️ $f: ${SIZE}B (15KB 미만!)"
  # 한글 포함 확인
  grep -q "[가-힣]" "$f" || echo "❌ $f: 한글 없음! (영어 복붙 의심)"
done

# 5. Spec 확인 (4개, 각 5KB 이상)
SPEC_COUNT=$(ls -1 spec/PHASE-*.md 2>/dev/null | wc -l)
echo "📋 Spec: $SPEC_COUNT개"
for f in spec/PHASE-*.md; do
  SIZE=$(wc -c < "$f" 2>/dev/null || echo 0)
  [ "$SIZE" -lt 5000 ] && echo "⚠️ $f: ${SIZE}B (5KB 미만!)"
done

# 6. Simulator 99언어 확인
LANG_COUNT=$(grep -c "<option" simulator/index.html 2>/dev/null || echo 0)
[ "$LANG_COUNT" -ge 99 ] && echo "✅ 언어: ${LANG_COUNT}개" || echo "❌ 언어: ${LANG_COUNT}개 (99개 미만!)"

echo "=== 검증 완료 ==="
```

### 품질 기준 요약

| 항목 | 최소 기준 | 확인 방법 |
|------|----------|----------|
| Landing | 존재 | `index.html` |
| Simulator | 99개 언어 | `grep -c "<option"` |
| EN Ebook | 9개, 각 15KB+ | `wc -c < chapter-*.html` |
| KO Ebook | 9개, 각 15KB+, 한글 | `grep "[가-힣]"` |
| Spec | 4개, 각 5KB+ | `PHASE-1~4.md` |

> ⚠️ 검증 실패 시, 반드시 수정 후 커밋!
> 품질 미달 표준은 `docs/WIA_품질_이슈.md`에 기록됨

---

## 📚 Ebook 상세 가이드

**반드시 참조:** `docs/WIA_Ebook_Master_Prompt.md`

이 문서에 포함된 내용:
- 완전한 HTML 템플릿 (CSS 포함)
- 8챕터별 상세 섹션 구조
- 필수 요소 체크리스트
- 시각적 요소 (테이블, 코드 블록, blockquote)
- ❌ 하지 말 것 목록
- 참조 템플릿 경로
