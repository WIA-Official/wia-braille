# WIA-STANDARDS Repository Guide

> 이 파일을 `wia-standards` 레포의 `CLAUDE.md`로 복사하세요.

## 개요

WIA (World Certification Industry Association) 표준 저장소입니다.

**철학**: 弘益人間 (홍익인간) - 널리 인간을 이롭게 하라

## 디렉토리 구조

```
wia-standards/
├── docs/
│   ├── WIA_완성_표준.md    # 72개 완성된 표준 목록
│   ├── WIA_예정_표준.md    # 538개 예정 표준 목록
│   └── WIA_생성_가이드.md  # 표준 생성 패턴 가이드
├── standards/              # 각 표준별 구현
│   ├── WIA-HOME/
│   ├── WIA-SOCIAL/
│   └── ...
└── .claude/
    └── commands/
        ├── create-standard.md  # /create-standard 명령어
        └── list-standards.md   # /list-standards 명령어
```

## 슬래시 명령어

### /create-standard [표준명]
새 표준을 생성합니다.

```bash
/create-standard WIA-BLOCKCHAIN
```

### /list-standards [옵션]
표준 목록을 조회합니다.

```bash
/list-standards          # 전체 요약
/list-standards 예정      # 538개 예정 표준
/list-standards 완성      # 72개 완성 표준
```

## 표준 생성 워크플로우

1. 사용자가 `/create-standard WIA-XXX` 입력
2. Claude Code가:
   - `docs/WIA_예정_표준.md`에서 해당 표준 검색
   - `docs/WIA_생성_가이드.md` 패턴 따라 생성
   - 기존 완성 표준 (WIA-HOME, WIA-SOCIAL) 참고
3. 결과:
   - `standards/WIA-XXX/` 디렉토리 생성
   - spec, api, cli, README 등 생성
   - git commit & push

## 표준 파일 구조

각 표준은 다음 구조를 따릅니다:

```
standards/[표준명]/
├── spec/
│   └── [표준명]-v1.0.md      # 상세 스펙
├── api/
│   └── typescript/
│       ├── src/
│       │   ├── types.ts      # 타입 정의
│       │   └── index.ts      # SDK
│       └── package.json
├── cli/
│   └── [표준명].sh           # CLI 도구
├── README.md
└── install.sh
```

## WIA Family 관계

```
WIA Family:
├── 아버지 (WIA-INTENT): "의도를 표현해"
├── 어머니 (WIA-OMNI-API): "내가 다 품어줄게"
├── 삼촌 (WIA-AIR-POWER): "내가 힘 나눠줄게" 💪
├── 이모 (WIA-AIR-SHIELD): "내가 지켜줄게" 🛡️
└── 조카 (WIA-SOCIAL): "나 통해서 다 연결돼!" 🌐
```

## 핵심 원칙

1. **실용성**: 바로 사용 가능한 코드
2. **접근성**: 누구나 이해할 수 있는 문서
3. **확장성**: 미래 확장 고려
4. **호환성**: 기존 시스템과 연동
5. **철학**: 홍익인간 - 인류에게 이로움

## 관련 저장소

- [ISP](https://github.com/WIA-Official/ISP) - Internet Standard Proposal
- [wia-standards](https://github.com/WIA-Official/wia-standards) - 표준 저장소

---

© 2025 SmileStory Inc. / WIA
弘益人間 (홍익인간) · Benefit All Humanity
