# WIA-AUTO-018: Railway System Specification v1.0

> **Standard ID:** WIA-AUTO-018
> **Version:** 1.0.0
> **Published:** 2025-12-26
> **Status:** Active
> **Authors:** WIA Railway Engineering Group

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Signaling Systems](#2-signaling-systems)
3. [Train Control Systems](#3-train-control-systems)
4. [Communication Systems](#4-communication-systems)
5. [Passenger Information Systems](#5-passenger-information-systems)
6. [Automatic Train Operation](#6-automatic-train-operation)
7. [Platform Screen Doors](#7-platform-screen-doors)
8. [Railway Dynamics](#8-railway-dynamics)
9. [Data Formats](#9-data-formats)
10. [API Interface](#10-api-interface)
11. [Safety Protocols](#11-safety-protocols)
12. [References](#12-references)

---

## 1. Introduction

### 1.1 Purpose

This specification defines the technical framework for modern railway systems, encompassing signaling, train control, communication, passenger services, and safety mechanisms to enable safe, efficient, and interoperable railway operations worldwide.

### 1.2 Scope

The standard covers:
- Signaling systems (ETCS, CBTC, PTC)
- Train control and protection
- Radio communication systems (GSM-R, LTE-R)
- Passenger information and services
- Automatic train operation
- Platform safety systems
- Railway dynamics and physics
- Safety Integrity Levels (SIL)

### 1.3 Philosophy

**弘益人間 (Benefit All Humanity)** - This standard aims to create a unified railway infrastructure that connects communities, reduces environmental impact through sustainable transportation, and provides safe, accessible mobility for all people.

### 1.4 Terminology

- **ATO**: Automatic Train Operation - automated driving system
- **ATP**: Automatic Train Protection - safety system preventing unsafe movements
- **ATS**: Automatic Train Supervision - traffic management system
- **CBTC**: Communications-Based Train Control - modern signaling using continuous radio
- **ETCS**: European Train Control System - European standard for train control
- **GSM-R**: Global System for Mobile Communications - Railway - dedicated railway radio
- **PTC**: Positive Train Control - North American train protection system
- **SIL**: Safety Integrity Level - measure of safety system reliability

---

## 2. Signaling Systems

### 2.1 ETCS (European Train Control System)

ETCS is the European standard for train control and protection, part of ERTMS (European Rail Traffic Management System).

#### 2.1.1 ETCS Level 1

**Architecture:**
- Track-side Eurobalises transmit point information
- LEU (Lineside Electronic Unit) interfaces with interlocking
- DMI (Driver Machine Interface) displays information to driver
- Infill (optional) provides intermediate updates

**Operation:**
```
Movement Authority (MA) = Distance to next signal + Signal aspect
```

**Data Flow:**
```
Interlocking → LEU → Eurobalise → Train → OBU → DMI → Driver
```

**Key Features:**
- Compatible with existing signals
- Point-based transmission
- National speed limits stored in train database
- Movement authority based on signal aspects

#### 2.1.2 ETCS Level 2

**Architecture:**
- Continuous communication via GSM-R
- Radio Block Center (RBC) manages train movements
- No track-side signals (cab signaling only)
- Eurobalises only for location reference

**Operation:**
```
RBC calculates: MA = Track section + Overlap + Safety distance
```

**Communication Protocol:**
```
Train → GSM-R → RBC → Interlocking
```

**Advantages:**
- Higher capacity (reduced headway)
- Lower maintenance (no signals)
- Dynamic speed profiles
- Continuous supervision

#### 2.1.3 ETCS Level 3

**Architecture:**
- Moving block operation
- Train integrity detection via on-board systems
- Satellite positioning (GNSS) augmentation
- No track circuits required

**Capacity Improvement:**
```
C_L3 / C_L2 = (H_L2 / H_L3) ≈ 1.4 - 1.6
```

Where:
- `C` = Line capacity
- `H` = Headway
- Subscripts indicate ETCS level

**Key Innovation:**
- Real-time train position to RBC
- Dynamic safety distance
- Optimal capacity utilization

### 2.2 CBTC (Communications-Based Train Control)

CBTC is the modern signaling standard for metro and urban rail systems, enabling high-frequency operations.

#### 2.2.1 System Architecture

**Components:**
```
Train → Radio → Zone Controller → Automatic Train Supervision → Control Center
```

**Communication:**
- Continuous bidirectional radio (typically 2.4 GHz or LTE)
- Polling cycle: 100-500 ms
- Redundant radio coverage (N+1)

#### 2.2.2 Moving Block Principle

**Distance Calculation:**
```
d_safe = d_train + d_braking + d_overlay + d_uncertainty
```

Where:
- `d_train` = Distance to leading train
- `d_braking` = Braking distance of following train
- `d_overlay` = Additional safety margin
- `d_uncertainty` = Position uncertainty buffer

**Typical Values:**
- Metro (80 km/h): Headway 90-120 seconds
- Metro (60 km/h): Headway 75-90 seconds
- Frequency: 30-40 trains/hour/direction

#### 2.2.3 Grades of Automation (GoA)

**GoA 1 - Non-automated (ATP only):**
- Driver controls speed and doors
- ATP provides protection only

**GoA 2 - Semi-automated (ATO with driver):**
- ATO controls acceleration and braking
- Driver monitors and closes doors
- Driver intervention possible

**GoA 3 - Driverless (attendant on board):**
- ATO controls train completely
- Attendant handles emergencies
- Automatic door operation

**GoA 4 - Unattended (fully automated):**
- No staff on train
- Remote supervision from control center
- Automatic fault detection and response

### 2.3 PTC (Positive Train Control)

PTC is the North American standard mandated for passenger and freight railways.

#### 2.3.1 Core Functions

**Prevent:**
1. Train-to-train collisions
2. Overspeed derailments
3. Incursions into work zones
4. Movement through misaligned switches

#### 2.3.2 System Components

**On-Board:**
- GPS receiver for positioning
- Locomotive data terminal
- Brake interface unit
- Back office server connection

**Wayside:**
- Signal state monitors
- Switch position monitors
- Radio towers (220 MHz)

**Office:**
- Back office server (BOS)
- CAD (Computer-Aided Dispatch) integration
- Movement authority generation

#### 2.3.3 Braking Curves

**Service Brake Curve:**
```
v_limit(d) = √(2 × a_service × d)
```

**Penalty Brake Curve:**
```
v_penalty(d) = √(2 × a_penalty × d) + v_margin
```

Where:
- `v_limit` = Speed limit at distance d
- `a_service` = Service deceleration (0.5-0.7 m/s²)
- `a_penalty` = Penalty deceleration (0.8-1.0 m/s²)
- `v_margin` = Speed margin (typically 5-10 km/h)

---

## 3. Train Control Systems

### 3.1 Automatic Train Protection (ATP)

ATP is the safety-critical component that prevents unsafe train movements.

#### 3.1.1 Speed Supervision

**Continuous Supervision:**
```
v_actual ≤ v_permitted(location)
```

**Braking Curve Calculation:**
```
v_permitted(d) = √(v_target² + 2 × a_brake × d)
```

Where:
- `v_permitted` = Maximum permitted speed at distance d
- `v_target` = Target speed (next signal/speed limit)
- `a_brake` = Guaranteed deceleration rate
- `d` = Distance to target

#### 3.1.2 Movement Authority

**Structure:**
```
MA = {
  end_location: distance or position,
  target_speed: speed at end_location,
  speed_profiles: [(location, speed_limit)],
  gradient_profile: [(location, gradient)],
  validity: time or condition
}
```

**Enforcement:**
- Train cannot exceed MA endpoint
- ATP applies emergency brake if MA violated
- MA updated dynamically by RBC/Zone Controller

#### 3.1.3 Emergency Brake Intervention

**Trigger Conditions:**
- Speed exceeds permitted + tolerance
- MA endpoint reached without stopping
- Communication loss (timeout)
- Equipment failure detection

**Response Time:**
```
t_response ≤ 1.0 seconds (SIL 4 requirement)
```

**Brake Application:**
```
Brake command → Brake valve → Brake cylinder → Brake force
Time: < 2.5 seconds to full pressure
```

### 3.2 Automatic Train Operation (ATO)

ATO automates driving functions while ATP ensures safety.

#### 3.2.1 Speed Profile Optimization

**Objective Function:**
```
minimize: E_total = ∫(P_traction + P_comfort) dt
```

**Constraints:**
- Arrival time: t_arrival = t_scheduled ± ε
- Speed limits: v(t) ≤ v_limit(position(t))
- Jerk limits: |dv/dt²| ≤ j_max
- Braking distance: d_brake(v) ≤ d_available

**Typical Profile:**
```
1. Maximum acceleration: a = a_max
2. Constant speed: v = v_limit
3. Coasting: a = 0 (when possible)
4. Service braking: a = -a_service
```

#### 3.2.2 Passenger Comfort

**Jerk Limits (SIL 0, comfort only):**
- Longitudinal jerk: |j_long| ≤ 0.75 m/s³
- Emergency situations: |j_long| ≤ 2.0 m/s³

**Acceleration Limits:**
- Starting: a ≤ 1.0 m/s²
- Maximum service: a ≤ 1.2 m/s²
- Braking: a ≥ -0.7 m/s² (service)
- Emergency: a ≥ -1.5 m/s²

#### 3.2.3 Station Stopping

**Precision Stopping:**
```
Error tolerance: ±0.3 meters (metro), ±0.5 meters (mainline)
```

**Stopping Algorithm:**
```
1. Approach phase: Reduce to v_approach (≈ 30 km/h)
2. Precision phase: Calculate exact braking point
3. Final approach: Fine control (≈ 5 km/h)
4. Creep to marker: ±0.3 m accuracy
```

### 3.3 Automatic Train Supervision (ATS)

ATS manages traffic across the network.

#### 3.3.1 Route Setting

**Automatic Route Setting:**
```
if (train_approaching AND route_conditions_met) {
  set_route(origin, destination);
  reserve_track_sections();
  update_signals();
  send_movement_authority();
}
```

**Conflict Resolution:**
- Priority based on schedule adherence
- First-come-first-served for equal priority
- Manual override possible from control center

#### 3.3.2 Headway Management

**Target Headway:**
```
H_target = max(H_minimum, H_scheduled)
```

**Minimum Safe Headway:**
```
H_minimum = (d_braking + L_train + d_safety) / v_average
```

**Regulation:**
- Green wave progression for metro
- Automatic speed adjustment
- Skip-stop patterns for express service

---

## 4. Communication Systems

### 4.1 GSM-R (GSM for Railways)

GSM-R is the digital radio system for railway communication.

#### 4.1.1 Technical Specifications

**Frequency Bands:**
- Uplink: 876-880 MHz
- Downlink: 921-925 MHz
- Channel bandwidth: 200 kHz

**Coverage:**
- Track-side: 99.5% availability
- Speed: Up to 500 km/h
- Handover: < 300 ms

**Services:**
- Voice calls (drivers, dispatchers)
- ETCS data transmission
- Shunting communication
- Emergency calls

#### 4.1.2 Functional Addressing

**Numbers:**
- Train number: e.g., 0049821234567
- Functional number: e.g., 004920XXXXXX
- Emergency: Functional group call

**Priority Levels:**
```
0: Emergency call (highest)
1: High priority call
2: Normal call
3: Low priority call
```

### 4.2 LTE-R (LTE for Railways)

LTE-R is the next-generation railway communication system.

#### 4.2.1 FRMCS (Future Railway Mobile Communication System)

**Technology:**
- LTE (4G) and 5G networks
- Mission-critical push-to-talk (MCPTT)
- High-speed data (up to 300 Mbps)
- Low latency (< 50 ms)

**Applications:**
- ETCS Level 2/3 data
- CCTV streaming
- Passenger Wi-Fi
- Predictive maintenance data

#### 4.2.2 Quality of Service (QoS)

**Traffic Classes:**
```
Class 1: Safety-critical (ETCS) - Priority 1, latency < 50 ms
Class 2: Operational voice - Priority 2, latency < 100 ms
Class 3: Operational data - Priority 3, latency < 200 ms
Class 4: Passenger services - Priority 4, best effort
```

### 4.3 TETRA (Terrestrial Trunked Radio)

Used in some metro and urban rail systems.

**Features:**
- Group calls
- Direct mode operation (train-to-train)
- Fast call setup (< 300 ms)
- End-to-end encryption

---

## 5. Passenger Information Systems

### 5.1 Real-Time Information

#### 5.1.1 Data Sources

**Train Position:**
```
position = {
  train_id: string,
  latitude: number,
  longitude: number,
  accuracy: number (meters),
  speed: number (km/h),
  heading: number (degrees),
  timestamp: ISO 8601
}
```

**Schedule Data:**
```
schedule = {
  station_id: string,
  arrival_time: ISO 8601,
  departure_time: ISO 8601,
  platform: string,
  delay: number (seconds),
  status: 'on-time' | 'delayed' | 'cancelled'
}
```

#### 5.1.2 Display Systems

**Platform Displays:**
- Next train: ETA, destination, platform
- Following trains: next 2-3 departures
- Service alerts and disruptions
- Update frequency: 10-30 seconds

**In-Train Displays:**
- Next station, arrival time
- Connection information
- Route map with current position
- Station facilities

#### 5.1.3 Mobile Integration

**API Response:**
```json
{
  "station_id": "CENTRAL_STN",
  "station_name": "Central Station",
  "departures": [
    {
      "train_id": "IC_1234",
      "line": "IC 5",
      "destination": "Airport Terminal",
      "scheduled_departure": "2025-12-26T14:30:00Z",
      "estimated_departure": "2025-12-26T14:33:00Z",
      "delay_seconds": 180,
      "platform": "3A",
      "status": "delayed",
      "real_time": true
    }
  ]
}
```

### 5.2 Passenger Counting

#### 5.2.1 Technologies

- **Infrared sensors**: Door-mounted sensors
- **Weight sensors**: Platform and train floor sensors
- **Video analytics**: Camera-based counting
- **Wi-Fi/Bluetooth**: Device detection (privacy-compliant)

#### 5.2.2 Occupancy Calculation

**Load Factor:**
```
LF = (passengers_on_train / capacity_total) × 100%
```

**Categories:**
- Low: 0-40%
- Medium: 40-70%
- High: 70-90%
- Overcrowded: > 90%

**Real-Time Distribution:**
```json
{
  "train_id": "M_5678",
  "total_passengers": 856,
  "capacity": 1200,
  "load_factor": 71.3,
  "cars": [
    {"car_number": 1, "passengers": 142, "capacity": 200, "load": 71},
    {"car_number": 2, "passengers": 138, "capacity": 200, "load": 69},
    ...
  ]
}
```

---

## 6. Automatic Train Operation

### 6.1 ATO Levels

**IEC 62290 Standard:**

- **GoA 0**: Manual operation (no automation)
- **GoA 1**: ATP only (driver controls)
- **GoA 2**: ATO with driver supervision
- **GoA 3**: Driverless (train attendant present)
- **GoA 4**: Unattended (fully autonomous)

### 6.2 Autonomous Operation (GoA 4)

#### 6.2.1 System Requirements

**Safety:**
- SIL 4 for all safety functions
- Redundant sensors (N+2)
- Diverse braking systems
- Fail-safe defaults

**Perception:**
- Obstacle detection: ≥ 200 meters
- Platform edge detection
- Door obstruction detection
- Emergency stop button monitoring

**Decision Making:**
```
State Machine:
  IDLE → PREPARING → READY → DEPARTING → RUNNING → ARRIVING → DWELLING → repeat
```

**Error Handling:**
```
if (critical_failure) {
  apply_emergency_brake();
  alert_control_center();
  engage_backup_systems();
  evacuate_if_necessary();
}
```

#### 6.2.2 Door Control

**Interlocking Sequence:**
```
1. Train stopped (v = 0 ± 0.1 m/s)
2. Platform detected and aligned
3. Brakes applied and confirmed
4. Platform screen doors unlock
5. Train doors unlock
6. Simultaneous opening
7. Dwell time countdown
8. Obstacle detection clear
9. Simultaneous closing
10. Doors locked confirmation
11. Ready for departure
```

**Safety Checks:**
- Door obstruction: Close → Reopen → Close (max 3 attempts)
- Emergency door release available
- Manual override from control center

---

## 7. Platform Screen Doors

### 7.1 System Architecture

#### 7.1.1 Components

**Mechanical:**
- Sliding doors (typically 1.3-1.8 m width)
- Motor drive system (AC or DC)
- Emergency release mechanism
- Edge protection sensors

**Electrical:**
- Door control unit (DCU)
- Platform-train interface
- Emergency stop buttons
- Status indicators (LED)

**Communication:**
- Train-to-PSD data link
- CBTC/ATO integration
- Control center monitoring

#### 7.1.2 Door Alignment

**Tolerance:**
```
Lateral alignment: ±150 mm
Vertical gap: 50-75 mm
Stopping accuracy: ±300 mm (metro), ±500 mm (mainline)
```

**Detection:**
- Inductive loops in platform
- RFID tags on train
- Optical sensors

### 7.2 Safety Interlocking

#### 7.2.1 Interlock Logic

**Conditions for Opening:**
```
PSD_open = train_stopped AND position_correct AND brakes_applied AND
           train_doors_ready AND no_emergency_stop AND platform_clear
```

**Sequence Diagram:**
```
Train → "Ready to open" → PSD Controller
PSD Controller → "Unlock PSD" → PSD Doors
PSD Controller → "Unlock train doors" → Train
Train + PSD → Open simultaneously
...
Train + PSD → Close simultaneously
PSD Doors → "Locked" → PSD Controller
Train Doors → "Locked" → Train
Train → "Ready to depart" → ATO
```

#### 7.2.2 Emergency Scenarios

**Emergency Opening (evacuation):**
```
Manual release: Break glass → Pull lever → Door opens manually
Remote release: Control center command → DCU → Unlock all doors
Power failure: Battery backup → Controlled opening → Manual if needed
```

**Emergency Closing:**
- Control center can force close
- Override passenger obstruction detection
- Used during emergencies only

---

## 8. Railway Dynamics

### 8.1 Braking Distance

#### 8.1.1 Basic Formula

**Total Braking Distance:**
```
d_total = d_reaction + d_braking + d_safety
```

**Reaction Distance:**
```
d_reaction = v × t_reaction
```

Where:
- `v` = Initial velocity (m/s)
- `t_reaction` = System reaction time (typically 2-3 seconds)

**Braking Distance:**
```
d_braking = v² / (2 × a)
```

Where:
- `a` = Deceleration rate (m/s²)

**Safety Margin:**
```
d_safety = 50 meters (mainline), 20 meters (metro)
```

#### 8.1.2 Example Calculations

**High-Speed Train (300 km/h = 83.33 m/s):**
```
Given:
- v = 83.33 m/s (300 km/h)
- a = 0.7 m/s² (service braking)
- t_reaction = 3 seconds

Calculation:
- d_reaction = 83.33 × 3 = 250 m
- d_braking = 83.33² / (2 × 0.7) = 4,960 m
- d_safety = 50 m
- d_total = 250 + 4,960 + 50 = 5,260 meters

Result: 5.26 km braking distance
```

**Metro Train (80 km/h = 22.22 m/s):**
```
Given:
- v = 22.22 m/s (80 km/h)
- a = 1.0 m/s² (service braking)
- t_reaction = 2 seconds

Calculation:
- d_reaction = 22.22 × 2 = 44 m
- d_braking = 22.22² / (2 × 1.0) = 247 m
- d_safety = 20 m
- d_total = 44 + 247 + 20 = 311 meters
```

### 8.2 Tractive Effort and Resistance

#### 8.2.1 Resistance Formula

**Total Resistance:**
```
R_total = R_rolling + R_aero + R_grade + R_curve
```

**Rolling Resistance:**
```
R_rolling = k_r × W
```

Where:
- `k_r` = Rolling resistance coefficient (0.0015-0.003)
- `W` = Train weight (kN)

**Aerodynamic Resistance:**
```
R_aero = 0.5 × ρ × C_d × A × v²
```

Where:
- `ρ` = Air density (1.225 kg/m³)
- `C_d` = Drag coefficient (0.6-1.8 depending on train shape)
- `A` = Frontal area (m²)
- `v` = Velocity (m/s)

**Grade Resistance:**
```
R_grade = W × sin(θ) ≈ W × (g / 1000)
```

Where:
- `g` = Gradient (‰ per thousand)

**Curve Resistance:**
```
R_curve = k_c × W / r
```

Where:
- `k_c` = Curve constant (≈ 0.5)
- `r` = Curve radius (m)

#### 8.2.2 Tractive Effort

**Available Tractive Effort:**
```
F_max = μ × W_adhesion
```

Where:
- `μ` = Adhesion coefficient (0.2-0.4 depending on conditions)
- `W_adhesion` = Weight on driven axles (kN)

**Acceleration:**
```
a = (F_traction - R_total) / m
```

Where:
- `F_traction` = Applied tractive effort (kN)
- `R_total` = Total resistance (kN)
- `m` = Train mass (tonnes)

### 8.3 Energy Consumption

#### 8.3.1 Energy Formula

**Total Energy:**
```
E_total = E_kinetic + E_potential + E_resistance + E_losses
```

**Kinetic Energy:**
```
E_kinetic = 0.5 × m × v²
```

**Potential Energy (gradient):**
```
E_potential = m × g × h
```

Where:
- `h` = Vertical elevation change (m)
- `g` = 9.81 m/s²

**Energy Recovery (regenerative braking):**
```
E_recovered = η_regen × E_kinetic_braking
```

Where:
- `η_regen` = Regeneration efficiency (0.6-0.8)

#### 8.3.2 Energy Optimization

**Optimal Driving Profile:**
```
1. Accelerate at maximum until v_cruise
2. Maintain v_cruise at minimum power
3. Coast before braking (if schedule permits)
4. Regenerative braking to recover energy
```

**Energy Savings:**
- ATO vs manual driving: 15-30% reduction
- Regenerative braking: 20-40% reduction in net energy
- Optimal speed profiles: 5-15% reduction

---

## 9. Data Formats

### 9.1 Train Status Message

```json
{
  "message_type": "train_status",
  "version": "1.0",
  "timestamp": "2025-12-26T14:35:22.123Z",
  "train": {
    "train_id": "IC_1234",
    "line": "IC 5",
    "operator": "National Rail",
    "type": "electric_multiple_unit",
    "formation": "8_cars"
  },
  "position": {
    "latitude": 51.5074,
    "longitude": -0.1278,
    "altitude": 15.5,
    "accuracy": 2.0,
    "speed": 185.3,
    "heading": 45.2,
    "track_id": "ML1",
    "milepost": 123.45
  },
  "status": {
    "operational_mode": "ATO_supervised",
    "doors": "closed_locked",
    "brakes": "released",
    "pantograph": "raised",
    "traction": "enabled"
  },
  "movement": {
    "direction": "forward",
    "acceleration": 0.3,
    "jerk": 0.05,
    "next_station": "AIRPORT_TERM",
    "eta_seconds": 420
  },
  "safety": {
    "atp_active": true,
    "movement_authority_end": 125.2,
    "permitted_speed": 200,
    "target_speed": 160,
    "vigilance_status": "acknowledged"
  }
}
```

### 9.2 Signal Aspect Message

```json
{
  "message_type": "signal_aspect",
  "version": "1.0",
  "timestamp": "2025-12-26T14:35:22.123Z",
  "signal": {
    "signal_id": "SIG_123A",
    "location": {
      "latitude": 51.5075,
      "longitude": -0.1280,
      "milepost": 124.0
    },
    "aspect": "GREEN",
    "aspect_code": "G",
    "speed_limit": 200,
    "distance_to_next": 2500,
    "next_signal_aspect": "YELLOW"
  },
  "route": {
    "route_id": "R_45",
    "route_type": "main_line",
    "points_position": "normal",
    "overlap_distance": 200
  },
  "movement_authority": {
    "end_location": 126.5,
    "end_speed": 0,
    "profile": [
      {"location": 124.0, "speed": 200},
      {"location": 125.5, "speed": 160},
      {"location": 126.0, "speed": 80},
      {"location": 126.5, "speed": 0}
    ]
  }
}
```

### 9.3 Platform Information

```json
{
  "message_type": "platform_info",
  "version": "1.0",
  "timestamp": "2025-12-26T14:35:22.123Z",
  "station": {
    "station_id": "CENTRAL_STN",
    "station_name": "Central Station",
    "station_code": "CST"
  },
  "platform": {
    "platform_id": "3A",
    "platform_number": "3",
    "platform_section": "A",
    "length": 400,
    "height": 1100,
    "track_id": "T3"
  },
  "train": {
    "train_id": "IC_1234",
    "scheduled_arrival": "2025-12-26T14:30:00Z",
    "estimated_arrival": "2025-12-26T14:33:00Z",
    "actual_arrival": "2025-12-26T14:33:15Z",
    "scheduled_departure": "2025-12-26T14:32:00Z",
    "estimated_departure": "2025-12-26T14:35:00Z",
    "platform_alignment": "aligned",
    "stopping_position": "section_A",
    "stopping_accuracy_cm": 15
  },
  "platform_screen_doors": {
    "installed": true,
    "status": "closed_locked",
    "last_operation": "2025-12-26T14:28:45Z",
    "operational": true
  },
  "passengers": {
    "alighting": 127,
    "boarding": 89,
    "waiting_platform": 156,
    "load_factor_before": 68,
    "load_factor_after": 65
  }
}
```

---

## 10. API Interface

### 10.1 RESTful API Endpoints

#### 10.1.1 Train Position

**Endpoint:**
```
GET /api/v1/trains/{train_id}/position
```

**Response:**
```json
{
  "train_id": "IC_1234",
  "position": {
    "latitude": 51.5074,
    "longitude": -0.1278,
    "speed": 185.3,
    "heading": 45.2
  },
  "status": "in_service",
  "delay_seconds": 180,
  "next_station": "AIRPORT_TERM",
  "eta": "2025-12-26T14:42:00Z"
}
```

#### 10.1.2 Station Departures

**Endpoint:**
```
GET /api/v1/stations/{station_id}/departures
```

**Query Parameters:**
- `limit`: Number of departures (default: 10)
- `time_window`: Minutes from now (default: 60)
- `line`: Filter by line

**Response:**
```json
{
  "station_id": "CENTRAL_STN",
  "station_name": "Central Station",
  "timestamp": "2025-12-26T14:35:22Z",
  "departures": [
    {
      "train_id": "IC_1234",
      "line": "IC 5",
      "destination": "Airport Terminal",
      "scheduled": "2025-12-26T14:32:00Z",
      "estimated": "2025-12-26T14:35:00Z",
      "platform": "3A",
      "status": "delayed",
      "delay_seconds": 180
    }
  ]
}
```

#### 10.1.3 Signal Status

**Endpoint:**
```
GET /api/v1/signals/{signal_id}/status
```

**Response:**
```json
{
  "signal_id": "SIG_123A",
  "aspect": "GREEN",
  "speed_limit": 200,
  "location": {
    "milepost": 124.0,
    "track": "ML1"
  },
  "next_signal": {
    "signal_id": "SIG_124B",
    "distance": 2500,
    "aspect": "YELLOW"
  },
  "updated_at": "2025-12-26T14:35:20Z"
}
```

#### 10.1.4 Calculate Braking Distance

**Endpoint:**
```
POST /api/v1/calculate/braking-distance
```

**Request:**
```json
{
  "initial_velocity": 300,
  "deceleration_rate": 0.7,
  "reaction_time": 3,
  "safety_margin": 50
}
```

**Response:**
```json
{
  "total_distance": 5260,
  "reaction_distance": 250,
  "braking_distance": 4960,
  "safety_margin": 50,
  "time_to_stop": 119
}
```

### 10.2 WebSocket API

#### 10.2.1 Real-Time Train Updates

**Connection:**
```
wss://api.railway.example.com/ws/v1/trains/{train_id}
```

**Message Format:**
```json
{
  "type": "position_update",
  "timestamp": "2025-12-26T14:35:22.123Z",
  "train_id": "IC_1234",
  "data": {
    "latitude": 51.5074,
    "longitude": -0.1278,
    "speed": 185.3,
    "heading": 45.2
  }
}
```

#### 10.2.2 Platform Events

**Connection:**
```
wss://api.railway.example.com/ws/v1/platforms/{station_id}/{platform_id}
```

**Events:**
```json
{
  "type": "train_arriving",
  "timestamp": "2025-12-26T14:35:22Z",
  "train_id": "IC_1234",
  "eta_seconds": 30
}

{
  "type": "doors_opening",
  "timestamp": "2025-12-26T14:35:55Z",
  "train_id": "IC_1234",
  "psd_status": "opening"
}

{
  "type": "train_departing",
  "timestamp": "2025-12-26T14:37:15Z",
  "train_id": "IC_1234",
  "next_station": "AIRPORT_TERM"
}
```

---

## 11. Safety Protocols

### 11.1 Safety Integrity Levels (SIL)

Railway safety systems follow IEC 61508 and EN 50129 standards.

#### 11.1.1 SIL Definitions

**SIL 4 (Highest):**
- Probability of failure: 10⁻⁹ to 10⁻⁸ per hour
- Risk: Catastrophic (multiple fatalities)
- Examples: ATP, ATO emergency braking, interlocking

**SIL 3:**
- Probability of failure: 10⁻⁸ to 10⁻⁷ per hour
- Risk: Critical (single fatality)
- Examples: Level crossing protection, platform edge detection

**SIL 2:**
- Probability of failure: 10⁻⁷ to 10⁻⁶ per hour
- Risk: Marginal (serious injury)
- Examples: Passenger information, CCTV

**SIL 1:**
- Probability of failure: 10⁻⁶ to 10⁻⁵ per hour
- Risk: Minor injury
- Examples: Comfort functions, lighting

**SIL 0:**
- No safety function
- Examples: Entertainment, Wi-Fi

#### 11.1.2 Safety Requirements

**Redundancy:**
- SIL 4: N+2 redundancy (triple redundant with voting)
- SIL 3: N+1 redundancy (dual redundant with comparison)
- SIL 2: Single channel with monitoring

**Diversity:**
- Different hardware platforms
- Different software implementations
- Different physical principles

**Fail-Safe Defaults:**
```
if (system_failure) {
  state = SAFE_STATE;
  apply_emergency_brakes();
  set_signals_to_red();
  lock_points();
  alert_control_center();
}
```

### 11.2 RAMS (Reliability, Availability, Maintainability, Safety)

#### 11.2.1 Reliability

**Mean Time Between Failures (MTBF):**
```
MTBF_system = 1 / (Σ(1/MTBF_i))
```

Where `i` = individual component

**Target MTBF:**
- Safety-critical: > 10⁹ hours
- Operational: > 10⁶ hours

#### 11.2.2 Availability

**Definition:**
```
A = MTBF / (MTBF + MTTR)
```

Where:
- `MTBF` = Mean Time Between Failures
- `MTTR` = Mean Time To Repair

**Target Availability:**
- Mainline railway: > 99.5%
- Metro: > 99.9%
- Critical systems: > 99.99%

#### 11.2.3 Maintainability

**Mean Time To Repair (MTTR):**
- Critical systems: < 1 hour
- Important systems: < 4 hours
- Non-critical: < 24 hours

**Maintenance Strategy:**
- Predictive: Condition monitoring, trend analysis
- Preventive: Scheduled maintenance
- Corrective: Repair after failure (non-critical only)

### 11.3 Emergency Procedures

#### 11.3.1 Emergency Braking

**Trigger Sources:**
- Driver emergency button
- Passenger emergency button
- ATP automatic intervention
- Control center command
- Communication loss
- Obstacle detection

**Response:**
```
1. Immediate brake application (< 1 second)
2. Alert control center
3. Activate emergency lighting
4. Open emergency doors (after stop)
5. Broadcast emergency message
6. Deploy emergency services
```

#### 11.3.2 Evacuation Procedures

**Train Evacuation:**
```
1. Stop train safely (emergency brakes if needed)
2. Assess situation (fire, collision, medical emergency)
3. Announce evacuation instructions
4. Disable traction power (if safe)
5. Open all doors (manual if necessary)
6. Direct passengers to safe area
7. Account for all passengers
8. Coordinate with emergency services
```

**Tunnel Evacuation:**
- Proceed to nearest station if possible
- Emergency walkways available
- Emergency lighting (battery backup > 90 minutes)
- Emergency phones every 250 meters
- Ventilation control for smoke management

---

## 12. References

### 12.1 International Standards

1. **ETCS:**
   - ERA ERTMS/ETCS Baseline 3 (Subset-026 to Subset-119)
   - UNISIG SUBSET-026: System Requirements Specification
   - EN 50126: Railway applications - RAMS
   - EN 50128: Railway applications - Software for railway control systems
   - EN 50129: Railway applications - Safety related electronic systems

2. **CBTC:**
   - IEEE 1474.1: Standard for CBTC Performance and Functional Requirements
   - IEC 62290: Railway applications - Urban guided transport management and command/control systems

3. **PTC:**
   - 49 CFR Part 236 Subpart I: Positive Train Control Systems
   - AREMA Communications & Signals Manual

4. **Communication:**
   - EIRENE FRS: Functional Requirements Specification for GSM-R
   - FRMCS: Future Railway Mobile Communication System specifications
   - 3GPP TS 22.289: Mission Critical services

### 12.2 Safety Standards

1. **IEC 61508**: Functional safety of electrical/electronic/programmable electronic safety-related systems
2. **EN 50129**: Railway applications - Communication, signalling and processing systems - Safety related electronic systems for signalling
3. **CENELEC**: European Committee for Electrotechnical Standardization railway standards

### 12.3 WIA Standards

- **WIA-INTENT**: Intent-based journey planning and ticketing
- **WIA-OMNI-API**: Universal API gateway for railway systems
- **WIA-SOCIAL**: Social coordination for commuters and travel groups
- **WIA-IOT**: IoT sensors for predictive maintenance
- **WIA-ENERGY**: Energy optimization and regenerative braking
- **WIA-QUANTUM**: Quantum-safe encryption for railway communications

### 12.4 Industry Organizations

1. **UIC**: International Union of Railways
2. **ERA**: European Union Agency for Railways
3. **UITP**: International Association of Public Transport
4. **IEEE**: Institute of Electrical and Electronics Engineers (CBTC standards)
5. **AREMA**: American Railway Engineering and Maintenance-of-Way Association

---

## Appendix A: Example Calculations

### A.1 Metro Line Capacity

```
Given:
- Average speed: 40 km/h = 11.11 m/s
- Headway: 90 seconds
- Dwell time: 30 seconds

Calculation:
- Trains per hour = 3600 / 90 = 40 trains/hour
- With 1000 passengers per train:
- Capacity = 40 × 1000 = 40,000 passengers/hour/direction

Peak capacity: 80,000 passengers/hour (both directions)
```

### A.2 High-Speed Rail Energy

```
Given:
- Train mass: 400 tonnes = 400,000 kg
- Speed: 300 km/h = 83.33 m/s
- Distance: 100 km

Calculation:
- Kinetic energy: E = 0.5 × 400,000 × 83.33²
  E = 1,388,888,900 J ≈ 1,389 MJ ≈ 386 kWh

- Resistance energy (approx 80 kWh/km at 300 km/h):
  E_resistance = 80 × 100 = 8,000 kWh

- Total energy ≈ 8,400 kWh
- With 70% efficiency: 12,000 kWh consumed
- With 30% regeneration: 8,400 kWh net consumption

Average: 84 kWh per km
```

---

**弘益人間 (홍익인간) · Benefit All Humanity**

*WIA-AUTO-018 Specification v1.0*
*© 2025 SmileStory Inc. / WIA*
*MIT License*
