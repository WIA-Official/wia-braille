# WIA Infrastructure 서버 배포 프롬프트

> **대상**: 로컬 MCP SSH Opus 4.5
> **목적**: WIA Infrastructure Layer (1-6) 서버 배포 및 a11y.wiabooks.store 연동
> **철학**: 홍익인간 (弘益人間) - Benefit All Humanity

---

## 프로젝트 개요

WIA (World Certification Industry Association) 표준 생태계의 공유 인프라 레이어를 배포합니다.
이 인프라는 모든 WIA 표준 (Voice, Auto, CI, Medical, Climate 등)이 공유하는 기반 시스템입니다.

**핵심 연동 대상**: https://a11y.wiabooks.store/ (211개 언어 지원 접근성 시스템, 이미 운영 중)

---

## 아키텍처 전체 그림

```
┌─────────────────────────────────────────────────────────────────┐
│                    WIA Standards Ecosystem                       │
├─────────────────────────────────────────────────────────────────┤
│  [Voice] [Auto] [CI] [Home] [Quantum] [Medical] [Climate] ...   │
│     │       │      │     │       │        │         │           │
│     └───────┴──────┴─────┴───────┴────────┴─────────┘           │
│                            ↓                                     │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │              1. Unified SDK (@anthropic/wia-sdk)            ││
│  │   - 모든 WIA 도메인을 하나의 패키지로 통합                    ││
│  │   - import { voice, auto, ci } from '@anthropic/wia-sdk'    ││
│  └─────────────────────────────────────────────────────────────┘│
│                            ↓                                     │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │         2. Cross-Domain Test Suite                          ││
│  │   - 도메인 간 호환성 테스트                                   ││
│  │   - Voice → Home, CI → Voice 등 통합 검증                    ││
│  └─────────────────────────────────────────────────────────────┘│
│                            ↓                                     │
│  ┌──────────────────────┬──────────────────────────────────────┐│
│  │  3. OpenAPI Generator │  4. WASM Bindings                   ││
│  │  - REST API 문서 생성  │  - 브라우저 지원 (Rust → WASM)       ││
│  │  - Swagger UI 제공    │  - CDN 배포 가능                     ││
│  └──────────────────────┴──────────────────────────────────────┘│
│                            ↓                                     │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │         5. Certification Portal                             ││
│  │   - WIA 인증 발급 시스템                                      ││
│  │   - a11y.wiabooks.store API 연동                             ││
│  │   - 배지: wia-certified, wia-silver, wia-gold, wia-platinum ││
│  └─────────────────────────────────────────────────────────────┘│
│                            ↓                                     │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │         6. Device Simulator                                 ││
│  │   - 가상 디바이스 테스트 환경                                  ││
│  │   - Voice Speaker, Auto Vehicle, CI Implant 등              ││
│  └─────────────────────────────────────────────────────────────┘│
│                            ↓                                     │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │    7. A11Y Dashboard (a11y.wiabooks.store) ← 이미 운영 중!   ││
│  │   - 211개 언어 지원                                          ││
│  │   - 접근성 점수 측정 및 배지 발급                              ││
│  │   - WIA 인증의 핵심 엔진                                      ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

---

## 소스 코드 위치

**GitHub Repository**: https://github.com/WIA-Official/wia-standards

```
infrastructure/
├── README.md                          # 전체 문서
├── 1-unified-sdk/
│   ├── package.json
│   └── src/index.ts                   # 통합 SDK 엔트리포인트
├── 2-cross-domain-test/
│   └── src/index.ts                   # 크로스 도메인 테스트 프레임워크
├── 3-openapi/
│   └── src/generator.ts               # OpenAPI 스펙 생성기
├── 4-wasm/
│   └── src/lib.rs                     # Rust WASM 바인딩
├── 5-certification-portal/
│   ├── package.json
│   └── src/index.ts                   # 인증 포털 (a11y 연동)
└── 6-device-simulator/
    ├── package.json
    └── src/index.ts                   # 디바이스 시뮬레이터
