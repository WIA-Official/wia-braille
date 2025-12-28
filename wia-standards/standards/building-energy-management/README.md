# WIA Building Energy Management Standard (WIA-BEMS)

> 弘益人間 (Hongik Ingan) - Benefit All Humanity

## Overview

The WIA Building Energy Management Standard (WIA-BEMS) provides a comprehensive framework for implementing intelligent, efficient, and sustainable building energy management systems. This open standard enables interoperability between devices, systems, and platforms from different manufacturers, eliminating vendor lock-in and reducing integration complexity.

Buildings account for approximately 40% of global energy consumption and nearly one-third of greenhouse gas emissions. WIA-BEMS enables 20-40% energy savings while improving occupant comfort and supporting net-zero goals.

## Key Features

- **📊 Standardized Data Formats**: Consistent schemas for all building energy data
- **🔌 RESTful APIs**: Modern, secure interfaces for data access and control
- **⚡ Advanced Protocols**: Automated control sequences and optimization algorithms
- **🌐 External Integration**: Smart grid, renewable energy, and certification platforms
- **🔒 Security Built-in**: OAuth 2.0, TLS 1.3, role-based access control
- **🎯 Vendor-Neutral**: Freely implementable, no licensing fees

## Four-Phase Implementation

### Phase 1: Data Format
Standardized JSON schemas for energy consumption, environmental conditions, occupancy, equipment status, renewables, and storage.

**Benefits**: Consistent reporting, data aggregation, baseline establishment
**Timeline**: 2-4 months

### Phase 2: API Interface
RESTful APIs for accessing building energy data and controlling systems.

**Benefits**: Application flexibility, no vendor lock-in, competitive marketplace
**Timeline**: 3-6 months

### Phase 3: Protocol
Coordinated workflows for monitoring, control, predictive maintenance, fault detection, and optimization.

**Benefits**: Automated operations, 30-40% energy savings, reduced maintenance costs
**Timeline**: 4-8 months

### Phase 4: Integration
Integration with smart grids, renewable energy, building automation systems, EV charging, and compliance platforms.

**Benefits**: Grid revenue, maximized renewables, automated compliance, portfolio optimization
**Timeline**: 6-12 months

## Quick Start

### 1. Installation

```bash
npm install wia-bems-sdk
```

### 2. Basic Usage

```typescript
import { WIABEMSClient } from 'wia-bems-sdk';

// Initialize client
const client = new WIABEMSClient({
  baseUrl: 'https://api.example.com',
  accessToken: 'your_oauth_token'
});

// Get building information
const building = await client.getBuilding('BLDG-001');
console.log(`Building: ${building.name}, Area: ${building.area_sqm} m²`);

// Query energy data
const energyData = await client.getEnergyData('BLDG-001', {
  start: '2025-01-01T00:00:00Z',
  end: '2025-01-31T23:59:59Z',
  interval: '1h'
});
console.log(`Total Energy: ${energyData.summary.total_energy_kwh} kWh`);

// Control equipment
const response = await client.sendCommand('BLDG-001', 'AHU-301', {
  command: 'set_temperature',
  parameters: { supply_air_temp_setpoint_c: 14.0 }
});
console.log(`Command Status: ${response.status}`);
```

### 3. Real-Time Data Streaming

```typescript
// Connect to WebSocket for real-time updates
const ws = client.connectRealtime(
  'BLDG-001',
  (data) => {
    console.log('Real-time data:', data);
  },
  (error) => {
    console.error('WebSocket error:', error);
  }
);

// Subscribe to power demand stream
client.subscribeToStreams(ws, [
  {
    type: 'power_demand',
    meter_id: 'METER-E-301',
    sample_rate: '1s'
  }
]);
```

## Documentation

### Specifications
- [Phase 1: Data Format](./spec/building-energy-management-PHASE-1-v1.0.md)
- [Phase 2: API Interface](./spec/building-energy-management-PHASE-2-v1.0.md)
- [Phase 3: Protocol](./spec/building-energy-management-PHASE-3-v1.0.md)
- [Phase 4: Integration](./spec/building-energy-management-PHASE-4-v1.0.md)

### Complete Guide
- [English Documentation](./ebook/en/) - 8 chapters covering all aspects
- [한국어 문서](./ebook/ko/) - 전체 한국어 가이드

