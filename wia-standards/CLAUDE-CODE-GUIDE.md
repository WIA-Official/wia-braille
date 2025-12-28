# 🤟 WIA Standards - Claude Code 작업 가이드

## 📍 Repository
```
https://github.com/WIA-Official/wia-standards
```

---

## 🚀 카테고리별 시작 프롬프트

### ♿ Accessibility Standards (10개)

```bash
# AAC - 보완대체의사소통 ✅ 완료
cd aac && cat prompts/PHASE-2-RUST-PROMPT.md

# BCI - 뇌컴퓨터인터페이스 ✅ 완료  
cd bci && cat prompts/PHASE-2-RUST-PROMPT.md

# Voice-Sign - 음성수어변환
cd voice && cat prompts/PHASE-1-PROMPT.md

# Auto - 자율주행 접근성
cd auto && cat prompts/PHASE-1-PROMPT.md

# XR - VR/AR 접근성
cd xr && cat prompts/PHASE-1-PROMPT.md

# Smart Home - 스마트홈 접근성
cd smarthome && cat prompts/PHASE-1-PROMPT.md

# Medical - 의료기기 접근성
cd medical && cat prompts/PHASE-1-PROMPT.md

# Game - 게임 접근성
cd game && cat prompts/PHASE-1-PROMPT.md

# Fintech - 금융 접근성
cd fintech && cat prompts/PHASE-1-PROMPT.md

# Education - 교육 접근성
cd edu && cat prompts/PHASE-1-PROMPT.md

# Robot - 로보틱스 접근성
cd robot && cat prompts/PHASE-1-PROMPT.md
```

### 🔬 Future Technology Standards (11개)

```bash
# Quantum - 양자기술
cd quantum && cat prompts/PHASE-1-PROMPT.md

# Bio - 생명공학
cd bio && cat prompts/PHASE-1-PROMPT.md

# AI - 인공지능
cd ai && cat prompts/PHASE-1-PROMPT.md

# Material - 신소재
cd material && cat prompts/PHASE-1-PROMPT.md

# Physics - 물리학기술
cd physics && cat prompts/PHASE-1-PROMPT.md

# Space - 우주기술
cd space && cat prompts/PHASE-1-PROMPT.md

# Climate - 기후기술
cd climate && cat prompts/PHASE-1-PROMPT.md

# Health - 건강기술
cd health && cat prompts/PHASE-1-PROMPT.md

# Nano - 나노기술
cd nano && cat prompts/PHASE-1-PROMPT.md

# Security - 보안기술
cd security && cat prompts/PHASE-1-PROMPT.md
```

---

## 📋 Phase별 작업 순서

```
Phase 1: PHASE-1-PROMPT.md → Research + Data Format
Phase 2: PHASE-2-RUST-PROMPT.md → Rust API 구현
Phase 3: PHASE-3-PROMPT.md → Protocol 정의
Phase 4: PHASE-4-PROMPT.md → Ecosystem Integration
```

---

## 🔧 Claude Code 명령어

```bash
# 1. 저장소 클론
git clone https://github.com/WIA-Official/wia-standards.git
cd wia-standards

# 2. 카테고리 선택 후 프롬프트 읽기
cd quantum
cat prompts/PHASE-1-PROMPT.md

# 3. Claude에게 지시
"위 프롬프트 읽고 Phase 1 시작해"

# 4. 완료 후 다음 Phase
cat prompts/PHASE-2-RUST-PROMPT.md
"위 프롬프트 읽고 Rust API 만들어"
```

---

## 🌐 배포 가이드

### 개별 사이트 (*.wia.live)

```bash
# CQM 서버 접속
ssh ec2-user@10.0.2.97

# 완성된 표준 배포
cp -r /tmp/wia-standards/{category}/* /var/www/{category}.wia.live/

# index.html 생성 (Phase 카드 포함)
# 템플릿: /var/www/bci.wia.live/index.html 참고
```

### CSS 이모지 분리 패턴 (필수!)

```html
<!-- ✅ 올바른 방식 -->
<h1>
    <span class="emoji">🧠</span>
    <span class="gradient-text">WIA BCI</span>
</h1>
```

```css
.emoji {
    background: none !important;
    -webkit-background-clip: initial !important;
    -webkit-text-fill-color: initial !important;
}
.gradient-text {
    background: linear-gradient(90deg, #00d4ff, #7b2cbf);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
```

---

## 📊 현재 진행 상황

| 카테고리 | Phase 1 | Phase 2 | Phase 3 | Phase 4 | 배포 |
|:-------:|:-------:|:-------:|:-------:|:-------:|:----:|
| AAC | ✅ | ✅ | ✅ | ✅ | ✅ |
| BCI | ✅ | ✅ | ✅ | ✅ | ✅ |
| ISP | ✅ | ✅ | ✅ | ✅ | ✅ |
| Talk | ✅ | ✅ | ✅ | ✅ | ✅ |
| Braille | ✅ | ✅ | ✅ | ✅ | ✅ |
| voice | 🔄 | - | - | - | - |
| quantum | 🔄 | - | - | - | - |
| ... | ... | ... | ... | ... | ... |

---

## 🔗 주요 URL

- **GitHub**: https://github.com/WIA-Official/wia-standards
- **WIA Family**: https://wia.family
- **Standards Hub**: https://wia.live/standards
- **AAC**: https://aac.wia.live
- **BCI**: https://bci.wia.live
- **Braille API**: https://braille.wia.live/api-docs.html

---

## ⚠️ 중요 사항

1. **Rust 우선**: Phase 2는 반드시 Rust로 구현
2. **이모지 분리**: CSS에서 이모지와 텍스트 분리 필수
3. **새 탭 링크**: 모든 외부 링크에 `target="_blank"` 추가
4. **MIT 라이선스**: 모든 코드는 MIT 라이선스

---

弘益人間 🤟

**WIA - World Certification Industry Association**
