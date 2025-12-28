# WIA-AUTO-005: EV Charging Specification v1.0

> **Standard ID:** WIA-AUTO-005
> **Version:** 1.0.0
> **Published:** 2025-12-26
> **Status:** Active
> **Authors:** WIA Automotive Standards Group

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Charging Levels](#2-charging-levels)
3. [Connector Standards](#3-connector-standards)
4. [Communication Protocols](#4-communication-protocols)
5. [Smart Charging](#5-smart-charging)
6. [Vehicle-to-Grid (V2G)](#6-vehicle-to-grid-v2g)
7. [Billing and Payment](#7-billing-and-payment)
8. [Data Formats](#8-data-formats)
9. [API Interface](#9-api-interface)
10. [Safety Protocols](#10-safety-protocols)
11. [References](#11-references)

---

## 1. Introduction

### 1.1 Purpose

This specification defines standardized protocols, interfaces, and requirements for electric vehicle charging infrastructure to ensure interoperability, safety, and optimal user experience across all charging networks globally.

### 1.2 Scope

The standard covers:
- AC and DC charging technologies (Level 1, 2, and 3)
- Physical connector specifications
- Communication protocols (OCPP, ISO 15118)
- Smart charging and load management
- V2G bidirectional charging
- Payment and billing systems
- Safety and security requirements

### 1.3 Philosophy

**弘益人間 (Benefit All Humanity)** - This standard accelerates the global transition to electric mobility by creating seamless, interoperable charging infrastructure that benefits all of humanity through reduced emissions, improved air quality, and sustainable transportation.

### 1.4 Terminology

- **BEV**: Battery Electric Vehicle - fully electric vehicle
- **PHEV**: Plug-in Hybrid Electric Vehicle
- **SOC**: State of Charge - battery charge level (0-100%)
- **SOH**: State of Health - battery condition indicator
- **EVSE**: Electric Vehicle Supply Equipment - charging station
- **OCPP**: Open Charge Point Protocol
- **V2G**: Vehicle-to-Grid - bidirectional energy transfer
- **kW**: Kilowatt - unit of power
- **kWh**: Kilowatt-hour - unit of energy

---

## 2. Charging Levels

### 2.1 Level 1 Charging (AC)

**Specifications:**
```
Voltage: 120V AC (North America) / 230V AC (Europe)
Current: 12-16A
Power: 1.4-1.9 kW (NA) / 2.3-3.7 kW (EU)
Connector: Standard household outlet (NEMA 5-15, Schuko)
```

**Characteristics:**
- Slowest charging method
- No special equipment required
- Typical use: Overnight home charging
- Charge rate: 3-5 miles of range per hour

**Charging Time (Example: 60 kWh battery, 20% → 80%)**
```
Energy needed = 60 × (0.8 - 0.2) = 36 kWh
Time = 36 / 1.4 = 25.7 hours (worst case)
Time = 36 / 3.7 = 9.7 hours (best case, EU)
```

### 2.2 Level 2 Charging (AC)

**Specifications:**
```
Voltage: 208-240V AC
Current: 12-80A
Power: 3.3-19.2 kW
Connector: SAE J1772 (NA), IEC 62196 Type 2 (EU)
```

**Power Levels:**
- **3.3 kW**: 14A @ 240V (portable chargers)
- **7.2 kW**: 30A @ 240V (home wallbox)
- **11 kW**: 48A @ 240V (commercial)
- **19.2 kW**: 80A @ 240V (high-power commercial)

**Charging Time (60 kWh battery, 20% → 80%)**
```
At 7.2 kW: 36 / 7.2 = 5 hours
At 11 kW: 36 / 11 = 3.3 hours
```

**Installation Requirements:**
- Dedicated 240V circuit
- Proper grounding
- GFCI protection
- Load management system (optional)

### 2.3 Level 3 Charging (DC Fast Charging)

**Specifications:**
```
Voltage: 200-1000V DC
Current: 0-500A
Power: 50-350 kW
Connector: CCS, CHAdeMO, Tesla Supercharger
```

**Power Tiers:**
- **50 kW**: Entry-level DC fast charging
- **150 kW**: Standard highway fast charging
- **250 kW**: High-power charging (Tesla V3, Electrify America)
- **350 kW**: Ultra-fast charging (Ionity, future systems)

**Charging Time (60 kWh battery, 20% → 80%)**
```
At 50 kW: 36 / 50 = 0.72 hours (43 minutes)
At 150 kW: 36 / 150 = 0.24 hours (14.4 minutes)
At 350 kW: 36 / 350 = 0.10 hours (6 minutes)*
```
*Note: Actual charging limited by battery acceptance rate

**Charging Curve:**

DC fast charging follows a tapered curve:
```
0-20% SOC: Maximum power (350 kW)
20-50% SOC: High power (300-350 kW)
50-80% SOC: Reduced power (150-250 kW)
80-100% SOC: Low power (50-100 kW)
```

---

## 3. Connector Standards

### 3.1 CCS (Combined Charging System)

**Type 1 (CCS1)**: North America
```
AC Pins: SAE J1772 (5-pin)
DC Pins: 2 additional high-power pins
Max AC Power: 19.2 kW
Max DC Power: 350 kW
Voltage: Up to 920V DC
Current: Up to 500A
```

**Type 2 (CCS2)**: Europe, Rest of World
```
AC Pins: IEC 62196 Type 2 (7-pin)
DC Pins: 2 additional high-power pins
Max AC Power: 43 kW (3-phase)
Max DC Power: 350 kW
Voltage: Up to 920V DC
Current: Up to 500A
```

**Pin Configuration:**
1. Proximity detection
2. Control pilot (communication)
3. AC Phase 1, 2, 3 (Type 2 only)
4. Neutral
5. Ground/Earth
6. DC+ (high voltage positive)
7. DC- (high voltage negative)

### 3.2 CHAdeMO

**Specifications:**
```
Standard: CHAdeMO 1.0, 2.0, 3.0
Max Power: 62.5 kW (v1.0), 200 kW (v2.0), 400 kW (v3.0)
Voltage: 50-500V DC (v1.0), up to 1000V (v3.0)
Current: Up to 400A
Connector: Dedicated DC connector
Communication: CAN bus
```

**Features:**
- V2G capable from v1.0
- Bidirectional charging
- Popular in Japan and Asia
- Used by Nissan, Mitsubishi

### 3.3 Tesla Supercharger

**Specifications:**
```
Connector: Proprietary (North America), CCS2 (Europe)
V2 Supercharger: Up to 150 kW
V3 Supercharger: Up to 250 kW
V4 Supercharger: Up to 350 kW (future)
Voltage: 50-500V DC
Communication: Proprietary + CAN
```

**Features:**
- Liquid-cooled cables (V3+)
- Plug & Charge (no authentication needed)
- Dynamic power sharing
- Battery preconditioning

### 3.4 GB/T (China Standard)

**Specifications:**
```
AC: GB/T 20234.2
DC: GB/T 20234.3
Max AC Power: 43 kW
Max DC Power: 237.5 kW
Voltage: Up to 950V DC
Current: Up to 250A
```

**Adoption:**
- Mandatory in China
- Used by all Chinese EVs
- Growing international adoption

---

## 4. Communication Protocols

### 4.1 OCPP (Open Charge Point Protocol)

**Version Support:**
- OCPP 1.6: Current standard
- OCPP 2.0.1: Latest version with ISO 15118 support

**Architecture:**
```
[Charging Station] ←→ [OCPP] ←→ [Central Management System]
```

**Core Functionality:**
```json
{
  "messageType": "StatusNotification",
  "connectorId": 1,
  "status": "Charging",
  "errorCode": "NoError",
  "timestamp": "2025-12-26T10:00:00Z"
}
```

**OCPP Operations:**
1. **Remote Commands**:
   - Start/Stop charging
   - Unlock connector
   - Reset station
   - Update firmware

2. **Monitoring**:
   - Real-time power metrics
   - Energy consumption
   - Fault detection
   - Connector status

3. **Smart Charging**:
   - Set charging profiles
   - Power limits
   - Schedule management

### 4.2 ISO 15118 (Plug & Charge)

**Features:**
- Automatic authentication via digital certificate
- Encrypted communication (TLS)
- Bidirectional communication
- V2G support

**Communication Stack:**
```
Application Layer: ISO 15118-2 (Messages)
Transport Layer: TCP/IP
Network Layer: IPv6
Data Link: HomePlug Green PHY / MCS
Physical: Power Line Communication (PLC) via charging cable
```

**Authentication Flow:**
```
1. Vehicle connects to EVSE
2. Physical connection verified
3. Digital certificate exchange
4. Payment contract validation
5. Charging parameters negotiated
6. Charging authorized and starts
```

**Message Types:**
```xml
<SessionSetupReq>
  <Header>
    <SessionID>A1B2C3D4</SessionID>
  </Header>
  <EVCCID>1A:2B:3C:4D:5E:6F</EVCCID>
</SessionSetupReq>

<ChargeParameterDiscoveryReq>
  <MaxEntriesSAScheduleTuple>3</MaxEntriesSAScheduleTuple>
  <RequestedEnergyTransferMode>DC_extended</RequestedEnergyTransferMode>
  <DC_EVChargeParameter>
    <DepartureTime>18000</DepartureTime>
    <DC_EVStatus>
      <EVRESSSOC>25</EVRESSSOC>
    </DC_EVStatus>
    <EVMaximumCurrentLimit>
      <Value>400</Value>
      <Unit>A</Unit>
    </EVMaximumCurrentLimit>
  </DC_EVChargeParameter>
</ChargeParameterDiscoveryReq>
```

### 4.3 IEC 61851 (Control Pilot)

**PWM Signal Specification:**
```
Frequency: 1 kHz ± 0.1 kHz
Voltage: +12V / -12V
Duty Cycle: 10-96%
```

**Duty Cycle to Current Mapping:**
```
10% ≤ D < 85%: I = (D / 100) × 0.6 × 1000 A
85% ≤ D ≤ 96%: I = ((D - 64) / 100) × 2.5 × 1000 A

Examples:
D = 30%: I = 18A
D = 50%: I = 30A
D = 80%: I = 48A
```

**State Machine:**
```
State A: Vehicle not connected (12V)
State B: Vehicle connected, not ready (9V)
State C: Vehicle connected, ready to charge (6V)
State D: Vehicle connected, charging with ventilation (3V)
State E: Short circuit detected (0V)
State F: EVSE not available (-12V)
```

---

## 5. Smart Charging

### 5.1 Load Management

**Objectives:**
- Prevent grid overload
- Optimize energy costs
- Balance power across multiple chargers
- Integrate renewable energy

**Dynamic Load Balancing:**
```
Available Power = Grid Limit - Building Load
Charger Power = Available Power / Number of Active Chargers

Example:
Grid Limit: 100 kW
Building Load: 30 kW
Active Chargers: 3
Charger Power: (100 - 30) / 3 = 23.3 kW each
```

**Priority Levels:**
```
1. Critical (Emergency vehicles, fleet): 100% power
2. High (Departing soon): 80% power
3. Medium (Standard): 60% power
4. Low (Overnight): 40% power
```

### 5.2 Demand Response

**Time-of-Use (TOU) Optimization:**
```
Off-Peak (23:00-07:00): $0.08/kWh → Charge at 100%
Mid-Peak (07:00-17:00): $0.15/kWh → Charge at 50%
On-Peak (17:00-23:00): $0.35/kWh → Charge at 0% (if possible)
```

**Scheduling Algorithm:**
```python
def optimize_charging(departure_time, current_soc, target_soc, battery_capacity):
    energy_needed = battery_capacity * (target_soc - current_soc)

    # Get TOU schedule
    rate_schedule = get_rate_schedule(now, departure_time)

    # Sort periods by price (cheapest first)
    sorted_periods = sort_by_price(rate_schedule)

    # Allocate charging to cheapest periods
    charging_schedule = []
    remaining_energy = energy_needed

    for period in sorted_periods:
        if remaining_energy <= 0:
            break

        available_time = period.duration
        max_energy = period.power * available_time

        allocated_energy = min(remaining_energy, max_energy)
        charging_schedule.append({
            'start': period.start,
            'end': period.end,
            'power': allocated_energy / available_time,
            'cost': allocated_energy * period.price
        })

        remaining_energy -= allocated_energy

    return charging_schedule
```

### 5.3 Solar Integration

**Solar + Storage + EV Charging:**
```
Priority Order:
1. Critical loads (building essential systems)
2. EV charging (from solar if available)
3. Battery storage charging
4. Export to grid (if net metering available)
```

**Solar Charging Algorithm:**
```
Available Solar = Solar Generation - Building Load

If Available Solar > 0:
    EV Charging Power = min(Available Solar, EV Max Power)
Else:
    If Battery SOC > 80%:
        EV Charging Power = Battery Discharge (up to EV Max Power)
    Else:
        EV Charging Power = Grid Power (limited by TOU strategy)
```

---

## 6. Vehicle-to-Grid (V2G)

### 6.1 Bidirectional Charging

**Capabilities:**
- Export power from vehicle to grid
- Frequency regulation
- Peak shaving
- Emergency backup power

**Technical Requirements:**
```
Connector: CHAdeMO or CCS2 (with V2G support)
Protocol: ISO 15118-20
Inverter: Bidirectional DC/AC
Max Discharge Power: 10-100 kW (vehicle dependent)
```

**Power Flow:**
```
Grid → Charger → Vehicle (G2V): Charging
Vehicle → Charger → Grid (V2G): Discharging
Vehicle → Charger → Home (V2H): Home backup
Vehicle → Charger → Building (V2B): Building support
```

### 6.2 Grid Services

**Frequency Regulation:**
```
Grid Frequency: 60 Hz (NA) / 50 Hz (EU)
Tolerance: ±0.05 Hz (normal), ±0.2 Hz (emergency)

If Frequency < 59.95 Hz:
    Discharge 20% of available battery power
Else If Frequency > 60.05 Hz:
    Charge at 20% of max charging power
Else:
    Maintain current state
```

**Revenue Model:**
```
V2G Revenue = (Energy Discharged × Sell Price) - (Energy Charged × Buy Price) - Degradation Cost

Example:
Energy Discharged: 10 kWh @ $0.50/kWh = $5.00
Energy Charged: 12 kWh @ $0.10/kWh = $1.20 (includes losses)
Degradation: 10 kWh × $0.05/kWh = $0.50
Net Revenue: $5.00 - $1.20 - $0.50 = $3.30
```

### 6.3 Battery Degradation Management

**Cycle Counting:**
```
Full Cycle = 100% DOD (Depth of Discharge)
Partial Cycle Credit = (SOC_start - SOC_end) / 100

Example:
Charge from 40% to 80%: 0.4 cycles
Discharge from 80% to 60%: 0.2 cycles
Total: 0.6 cycles
```

**Degradation Limits:**
```
Max Daily Cycles: 2.0 full cycles
Max DOD per Cycle: 80%
Preferred SOC Range: 20-80%
Calendar Aging Factor: 0.02% per month
```

---

## 7. Billing and Payment

### 7.1 Pricing Models

**Energy-Based Pricing:**
```
Cost = Energy (kWh) × Price ($/kWh)

Example:
30 kWh @ $0.35/kWh = $10.50
```

**Time-Based Pricing:**
```
Cost = Time (minutes) × Price ($/minute)

Example:
45 minutes @ $0.25/minute = $11.25
```

**Hybrid Pricing:**
```
Cost = Session Fee + (Energy × Energy Price) + (Time × Time Price)

Example:
Session: $2.00
Energy: 30 kWh @ $0.25/kWh = $7.50
Time: 45 min @ $0.05/min = $2.25
Total: $11.75
```

**Idle Fees:**
```
If session completed and vehicle still connected:
    First 10 minutes: Free
    After 10 minutes: $0.50/minute
```

### 7.2 Payment Methods

**Supported Methods:**
1. **RFID Card**: Touch and charge
2. **Mobile App**: QR code or NFC
3. **Credit Card**: EMV chip or contactless
4. **Plug & Charge**: ISO 15118 automatic billing
5. **Subscription**: Monthly plans

**Transaction Flow:**
```
1. Authentication
   ↓
2. Authorization (payment method validation)
   ↓
3. Charging session start
   ↓
4. Real-time metering
   ↓
5. Session end
   ↓
6. Final billing calculation
   ↓
7. Payment processing
   ↓
8. Receipt generation
```

### 7.3 Roaming and Interoperability

**Roaming Protocols:**
- **OCPI** (Open Charge Point Interface)
- **eMIP** (eMobility Inter-operation Protocol)
- **OICP** (Open InterCharge Protocol)

**Roaming Fee Structure:**
```
Driver Payment → Home Operator → Roaming Hub → Host Operator → Charge Point

Fee Split Example:
Total Cost: $15.00
Host Operator: $12.00 (80%)
Roaming Hub: $1.50 (10%)
Home Operator: $1.50 (10%)
```

---

## 8. Data Formats

### 8.1 Charging Session Record

```json
{
  "sessionId": "CS-2025-12-26-001234",
  "stationId": "EVSE-NYC-001",
  "connectorId": 1,
  "connectorType": "CCS",
  "vehicleId": "VIN-1HGBH41JXMN109186",
  "userId": "user-abc123",
  "startTime": "2025-12-26T10:00:00Z",
  "endTime": "2025-12-26T10:45:00Z",
  "startSOC": 25,
  "endSOC": 80,
  "energyDelivered": 42.5,
  "averagePower": 56.7,
  "peakPower": 150,
  "chargingCurve": [
    {"time": "10:00", "power": 150, "soc": 25},
    {"time": "10:15", "power": 145, "soc": 45},
    {"time": "10:30", "power": 120, "soc": 65},
    {"time": "10:45", "power": 80, "soc": 80}
  ],
  "pricing": {
    "energyPrice": 0.35,
    "timePrice": 0.05,
    "sessionFee": 2.00,
    "idleFee": 0,
    "totalCost": 18.88
  },
  "payment": {
    "method": "credit_card",
    "cardLast4": "4242",
    "transactionId": "txn_1234567890",
    "status": "completed"
  }
}
```

### 8.2 Charging Station Status

```json
{
  "stationId": "EVSE-NYC-001",
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060,
    "address": "123 Main St, New York, NY 10001"
  },
  "operator": "ChargeNet USA",
  "connectors": [
    {
      "connectorId": 1,
      "type": "CCS",
      "maxPower": 150,
      "status": "Available",
      "pricing": {
        "currency": "USD",
        "energyPrice": 0.35,
        "sessionFee": 2.00
      }
    },
    {
      "connectorId": 2,
      "type": "CHAdeMO",
      "maxPower": 50,
      "status": "Charging",
      "currentSession": {
        "startTime": "2025-12-26T09:30:00Z",
        "currentSOC": 65,
        "estimatedEndTime": "2025-12-26T10:15:00Z"
      }
    }
  ],
  "amenities": ["WiFi", "Restroom", "Coffee"],
  "access": "24/7",
  "lastUpdated": "2025-12-26T10:30:00Z"
}
```

### 8.3 Vehicle Information

```json
{
  "vehicleId": "VIN-1HGBH41JXMN109186",
  "make": "Tesla",
  "model": "Model 3",
  "year": 2024,
  "battery": {
    "capacity": 75,
    "usableCapacity": 72,
    "chemistry": "NMC",
    "warrantyMiles": 120000,
    "warrantYears": 8
  },
  "charging": {
    "connectors": ["CCS", "Tesla"],
    "maxACPower": 11,
    "maxDCPower": 250,
    "maxCurrent": 500,
    "maxVoltage": 400
  },
  "efficiency": {
    "whPerMile": 250,
    "range": 288
  },
  "owner": {
    "userId": "user-abc123",
    "subscriptions": ["ChargeNet", "Electrify America"]
  }
}
```

---

## 9. API Interface

### 9.1 Calculate Charging Time

```typescript
interface ChargingTimeRequest {
  batteryCapacity: number;    // kWh
  currentSOC: number;          // 0-1
  targetSOC: number;           // 0-1
  chargingPower: number;       // kW
  efficiency?: number;         // 0-1, default 0.9
}

interface ChargingTimeResponse {
  hours: number;
  minutes: number;
  energyDelivered: number;     // kWh
  finalSOC: number;            // 0-1
  estimatedCost?: number;      // if pricing available
}
```

### 9.2 Validate Charging Session

```typescript
interface SessionValidation {
  connectorType: ConnectorType;
  vehicleType: 'BEV' | 'PHEV';
  maxPower: number;            // kW
  batteryCapacity: number;     // kWh
  currentSOC?: number;         // 0-1
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  compatibility: {
    connector: boolean;
    power: boolean;
    communication: boolean;
  };
  estimatedTime?: ChargingTimeResponse;
}
```

### 9.3 Start Charging Session

```typescript
interface StartSessionRequest {
  stationId: string;
  connectorId: number;
  userId: string;
  vehicleId?: string;
  paymentMethod: PaymentMethod;
  targetSOC?: number;          // 0-1
  departureTime?: Date;
  maxCost?: number;
}

interface StartSessionResponse {
  sessionId: string;
  status: 'started' | 'pending' | 'failed';
  estimatedCost: number;
  estimatedEndTime: Date;
  qrCode?: string;
  deepLink?: string;
}
```

---

## 10. Safety Protocols

### 10.1 Electrical Safety

**Ground Fault Protection:**
```
Fault Current Detection: >20 mA
Response Time: <40 ms
Action: Immediate shutdown and connector lock
```

**Overcurrent Protection:**
```
Max Current: As advertised by EVSE
Tolerance: +10% for 60 seconds, +5% continuous
Trip Level: 120% of rated current
```

**Voltage Monitoring:**
```
Acceptable Range: ±10% of nominal
Under-voltage: <90% for >1 second → shutdown
Over-voltage: >110% for >100ms → immediate shutdown
```

### 10.2 Thermal Management

**Temperature Limits:**
```
Cable: -40°C to 50°C (operating), 85°C (max)
Connector: -40°C to 50°C (operating), 90°C (max)
Inlet: -40°C to 50°C (operating), 105°C (max)

Temperature Monitoring:
- Every second during charging
- Multiple sensors (cable, connector, inlet)
- Derating if temperature >45°C
- Shutdown if temperature >85°C
```

**Cooling Requirements:**
```
Power >150 kW: Liquid cooling required
Power 50-150 kW: Active air cooling recommended
Power <50 kW: Passive cooling acceptable
```

### 10.3 Communication Safety

**Fault Detection:**
```
Control Pilot Signal Lost: Stop charging within 3 seconds
Proximity Detection Lost: Immediate shutdown
Communication Timeout: 30 seconds → graceful shutdown
State Transition Error: Immediate shutdown
```

**Emergency Stop:**
```
Physical E-Stop Button: <1 second response
Software Command: <3 second response
Remote Command: <10 second response
```

### 10.4 Cybersecurity

**Authentication:**
- TLS 1.3 for all communications
- Certificate-based authentication
- Token rotation every 24 hours
- Multi-factor authentication for admin

**Data Protection:**
- Encryption at rest (AES-256)
- Encryption in transit (TLS 1.3)
- PCI DSS compliance for payments
- GDPR compliance for user data

**Firmware Security:**
```
Secure Boot: Verify firmware signature
Encrypted Updates: AES-256 encrypted
Version Control: Rollback protection
Update Authentication: Signed by authorized CA
```

---

## 11. References

### 11.1 Standards

1. **SAE J1772** - AC Level 1 and Level 2 Charging
2. **IEC 62196** - Plugs, socket-outlets, vehicle connectors
3. **IEC 61851** - Electric vehicle conductive charging system
4. **ISO 15118** - Road vehicles - Vehicle to grid communication
5. **CHAdeMO** - DC fast charging protocol
6. **CCS** - Combined Charging System
7. **OCPP 1.6/2.0.1** - Open Charge Point Protocol
8. **SAE J2954** - Wireless Power Transfer (WPT)

### 11.2 Connector Types

| Standard | IEC Code | SAE Code | Region | Type |
|----------|----------|----------|--------|------|
| Type 1 | IEC 62196-2 | SAE J1772 | North America, Japan | AC |
| Type 2 | IEC 62196-2 | - | Europe, Global | AC |
| CCS1 | IEC 62196-3 | SAE J1772 Combo | North America | DC + AC |
| CCS2 | IEC 62196-3 | - | Europe, Global | DC + AC |
| CHAdeMO | - | - | Japan, Asia | DC |
| GB/T | GB/T 20234 | - | China | DC + AC |

### 11.3 Power Levels

| Level | Power Range | Voltage | Use Case | Typical Time |
|-------|-------------|---------|----------|--------------|
| 1 | 1.4-1.9 kW | 120V AC | Home (overnight) | 20-40 hours |
| 2 | 3.3-19.2 kW | 240V AC | Home/Public | 4-8 hours |
| 3 (DC) | 50-350 kW | 400-800V DC | Highway/Fast | 15-45 minutes |

### 11.4 Organizations

- **WIA**: World Certification Industry Association
- **SAE**: Society of Automotive Engineers
- **IEC**: International Electrotechnical Commission
- **ISO**: International Organization for Standardization
- **CharIN**: Charging Interface Initiative
- **OCA**: Open Charge Alliance

---

**弘益人間 (홍익인간) · Benefit All Humanity**

*WIA-AUTO-005 Specification v1.0*
*© 2025 SmileStory Inc. / WIA*
*MIT License*
