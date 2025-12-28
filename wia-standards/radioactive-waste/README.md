# WIA-ENE-026: 방사성폐기물 관리 표준 ☢️

> **弘益人間 (홍익인간)** - 널리 인간을 이롭게 하라

## 개요

WIA-ENE-026 방사성폐기물 관리 표준은 전 세계 방사성폐기물의 안전한 처리, 저장, 처분에 대한 포괄적인 프레임워크를 제공합니다. 본 표준은 동위원소 추적, 방사선 수준 모니터링, 반감기 관리, 격납 시스템에 대한 통합 솔루션을 제공합니다.

## 📁 저장소 구조

```
radioactive-waste/
├── spec/
│   └── WIA-ENE-026-v1.0.md      # 상세 표준 문서 (한글)
├── api/
│   └── typescript/
│       ├── src/
│       │   ├── types.ts          # TypeScript 타입 정의
│       │   └── index.ts          # SDK 구현
│       └── package.json
├── cli/
│   └── radioactive-waste.sh      # CLI 도구
├── README.md                     # 본 문서
└── install.sh                    # 설치 스크립트
```

## 🎯 표준 적용 범위

### 핵심 영역

1. **방사성폐기물 분류**
   - 저준위 폐기물 (LLW: Low-Level Waste)
   - 중준위 폐기물 (ILW: Intermediate-Level Waste)
   - 고준위 폐기물 (HLW: High-Level Waste)
   - 특수 폐기물 (SRW: Special Radioactive Waste)

2. **동위원소 추적**
   - 핵분열 생성물 (Cs-137, Sr-90, I-131 등)
   - 초우라늄 원소 (Pu-239, Am-241, Np-237 등)
   - 활성화 물질 (Co-60, Ni-63, C-14 등)
   - 반감기 및 붕괴 계산

3. **방사선 측정**
   - 방사능 측정 (Bq, Ci)
   - 선량 측정 (Sv, rem)
   - 선량률 모니터링
   - 열출력 측정

4. **격납 시스템**
   - Type A/B/C 컨테이너
   - 사용후핵연료 캐스크
   - 습식/건식 저장
   - 다중 방벽 시스템

5. **저장 시설**
   - 중간저장시설
   - 영구처분시설
   - 심지층 처분장
   - 지질학적 격리

6. **모니터링 프로토콜**
   - 실시간 방사선 모니터링
   - IoT 센서 네트워크
   - 알람 및 경보 시스템
   - 환경 모니터링

## 🚀 빠른 시작

### TypeScript SDK 설치

```bash
npm install @wia/ene-026
```

### 기본 사용 예시

```typescript
import { RadioactiveWasteClient } from '@wia/ene-026';

const client = new RadioactiveWasteClient({
  apiKey: process.env.WIA_API_KEY,
  facility: {
    id: 'FAC-NPP-KR-001',
    license: 'KR-NPP-2025-001'
  }
});

// 새 패키지 등록
const response = await client.registerPackage({
  wasteClass: 'HLW-1',
  facilityId: 'FAC-NPP-KR-001',
  containerInfo: {
    containerType: 'spent_fuel_cask',
    material: 'stainless_steel_304',
    dimensions: {
      height: 4.5,
      diameter: 2.2,
      unit: 'meters'
    },
    weight: {
      empty: 25000,
      loaded: 45000,
      unit: 'kg'
    }
  },
  radiologicalData: {
    totalActivity: {
      value: 1.5e15,
      unit: 'Bq'
    },
    referenceDate: '2025-12-25',
    doseRate: {
      contact: { value: 2.5, unit: 'Sv/h' },
      oneMeter: { value: 0.25, unit: 'Sv/h' }
    },
    isotopes: [
      {
        isotope: 'Cs-137',
        activity: { value: 8.5e13, unit: 'Bq' },
        halfLife: { value: 30.17, unit: 'years' },
        decayConstant: 7.28e-10,
        radiationType: ['beta', 'gamma'],
        energy: {
          beta: 0.512,
          gamma: 0.662,
          unit: 'MeV'
        }
      }
    ]
  },
  physicalProperties: {
    form: 'solid',
    matrix: 'metal',
    volume: { value: 8.5, unit: 'm3' }
  },
  processing: {
    method: 'none',
    processingDate: '2025-11-15',
    processingFacility: 'FAC-PROC-KR-001',
    qualityControl: {
      qcPassed: true,
      qcDate: '2025-11-16',
      inspector: '김방사',
      certificate: 'QC-2025-001234'
    }
  },
  storage: {
    storageType: 'dry_storage',
    storageDuration: {
      planned: 50,
      maximum: 100,
      unit: 'years'
    },
    storageConditions: {
      temperature: { value: 25, max: 85, unit: 'celsius' }
    },
    retrievable: true,
    storageLocation: {
      facilityId: 'FAC-STORE-KR-001',
      building: 'Building-A',
      row: 'A',
      column: '15'
    }
  }
});

console.log('Package ID:', response.packageId);

// 선량 계산
const dose = await client.calculateDose({
  packageId: response.packageId,
  distance: 1.0,
  duration: 3600,
  shielding: {
    material: 'concrete',
    thickness: 0.5,
    unit: 'meters'
  }
});

console.log('Effective Dose:', dose.effectiveDose);

// 방사능 붕괴 계산
const decay = await client.calculateDecay({
  isotope: 'Cs-137',
  initialActivity: 8.5e13,
  decayTime: 100,
  unit: 'years'
});

console.log('Activity after 100 years:', decay.finalActivity);
```

