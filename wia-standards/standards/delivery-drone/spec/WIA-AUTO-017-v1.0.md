# WIA-AUTO-017: Delivery Drone Specification v1.0

> **Standard ID:** WIA-AUTO-017
> **Version:** 1.0.0
> **Published:** 2025-12-26
> **Status:** Active
> **Authors:** WIA Autonomous Vehicle Research Group

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Drone Classifications](#2-drone-classifications)
3. [Flight Control Systems](#3-flight-control-systems)
4. [Navigation and Path Planning](#4-navigation-and-path-planning)
5. [Payload Management](#5-payload-management)
6. [UTM Integration](#6-utm-integration)
7. [Battery and Range Management](#7-battery-and-range-management)
8. [Safety and Emergency Protocols](#8-safety-and-emergency-protocols)
9. [Data Formats](#9-data-formats)
10. [API Interface](#10-api-interface)
11. [Regulatory Compliance](#11-regulatory-compliance)
12. [References](#12-references)

---

## 1. Introduction

### 1.1 Purpose

This specification defines the comprehensive framework for autonomous delivery drone systems, enabling safe, efficient, and reliable last-mile aerial delivery services that benefit communities worldwide.

### 1.2 Scope

The standard covers:
- Drone hardware and software specifications
- Flight dynamics and control algorithms
- Navigation and autonomous path planning
- Payload handling and delivery mechanisms
- UTM (Unmanned Traffic Management) integration
- Battery management and range optimization
- Safety protocols and emergency procedures
- Regulatory compliance frameworks

### 1.3 Philosophy

**弘益人間 (Benefit All Humanity)** - This standard aims to democratize access to aerial delivery services, reduce carbon emissions from ground transport, improve delivery efficiency, and provide critical supply chain support to underserved communities.

### 1.4 Terminology

- **BVLOS**: Beyond Visual Line of Sight
- **GNSS**: Global Navigation Satellite System (GPS, GLONASS, Galileo, BeiDou)
- **IMU**: Inertial Measurement Unit
- **UTM**: Unmanned Traffic Management
- **GCS**: Ground Control Station
- **AGL**: Above Ground Level
- **MSL**: Mean Sea Level
- **ROA**: Return-On-Abort

---

## 2. Drone Classifications

### 2.1 Weight Classes

Drones are classified by Maximum Takeoff Weight (MTOW):

#### 2.1.1 Micro Class (0-2 kg)
```
MTOW: 0-2 kg
Payload: 0.1-0.5 kg
Range: 1-3 km
Flight Time: 10-20 min
Max Speed: 15 m/s
```

**Use Cases**: Documents, small parcels, mail

#### 2.1.2 Light Class (2-10 kg)
```
MTOW: 2-10 kg
Payload: 0.5-3 kg
Range: 3-10 km
Flight Time: 20-35 min
Max Speed: 20 m/s
```

**Use Cases**: Standard packages, e-commerce deliveries

#### 2.1.3 Medium Class (10-25 kg)
```
MTOW: 10-25 kg
Payload: 3-8 kg
Range: 10-30 km
Flight Time: 30-50 min
Max Speed: 25 m/s
```

**Use Cases**: Heavy packages, groceries, medical supplies

#### 2.1.4 Heavy Class (25-150 kg)
```
MTOW: 25-150 kg
Payload: 8-50 kg
Range: 30-100 km
Flight Time: 45-90 min
Max Speed: 30 m/s
```

**Use Cases**: Large cargo, disaster relief, rural delivery

### 2.2 Propulsion Types

- **Multi-Rotor**: 4-8 rotors, vertical takeoff/landing, high maneuverability
- **Fixed-Wing**: Airplane-style, long range, high efficiency
- **Hybrid VTOL**: Combines multi-rotor and fixed-wing benefits
- **Tilt-Rotor**: Rotating propulsion system for vertical/horizontal flight

### 2.3 Power Systems

- **Electric Battery**: Lithium-polymer, most common
- **Hybrid Gas-Electric**: Extended range for heavy class
- **Hydrogen Fuel Cell**: Zero emissions, long flight time
- **Solar-Assisted**: Extended flight time in daylight

---

## 3. Flight Control Systems

### 3.1 Flight Dynamics

#### 3.1.1 Lift Force
For multi-rotor systems:

```
L = n × T
```

Where:
- `L` = Total lift force (N)
- `n` = Number of rotors
- `T` = Thrust per rotor (N)

Thrust calculation:
```
T = CT × ρ × A × (ω × r)²
```

Where:
- `CT` = Thrust coefficient (0.01-0.015 for typical rotors)
- `ρ` = Air density (1.225 kg/m³ at sea level)
- `A` = Rotor disk area (m²)
- `ω` = Angular velocity (rad/s)
- `r` = Rotor radius (m)

#### 3.1.2 Hover Power Requirement

```
P = (mg)^(3/2) / √(2ρA)
```

Where:
- `P` = Power required to hover (W)
- `m` = Total mass (kg)
- `g` = Gravitational acceleration (9.81 m/s²)
- `ρ` = Air density (kg/m³)
- `A` = Total rotor disk area (m²)

#### 3.1.3 Drag Force

```
D = ½ × ρ × v² × A × CD
```

Where:
- `D` = Drag force (N)
- `v` = Forward velocity (m/s)
- `A` = Frontal area (m²)
- `CD` = Drag coefficient (1.0-1.5 for multi-rotor)

### 3.2 Stabilization Control

#### 3.2.1 PID Controller

Each axis (roll, pitch, yaw) uses a PID control loop:

```
u(t) = Kp × e(t) + Ki × ∫e(t)dt + Kd × de(t)/dt
```

Where:
- `u(t)` = Control output
- `e(t)` = Error (desired - actual)
- `Kp` = Proportional gain
- `Ki` = Integral gain
- `Kd` = Derivative gain

Typical PID values for multi-rotor:
```
Roll/Pitch:
  Kp = 4.5
  Ki = 0.02
  Kd = 0.18

Yaw:
  Kp = 3.0
  Ki = 0.01
  Kd = 0.10
```

#### 3.2.2 Sensor Fusion

Combine IMU and GNSS data using Extended Kalman Filter:

```
State Vector: [x, y, z, vx, vy, vz, φ, θ, ψ]
```

Where:
- `x, y, z` = Position (m)
- `vx, vy, vz` = Velocity (m/s)
- `φ, θ, ψ` = Roll, pitch, yaw (rad)

### 3.3 Flight Modes

1. **Manual**: Direct pilot control via remote
2. **Assisted**: Pilot control with stabilization
3. **Altitude Hold**: Automatic altitude maintenance
4. **Position Hold**: GPS position lock
5. **Waypoint**: Autonomous waypoint navigation
6. **Return-to-Home**: Automatic return on signal loss
7. **Land**: Automated precision landing

---

## 4. Navigation and Path Planning

### 4.1 Route Planning

#### 4.1.1 A* Path Planning Algorithm

```python
def astar_path(start, goal, obstacles):
    open_set = PriorityQueue()
    open_set.put((0, start))
    came_from = {}
    g_score = {start: 0}
    f_score = {start: heuristic(start, goal)}

    while not open_set.empty():
        current = open_set.get()[1]

        if current == goal:
            return reconstruct_path(came_from, current)

        for neighbor in get_neighbors(current):
            if is_obstacle(neighbor, obstacles):
                continue

            tentative_g = g_score[current] + distance(current, neighbor)

            if tentative_g < g_score.get(neighbor, infinity):
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g
                f_score[neighbor] = tentative_g + heuristic(neighbor, goal)
                open_set.put((f_score[neighbor], neighbor))

    return None  # No path found
```

#### 4.1.2 Heuristic Function

Euclidean distance with altitude penalty:

```
h(n) = √[(xg - xn)² + (yg - yn)² + α(zg - zn)²]
```

Where:
- `α` = Altitude weight factor (typically 1.5)
- `(xg, yg, zg)` = Goal coordinates
- `(xn, yn, zn)` = Current node coordinates

### 4.2 Obstacle Avoidance

#### 4.2.1 LiDAR-based Detection

Process point cloud data to detect obstacles:

```
1. Segment point cloud into voxels (0.5m³)
2. Identify occupied voxels
3. Cluster nearby voxels into obstacles
4. Calculate obstacle bounding boxes
5. Plan avoidance trajectory
```

#### 4.2.2 Dynamic Window Approach

Select optimal velocity considering:

```
G(v, ω) = α × heading(v, ω) + β × clearance(v, ω) + γ × velocity(v, ω)
```

Where:
- `v` = Linear velocity
- `ω` = Angular velocity
- `α, β, γ` = Weighting factors
- `heading()` = Progress toward goal
- `clearance()` = Distance to obstacles
- `velocity()` = Forward velocity

### 4.3 Precision Landing

#### 4.3.1 Visual Servoing

Use AprilTag markers for precision landing:

```
Landing Sequence:
1. Detect landing pad from 10m altitude
2. Center above pad using visual feedback
3. Descend at 0.3 m/s
4. Fine-tune position at 3m altitude
5. Final descent at 0.1 m/s
6. Ground contact detection via IMU
7. Motor shutdown
```

#### 4.3.2 Position Error Correction

```
Position Error: ep = √[(xp - x)² + (yp - y)²]
Acceptable Error: ep < 0.2m (before landing)
```

---

## 5. Payload Management

### 5.1 Weight and Balance

#### 5.1.1 Center of Gravity

CG must remain within acceptable limits:

```
CGx = Σ(mi × xi) / mtotal
CGy = Σ(mi × yi) / mtotal
CGz = Σ(mi × zi) / mtotal
```

Acceptable CG range:
```
|CGx| < 0.05m
|CGy| < 0.05m
```

#### 5.1.2 Payload Capacity

Maximum payload calculation:

```
Wpmax = (Tmax × SF - Wd × g) / g
```

Where:
- `Wpmax` = Maximum payload weight (kg)
- `Tmax` = Maximum total thrust (N)
- `SF` = Safety factor (0.6-0.7)
- `Wd` = Drone dry weight (kg)
- `g` = Gravitational acceleration (9.81 m/s²)

### 5.2 Secure Attachment

Requirements:
- Positive locking mechanism
- Load sensors for confirmation
- Anti-sway stabilization
- Quick-release for delivery
- Tamper detection

### 5.3 Delivery Mechanisms

#### 5.3.1 Landing Delivery
```
1. Land at delivery location
2. Unlock payload
3. Visual/audio confirmation
4. Wait for package removal (max 30s)
5. Takeoff and return
```

#### 5.3.2 Winch Delivery
```
1. Hover at safe altitude (3-5m)
2. Lower package via motorized winch
3. Detect ground contact
4. Release package
5. Retract winch
6. Depart
```

#### 5.3.3 Drop Delivery
```
1. Position over drop zone
2. Reduce altitude to 2m
3. Release package to cushioned receptacle
4. Confirm delivery via camera
5. Depart
```

---

## 6. UTM Integration

### 6.1 UTM Architecture

Drones must integrate with UTM systems following standards:

```
┌─────────────┐
│   Drone     │
│   Operator  │
└──────┬──────┘
       │
       ↓
┌──────────────┐      ┌─────────────┐
│ UTM Service  │←────→│    ANSP     │
│   Provider   │      │   (ATC)     │
└──────┬───────┘      └─────────────┘
       │
       ↓
┌──────────────┐
│  Airspace    │
│ Authorization│
└──────────────┘
```

### 6.2 Required UTM Messages

#### 6.2.1 Flight Plan Submission

```json
{
  "operation_id": "OP-20250101-1234",
  "operator_id": "WIA-OP-001",
  "drone_id": "WIA-DRN-X1-0042",
  "flight_plan": {
    "departure": {
      "location": {"lat": 37.7749, "lng": -122.4194, "alt": 10},
      "time": "2025-01-01T10:00:00Z"
    },
    "arrival": {
      "location": {"lat": 37.7849, "lng": -122.4094, "alt": 0},
      "time": "2025-01-01T10:15:00Z"
    },
    "waypoints": [...],
    "max_altitude": 120,
    "max_speed": 20
  }
}
```

#### 6.2.2 Position Reports

Send every 1 second during flight:

```json
{
  "drone_id": "WIA-DRN-X1-0042",
  "timestamp": "2025-01-01T10:05:30Z",
  "position": {
    "lat": 37.7799,
    "lng": -122.4144,
    "alt_msl": 125,
    "alt_agl": 35
  },
  "velocity": {
    "vx": 12.5,
    "vy": 3.2,
    "vz": -0.5
  },
  "heading": 045,
  "battery": 78,
  "status": "enroute"
}
```

### 6.3 Conflict Detection

UTM must detect and resolve conflicts:

```
Separation Requirements:
- Horizontal: 50m minimum
- Vertical: 30m minimum

Conflict Alert:
If predicted separation < requirements within 60s,
issue conflict alert and recommend avoidance maneuver.
```

---

## 7. Battery and Range Management

### 7.1 Battery Capacity

#### 7.1.1 Energy Calculation

```
E = V × C
```

Where:
- `E` = Energy capacity (Wh)
- `V` = Nominal voltage (V)
- `C` = Capacity (Ah)

Example:
```
14.8V × 10Ah = 148 Wh
```

#### 7.1.2 State of Charge (SOC)

```
SOC(t) = SOC0 - ∫(I(t) / C)dt
```

Where:
- `SOC(t)` = State of charge at time t (0-1)
- `SOC0` = Initial state of charge
- `I(t)` = Current draw (A)
- `C` = Battery capacity (Ah)

### 7.2 Range Estimation

#### 7.2.1 Theoretical Range

```
R = (E × η) / P × v
```

Where:
- `R` = Maximum range (m)
- `E` = Battery energy (Wh)
- `η` = Efficiency (0.7-0.9)
- `P` = Average power consumption (W)
- `v` = Cruise speed (m/s)

#### 7.2.2 Practical Range

Account for reserves and conditions:

```
Rpractical = R × (1 - Rreserve) × Kwind × Kpayload × Kalt
```

Where:
- `Rreserve` = Reserve margin (0.2-0.3)
- `Kwind` = Wind factor (0.7-1.0)
- `Kpayload` = Payload factor (0.8-1.0)
- `Kalt` = Altitude factor (0.9-1.0)

### 7.3 Power Consumption Model

```
P = Phover + Pcruise + Pavionics

Phover = (mg)^(3/2) / √(2ρA)

Pcruise = ½ × ρ × v³ × A × CD / η

Pavionics = 10-50W (constant)
```

### 7.4 Battery Safety

Requirements:
- Temperature monitoring (5-45°C operating range)
- Overcharge protection
- Over-discharge prevention (land at 20% SOC)
- Cell balancing
- Short circuit protection
- Fire suppression system (for large batteries)

---

## 8. Safety and Emergency Protocols

### 8.1 Pre-Flight Checklist

- [ ] Battery charged > 80%
- [ ] GPS lock achieved (8+ satellites)
- [ ] IMU calibrated
- [ ] Propellers secure and undamaged
- [ ] Payload properly secured
- [ ] Flight plan approved by UTM
- [ ] Weather conditions acceptable
- [ ] Emergency landing zones identified
- [ ] Communication link verified
- [ ] Geofencing active

### 8.2 Geofencing

#### 8.2.1 No-Fly Zones

```
Priority Levels:
1. CRITICAL: Airports, military bases (hard boundary)
2. HIGH: Schools, hospitals (soft boundary with authorization)
3. MEDIUM: Parks, stadiums (temporal restrictions)
4. LOW: Residential areas (altitude restrictions)
```

#### 8.2.2 Geofence Implementation

```python
def check_geofence(position):
    for zone in no_fly_zones:
        distance = calculate_distance(position, zone.center)

        if distance < zone.radius:
            if zone.priority == "CRITICAL":
                return {"allowed": False, "action": "immediate_land"}
            elif zone.priority == "HIGH":
                return {"allowed": False, "action": "return_to_home"}
            else:
                return {"allowed": True, "warning": "restricted_area"}

    return {"allowed": True}
```

### 8.3 Emergency Procedures

#### 8.3.1 Loss of GPS

```
1. Switch to optical flow/visual odometry
2. Reduce altitude to 10m AGL
3. Hover in place
4. Wait for GPS recovery (max 60s)
5. If not recovered, initiate emergency landing
```

#### 8.3.2 Low Battery

```
Battery Levels:
- 30%: Warning, suggest RTH
- 20%: Automatic RTH initiated
- 10%: Emergency landing at nearest safe location
- 5%: Immediate emergency landing
```

#### 8.3.3 Motor Failure

```
Single Motor (Hexacopter+):
1. Detect failure via current/RPM sensors
2. Compensate with remaining motors
3. Reduce altitude gradually
4. Navigate to emergency landing zone
5. Execute controlled landing

Multiple Motors (Quadcopter):
1. Detect failure
2. Deploy emergency parachute (if equipped)
3. Cut power to remaining motors
4. Broadcast emergency signal
5. Record flight data for analysis
```

#### 8.3.4 Communication Loss

```
1. Detect signal loss (> 3s)
2. Continue current mission for 10s
3. If signal not restored:
   - Execute Return-On-Abort (ROA)
   - Climb to safe altitude
   - Return via pre-planned route
   - Land at home location
   - If home location blocked, land at nearest safe zone
```

### 8.4 Parachute System

For drones > 10 kg MTOW:

```
Deployment Conditions:
- Critical motor failure
- Loss of control
- Structural failure detected
- Manual pilot trigger

Deployment Sequence:
1. Detect critical failure
2. Cut motor power
3. Deploy parachute (0.2s)
4. Broadcast emergency signal
5. Activate strobe light
6. Log GPS coordinates
```

---

## 9. Data Formats

### 9.1 Waypoint Format

```json
{
  "waypoint_id": "WP-001",
  "position": {
    "latitude": 37.7749,
    "longitude": -122.4194,
    "altitude_msl": 120,
    "altitude_agl": 30
  },
  "speed": 15.0,
  "heading": 45,
  "actions": [
    {"type": "take_photo", "params": {}},
    {"type": "hover", "params": {"duration": 5}}
  ],
  "acceptance_radius": 5.0
}
```

### 9.2 Delivery Package Format

```json
{
  "package_id": "PKG-20250101-1234",
  "weight": 2.5,
  "dimensions": {
    "length": 30,
    "width": 20,
    "height": 15,
    "unit": "cm"
  },
  "fragile": false,
  "temperature_sensitive": false,
  "value": 150.00,
  "insurance": true,
  "special_instructions": "Leave at front door",
  "tracking_code": "1Z999AA10123456784"
}
```

### 9.3 Flight Log Format

```json
{
  "flight_id": "FLT-20250101-1234",
  "drone_id": "WIA-DRN-X1-0042",
  "operator_id": "WIA-OP-001",
  "start_time": "2025-01-01T10:00:00Z",
  "end_time": "2025-01-01T10:15:00Z",
  "duration": 900,
  "distance": 5000,
  "max_altitude": 120,
  "max_speed": 22.5,
  "battery_consumed": 22,
  "waypoints_completed": 15,
  "incidents": [],
  "telemetry_file": "telemetry-20250101-1234.bin"
}
```

---

## 10. API Interface

### 10.1 REST API Endpoints

#### 10.1.1 Create Delivery Mission

```http
POST /api/v1/missions
Content-Type: application/json

{
  "pickup": {
    "location": {"lat": 37.7749, "lng": -122.4194, "alt": 0},
    "address": "123 Market St, San Francisco, CA",
    "contact": {"name": "John Doe", "phone": "+1-555-0100"}
  },
  "dropoff": {
    "location": {"lat": 37.7849, "lng": -122.4094, "alt": 0},
    "address": "456 Mission St, San Francisco, CA",
    "contact": {"name": "Jane Smith", "phone": "+1-555-0200"}
  },
  "package": {
    "weight": 2.5,
    "dimensions": {"length": 30, "width": 20, "height": 15},
    "fragile": false
  },
  "priority": "standard",
  "scheduled_time": "2025-01-01T10:00:00Z"
}

Response:
{
  "mission_id": "MSN-20250101-1234",
  "status": "scheduled",
  "estimated_pickup": "2025-01-01T10:00:00Z",
  "estimated_delivery": "2025-01-01T10:15:00Z",
  "drone_assigned": "WIA-DRN-X1-0042",
  "tracking_url": "https://track.wia.com/MSN-20250101-1234"
}
```

#### 10.1.2 Get Mission Status

```http
GET /api/v1/missions/{mission_id}

Response:
{
  "mission_id": "MSN-20250101-1234",
  "status": "in_flight",
  "current_position": {
    "lat": 37.7799,
    "lng": -122.4144,
    "alt": 35
  },
  "progress": 65,
  "eta": "2025-01-01T10:13:00Z",
  "battery_remaining": 78
}
```

### 10.2 WebSocket Real-Time Updates

```javascript
const ws = new WebSocket('wss://api.wia.com/v1/missions/MSN-20250101-1234/stream');

ws.onmessage = (event) => {
  const update = JSON.parse(event.data);
  console.log(update);
  // {
  //   "type": "position_update",
  //   "timestamp": "2025-01-01T10:05:30Z",
  //   "position": {"lat": 37.7799, "lng": -122.4144, "alt": 35},
  //   "speed": 15.5,
  //   "heading": 45,
  //   "battery": 78
  // }
};
```

### 10.3 SDK Methods

```typescript
interface DeliveryMissionParams {
  pickup: Location;
  dropoff: Location;
  package: Package;
  priority: 'express' | 'standard' | 'economy';
  scheduledTime?: Date;
}

interface MissionResult {
  missionId: string;
  status: MissionStatus;
  estimatedPickup: Date;
  estimatedDelivery: Date;
  droneAssigned: string;
  trackingUrl: string;
}

class DeliveryDroneSDK {
  async createMission(params: DeliveryMissionParams): Promise<MissionResult>;
  async getMissionStatus(missionId: string): Promise<MissionStatus>;
  async cancelMission(missionId: string): Promise<boolean>;
  async trackMission(missionId: string, callback: (update: PositionUpdate) => void): Promise<void>;
}
```

---

## 11. Regulatory Compliance

### 11.1 FAA Part 107 (United States)

Requirements for commercial drone operations:
- Drone weight < 55 lbs (25 kg)
- Maximum altitude: 400 ft AGL
- Maximum speed: 100 mph (44 m/s)
- Visual line of sight (waiver required for BVLOS)
- No operations over people (waiver required)
- Daylight operations only (waiver required for night)
- Remote pilot certificate required

### 11.2 EASA Regulations (European Union)

Categories:
- **Open**: Low risk, < 25 kg, < 120m altitude
- **Specific**: Medium risk, requires authorization
- **Certified**: High risk, requires certification

### 11.3 Remote ID

Broadcast requirements (effective 2023):
```
Required Information (every 1s):
- Drone ID (serial number)
- Operator ID
- Position (lat, lng, alt)
- Velocity
- Emergency status
- Control station location
```

### 11.4 Insurance Requirements

Minimum liability coverage:
- Micro/Light: $1M per occurrence
- Medium: $5M per occurrence
- Heavy: $10M per occurrence

### 11.5 Privacy Compliance

Requirements:
- No recording in private property without consent
- Data encryption for all transmissions
- Video retention: 24 hours maximum (unless incident)
- GDPR/CCPA compliance for customer data
- Camera angle restrictions

---

## 12. References

### 12.1 Standards and Regulations

1. FAA Part 107 - Small Unmanned Aircraft Systems
2. ASTM F3411 - Remote ID and Tracking
3. ASTM F3548 - UAS Traffic Management (UTM)
4. ISO 21384 - Unmanned Aircraft Systems
5. EASA Easy Access Rules for Unmanned Aircraft Systems

### 12.2 Technical References

1. "Multirotor Aerial Vehicles" - Mahony et al.
2. "Principles of Helicopter Aerodynamics" - J. Gordon Leishman
3. "Planning Algorithms" - Steven M. LaValle
4. "Probabilistic Robotics" - Thrun, Burgard, Fox
5. "Computer Vision: Algorithms and Applications" - Richard Szeliski

### 12.3 Physics Constants

| Constant | Symbol | Value |
|----------|--------|-------|
| Gravitational acceleration | g | 9.81 m/s² |
| Air density (sea level) | ρ | 1.225 kg/m³ |
| Speed of sound (sea level) | c | 343 m/s |
| Standard atmospheric pressure | P0 | 101,325 Pa |

### 12.4 WIA Standards

- WIA-INTENT: Intent-based interfaces
- WIA-OMNI-API: Universal API gateway
- WIA-SOCIAL: Social coordination protocols
- WIA-AIR-SHIELD: Airspace security and protection
- WIA-QUANTUM: Secure communication encryption

---

## Appendix A: Example Calculations

### A.1 Hover Power for Light Class Drone

```
Given:
- Mass: 8 kg (drone 5kg + payload 3kg)
- Rotor diameter: 0.3m (4 rotors)
- Air density: 1.225 kg/m³

Calculation:
- Total rotor area: A = 4 × π × (0.15)² = 0.283 m²
- Power: P = (8 × 9.81)^(3/2) / √(2 × 1.225 × 0.283)
- P = (78.48)^(1.5) / √(0.693)
- P = 696.7 / 0.832
- P ≈ 837W

Including efficiency (0.6):
- Actual power ≈ 1395W
```

### A.2 Maximum Range Calculation

```
Given:
- Battery: 14.8V, 10Ah = 148Wh
- Average power: 500W
- Cruise speed: 15 m/s
- Efficiency: 0.8
- Reserve: 30%

Calculation:
- Usable energy: 148 × 0.7 = 103.6 Wh
- Flight time: (103.6 × 0.8) / 500 = 0.166 hours ≈ 10 minutes
- Range: 0.166 × 3600 × 15 = 8964m ≈ 9km

With wind (5 m/s headwind):
- Effective speed: 15 - 5 = 10 m/s
- Range: 0.166 × 3600 × 10 = 5976m ≈ 6km
```

---

**弘益人間 (홍익인간) · Benefit All Humanity**

*WIA-AUTO-017 Specification v1.0*
*© 2025 SmileStory Inc. / WIA*
*MIT License*