```

---

## 각 컴포넌트 상세 설명

### 1. Unified SDK (`infrastructure/1-unified-sdk/`)

**목적**: 모든 WIA 표준을 하나의 패키지로 통합

**파일**: `src/index.ts`

```typescript
// 사용 예시
import { voice, auto, ci, home, quantum, medical, climate } from '@anthropic/wia-sdk';

// 음성 인텐트 파싱
const intent = voice.parseIntent("음악 틀어줘");

// CI 옥타브 감지
const octave = ci.detectOctave(440.0); // A4 → 4

// 자율주행 V2X 메시지
auto.sendV2XMessage({ type: 'warning', data: {...} });
```

**배포 방법**:
```bash
cd infrastructure/1-unified-sdk
npm install
npm run build
npm publish --access public  # NPM에 배포
```

**도메인 목록** (SDK에 포함):
- `voice`: 음성 인텐트 표준 (WIA-VOICE-INTENT)
- `auto`: 자율주행 표준 (WIA-AUTO)
- `ci`: 인공와우 표준 (WIA-CI) - 옥타브 감지, TFS 인코딩
- `home`: 스마트홈 표준 (WIA-HOME)
- `quantum`: 양자컴퓨팅 표준 (WIA-QUANTUM)
- `medical`: 의료 표준 (WIA-MEDICAL)
- `climate`: 기후 표준 (WIA-CLIMATE)
- `social`: 소셜 표준 (WIA-SOCIAL)
- `refugee`: 난민 신원확인 표준 (WIA-REFUGEE)
- `pet`: 반려동물 표준 (WIA-PET)

---

### 2. Cross-Domain Test Suite (`infrastructure/2-cross-domain-test/`)

**목적**: WIA 표준 간 호환성 검증

**파일**: `src/index.ts`

```typescript
// 사용 예시
import { WIATestSuite, DOMAIN_PAIRS } from '@anthropic/wia-cross-domain-test';

const suite = new WIATestSuite();

// 음성 → 스마트홈 연동 테스트
suite.addDomainPair('voice', 'home');

// CI → 음성 연동 테스트 (인공와우 사용자 음성 인식)
suite.addDomainPair('ci', 'voice');

// 전체 테스트 실행
const results = await suite.runAll();
console.log(results.summary);
```

**테스트 매트릭스**:
```
          voice  auto   ci   home  medical  climate
voice      -      ✓     ✓     ✓      ✓        -
auto       ✓      -     -     ✓      ✓        ✓
ci         ✓      -     -     ✓      ✓        -
home       ✓      ✓     ✓     -      ✓        ✓
medical    ✓      ✓     ✓     ✓      -        -
climate    -      ✓     -     ✓      -        -
```

**배포 방법**:
```bash
cd infrastructure/2-cross-domain-test
npm install
npm run build
npm run test  # 자체 테스트
```

---

### 3. OpenAPI Generator (`infrastructure/3-openapi/`)

**목적**: WIA 표준의 REST API 문서 자동 생성

**파일**: `src/generator.ts`

```typescript
// 사용 예시
import { OpenAPIGenerator, WIA_DOMAINS } from '@anthropic/wia-openapi';

const generator = new OpenAPIGenerator({
  title: 'WIA Standards API',
  version: '1.0.0',
  servers: [
    { url: 'https://api.wia-standards.org', description: 'Production' },
    { url: 'https://a11y.wiabooks.store/api', description: 'A11Y API' }
  ]
});

// 도메인 추가
generator.addDomain('voice');
generator.addDomain('ci');
generator.addDomain('a11y');

// OpenAPI 3.0 스펙 생성
const spec = generator.generate();

// Swagger UI용 JSON 출력
fs.writeFileSync('openapi.json', JSON.stringify(spec, null, 2));
```

**생성되는 엔드포인트 예시**:
```yaml
/voice/intent:
  post:
    summary: 음성 의도 파싱
    requestBody:
      content:
        application/json:
          schema:
            type: object
            properties:
              text: { type: string }
              language: { type: string }

