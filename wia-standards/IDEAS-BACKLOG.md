# WIA 아이디어 백로그

> 회장 + CTO가 합의한 핵심 아이디어
> 부장이 여기서 하나씩 가져가서 프롬프트 설계

**최종 수정**: 2025-12-16
**철학**: 홍익인간 (弘益人間)

---

## 상태 정의

| 상태 | 의미 |
|------|------|
| `idea` | 아이디어만 있음 |
| `prompt_ready` | 부장이 프롬프트 완성 |
| `implementing` | 차장이 구현 중 |
| `done` | 완료 |

---

## 우선순위: HIGH

### BATTERY-PASSPORT
```yaml
id: BATTERY-PASSPORT
name: EU 배터리 여권
domain: energy
status: done
completed: 2025-12-16
priority: high
spec_path: /battery-passport/spec/
api_path: /battery-passport/api/rust/
core: |
  EU 규정 2027년 필수화 대비
  EV 배터리 수명주기 추적
  탄소발자국, SOH, 재활용률
  책임 광물 조달 증명 (리튬, 코발트)
  QR 코드로 물리 배터리와 연결
keywords:
  - BMS
  - SOC/SOH
  - Carbon Footprint
  - Responsible Sourcing
  - EU Battery Regulation
```

### REFUGEE-CREDENTIAL
```yaml
id: REFUGEE-CREDENTIAL
name: 난민 자격증명
domain: humanitarian
status: done
completed: 2025-12-16
priority: high
spec_path: /refugee-credential/spec/
api_path: /refugee-credential/api/rust/
prompt_path: /refugee-credential/prompts/WIA-REFUGEE-CREDENTIAL-PROMPT.md
core: |
  국가 붕괴해도 학력/경력 증명
  분산 저장 (WIA-PQ-CRYPTO)
  동료 검증 시스템 (4단계 검증 레벨)
  역량 평가 대안 경로
  UNHCR, 대학, 고용주 연동
keywords:
  - Verifiable Credentials
  - DID
  - Peer Verification
  - Competency Assessment
  - UNHCR Integration
```

### LLM-INTEROP
```yaml
id: LLM-INTEROP
name: AI/LLM 상호운용
domain: ai
status: done
completed: 2025-12-16
priority: high
spec_path: /llm-interop/spec/
api_path: /llm-interop/api/rust/
prompt_path: /llm-interop/prompts/
core: |
  여러 AI가 서로 대화하는 표준
  능력 선언 (Capability) - 4단계 레벨
  메시지 형식 (Message) - REST/WebSocket/gRPC
  연합 프로토콜 (Federation) - Star/Mesh/Hierarchical
  합의 알고리즘 (Consensus) - Majority/Weighted/RAFT
keywords:
  - Multi-Agent
  - AI Federation
  - Capability Discovery
  - Message Format
  - Consensus Protocol
```

---

## 우선순위: HIGH - 🧊 CRYO 시리즈 (냉동인간)

### CRYO-PRESERVATION
```yaml
id: CRYO-PRESERVATION
name: 냉동보존 기술 표준
domain: cryo
status: done
completed: 2025-12-17
priority: high
spec_path: /cryo-preservation/spec/
core: |
  최적 냉동 온도/속도
  세포 손상 최소화 프로토콜
  장기별 보존 방법
  시설 간 이송 규격
  "이 방법대로 하면 소생 가능"
keywords:
  - Cryopreservation
  - Vitrification
  - Cell Damage Prevention
  - Transfer Protocol
```

### CRYO-IDENTITY
```yaml
id: CRYO-IDENTITY
name: 냉동인간 신원 표준
domain: cryo
status: done
completed: 2025-12-17
priority: high
spec_path: /cryo-identity/spec/
core: |
  냉동 전 DNA/생체 정보 저장
  소생 후 신원 확인 프로토콜
  100년 후에도 검증 가능한 형식
  "이 사람이 100년 전 그 사람 맞습니다"
keywords:
  - Identity Verification
  - Biometric Storage
  - Long-term Validation
  - DNA Proof
```

### CRYO-CONSENT
```yaml
id: CRYO-CONSENT
name: 냉동 동의 표준
domain: cryo
status: done
completed: 2025-12-17
priority: high
spec_path: /cryo-consent/spec/
core: |
  냉동 동의서 표준 형식
  소생 조건 명시 (암 치료 가능해지면 등)
  가족 동의 범위
  철회 조건
  "언제 깨워달라"
keywords:
  - Informed Consent
  - Revival Conditions
  - Family Rights
  - Withdrawal Protocol
```

