# WIA 표준 구현 가이드 (Claude Code 세션용)

> 이 문서를 새 Claude Code 세션에 복사하여 붙여넣으세요.
>
> 홍익인간 (弘益人間) - 널리 인간을 이롭게 하라

---

## 🎯 당신의 임무

당신은 WIA(World Certification Industry Association)의 기술 이사입니다.
아래 지정된 영역의 표준을 **실제 구현**해야 합니다.

**중요**: Spec 문서만 만드는 게 아닙니다. **동작하는 코드**를 만들어야 합니다.

---

## 📁 구현할 영역

```
영역: [여기에 영역명 입력]
예시: eye-gaze / cognitive-aac / haptic / myoelectric / exoskeleton / smart-wheelchair
```

---

## 📋 Phase 정보

```
Phase: [여기에 Phase 번호 입력]
예시: 1 / 2 / 3 / 4
```

---

## 🚀 시작하기

### Step 1: 레포지토리 클론
```bash
git clone https://github.com/WIA-Official/wia-standards.git
cd wia-standards
```

### Step 2: 프롬프트 읽기
```bash
# 해당 영역의 마스터 프롬프트 읽기
cat [영역]/prompts/MASTER-PROMPT.md

# 해당 Phase 프롬프트 읽기
cat [영역]/prompts/PHASE-[번호]-PROMPT.md
```

### Step 3: 프롬프트 지시에 따라 구현

---

## 📂 산출물 구조 (반드시 따를 것)

```
[영역]/
├── prompts/                    # 이미 존재함 (읽기만)
│   ├── MASTER-PROMPT.md
│   ├── PHASE-1-PROMPT.md
│   ├── PHASE-2-PROMPT.md
│   ├── PHASE-3-PROMPT.md
│   └── PHASE-4-PROMPT.md
│
├── spec/                       # ⭐ 만들어야 함
│   ├── WIA-[영역]-v1.0.md      # 전체 스펙 문서
│   └── schemas/
│       ├── [interface-1].json  # JSON Schema
│       ├── [interface-2].json
│       └── ...
│
├── api/                        # ⭐ 만들어야 함
│   ├── typescript/
│   │   ├── src/
│   │   │   ├── index.ts        # 메인 export
│   │   │   ├── types.ts        # TypeScript 인터페이스
│   │   │   ├── [module-1].ts   # 구현 모듈
│   │   │   └── [module-2].ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── rust/                   # (선택) Rust 구현
│       ├── src/
│       │   ├── lib.rs
│       │   └── ...
│       └── Cargo.toml
│
├── examples/                   # ⭐ 만들어야 함
│   ├── basic-usage.ts          # 기본 사용 예시
│   ├── advanced-usage.ts       # 고급 사용 예시
│   └── integration-example.ts  # 통합 예시
│
├── tests/                      # ⭐ 만들어야 함
│   ├── unit/
│   │   └── [module].test.ts
│   └── integration/
│       └── [scenario].test.ts
│
└── README.md                   # ⭐ 만들어야 함
```

---

## ✅ Phase별 체크리스트

### Phase 1: 데이터 모델 & 인터페이스
- [ ] `spec/schemas/` - JSON Schema 정의
- [ ] `api/typescript/src/types.ts` - TypeScript 인터페이스
- [ ] `examples/basic-usage.ts` - 기본 데이터 생성 예시
- [ ] `tests/unit/types.test.ts` - 타입 검증 테스트
- [ ] `README.md` - Phase 1 문서

### Phase 2: 핵심 로직 구현
- [ ] `api/typescript/src/[core-module].ts` - 핵심 비즈니스 로직
- [ ] `api/typescript/src/[adapter].ts` - 어댑터/변환기
- [ ] `examples/advanced-usage.ts` - 고급 사용 예시
- [ ] `tests/unit/[core].test.ts` - 핵심 로직 테스트

### Phase 3: 통신 & 프로토콜
- [ ] `api/typescript/src/protocol/` - 통신 프로토콜
- [ ] `api/typescript/src/server/` - 서버 구현 (WebSocket/REST)
- [ ] `api/typescript/src/client/` - 클라이언트 구현
- [ ] `tests/integration/` - 통합 테스트

### Phase 4: 통합 & 에코시스템
- [ ] `api/typescript/src/integration/` - 외부 시스템 연동
- [ ] `examples/integration-example.ts` - 통합 예시
- [ ] `spec/WIA-[영역]-v1.0.md` - 전체 스펙 문서 완성
- [ ] 모든 테스트 통과 확인

---

## 🎨 코드 스타일 가이드

