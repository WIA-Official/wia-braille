# WIA-ENE-032: 산불 감지 표준 🔥

> **弘益人間 (홍익인간) - 널리 인간을 이롭게 하라**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-1.0-blue.svg)](https://github.com/WIA-Official/wia-standards)
[![Standard](https://img.shields.io/badge/Standard-WIA--ENE--032-red.svg)](https://wia.org/standards/ene-032)

## 개요

WIA-ENE-032 산불 감지 표준은 산림 화재의 조기 감지, 실시간 모니터링, 신속한 대응을 위한 통합 시스템 표준입니다. 본 표준은 위성 관측(MODIS, VIIRS, Sentinel), 지상 센서, AI 분석을 결합하여 산불로 인한 인명 및 재산 피해를 최소화하고 산림 생태계를 보호합니다.

### 주요 기능

- 🛰️ **위성 감지**: MODIS, VIIRS, Sentinel 위성 데이터 실시간 처리
- 🌡️ **열 감지**: 지상 열화상 카메라 및 드론 열화상 감지
- 💨 **연기 감지**: 광학 센서 및 AI 영상 분석 기반 연기 감지
- 🌤️ **기상 모니터링**: 온도, 습도, 풍속, 강수량 실시간 추적
- 💧 **연료 수분**: 고사/생체 연료 수분 측정 및 위험도 평가
- 🔮 **확산 예측**: AI 기반 화재 확산 경로 및 시간 예측
- 🚨 **대피 관리**: 실시간 대피 구역 설정 및 경로 최적화
- 🚁 **자원 추적**: 소방 헬기, 소방차, 인력 실시간 위치 추적
- 📢 **경보 시스템**: 다단계 경보 및 재난문자(CBS) 발송

## 빠른 시작

### 1. 설치

```bash
# 저장소 클론
git clone https://github.com/WIA-Official/wia-standards.git
cd wia-standards/forest-fire-detection

# 의존성 설치
./install.sh
```

### 2. TypeScript SDK 사용

```typescript
import { ForestFireDetectionSDK } from '@wia/ene-032';

const sdk = new ForestFireDetectionSDK({
  apiKey: 'your-api-key',
  endpoint: 'https://api.wia.org/ene-032/v1'
});

// 산불 감지 이벤트 보고
const event = await sdk.reportFireDetection({
  detectionMethod: 'VIIRS',
  confidenceLevel: 95,
  location: {
    latitude: 37.5665,
    longitude: 126.9780,
    elevation: 450,
    address: '강원도 속초시 설악산',
    forestType: '침엽수림',
    administrativeArea: '강원도'
  },
  fireCharacteristics: {
    frp: 125.5,
    brightness: 345.2,
    area: 1500,
    perimeter: 450,
    fireLineIntensity: 3500,
    rateOfSpread: 2.5
  },
  weatherConditions: {
    temperature: 28.5,
    humidity: 25,
    windSpeed: 12.5,
    windDirection: 225,
    precipitation24h: 0
  },
  riskAssessment: {
    dangerLevel: 4,
    fwi: 35.2,
    threatToLife: 'high',
    threatToProperty: 'high',
    evacuationRequired: true
  },
  metadata: {
    satellite: 'NOAA-20',
    sensor: 'VIIRS-I4',
    resolution: 375,
    quality: 'high',
    validated: true
  }
});

console.log('이벤트 ID:', event.data?.eventId);

// 화재 확산 예측
const prediction = await sdk.predictFireSpread(event.data!.eventId, 24);
console.log('24시간 후 예상 면적:', prediction.data?.spreadPrediction.predicted24h, 'm²');

// 대피 구역 조회
const zones = await sdk.getEvacuationZones(event.data!.eventId);
console.log('대피 구역 수:', zones.data?.length);

// 소방 자원 추적
const resources = await sdk.getAvailableResources();
console.log('가용 자원:', resources.data?.length);
```

### 3. CLI 도구 사용

```bash
# 산불 감지 보고
./cli/forest-fire-detection.sh detect 37.5665 126.9780 VIIRS 95

# 진행 중인 산불 목록
./cli/forest-fire-detection.sh list

# 화재 확산 예측
./cli/forest-fire-detection.sh predict FIRE-2025-KR-001234 24

# 산불 위험도 조회
./cli/forest-fire-detection.sh danger "강원도"

# 대피 구역 조회
./cli/forest-fire-detection.sh evacuate FIRE-2025-KR-001234

# 소방 자원 추적
./cli/forest-fire-detection.sh resources track HELI-02

# 화재 경보 발송
./cli/forest-fire-detection.sh alert FIRE-2025-KR-001234 4 "긴급 대피"

# 인증 상태 확인
./cli/forest-fire-detection.sh status
```

### 4. 상세 사양 확인

- **스펙 문서**: [`spec/WIA-ENE-032-v1.0.md`](spec/WIA-ENE-032-v1.0.md)

## 저장소 구조

```
forest-fire-detection/
├── README.md              # 본 문서
├── install.sh             # 설치 스크립트
├── spec/
│   └── WIA-ENE-032-v1.0.md  # 상세 스펙
├── api/
│   └── typescript/
│       ├── src/
│       │   ├── types.ts    # 타입 정의
│       │   └── index.ts    # SDK 구현
│       └── package.json    # npm 패키지 설정
└── cli/
    └── forest-fire-detection.sh  # CLI 도구
```

## 기술 범위

### 위성 감지 시스템

#### MODIS (Terra/Aqua)

- **공간 해상도**: 1km
- **시간 해상도**: 하루 4회
- **열 밴드**: 3.96 μm, 11.03 μm
- **탐지 임계값**: 밝기 온도 > 310K
- **무료 제공**: NASA FIRMS

#### VIIRS (Suomi NPP, NOAA-20/21)

- **공간 해상도**: 375m (I-band), 750m (M-band)
- **시간 해상도**: 하루 2-4회
- **열 밴드**: 3.74 μm, 11.45 μm
- **탐지 임계값**: 밝기 온도 > 325K
- **장점**: MODIS 대비 4배 높은 해상도

#### Sentinel (ESA)

- **Sentinel-2**: 10-60m 해상도, 5일 주기 (광학)
- **Sentinel-3**: 1km 해상도, 1일 주기 (열적외선)
- **활용**: 화재 피해 면적 평가, 식생 지수 모니터링
- **무료 제공**: Copernicus Hub

### 지상 감지 시스템

#### 열화상 카메라

- **탐지 범위**: 5-15km
- **회전 속도**: 360° / 60초
- **온도 범위**: -40°C ~ 500°C
- **해상도**: 640×480 이상
- **AI 필터링**: 동물/차량 오탐지 제거

#### 연기 감지기

- **방식**: 레이저 산란, AI 영상 분석
- **입자 농도 임계값**: 0.05 mg/m³
- **정확도**: 92%+
- **구분**: 구름, 안개, 먼지 자동 필터링

#### 드론 열화상 감지

- **비행 시간**: 30분 이상
- **탑재 센서**: 열화상 + 가시광 카메라
- **전송**: 실시간 5G 영상 스트리밍
- **활용**: 초기 정밀 위치 확인, 잔불 수색

### 기상 모니터링

| 요소 | 단위 | 업데이트 주기 | 영향도 |
|------|------|---------------|--------|
| 온도 | °C | 1분 | 높음 |
| 상대습도 | % | 1분 | 매우 높음 |
| 풍속 | m/s | 1분 | 매우 높음 |
| 풍향 | ° | 1분 | 높음 |
| 강수량 | mm | 1시간 | 높음 |
| 기압 | hPa | 10분 | 보통 |
| 일사량 | W/m² | 1분 | 보통 |

### 연료 수분 측정

#### 고사 연료 수분 (DFMC)

- DFMC < 10%: 극도 위험
- DFMC 10-15%: 높은 위험
- DFMC 15-25%: 보통 위험
- DFMC > 25%: 낮은 위험

#### 생체 연료 수분 (LFMC)

- 봄철 (3-5월): 60-80% (산불 다발)
- 여름철 (6-8월): 80-120%
- 가을철 (9-11월): 70-100%
- 겨울철 (12-2월): 50-70%

## 산불 위험도 분류

| 등급 | 명칭 | 색상 | FWI 범위 | 발화 확률 | 대응 조치 |
|------|------|------|----------|-----------|-----------|
| 1 | 낮음 | 🟢 녹색 | 0-5 | <5% | 정상 감시 |
| 2 | 보통 | 🟡 황색 | 6-12 | 5-15% | 주의 관찰 |
| 3 | 높음 | 🟠 주황 | 13-22 | 15-35% | 경계 태세 |
| 4 | 매우 높음 | 🔴 적색 | 23-38 | 35-60% | 통제 조치 (입산 통제) |
| 5 | 극도 | 🟣 보라 | 39-50+ | >60% | 비상 태세 (산림 폐쇄) |

### 위험도 계산 요소

- **기상 조건 (40%)**: 온도, 습도, 풍속, 강수량
- **연료 상태 (30%)**: 고사/생체 연료 수분, 연료량
- **지형 조건 (20%)**: 경사도, 사면 방향, 고도
- **인간 활동 (10%)**: 활동 빈도, 인구 밀집지 거리

## 화재 확산 예측

### 모델링 기법

#### Rothermel 확산 모델

- 기본 확산 속도 계산
- 풍속, 경사도 영향 반영
- 연료 유형별 파라미터

#### FARSITE 시뮬레이션

- 입력: 지형도, 연료 맵, 기상 예보
- 출력: 시간대별 화재 경계, 화선 강도
- 예측 기간: 72시간

#### AI 기반 예측

- **모델**: ConvLSTM (시공간 데이터)
- **학습 데이터**: 과거 10년 산불 1,000건
- **정확도**: 85% (24시간 예측)

## 대피 구역 관리

| 등급 | 명칭 | 도착 예상 시간 | 조치 |
|------|------|----------------|------|
| RED | 즉시 대피 | 0-2시간 | 강제 대피 명령 |
| ORANGE | 대피 준비 | 2-6시간 | 대피 권고 |
| YELLOW | 주의 | 6-12시간 | 상황 감시 |
| GREEN | 안전 | >12시간 | 정상 활동 |

### 대피 경로 최적화

- **알고리즘**: Dijkstra 최단 경로
- **고려 사항**: 도로 용량, 실시간 교통, 장애인/노약자 우선
- **실시간 업데이트**: 화재 확산에 따른 경로 재계산

## 소방 자원 관리

| 자원 유형 | 전국 수량 | 배치 기준 |
|-----------|-----------|-----------|
| 소방 헬기 | 50대 | 30분 내 도달 |
| 소방차 | 500대 | 20분 내 도달 |
| 소방 인력 | 10,000명 | 권역별 배치 |
| 진화 장비 | - | 전진 기지 비축 |

### 실시간 추적

- **위치 추적**: GPS + 5G
- **상태 보고**: 연료, 물탱크, 인력 현황
- **ETA 계산**: 실시간 교통 반영
- **최적 배치**: AI 기반 자원 배분

## 경보 시스템

| 등급 | 수신 대상 | 발송 채널 | 응답 시간 |
|------|-----------|-----------|-----------|
| Level 1 - 관심 | 관련 기관 | 이메일 | 1시간 |
| Level 2 - 주의 | 지역 소방서 | SMS + 이메일 | 30분 |
| Level 3 - 경계 | 전체 소방 | 긴급 문자 + 전화 | 10분 |
| Level 4 - 심각 | 국가 재난망 | 재난 문자 (CBS) | 즉시 |

### 다국어 지원

- 한국어, 영어, 중국어, 일본어
- 자동 번역 API 연동
- 음성 안내 (TTS)

## API 엔드포인트

WIA-ENE-032 표준은 RESTful API 엔드포인트를 정의합니다:

### 화재 감지

- `POST /api/v1/fire/detect` - 화재 감지 이벤트 등록
- `GET /api/v1/fire/{id}` - 화재 정보 조회
- `GET /api/v1/fire/active` - 진행 중 화재 목록
- `GET /api/v1/fire/history` - 화재 이력 조회
- `PUT /api/v1/fire/{id}` - 화재 정보 수정

### 화재 예측

- `POST /api/v1/prediction/spread` - 확산 예측 요청
- `GET /api/v1/prediction/{id}` - 예측 결과 조회
- `GET /api/v1/prediction/latest/{fire_id}` - 최신 예측 조회

### 위험도 평가

- `POST /api/v1/danger/calculate` - 위험도 계산
- `GET /api/v1/danger/region/{region}` - 지역 위험도 조회

### 대피 관리

- `GET /api/v1/evacuation/zones/{fire_id}` - 대피 구역 조회
- `PUT /api/v1/evacuation/zone/{id}` - 구역 상태 수정
- `GET /api/v1/evacuation/routes/{zone_id}` - 대피 경로 조회

### 자원 관리

- `GET /api/v1/resources/available` - 가용 자원 조회
- `POST /api/v1/resources/dispatch` - 자원 출동 지시
- `PUT /api/v1/resources/{id}` - 자원 상태 업데이트
- `GET /api/v1/resources/track/{id}` - 자원 추적

### 경보 시스템

- `POST /api/v1/alert/send` - 경보 발송
- `GET /api/v1/alert/{id}` - 경보 상태 조회
- `GET /api/v1/alert/fire/{fire_id}` - 화재별 경보 조회

## 데이터 포맷 표준

### 화재 감지 이벤트

```json
{
  "eventId": "FIRE-2025-KR-001234",
  "timestamp": "2025-04-15T14:23:00Z",
  "detectionMethod": "VIIRS",
  "confidenceLevel": 95,
  "location": {
    "latitude": 37.5665,
    "longitude": 126.9780,
    "elevation": 450,
    "address": "강원도 속초시 설악산",
    "forestType": "침엽수림",
    "administrativeArea": "강원도"
  },
  "fireCharacteristics": {
    "frp": 125.5,
    "brightness": 345.2,
    "area": 1500,
    "perimeter": 450,
    "fireLineIntensity": 3500,
    "rateOfSpread": 2.5
  },
  "weatherConditions": {
    "temperature": 28.5,
    "humidity": 25,
    "windSpeed": 12.5,
    "windDirection": 225,
    "precipitation24h": 0
  },
  "riskAssessment": {
    "dangerLevel": 4,
    "fwi": 35.2,
    "threatToLife": "high",
    "threatToProperty": "high",
    "evacuationRequired": true
  }
}
```

## 통합 예제

### Python

```python
from wia_ene032 import ForestFireDetectionClient

client = ForestFireDetectionClient(
    api_key='your-api-key',
    endpoint='https://api.wia.org/ene-032/v1'
)

# 화재 감지 보고
event = client.report_fire_detection(
    latitude=37.5665,
    longitude=126.9780,
    detection_method='VIIRS',
    confidence_level=95
)

print(f'이벤트 ID: {event.event_id}')

# 화재 확산 예측
prediction = client.predict_fire_spread(
    fire_event_id=event.event_id,
    forecast_horizon=24
)

print(f'24시간 후 예상 면적: {prediction.spread_prediction.predicted_24h} m²')
```

### REST API (cURL)

```bash
curl -X POST https://api.wia.org/ene-032/v1/fire/detect \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "detectionMethod": "VIIRS",
    "confidenceLevel": 95,
    "location": {
      "latitude": 37.5665,
      "longitude": 126.9780,
      "elevation": 450,
      "address": "강원도 속초시 설악산",
      "forestType": "침엽수림",
      "administrativeArea": "강원도"
    }
  }'
```

## 주요 성과 지표 (KPI)

### 감지 성능

- **평균 탐지 시간**: 10분 이내 (목표)
- **탐지 정확도**: 95% 이상
- **오탐지율**: 5% 미만
- **미탐지율**: 1% 미만

### 예측 성능

- **24시간 예측 정확도**: 85% 이상
- **화재 경계 오차**: ±10% 이내
- **위협 자산 식별율**: 95% 이상

### 대응 성능

- **경보 발송 시간**: 3분 이내
- **자원 출동 시간**: 30분 이내 (헬기), 20분 이내 (소방차)
- **대피 완료율**: 95% 이상

## 인증 요구사항

### Tier 1 (기본)

- 위성 데이터 수신 및 처리
- 기본 경보 발송
- 데이터 정확도 90% 이상

### Tier 2 (고급)

- 다중 센서 융합
- AI 확산 예측
- 실시간 자원 추적
- 데이터 정확도 95% 이상

### Tier 3 (전문)

- 전국 규모 통합 운영
- 국제 협력 체계
- 연구 개발 기능
- 데이터 정확도 98% 이상

### 연간 인증 심사

- 시스템 가동률 99.5% 이상
- 평균 탐지 시간 10분 이내
- 오탐지율 5% 미만
- 미탐지율 1% 미만

## 글로벌 현황

### 주요 산불 사례

- **2019 호주 산불**: 1,860만 헥타르 소실, 34명 사망
- **2020 캘리포니아 산불**: 170만 헥타르 소실, 33명 사망
- **2022 유럽 산불**: 66만 헥타르 소실
- **2023 캐나다 산불**: 1,800만 헥타르 소실 (역대 최대)

### 기술 발전

- **AI 예측**: 정확도 75% (2020) → 85% (2025)
- **위성 해상도**: 1km (MODIS) → 375m (VIIRS) → 10m (Sentinel-2)
- **탐지 시간**: 30분 (2010) → 10분 (2025)
- **자동화율**: 30% (2015) → 80% (2025)

## 기여하기

WIA-ENE-032 표준 개선에 기여해 주세요:

1. **기술 피드백**: GitHub 이슈로 제안사항 제출
2. **사례 연구**: 구현 경험 공유
3. **번역**: 다른 언어로 문서 번역
4. **프로토콜 개선**: 데이터 포맷 또는 API 개선 제안

자세한 내용은 [CONTRIBUTING.md](../CONTRIBUTING.md)를 참조하세요.

## 커뮤니티 및 지원

- **웹사이트**: [wia.org/standards/ene-032](https://wia.org/standards/ene-032)
- **문서**: [docs.wia.org/ene-032](https://docs.wia.org/ene-032)
- **GitHub**: [github.com/WIA-Official/wia-standards](https://github.com/WIA-Official/wia-standards)
- **이메일**: standards@wia.org

## 라이선스

이 표준은 [MIT License](https://opensource.org/licenses/MIT) 하에 배포됩니다.

다음과 같은 자유가 있습니다:
- **공유**: 자료를 복사하고 재배포
- **수정**: 리믹스, 변환 및 빌드
- **상업적 사용**: 상업적 목적으로 사용

단, 다음 조건을 준수해야 합니다:
- **저작자 표시**: WIA에 적절한 크레딧 제공

## 인용

```bibtex
@standard{wia-ene-032,
  title = {WIA-ENE-032: Forest Fire Detection Standard},
  author = {{World Certification Industry Association}},
  year = {2025},
  version = {1.0},
  url = {https://github.com/WIA-Official/wia-standards/forest-fire-detection}
}
```

## 감사의 말

이 표준은 다음 분들의 기여로 개발되었습니다:
- 산림청 및 산불 방지 전문가
- 위성 관측 기관 (NASA, ESA, NOAA)
- 소방청 및 긴급구조대
- AI/ML 연구자
- 환경 과학자
- 기상 전문가
- 재난 관리 전문가

## 관련 표준

- **WIA-ENE-001**: 기후 변화 관리
- **WIA-ENE-017**: 대기질 모니터링
- **WIA-ENE-029**: 생태계 모니터링
- **WIA-ENE-030**: 생물다양성 지수
- **WIA-EMERGENCY**: 긴급 대응 프로토콜

## 변경 이력

### Version 1.0.0 (2025-12-25)

- 초판 발행
- 완전한 문서 패키지
- TypeScript SDK
- CLI 도구
- API 스펙

---

## 弘益人間 (홍익인간) · 널리 인간을 이롭게 하라

WIA-ENE-032 산불 감지 표준은 弘益人間(홍익인간)의 정신을 구현합니다. 첨단 기술과 국제 협력을 통해 산림 화재로부터 인명과 재산을 보호하고, 소중한 자연 생태계를 지켜냅니다.

개방형 표준, 투명한 데이터, 협력적 대응을 통해 산불 감지 및 대응 기술이 인류 전체와 지구 환경의 공동선에 기여하도록 보장합니다.

**함께, 우리는 산불로부터 안전한 세상을 만들어갑니다.**

---

© 2025 SmileStory Inc. / WIA
**弘益人間 (홍익인간) · Benefit All Humanity**