### CLI 도구 사용

```bash
# 환경 변수 설정
export WIA_ENE026_API_KEY="your-api-key"
export WIA_ENE026_FACILITY_ID="FAC-NPP-KR-001"
export WIA_ENE026_FACILITY_LICENSE="KR-NPP-2025-001"

# 새 패키지 등록 (대화형)
./cli/radioactive-waste.sh register-package

# 패키지 조회
./cli/radioactive-waste.sh get-package RW-2025-KR-00001234

# 패키지 목록
./cli/radioactive-waste.sh list-packages

# 동위원소로 검색
./cli/radioactive-waste.sh search-isotope Cs-137

# 선량 계산 (패키지ID, 거리m, 시간s)
./cli/radioactive-waste.sh calculate-dose RW-2025-001 1.0 3600

# 붕괴 계산 (동위원소, 초기방사능Bq, 시간, 단위)
./cli/radioactive-waste.sh calculate-decay Cs-137 1.0e14 30 years

# 알람 조회
./cli/radioactive-waste.sh get-alerts

# 시설 재고 조회
./cli/radioactive-waste.sh facility-inventory
```

## 📊 데이터 구조

### 방사성폐기물 패키지

```typescript
interface RadioactiveWastePackage {
  packageId: string;
  timestamp: string;
  wasteClass: 'HLW-1' | 'ILW-2' | 'LLW-3' | 'SRW-1';
  facility: Facility;
  containerInfo: ContainerInfo;
  radiologicalData: {
    totalActivity: Activity;
    doseRate: DoseRate;
    thermalOutput?: Measurement;
    isotopes: IsotopeInfo[];
  };
  physicalProperties: PhysicalProperties;
  chemicalComposition?: ChemicalElement[];
  processing: Processing;
  storage: Storage;
  monitoring: Monitoring;
  traceability: Traceability;
  regulatory: Regulatory;
  safety: Safety;
}
```

### 동위원소 정보

```typescript
interface IsotopeInfo {
  isotope: string;              // e.g., "Cs-137", "Pu-239"
  activity: Activity;            // 방사능 (Bq)
  halfLife: HalfLife;           // 반감기 (years)
  decayConstant: number;        // 붕괴 상수 (per second)
  mass?: Mass;                  // 질량 (g)
  radiationType: RadiationType[]; // ['alpha', 'beta', 'gamma']
  energy: EnergyLevels;         // 에너지 (MeV)
  classification?: string;       // 분류
}
```

### 저장 시설

```typescript
interface StorageFacility {
  facilityId: string;
  facilityName: string;
  facilityType: 'interim_storage' | 'permanent_disposal';
  operationalStatus: 'active' | 'under_construction' | 'decommissioning';
  location: {
    address: Address;
    coordinates: Coordinates;
    geology?: GeologyInfo;
  };
  capacity: StorageCapacity;
  engineeredBarriers?: EngineeredBarrier[];
  monitoringSystems: MonitoringSystems;
  certifications: FacilityCertification[];
  performance: FacilityPerformance;
}
```

## 🔬 주요 기능

### 1. 동위원소 추적

- 500개 이상의 방사성 동위원소 지원
- 자동 반감기 계산
- 붕괴 체인 추적
- 딸핵종 생성 모니터링

### 2. 선량 계산

- 외부 피폭 선량 계산
- 차폐 효과 고려
- 거리 및 시간 인자 적용
- ALARA 원칙 준수

### 3. 방사능 붕괴