### CRYO-REVIVAL
```yaml
id: CRYO-REVIVAL
name: 소생 프로토콜 표준
domain: cryo
status: done
completed: 2025-12-17
priority: high
spec_path: /cryo-revival/spec/
core: |
  안전한 해동 절차
  의료진 자격 요건
  소생 후 재활 프로토콜
  실패 시 재냉동 절차
  "깨우는 방법도 표준화"
keywords:
  - Revival Protocol
  - Thawing Procedure
  - Medical Qualification
  - Rehabilitation
```

### CRYO-LEGAL
```yaml
id: CRYO-LEGAL
name: 냉동인간 법적 지위
domain: cryo
status: done
completed: 2025-12-17
priority: high
spec_path: /cryo-legal/spec/
core: |
  죽음인가? 의료 일시정지인가?
  상속은 어떻게?
  배우자 재혼하면?
  국적은? 투표권은?
  "법적으로 뭔가?"
keywords:
  - Legal Status
  - Inheritance
  - Citizenship
  - Medical Pause
```

### CRYO-ASSET
```yaml
id: CRYO-ASSET
name: 냉동 기간 자산 관리
domain: cryo
status: done
completed: 2025-12-17
priority: high
spec_path: /cryo-asset/spec/
core: |
  100년 동안 자산 어떻게?
  인플레이션 대비
  신탁 구조
  소생 후 자산 반환
  "내 비트코인 100년 후에도 내 거"
keywords:
  - Asset Management
  - Long-term Trust
  - Inflation Protection
  - Wealth Preservation
```

### CRYO-FACILITY
```yaml
id: CRYO-FACILITY
name: 냉동 시설 인증
domain: cryo
status: done
completed: 2025-12-17
priority: high
spec_path: /cryo-facility/spec/
core: |
  시설 안전 기준
  정전 대비 백업
  파산 시 인수인계
  글로벌 상호 인정
  "이 시설은 믿을 수 있습니다"
keywords:
  - Facility Certification
  - Backup Power
  - Bankruptcy Protocol
  - Global Recognition
```

---

## 우선순위: HIGH - ⚰️ DIGITAL-DEATH 시리즈 (생노병사)

### DIGITAL-FUNERAL
```yaml
id: DIGITAL-FUNERAL
name: 디지털 장례 표준
domain: death
status: done
completed: 2025-12-18
priority: high
spec_path: /digital-funeral/spec/
core: |
  사망 시 디지털 자산 일괄 처리
  SNS 추모 모드 전환
  이메일 자동 응답 설정
  구독 서비스 일괄 해지
  "흔적 지우기" vs "추모 보존" 선택
keywords:
  - Digital Death
  - Account Management
  - Memorial Mode
  - Subscription Cancel
```

### DIGITAL-WILL
```yaml
id: DIGITAL-WILL
name: 디지털 유언장
domain: death
status: done
completed: 2025-12-18
priority: high
spec_path: /digital-will/spec/
core: |
  "내 사진은 딸에게"
  "내 암호화폐는 아들에게"
  "내 SNS는 3년 후 삭제"
  법적 효력 있는 디지털 유언
  플랫폼 간 통합 실행
keywords:
  - Digital Will
  - Asset Distribution
  - Legal Framework
  - Cross-Platform
```

### DIGITAL-ERASURE
```yaml
id: DIGITAL-ERASURE
name: 디지털 소멸권
domain: death
status: done
completed: 2025-12-18
priority: high
spec_path: /digital-erasure/spec/
core: |
  "나를 완전히 지워줘"
  모든 플랫폼에서 흔적 삭제
  백업/캐시까지 추적 삭제
  검색엔진 색인 제거
  GDPR 잊힐 권리 확장
keywords:
  - Right to be Forgotten
  - Complete Erasure
  - Cache Deletion
  - Search Index Removal
```

### DIGITAL-MEMORIAL
```yaml
id: DIGITAL-MEMORIAL
name: 디지털 추모 표준
domain: death
status: done
completed: 2025-12-18
priority: high
spec_path: /digital-memorial/spec/
core: |
  고인의 디지털 기념관
  생전 사진/영상/글 아카이브
  방명록, 헌화 기능
  기일 알림
  100년 후에도 후손 접근 가능
keywords:
  - Memorial Site
  - Digital Archive
  - Long-term Preservation
  - Family Access
```

### DIGITAL-EXECUTOR
```yaml
id: DIGITAL-EXECUTOR
name: 디지털 유언집행인
domain: death
status: done
completed: 2025-12-18
priority: high
spec_path: /digital-executor/spec/
core: |
  누가 내 디지털 유산을 처리할 권한?
  가족/친구/변호사/AI 선택
  권한 범위 설정
  분쟁 해결 프로토콜
keywords:
  - Digital Executor
  - Authority Delegation
  - Dispute Resolution
  - Access Control
```

