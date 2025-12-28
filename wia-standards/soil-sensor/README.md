# 🌱 WIA-AGRI-005: Soil Sensor Standard

**Standard ID:** WIA-AGRI-005
**Folder:** soil-sensor
**Emoji:** 🌱
**Primary Color:** #84CC16 (Lime - AGRI)
**Version:** 1.0.0
**Status:** ✅ Complete

---

## 📋 Overview

The WIA Soil Sensor Standard (WIA-AGRI-005) defines a comprehensive framework for smart soil monitoring systems, enabling real-time measurement of soil moisture, temperature, pH, nutrients, and electrical conductivity for precision agriculture.

**English Title:** Soil Sensor
**Korean Title:** 토양 센서 (Toyang Senseo)

This standard ensures interoperability between soil sensor manufacturers, IoT platforms, and farm management systems, enabling data-driven soil health decisions.

---

## 🎯 Key Features

- **Multi-Parameter Sensing:** Moisture, temperature, pH, EC, NPK nutrients
- **Real-Time Monitoring:** Continuous soil condition tracking
- **Depth Profiling:** Multi-layer soil analysis (0-30cm, 30-60cm)
- **IoT Connectivity:** LoRaWAN, NB-IoT, WiFi, Bluetooth
- **Low Power Design:** Battery-operated sensors with years of operation
- **Data Analytics:** Soil health trends and irrigation recommendations
- **Alert System:** Automated warnings for critical conditions

---

## 📁 Directory Structure

```
soil-sensor/
├── index.html                      # Landing page
├── simulator/
│   └── index.html                  # Interactive sensor simulator
├── spec/
│   ├── PHASE-1-DATA-FORMAT.md      # Data format specification (7 KB)
│   ├── PHASE-2-API-INTERFACE.md    # API interface spec (11 KB)
│   ├── PHASE-3-PROTOCOL.md         # Protocol specification (9 KB)
│   └── PHASE-4-INTEGRATION.md      # Integration spec (14 KB)
├── ebook/
│   ├── en/
│   │   └── index.html              # English ebook (8 chapters)
│   └── ko/
│       └── index.html              # Korean ebook (8 chapters)
├── api/
│   └── typescript/
│       ├── src/
│       │   ├── types.ts            # TypeScript type definitions
│       │   └── index.ts            # SDK implementation
│       └── package.json
└── README.md                        # This file
```

---

## 🎮 Quick Start

1. **View Landing Page:** Open `index.html` in your browser
2. **Try Simulator:** Navigate to `simulator/index.html` for live sensor demo
3. **Read Ebook:** Access comprehensive guides in `ebook/en/` or `ebook/ko/`
4. **Review Specs:** Check `spec/` directory for technical specifications
5. **Use API:** Install TypeScript SDK from `api/typescript/`

---

## 📐 Specification Phases

### Phase 1: Data Format (7 KB)
- Soil sensor data packet structures
- Multi-parameter measurement schemas
- Depth-based sensor arrays
- Calibration data formats
- Time-series soil data

### Phase 2: API Interface (11 KB)
- REST API endpoints for sensor management
- Real-time data streaming
- Historical data queries
- Calibration and configuration APIs
- Alert management endpoints

### Phase 3: Protocol (9 KB)
- LoRaWAN payload encoding/decoding
- MQTT topic structure for soil data
- NB-IoT communication protocols
- Bluetooth GATT services
- Power-efficient data transmission

### Phase 4: Integration (14 KB)
- Farm management system integration
- Weather API correlation
- Irrigation system automation
- Cloud platforms (AWS IoT, Azure IoT)
- Soil health analytics engines

---

## 🏆 Certification Levels

| Level | Phases | Requirements | Target Audience |
|-------|--------|--------------|-----------------|
| 🥉 **Bronze** | 1 | Data format compliance | Basic sensor manufacturers |
| 🥈 **Silver** | 1-2 | APIs + cloud connectivity | IoT platform providers |
| 🥇 **Gold** | 1-3 | Full protocol support | Advanced sensor systems |
| 💎 **Platinum** | 1-4 | Complete integration | Agricultural automation |

---

## 🔗 Links

- **Ebook:** [/ebook/en/](/soil-sensor/ebook/en/)
- **Simulator:** [/simulator/](/soil-sensor/simulator/)
- **Certification:** https://cert.wiastandards.com
- **GitHub:** https://github.com/WIA-Official/wia-standards

---

## 📜 License

**MIT License** © 2025 WIA (World Certification Industry Association)

Free to use, modify, and distribute with attribution.

---

## 🌟 Philosophy

**弘益人間 (홍익인간) · Benefit All Humanity**

Our mission is to create open, accessible soil monitoring standards that enable farmers to optimize soil health and maximize crop yields sustainably.

---

**Created:** 2025-01-01
**Last Updated:** 2025-01-01
**Standard Version:** 1.0.0
**Document Version:** 1.0