- 지수 함수 붕괴 계산
- 장기 예측 (수천 년)
- 잔류 방사능 평가
- 처분 안전성 평가

### 4. 실시간 모니터링

- IoT 센서 통합
- 연속 선량률 측정
- 자동 알람 시스템
- 데이터 로깅 및 분석

### 5. 블록체인 추적

- Hyperledger Fabric 통합
- 불변의 기록 관리
- 완전한 추적 가능성
- 국제 안전조치 지원

## 🛡️ 안전 기준

### 선량 한도

| 대상 | 연간 유효선량 | 비고 |
|------|--------------|------|
| 방사선작업종사자 | 50 mSv | 5년 평균 20 mSv/년 |
| 일반인 | 1 mSv | 자연방사선 제외 |
| 부지경계 | 0.25 mSv | 원전 부지경계 기준 |

### 방사선 방호 원칙 (ALARA)

1. **정당화 (Justification)**: 이득이 피해보다 커야 함
2. **최적화 (Optimization)**: 합리적으로 달성 가능한 낮은 수준 유지
3. **선량 한도 (Dose Limit)**: 규제 한도 준수

### 표면 오염 기준

| 핵종 분류 | 제거성 오염 | 고정성 오염 |
|----------|------------|------------|
| 알파 방출핵종 | 0.4 Bq/cm² | 4 Bq/cm² |
| 베타/감마 방출핵종 | 4 Bq/cm² | 40 Bq/cm² |

## 🌍 국제 협력

### 주요 국제기구

- **IAEA (International Atomic Energy Agency)**: 안전 기준, 안전조치
- **NEA/OECD**: 방사성폐기물 관리 위원회
- **WNA (World Nuclear Association)**: 산업 협력

### 국제 조약

- **합동협약 (Joint Convention)**: 사용후핵연료 및 방사성폐기물 안전관리
- **런던협약/의정서**: 해양 투기 금지
- **바젤협약**: 국가 간 이동 통제

## 📖 참조 문서

### 국제 표준

- IAEA Safety Standards Series
  - GSR Part 5: Predisposal Management of Radioactive Waste
  - SSR-5: Disposal of Radioactive Waste
- ICRP Publications
  - ICRP 103: Recommendations
- ISO Standards
  - ISO 12807: Safe transport of radioactive materials

### 한국 법령

- 원자력안전법
- 방사성폐기물 관리법
- 원자력안전위원회 고시

## 🔧 설치 및 설정

### 자동 설치

```bash
chmod +x install.sh
./install.sh
```

### 수동 설치

```bash
# TypeScript SDK
cd api/typescript
npm install
npm run build

# CLI 도구
chmod +x cli/radioactive-waste.sh
sudo ln -s $(pwd)/cli/radioactive-waste.sh /usr/local/bin/radioactive-waste

# 환경 변수 설정
echo 'export WIA_ENE026_API_KEY="your-api-key"' >> ~/.bashrc
source ~/.bashrc
```

## 📞 연락처 및 지원

### WIA 표준 사무국

- **웹사이트**: https://wia.org/standards/ene-026
- **이메일**: radioactive-waste@wia.org
- **GitHub**: https://github.com/WIA-Official/wia-standards

### 기술 지원

- **이메일**: tech-support@wia.org
- **포럼**: https://forum.wia.org/ene-026

### 긴급 연락

- **방사선 비상**: +82-2-XXXX-9999
- **IAEA 사고센터**: +43-1-2600-22222

## 📜 라이선스 및 저작권

© 2025 WIA (World Certification Industry Association)

본 표준은 **弘益人間 (홍익인간)** — 널리 인간을 이롭게 하라는 철학 아래 배포됩니다.

**라이선스**: Creative Commons BY 4.0
- ✅ 자유로운 사용 및 적용
- ✅ 출처 표시 필수
- ✅ 상업적 사용 허용
- ✅ 2차 저작물 작성 허용

## 🙏 감사의 말

본 표준은 다음의 협력을 통해 개발되었습니다:
- 국제 원자력 안전 전문가
- 전 세계 규제 기관
- 원자력 발전소 운영자
- 연구 기관
- 공공 이해관계자

모든 기여자들이 **弘益人間 (홍익인간)**의 정신으로 인류의 이익을 위해 노력해 주신 것에 감사드립니다.

---

## 버전 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|-----------|
| 1.0.0 | 2025-12-25 | 초기 버전 발행 |

---

**弘益人間 (홍익인간) - 널리 인간을 이롭게 하라**

*방사성폐기물의 안전한 관리를 통해 인류와 환경을 보호합니다* ☢️