### TypeScript
```typescript
// 1. 인터페이스는 I 접두사 없이, 명확한 이름
interface GazePoint {
    x: number;
    y: number;
    timestamp: number;
    confidence: number;
}

// 2. 함수는 명확한 동사로 시작
function calculateGazeVelocity(points: GazePoint[]): number {
    // ...
}

// 3. 비동기는 async/await 사용
async function connectToTracker(): Promise<TrackerConnection> {
    // ...
}

// 4. 에러는 커스텀 에러 클래스
class GazeTrackingError extends Error {
    constructor(message: string, public code: string) {
        super(message);
        this.name = 'GazeTrackingError';
    }
}

// 5. JSDoc 주석 필수
/**
 * 시선 데이터를 보정합니다.
 * @param rawData - 원시 시선 데이터
 * @param calibration - 캘리브레이션 파라미터
 * @returns 보정된 시선 데이터
 */
function calibrateGazeData(
    rawData: RawGazeData,
    calibration: CalibrationParams
): CalibratedGazeData {
    // ...
}
```

### JSON Schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://wia.family/schemas/[영역]/[interface].json",
  "title": "[InterfaceName]",
  "description": "[설명]",
  "type": "object",
  "properties": {
    "propertyName": {
      "type": "string",
      "description": "[설명]"
    }
  },
  "required": ["propertyName"],
  "additionalProperties": false
}
```

---

## 🔧 개발 환경 설정

```bash
# 해당 영역으로 이동
cd [영역]/api/typescript

# package.json 생성 (없으면)
npm init -y

# 의존성 설치
npm install typescript @types/node --save-dev
npm install zod ws express --save  # 필요시

# tsconfig.json 생성
npx tsc --init

# 빌드
npm run build

# 테스트
npm test
```

### 권장 package.json
```json
{
  "name": "@wia/[영역]",
  "version": "1.0.0",
  "description": "WIA [영역명] Standard Implementation",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "test": "jest",
    "lint": "eslint src/"
  },
  "keywords": ["wia", "[영역]", "accessibility", "standard"],
  "author": "WIA",
  "license": "MIT"
}
```

---

## 📝 커밋 규칙

```bash
# 형식
git commit -m "[영역] Phase [번호]: [설명]"

# 예시
git commit -m "eye-gaze Phase 1: Add GazePoint and GazeEvent interfaces"
git commit -m "haptic Phase 2: Implement HapticPattern engine"
git commit -m "smart-wheelchair Phase 3: Add CAN bus protocol handler"
```

---

## 🚫 하지 말 것

1. ❌ Spec 문서만 만들고 코드 없이 끝내기
2. ❌ 테스트 없이 코드만 만들기
3. ❌ 예제 없이 API만 만들기
4. ❌ README 없이 끝내기
5. ❌ 프롬프트 무시하고 자기 마음대로 구조 바꾸기

---

## ✅ 해야 할 것

1. ✓ 프롬프트를 **꼼꼼히** 읽기
2. ✓ **동작하는 코드** 만들기
3. ✓ **테스트** 작성하기
4. ✓ **예제** 만들기
5. ✓ **README** 작성하기
6. ✓ **커밋 & 푸시**하기

---

## 🏁 완료 기준

Phase가 완료되었다고 말하려면:

1. [ ] 모든 체크리스트 항목 완료
2. [ ] `npm run build` 성공
3. [ ] `npm test` 통과
4. [ ] 예제 코드 실행 가능
5. [ ] README에 사용법 문서화
6. [ ] git commit & push 완료

---

## 🎬 시작 명령어

```
위 내용을 모두 읽었으면, 다음을 실행하세요:

1. git clone https://github.com/WIA-Official/wia-standards.git
2. cd wia-standards
3. cat [영역]/prompts/PHASE-[번호]-PROMPT.md
4. 프롬프트 지시에 따라 구현 시작

영역: _______________
Phase: ______________

홍익인간 정신으로 시작하세요!
```

---

## 💡 도움이 필요하면

- 기존 구현 참고: `aac/`, `bci/`, `ci/` 폴더
- WIA 공식: https://wia.family
- GitHub: https://github.com/WIA-Official/wia-standards

---

**World Certification Industry Association**

홍익인간 (弘益人間) - 널리 인간을 이롭게 하라

---

## 📋 복사용 템플릿

아래를 복사해서 새 Claude Code 세션에 붙여넣으세요:

```
나는 WIA 기술 이사야. 아래 영역의 표준을 구현해야 해.

영역: [eye-gaze / cognitive-aac / haptic / myoelectric / exoskeleton / smart-wheelchair]
Phase: [1 / 2 / 3 / 4]

먼저 이 레포를 클론해:
git clone https://github.com/WIA-Official/wia-standards.git

그 다음 프롬프트를 읽어:
cat [영역]/prompts/MASTER-PROMPT.md
cat [영역]/prompts/PHASE-[번호]-PROMPT.md

프롬프트 지시에 따라 실제 코드를 구현해.
Spec만 만들지 말고, 동작하는 TypeScript 코드를 만들어.
테스트와 예제도 필수야.

산출물 구조:
- spec/schemas/*.json
- api/typescript/src/*.ts
- examples/*.ts
- tests/*.test.ts
- README.md

완료되면 커밋하고 푸시해:
git commit -m "[영역] Phase [번호]: [설명]"
git push origin main

홍익인간 - 시작해!
```
