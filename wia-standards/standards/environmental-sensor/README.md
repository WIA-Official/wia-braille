# WIA Environmental Sensor Standard (WIA-ENE-027)

📡 **Unified IoT Standard for Environmental Monitoring & Data Integration**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://wiastandards.com/standards/environmental-sensor)
[![Standard](https://img.shields.io/badge/standard-WIA--ENE--027-10B981.svg)](https://wiastandards.com)

---

## 🌍 Overview

The WIA Environmental Sensor Standard provides a comprehensive, open framework for environmental monitoring that addresses the fundamental challenges of sensor data fragmentation, interoperability, and integration. This standard embodies the principle of **弘益人間 (Hongik Ingan)** — broadly benefiting humanity — by creating an accessible, interoperable foundation for global environmental monitoring.

### Key Features

- **📊 Standardized Data Formats** - JSON schemas for air quality, water quality, soil, meteorological, radiation, and noise sensors
- **🔌 RESTful API Interfaces** - Consistent programmatic access across all sensor platforms
- **📡 Multi-Protocol Support** - MQTT, CoAP, LoRaWAN, and HTTP for diverse deployment scenarios
- **☁️ Cloud Integration** - Seamless integration with AWS IoT, Azure IoT Hub, Google Cloud IoT
- **🔒 Security First** - TLS/DTLS encryption, device authentication, and data integrity
- **🌐 Global Accessibility** - Open standard available to all, supporting worldwide deployment

---

## 🚀 Quick Start

### Installation

**TypeScript/JavaScript:**
```bash
npm install @wia/environmental-sensor-sdk
```

**Python:**
```bash
pip install wia-environmental-sensor
```

### Basic Usage

```typescript
import { WIAClient } from '@wia/environmental-sensor-sdk';

// Initialize client
const client = new WIAClient({
  baseURL: 'https://api.example.com',
  apiKey: 'your-api-key'
});

// Get latest sensor data
const data = await client.getLatestData('ENV-AIR-001');
console.log(`PM2.5: ${data.readings.pm2_5.value} ${data.readings.pm2_5.unit}`);

// List all sensors
const sensors = await client.listSensors({ type: 'air_quality' });
console.log(`Found ${sensors.total} air quality sensors`);

// Subscribe to real-time updates
const unsubscribe = client.subscribeToStream(
  { action: 'subscribe', sensors: ['ENV-AIR-001'] },
  (data) => console.log('New reading:', data)
);
```

---

## 📚 Documentation

### Standard Specifications

- **[Phase 1: Data Format](spec/environmental-sensor-PHASE-1-v1.0.md)** - JSON schemas, field definitions, validation rules
- **[Phase 2: API Interface](spec/environmental-sensor-PHASE-2-v1.0.md)** - RESTful endpoints, authentication, streaming
- **[Phase 3: Protocol](spec/environmental-sensor-PHASE-3-v1.0.md)** - MQTT, CoAP, LoRaWAN, edge computing
- **[Phase 4: Integration](spec/environmental-sensor-PHASE-4-v1.0.md)** - Cloud platforms, analytics, regulatory reporting

### Comprehensive Guide

📖 **[Complete Ebook](ebook/en/index.html)** - 8 chapters covering everything from introduction to implementation

1. Introduction to Environmental Sensors
2. Current Challenges in Environmental Monitoring
3. WIA Standard Overview
4. Phase 1 - Data Format
5. Phase 2 - API Interface
6. Phase 3 - Protocol
7. Phase 4 - Integration
8. Implementation & Certification

### Interactive Tools

- **[🎮 Simulator](simulator/index.html)** - Try the standard with interactive sensor data simulation
- **[🌐 Landing Page](index.html)** - Overview and quick links

---

## 🏗️ Four-Phase Architecture

The WIA standard is structured as four progressive phases:

### Phase 1: Data Format ✅
Standardized JSON schemas for sensor data
- Common core structure for all sensors
- Sensor-specific schemas (air, water, soil, meteorological, etc.)
- Metadata and quality assurance
- Validation rules

### Phase 2: API Interface ✅
RESTful APIs for data access
- Sensor discovery and registration
- Data retrieval (latest, historical, bulk)
- Real-time streaming (WebSocket, SSE)
- Authentication and authorization

### Phase 3: Protocol ✅
Communication protocols for IoT
- MQTT for connected sensors
- CoAP for constrained devices
- LoRaWAN for wide-area networks
- Security (TLS/DTLS, authentication)
- Edge computing patterns

### Phase 4: Integration ✅
Ecosystem connectivity
- AWS IoT, Azure IoT Hub, Google Cloud IoT
- Data analytics and machine learning
- Visualization and dashboards
- Regulatory reporting
- Cross-standard interoperability

---

## 💻 Example: Air Quality Sensor

### Data Format (Phase 1)

```json
{
  "version": "1.0.0",
  "standard": "WIA-ENE-027",
  "deviceId": "ENV-AIR-001",
  "timestamp": "2024-12-26T10:30:00.000Z",
  "sensorType": "air_quality",
  "location": {
    "latitude": 37.5665,
    "longitude": 126.9780,
    "altitude": 38.5
  },
  "readings": {
    "pm2_5": {"value": 15.3, "unit": "μg/m³", "uncertainty": 2.0},
    "pm10": {"value": 22.7, "unit": "μg/m³", "uncertainty": 3.0},
    "temperature": {"value": 23.5, "unit": "°C", "uncertainty": 0.3},
    "humidity": {"value": 65, "unit": "%RH", "uncertainty": 2.0}
  },
  "metadata": {
    "manufacturer": "AirSense Corp",
    "model": "AS-3000",
    "firmware": "v2.4.1",
    "battery": 85
  },
  "quality": {
    "overall": "good",
    "flags": []
  }
}
```

### API Access (Phase 2)

```bash
# Get latest data
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.example.com/api/v1/sensors/ENV-AIR-001/data/latest

# Historical data with aggregation
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://api.example.com/api/v1/sensors/ENV-AIR-001/data?start=2024-12-25T00:00:00Z&end=2024-12-26T00:00:00Z&aggregation=hourly"
```

### MQTT Publishing (Phase 3)

```python
import paho.mqtt.client as mqtt
import json

# Connect to MQTT broker
client = mqtt.Client()
client.tls_set()  # Enable TLS
client.username_pw_set("device-id", "device-secret")
client.connect("mqtt.example.com", 8883)

# Publish sensor data
data = {
    "version": "1.0.0",
    "standard": "WIA-ENE-027",
    "deviceId": "ENV-AIR-001",
    "timestamp": "2024-12-26T10:30:00.000Z",
    "sensorType": "air_quality",
    "readings": {"pm2_5": {"value": 15.3, "unit": "μg/m³"}}
}

client.publish("wia/env027/us-west/seattle/ENV-AIR-001/data", json.dumps(data))
```

---

## 🎯 Use Cases

### Smart Cities
- Real-time air quality monitoring across urban areas
- Traffic-related pollution tracking
- Public health advisories
- Regulatory compliance reporting

### Agriculture
- Soil moisture and nutrient monitoring
- Precision irrigation
- Crop health assessment
- Weather station integration

### Industrial Compliance
- Emissions monitoring
- Workplace safety (air quality, noise)
- Perimeter monitoring
- Automated regulatory reporting

### Research & Climate Science
- Long-term environmental trends
- Climate model validation
- Ecosystem monitoring
- Citizen science projects

---

## 🌟 Benefits

### For Sensor Manufacturers
- **Competitive Differentiation** - WIA certification builds trust
- **Market Access** - Compatibility with major platforms
- **Reduced Integration Cost** - Standard interfaces minimize custom development

### For Platform Providers
- **Multi-Vendor Support** - Integrate diverse sensors seamlessly
- **Future-Proof** - Standard ensures long-term compatibility
- **Ecosystem Growth** - Attract more users and developers

### For End Users
- **Vendor Freedom** - Avoid lock-in, choose best-of-breed
- **Lower TCO** - Reduce integration and maintenance costs (40-60%)
- **Data Quality** - Standardized validation and quality assurance
- **Interoperability** - Connect with other WIA standards

### For Society
- **Open Data** - Enable public access to environmental information
- **Global Cooperation** - Shared standards for shared challenges
- **Environmental Protection** - Better data enables better decisions
- **弘益人間** - Benefit all humanity through accessible monitoring

---

## 🏆 Certification

WIA offers three certification levels:

- **Basic** - Phase 1 data format compliance
- **Intermediate** - Phases 1-2 (data format + API)
- **Full** - All phases 1-4 (complete ecosystem integration)

[Learn More About Certification](https://cert.wiastandards.com)

---

## 🤝 Contributing

We welcome contributions to the WIA Environmental Sensor Standard!

- **Submit Issues** - Report bugs or suggest enhancements
- **Propose Changes** - Submit pull requests
- **Share Use Cases** - Tell us about your implementations
- **Join Working Groups** - Participate in standard evolution

[Contribution Guidelines](https://github.com/WIA-Official/wia-standards/CONTRIBUTING.md)

---

## 📖 Resources

- **Website:** [wiastandards.com](https://wiastandards.com)
- **Documentation:** [docs.wiastandards.com](https://docs.wiastandards.com)
- **Simulator:** [wiabooks.store/reader/simulators/](https://wiabooks.store/reader/simulators/)
- **Certification:** [cert.wiastandards.com](https://cert.wiastandards.com)
- **GitHub:** [github.com/WIA-Official/wia-standards](https://github.com/WIA-Official/wia-standards)

---

## 📜 License

This standard is released under the **MIT License**, ensuring free use, modification, and distribution.

```
Copyright © 2025 World Certification Industry Association (WIA)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🌏 Philosophy: 弘益人間 (Hongik Ingan)

**"Broadly benefit humanity"**

Environmental challenges transcend borders and organizations. The WIA Environmental Sensor Standard embodies this Korean philosophical principle by:

- Making environmental monitoring accessible to all
- Enabling global cooperation on shared challenges
- Ensuring data serves the common good
- Supporting open science and citizen engagement
- Protecting our planet for future generations

Through standardization, we create tools that serve not narrow interests, but the collective well-being of humanity and our shared environment.

---

## 📞 Contact

- **Email:** standards@wiastandards.com
- **Forum:** [community.wiastandards.com](https://community.wiastandards.com)
- **Twitter/X:** [@WIAStandards](https://twitter.com/WIAStandards)

---

**WIA - World Certification Industry Association**
*© 2025 MIT License*

**弘益人間 · Benefit All Humanity**