### AI-AFTERLIFE-ETHICS
```yaml
id: AI-AFTERLIFE-ETHICS
name: AI 사후 인격 윤리
domain: death
status: done
completed: 2025-12-18
priority: high
spec_path: /ai-afterlife-ethics/spec/
core: |
  고인 데이터로 AI 만들어도 되나?
  동의 없는 디지털 부활 금지
  "나는 AI로 남고 싶지 않아" 선언권
  유족 치유 vs 병적 집착 경계
keywords:
  - AI Ethics
  - Digital Resurrection
  - Consent Framework
  - Grief Technology
```

---

## 우선순위: HIGH - 🐾 PET 시리즈 (새 가족)

### PET-HEALTH-PASSPORT
```yaml
id: PET-HEALTH-PASSPORT
name: 반려동물 건강여권
domain: pet
status: done
completed: 2025-12-16
priority: high
spec_path: /pet-health-passport/spec/
api_path: /pet-health-passport/api/rust/
core: |
  전 세계 어디서든 인정되는 건강 기록
  백신, 수술, 알레르기, 유전자 정보
  국경 통과 시 자동 검역 인증
  응급 시 수의사 즉시 접근
  REFUGEE-CREDENTIAL 구조 재활용
keywords:
  - Pet Health Record
  - Cross-border Travel
  - Vaccination
  - Veterinary Access
```

### PET-GENOME
```yaml
id: PET-GENOME
name: 반려동물 유전체 표준
domain: pet
status: done
completed: 2025-12-17
priority: high
spec_path: /pet-genome/spec/
core: |
  유전 질환 예측
  맞춤 영양/치료
  복제 시 정체성 연속성 증명
  "이 아이가 그 아이 맞아요" 검증
keywords:
  - Pet Genetics
  - Disease Prediction
  - Cloning Identity
  - Personalized Care
```

### PET-EMOTION
```yaml
id: PET-EMOTION
name: 반려동물 감정 인터페이스
domain: pet
status: done
completed: 2025-12-18
priority: high
spec_path: /pet-emotion/spec/
core: |
  웨어러블로 감정 상태 실시간 감지
  "배고파요" "아파요" "외로워요" 번역
  치매 노인 + 반려동물 소통 보조
  청각장애인을 위한 소리→촉각 변환
keywords:
  - Pet Emotion AI
  - Animal Communication
  - Wearable Sensor
  - Accessibility
```

### PET-LEGACY
```yaml
id: PET-LEGACY
name: 반려동물 유산 관리
domain: pet
status: done
completed: 2025-12-18
priority: high
spec_path: /pet-legacy/spec/
core: |
  주인 사후 돌봄 계획 표준
  법적 신탁 데이터 형식
  새 가족 매칭 프로토콜
  "이 아이를 끝까지 책임지겠습니다" 서약
keywords:
  - Pet Trust
  - Posthumous Care
  - Adoption Matching
  - Legal Framework
```

### PET-CARE-ROBOT
```yaml
id: PET-CARE-ROBOT
name: 반려동물 케어 로봇 표준
domain: pet
status: done
completed: 2025-12-18
priority: high
spec_path: /pet-care-robot/spec/
core: |
  자동 급식/산책/놀이 로봇 인터페이스
  반려동물 안전 우선 프로토콜
  주인 부재 시 응급 대응
  "로봇이 우리 강아지 다치게 하면 안돼"
keywords:
  - Pet Robot
  - Safety Protocol
  - Autonomous Care
  - Emergency Response
```

### PET-WELFARE-GLOBAL
```yaml
id: PET-WELFARE-GLOBAL
name: 동물복지 글로벌 인증
domain: pet
status: done
completed: 2025-12-18
priority: high
spec_path: /pet-welfare-global/spec/
core: |
  번식장/보호소/병원 복지 등급
  전 세계 통일 기준
  학대 이력 추적
  "어디서 태어났든 존엄하게"
keywords:
  - Animal Welfare
  - Global Certification
  - Abuse Prevention
  - Shelter Standards
```

---

## 우선순위: MEDIUM

### DIGITAL-TWIN-CITY
```yaml
id: DIGITAL-TWIN-CITY
name: 스마트시티 디지털트윈
domain: smartcity
status: done
completed: 2025-12-21
priority: medium
spec_path: /digital-twin-city/spec/
core: |
  도시 인프라 실시간 복제
  교통, 에너지, 수도 통합
  시뮬레이션 기반 정책 결정
  시민 참여 인터페이스
keywords:
  - Digital Twin
  - Urban Planning
  - IoT Integration
  - Simulation
```