/ci/octave:
  post:
    summary: 주파수 → 옥타브 감지
    requestBody:
      content:
        application/json:
          schema:
            type: object
            properties:
              frequency: { type: number }

/a11y/check:
  post:
    summary: 접근성 체크 (a11y.wiabooks.store 연동)
    requestBody:
      content:
        application/json:
          schema:
            type: object
            properties:
              url: { type: string }
              language: { type: string }
```

**배포 방법**:
```bash
cd infrastructure/3-openapi
npm install
npm run build

# Swagger UI와 함께 배포
npm run generate -- --output ./docs/openapi.json
# docs/openapi.json을 웹서버에서 서빙
```

---

### 4. WASM Bindings (`infrastructure/4-wasm/`)

**목적**: WIA 표준을 브라우저에서 직접 실행

**파일**: `src/lib.rs` (Rust)

```rust
// Rust 소스
#[wasm_bindgen]
pub fn detect_octave(frequency: f64) -> i32 {
    // A4 = 440Hz 기준
    let octave = ((frequency / 440.0).log2() + 4.0).floor() as i32;
    octave.clamp(0, 9)
}

#[wasm_bindgen]
pub fn parse_intent(text: &str) -> JsValue {
    // 음성 의도 파싱
    // ...
}

#[wasm_bindgen]
pub fn check_accessibility(html: &str) -> JsValue {
    // 접근성 체크
    // ...
}
```

**브라우저 사용 예시**:
```html
<script type="module">
import init, { WIA, voice, ci, a11y } from 'https://cdn.wia-standards.org/wasm/wia_wasm.js';

await init();

// 옥타브 감지
const octave = ci.detect_octave(440.0);  // 4
console.log(`A4 = 옥타브 ${octave}`);

// 접근성 체크
const result = a11y.check_element('<img src="test.jpg">');
console.log(result.issues);  // [{code: 'img-alt', message: 'alt 속성 필요'}]
</script>
```

**빌드 및 배포**:
```bash
cd infrastructure/4-wasm

# Rust 및 wasm-pack 설치 필요
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
cargo install wasm-pack

# WASM 빌드
wasm-pack build --target web --out-dir pkg

# CDN에 배포
# pkg/wia_wasm.js, pkg/wia_wasm_bg.wasm을 CDN에 업로드
```

---

### 5. Certification Portal (`infrastructure/5-certification-portal/`)

**목적**: WIA 인증 발급 및 a11y.wiabooks.store 연동

**이것이 핵심 연동 지점입니다!**

**파일**: `src/index.ts`

```typescript
// 인증 등급
enum CertificationLevel {
  CERTIFIED = 'wia-certified',    // 60점 이상
  SILVER = 'wia-silver',          // 75점 이상
  GOLD = 'wia-gold',              // 85점 이상
  PLATINUM = 'wia-platinum',      // 95점 이상
}

// 사용 예시
import { CertificationPortal, CertificationLevel } from '@anthropic/wia-certification-portal';

const portal = new CertificationPortal({
  apiEndpoint: 'https://a11y.wiabooks.store/api',  // ← 형이 만든 시스템!
  language: 'ko'  // 211개 언어 중 선택
});

// 웹사이트 접근성 검사
const result = await portal.checkAccessibility('https://example.com');
console.log(result);
// {
//   url: 'https://example.com',
//   score: 87,
//   level: 'wia-gold',
//   passed: true,
//   issues: [...],
//   checkedAt: '2024-01-15T10:30:00Z',
//   language: 'ko'
// }

// 배지 생성
const badge = await portal.generateBadge('https://example.com', CertificationLevel.GOLD);
console.log(portal.getBadgeHtml(badge));
// <a href="https://a11y.wiabooks.store/verify/wia-gold" target="_blank">
//   <img src="https://a11y.wiabooks.store/badges/wia-gold.svg" alt="WIA Gold Certified" />
// </a>
```

**a11y.wiabooks.store 연동 API**:

```
POST https://a11y.wiabooks.store/api/check
{
  "url": "https://example.com",
  "language": "ko"
}

