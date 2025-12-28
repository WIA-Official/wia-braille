# WIA-SPACE-021: UTM (무인기 교통 관리)

**Unmanned Aircraft System Traffic Management Standard**

[![Standard](https://img.shields.io/badge/Standard-WIA--SPACE--021-e94560)](.)
[![Version](https://img.shields.io/badge/Version-1.0-blue)](./)
[![License](https://img.shields.io/badge/License-Open-green)](./LICENSE)

---

## 🚁 Overview

WIA-SPACE-021 provides a comprehensive standard for Unmanned Aircraft System Traffic Management (UTM), enabling safe, efficient, and scalable integration of drones into national airspace. This standard covers architecture, protocols, and operational procedures for managing millions of simultaneous drone flights.

### Key Features

- **Scalable Architecture:** Distributed USS/FIMS design supporting millions of drones
- **Real-time Management:** Sub-second latency for position updates and collision alerts
- **Global Compatibility:** Aligned with NASA UTM, U-space, ASTM, and ICAO standards
- **Security First:** Comprehensive cybersecurity and privacy protection
- **Future Ready:** Extensible to UAM, BVLOS, and autonomous swarms

---

## 📚 Documentation

### Quick Start

1. **Read the Ebook:**
   - [🇰🇷 Korean Ebook](ebook/ko/index.html) - 8 comprehensive chapters (한국어)
   - [🇬🇧 English Ebook](ebook/en/index.html) - 8 comprehensive chapters

2. **Technical Specification:**
   - [WIA-SPACE-021-v1.0.md](spec/WIA-SPACE-021-v1.0.md) - Complete technical standard

3. **Explore the Standard:**
   - [index.html](index.html) - Landing page with overview and links

### Chapter Guide

| Chapter | Topic | Content |
|---------|-------|---------|
| 1 | UTM Overview | Need for UTM, history, economic value |
| 2 | Architecture | USS, FIMS, PSU, system components |
| 3 | Remote ID | ASTM F3411, broadcast/network ID |
| 4 | Airspace Management | LAANC, geofencing, dynamic management |
| 5 | Communication Protocols | ASTM, NASA UTM, U-space |
| 6 | Detect and Avoid | DAA sensors, collision avoidance |
| 7 | Security | Cybersecurity, GPS protection, privacy |
| 8 | Future | U-space, UAM, full automation |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                         FIMS                             │
│            (Government / Aviation Authority)             │
│  - Airspace Management  - Regulatory Compliance         │
│  - Authorization        - Manned Aircraft Integration    │
└──────────────┬──────────────────────┬───────────────────┘
               │                      │
               │ USS-FIMS Interface   │
               │ (HTTPS/JSON)         │
               │                      │
     ┌─────────┴──────────┐  ┌────────┴─────────┐
     │      USS #1        │  │      USS #2       │
     │ (Commercial Service)│  │ (Commercial Svc) │
     │ - Flight Planning  │◄─┤ - Conflict Detect │
     │ - Tracking         │  │ - Coordination    │
     └────────┬───────────┘  └──────────────────┘
              │
              │ Remote ID
              │ (Wi-Fi/BT/Cellular)
              │
     ┌────────┴───────────┐
     │      Drones        │
     │  - Position TX     │
     │  - Geofencing      │
     │  - DAA Systems     │
     └────────────────────┘
```

---

## 🔑 Key Technologies

### Remote ID (ASTM F3411)
- **Broadcast:** Wi-Fi Beacon, Bluetooth 5 Long Range
- **Network:** Cellular (4G/5G), Satellite
- **Update Rate:** 1 Hz (every second)
- **Range:** 1km (broadcast), unlimited (network)

### Communication Stack
- **Transport:** HTTPS/TLS 1.3, WebSocket, MQTT
- **Format:** JSON, GeoJSON, Protocol Buffers
- **Authentication:** OAuth 2.0, PKI, mTLS

### Safety Systems
- **DAA:** Radar, LiDAR, optical cameras, sensor fusion
- **Well Clear:** 100m horizontal, 50m vertical (drone-drone)
- **Geofencing:** GPS-based with multi-layer enforcement

---

## 🌍 Global Adoption

### United States
- **FAA:** Part 107, Part 89 (Remote ID), LAANC
- **NASA UTM:** TCL 1-4 framework
- **Deployment:** 500+ airports with LAANC

### Europe
- **U-space:** EU Regulation 2021/664
- **EASA:** Drone regulation framework
- **Status:** U1-U2 operational, U3-U4 in development

### Asia-Pacific
- **Japan:** DIPS system, 100g+ registration
- **South Korea:** K-FIMS, 2kg+ Remote ID
- **China:** Real-name registration, CAAC oversight

---

## 🚀 Implementation Guide

### For USS Providers

1. **System Development:**
   ```bash
   # Example USS API endpoint structure
   POST   /api/v1/operations          # Submit flight plan
   GET    /api/v1/operations/{id}     # Query status
   PUT    /api/v1/operations/{id}/pos # Update position
   DELETE /api/v1/operations/{id}     # Cancel operation
   ```

2. **Certification Requirements:**
   - Implement USS-USS interface (ASTM F3548)
   - Connect to FIMS
   - Support 10,000+ concurrent operations
   - Pass security audit
   - Disaster recovery testing

3. **Operational Deployment:**
   - Register with aviation authority
   - Obtain digital certificates
   - Deploy with 99.9% availability SLA
   - Establish 24/7 monitoring

### For Drone Manufacturers

1. **Remote ID Integration:**
   - Embed ASTM F3411 compliant module
   - Support both broadcast and network modes
   - Implement secure boot and tamper detection

2. **Safety Systems:**
   - Geofencing with hard/soft boundaries
   - Return-to-Home (RTH) failsafe
   - DAA sensors (recommended for commercial)

3. **Certification:**
   - Remote ID testing
   - Communication reliability testing
   - Failsafe behavior verification

### For Drone Operators

1. **Pre-Flight:**
   - Register drone with authority
   - Plan flight in USS app
   - Check weather and NOTAMs
   - Verify Remote ID operational

2. **In-Flight:**
   - Monitor USS alerts
   - Stay within authorized volume
   - Maintain visual line of sight (VLOS) or BVLOS authorization
   - Respond to emergency notifications

3. **Post-Flight:**
   - Review flight logs
   - Report any incidents
   - Update maintenance records

---

## 📊 Performance Specifications

| Metric | Requirement | Notes |
|--------|-------------|-------|
| System Availability | ≥ 99.9% | ~8.7 hours downtime/year max |
| Position Update Latency | < 1 second | End-to-end USS to FIMS |
| Authorization Latency | < 30 seconds | For routine approvals |
| Concurrent Operations | ≥ 10,000 per USS | Scalability requirement |
| Position Accuracy | < 5m horizontal | GPS or better |
| Collision Rate | < 1 per million flight hours | Safety target |

---

## 🔒 Security Considerations

### Threats Addressed
- **GPS Spoofing:** Multi-GNSS verification, IMU fusion
- **Communication Jamming:** Frequency hopping, redundant channels
- **Cyber Attacks:** TLS 1.3, DDoS mitigation, IDS/IPS
- **Privacy Violations:** Data minimization, encryption, GDPR compliance

### Best Practices
1. Enable multi-factor authentication
2. Encrypt all data in transit and at rest
3. Regular security audits and penetration testing
4. Incident response plan with 24-hour notification
5. Supply chain security verification

---

## 🌟 Philosophy

**弘益人間 (Hongik Ingan) - Benefit All Humanity**

WIA-SPACE-021 is designed to ensure UTM technology serves all people, creating safe and sustainable skies for future generations. This standard is:

- **Open:** Free to implement, no licensing fees
- **Inclusive:** Accessible to all nations and organizations
- **Sustainable:** Environmentally responsible and socially beneficial
- **Collaborative:** Built through global cooperation

---

## 📖 Additional Resources

### Standards References
- **ASTM F3411:** Remote ID Specification
- **ASTM F3548:** USS-USS Interoperability
- **RTCA DO-365:** DAA MOPS
- **NASA UTM:** Technical Capability Levels
- **U-space:** EU Regulation 2021/664

### Related WIA Standards
- **WIA-SPACE-001:** Launch Vehicle Safety
- **WIA-SPACE-002:** Satellite Communication
- **WIA-SPACE-010:** Space Debris Management
- **WIA-INTENT:** Intent Expression Framework
- **WIA-OMNI-API:** Universal API Standard

### Community
- GitHub: [https://github.com/WIA-Official/wia-standards](https://github.com/WIA-Official/wia-standards)
- Website: [https://wia.org](https://wia.org)
- Email: standards@wia.org

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-12-26 | Initial release with complete UTM framework |

---

## 📜 License

**Open Standard License**

This standard is freely available for implementation without licensing fees. Commercial and non-commercial use permitted. Attribution appreciated but not required.

---

## 🤝 Contributing

We welcome contributions to improve this standard:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request with detailed description
4. Participate in review process

All contributors will be acknowledged in the standard documentation.

---

## ⚖️ Legal

### Disclaimer
This standard is provided "as is" without warranty of any kind. Implementers are responsible for compliance with local regulations and laws.

### Patent Policy
WIA maintains a royalty-free patent policy. Contributors with essential patents must license them on reasonable and non-discriminatory (RAND-Z) terms.

---

**© 2025 SmileStory Inc. / WIA**

**弘益人間 (Hongik Ingan) · Benefit All Humanity**
