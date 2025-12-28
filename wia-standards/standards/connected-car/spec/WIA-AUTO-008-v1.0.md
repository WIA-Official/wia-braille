# WIA-AUTO-008: Connected Car Specification v1.0

> **Standard ID:** WIA-AUTO-008
> **Version:** 1.0.0
> **Published:** 2025-12-26
> **Status:** Active
> **Authors:** WIA Automotive Research Group

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Telematics Architecture](#2-telematics-architecture)
3. [Connectivity Technologies](#3-connectivity-technologies)
4. [OTA (Over-the-Air) Updates](#4-ota-over-the-air-updates)
5. [Remote Diagnostics](#5-remote-diagnostics)
6. [Data Collection and Privacy](#6-data-collection-and-privacy)
7. [Cloud Platform Integration](#7-cloud-platform-integration)
8. [Data Formats](#8-data-formats)
9. [API Interface](#9-api-interface)
10. [Security Protocols](#10-security-protocols)
11. [References](#11-references)

---

## 1. Introduction

### 1.1 Purpose

This specification defines the technical framework for connected car systems, enabling secure vehicle-to-cloud communication, real-time telemetry, over-the-air updates, and remote diagnostics capabilities.

### 1.2 Scope

The standard covers:
- Vehicle telematics data collection and transmission
- Connectivity protocol specifications
- OTA update procedures and security
- Remote diagnostic capabilities
- Cloud platform integration patterns
- Data privacy and security requirements

### 1.3 Philosophy

**弘益人間 (Benefit All Humanity)** - This standard promotes safer, more efficient, and user-friendly connected vehicles that serve the greater good while respecting privacy and security.

### 1.4 Terminology

- **Telematics**: Remote collection and transmission of vehicle data
- **OTA (Over-the-Air)**: Wireless software/firmware updates
- **TCU (Telematics Control Unit)**: Vehicle's primary connectivity module
- **V2X**: Vehicle-to-Everything communication
- **DTC**: Diagnostic Trouble Code
- **ECU**: Electronic Control Unit
- **VIN**: Vehicle Identification Number

---

## 2. Telematics Architecture

### 2.1 System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Connected Vehicle                     │
├─────────────────────────────────────────────────────────┤
│  Sensors & ECUs                                          │
│  ├── Engine Control Unit (ECU)                          │
│  ├── Battery Management System (BMS)                    │
│  ├── GPS/GNSS Receiver                                  │
│  ├── OBD-II Interface                                   │
│  └── Environmental Sensors                              │
├─────────────────────────────────────────────────────────┤
│  Telematics Control Unit (TCU)                          │
│  ├── Data Aggregation                                   │
│  ├── Protocol Translation                               │
│  ├── Security Module                                    │
│  └── Communication Stack                                │
├─────────────────────────────────────────────────────────┤
│  Connectivity Layer                                      │
│  ├── 4G/5G Cellular                                     │
│  ├── WiFi (802.11ac/ax)                                 │
│  ├── Bluetooth (BLE 5.0+)                               │
│  └── V2X (DSRC/C-V2X)                                   │
└─────────────────────────────────────────────────────────┘
                         ↕
┌─────────────────────────────────────────────────────────┐
│                    Cloud Platform                        │
├─────────────────────────────────────────────────────────┤
│  Ingestion Layer                                         │
│  ├── MQTT/AMQP Broker                                   │
│  ├── HTTP/REST Gateway                                  │
│  └── WebSocket Server                                   │
├─────────────────────────────────────────────────────────┤
│  Processing Layer                                        │
│  ├── Stream Processing                                  │
│  ├── Data Validation                                    │
│  ├── Analytics Engine                                   │
│  └── ML/AI Models                                       │
├─────────────────────────────────────────────────────────┤
│  Storage Layer                                           │
│  ├── Time-Series Database                               │
│  ├── Document Store                                     │
│  ├── Object Storage                                     │
│  └── Data Warehouse                                     │
├─────────────────────────────────────────────────────────┤
│  Application Layer                                       │
│  ├── Fleet Management                                   │
│  ├── Remote Diagnostics                                 │
│  ├── OTA Updates                                        │
│  └── User Applications                                  │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Data Flow Architecture

#### 2.2.1 Upstream (Vehicle to Cloud)

```
1. Sensor Reading → ECU Processing
2. ECU → CAN Bus → TCU
3. TCU → Data Aggregation
4. TCU → Data Compression
5. TCU → Encryption (TLS 1.3)
6. TCU → Cellular/WiFi → Cloud
7. Cloud → Ingestion → Validation
8. Cloud → Processing → Storage
```

#### 2.2.2 Downstream (Cloud to Vehicle)

```
1. Cloud → Command Generation
2. Cloud → Authentication & Authorization
3. Cloud → Encryption (TLS 1.3)
4. Cloud → Delivery via Cellular/WiFi
5. TCU → Signature Verification
6. TCU → Command Execution
7. TCU → Acknowledgment → Cloud
8. Cloud → Status Update
```

### 2.3 Telematics Control Unit (TCU) Requirements

#### 2.3.1 Hardware Requirements

- **Processor**: ARM Cortex-A series or equivalent (≥1 GHz dual-core)
- **Memory**: ≥512 MB RAM, ≥4 GB Flash
- **Connectivity**: 4G/5G modem, WiFi, Bluetooth, GNSS
- **Security**: Hardware security module (HSM) or TPM 2.0
- **Interfaces**: CAN, LIN, Ethernet, USB

#### 2.3.2 Software Requirements

- **Operating System**: Linux-based (Automotive Grade Linux recommended)
- **Security**: Secure boot, encrypted storage, certificate management
- **Protocols**: MQTT, HTTPS, WebSocket, CoAP
- **Standards**: ISO 26262 (functional safety), ASPICE compliance

---

## 3. Connectivity Technologies

### 3.1 Cellular (4G/5G)

#### 3.1.1 LTE (4G) Specifications

- **Bands**: Support for regional LTE bands
- **Throughput**:
  - Downlink: Up to 150 Mbps (Cat 4+)
  - Uplink: Up to 50 Mbps
- **Latency**: 30-50 ms typical
- **Use Cases**: Telematics, OTA updates, navigation

#### 3.1.2 5G NR Specifications

- **Bands**: Sub-6 GHz and mmWave support
- **Throughput**:
  - Downlink: Up to 10 Gbps
  - Uplink: Up to 1 Gbps
- **Latency**: <10 ms (URLLC mode: <1 ms)
- **Use Cases**: HD mapping, V2X, streaming, autonomous driving

### 3.2 WiFi (802.11)

#### 3.2.1 WiFi 5 (802.11ac)

- **Frequency**: 5 GHz
- **Bandwidth**: Up to 1.3 Gbps
- **Range**: 50-100 meters (indoor)
- **Use Cases**: Local OTA updates, diagnostics

#### 3.2.2 WiFi 6 (802.11ax)

- **Frequency**: 2.4 GHz / 5 GHz
- **Bandwidth**: Up to 9.6 Gbps (theoretical)
- **Range**: Similar to 802.11ac with better efficiency
- **Use Cases**: High-speed updates, media streaming

### 3.3 Bluetooth Low Energy (BLE)

#### 3.3.1 BLE 5.0+ Specifications

- **Range**: Up to 240 meters (outdoor)
- **Bandwidth**: 2 Mbps
- **Power**: Ultra-low power consumption
- **Use Cases**: Phone pairing, digital key, beacon communication

### 3.4 V2X (Vehicle-to-Everything)

#### 3.4.1 DSRC (Dedicated Short-Range Communications)

- **Frequency**: 5.9 GHz (ITS band)
- **Range**: Up to 300 meters
- **Latency**: <50 ms
- **Bandwidth**: 27 Mbps
- **Use Cases**: V2V collision avoidance, V2I traffic signals

#### 3.4.2 C-V2X (Cellular V2X)

- **Technology**: Based on LTE/5G
- **Modes**:
  - Direct communication (PC5)
  - Network communication (Uu)
- **Range**: Up to 1 km
- **Use Cases**: Advanced safety, cooperative driving, platooning

### 3.5 Satellite (GNSS)

#### 3.5.1 Supported Systems

- **GPS**: US Global Positioning System
- **GLONASS**: Russian satellite navigation
- **Galileo**: European GNSS
- **BeiDou**: Chinese navigation system
- **QZSS**: Japanese regional system

#### 3.5.2 Accuracy Requirements

- **Standard**: ±5 meters (horizontal)
- **DGPS/SBAS**: ±1 meter
- **RTK**: ±2 cm (with corrections)

---

## 4. OTA (Over-the-Air) Updates

### 4.1 Update Types

#### 4.1.1 Software Updates

```
Category: Application Layer
Components:
  - Infotainment system
  - Navigation software
  - Mobile app integration
  - User interface
  - Voice recognition

Size: 100 MB - 2 GB
Frequency: Monthly to quarterly
Risk Level: Low
Rollback: Supported
```

#### 4.1.2 Firmware Updates

```
Category: System Layer
Components:
  - ECU firmware
  - TCU firmware
  - Gateway modules
  - ADAS controllers
  - Battery management

Size: 10 MB - 500 MB
Frequency: Quarterly to annually
Risk Level: Medium to High
Rollback: Required
```

#### 4.1.3 Configuration Updates

```
Category: Settings Layer
Components:
  - Vehicle parameters
  - Feature flags
  - Regional settings
  - User preferences

Size: < 1 MB
Frequency: As needed
Risk Level: Low
Rollback: Optional
```

### 4.2 OTA Update Process

#### 4.2.1 Update Lifecycle

```
Phase 1: Discovery
  └─> Cloud: Publish new update
  └─> Vehicle: Poll for updates (or push notification)
  └─> Vehicle: Check compatibility
  └─> Vehicle: Notify user

Phase 2: Download
  └─> Vehicle: Request update package
  └─> Cloud: Authenticate vehicle
  └─> Cloud: Stream encrypted package
  └─> Vehicle: Verify integrity (hash)
  └─> Vehicle: Store in secure partition

Phase 3: Verification
  └─> Vehicle: Verify digital signature
  └─> Vehicle: Check dependencies
  └─> Vehicle: Validate platform compatibility
  └─> Vehicle: Create rollback point

Phase 4: Installation
  └─> Vehicle: Enter update mode
  └─> Vehicle: Flash new firmware/software
  └─> Vehicle: Perform post-install checks
  └─> Vehicle: Reboot if required

Phase 5: Validation
  └─> Vehicle: Boot with new version
  └─> Vehicle: Run system checks
  └─> Vehicle: Report status to cloud
  └─> Cloud: Mark update complete/failed

Phase 6: Rollback (if needed)
  └─> Vehicle: Detect boot failure
  └─> Vehicle: Restore previous version
  └─> Vehicle: Report failure to cloud
  └─> Cloud: Investigate and retry
```

#### 4.2.2 Update Package Format

```json
{
  "packageId": "PKG-2025-001-ECU-FW",
  "version": "2.5.0",
  "releaseDate": "2025-01-15T00:00:00Z",
  "targetComponent": "engine_ecu",
  "packageType": "firmware",
  "signature": {
    "algorithm": "RSA-4096",
    "value": "base64-encoded-signature",
    "certificate": "base64-encoded-cert"
  },
  "encryption": {
    "algorithm": "AES-256-GCM",
    "keyFingerprint": "sha256-hash"
  },
  "integrity": {
    "algorithm": "SHA-256",
    "checksum": "hex-encoded-hash"
  },
  "compatibility": {
    "vehicleModels": ["Model-X", "Model-Y"],
    "minHardwareVersion": "1.0",
    "dependencies": ["TCU-FW >= 3.0.0"]
  },
  "metadata": {
    "size": 52428800,
    "downloadUrl": "https://ota.example.com/packages/PKG-2025-001",
    "releaseNotes": "Improved fuel efficiency and performance",
    "criticality": "recommended"
  }
}
```

### 4.3 Security Requirements

#### 4.3.1 Code Signing

- **Algorithm**: RSA-4096 or ECDSA P-384
- **Certificate Chain**: Root CA → Intermediate CA → Signing Certificate
- **Validation**: Full chain verification required
- **Expiration**: Monitor certificate validity

#### 4.3.2 Encryption

- **Transport**: TLS 1.3 with perfect forward secrecy
- **Package**: AES-256-GCM
- **Key Management**: Hardware-backed key storage (HSM/TPM)
- **Key Rotation**: Annual or on compromise

#### 4.3.3 Integrity Verification

- **Algorithm**: SHA-256 or SHA-3
- **Scope**: Entire update package
- **Timing**: Before and after download
- **Failure Action**: Reject and report

### 4.4 Update Strategies

#### 4.4.1 Phased Rollout

```
Phase 1: Internal Testing (1-2 days)
  └─> Deploy to test fleet
  └─> Monitor for issues

Phase 2: Limited Release (3-7 days)
  └─> Deploy to 1-5% of fleet
  └─> Monitor telemetry

Phase 3: Gradual Expansion (1-2 weeks)
  └─> Deploy to 10%, 25%, 50% of fleet
  └─> Continue monitoring

Phase 4: Full Deployment (1-4 weeks)
  └─> Deploy to entire fleet
  └─> Final validation
```

#### 4.4.2 Rollback Mechanisms

1. **Automatic Rollback**
   - Boot failure detection
   - System health check failures
   - Rollback within 3 boot attempts

2. **Manual Rollback**
   - User-initiated via UI
   - Remote-initiated via cloud
   - Service center rollback

3. **Dual-Bank Flashing**
   - Active bank (current version)
   - Inactive bank (new version)
   - Atomic switch on success

---

## 5. Remote Diagnostics

### 5.1 Diagnostic Levels

#### 5.1.1 Basic Diagnostics

**Frequency**: Continuous or on-demand

```typescript
interface BasicDiagnostics {
  battery: {
    voltage: number;           // Volts
    current: number;           // Amperes
    stateOfCharge: number;     // Percentage
    health: number;            // Percentage
  };
  fluids: {
    engineOil: 'ok' | 'low' | 'critical';
    coolant: 'ok' | 'low' | 'critical';
    washerFluid: 'ok' | 'low' | 'empty';
    brakeFluid: 'ok' | 'low' | 'critical';
  };
  tires: {
    frontLeft: { pressure: number; temperature: number };
    frontRight: { pressure: number; temperature: number };
    rearLeft: { pressure: number; temperature: number };
    rearRight: { pressure: number; temperature: number };
  };
  warningLights: string[];     // Active warning codes
}
```

#### 5.1.2 Standard Diagnostics

**Frequency**: Daily or on-demand

```typescript
interface StandardDiagnostics extends BasicDiagnostics {
  dtcs: DiagnosticTroubleCode[];
  sensors: {
    maf: number;               // Mass Air Flow (g/s)
    o2: number;                // Oxygen sensor (λ)
    map: number;               // Manifold pressure (kPa)
    iat: number;               // Intake air temp (°C)
    ect: number;               // Engine coolant temp (°C)
  };
  performance: {
    fuelConsumption: number;   // L/100km or MPG
    range: number;             // km remaining
    efficiency: number;        // Percentage
  };
}
```

#### 5.1.3 Comprehensive Diagnostics

**Frequency**: Weekly or on-demand

```typescript
interface ComprehensiveDiagnostics extends StandardDiagnostics {
  predictiveMaintenance: {
    component: string;
    currentCondition: number;  // Percentage
    estimatedLife: number;     // Days until service
    severity: 'low' | 'medium' | 'high' | 'critical';
    recommendation: string;
  }[];
  componentWear: {
    brakePads: number;         // mm remaining
    tireDepth: number;         // mm remaining
    batteryHealth: number;     // Percentage
    filterLife: number;        // Days remaining
  };
  systemHealth: {
    engine: number;            // Health score 0-100
    transmission: number;
    brakes: number;
    suspension: number;
    electrical: number;
  };
}
```

### 5.2 Diagnostic Trouble Codes (DTCs)

#### 5.2.1 DTC Format (OBD-II Standard)

```
Format: [System][Type][Component][Specific Code]

Example: P0420
  P = Powertrain
  0 = Generic (SAE standard)
  4 = Emission control
  20 = Catalyst system efficiency below threshold

Systems:
  P = Powertrain (engine, transmission)
  C = Chassis (ABS, suspension)
  B = Body (airbags, climate)
  U = Network (communication)

Type:
  0 = Generic (SAE)
  1 = Manufacturer-specific
  2 = Generic (SAE)
  3 = Manufacturer-specific
```

#### 5.2.2 DTC Severity Classification

```
Critical (Priority 1):
  - Engine failure
  - Brake system failure
  - Airbag malfunction
  - Loss of vehicle control
  Action: Immediate service required

High (Priority 2):
  - Emission system failure
  - Transmission issues
  - Significant power loss
  - Safety system degradation
  Action: Service within 48 hours

Medium (Priority 3):
  - Minor sensor failures
  - Non-critical system degradation
  - Efficiency reduction
  Action: Service within 1 week

Low (Priority 4):
  - Informational codes
  - Intermittent issues
  - Preventive warnings
  Action: Service at next maintenance
```

### 5.3 Predictive Maintenance

#### 5.3.1 Machine Learning Models

**Brake Pad Wear Prediction**

```python
# Input Features
features = [
  'current_thickness_mm',
  'vehicle_weight_kg',
  'avg_speed_kmh',
  'braking_events_per_day',
  'harsh_braking_percentage',
  'distance_driven_km',
  'terrain_type'  # urban, highway, mountain
]

# Output
prediction = {
  'days_until_replacement': 45,
  'confidence': 0.87,
  'recommendation': 'Schedule service in 30 days'
}
```

**Battery Health Prediction**

```python
# Input Features
features = [
  'state_of_health_percentage',
  'charge_cycles',
  'avg_temperature_celsius',
  'depth_of_discharge_avg',
  'age_months',
  'fast_charge_percentage'
]

# Output
prediction = {
  'remaining_useful_life_months': 18,
  'degradation_rate': 0.02,  # per month
  'confidence': 0.92
}
```

#### 5.3.2 Anomaly Detection

**Real-Time Anomaly Detection**

```
Algorithm: Isolation Forest / LSTM Autoencoder

Monitored Parameters:
  - Engine temperature anomalies
  - Vibration pattern changes
  - Fuel consumption spikes
  - Battery voltage fluctuations
  - Sensor reading outliers

Alert Threshold: 3 standard deviations
Response Time: < 1 second
False Positive Rate: < 5%
```

---

## 6. Data Collection and Privacy

### 6.1 Data Categories

#### 6.1.1 Personal Data (PII)

```
Category: Identifiable Information
Data Points:
  - Vehicle Identification Number (VIN)
  - Owner name and contact
  - Driver profile
  - Biometric data (if applicable)

Privacy Level: High
Consent: Explicit required
Retention: User-controlled
Anonymization: Required for analytics
```

#### 6.1.2 Location Data

```
Category: Geospatial Information
Data Points:
  - GPS coordinates
  - Trip history
  - Frequent destinations
  - Speed and direction

Privacy Level: High
Consent: Explicit required
Retention: 30-90 days (configurable)
Anonymization: Required after retention period
```

#### 6.1.3 Vehicle Telemetry

```
Category: Technical Data
Data Points:
  - Speed, acceleration, braking
  - Fuel/battery consumption
  - Engine parameters
  - System diagnostics

Privacy Level: Medium
Consent: Opt-out allowed
Retention: 1-3 years
Anonymization: Recommended
```

#### 6.1.4 Usage Patterns

```
Category: Behavioral Data
Data Points:
  - Driving behavior
  - Feature usage
  - Infotainment preferences
  - Charging/refueling patterns

Privacy Level: Medium
Consent: Opt-out allowed
Retention: 1 year
Anonymization: Required
```

### 6.2 Privacy Compliance

#### 6.2.1 GDPR (General Data Protection Regulation)

**Principles**:
1. **Lawfulness, Fairness, Transparency**: Clear consent and disclosure
2. **Purpose Limitation**: Data used only for stated purposes
3. **Data Minimization**: Collect only necessary data
4. **Accuracy**: Keep data accurate and up-to-date
5. **Storage Limitation**: Delete data when no longer needed
6. **Integrity and Confidentiality**: Secure data protection
7. **Accountability**: Demonstrate compliance

**User Rights**:
- Right to access
- Right to rectification
- Right to erasure ("right to be forgotten")
- Right to data portability
- Right to object
- Right to restrict processing

#### 6.2.2 CCPA (California Consumer Privacy Act)

**Requirements**:
- Disclose data collection practices
- Allow opt-out of data sales
- Provide data access upon request
- Enable data deletion
- Non-discrimination for privacy choices

#### 6.2.3 Data Anonymization Techniques

**K-Anonymity**:
```
Technique: Generalization and Suppression
K Value: ≥ 3 (each record indistinguishable from at least 2 others)
Application: Trip data, driver behavior
```

**Differential Privacy**:
```
Technique: Add statistical noise
ε (epsilon): 0.1 - 1.0 (privacy budget)
Application: Aggregate analytics
```

**Pseudonymization**:
```
Technique: Replace identifiers with pseudonyms
Reversibility: Possible with key (kept separate)
Application: VIN hashing for analytics
```

### 6.3 Consent Management

#### 6.3.1 Consent Levels

```typescript
enum ConsentLevel {
  REQUIRED = 'required',          // Essential functions
  OPTIONAL_SERVICE = 'optional',  // Enhanced features
  ANALYTICS = 'analytics',        // Usage analytics
  MARKETING = 'marketing',        // Promotional content
  THIRD_PARTY = 'third_party'     // Partner services
}

interface ConsentPreferences {
  vehicleId: string;
  userId: string;
  consents: {
    level: ConsentLevel;
    granted: boolean;
    timestamp: Date;
    expiresAt?: Date;
  }[];
  lastUpdated: Date;
}
```

#### 6.3.2 Consent User Interface

**Requirements**:
- Clear, plain language descriptions
- Granular control per data category
- Easy opt-in/opt-out mechanism
- Accessible from vehicle and mobile app
- Audit trail of consent changes

---

## 7. Cloud Platform Integration

### 7.1 Cloud Architecture Patterns

#### 7.1.1 Microservices Architecture

```
Service Catalog:
├── Ingestion Service
│   └── MQTT/HTTP endpoint for telemetry
├── Authentication Service
│   └── Vehicle and user authentication
├── Telemetry Service
│   └── Process and store vehicle data
├── Diagnostics Service
│   └── Analyze health and predict issues
├── OTA Service
│   └── Manage update packages and delivery
├── Notification Service
│   └── Push alerts to users
├── Analytics Service
│   └── Generate insights and reports
└── API Gateway
    └── Expose REST/GraphQL APIs
```

#### 7.1.2 Event-Driven Architecture

```
Event Flow:
1. Vehicle sends event → Event Bus (Kafka/Kinesis)
2. Event consumed by multiple services
3. Services process independently
4. Services emit new events
5. Aggregate results for user applications

Event Types:
  - Telemetry.DataPoint
  - Diagnostics.DTCDetected
  - OTA.UpdateAvailable
  - Alert.CriticalWarning
  - User.CommandReceived
```

### 7.2 Supported Cloud Platforms

#### 7.2.1 AWS IoT Core

**Components**:
- **IoT Device Gateway**: MQTT, WebSocket, HTTPS
- **Device Shadow**: Virtual device state
- **Rules Engine**: Route and transform messages
- **Fleet Indexing**: Search and aggregate fleet data
- **Jobs**: Manage OTA updates

**Integration**:
```typescript
const config = {
  endpoint: 'xxxxx.iot.us-east-1.amazonaws.com',
  clientId: `vehicle-${vin}`,
  protocol: 'mqtts',
  port: 8883,
  certificate: '/path/to/device-cert.pem',
  privateKey: '/path/to/private-key.pem',
  caCert: '/path/to/root-ca.pem'
};
```

#### 7.2.2 Azure IoT Hub

**Components**:
- **Device-to-Cloud**: Telemetry ingestion
- **Cloud-to-Device**: Commands and notifications
- **Device Twins**: Device state management
- **Direct Methods**: Synchronous device control
- **Automatic Device Management**: OTA updates

**Integration**:
```typescript
const config = {
  connectionString: 'HostName=xxxxx.azure-devices.net;DeviceId=vehicle-${vin};SharedAccessKey=xxxxx',
  protocol: 'amqp', // or 'mqtt', 'https'
};
```

#### 7.2.3 Google Cloud IoT Core

**Note**: Google Cloud IoT Core was retired August 16, 2023.
**Alternative**: Use Google Cloud Pub/Sub + Compute

**Components**:
- **Pub/Sub**: Message broker
- **Dataflow**: Stream processing
- **BigQuery**: Data warehousing
- **Cloud Functions**: Event processing

### 7.3 Communication Protocols

#### 7.3.1 MQTT (Message Queuing Telemetry Transport)

**Specifications**:
- **Version**: MQTT 3.1.1 or 5.0
- **QoS Levels**:
  - QoS 0: At most once
  - QoS 1: At least once (recommended for telemetry)
  - QoS 2: Exactly once (for critical commands)
- **Topic Structure**:
  ```
  vehicles/{vin}/telemetry/location
  vehicles/{vin}/telemetry/diagnostics
  vehicles/{vin}/commands/lock
  vehicles/{vin}/events/alert
  ```

**Advantages**:
- Lightweight protocol
- Low bandwidth usage
- Bi-directional communication
- Built-in QoS levels

#### 7.3.2 HTTPS/REST

**Specifications**:
- **Version**: HTTP/2 or HTTP/3
- **Security**: TLS 1.3
- **Methods**: GET, POST, PUT, DELETE
- **Authentication**: OAuth 2.0 or JWT

**Endpoint Examples**:
```
POST   /v1/vehicles/{vin}/telemetry
GET    /v1/vehicles/{vin}/status
POST   /v1/vehicles/{vin}/diagnostics/run
GET    /v1/vehicles/{vin}/ota/updates
POST   /v1/vehicles/{vin}/ota/install
```

**Advantages**:
- Widely supported
- Human-readable
- Stateless
- Cacheable

#### 7.3.3 WebSocket

**Specifications**:
- **Protocol**: RFC 6455
- **Security**: WSS (WebSocket Secure)
- **Use Cases**: Real-time streaming, bidirectional communication

**Connection**:
```javascript
const ws = new WebSocket('wss://api.example.com/vehicles/VIN123/stream');
ws.onmessage = (event) => {
  const telemetry = JSON.parse(event.data);
  console.log('Real-time data:', telemetry);
};
```

#### 7.3.4 CoAP (Constrained Application Protocol)

**Specifications**:
- **Transport**: UDP
- **Security**: DTLS
- **Use Cases**: Resource-constrained devices

**Advantages**:
- Low overhead
- Efficient for IoT
- Similar to HTTP semantics

---

## 8. Data Formats

### 8.1 Telemetry Data Format

#### 8.1.1 JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "VehicleTelemetry",
  "type": "object",
  "required": ["vehicleId", "timestamp", "location", "status"],
  "properties": {
    "vehicleId": {
      "type": "string",
      "pattern": "^[A-HJ-NPR-Z0-9]{17}$",
      "description": "Vehicle Identification Number (VIN)"
    },
    "timestamp": {
      "type": "string",
      "format": "date-time",
      "description": "ISO 8601 timestamp"
    },
    "location": {
      "type": "object",
      "required": ["latitude", "longitude"],
      "properties": {
        "latitude": { "type": "number", "minimum": -90, "maximum": 90 },
        "longitude": { "type": "number", "minimum": -180, "maximum": 180 },
        "altitude": { "type": "number" },
        "heading": { "type": "number", "minimum": 0, "maximum": 360 },
        "speed": { "type": "number", "minimum": 0 }
      }
    },
    "status": {
      "type": "object",
      "properties": {
        "ignition": { "type": "boolean" },
        "odometer": { "type": "number" },
        "fuelLevel": { "type": "number", "minimum": 0, "maximum": 100 },
        "batteryVoltage": { "type": "number" },
        "engineRpm": { "type": "number", "minimum": 0 }
      }
    },
    "diagnostics": {
      "type": "object",
      "properties": {
        "dtcs": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "code": { "type": "string" },
              "description": { "type": "string" },
              "severity": {
                "type": "string",
                "enum": ["critical", "high", "medium", "low"]
              }
            }
          }
        }
      }
    }
  }
}
```

#### 8.1.2 Example Telemetry Message

```json
{
  "vehicleId": "1HGBH41JXMN109186",
  "timestamp": "2025-12-26T10:30:00Z",
  "location": {
    "latitude": 37.7749,
    "longitude": -122.4194,
    "altitude": 15.5,
    "heading": 270,
    "speed": 65.5
  },
  "status": {
    "ignition": true,
    "odometer": 45230.5,
    "fuelLevel": 62.3,
    "batteryVoltage": 12.6,
    "engineRpm": 2150,
    "engineTemp": 92,
    "tirePressure": {
      "frontLeft": 35,
      "frontRight": 35,
      "rearLeft": 34,
      "rearRight": 34
    }
  },
  "diagnostics": {
    "dtcs": [],
    "warnings": []
  },
  "metadata": {
    "firmwareVersion": "2.5.0",
    "tcuSerial": "TCU-20241015-001",
    "dataVersion": "1.0"
  }
}
```

### 8.2 Protocol Buffers (Protobuf)

**Advantages**:
- Compact binary format
- 3-10x smaller than JSON
- Faster serialization/deserialization
- Schema evolution support

```protobuf
syntax = "proto3";

message VehicleTelemetry {
  string vehicle_id = 1;
  int64 timestamp = 2;

  message Location {
    double latitude = 1;
    double longitude = 2;
    double altitude = 3;
    double heading = 4;
    double speed = 5;
  }
  Location location = 3;

  message Status {
    bool ignition = 1;
    double odometer = 2;
    double fuel_level = 3;
    double battery_voltage = 4;
    int32 engine_rpm = 5;
  }
  Status status = 4;

  message Diagnostics {
    repeated string dtc_codes = 1;
  }
  Diagnostics diagnostics = 5;
}
```

---

## 9. API Interface

### 9.1 REST API Specification

#### 9.1.1 Authentication

**OAuth 2.0 Flow**:
```
1. Client → Authorization Server: Request access token
2. Authorization Server → Client: Access token + refresh token
3. Client → API: Request with Bearer token
4. API → Client: Response
```

**Headers**:
```http
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
X-API-Version: 1.0
```

#### 9.1.2 Endpoints

**Vehicle Telemetry**

```http
POST /v1/vehicles/{vin}/telemetry
Content-Type: application/json

{
  "timestamp": "2025-12-26T10:30:00Z",
  "location": { "latitude": 37.7749, "longitude": -122.4194 },
  "status": { "speed": 65.5, "fuelLevel": 62.3 }
}

Response: 201 Created
{
  "id": "tel-123456",
  "status": "accepted",
  "timestamp": "2025-12-26T10:30:01Z"
}
```

**Vehicle Status**

```http
GET /v1/vehicles/{vin}/status

Response: 200 OK
{
  "vehicleId": "1HGBH41JXMN109186",
  "lastSeen": "2025-12-26T10:30:00Z",
  "location": { "latitude": 37.7749, "longitude": -122.4194 },
  "status": {
    "ignition": true,
    "locked": false,
    "fuelLevel": 62.3,
    "batteryVoltage": 12.6,
    "odometer": 45230.5
  },
  "health": {
    "overallScore": 92,
    "issues": []
  }
}
```

**Remote Diagnostics**

```http
POST /v1/vehicles/{vin}/diagnostics/run
Content-Type: application/json

{
  "level": "comprehensive",
  "systems": ["engine", "battery", "transmission"]
}

Response: 202 Accepted
{
  "jobId": "diag-789012",
  "status": "running",
  "estimatedCompletionTime": "2025-12-26T10:35:00Z"
}

GET /v1/vehicles/{vin}/diagnostics/jobs/{jobId}

Response: 200 OK
{
  "jobId": "diag-789012",
  "status": "completed",
  "results": {
    "healthScore": 92,
    "issues": [],
    "recommendations": ["Schedule oil change in 500 km"]
  }
}
```

**OTA Updates**

```http
GET /v1/vehicles/{vin}/ota/updates

Response: 200 OK
{
  "updates": [
    {
      "packageId": "PKG-2025-001",
      "version": "2.5.0",
      "component": "infotainment",
      "size": 524288000,
      "releaseDate": "2025-01-15T00:00:00Z",
      "criticality": "recommended",
      "releaseNotes": "Bug fixes and performance improvements"
    }
  ]
}

POST /v1/vehicles/{vin}/ota/install
Content-Type: application/json

{
  "packageId": "PKG-2025-001",
  "scheduleAt": "2025-12-27T02:00:00Z"
}

Response: 202 Accepted
{
  "jobId": "ota-345678",
  "status": "scheduled",
  "scheduledTime": "2025-12-27T02:00:00Z"
}
```

### 9.2 GraphQL API

**Schema**:
```graphql
type Query {
  vehicle(vin: String!): Vehicle
  vehicles(filter: VehicleFilter): [Vehicle!]!
}

type Mutation {
  updateTelemetry(vin: String!, data: TelemetryInput!): TelemetryResponse
  runDiagnostics(vin: String!, level: DiagnosticLevel!): DiagnosticJob
  installOTAUpdate(vin: String!, packageId: String!): OTAJob
}

type Subscription {
  telemetryStream(vin: String!): Telemetry
  diagnosticUpdates(vin: String!): DiagnosticUpdate
}

type Vehicle {
  vin: String!
  model: String!
  year: Int!
  status: VehicleStatus!
  location: Location!
  health: VehicleHealth!
  telemetry(since: DateTime): [Telemetry!]!
}
```

**Example Query**:
```graphql
query GetVehicleStatus($vin: String!) {
  vehicle(vin: $vin) {
    vin
    status {
      ignition
      locked
      fuelLevel
      batteryVoltage
    }
    location {
      latitude
      longitude
      speed
    }
    health {
      overallScore
      issues {
        code
        severity
        description
      }
    }
  }
}
```

---

## 10. Security Protocols

### 10.1 Authentication and Authorization

#### 10.1.1 Vehicle Authentication

**Certificate-Based (PKI)**:
```
1. Manufacturing: Provision unique certificate per vehicle
2. Storage: Store in HSM/TPM
3. Connection: Mutual TLS (mTLS) authentication
4. Validation: Cloud verifies certificate chain
5. Renewal: Automatic before expiration
```

**Token-Based (OAuth 2.0)**:
```
1. Vehicle → Auth Server: Client credentials grant
2. Auth Server → Vehicle: JWT access token
3. Vehicle → API: Bearer token in header
4. Token Refresh: Before expiration
```

#### 10.1.2 User Authentication

**Multi-Factor Authentication (MFA)**:
```
Factor 1: Password or PIN
Factor 2: SMS/TOTP code or biometric
Factor 3 (optional): Physical key or trusted device
```

**Single Sign-On (SSO)**:
- SAML 2.0
- OpenID Connect (OIDC)
- OAuth 2.0

### 10.2 Encryption

#### 10.2.1 Transport Layer Security

**TLS 1.3 Configuration**:
```
Cipher Suites (Recommended):
  - TLS_AES_256_GCM_SHA384
  - TLS_CHACHA20_POLY1305_SHA256
  - TLS_AES_128_GCM_SHA256

Perfect Forward Secrecy: Required
Session Resumption: Allowed (with restrictions)
Renegotiation: Disabled
Compression: Disabled (CRIME vulnerability)
```

#### 10.2.2 Data Encryption

**At Rest**:
- **Algorithm**: AES-256-GCM
- **Key Management**: AWS KMS, Azure Key Vault, or HSM
- **Key Rotation**: Annual or on compromise

**In Transit**:
- **Protocol**: TLS 1.3
- **Mutual TLS**: For vehicle-cloud communication
- **Certificate Pinning**: Prevent MITM attacks

### 10.3 Intrusion Detection and Prevention

#### 10.3.1 Vehicle-Side IDS

**Monitored Events**:
- Unauthorized access attempts
- Abnormal CAN bus traffic
- Unexpected firmware modifications
- Anomalous sensor readings
- Repeated authentication failures

**Response Actions**:
- Log event
- Alert cloud platform
- Rate limit connections
- Temporary lockdown
- Notify user

#### 10.3.2 Cloud-Side IDS

**Monitored Events**:
- Unusual API request patterns
- Geographic anomalies
- Impossible travel scenarios
- Brute force attempts
- Data exfiltration patterns

**Response Actions**:
- Block IP address
- Require re-authentication
- Escalate to security team
- Notify vehicle owner

### 10.4 Compliance Standards

#### 10.4.1 ISO 27001 (Information Security)

- Risk assessment and management
- Security policies and procedures
- Access control
- Incident management
- Business continuity

#### 10.4.2 UNECE WP.29 (Cybersecurity)

**Requirements**:
- Risk assessment (TARA - Threat Analysis and Risk Assessment)
- Security by design
- Secure software updates
- Cybersecurity monitoring
- Incident response

#### 10.4.3 SAE J3061 (Cybersecurity Guidebook)

**Lifecycle Phases**:
1. Concept
2. Product Development
3. Production
4. Operations and Maintenance
5. Decommissioning

---

## 11. References

### 11.1 Standards and Specifications

- **ISO 26262**: Functional Safety for Road Vehicles
- **ISO/SAE 21434**: Cybersecurity Engineering
- **UNECE WP.29**: Cybersecurity and Software Update Regulations
- **SAE J3061**: Cybersecurity Guidebook for Cyber-Physical Systems
- **SAE J1979**: E/E Diagnostic Test Modes (OBD-II)
- **ISO 14229**: Unified Diagnostic Services (UDS)
- **ISO 15765**: Diagnostic Communication over CAN
- **MQTT 3.1.1 / 5.0**: MQTT Protocol Specifications
- **IEEE 802.11**: WiFi Standards
- **3GPP TS 23.285**: V2X Services

### 11.2 Connectivity Standards

- **4G LTE**: 3GPP Release 8-15
- **5G NR**: 3GPP Release 15+
- **C-V2X**: 3GPP Release 14-16
- **DSRC**: IEEE 802.11p, SAE J2735
- **Bluetooth**: Bluetooth Core Specification 5.0+

### 11.3 Security Standards

- **TLS 1.3**: RFC 8446
- **OAuth 2.0**: RFC 6749
- **JWT**: RFC 7519
- **X.509**: Public Key Infrastructure
- **NIST Cybersecurity Framework**: CSF v1.1

### 11.4 Privacy Regulations

- **GDPR**: EU General Data Protection Regulation
- **CCPA**: California Consumer Privacy Act
- **LGPD**: Brazilian General Data Protection Law
- **PIPEDA**: Canadian Personal Information Protection

### 11.5 WIA Standards

- **WIA-INTENT**: Intent-based interfaces
- **WIA-OMNI-API**: Universal API gateway
- **WIA-SOCIAL**: Social coordination protocols
- **WIA-QUANTUM**: Quantum-safe cryptography

---

## Appendix A: Example Implementations

### A.1 Telemetry Collection

```typescript
import { ConnectedCarSDK } from '@wia/auto-008';

const sdk = new ConnectedCarSDK({
  vehicleId: '1HGBH41JXMN109186',
  apiKey: process.env.API_KEY
});

// Start continuous telemetry collection
sdk.startTelemetryCollection({
  interval: 5000, // 5 seconds
  includeLocation: true,
  includeDiagnostics: true,
  onData: async (data) => {
    console.log('Telemetry:', data);

    // Check for critical warnings
    if (data.diagnostics?.dtcs?.some(dtc => dtc.severity === 'critical')) {
      await sdk.sendAlert({
        type: 'critical_dtc',
        message: 'Critical diagnostic issue detected',
        dtcs: data.diagnostics.dtcs
      });
    }
  },
  onError: (error) => {
    console.error('Telemetry error:', error);
  }
});
```

### A.2 OTA Update Installation

```bash
#!/bin/bash
# OTA Update Script

VIN="1HGBH41JXMN109186"

# Check for updates
echo "Checking for OTA updates..."
UPDATES=$(wia-auto-008 ota-check --vin $VIN --format json)

if [ $(echo $UPDATES | jq '.updates | length') -gt 0 ]; then
  PACKAGE_ID=$(echo $UPDATES | jq -r '.updates[0].packageId')

  echo "Update available: $PACKAGE_ID"
  echo "Downloading and installing..."

  wia-auto-008 ota-install \
    --vin $VIN \
    --package $PACKAGE_ID \
    --auto-rollback

  echo "Update completed successfully"
else
  echo "No updates available"
fi
```

---

**弘益人間 (홍익인간) · Benefit All Humanity**

*WIA-AUTO-008 Specification v1.0*
*© 2025 SmileStory Inc. / WIA*
*MIT License*