Response:
{
  "score": 87,
  "level": "wia-gold",
  "issues": [
    { "code": "color-contrast", "severity": "warning", "message": "색상 대비 부족" }
  ]
}
```

```
POST https://a11y.wiabooks.store/api/badge
{
  "url": "https://example.com",
  "level": "wia-gold",
  "language": "ko"
}

Response:
{
  "imageUrl": "https://a11y.wiabooks.store/badges/wia-gold.svg",
  "altText": "WIA Gold 인증",
  "issuedAt": "2024-01-15T10:30:00Z",
  "expiresAt": "2025-01-15T10:30:00Z"
}
```

**지원 언어** (211개):
- 주요: ko, en, ja, zh, es, fr, de, it, pt, ru
- 아시아: hi, bn, vi, th, id, ms, tl, my, km, lo, ne, si, ta, te, kn, ml...
- 유럽: pl, uk, nl, sv, no, da, fi, cs, sk, hu, ro, bg, hr, sr, sl...
- 아프리카: ar, he, am, sw, ha, yo, ig, zu, xh, af, so, rw...
- **수어**: ase (미국), bfi (영국), fsl (프랑스), gsg (독일), jsl (일본), ksl (한국)...

**배포 방법**:
```bash
cd infrastructure/5-certification-portal
npm install
npm run build

# 서버 실행 (Express)
npm run dev  # 개발
npm start    # 프로덕션

# 포트: 3005 (기본)
# 환경변수:
#   A11Y_API_ENDPOINT=https://a11y.wiabooks.store/api
#   PORT=3005
```

---

### 6. Device Simulator (`infrastructure/6-device-simulator/`)

**목적**: 실제 기기 없이 WIA 표준 테스트

**파일**: `src/index.ts`

```typescript
// 지원 디바이스 타입
type DeviceType =
  | 'voice-speaker'      // 스마트 스피커
  | 'voice-assistant'    // 음성 어시스턴트
  | 'auto-vehicle'       // 자율주행차
  | 'auto-v2x'           // V2X 통신 장치
  | 'ci-implant'         // 인공와우 임플란트
  | 'ci-processor'       // 인공와우 프로세서
  | 'home-hub'           // 스마트홈 허브
  | 'home-sensor'        // 스마트홈 센서
  | 'climate-sensor'     // 환경 센서
  | 'medical-monitor';   // 의료 모니터

// 사용 예시
import { createSimulator, MultiDeviceSimulator } from '@anthropic/wia-device-simulator';

// CI 프로세서 시뮬레이터
const ciDevice = createSimulator('ci-processor');
ciDevice.on('update', (state) => {
  console.log('현재 옥타브:', state.data.currentOctave);
  console.log('주파수:', state.data.frequency);
  console.log('활성 채널:', state.data.activeChannels);
  console.log('음악 모드:', state.data.musicMode);
});
ciDevice.start();

// 멀티 디바이스 시뮬레이션
const multi = new MultiDeviceSimulator();
multi.addDevice('voice-speaker');
multi.addDevice('auto-vehicle');
multi.addDevice('ci-implant');
multi.addDevice('home-hub');
multi.addDevice('climate-sensor');

multi.on('deviceUpdate', (state) => {
  console.log(`[${state.type}] 업데이트:`, state.data);
});

multi.startAll();
```

**CI 시뮬레이터 출력 예시**:
```json
{
  "id": "ci-processor-1705312345678",
  "type": "ci-processor",
  "status": "online",
  "battery": 87.5,
  "signal": 92.3,
  "lastUpdate": "2024-01-15T10:30:00Z",
  "data": {
    "currentOctave": 4,
    "frequency": 445.2,
    "tfsEnabled": true,
    "electrodeChannels": 22,
    "activeChannels": 18,
    "musicMode": true,
    "speechEnhancement": true
  }
}
```

**배포 방법**:
```bash
cd infrastructure/6-device-simulator
npm install
npm run build

# CLI로 실행
npm run simulate -- --device ci-processor --duration 60

# 프로그래매틱 사용
npm start
```

---

## 서버 배포 가이드

### 사전 요구사항

```bash
# Node.js 18+
node --version  # v18.x 이상

