# WIA Fire Safety System Standard

> 弘益人間 (홍익인간) · Benefit All Humanity

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](spec/)
[![Standard](https://img.shields.io/badge/standard-WIA-red.svg)](https://github.com/WIA-Official)

## Overview

The **WIA Fire Safety System Standard** provides a comprehensive, open specification for modern fire detection, alarm, and suppression systems. By establishing standardized data formats, APIs, protocols, and integration frameworks, this standard enables seamless interoperability between products from different manufacturers while supporting innovation and competition.

### Philosophy

Grounded in the principle of **弘益人間 (Benefit All Humanity)**, the WIA Fire Safety System Standard prioritizes life safety and property protection over commercial interests. All specifications are freely available without licensing fees or restrictive terms.

### Key Benefits

- **Interoperability**: Mix and match equipment from different manufacturers
- **Cost Reduction**: 30-50% lower life-cycle costs through competition
- **Enhanced Safety**: Improved reliability through proven standardized approaches
- **Future-Proof**: Incremental upgrades without complete system replacement
- **Integration**: Seamless connection with building management systems
- **Analytics**: Standardized data enables predictive maintenance and optimization

## Four-Phase Architecture

### Phase 1: Data Format Standardization

Comprehensive data schemas for:
- Sensor readings (smoke, heat, flame, CO)
- Alarm signals and events
- Device status and health
- Configuration and metadata

**Specification**: [fire-safety-system-PHASE-1-v1.0.md](spec/fire-safety-system-PHASE-1-v1.0.md)

### Phase 2: API Interface Design

Modern RESTful and real-time APIs:
- Device management (CRUD operations)
- Alarm handling (acknowledge, silence, clear)
- System status monitoring
- WebSocket event streaming

**Specification**: [fire-safety-system-PHASE-2-v1.0.md](spec/fire-safety-system-PHASE-2-v1.0.md)

### Phase 3: Communication Protocols

Reliable fire safety protocols:
- Fire detection and verification
- Alarm notification procedures
- Evacuation coordination
- Emergency services communication

**Specification**: [fire-safety-system-PHASE-3-v1.0.md](spec/fire-safety-system-PHASE-3-v1.0.md)

### Phase 4: System Integration

Integration frameworks for:
- Building Management Systems (BMS)
- HVAC control and smoke management
- Access control and elevator recall
- Emergency lighting and mass notification
- Public safety infrastructure

**Specification**: [fire-safety-system-PHASE-4-v1.0.md](spec/fire-safety-system-PHASE-4-v1.0.md)

## Quick Start

### TypeScript/JavaScript

```bash
npm install @wia/fire-safety-system
```

```typescript
import { FireSafetyClient } from '@wia/fire-safety-system';

const client = new FireSafetyClient({
  baseUrl: 'https://your-fire-panel.local',
  apiKey: 'your-api-key'
});

// Get all devices
const devices = await client.getDevices();

// Monitor real-time events
client.connectEventStream((event) => {
  if (event.eventType === 'alarm.triggered') {
    console.log('FIRE ALARM:', event.data);
  }
});
```

### REST API

```bash
# Get system status
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://your-fire-panel.local/api/v1/status

# List active alarms
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://your-fire-panel.local/api/v1/alarms?status=active

# Acknowledge alarm
curl -X POST \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"comment":"Acknowledged by operator"}' \
  https://your-fire-panel.local/api/v1/alarms/ALARM_ID/acknowledge
```

## Documentation

### E-Book

Comprehensive guides available in English and Korean:

- **English**: [ebook/en/index.html](ebook/en/index.html)
  - Chapter 1: Introduction to Fire Safety Systems
  - Chapter 2: Current Challenges in Fire Protection
  - Chapter 3: WIA Standard Overview
  - Chapter 4: Phase 1 - Data Format Standardization
  - Chapter 5: Phase 2 - API Interface Design
  - Chapter 6: Phase 3 - Communication Protocols
  - Chapter 7: Phase 4 - System Integration
  - Chapter 8: Implementation & Certification

- **한국어**: [ebook/ko/index.html](ebook/ko/index.html)
  - 제1장: 화재 안전 시스템 소개
  - 제2장: 화재 방호의 현재 과제
  - 제3장: WIA 표준 개요
  - 제4장: 1단계 - 데이터 형식 표준화
  - 제5장: 2단계 - API 인터페이스 설계
  - 제6장: 3단계 - 통신 프로토콜
  - 제7장: 4단계 - 시스템 통합
  - 제8장: 구현 및 인증

### Interactive Simulator

Try the fire safety system simulator with live demonstrations:

[simulator/index.html](simulator/index.html)

Features:
- 5-tab interface (Data Format, Algorithms, Protocol, Integration, Test)
- 99-language support
- Interactive fire detection simulation
- Real-time event logging
- Protocol flow visualization

## Technical Specifications

### Data Formats

All data uses JSON with ISO 8601 timestamps (UTC):

```json
{
  "sensorId": "550e8400-e29b-41d4-a716-446655440000",
  "type": "smoke_photoelectric",
  "location": {
    "building": "Tower A",
    "floor": 3,
    "zone": "East Wing",
    "coordinates": { "x": 45.2, "y": 78.5 }
  },
  "status": "normal",
  "readings": {
    "obscuration": 2.5,
    "temperature": 22.3,
    "batteryLevel": 87
  },
  "timestamp": "2025-12-27T10:30:00Z"
}
```

### Security Requirements

- TLS 1.3+ with 2048-bit RSA or 256-bit ECC certificates
- Multi-factor authentication for administrative access
- Role-based access control (Viewer, Operator, Technician, Administrator)
- Comprehensive audit logging with tamper-evident hashing
- Certificate pinning for critical connections

### Performance Requirements

| Operation | Maximum Latency |
|-----------|----------------|
| Sensor to Panel | 1 second |
| Panel Processing | 500 milliseconds |
| Alarm Notification | 1 second |
| Total Detection to Alert | 3 seconds |

### Reliability Requirements

- Control panels: 99.99% uptime
- Minimum 24 hours battery backup
- Automatic failover <5 seconds
- Support for 10,000+ addressable devices per panel

## Compliance

The WIA Fire Safety System Standard complements existing fire safety codes:

- **NFPA 72**: National Fire Alarm and Signaling Code
- **NFPA 13**: Sprinkler Systems Installation Standard
- **EN 54**: European Fire Detection and Alarm Systems
- **UL Standards**: Various UL fire safety equipment standards

WIA certification demonstrates interoperability and integration capabilities beyond basic code compliance.

## Implementation

### Certification Levels

**Level 1 - Basic Conformance**
- Mandatory requirements only
- Single-vendor deployment support

**Level 2 - Multi-Vendor**
- Interoperability demonstrated
- Mixed vendor device support

**Level 3 - Advanced Features**
- Optional features implemented
- Enhanced integration capabilities
- Analytics and predictive maintenance

### Migration Strategies

1. **Gateway Translation**: Interface legacy systems without replacement
2. **Phased Replacement**: Incremental device upgrades over time
3. **New Construction**: Full WIA compliance from initial installation
4. **Retrofit**: Modernize existing systems with WIA components

## API Reference

### TypeScript SDK

Complete API documentation available in:
- [api/typescript/src/types.ts](api/typescript/src/types.ts) - Type definitions
- [api/typescript/src/index.ts](api/typescript/src/index.ts) - SDK implementation

### REST Endpoints

**Base URL**: `https://{host}:{port}/api/v1/`

#### Device Management
- `GET /devices` - List all devices
- `GET /devices/{id}` - Get device details
- `PUT /devices/{id}` - Update device configuration
- `POST /devices/{id}/test` - Initiate device test
- `DELETE /devices/{id}` - Remove device

#### Alarm Management
- `GET /alarms` - List alarms (supports filtering)
- `GET /alarms/{id}` - Get alarm details
- `POST /alarms/{id}/acknowledge` - Acknowledge alarm
- `POST /alarms/{id}/silence` - Silence notification
- `DELETE /alarms/{id}` - Clear alarm

#### System Status
- `GET /status` - Overall system health
- `GET /status/panels` - Control panel status
- `GET /status/network` - Network connectivity
- `GET /status/zones` - Zone-by-zone status

#### Real-Time Events
- `WebSocket: wss://{host}:{port}/api/v1/events`

## Directory Structure

```
fire-safety-system/
├── index.html              # Landing page (EN/KO toggle)
├── README.md               # This file
├── simulator/
│   └── index.html          # Interactive simulator
├── ebook/
│   ├── en/                 # English e-book (9 chapters)
│   │   ├── index.html
│   │   ├── chapter-01.html
│   │   └── ...
│   └── ko/                 # Korean e-book (9 chapters)
│       ├── index.html
│       ├── chapter-01.html
│       └── ...
├── spec/
│   ├── fire-safety-system-PHASE-1-v1.0.md
│   ├── fire-safety-system-PHASE-2-v1.0.md
│   ├── fire-safety-system-PHASE-3-v1.0.md
│   └── fire-safety-system-PHASE-4-v1.0.md
└── api/
    └── typescript/
        ├── package.json
        └── src/
            ├── types.ts
            └── index.ts
```

## Contributing

We welcome contributions from the fire safety community!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Please ensure:
- All changes maintain backward compatibility
- Comprehensive tests for new features
- Documentation updates
- Compliance with security requirements

## Support

- **GitHub Issues**: https://github.com/WIA-Official/fire-safety-system/issues
- **Discussion Forum**: https://github.com/WIA-Official/fire-safety-system/discussions
- **Email**: standards@wia.org

## License

This standard is released under the **Creative Commons Attribution 4.0 International (CC BY 4.0)** license.

SDK implementations are released under the **MIT License**.

## Acknowledgments

The WIA Fire Safety System Standard was developed with input from:
- Fire safety equipment manufacturers
- Building owners and facility managers
- Fire protection engineers
- Code officials and authorities having jurisdiction
- Emergency responders
- Standards organizations

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-12-27 | Initial official release |

---

**© 2025 SmileStory Inc. / WIA**  
**弘益人間 (홍익인간) · Benefit All Humanity**
