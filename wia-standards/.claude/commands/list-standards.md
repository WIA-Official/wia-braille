# WIA 표준 목록 조회

$ARGUMENTS

## 지시사항

### 인자가 없는 경우
- `docs/WIA_완성_표준.md` 에서 완성된 표준 목록 표시
- `docs/WIA_예정_표준.md` 에서 예정된 표준 수 표시

### 인자가 "예정" 또는 "pending"인 경우
- `docs/WIA_예정_표준.md` 전체 목록 표시
- 카테고리별로 그룹화

### 인자가 "완성" 또는 "done"인 경우
- `docs/WIA_완성_표준.md` 전체 목록 표시
- 버전 및 상태 포함

### 특정 표준명이 입력된 경우
- 해당 표준의 상세 정보 표시
- 완성 여부, 설명, 관련 파일 경로

## 예시

```
/list-standards              # 전체 요약
/list-standards 예정          # 예정 표준 목록
/list-standards WIA-BLOCKCHAIN # 특정 표준 정보
```