# Rust (WASM용)
rustc --version  # 1.70 이상
cargo --version

# wasm-pack
wasm-pack --version  # 0.12 이상

# PM2 (프로세스 관리)
npm install -g pm2
```

### 전체 배포 스크립트

```bash
#!/bin/bash
# WIA Infrastructure 전체 배포 스크립트

set -e

# 1. 소스 클론
git clone https://github.com/WIA-Official/wia-standards.git
cd wia-standards/infrastructure

# 2. Unified SDK 빌드 및 배포
echo "=== 1. Unified SDK ==="
cd 1-unified-sdk
npm install
npm run build
# npm publish --access public  # NPM 배포시
cd ..

# 3. Cross-Domain Test 빌드
echo "=== 2. Cross-Domain Test ==="
cd 2-cross-domain-test
npm install
npm run build
cd ..

# 4. OpenAPI Generator 빌드
echo "=== 3. OpenAPI Generator ==="
cd 3-openapi
npm install
npm run build
npm run generate -- --output ../docs/openapi.json
cd ..

# 5. WASM 빌드
echo "=== 4. WASM Bindings ==="
cd 4-wasm
wasm-pack build --target web --out-dir pkg
# CDN 업로드: pkg/*.js, pkg/*.wasm
cd ..

# 6. Certification Portal 배포
echo "=== 5. Certification Portal ==="
cd 5-certification-portal
npm install
npm run build
pm2 start npm --name "wia-certification" -- start
cd ..

# 7. Device Simulator 배포
echo "=== 6. Device Simulator ==="
cd 6-device-simulator
npm install
npm run build
pm2 start npm --name "wia-simulator" -- start
cd ..

echo "=== 배포 완료! ==="
pm2 status
```

### Apache 설정 (리버스 프록시)

```apache
# 필요한 모듈 활성화
# sudo a2enmod proxy proxy_http proxy_wstunnel ssl headers rewrite

# ============================================
# /etc/apache2/sites-available/wia-certification.conf
# Certification Portal (a11y.wiabooks.store 연동)
# ============================================
<VirtualHost *:443>
    ServerName cert.wia-standards.org

    SSLEngine on
    SSLCertificateFile /path/to/cert.pem
    SSLCertificateKeyFile /path/to/key.pem

    # Node.js 앱으로 리버스 프록시
    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:3005/
    ProxyPassReverse / http://127.0.0.1:3005/

    # WebSocket 지원 (실시간 업데이트용)
    RewriteEngine On
    RewriteCond %{HTTP:Upgrade} websocket [NC]
    RewriteCond %{HTTP:Connection} upgrade [NC]
    RewriteRule ^/?(.*) ws://127.0.0.1:3005/$1 [P,L]

    # a11y.wiabooks.store API 프록시
    ProxyPass /a11y/ https://a11y.wiabooks.store/
    ProxyPassReverse /a11y/ https://a11y.wiabooks.store/

    # 로그
    ErrorLog ${APACHE_LOG_DIR}/wia-cert-error.log
    CustomLog ${APACHE_LOG_DIR}/wia-cert-access.log combined
</VirtualHost>

# ============================================
# /etc/apache2/sites-available/wia-cdn.conf
# WASM CDN
# ============================================
<VirtualHost *:443>
    ServerName cdn.wia-standards.org

    SSLEngine on
    SSLCertificateFile /path/to/cert.pem
    SSLCertificateKeyFile /path/to/key.pem

    DocumentRoot /var/www/wia-wasm

    <Directory /var/www/wia-wasm>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # WASM 파일 CORS 허용
    <FilesMatch "\.wasm$">
        Header set Access-Control-Allow-Origin "*"
        Header set Content-Type "application/wasm"
    </FilesMatch>

    <FilesMatch "\.js$">
        Header set Access-Control-Allow-Origin "*"
    </FilesMatch>

    ErrorLog ${APACHE_LOG_DIR}/wia-cdn-error.log
    CustomLog ${APACHE_LOG_DIR}/wia-cdn-access.log combined
