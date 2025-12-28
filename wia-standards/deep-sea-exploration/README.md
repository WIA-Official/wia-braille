# WIA-ENE-040: 심해 탐사 표준 🐙

> **弘益人間 (홍익인간) - 널리 인간을 이롭게 하라**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-1.0-blue.svg)](https://github.com/WIA-Official/wia-standards)
[![Standard](https://img.shields.io/badge/Standard-WIA--ENE--040-red.svg)](https://wia.org/standards/ene-040)

## 개요

WIA-ENE-040 심해 탐사 표준은 해양 심해부(200m 이상 깊이)의 과학적 탐사, 생물다양성 연구, 지질학적 조사, 자원 평가를 위한 국제 표준입니다.

### 주요 기능

- 🚢 **잠수정 운영**: HOV, ROV, AUV, Lander 표준화 관리
- 🌊 **깊이 구역**: Bathyal, Abyssal, Hadal zone 체계적 분류
- 🦑 **생물 다양성**: 심해 생물 관찰, 시료 채취, eDNA 분석
- 🌋 **열수 분출공**: Black smoker, White smoker, Lost City 탐사
- 🗺️ **해저 매핑**: 멀티빔 음향측심, 3D 지형 모델링
- 🔬 **시료 관리**: 생물, 암석, 퇴적물 코어 체계적 보존
- 📊 **데이터 표준**: 탐사 기록, 관찰 데이터, 메타데이터 통합
- 🌍 **국제 협력**: 나고야 의정서, UNCLOS 준수

## 빠른 시작

### 1. 설치

```bash
# 저장소 클론
git clone https://github.com/WIA-Official/wia-standards.git
cd wia-standards/deep-sea-exploration

# 의존성 설치
./install.sh
```

### 2. TypeScript SDK 사용

```typescript
import { DeepSeaExplorationSDK } from '@wia/ene-040';

const sdk = new DeepSeaExplorationSDK({
  apiKey: 'your-api-key',
  endpoint: 'https://api.wia.org/ene-040/v1'
});

// 탐사 목록 조회
const expeditions = await sdk.listExpeditions({
  region: 'Mariana Trench',
  page: 1,
  limit: 10
});

// 잠수 기록 조회
const dive = await sdk.getDive('DIVE-HOV-2025-045');
console.log('Max Depth:', dive.data?.navigation.maxDepth);

// 생물 관찰 제출
await sdk.submitObservation({
  diveId: 'DIVE-ROV-2025-102',
  timestamp: new Date().toISOString(),
  location: {
    latitude: 11.3750,
    longitude: 142.5920,
    depth: 8340,
    depthZone: 'hadopelagic',
    habitat: 'abyssal_plain'
  },
  organism: {
    scientificName: 'Hirondellea gigas',
    commonName: 'Supergiant Amphipod',
    identificationLevel: 'species',
    identifiedBy: 'Dr. Alan Jamieson'
  },
  morphology: {
    length: 34.0,
    color: 'Translucent white',
    notes: 'Scavenging on bait'
  },
  behavior: 'feeding',
  abundance: '15-20 individuals',
  media: [
    { type: 'video', file: 'ROV102_14-35-22.mp4' }
  ]
});

// 열수 분출공 데이터 조회
const vents = await sdk.listVents({
  region: 'East Pacific Rise',
  ventType: 'black_smoker',
  minTemp: 300
});
```

### 3. CLI 도구 사용

```bash
# 탐사 목록 조회
./cli/deep-sea-exploration.sh expeditions list

# 잠수 기록 조회
./cli/deep-sea-exploration.sh dives get DIVE-HOV-2025-045

# 심해대 생물 관찰 조회
./cli/deep-sea-exploration.sh observations list hadopelagic

# 열수 분출공 조회
./cli/deep-sea-exploration.sh vents list "Mid-Atlantic Ridge"

# 통계 조회
./cli/deep-sea-exploration.sh stats

# 검색
./cli/deep-sea-exploration.sh search "Hirondellea gigas"
```

### 4. 상세 사양 확인

- **스펙 문서**: [`spec/WIA-ENE-040-v1.0.md`](spec/WIA-ENE-040-v1.0.md)

## 저장소 구조

```
deep-sea-exploration/
├── README.md              # 본 문서
├── install.sh             # 설치 스크립트
├── spec/
│   └── WIA-ENE-040-v1.0.md  # 상세 스펙
├── api/
│   └── typescript/
│       ├── src/
│       │   ├── types.ts    # 타입 정의
│       │   └── index.ts    # SDK 구현
│       └── package.json    # npm 패키지 설정
└── cli/
    └── deep-sea-exploration.sh  # CLI 도구
```

## 기술 범위

### 깊이 구역 (5단계)

| 구역 | 깊이 범위 | 특징 | 압력 |
|------|----------|------|------|
| **Epipelagic** | 0-200m | 광합성 가능, 높은 생물생산성 | 1-20 atm |
| **Mesopelagic** | 200-1,000m | 박명대, 발광 생물 | 20-100 atm |
| **Bathypelagic** | 1,000-4,000m | 심해대, 완전 암흑 | 100-400 atm |
| **Abyssopelagic** | 4,000-6,000m | 초심해대, 심해 평원 | 400-600 atm |
| **Hadopelagic** | 6,000-11,000m | 해덕대, 해구 | 600-1,100 atm |

### 잠수정 유형

| 유형 | 설명 | 대표 기종 | 최대 수심 |
|------|------|----------|----------|
| **HOV** | 유인 잠수정 | Alvin, Shinkai 6500, Limiting Factor | 6,500-11,000m |
| **ROV** | 원격 조종 무인 잠수정 | Jason, ROPOS, SuBastian | 6,000-11,000m |
| **AUV** | 자율 무인 잠수정 | Sentry, ABE, Hugin | 6,000m |
| **Lander** | 자유낙하 착륙선 | Hadal Lander | 11,000m |
| **Crawler** | 해저면 이동 로봇 | Benthic Crawler | 다양 |

### 주요 탐사 대상

#### 생물 다양성
- **심해 어류**: 초롱아귀, 흑대구, Snailfish
- **갑각류**: 초거대 단각류 (Hirondellea gigas, 30cm+)
- **두족류**: 심해 오징어, 문어
- **저서 생물**: 해삼, 불가사리, 해면동물
- **화학합성 생물**: 관벌레 (Riftia), Yeti Crab, 심해 홍합

#### 지질 구조
- **열수 분출공**: Black Smoker (300-400°C), White Smoker (100-300°C)
- **냉수용출대**: 메탄, 황화수소 분출
- **해저 화산**: 활화산, 해저산 (Seamount)
- **중앙 해령**: 해저 확장 지대
- **해구**: 마리아나 해구 (10,994m), 통가 해구 (10,882m)

### 음향 매핑 시스템

#### Multibeam Echosounder

| 주파수 | 최대 수심 | 해상도 | 용도 |
|--------|----------|-------|------|
| 12 kHz | 11,000m | 50-100m | 전해양 깊이 매핑 |
| 30 kHz | 5,000m | 20-50m | 심해 평원 |
| 100 kHz | 1,000m | 1-5m | 대륙붕, 상세 조사 |
| 400 kHz | 200m | <1m | 천해, 인공 구조물 |

## 데이터 포맷 표준

### 탐사 기본 정보

```json
{
  "expeditionId": "EXP-2025-001",
  "name": "Mariana Trench Deep Dive Expedition",
  "chiefScientist": "Dr. Jane Smith",
  "vessel": {
    "name": "R/V Falkor (too)",
    "operator": "Schmidt Ocean Institute",
    "length": 110.0
  },
  "location": {
    "region": "Mariana Trench",
    "area": "Challenger Deep",
    "coordinates": {
      "latitude": 11.3733,
      "longitude": 142.5917
    }
  },
  "duration": {
    "startDate": "2025-03-01T00:00:00Z",
    "endDate": "2025-03-30T23:59:59Z",
    "daysAtSea": 30
  }
}
```

### 생물 관찰 기록

```json
{
  "observationId": "OBS-2025-001234",
  "diveId": "DIVE-ROV-2025-102",
  "timestamp": "2025-03-20T14:35:22Z",
  "location": {
    "latitude": 11.3750,
    "longitude": 142.5920,
    "depth": 8340,
    "depthZone": "hadopelagic",
    "habitat": "abyssal_plain"
  },
  "organism": {
    "scientificName": "Hirondellea gigas",
    "commonName": "Supergiant Amphipod",
    "identificationLevel": "species"
  },
  "morphology": {
    "length": 34.0,
    "color": "Translucent white"
  },
  "behavior": "feeding",
  "abundance": "15-20 individuals"
}
```

### 열수 분출공 데이터

```json
{
  "ventId": "VENT-EPR-2025-003",
  "ventField": "East Pacific Rise 9°50'N",
  "location": {
    "latitude": 9.8333,
    "longitude": -104.2917,
    "depth": 2520
  },
  "ventType": "black_smoker",
  "structure": {
    "height": 15.5,
    "material": "Sulfide (FeS, CuS, ZnS)"
  },
  "fluidChemistry": {
    "temperature": 365,
    "pH": 3.8,
    "h2s": 6.5,
    "metals": {
      "fe": 120,
      "cu": 45,
      "zn": 78
    }
  }
}
```

## API 엔드포인트

### 탐사 관리

- `GET /api/v1/expeditions` - 탐사 목록 조회
- `GET /api/v1/expeditions/{id}` - 탐사 상세 정보
- `POST /api/v1/expeditions` - 탐사 등록
- `PUT /api/v1/expeditions/{id}` - 탐사 정보 수정

### 잠수 기록

- `GET /api/v1/expeditions/{id}/dives` - 잠수 목록 조회
- `GET /api/v1/dives/{id}` - 잠수 상세 정보
- `POST /api/v1/dives` - 잠수 기록 등록
- `GET /api/v1/dives/{id}/track` - 항적 데이터

### 생물 관찰

- `GET /api/v1/observations` - 관찰 목록 조회
- `GET /api/v1/observations/{id}` - 관찰 상세 정보
- `POST /api/v1/observations` - 관찰 제출
- `GET /api/v1/dives/{id}/observations` - 잠수별 관찰

### 시료 관리

- `GET /api/v1/samples` - 시료 목록 조회
- `GET /api/v1/samples/{id}` - 시료 상세 정보
- `POST /api/v1/samples` - 시료 등록
- `POST /api/v1/samples/{id}/request` - 시료 접근 요청

### 열수 분출공

- `GET /api/v1/vents` - 분출공 목록 조회
- `GET /api/v1/vents/{id}` - 분출공 상세 정보
- `POST /api/v1/vents` - 분출공 등록

### 해저 지형

- `POST /api/v1/bathymetry/upload` - 멀티빔 데이터 업로드
- `GET /api/v1/bathymetry/grid` - 해저 지형 그리드
- `GET /api/v1/bathymetry/{id}/3d-model` - 3D 모델

## 주요 성과 지표 (KPI)

### 탐사 규모

- **전세계 탐사 횟수**: 연간 500+ 탐사
- **잠수 작업**: 연간 5,000+ 잠수
- **새로운 종 발견**: 연간 200+ 종
- **매핑 면적**: 연간 100,000+ km²

### 기술 발전

- **최대 잠수 깊이**: 10,994m (마리아나 해구)
- **HOV 운영 수심**: 11,000m (Limiting Factor, Fendouzhe)
- **멀티빔 해상도**: <1m (천해), 10-50m (심해)
- **시료 압력 유지**: 1,100 atm

### 생물 다양성

- **등록된 심해 종**: 20,000+ 종
- **열수 분출공**: 700+ 곳 발견
- **냉수 용출대**: 200+ 곳
- **eDNA 분석**: 연간 1,000+ 시료

## 사용 예제

### Python

```python
from wia_ene040 import DeepSeaExplorationClient

client = DeepSeaExplorationClient(
    api_key='your-api-key',
    endpoint='https://api.wia.org/ene-040/v1'
)

# 탐사 조회
expedition = client.get_expedition('EXP-2025-001')
print(f'Chief Scientist: {expedition.chief_scientist}')

# 생물 관찰 조회
observations = client.list_observations(depth_zone='hadopelagic')
for obs in observations.items:
    print(f'{obs.organism.scientific_name} at {obs.location.depth}m')
```

### REST API (cURL)

```bash
curl -X GET https://api.wia.org/ene-040/v1/expeditions/EXP-2025-001 \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -H "X-WIA-Standard: ENE-040" \
  -H "X-WIA-Version: 1.0.0"
```

## 글로벌 현황

### 현재 상황 (2024)

- **심해 탐사 선박**: 전 세계 100+ 척
- **운영 중인 HOV**: 15+ 대
- **운영 중인 ROV**: 200+ 대
- **탐사된 심해 면적**: 5% 미만
- **등록된 심해 생물종**: 20,000+ 종
- **발견된 열수 분출공**: 700+ 곳

### 2030 목표

- **심해 매핑**: 심해저 30% 고해상도 매핑 완료
- **새로운 종 발견**: 연간 500+ 종
- **Full-ocean-depth 잠수정**: 10대 이상 운영
- **열수 분출공 모니터링**: 1,000+ 곳
- **eDNA 데이터베이스**: 100,000+ 시료

### 2050 비전

- **심해 전역 매핑**: 100% 고해상도 매핑
- **심해 생물 다양성**: 50,000+ 종 등록
- **지속가능한 심해 자원 개발**
- **심해 생태계 보호 네트워크**
- **국제 심해 연구 협력 체계 완성**

## 기여하기

WIA-ENE-040 표준 개선에 기여해 주세요:

1. **기술 피드백**: GitHub 이슈로 제안사항 제출
2. **탐사 데이터**: 탐사 결과 및 발견 공유
3. **번역**: 다른 언어로 문서 번역
4. **프로토콜 개선**: 데이터 포맷 또는 API 개선 제안

자세한 내용은 [CONTRIBUTING.md](../CONTRIBUTING.md)를 참조하세요.

## 커뮤니티 및 지원

- **웹사이트**: [wia.org/standards/ene-040](https://wia.org/standards/ene-040)
- **문서**: [docs.wia.org/ene-040](https://docs.wia.org/ene-040)
- **GitHub**: [github.com/WIA-Official/wia-standards](https://github.com/WIA-Official/wia-standards)
- **이메일**: standards@wia.org

## 라이선스

이 표준은 [MIT License](https://opensource.org/licenses/MIT) 하에 배포됩니다.

## 인용

```bibtex
@standard{wia-ene-040,
  title = {WIA-ENE-040: Deep Sea Exploration Standard},
  author = {{World Certification Industry Association}},
  year = {2025},
  version = {1.0},
  url = {https://github.com/WIA-Official/wia-standards/deep-sea-exploration}
}
```

## 관련 표준

- **WIA-ENE-031**: 생태계 모니터링
- **WIA-ENE-010**: 수질 모니터링
- **WIA-ENE-003**: 탄소 포집 및 저장
- **WIA-ENE-017**: 기후 변화 관리
- **WIA-BLOCKCHAIN**: 데이터 무결성 및 추적

## 변경 이력

### Version 1.0.0 (2025-12-25)

- 초판 발행
- 완전한 문서 패키지
- TypeScript SDK
- CLI 도구
- API 스펙

---

## 弘益人間 (홍익인간) · 널리 인간을 이롭게 하라

WIA-ENE-040 표준은 弘益人間(홍익인간)의 정신을 구현합니다. 심해는 지구에서 가장 큰 생물권이며, 우리가 아직 탐사하지 못한 마지막 미지의 영역입니다. 과학적 탐사를 통해 심해 생태계를 이해하고, 지속가능하게 보호하며, 미래 세대를 위한 지식을 축적하여 인류와 지구 전체에 이로움을 제공합니다.

**함께, 우리는 심해의 신비를 밝히고 지구의 미래를 지켜갑니다.**

---

© 2025 SmileStory Inc. / WIA
**弘益人間 (홍익인간) · Benefit All Humanity**
