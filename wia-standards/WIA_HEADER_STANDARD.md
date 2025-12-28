# WIA 헤더 구조 표준

## 기본 규칙 (확정 - 2025.12.15)

```
┌──────────────────────────────────────────┐
│ [Logo/Title] ←클릭=Home       [← Back]  │
│  좌측: 홈으로                  우측: 뒤로 │
└──────────────────────────────────────────┘
```

## 필수 사항

✅ **좌측: 타이틀/로고**
- 항상 Home 링크로 작동
- 클릭 시 메인 페이지로 이동
- text-decoration: none (밑줄 없음)

✅ **우측: Back 버튼만**
- 뒤로가기 기능만
- javascript:history.back() 사용
- 파란색 테두리 버튼

❌ **금지사항**
- 우측에 Home 버튼 배치 금지
- Standards Hub 같은 추가 버튼 금지
- 좌우 위치 바꾸기 금지

## 적용 사이트
- wiastandards.com/viewer.html ✅
- wia.live/viewer.html ✅
- 앞으로 추가될 모든 사이트 ✅

## 코드 템플릿

```html
<div class="header">
    <h1>
        <a href="https://wiastandards.com">
            <span class="emoji">🤟</span>
            <span class="gradient-text">WIA Spec Viewer</span>
        </a>
    </h1>
    <a href="javascript:history.back()" class="back-btn">← Back</a>
</div>
```

## 변경 이력
- 2025.12.15: 기준 확정 (형 승인)