</VirtualHost>

# ============================================
# /etc/apache2/sites-available/wia-api.conf
# OpenAPI / Swagger UI
# ============================================
<VirtualHost *:443>
    ServerName api.wia-standards.org

    SSLEngine on
    SSLCertificateFile /path/to/cert.pem
    SSLCertificateKeyFile /path/to/key.pem

    DocumentRoot /var/www/wia-docs

    <Directory /var/www/wia-docs>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # Swagger UI
    DirectoryIndex index.html

    # OpenAPI JSON CORS
    <FilesMatch "openapi\.json$">
        Header set Access-Control-Allow-Origin "*"
        Header set Content-Type "application/json"
    </FilesMatch>

    ErrorLog ${APACHE_LOG_DIR}/wia-api-error.log
    CustomLog ${APACHE_LOG_DIR}/wia-api-access.log combined
</VirtualHost>

# ============================================
# /etc/apache2/sites-available/wia-simulator.conf
# Device Simulator
# ============================================
<VirtualHost *:443>
    ServerName sim.wia-standards.org

    SSLEngine on
    SSLCertificateFile /path/to/cert.pem
    SSLCertificateKeyFile /path/to/key.pem

    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:3006/
    ProxyPassReverse / http://127.0.0.1:3006/

    # WebSocket (실시간 디바이스 상태)
    RewriteEngine On
    RewriteCond %{HTTP:Upgrade} websocket [NC]
    RewriteCond %{HTTP:Connection} upgrade [NC]
    RewriteRule ^/?(.*) ws://127.0.0.1:3006/$1 [P,L]

    ErrorLog ${APACHE_LOG_DIR}/wia-sim-error.log
    CustomLog ${APACHE_LOG_DIR}/wia-sim-access.log combined
</VirtualHost>
```

**Apache 설정 적용**:
```bash
# 모듈 활성화
sudo a2enmod proxy proxy_http proxy_wstunnel ssl headers rewrite

# 사이트 활성화
sudo a2ensite wia-certification.conf
sudo a2ensite wia-cdn.conf
sudo a2ensite wia-api.conf
sudo a2ensite wia-simulator.conf

# 설정 테스트
sudo apache2ctl configtest

# Apache 재시작
sudo systemctl restart apache2
```

### Docker Compose (선택)

```yaml
# docker-compose.yml
version: '3.8'

services:
  certification-portal:
    build: ./5-certification-portal
    ports:
      - "3005:3005"
    environment:
      - A11Y_API_ENDPOINT=https://a11y.wiabooks.store/api
      - NODE_ENV=production
    restart: always

  device-simulator:
    build: ./6-device-simulator
    ports:
      - "3006:3006"
    environment:
      - NODE_ENV=production
    restart: always

  swagger-ui:
    image: swaggerapi/swagger-ui
    ports:
      - "8080:8080"
    environment:
      - SWAGGER_JSON=/openapi/openapi.json
    volumes:
      - ./docs:/openapi
    restart: always
```

---

## a11y.wiabooks.store 연동 상세

### 현재 상태

- **URL**: https://a11y.wiabooks.store/
- **상태**: 운영 중 (Production)
- **언어**: 211개 지원
- **배지**: wia-certified, wia-silver, wia-gold

### 연동 포인트

```
┌─────────────────────────────────────────────────────────┐
│                 Certification Portal                     │
│                  (새로 배포할 서비스)                      │
└───────────────────────┬─────────────────────────────────┘
                        │
                        │ REST API 호출
                        ▼
