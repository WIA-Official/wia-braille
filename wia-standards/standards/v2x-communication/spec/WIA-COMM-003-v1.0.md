# WIA-COMM-003: V2X Communication Specification v1.0

> **Standard ID:** WIA-COMM-003
> **Version:** 1.0.0
> **Published:** 2025-12-26
> **Status:** Active
> **Authors:** WIA Communication Research Group

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [V2X Communication Architecture](#2-v2x-communication-architecture)
3. [Technology Standards](#3-technology-standards)
4. [Message Formats](#4-message-formats)
5. [V2V (Vehicle-to-Vehicle)](#5-v2v-vehicle-to-vehicle)
6. [V2I (Vehicle-to-Infrastructure)](#6-v2i-vehicle-to-infrastructure)
7. [V2P (Vehicle-to-Pedestrian)](#7-v2p-vehicle-to-pedestrian)
8. [V2N (Vehicle-to-Network)](#8-v2n-vehicle-to-network)
9. [Security and Privacy](#9-security-and-privacy)
10. [Performance Requirements](#10-performance-requirements)
11. [Collision Avoidance Protocols](#11-collision-avoidance-protocols)
12. [Platooning Protocols](#12-platooning-protocols)
13. [Implementation Guidelines](#13-implementation-guidelines)
14. [References](#14-references)

---

## 1. Introduction

### 1.1 Purpose

This specification defines the technical framework for Vehicle-to-Everything (V2X) communication systems, enabling vehicles to exchange safety-critical information with other vehicles, infrastructure, pedestrians, and cloud networks.

### 1.2 Scope

The standard covers:
- Communication protocols for V2V, V2I, V2P, and V2N
- Message format specifications
- Security and privacy mechanisms
- Latency and reliability requirements
- Collision avoidance algorithms
- Platooning coordination protocols

### 1.3 Philosophy

**弘益人間 (Benefit All Humanity)** - This standard aims to save lives through vehicular communication, reduce traffic congestion, enable autonomous driving, and create a safer transportation ecosystem for all road users.

### 1.4 Terminology

- **V2X**: Vehicle-to-Everything communication
- **V2V**: Vehicle-to-Vehicle communication
- **V2I**: Vehicle-to-Infrastructure communication
- **V2P**: Vehicle-to-Pedestrian communication
- **V2N**: Vehicle-to-Network communication
- **BSM**: Basic Safety Message (SAE J2735)
- **CAM**: Cooperative Awareness Message (ETSI)
- **DENM**: Decentralized Environmental Notification Message
- **RSU**: Road Side Unit
- **OBU**: On-Board Unit
- **DSRC**: Dedicated Short-Range Communications (IEEE 802.11p)
- **C-V2X**: Cellular V2X (LTE-V2X, 5G NR-V2X)

---

## 2. V2X Communication Architecture

### 2.1 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    V2X Communication System                  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐            │
│  │ Vehicle  │────▶│   V2V    │◀────│ Vehicle  │            │
│  │   OBU    │     │ Messages │     │   OBU    │            │
│  └────┬─────┘     └──────────┘     └──────────┘            │
│       │                                                       │
│       │           ┌──────────┐                               │
│       ├──────────▶│   V2I    │◀────┐                        │
│       │           │ Messages │     │                        │
│       │           └──────────┘     │                        │
│       │                            │                        │
│       │           ┌──────────┐   ┌┴─────┐                  │
│       ├──────────▶│   V2P    │   │ RSU  │                  │
│       │           │ Messages │   └──────┘                  │
│       │           └──────────┘                               │
│       │                                                       │
│       │           ┌──────────┐                               │
│       └──────────▶│   V2N    │◀──── Cloud Services         │
│                   │ Messages │                               │
│                   └──────────┘                               │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Communication Stack

```
┌─────────────────────────────────────┐
│     Application Layer               │  V2X Applications
├─────────────────────────────────────┤
│     Facilities Layer                │  Message generation/processing
├─────────────────────────────────────┤
│     Security Layer                  │  Authentication, Encryption
├─────────────────────────────────────┤
│     Network & Transport Layer       │  IPv6, TCP/UDP
├─────────────────────────────────────┤
│     Access Layer                    │  DSRC (802.11p) or C-V2X
├─────────────────────────────────────┤
│     Physical Layer                  │  5.9 GHz radio
└─────────────────────────────────────┘
```

### 2.3 Frequency Allocation

**ITS Band (5.9 GHz):**
- 5.850 - 5.925 GHz (US, 75 MHz)
- 5.875 - 5.905 GHz (EU, 30 MHz)
- 5.770 - 5.850 GHz (Japan, 80 MHz)

**Channel Allocation:**
```
Channel 172: 5.860 GHz (Safety critical - CCH)
Channel 174: 5.870 GHz (Service channel)
Channel 176: 5.880 GHz (Service channel)
Channel 178: 5.890 GHz (Service channel)
Channel 180: 5.900 GHz (Service channel)
Channel 182: 5.910 GHz (Service channel)
Channel 184: 5.920 GHz (Service channel)
```

---

## 3. Technology Standards

### 3.1 DSRC (IEEE 802.11p)

**Physical Layer:**
- Frequency: 5.9 GHz
- Bandwidth: 10 MHz per channel
- Modulation: OFDM (BPSK, QPSK, 16-QAM, 64-QAM)
- Data rate: 3-27 Mbps

**MAC Layer:**
- Protocol: CSMA/CA (Carrier Sense Multiple Access)
- No association required
- Broadcast and unicast support
- Quality of Service (EDCA)

**Range and Performance:**
```
Line-of-Sight:      Up to 1000 meters
Urban:              300-500 meters
Highway:            500-800 meters
Latency:            5-10 ms (typical)
Packet Loss:        <5% (at 300m)
```

### 3.2 C-V2X (Cellular V2X)

**LTE-V2X (Release 14):**
- Frequency: 5.9 GHz (PC5) or cellular bands (Uu)
- Mode 3: Network-scheduled (eNodeB)
- Mode 4: Autonomous sensing and scheduling
- Sidelink communication (PC5 interface)

**5G NR-V2X (Release 16+):**
- Ultra-reliable low-latency (URLLC)
- Enhanced sidelink (PC5)
- Network slicing support
- Higher data rates (up to 1 Gbps)

**Performance:**
```
LTE-V2X:
  Range:            500-1500 meters
  Latency:          10-20 ms
  Reliability:      98% (at 500m)

5G NR-V2X:
  Range:            1000-2000 meters
  Latency:          1-5 ms
  Reliability:      99.9% (at 500m)
```

### 3.3 Coexistence

**Hybrid Deployment:**
- Dual-mode devices (DSRC + C-V2X)
- Message translation layer
- Technology selection based on availability
- Handover protocols

---

## 4. Message Formats

### 4.1 Basic Safety Message (BSM)

**BSM Part I (Core data, 10 Hz):**
```json
{
  "messageType": "BSM",
  "msgCount": 127,
  "id": "00000001",
  "timestamp": 65535,
  "position": {
    "latitude": 37774900000,    // 1/10 micro degree
    "longitude": -122419400000,
    "elevation": 100,            // decimeters
    "accuracy": {
      "semiMajor": 12,          // cm
      "semiMinor": 10,
      "orientation": 0
    }
  },
  "speed": 1800,                // 0.02 m/s units (= 36 m/s = 65 km/h)
  "heading": 18000,             // 0.0125 degree units (= 225°)
  "acceleration": {
    "longitudinal": 50,         // 0.01 m/s²
    "lateral": 0,
    "vertical": 0,
    "yawRate": 100              // 0.01 deg/s
  },
  "steeringAngle": 0,           // 1.5 degrees per LSB
  "brakeStatus": {
    "wheelBrakes": "00000",
    "tractionControl": "off",
    "abs": "off",
    "stabilityControl": "off",
    "brakeBoost": "off",
    "auxBrakes": "off"
  },
  "vehicleSize": {
    "width": 200,               // cm
    "length": 480               // cm
  }
}
```

**BSM Part II (Optional, event-driven):**
- Path history (previous positions)
- Path prediction (intended trajectory)
- Vehicle classification
- Weather information
- Road surface conditions

### 4.2 Cooperative Awareness Message (CAM)

**CAM Structure (ETSI EN 302 637-2):**
```json
{
  "messageType": "CAM",
  "protocolVersion": 1,
  "stationID": 123456,
  "generationTime": 1640000000000,
  "basicContainer": {
    "stationType": "passengerCar",
    "referencePosition": {
      "latitude": 377749000,
      "longitude": -1224194000,
      "altitude": 100,
      "confidence": {
        "position": "a50m",
        "altitude": "alt-005-00"
      }
    }
  },
  "highFrequencyContainer": {
    "heading": 2250,              // 0.1 degree
    "speed": 180,                 // 0.01 m/s
    "driveDirection": "forward",
    "vehicleLength": 48,          // 0.1 m
    "vehicleWidth": 20,           // 0.1 m
    "longitudinalAcceleration": 5, // 0.1 m/s²
    "curvature": 0,
    "yawRate": 10                 // 0.01 deg/s
  }
}
```

### 4.3 Decentralized Environmental Notification Message (DENM)

**DENM Structure (ETSI EN 302 637-3):**
```json
{
  "messageType": "DENM",
  "protocolVersion": 1,
  "stationID": 123456,
  "management": {
    "actionID": {
      "originatingStationID": 123456,
      "sequenceNumber": 1
    },
    "detectionTime": 1640000000000,
    "referenceTime": 1640000000000,
    "eventPosition": {
      "latitude": 377749000,
      "longitude": -1224194000,
      "altitude": 100
    },
    "relevanceDistance": "lessThan500m",
    "relevanceTrafficDirection": "allTrafficDirections",
    "validityDuration": 600,      // seconds
    "transmissionInterval": 1000  // ms
  },
  "situation": {
    "eventType": {
      "causeCode": "collision",
      "subCauseCode": "chainCollision"
    },
    "severity": "danger"
  },
  "location": {
    "eventSpeed": 0,
    "eventPositionHeading": 1800,
    "traces": []
  }
}
```

### 4.4 Signal Phase and Timing (SPaT)

**SPaT Message (SAE J2735):**
```json
{
  "messageType": "SPaT",
  "timestamp": 65535,
  "intersectionID": 12345,
  "status": "signalOn",
  "states": [
    {
      "movementName": "Phase 1",
      "signalGroup": 1,
      "state": "protected-Movement-Allowed",
      "timing": {
        "minEndTime": 15000,      // ms
        "maxEndTime": 18000,
        "likelyTime": 16500,
        "confidence": 80,
        "nextTime": 75000
      },
      "maneuverAssist": {
        "connectionID": 1,
        "queueLength": 5,
        "availableStorageLength": 50,
        "waitOnStop": true,
        "pedBicycleDetect": false
      }
    }
  ]
}
```

### 4.5 Map Data (MAP)

**MAP Message (SAE J2735):**
```json
{
  "messageType": "MAP",
  "timestamp": 65535,
  "intersectionID": 12345,
  "referencePoint": {
    "latitude": 377749000,
    "longitude": -1224194000,
    "elevation": 100
  },
  "laneSet": [
    {
      "laneID": 1,
      "laneAttributes": {
        "directionalUse": "ingressPath",
        "sharedWith": "none",
        "laneType": "vehicle"
      },
      "maneuvers": ["straight", "left"],
      "nodeList": {
        "nodes": [
          {"delta": {"dx": 0, "dy": 0}},
          {"delta": {"dx": 500, "dy": 0}},
          {"delta": {"dx": 1000, "dy": 0}}
        ]
      },
      "connectsTo": [
        {
          "connectingLane": 5,
          "signalGroup": 1,
          "connectionID": 1
        }
      ],
      "speedLimits": [
        {
          "type": "vehicleMaxSpeed",
          "speed": 13.89  // m/s (50 km/h)
        }
      ]
    }
  ]
}
```

---

## 5. V2V (Vehicle-to-Vehicle)

### 5.1 Communication Model

**Broadcast-based:**
- Periodic BSM/CAM transmission (10 Hz)
- No handshake or acknowledgment
- Connectionless communication
- All nearby vehicles receive

**Event-triggered:**
- Emergency brake warning
- Collision warning
- Lane change notification
- Hazardous location warning

### 5.2 Cooperative Awareness

**Position Sharing:**
```
Update Frequency:
  - Stationary: 1 Hz
  - Low speed (<50 km/h): 2 Hz
  - Medium speed (50-100 km/h): 5 Hz
  - High speed (>100 km/h): 10 Hz
  - Emergency: 20 Hz
```

**Data Elements:**
- GPS position (lat, lon, elevation)
- Speed and heading
- Acceleration (longitudinal, lateral, vertical)
- Vehicle dimensions
- Brake status
- Turn signals

### 5.3 Collision Detection

**Time-to-Collision (TTC) Calculation:**
```
TTC = (d - L₁ - L₂) / (v₁ - v₂)

Where:
  d = Distance between vehicles
  L₁, L₂ = Vehicle lengths
  v₁, v₂ = Vehicle speeds
```

**Threat Assessment:**
```
if TTC < 1.5 seconds:
    Threat Level = CRITICAL (immediate brake)
elif TTC < 2.5 seconds:
    Threat Level = HIGH (warning + prepare brake)
elif TTC < 4.0 seconds:
    Threat Level = MEDIUM (visual/audio warning)
else:
    Threat Level = LOW (monitoring)
```

### 5.4 Forward Collision Warning

**Algorithm:**
```python
def forward_collision_warning(ego_vehicle, target_vehicle):
    # Calculate relative position
    distance = calculate_distance(ego_vehicle.position, target_vehicle.position)

    # Check if target is in path
    heading_diff = abs(ego_vehicle.heading - target_vehicle.heading)
    if heading_diff > 45:  # degrees
        return None  # Not in collision path

    # Calculate relative speed
    relative_speed = ego_vehicle.speed - target_vehicle.speed

    if relative_speed <= 0:
        return None  # Target moving away or same speed

    # Calculate TTC
    ttc = (distance - ego_vehicle.length) / relative_speed

    # Determine warning level
    if ttc < 1.5:
        return {'level': 'CRITICAL', 'action': 'BRAKE', 'ttc': ttc}
    elif ttc < 2.5:
        return {'level': 'HIGH', 'action': 'WARN', 'ttc': ttc}
    elif ttc < 4.0:
        return {'level': 'MEDIUM', 'action': 'MONITOR', 'ttc': ttc}

    return None
```

### 5.5 Blind Spot Warning

**Detection Zone:**
```
Left Blind Spot:
  - Range: 0.5m - 3.0m from vehicle side
  - Length: From B-pillar to 2m behind vehicle
  - Angle: 90° ± 30°

Right Blind Spot:
  - Same as left, mirrored
```

**Warning Conditions:**
- Vehicle detected in blind spot
- Turn signal activated
- Lateral acceleration detected

---

## 6. V2I (Vehicle-to-Infrastructure)

### 6.1 Road Side Unit (RSU)

**RSU Functions:**
- Broadcast SPaT messages (traffic signals)
- Transmit MAP data (intersection geometry)
- Collect traffic data
- Relay V2V messages (range extension)
- Emergency vehicle preemption

**RSU Deployment:**
```
High Priority:
  - Signalized intersections
  - Highway on/off ramps
  - School zones
  - Work zones

Medium Priority:
  - Parking areas
  - Transit stations
  - Toll plazas

Low Priority:
  - Rural highways
  - Residential areas
```

### 6.2 Traffic Signal Priority

**SPaT Processing:**
```typescript
interface SignalPhase {
  state: 'red' | 'yellow' | 'green';
  timeRemaining: number;  // seconds
  nextPhase: 'red' | 'yellow' | 'green';
  nextPhaseTime: number;
}

function processSpat(spatMessage: SPaTMessage): SignalPhase {
  const currentTime = Date.now();
  const signalGroup = spatMessage.states.find(s => s.signalGroup === vehicleLane);

  return {
    state: signalGroup.state,
    timeRemaining: (signalGroup.timing.minEndTime - currentTime) / 1000,
    nextPhase: determineNextPhase(signalGroup),
    nextPhaseTime: signalGroup.timing.nextTime / 1000
  };
}
```

**Green Light Optimal Speed Advisory (GLOSA):**
```
If signal_state == RED and time_to_intersection < time_remaining:
    recommended_speed = calculate_optimal_speed()
    display("Slow to " + recommended_speed + " km/h to catch green")

If signal_state == GREEN and time_to_intersection > time_remaining:
    display("Speed up or prepare to stop")
```

### 6.3 Emergency Vehicle Preemption

**Preemption Request:**
```json
{
  "messageType": "SRM",  // Signal Request Message
  "requestID": 12345,
  "vehicleID": "FIRE-001",
  "vehicleType": "fire",
  "priority": "emergency",
  "route": {
    "approach": "north",
    "departure": "south"
  },
  "eta": 15,  // seconds
  "duration": 120  // requested green time
}
```

**Signal Response:**
```json
{
  "messageType": "SSM",  // Signal Status Message
  "requestID": 12345,
  "status": "granted",
  "preemptionTime": 1640000015000,
  "duration": 120
}
```

### 6.4 Work Zone Warnings

**Work Zone Data:**
```json
{
  "messageType": "DENM",
  "eventType": "roadWorks",
  "location": {
    "startPoint": {"lat": 37.7749, "lon": -122.4194},
    "endPoint": {"lat": 37.7750, "lon": -122.4180},
    "affectedLanes": [1, 2]
  },
  "workType": "maintenance",
  "laneClosures": [1],
  "speedLimit": 40,  // km/h
  "startDate": "2025-12-26T08:00:00Z",
  "endDate": "2025-12-26T17:00:00Z"
}
```

---

## 7. V2P (Vehicle-to-Pedestrian)

### 7.1 Pedestrian Detection

**Pedestrian Device Types:**
- Smartphone apps (V2P-capable)
- Wearable devices (smartwatch, fitness tracker)
- Dedicated P-ITS devices

**Message Format:**
```json
{
  "messageType": "PSM",  // Personal Safety Message
  "deviceID": "PED-123456",
  "deviceType": "smartphone",
  "position": {
    "latitude": 377749000,
    "longitude": -1224194000,
    "accuracy": 5  // meters
  },
  "speed": 1.4,  // m/s (walking speed)
  "heading": 180,
  "userType": "pedestrian",
  "cluster": {
    "clusterSize": 1,
    "clusterRadius": 0
  },
  "timestamp": 1640000000000
}
```

### 7.2 Vulnerable Road User (VRU) Safety

**Risk Assessment:**
```python
def assess_vru_risk(vehicle, pedestrian):
    # Calculate distance
    distance = calculate_distance(vehicle.position, pedestrian.position)

    # Check if pedestrian in vehicle path
    is_in_path = check_intersection(
        vehicle.position,
        vehicle.heading,
        vehicle.speed,
        pedestrian.position,
        pedestrian.heading,
        pedestrian.speed
    )

    if not is_in_path:
        return {'risk': 'NONE'}

    # Calculate time to collision
    ttc = distance / vehicle.speed

    # Risk levels
    if ttc < 2.0:
        return {
            'risk': 'CRITICAL',
            'action': 'EMERGENCY_BRAKE',
            'ttc': ttc,
            'distance': distance
        }
    elif ttc < 4.0:
        return {
            'risk': 'HIGH',
            'action': 'WARN_AND_SLOW',
            'ttc': ttc,
            'distance': distance
        }
    elif ttc < 6.0:
        return {
            'risk': 'MEDIUM',
            'action': 'MONITOR',
            'ttc': ttc,
            'distance': distance
        }

    return {'risk': 'LOW'}
```

### 7.3 Crosswalk Safety

**Crosswalk Detection System:**
```
Approach Zone: 50m before crosswalk
  - Monitor for pedestrians
  - Reduce speed to 30 km/h

Warning Zone: 20m before crosswalk
  - If pedestrian detected: SLOW to 10 km/h
  - Activate hazard lights

Critical Zone: Crosswalk area
  - If pedestrian crossing: STOP
  - Wait until clear
```

### 7.4 Cyclist Protection

**Cyclist Message (BSM-variant):**
```json
{
  "messageType": "BSM",
  "vehicleType": "cyclist",
  "id": "BIKE-001",
  "position": {
    "latitude": 377749000,
    "longitude": -1224194000
  },
  "speed": 600,  // 12 km/h
  "heading": 90,
  "deviceType": "smartphone",
  "intent": {
    "turning": false,
    "stopping": false,
    "lane_change": false
  }
}
```

---

## 8. V2N (Vehicle-to-Network)

### 8.1 Cloud Connectivity

**Cloud Services:**
- Real-time traffic management
- Predictive routing
- Fleet management
- Remote diagnostics
- OTA software updates
- HD map updates

**Communication Protocol:**
```
Transport: HTTPS / MQTT / WebSocket
Data Format: JSON / Protocol Buffers
Authentication: OAuth 2.0 / mTLS
Encryption: TLS 1.3
```

### 8.2 Traffic Management Center (TMC) Integration

**Vehicle Telemetry Upload:**
```json
{
  "messageType": "TELEMETRY",
  "vehicleID": "VEH-123456",
  "timestamp": 1640000000000,
  "position": {
    "latitude": 37.7749,
    "longitude": -122.4194,
    "heading": 270,
    "speed": 65
  },
  "roadConditions": {
    "friction": 0.8,
    "wetness": "dry",
    "visibility": "good"
  },
  "trafficConditions": {
    "density": "moderate",
    "averageSpeed": 60,
    "incidents": []
  }
}
```

**TMC Traffic Updates:**
```json
{
  "messageType": "TRAFFIC_UPDATE",
  "region": {
    "bounds": {
      "north": 37.8,
      "south": 37.7,
      "east": -122.3,
      "west": -122.5
    }
  },
  "incidents": [
    {
      "id": "INC-001",
      "type": "accident",
      "location": {"lat": 37.7749, "lon": -122.4194},
      "severity": "major",
      "lanesAffected": [1, 2],
      "estimatedClearance": "2025-12-26T14:30:00Z"
    }
  ],
  "congestion": [
    {
      "roadID": "I-280",
      "segment": "Northbound Mile 15-20",
      "speed": 25,
      "delay": 10  // minutes
    }
  ]
}
```

### 8.3 Remote Monitoring and Control

**Remote Vehicle Status:**
```json
{
  "vehicleID": "VEH-123456",
  "status": {
    "location": {"lat": 37.7749, "lon": -122.4194},
    "battery": 85,  // %
    "fuel": 45,  // liters
    "speed": 0,
    "odometer": 45682,  // km
    "engineStatus": "off",
    "doors": {
      "driverFront": "locked",
      "passengerFront": "locked",
      "driverRear": "locked",
      "passengerRear": "locked",
      "trunk": "locked"
    },
    "diagnostics": {
      "engineHealth": "good",
      "brakeHealth": "good",
      "tirePress sure": [32, 32, 32, 32]  // PSI
    }
  }
}
```

---

## 9. Security and Privacy

### 9.1 Security Architecture

**Security Requirements:**
1. **Authentication**: Verify message sender identity
2. **Integrity**: Detect message tampering
3. **Non-repudiation**: Sender cannot deny sending
4. **Confidentiality**: Encrypt sensitive data (optional for safety)
5. **Availability**: Resist denial-of-service attacks
6. **Privacy**: Protect user location and identity

### 9.2 Public Key Infrastructure (PKI)

**Certificate Hierarchy:**
```
Root CA (Certificate Authority)
  ├── Enrollment CA (Long-term certificates)
  │     └── Vehicle Enrollment Certificates
  └── Authorization CA (Short-term certificates)
        └── Pseudonym Certificates (changed frequently)
```

**Certificate Format (IEEE 1609.2):**
```json
{
  "version": 3,
  "type": "explicit",
  "issuer": "AuthorizationCA-001",
  "toBeSigned": {
    "id": "CERT-789012",
    "cracaId": "ROOT-CA-001",
    "crlSeries": 5,
    "validityPeriod": {
      "start": "2025-12-26T00:00:00Z",
      "duration": "1 week"
    },
    "region": {
      "circularRegion": {
        "center": {"lat": 37.7749, "lon": -122.4194},
        "radius": 50000  // meters
      }
    },
    "assuranceLevel": "high",
    "appPermissions": [
      {
        "psid": 0x20,  // Basic Safety Message
        "ssp": "all"
      }
    ],
    "certIssuePermissions": [],
    "verifyKeyIndicator": {
      "verificationKey": {
        "algorithm": "ecdsaNistp256",
        "publicKey": "04a1b2c3..."
      }
    }
  },
  "signature": {
    "algorithm": "ecdsaNistp256",
    "r": "12345678...",
    "s": "87654321..."
  }
}
```

### 9.3 Message Authentication

**Signed Message Structure:**
```
┌─────────────────────────┐
│   Unsigned Payload      │  (BSM/CAM/DENM data)
├─────────────────────────┤
│   Header Info           │  (Protocol version, message type)
├─────────────────────────┤
│   Signer Info           │  (Certificate or digest)
├─────────────────────────┤
│   Generation Time       │  (Timestamp)
├─────────────────────────┤
│   Generation Location   │  (3D position)
├─────────────────────────┤
│   Digital Signature     │  (ECDSA P-256)
└─────────────────────────┘
```

**Verification Process:**
```python
def verify_v2x_message(signed_message):
    # 1. Extract certificate from message
    cert = extract_certificate(signed_message)

    # 2. Verify certificate validity
    if not verify_certificate(cert):
        return False, "Invalid certificate"

    # 3. Check certificate not revoked
    if is_revoked(cert):
        return False, "Certificate revoked"

    # 4. Verify message signature
    payload = signed_message.payload
    signature = signed_message.signature
    public_key = cert.public_key

    if not ecdsa_verify(public_key, payload, signature):
        return False, "Signature verification failed"

    # 5. Check message freshness (replay attack prevention)
    timestamp = signed_message.generation_time
    if abs(current_time() - timestamp) > 5000:  # 5 seconds
        return False, "Message too old"

    # 6. Verify geographic consistency
    claimed_location = signed_message.generation_location
    cert_region = cert.region

    if not is_in_region(claimed_location, cert_region):
        return False, "Location outside certificate region"

    return True, "Message authenticated"
```

### 9.4 Privacy Protection

**Pseudonym Certificates:**
- Changed every 5-10 minutes
- No linkability between pseudonyms
- Prevents long-term tracking
- Pool of 20+ certificates pre-loaded

**Privacy Zones:**
```
Home Location:
  - No V2X broadcast within 500m of registered home
  - Or use maximum privacy mode (encrypted)

Sensitive Locations:
  - Hospitals
  - Government buildings
  - Religious sites
  - Automatically detected and protected
```

**Location Obfuscation:**
```python
def apply_privacy_filter(position, privacy_level):
    if privacy_level == 'MAXIMUM':
        # Don't broadcast position at all
        return None

    elif privacy_level == 'HIGH':
        # Reduce precision to ~100m
        return {
            'latitude': round(position.latitude, 3),
            'longitude': round(position.longitude, 3)
        }

    elif privacy_level == 'MEDIUM':
        # Reduce precision to ~10m
        return {
            'latitude': round(position.latitude, 4),
            'longitude': round(position.longitude, 4)
        }

    else:  # LOW or NONE
        # Full precision (~1cm)
        return position
```

### 9.5 Misbehavior Detection

**Anomaly Detection:**
```python
def detect_misbehavior(message, history):
    anomalies = []

    # Check position consistency
    if history.last_position:
        max_distance = history.last_speed * time_delta * 1.5  # Allow 50% margin
        actual_distance = calculate_distance(history.last_position, message.position)

        if actual_distance > max_distance:
            anomalies.append({
                'type': 'POSITION_JUMP',
                'severity': 'HIGH',
                'description': f'Position jumped {actual_distance}m in {time_delta}s'
            })

    # Check speed consistency
    if message.speed > 200:  # km/h (unrealistic for most vehicles)
        anomalies.append({
            'type': 'EXCESSIVE_SPEED',
            'severity': 'MEDIUM',
            'description': f'Speed {message.speed} km/h exceeds realistic limit'
        })

    # Check acceleration consistency
    max_accel = 10  # m/s² (typical maximum)
    if abs(message.acceleration.longitudinal) > max_accel:
        anomalies.append({
            'type': 'EXCESSIVE_ACCELERATION',
            'severity': 'MEDIUM',
            'description': f'Acceleration {message.acceleration.longitudinal} m/s² unrealistic'
        })

    # Check message frequency
    if len(history.recent_messages) > 50:  # More than 50 messages in last 5 seconds
        anomalies.append({
            'type': 'MESSAGE_FLOODING',
            'severity': 'HIGH',
            'description': 'Excessive message rate detected'
        })

    return anomalies
```

---

## 10. Performance Requirements

### 10.1 Latency Requirements

| Application | End-to-End Latency | Processing Time | Transmission Time |
|-------------|-------------------|-----------------|-------------------|
| Emergency Brake Warning | 5 ms | 2 ms | 3 ms |
| Collision Warning | 10 ms | 5 ms | 5 ms |
| Lane Change Warning | 20 ms | 10 ms | 10 ms |
| Traffic Signal Info | 100 ms | 50 ms | 50 ms |
| Map Update | 500 ms | 200 ms | 300 ms |

### 10.2 Reliability Requirements

**Packet Delivery Ratio (PDR):**
```
Safety-Critical (Collision Avoidance):  ≥ 99.9% at 300m
High Priority (Warnings):               ≥ 99% at 500m
Medium Priority (Awareness):            ≥ 95% at 500m
Low Priority (Info):                    ≥ 90% at 1000m
```

**Message Frequency:**
```
BSM/CAM (Position):        10 Hz (100 ms interval)
DENM (Event):              Event-triggered, min 1 Hz
SPaT (Traffic Signal):     10 Hz
MAP (Road Geometry):       1 Hz or on-change
PSM (Pedestrian):          2 Hz
```

### 10.3 Range Requirements

**Communication Range:**
```
V2V Direct:
  - Urban: 300-500m
  - Highway: 500-1000m
  - LOS: Up to 1000m

V2I (RSU):
  - Intersection: 300m radius
  - Highway: 500m radius
  - Range extension: Multi-hop relaying

V2P:
  - Pedestrian detection: 50-100m
  - Cyclist detection: 100-200m

V2N:
  - Cellular coverage dependent
  - Target: 99% coverage in urban areas
```

### 10.4 Scalability

**Network Capacity:**
```
Vehicles per Channel:
  - DSRC: 100-200 vehicles/channel (10 MHz)
  - C-V2X: 200-500 vehicles/channel
  - 5G NR-V2X: 500-1000 vehicles/channel

Congestion Control:
  - Adaptive message rate
  - Transmit power control
  - Channel coordination
  - Priority-based access
```

**Channel Load Management:**
```python
def adapt_message_rate(channel_busy_ratio):
    if channel_busy_ratio > 0.7:  # 70% channel busy
        # Reduce BSM rate
        return {
            'bsm_rate': 5,  # Hz (reduced from 10)
            'power': -10,   # dBm (reduced from 20)
            'priority': 'HIGH_ONLY'
        }
    elif channel_busy_ratio > 0.5:  # 50% busy
        return {
            'bsm_rate': 7,  # Hz
            'power': 0,     # dBm
            'priority': 'NORMAL'
        }
    else:
        return {
            'bsm_rate': 10,  # Hz (normal)
            'power': 20,     # dBm (max)
            'priority': 'ALL'
        }
```

---

## 11. Collision Avoidance Protocols

### 11.1 Forward Collision Warning (FCW)

**Detection Algorithm:**
```python
class ForwardCollisionWarning:
    def __init__(self):
        self.warning_threshold = 2.5  # seconds TTC
        self.critical_threshold = 1.5  # seconds TTC
        self.min_distance = 5.0  # meters

    def evaluate(self, ego_vehicle, target_vehicle):
        # Calculate relative position
        rel_pos = self.calculate_relative_position(ego_vehicle, target_vehicle)

        # Check if target is ahead
        if not self.is_vehicle_ahead(ego_vehicle.heading, rel_pos):
            return None

        # Calculate distance
        distance = self.calculate_distance(rel_pos)

        # Calculate relative velocity
        rel_velocity = ego_vehicle.speed - target_vehicle.speed

        # Calculate TTC
        if rel_velocity > 0:
            ttc = distance / rel_velocity
        else:
            return None  # Target moving away or same speed

        # Determine warning level
        if ttc < self.critical_threshold:
            return {
                'level': 'CRITICAL',
                'ttc': ttc,
                'distance': distance,
                'action': 'EMERGENCY_BRAKE',
                'deceleration': self.calculate_required_decel(distance, rel_velocity)
            }
        elif ttc < self.warning_threshold:
            return {
                'level': 'WARNING',
                'ttc': ttc,
                'distance': distance,
                'action': 'ALERT_DRIVER',
                'deceleration': self.calculate_required_decel(distance, rel_velocity)
            }

        return None

    def calculate_required_decel(self, distance, rel_velocity):
        # Physics: v² = v₀² + 2ad
        # Solve for a: a = (v² - v₀²) / (2d)
        return (rel_velocity ** 2) / (2 * distance)
```

### 11.2 Intersection Movement Assist (IMA)

**Intersection Collision Detection:**
```python
class IntersectionMovementAssist:
    def __init__(self):
        self.intersection_radius = 50  # meters
        self.warning_time = 3.0  # seconds

    def evaluate(self, ego_vehicle, other_vehicles, intersection_map):
        # Check if approaching intersection
        if not self.is_approaching_intersection(ego_vehicle, intersection_map):
            return None

        threats = []

        for other in other_vehicles:
            # Check if other vehicle also approaching
            if not self.is_approaching_intersection(other, intersection_map):
                continue

            # Calculate paths through intersection
            ego_path = self.predict_path(ego_vehicle, intersection_map)
            other_path = self.predict_path(other, intersection_map)

            # Check for path intersection
            conflict_point = self.find_conflict_point(ego_path, other_path)

            if conflict_point:
                # Calculate arrival times
                ego_arrival = self.calculate_arrival_time(ego_vehicle, conflict_point)
                other_arrival = self.calculate_arrival_time(other, conflict_point)

                # Check if arrivals overlap
                time_delta = abs(ego_arrival - other_arrival)

                if time_delta < self.warning_time:
                    threats.append({
                        'vehicle': other.id,
                        'conflict_point': conflict_point,
                        'time_delta': time_delta,
                        'ego_arrival': ego_arrival,
                        'other_arrival': other_arrival,
                        'priority': self.determine_priority(
                            ego_vehicle, other, intersection_map
                        )
                    })

        if threats:
            # Sort by time delta (most urgent first)
            threats.sort(key=lambda t: t['time_delta'])
            return {
                'level': 'WARNING',
                'threats': threats,
                'action': 'SLOW_DOWN' if threats[0]['priority'] == 'YIELD' else 'MONITOR'
            }

        return None
```

### 11.3 Blind Spot Warning / Lane Change Warning

**Blind Spot Detection:**
```python
class BlindSpotWarning:
    def __init__(self):
        self.blind_spot_zones = {
            'left': {
                'lateral_offset': (-0.5, -3.0),  # meters from vehicle center
                'longitudinal_range': (-2.0, 2.0)  # meters from vehicle center
            },
            'right': {
                'lateral_offset': (0.5, 3.0),
                'longitudinal_range': (-2.0, 2.0)
            }
        }

    def evaluate(self, ego_vehicle, nearby_vehicles):
        warnings = {'left': None, 'right': None}

        for other in nearby_vehicles:
            # Transform other vehicle to ego coordinate system
            rel_pos = self.transform_to_ego_frame(ego_vehicle, other)

            # Check each blind spot zone
            for side, zone in self.blind_spot_zones.items():
                if self.is_in_zone(rel_pos, zone):
                    # Calculate relative velocity
                    rel_velocity = self.calculate_relative_velocity(
                        ego_vehicle, other
                    )

                    warnings[side] = {
                        'vehicle_id': other.id,
                        'distance': self.calculate_distance(rel_pos),
                        'relative_velocity': rel_velocity,
                        'position': rel_pos
                    }

        return warnings

    def evaluate_lane_change(self, ego_vehicle, nearby_vehicles, target_lane):
        # Check blind spot in target lane direction
        side = 'left' if target_lane < ego_vehicle.lane else 'right'
        blind_spot = self.evaluate(ego_vehicle, nearby_vehicles)

        if blind_spot[side]:
            return {
                'safe': False,
                'reason': 'Vehicle in blind spot',
                'vehicle': blind_spot[side]
            }

        # Check target lane for approaching vehicles
        lane_clear = self.check_target_lane_clear(
            ego_vehicle, nearby_vehicles, target_lane
        )

        return {
            'safe': lane_clear,
            'reason': 'Target lane clear' if lane_clear else 'Vehicle approaching'
        }
```

### 11.4 Emergency Electronic Brake Lights (EEBL)

**Emergency Brake Detection:**
```python
class EmergencyBrakeLights:
    def __init__(self):
        self.hard_brake_threshold = -4.0  # m/s² (deceleration)
        self.relay_distance = 300  # meters

    def detect_emergency_brake(self, vehicle):
        # Check for hard braking
        if vehicle.acceleration.longitudinal < self.hard_brake_threshold:
            return {
                'type': 'EMERGENCY_BRAKE',
                'vehicle_id': vehicle.id,
                'position': vehicle.position,
                'speed': vehicle.speed,
                'deceleration': vehicle.acceleration.longitudinal,
                'timestamp': vehicle.timestamp
            }
        return None

    def broadcast_eebl(self, ego_vehicle):
        emergency = self.detect_emergency_brake(ego_vehicle)

        if emergency:
            # Create DENM message
            denm = {
                'messageType': 'DENM',
                'eventType': 'emergencyBrake',
                'severity': 'danger',
                'position': ego_vehicle.position,
                'heading': ego_vehicle.heading,
                'speed': ego_vehicle.speed,
                'deceleration': ego_vehicle.acceleration.longitudinal,
                'relevanceDistance': self.relay_distance,
                'validityDuration': 5  # seconds
            }

            return denm

        return None

    def process_eebl(self, eebl_message, ego_vehicle):
        # Check if relevant (same direction, behind emergency vehicle)
        if not self.is_relevant(eebl_message, ego_vehicle):
            return None

        # Calculate distance to emergency
        distance = self.calculate_distance(
            ego_vehicle.position, eebl_message.position
        )

        # Calculate warning level based on distance and speed
        if distance < 100 and ego_vehicle.speed > 50:  # km/h
            return {
                'level': 'CRITICAL',
                'action': 'PREPARE_TO_BRAKE',
                'distance': distance,
                'message': f'Emergency braking ahead in {distance}m'
            }
        elif distance < 200:
            return {
                'level': 'WARNING',
                'action': 'REDUCE_SPEED',
                'distance': distance,
                'message': f'Vehicle braking ahead in {distance}m'
            }

        return None
```

---

## 12. Platooning Protocols

### 12.1 Platoon Formation

**Platoon Roles:**
```
Leader:
  - Controls platoon speed
  - Makes navigation decisions
  - Broadcasts platoon status
  - Manages member join/leave

Member:
  - Follows leader's speed/direction
  - Maintains safe following distance
  - Reports status to leader
  - Can request to leave
```

**Formation Protocol:**
```python
class PlatoonFormation:
    def __init__(self):
        self.max_members = 10
        self.min_spacing = 5  # meters (inter-vehicle)
        self.max_spacing = 15  # meters
        self.target_spacing = 10  # meters

    def initiate_platoon(self, leader_vehicle):
        return {
            'platoon_id': generate_uuid(),
            'leader': leader_vehicle.id,
            'members': [],
            'formation': 'line',  # or 'column'
            'target_speed': leader_vehicle.speed,
            'spacing': self.target_spacing,
            'max_members': self.max_members,
            'status': 'FORMING'
        }

    def request_join(self, vehicle, platoon):
        # Check eligibility
        if len(platoon.members) >= platoon.max_members:
            return {'status': 'REJECTED', 'reason': 'Platoon full'}

        # Check position (must be behind platoon)
        if not self.is_behind_platoon(vehicle, platoon):
            return {'status': 'REJECTED', 'reason': 'Not in position'}

        # Check compatibility (speed, direction, vehicle type)
        if not self.is_compatible(vehicle, platoon):
            return {'status': 'REJECTED', 'reason': 'Incompatible vehicle'}

        # Calculate join position
        join_position = len(platoon.members) + 1

        return {
            'status': 'APPROVED',
            'position': join_position,
            'target_spacing': platoon.spacing,
            'target_speed': platoon.target_speed,
            'formation_point': self.calculate_formation_point(platoon, join_position)
        }

    def leave_platoon(self, vehicle, platoon):
        # Notify leader
        self.notify_leader(platoon.leader, {
            'event': 'MEMBER_LEAVING',
            'vehicle': vehicle.id
        })

        # Adjust positions of following vehicles
        position = platoon.members.index(vehicle.id)

        for i in range(position + 1, len(platoon.members)):
            self.notify_vehicle(platoon.members[i], {
                'action': 'ADJUST_POSITION',
                'new_position': i - 1
            })

        # Remove from platoon
        platoon.members.remove(vehicle.id)

        return {'status': 'LEFT', 'action': 'RESUME_MANUAL_CONTROL'}
```

### 12.2 Platoon Maintenance

**Spacing Control:**
```python
class PlatoonSpacingControl:
    def __init__(self):
        self.kp = 0.5  # Proportional gain
        self.kd = 0.2  # Derivative gain
        self.previous_error = 0

    def calculate_control(self, ego_vehicle, leader_vehicle, target_spacing):
        # Measure actual spacing
        actual_spacing = self.measure_spacing(ego_vehicle, leader_vehicle)

        # Calculate error
        error = actual_spacing - target_spacing

        # Proportional term
        p_term = self.kp * error

        # Derivative term (rate of change)
        d_term = self.kd * (error - self.previous_error)

        # PD control output
        control = p_term + d_term

        # Update previous error
        self.previous_error = error

        # Convert to acceleration command
        # Positive control = speed up, Negative = slow down
        acceleration = np.clip(control, -3.0, 2.0)  # m/s²

        return {
            'acceleration': acceleration,
            'error': error,
            'spacing': actual_spacing,
            'status': 'GOOD' if abs(error) < 1.0 else 'ADJUSTING'
        }
```

**Cooperative Adaptive Cruise Control (CACC):**
```python
class CooperativeAdaptiveCruiseControl:
    def __init__(self):
        self.time_gap = 0.6  # seconds (much shorter than ACC's 1.5-2.0s)
        self.max_accel = 2.0  # m/s²
        self.max_decel = -4.0  # m/s²

    def calculate_target_speed(self, ego_vehicle, leader_vehicle):
        # Get leader's acceleration from V2V message
        leader_accel = leader_vehicle.acceleration.longitudinal

        # Calculate desired spacing based on speed
        desired_spacing = ego_vehicle.speed * self.time_gap + self.min_spacing

        # Measure actual spacing
        actual_spacing = self.measure_spacing(ego_vehicle, leader_vehicle)

        # Spacing error
        spacing_error = actual_spacing - desired_spacing

        # Speed error
        speed_error = ego_vehicle.speed - leader_vehicle.speed

        # CACC algorithm (includes feedforward from leader acceleration)
        acceleration = (
            0.4 * spacing_error +        # Proportional to spacing error
            0.3 * speed_error +           # Proportional to speed error
            0.8 * leader_accel            # Feedforward from leader
        )

        # Limit acceleration
        acceleration = np.clip(acceleration, self.max_decel, self.max_accel)

        # Calculate target speed
        target_speed = ego_vehicle.speed + acceleration * 0.1  # 100ms update

        return {
            'target_speed': max(0, target_speed),
            'acceleration': acceleration,
            'spacing_error': spacing_error,
            'speed_error': speed_error
        }
```

### 12.3 Platoon Maneuvers

**Lane Change:**
```python
class PlatoonLaneChange:
    def execute_platoon_lane_change(self, platoon, target_lane):
        # 1. Leader announces lane change
        self.broadcast_to_platoon(platoon, {
            'action': 'LANE_CHANGE',
            'target_lane': target_lane,
            'execution_time': time.now() + 5.0  # seconds
        })

        # 2. All members acknowledge
        confirmations = self.collect_confirmations(platoon.members, timeout=2.0)

        if not all(confirmations):
            return {'status': 'ABORTED', 'reason': 'Not all members ready'}

        # 3. Increase spacing temporarily for safety
        self.set_platoon_spacing(platoon, 15)  # meters

        # 4. Leader executes lane change
        self.execute_lane_change(platoon.leader, target_lane)

        # 5. Members follow sequentially
        for member in platoon.members:
            wait_for_clearance(target_lane)
            self.execute_lane_change(member, target_lane)
            time.sleep(1.0)  # 1 second between vehicles

        # 6. Restore normal spacing
        self.set_platoon_spacing(platoon, 10)  # meters

        return {'status': 'COMPLETE'}
```

**Split Platoon:**
```python
def split_platoon(platoon, split_position):
    # Platoon A: Leader + members before split
    platoon_a = {
        'platoon_id': platoon.platoon_id,
        'leader': platoon.leader,
        'members': platoon.members[:split_position]
    }

    # Platoon B: New leader + remaining members
    new_leader = platoon.members[split_position]
    platoon_b = {
        'platoon_id': generate_uuid(),
        'leader': new_leader,
        'members': platoon.members[split_position + 1:]
    }

    # Increase spacing between platoons
    self.command_vehicle(new_leader, {
        'action': 'INCREASE_SPACING',
        'target_spacing': 50  # meters
    })

    # Notify all vehicles
    self.broadcast_to_platoon(platoon_a, {
        'event': 'PLATOON_SPLIT',
        'new_platoon': platoon_a
    })

    self.broadcast_to_platoon(platoon_b, {
        'event': 'PLATOON_SPLIT',
        'new_leader': new_leader,
        'new_platoon': platoon_b
    })

    return [platoon_a, platoon_b]
```

---

## 13. Implementation Guidelines

### 13.1 Required Components

Any WIA-COMM-003 compliant system must include:

1. **V2X Radio**: DSRC (802.11p) or C-V2X transceiver
2. **GNSS Receiver**: GPS/GLONASS/Galileo for positioning
3. **Message Processor**: BSM/CAM/DENM generation and parsing
4. **Security Module**: Certificate management and cryptography
5. **Application Layer**: Collision detection, warnings, UI

### 13.2 Software Architecture

```
┌─────────────────────────────────────────────────┐
│              V2X Application Layer               │
│  (Collision Avoidance, Platooning, UI)          │
├─────────────────────────────────────────────────┤
│         V2X Middleware / SDK                     │
│  (Message Handling, Event Processing)            │
├─────────────────────────────────────────────────┤
│         Security & Privacy Layer                 │
│  (Signing, Verification, Anonymization)          │
├─────────────────────────────────────────────────┤
│       V2X Protocol Stack                         │
│  (IEEE 1609.x, ETSI ITS-G5, SAE J2735)          │
├─────────────────────────────────────────────────┤
│       Hardware Abstraction Layer                 │
│  (Radio Control, GNSS, CAN Bus)                  │
└─────────────────────────────────────────────────┘
```

### 13.3 Message Generation

**BSM Generation (10 Hz):**
```typescript
class BSMGenerator {
  private msgCount: number = 0;

  generateBSM(vehicleState: VehicleState): BSM {
    // Increment message counter (wraps at 127)
    this.msgCount = (this.msgCount + 1) % 128;

    return {
      messageType: 'BSM',
      msgCount: this.msgCount,
      id: vehicleState.id,
      timestamp: Date.now() % 65536,  // Milliseconds in minute

      position: {
        latitude: Math.round(vehicleState.position.lat * 1e7),
        longitude: Math.round(vehicleState.position.lon * 1e7),
        elevation: Math.round(vehicleState.position.alt * 10),
        accuracy: this.calculatePositionAccuracy(vehicleState.gnss)
      },

      speed: Math.round(vehicleState.speed / 0.02),  // 0.02 m/s units
      heading: Math.round(vehicleState.heading / 0.0125),  // 0.0125° units

      acceleration: {
        longitudinal: Math.round(vehicleState.acceleration.x / 0.01),
        lateral: Math.round(vehicleState.acceleration.y / 0.01),
        vertical: Math.round(vehicleState.acceleration.z / 0.02),
        yawRate: Math.round(vehicleState.yawRate / 0.01)
      },

      steeringAngle: Math.round(vehicleState.steeringAngle / 1.5),

      brakeStatus: {
        wheelBrakes: this.encodeWheelBrakes(vehicleState.brakes),
        tractionControl: vehicleState.tractionControl ? 'on' : 'off',
        abs: vehicleState.abs ? 'on' : 'off',
        stabilityControl: vehicleState.esc ? 'on' : 'off',
        brakeBoost: vehicleState.brakeBoost ? 'on' : 'off',
        auxBrakes: vehicleState.auxBrakes ? 'on' : 'off'
      },

      vehicleSize: {
        width: Math.round(vehicleState.width * 100),  // cm
        length: Math.round(vehicleState.length * 100)  // cm
      }
    };
  }
}
```

### 13.4 Performance Optimization

**Message Filtering:**
```typescript
class MessageFilter {
  filterRelevantMessages(
    messages: V2XMessage[],
    egoVehicle: VehicleState,
    maxDistance: number = 500
  ): V2XMessage[] {
    return messages.filter(msg => {
      // Distance filter
      const distance = this.calculateDistance(
        egoVehicle.position,
        msg.position
      );
      if (distance > maxDistance) return false;

      // Direction filter (only vehicles in front or nearby)
      const bearing = this.calculateBearing(
        egoVehicle.position,
        msg.position
      );
      const headingDiff = Math.abs(bearing - egoVehicle.heading);

      // Keep if within ±90° or very close (<50m)
      if (headingDiff > 90 && distance > 50) return false;

      // Keep message
      return true;
    });
  }
}
```

### 13.5 Testing and Validation

**Test Scenarios:**

1. **Basic Communication**
   - Message transmission and reception
   - Latency measurement
   - Packet delivery ratio

2. **Collision Avoidance**
   - Forward collision warning
   - Blind spot detection
   - Intersection collision

3. **Platooning**
   - Formation and maintenance
   - Lane change maneuvers
   - Emergency dissolution

4. **Security**
   - Message authentication
   - Certificate validation
   - Misbehavior detection

**Field Testing Requirements:**
```
Test Vehicles: Minimum 5 vehicles
Test Duration: 100+ hours
Test Scenarios: 50+ different scenarios
Environments: Urban, highway, rural
Weather Conditions: Clear, rain, fog
Traffic Densities: Light, medium, heavy
```

---

## 14. References

### 14.1 Standards Documents

1. **IEEE 1609.x** - Wireless Access in Vehicular Environments (WAVE)
   - 1609.1: Resource Manager
   - 1609.2: Security Services
   - 1609.3: Networking Services
   - 1609.4: Multi-Channel Operation

2. **SAE J2735** - Dedicated Short Range Communications Message Set Dictionary

3. **SAE J2945** - Dedicated Short Range Communications On-Board System Requirements

4. **ETSI EN 302 637** - Intelligent Transport Systems (ITS); Vehicular Communications
   - Part 2: Cooperative Awareness (CAM)
   - Part 3: Decentralized Environmental Notification (DENM)

5. **3GPP TS 22.185** - Service requirements for V2X services

6. **3GPP TS 23.285** - Architecture enhancements for V2X services

### 14.2 Technical Specifications

| Specification | Description |
|---------------|-------------|
| IEEE 802.11p | Wireless LAN for vehicular environments |
| IEEE 1609.2 | Security services for applications and management messages |
| SAE J2735 | Message set dictionary for DSRC |
| SAE J2945/1 | On-Board System Requirements for V2V Safety |
| ETSI TS 102 894-2 | Basic Set of Applications - Specification |
| ISO 21217 | Station and communication architecture |

### 14.3 WIA Standards

- **WIA-INTENT**: Intent-based vehicle control
- **WIA-OMNI-API**: Universal API gateway
- **WIA-SOCIAL**: Social coordination
- **WIA-QUANTUM**: Quantum-secure communication
- **WIA-EDGE**: Edge computing for V2X

---

**弘익人間 (홍익인간) · Benefit All Humanity**

*WIA-COMM-003 Specification v1.0*
*© 2025 SmileStory Inc. / WIA*
*MIT License*