### Interactive Tools
- [Landing Page](./index.html) - Standard overview and features
- [Simulator](./simulator/index.html) - Interactive BEMS simulator with 99 languages

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Integration Layer                        │
│  Smart Grid │ Renewables │ BAS │ EV Charging │ Compliance   │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────────┐
│                    Application Layer                         │
│    Analytics │ Control │ Optimization │ User Interfaces     │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────────┐
│                      Data Layer                              │
│   Standardized JSON Schemas │ Validation │ Quality          │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────────┐
│                  Communication Layer                         │
│     HTTP/REST │ WebSocket │ MQTT │ BACnet │ Modbus          │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────────┐
│                    Physical Layer                            │
│  Sensors │ Meters │ Controllers │ Actuators │ Equipment     │
└─────────────────────────────────────────────────────────────┘
```

## Certification

WIA-BEMS offers comprehensive certification at multiple levels:

| Level | Scope | Requirements | Validity |
|-------|-------|--------------|----------|
| Device | Sensors, meters, controllers | Phase 1 compliance | 3 years |
| System | Complete BEMS platforms | Phases 1-2 | 2 years |
| Protocol | Control systems | Phases 1-3 | 2 years |
| Integration | Full implementation | All 4 phases | 2 years |
| Building | Deployed systems | All phases + performance | Annual |

### Testing Suite

WIA provides open-source test harness for validation:
- Schema validation tests
- API functionality tests
- Protocol compliance tests
- Security audit tools
- Performance benchmarks

## Expected Benefits

### Energy Performance
- **20-40% energy consumption reduction**
- **25-45% energy cost savings**
- **15-30% peak demand reduction**
- **30-50% carbon footprint reduction**

### Operational Excellence
- **15-25% maintenance cost reduction**
- **20-30% equipment life extension**
- **50% faster issue detection**
- **99.5%+ system uptime**

### Occupant Comfort
- **15-30% satisfaction improvement**
- **More consistent environmental conditions**
- **Faster response to changing needs**
- **Improved indoor air quality**

## Use Cases

### Commercial Office Buildings
- Occupancy-based HVAC and lighting control
- Demand response participation
- Portfolio-level optimization
- LEED/Energy Star certification

### Retail and Hospitality
- Zone-based control for different areas
- Peak shaving during high-occupancy periods
- Integration with reservation systems
- Cost optimization during variable hours

### Healthcare Facilities
- Critical system reliability
- Non-critical area optimization
- Infection control integration
- 24/7 monitoring and alerting

### Data Centers
- Advanced cooling optimization
- Waste heat recovery
- Power Usage Effectiveness (PUE) improvement
- Grid service participation

## Implementation Guide

### 1. Assessment Phase (2-4 weeks)
- Building audit and baseline
- Infrastructure readiness
- Budget planning
- Stakeholder alignment

### 2. Phase 1 Implementation (2-4 months)
- Install meters and sensors
- Configure data collection
- Validate schemas
- Establish baseline

### 3. Phase 2 Implementation (3-6 months)
- Deploy API platform
- Integrate applications
- Configure access control
- User training

### 4. Phase 3 Implementation (4-8 months)
- Implement control sequences
- Deploy optimization algorithms
- Predictive maintenance setup
- Continuous commissioning

### 5. Phase 4 Implementation (6-12 months)
- Smart grid integration
- Renewable coordination
- BAS integration
- Automated compliance

## Support and Resources

- **Website**: https://wia.org/standards/building-energy-management
- **Documentation**: https://docs.wia.org/bems
- **GitHub**: https://github.com/WIA-Official/wia-standards
- **Community Forum**: https://community.wia.org/bems
- **Email Support**: bems-support@wia.org

## Contributing

WIA-BEMS is an open standard. Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for detailed guidelines.

## License

The WIA-BEMS standard specifications are freely implementable with no licensing fees or royalties.

SDK code is released under MIT License - see [LICENSE](./LICENSE) for details.

## Acknowledgments

WIA-BEMS builds upon and is compatible with:
- BACnet (ASHRAE 135)
- Project Haystack
- OpenADR 2.0b
- IEEE 2030.5
- ISO 50001

Special thanks to the WIA Technical Committee and all contributors to the building energy management community.

---

## Directory Structure

```
building-energy-management/
├── index.html                 # Landing page
├── simulator/                 # Interactive simulator
│   └── index.html
├── ebook/                     # Complete documentation
│   ├── en/                    # English (8 chapters)
│   └── ko/                    # Korean (8 chapters)
├── spec/                      # Technical specifications
│   ├── building-energy-management-PHASE-1-v1.0.md
│   ├── building-energy-management-PHASE-2-v1.0.md
│   ├── building-energy-management-PHASE-3-v1.0.md
│   └── building-energy-management-PHASE-4-v1.0.md
├── api/                       # SDK implementations
│   └── typescript/
│       ├── src/
│       │   ├── types.ts       # Type definitions
│       │   └── index.ts       # Main SDK
│       └── package.json
└── README.md                  # This file
```

---

**© 2025 SmileStory Inc. / WIA**

**弘益人間 (Hongik Ingan) - Benefit All Humanity**

*Making buildings smarter, greener, and more efficient for everyone.*
