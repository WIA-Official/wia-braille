# WIA-CITY-010: Smart HVAC System Standard ❄️

> 弘益人間 (Hongik Ingan) - Benefit All Humanity

## Overview

WIA-CITY-010 defines standards for intelligent Heating, Ventilation, and Air Conditioning systems in smart cities. This standard enables 30-50% energy savings through IoT sensors, AI optimization, and integrated building automation.

## Features

- **Energy Optimization**: AI-driven algorithms reduce consumption by 30-50%
- **Indoor Air Quality**: Comprehensive monitoring (CO2, VOCs, PM2.5, humidity)
- **Predictive Maintenance**: Automated fault detection prevents failures
- **Smart Integration**: Seamless connection with BMS, lighting, security systems
- **Four Certification Levels**: Bronze, Silver, Gold, Platinum

## Quick Start

```bash
# Install the HVAC system toolkit
chmod +x install.sh
./install.sh

# Run the simulator
cd simulator
open index.html

# View the specification
cd spec
cat hvac-system-v1.0.md
```

## Certification Levels

| Level | Requirements | Energy Savings | Applications |
|-------|--------------|----------------|--------------|
| **Bronze** | Basic IoT sensors, programmable thermostats | 10-20% | Small offices, residential |
| **Silver** | Zone control, occupancy-based, air quality | 20-35% | Medium commercial, schools |
| **Gold** | AI optimization, predictive maintenance, BMS | 35-50% | Large commercial, hospitals |
| **Platinum** | Machine learning, demand response, full integration | 50%+ | Smart cities, critical facilities |

## API Usage

```typescript
import { HVACSystem, ZoneConfig } from '@wia/hvac-system';

// Initialize HVAC system
const hvac = new HVACSystem({
  mode: 'auto',
  targetTemperature: 22,
  certificationLevel: 'gold'
});

// Configure zones
const zone1: ZoneConfig = {
  name: 'Office Area',
  targetTemp: 22,
  occupancySensing: true,
  co2Threshold: 1000
};

hvac.addZone(zone1);

// Start system
await hvac.start();

// Monitor status
const status = hvac.getStatus();
console.log(`COP: ${status.efficiency.cop}`);
console.log(`Energy Savings: ${status.efficiency.savingsPercent}%`);
```

## CLI Usage

```bash
# Start HVAC system
./cli/hvac-system.sh start --mode=auto --target-temp=22

# Check status
./cli/hvac-system.sh status

# Optimize energy
./cli/hvac-system.sh optimize

# Run diagnostics
./cli/hvac-system.sh diagnose
```

## Documentation

- **Specification**: [`spec/hvac-system-v1.0.md`](spec/hvac-system-v1.0.md)
- **API Reference**: [`api/typescript/README.md`](api/typescript/README.md)
- **E-Book (English)**: [`ebook/en/index.html`](ebook/en/index.html)
- **E-Book (Korean)**: [`ebook/ko/index.html`](ebook/ko/index.html)
- **Simulator**: [`simulator/index.html`](simulator/index.html)

## Key Technologies

- **Sensors**: Temperature, humidity, CO2, VOCs, PM2.5, occupancy
- **Control**: BACnet, Modbus, MQTT communication protocols
- **AI/ML**: Predictive algorithms, reinforcement learning optimization
- **Integration**: Building Management Systems, smart city platforms

## Energy Savings Breakdown

- Optimal start/stop: 10-20%
- Economizer optimization: 15-30%
- Zone control with occupancy: 15-25%
- AI-driven optimization: 20-35%
- **Total Combined**: 30-50%+

## Indoor Air Quality Standards

- **CO2**: <1000 ppm
- **PM2.5**: <12 µg/m³
- **VOCs**: <500 µg/m³
- **Humidity**: 40-60%
- **Temperature**: 20-24°C (68-75°F)

## Support and Resources

- **Documentation**: [WIA-CITY-010 Spec](spec/hvac-system-v1.0.md)
- **Community**: GitHub Discussions
- **Issues**: GitHub Issues
- **Website**: https://wia-standards.org

## License

© 2025 SmileStory Inc. / WIA
Distributed under the MIT License. See LICENSE for details.

## Philosophy

**弘익人間 (Hongik Ingan) - Benefit All Humanity**

This standard embodies the principle of benefiting all humanity by creating healthy, efficient, and sustainable indoor environments that serve both current occupants and future generations.

---

**Version**: 1.0.0
**Standard**: WIA-CITY-010
**Category**: Smart City - HVAC Systems
**Emoji**: ❄️