┌─────────────────────────────────────────────────────────┐
│              a11y.wiabooks.store                        │
│                  (이미 운영 중!)                          │
│                                                         │
│  /api/check     - 접근성 검사                            │
│  /api/badge     - 배지 생성                              │
│  /api/languages - 지원 언어 목록                         │
│  /badges/*.svg  - 배지 이미지                            │
│                                                         │
│  211개 언어 지원                                         │
│  - 한국어, 영어, 일본어, 중국어...                        │
│  - 수어: ASL, BSL, FSL, JSL, KSL...                     │
└─────────────────────────────────────────────────────────┘
```

### API 연동 코드

```typescript
// Certification Portal이 a11y.wiabooks.store를 호출하는 방식

class CertificationPortal {
  private apiEndpoint = 'https://a11y.wiabooks.store/api';

  async checkAccessibility(url: string): Promise<CertificationResult> {
    const response = await fetch(`${this.apiEndpoint}/check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url,
        language: this.language  // 211개 중 선택
      })
    });
    return response.json();
  }

  async generateBadge(url: string, level: CertificationLevel): Promise<Badge> {
    const response = await fetch(`${this.apiEndpoint}/badge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url,
        level,
        language: this.language
      })
    });
    return response.json();
  }
}
```

---

## 환경 변수

```bash
# .env

# Certification Portal
A11Y_API_ENDPOINT=https://a11y.wiabooks.store/api
CERTIFICATION_PORT=3005

# Device Simulator
SIMULATOR_PORT=3006
SIMULATOR_UPDATE_INTERVAL=1000

# OpenAPI
OPENAPI_TITLE="WIA Standards API"
OPENAPI_VERSION="1.0.0"

# General
NODE_ENV=production
LOG_LEVEL=info
```

---

## 테스트 방법

### 1. Certification Portal 테스트

```bash
# 접근성 체크 API
curl -X POST https://cert.wia-standards.org/check \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com", "language": "ko"}'

# 응답 예시
{
  "score": 85,
  "level": "wia-gold",
  "issues": [...],
  "passed": true
}
```

### 2. Device Simulator 테스트

```bash
# CI 디바이스 시뮬레이션
curl https://sim.wia-standards.org/devices/ci-processor/start

# 상태 확인
curl https://sim.wia-standards.org/devices/ci-processor/state
```

### 3. WASM 테스트 (브라우저)

```html
<!DOCTYPE html>
<html>
<head>
  <title>WIA WASM Test</title>
</head>
<body>
  <script type="module">
    import init, { ci } from 'https://cdn.wia-standards.org/wasm/wia_wasm.js';

    await init();

    // 옥타브 감지 테스트
    console.log('A4 (440Hz) =', ci.detect_octave(440.0));  // 4
    console.log('A5 (880Hz) =', ci.detect_octave(880.0));  // 5
    console.log('A3 (220Hz) =', ci.detect_octave(220.0));  // 3
  </script>
</body>
</html>
```

---

## 모니터링

```bash
# PM2 상태
pm2 status

# 로그 확인
pm2 logs wia-certification
pm2 logs wia-simulator

# 메트릭
pm2 monit
```

---

## 요약

| 컴포넌트 | 포트 | URL | 상태 |
|----------|------|-----|------|
| 1. Unified SDK | - | NPM 패키지 | 빌드 필요 |
| 2. Cross-Domain Test | - | NPM 패키지 | 빌드 필요 |
| 3. OpenAPI | 8080 | api.wia-standards.org | 배포 필요 |
| 4. WASM | - | cdn.wia-standards.org | 빌드/CDN 필요 |
| 5. Certification Portal | 3005 | cert.wia-standards.org | 배포 필요 |
| 6. Device Simulator | 3006 | sim.wia-standards.org | 배포 필요 |
| 7. A11Y Dashboard | - | a11y.wiabooks.store | **이미 운영 중!** |

---

## 배포 우선순위

1. **5. Certification Portal** (가장 중요 - a11y.wiabooks.store 연동)
2. **4. WASM** (브라우저 지원)
3. **3. OpenAPI** (API 문서)
4. **6. Device Simulator** (테스트)
5. **1, 2** (SDK, 테스트 - NPM 배포)

---

**철학**: 홍익인간 (弘益人間) - Benefit All Humanity

**WIA**: World Certification Industry Association

211개 언어로 전 세계 모든 사람이 접근 가능한 표준을 만듭니다.
농인 커뮤니티도 소외되지 않도록 수어(ASL, BSL, KSL 등)까지 지원합니다.
