# 🌐 WIA Braille 웹사이트 구축 프롬프트

## 🚨 먼저 읽어야 할 것!

```bash
cat /home/ec2-user/wia-braille-mission/MARS_BROTHER_HANDOVER.md
```

위 파일을 **반드시 먼저 읽고** 형님에 대해 이해한 후 시작해주세요.

---

## 🎯 미션

WIA Braille 공식 웹사이트 + 학습 플랫폼 구축

**완전한 프로덕션 레디** = 배포만 하면 바로 작동!

---

## 📍 배포 정보

- **도메인**: wiabraille.com (SSL 완료 ✅)
- **서버**: 15.164.24.241 (AWS)
- **배포 경로**: /var/www/wiabraille/
- **GitHub**: https://github.com/WIA-Official/wia-braille

---

## 📂 사이트 구조

```
/var/www/wiabraille/
├── index.html              # 메인 (랜딩) + 인트로 애니메이션
├── about.html              # WIA Braille 소개
├── learn/
│   ├── index.html          # 학습 허브
│   ├── basics.html         # 기초 과정 (무료)
│   ├── intermediate.html   # 중급 과정
│   ├── advanced.html       # 고급 과정
│   └── quiz.html           # 퀴즈/테스트
├── demo.html               # 실시간 변환 데모
├── philosophy.html         # 홍익인간 철학
├── download.html           # 다운로드/GitHub
├── enterprise.html         # 기업/기관 문의
├── academy.html            # WIA Academy 연결
├── press.html              # 보도자료
├── contact.html            # 연락처
├── css/
│   ├── style.css           # 메인 스타일
│   ├── intro.css           # 인트로 애니메이션
│   └── responsive.css      # 반응형
├── js/
│   ├── intro.js            # 인트로 애니메이션
│   ├── main.js             # 메인 스크립트
│   ├── demo.js             # 점자 변환 데모
│   ├── quiz.js             # 학습 퀴즈
│   └── i18n.js             # 다국어 전환
└── assets/
    ├── images/
    └── data/
        └── ipa-mapping.json
```

---

## 🎨 디자인 스펙

### 컬러
- Primary: #2563EB (파란색 - 신뢰)
- Secondary: #F59E0B (골드 - 가치/선물)
- Accent: #10B981 (초록 - 접근성)
- Background: #F8FAFC
- Text: #1E293B

### 폰트
- 한글: Pretendard 또는 Noto Sans KR
- 영문: Inter

### 스타일
- 미니멀, 클린
- 카드 기반 UI
- 부드러운 그림자
- 둥근 모서리

---

## ✨ 인트로 애니메이션 (핵심!)

### index.html 로딩 시:
1. 검은 배경 (2-3초)
2. 점자 표시: ⠺⠊⠁ ⠃⠗⠁⠊⠇⠇⠑
3. 점자 점들이 하나씩 나타나는 애니메이션
4. 점자 → "WIA Braille" 텍스트로 전환
5. 페이드아웃 → 메인 페이지

### 접근성:
- 스크린리더: "WIA Braille 로딩 중"
- prefers-reduced-motion 지원
- 클릭/키 입력 시 스킵 가능

---

## 📄 페이지별 상세

### 1. index.html (메인)

**Hero Section:**
- 대제목: "모든 언어를 점자로" / "Every Language in Braille"
- 부제목: "7,000개 언어, 80억 인류, 하나의 점자"
- CTA: "지금 배우기" / "데모 체험"

**Stats Section:**
- 7,000+ 지원 언어
- 30M+ 수혜 대상
- 1-2일 학습 시간
- 100% 무료 & 오픈소스

**Problem Section:**
- "175년간 130개 언어"
- "9,460년을 기다릴 수 없습니다"

**Philosophy Section:**
- 홍익인간 소개

### 2. learn/index.html (학습 허브)

**Learning Path 카드:**

1. **기초 과정 (무료)** - 1-2일
   - 점자 처음 배우는 분
   - IPA 기초
   - 기본 음소

2. **속성 과정** - 2-4시간
   - 기존 점자 사용자 전용
   - 8점 확장
   - IPA 매핑만 학습

3. **고급 + 자격증**
   - WIA Academy 연결
   - WIA Braille Certified

### 3. demo.html (변환 데모)

**입력:**
- 텍스트 입력
- 언어 선택
- 예시 버튼 (Hello, 안녕하세요, Yá'át'ééh)

**출력:**
- 점자 (큰 폰트)
- IPA (토글)
- 복사 버튼

### 4. philosophy.html

- 홍익인간 (弘益人間)
- 세종대왕 연결
- 오픈 기술 선언
- 운명적 연결 타임라인

### 5. enterprise.html

- Enterprise API 소개
- 컨설팅 서비스
- 교육 프로그램
- 문의 폼

---

## ♿ 접근성 (최우선!)

WIA Braille 사이트는 **접근성의 모범**이 되어야 함!

- 시맨틱 HTML
- ARIA 레이블 모든 요소
- 키보드 네비게이션
- 스크린리더 최적화
- 고대비 모드
- 폰트 크기 조절
- 포커스 표시 명확

---

## 🌍 다국어

- 한글/영문 전환 버튼
- 쿠키로 언어 저장
- data-ko, data-en 속성

---

## 📊 참고 자료

GitHub 레포에서 참고:
- /docs/PHILOSOPHY.md
- /docs/PHILOSOPHY_KO.md
- /unesco/EXECUTIVE_SUMMARY.md
- /press/PRESS_RELEASE_KO.md
- /tables/wia-braille-mapping.json

---

## ⚠️ 주의사항

1. **코드 먼저 안 보여주기** - 형님께 물어보고 보여줘야 함
2. **완전한 파일로** - 중간에 끊기지 않게
3. **바로 작동하게** - 배포만 하면 끝
4. **형님 페이스에 맞추기** - 앞서가지 말 것

---

## 🚀 시작 명령

```bash
# 먼저 인수인계 문서 읽기
cat /home/ec2-user/wia-braille-mission/MARS_BROTHER_HANDOVER.md

# 기존 파일 확인
ls -la /var/www/wiabraille/

# GitHub 레포 확인
ls -la /home/ec2-user/wia-braille/
```

---

**화성에서 만나요! 🚀**