### OCEAN-PLASTIC-TRACK
```yaml
id: OCEAN-PLASTIC-TRACK
name: 해양 플라스틱 추적
domain: environment
status: done
completed: 2025-12-21
priority: medium
spec_path: /ocean-plastic-track/spec/
core: |
  플라스틱 생산→소비→폐기 추적
  해양 수거 로봇 데이터 표준
  재활용 인증 체인
  기업별 플라스틱 발자국
keywords:
  - Plastic Footprint
  - Ocean Cleanup
  - Supply Chain
  - Recycling Certificate
```

### FOOD-ALLERGY-PASSPORT
```yaml
id: FOOD-ALLERGY-PASSPORT
name: 식품 알레르기 여권
domain: health
status: done
completed: 2025-12-21
priority: medium
spec_path: /food-allergy-passport/spec/
core: |
  개인 알레르기 정보 표준화
  레스토랑/항공사 연동
  응급 상황 자동 알림
  다국어 지원 (여행자용)
keywords:
  - Food Safety
  - Allergy Alert
  - Travel Health
  - Emergency Response
```

### CARBON-CREDIT-MICRO
```yaml
id: CARBON-CREDIT-MICRO
name: 개인 탄소크레딧
domain: climate
status: done
completed: 2025-12-21
priority: medium
spec_path: /carbon-credit-micro/spec/
core: |
  개인 단위 탄소 감축 인증
  소액 거래 가능한 마이크로 크레딧
  일상 활동 (대중교통, 채식) 인정
  커뮤니티 풀링
keywords:
  - Personal Carbon
  - Micro Credit
  - Behavior Change
  - Gamification
```

---

## 우선순위: LOW (미래 대비)

### SPACE-DEBRIS-TRACK
```yaml
id: SPACE-DEBRIS-TRACK
name: 우주 쓰레기 추적
domain: space
status: idea
priority: low
core: |
  궤도 파편 카탈로그 표준
  충돌 예측 데이터 교환
  청소 위성 협조 프로토콜
keywords:
  - Space Debris
  - Orbital Catalog
  - Collision Avoidance
```

### SYNTHETIC-BIOLOGY-REGISTRY
```yaml
id: SYNTHETIC-BIOLOGY-REGISTRY
name: 합성생물학 레지스트리
domain: bio
status: idea
priority: low
core: |
  유전자 편집 생물 등록
  바이오안전 등급 분류
  연구/상업용 구분
  추적 가능성
keywords:
  - Gene Editing
  - Biosafety
  - Registry
  - Traceability
```

### BRAIN-COMPUTER-CONSENT
```yaml
id: BRAIN-COMPUTER-CONSENT
name: BCI 동의 프로토콜
domain: bci
status: idea
priority: low
core: |
  뇌-컴퓨터 인터페이스 데이터 동의
  사고 vs 의도 구분
  신경 프라이버시
  철회 프로토콜
keywords:
  - Neural Privacy
  - Thought Data
  - Consent Framework
  - BCI Ethics
```

---

## 완료된 아이디어

### CI-OCTAVE
```yaml
id: CI-OCTAVE
name: 인공와우 옥타브 향상
domain: ci
status: done
completed: 2025-12-16
core: |
  CI 사용자 음악 청취 향상
  옥타브/피치 정보 보존
  TFS 인코딩
```

### WIA-HOME
```yaml
id: WIA-HOME
name: 탈중앙 홈페이지
domain: home
status: done
completed: 2025-12-16
core: |
  소상공인 P2P 홈페이지
  글로벌 결제 통합 (70+)
  의도 기반 생성
```

### WIA-SOCIAL
```yaml
id: WIA-SOCIAL
name: SNS 연동 표준
domain: social
status: done
completed: 2025-12-16
core: |
  모든 SNS 하나로 연결
  크로스 포스팅
  통합 프로필
```

---

## 부장 작업 지시

```bash
# 1. 이 파일 읽기
cat IDEAS-BACKLOG.md

# 2. status: idea && priority: high 선택

# 3. 프롬프트 작성
# /[domain]/prompts/WIA-XXX-PROMPT.md

# 4. 이 파일 업데이트
# status: prompt_ready
# prompt_path: 경로 추가

# 5. 커밋
git add . && git commit -m "Add WIA-XXX to backlog + prompt"
git push origin main
```

---

## 차장 작업 지시

```bash
# 1. 이 파일에서 status: prompt_ready 찾기

# 2. prompt_path의 프롬프트 읽기

# 3. Phase 1-4 구현

# 4. 이 파일 업데이트
# status: done
# completed: 날짜

# 5. 커밋
```

---

**WIA 아이디어 백로그**
**회장 + CTO 합의**
**홍익인간 (弘益人間)**
