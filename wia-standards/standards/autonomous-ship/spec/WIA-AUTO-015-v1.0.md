# WIA-AUTO-015: Autonomous Ship Specification v1.0

> **Standard ID:** WIA-AUTO-015
> **Version:** 1.0.0
> **Published:** 2025-12-26
> **Status:** Active
> **Authors:** WIA Maritime Autonomy Research Group

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [IMO MASS Autonomy Levels](#2-imo-mass-autonomy-levels)
3. [Navigation Systems](#3-navigation-systems)
4. [Collision Avoidance (COLREG)](#4-collision-avoidance-colreg)
5. [Remote Operation Centers](#5-remote-operation-centers)
6. [Sensor Systems](#6-sensor-systems)
7. [Route Planning and Optimization](#7-route-planning-and-optimization)
8. [Cybersecurity](#8-cybersecurity)
9. [Communication Protocols](#9-communication-protocols)
10. [Data Formats](#10-data-formats)
11. [API Interface](#11-api-interface)
12. [Safety Protocols](#12-safety-protocols)
13. [References](#13-references)

---

## 1. Introduction

### 1.1 Purpose

This specification defines the technical framework for autonomous ship operations, encompassing navigation, collision avoidance, remote monitoring, sensor integration, and safety protocols in compliance with International Maritime Organization (IMO) regulations for Maritime Autonomous Surface Ships (MASS).

### 1.2 Scope

The standard covers:
- Autonomous navigation and route planning algorithms
- Sensor fusion and environmental awareness
- COLREG-compliant collision avoidance
- Remote operation and monitoring systems
- Cybersecurity for maritime critical infrastructure
- Integration with existing maritime systems (AIS, ECDIS, VTS)

### 1.3 Philosophy

**弘益人間 (Benefit All Humanity)** - This standard aims to make maritime transportation safer, more efficient, and environmentally sustainable. By reducing human error (responsible for 75% of maritime accidents), optimizing routes, and enabling continuous operation, autonomous ships benefit global trade, seafarers, and the environment.

### 1.4 Terminology

- **IMO**: International Maritime Organization
- **MASS**: Maritime Autonomous Surface Ships
- **COLREG**: International Regulations for Preventing Collisions at Sea (1972)
- **AIS**: Automatic Identification System
- **ECDIS**: Electronic Chart Display and Information System
- **VTS**: Vessel Traffic Service
- **GNSS**: Global Navigation Satellite System (GPS, GLONASS, Galileo, BeiDou)
- **CPA**: Closest Point of Approach
- **TCPA**: Time to Closest Point of Approach
- **ARPA**: Automatic Radar Plotting Aid
- **SOLAS**: Safety of Life at Sea Convention

---

## 2. IMO MASS Autonomy Levels

### 2.1 Level Definitions

The IMO defines four degrees of autonomy for MASS:

#### 2.1.1 Level 0 - Manual Operation
- Traditional ship with manual navigation
- Human crew performs all operations
- No autonomous systems beyond basic automation

#### 2.1.2 Level 1 - On-board Decision Support
- Automated processes assist human operators
- Crew makes all critical decisions
- Systems provide recommendations and warnings

**Examples:**
- Autopilot with weather routing
- Collision avoidance warnings
- Engine optimization recommendations

#### 2.1.3 Level 2 - Remote Control with Seafarers On Board
- Ship controlled from shore-based center
- Seafarers available for emergency intervention
- Remote operators have full situational awareness

**Systems Required:**
- Real-time video monitoring
- Remote control interface
- Redundant communication links
- Emergency override capability

#### 2.1.4 Level 3 - Remote Control without Seafarers
- Fully remote operation from shore
- No crew on board for extended periods
- Shore operators monitor multiple vessels
- Periodic autonomous operation

**Additional Requirements:**
- Advanced autonomous navigation
- Comprehensive sensor suite
- Remote diagnostics and maintenance planning
- Emergency autonomous safe harbor capability

#### 2.1.5 Level 4 - Fully Autonomous
- Complete autonomous operation
- Shore monitoring only (no active control)
- Self-diagnostic and self-maintenance
- AI-driven decision making

**Capabilities:**
- Full COLREG compliance
- Dynamic re-routing
- Weather avoidance
- Port entry and docking
- Emergency management

### 2.2 Autonomy Level Transition

```
Level Transition Algorithm:

1. Assess current conditions:
   - Weather severity
   - Traffic density
   - Communication reliability
   - System health

2. Determine appropriate level:
   IF severe_weather OR high_traffic OR degraded_sensors:
       level = min(level - 1, 2)  # Require human oversight
   ELSE IF optimal_conditions AND all_systems_nominal:
       level = authorized_max_level

3. Request transition:
   SEND transition_request TO shore_control
   AWAIT approval WITH timeout

4. Execute transition:
   LOG level_change
   NOTIFY all_stakeholders
   UPDATE operating_parameters
```

### 2.3 Level-Specific Requirements

| Requirement | L1 | L2 | L3 | L4 |
|-------------|----|----|----|----|
| Onboard crew | Required | Required | Optional | None |
| Remote monitoring | Optional | Required | Required | Required |
| Autonomous navigation | Partial | Partial | Full | Full |
| Collision avoidance | Manual+Auto | Auto+Override | Fully Auto | Fully Auto |
| Port operations | Manual | Remote+Manual | Remote | Autonomous |
| Emergency response | Crew | Crew+Shore | Shore | Autonomous+Shore |

---

## 3. Navigation Systems

### 3.1 Position Determination

#### 3.1.1 GNSS Integration

Primary positioning uses multi-constellation GNSS:

```
Position = weighted_average([
    GPS_position,
    GLONASS_position,
    Galileo_position,
    BeiDou_position
])

Weight(system) = 1 / (uncertainty²)
```

**Accuracy Requirements:**
- Open ocean: ±10 meters (95% confidence)
- Coastal waters: ±5 meters
- Port approach: ±2 meters (with DGPS/RTK)

#### 3.1.2 Dead Reckoning

When GNSS unavailable, use inertial navigation:

```
Position(t) = Position(t₀) + ∫[t₀ to t] Velocity(τ) dτ

Velocity(t) = Velocity(t₀) + ∫[t₀ to t] Acceleration(τ) dτ
```

**Drift Correction:**
```
Estimated_drift = ∫ (gyro_bias + accel_bias) dt

Corrected_position = DR_position - estimated_drift
```

Update with:
- Celestial navigation (sun/star sights)
- Radar fix (known landmarks)
- Depth contour matching
- Visual landmark recognition

### 3.2 Electronic Chart System (ECDIS)

#### 3.2.1 Chart Data Management

```
Chart_coverage(route) = ⋃[waypoints] chart_cell(waypoint)

FOR EACH cell IN route:
    ASSERT cell.edition >= minimum_required_edition
    ASSERT cell.expiry_date > voyage_end_date
    ASSERT cell.scale >= required_scale
```

#### 3.2.2 Route Planning

Optimal route calculation:

```
Route = optimize(
    objective = minimize(voyage_time × fuel_cost + risk_penalty),
    constraints = [
        water_depth ≥ draft + UKC,  # Under-Keel Clearance
        distance_to_hazards ≥ safety_margin,
        waypoint ∈ navigable_waters,
        course_changes ≤ max_rate
    ]
)
```

Where UKC (Under-Keel Clearance) = max(10% × draft, 0.5 meters)

### 3.3 Great Circle Navigation

#### 3.3.1 Distance Calculation

Using Haversine formula:

```
Δφ = φ₂ - φ₁
Δλ = λ₂ - λ₁

a = sin²(Δφ/2) + cos(φ₁) × cos(φ₂) × sin²(Δλ/2)
c = 2 × atan2(√a, √(1-a))
d = R × c

Where:
  R = 3,440.065 NM (Earth radius)
  φ = latitude in radians
  λ = longitude in radians
```

#### 3.3.2 Initial Bearing

```
θ = atan2(
    sin(Δλ) × cos(φ₂),
    cos(φ₁) × sin(φ₂) - sin(φ₁) × cos(φ₂) × cos(Δλ)
)

Bearing = (θ × 180/π + 360) mod 360
```

### 3.4 Waypoint Navigation

#### 3.4.1 Cross-Track Error

```
XTE = asin(
    sin(d₁₃/R) × sin(θ₁₃ - θ₁₂)
) × R

Where:
  d₁₃ = distance from start to current position
  θ₁₃ = bearing from start to current position
  θ₁₂ = bearing from start to next waypoint
```

#### 3.4.2 Course Correction

```
Correction = K_p × XTE + K_d × (dXTE/dt)

New_heading = planned_heading + Correction

Where:
  K_p = proportional gain (typically 1.5)
  K_d = derivative gain (typically 0.5)
```

---

## 4. Collision Avoidance (COLREG)

### 4.1 COLREG Rules Implementation

The system must implement all 38 rules of COLREG 1972, with focus on Part B (Steering and Sailing Rules).

#### 4.1.1 Rule 5 - Look-out

Maintain 360° awareness using:
- Radar (X-band and S-band)
- AIS receiver
- Visual cameras (visible and IR)
- LiDAR
- Human monitoring (for levels 1-3)

```
360° Coverage Algorithm:

sensor_coverage = ⋃[all_sensors] coverage_area(sensor)

ASSERT sensor_coverage ≥ 0.95 × full_sphere  # 95% coverage minimum

IF coverage < 0.95:
    ALERT "Degraded sensor coverage"
    REDUCE autonomy_level
    INCREASE human_supervision
```

#### 4.1.2 Rule 13 - Overtaking

```
is_overtaking = (
    relative_bearing > 112.5° AND
    relative_bearing < 247.5° AND
    own_speed > target_speed
)

IF is_overtaking:
    # Overtaking vessel must keep clear
    action = "maintain_course"  # Give-way is on overtaking vessel
    monitor_target_actions()
ELSE:
    apply_other_rules()
```

#### 4.1.3 Rule 14 - Head-on Situation

```
is_head_on = (
    abs(relative_bearing - 180°) < 10° AND
    CPA < safe_distance
)

IF is_head_on:
    # Both vessels alter course to starboard
    action = "alter_course"
    new_heading = current_heading + 15°  # Turn to starboard
    speed_reduction = 0  # Maintain speed
```

#### 4.1.4 Rule 15 - Crossing Situation

```
is_crossing = (
    relative_bearing > 5° AND
    relative_bearing < 112.5° AND
    CPA < safe_distance
)

IF is_crossing:
    IF target_on_starboard_side:
        # We are give-way vessel
        action = "give_way"
        maneuver = select_avoidance_maneuver()
    ELSE:
        # We are stand-on vessel
        action = "maintain_course_and_speed"
        monitor_give_way_vessel()
```

### 4.2 Collision Risk Assessment

#### 4.2.1 CPA and TCPA Calculation

```
Relative velocity:
  v_rel = v_target - v_own

Relative position:
  r_rel = position_target - position_own

Closest Point of Approach (CPA):
  CPA = |r_rel × v̂_rel| / |v̂_rel|

  Where v̂_rel = normalized velocity vector

Time to CPA (TCPA):
  TCPA = -(r_rel · v_rel) / |v_rel|²
```

#### 4.2.2 Collision Risk Index

```
Risk = calculate_risk(CPA, TCPA, uncertainty)

risk_index = (D_safe / CPA) × (T_safe / TCPA) × uncertainty_factor

Where:
  D_safe = 2.0 NM (safe passing distance)
  T_safe = 20 minutes (safe time margin)
  uncertainty_factor = 1 + sensor_error + target_maneuver_probability

Risk Levels:
  risk_index < 0.3:  LOW - monitor only
  0.3 ≤ risk_index < 0.7:  MEDIUM - prepare maneuver
  0.7 ≤ risk_index < 1.0:  HIGH - execute maneuver
  risk_index ≥ 1.0:  CRITICAL - emergency action
```

### 4.3 Collision Avoidance Maneuvers

#### 4.3.1 Course Alteration

```
Optimal course change:

Δθ = arcsin(D_safe / CPA_current) + safety_margin

Where safety_margin = 10° (standard) to 30° (restricted visibility)

Maneuver constraints:
  - Min turn radius = (V² × T) / (35 × L)  [IMO standards]
  - Max rate of turn = 4.5° × √(K/L)  [ship maneuverability]
  - Return to course after CPA + safety_time
```

#### 4.3.2 Speed Reduction

```
New speed calculation:

V_new = V_current × (1 - reduction_factor)

reduction_factor = min(
    (D_safe - CPA) / D_safe,
    0.5  # Maximum 50% reduction for stability
)

Constraints:
  - V_new ≥ V_min_steerage  (minimum for steering control)
  - Gradual reduction: dV/dt ≤ 2 knots/minute
  - Consider stopping distance
```

#### 4.3.3 Combined Maneuver

For complex situations with multiple targets:

```
optimal_maneuver = optimize(
    cost = Σ[all_targets] (
        collision_risk(target) +
        fuel_cost(maneuver) +
        delay_penalty(maneuver)
    ),
    constraints = [
        CPA(target) ≥ D_safe ∀ targets,
        COLREG_compliance(maneuver) = true,
        ship_dynamics_feasible(maneuver) = true
    ]
)
```

### 4.4 Ship Domain Concept

The ship domain represents the surrounding area a ship navigates to avoid:

```
Domain calculation (Fujii model):

L_fore = L_ship × (1 + 2.5 × V/V_max)  # Forward
L_aft = L_ship × (1 + 0.5 × V/V_max)   # Aft
L_star = B_ship × (1 + 1.5 × V/V_max)  # Starboard
L_port = B_ship × (1 + 1.2 × V/V_max)  # Port

Where:
  L_ship = ship length
  B_ship = ship beam
  V = current speed
  V_max = maximum speed
```

---

## 5. Remote Operation Centers

### 5.1 ROC Architecture

#### 5.1.1 Components

```
ROC System Components:

1. Control Stations (redundant)
   - Primary operator station
   - Supervisor station
   - Emergency override station

2. Display Systems
   - Multi-screen navigation displays
   - Sensor feed monitors
   - System status dashboard
   - Communication interfaces

3. Communication Infrastructure
   - Satellite (primary): VSAT, Iridium
   - Cellular (coastal): 4G/5G
   - VHF radio (backup)
   - Emergency beacon

4. Decision Support
   - AI recommendation engine
   - Voyage optimization
   - Weather routing
   - Predictive maintenance
```

#### 5.1.2 Operator Workload

```
Max vessels per operator:

N_max = floor(
    operator_capacity / Σ[vessels] attention_required(vessel)
)

attention_required(vessel) = base_attention × (
    1 + complexity_factor +
    weather_factor +
    traffic_factor +
    system_health_factor
)

Typical values:
  - Open ocean, good conditions: 4-6 vessels per operator
  - Coastal waters: 2-3 vessels per operator
  - Port approach: 1 vessel per operator
```

### 5.2 Communication Protocols

#### 5.2.1 Data Transmission Priorities

```
Priority Queue:

Priority 0 (CRITICAL - immediate):
  - Collision warnings
  - System failures
  - Emergency situations

Priority 1 (HIGH - <1 second):
  - Navigation commands
  - Sensor data
  - Status updates

Priority 2 (MEDIUM - <5 seconds):
  - Video streams
  - Non-critical alerts
  - Performance data

Priority 3 (LOW - <30 seconds):
  - Logs
  - Analytics
  - Diagnostics
```

#### 5.2.2 Bandwidth Management

```
Minimum bandwidth requirements:

- Critical data: 10 kbps (always available)
- Navigation control: 100 kbps
- Video (compressed): 500 kbps per camera
- Full telemetry: 1 Mbps
- HD video: 5 Mbps (optional, good conditions)

Adaptive transmission:

IF bandwidth < required:
    REDUCE video_quality
    INCREASE compression_ratio
    SEND critical_data_only
    ALERT operator
```

### 5.3 Handover Procedures

#### 5.3.1 Shift Handover

```
Shift Handover Protocol:

1. Briefing Phase (15 minutes before)
   - Review vessel status
   - Discuss ongoing situations
   - Identify potential issues

2. Dual Operation (5 minutes)
   - Outgoing operator maintains control
   - Incoming operator observes
   - Questions and clarifications

3. Control Transfer
   - Incoming operator acknowledges readiness
   - Outgoing operator transfers control
   - System logs transfer
   - Confirmation to all vessels

4. Verification (5 minutes after)
   - New operator confirms all systems
   - Reviews pending actions
   - Outgoing operator available for questions
```

---

## 6. Sensor Systems

### 6.1 Radar

#### 6.1.1 X-Band Radar (9 GHz)

**Characteristics:**
- Range: 0.5 - 48 NM
- Resolution: High (better target discrimination)
- Weather: Affected by rain/fog
- Use: Navigation, collision avoidance

**ARPA Functions:**
```
Target Tracking:

1. Detection
   threshold = noise_floor + 3σ

2. Association
   track(t+1) = nearest_target_within_gate(track(t))

3. Filtering (Kalman Filter)
   x̂(t|t) = x̂(t|t-1) + K(t) × [z(t) - H × x̂(t|t-1)]

   Where:
     x̂ = state estimate [position, velocity]
     z = measurement
     K = Kalman gain
     H = observation matrix

4. Prediction
   CPA, TCPA = calculate_from_state(x̂)
```

#### 6.1.2 S-Band Radar (3 GHz)

**Characteristics:**
- Range: 1 - 96 NM
- Resolution: Lower than X-band
- Weather: Better performance in precipitation
- Use: Long-range detection, weather monitoring

### 6.2 LiDAR

#### 6.2.1 Applications

- Near-field obstacle detection (< 500m)
- Port approach and docking
- 3D environmental mapping
- Precision navigation in restricted waters

**Point Cloud Processing:**
```
1. Segmentation
   clusters = DBSCAN(point_cloud, eps=0.5m, min_points=10)

2. Object Classification
   FOR EACH cluster:
       features = extract_features(cluster)
       class = classifier.predict(features)
       # Classes: vessel, buoy, structure, debris, etc.

3. Tracking
   tracked_objects = associate_with_previous_scan(clusters)

4. Collision Prediction
   FOR EACH object IN tracked_objects:
       IF predicted_collision(object):
           ALERT operator
           RECOMMEND avoidance_maneuver(object)
```

### 6.3 Cameras

#### 6.3.1 Visual Spectrum Cameras

- 360° coverage with multiple cameras
- Minimum 4K resolution
- Low-light sensitivity
- Real-time object detection

**Computer Vision Pipeline:**
```
1. Image Acquisition
   images = capture_from_all_cameras(t)

2. Preprocessing
   images_enhanced = adaptive_histogram_equalization(images)

3. Object Detection (YOLO/SSD)
   detections = model.detect(images_enhanced)
   # Detect: vessels, buoys, landmarks, navigation marks

4. Tracking (SORT/DeepSORT)
   tracks = tracker.update(detections)

5. Scene Understanding
   situation = analyze_scene(tracks, ais_data, radar_data)
```

#### 6.3.2 Thermal (IR) Cameras

- Night operation
- Fog penetration
- Man-overboard detection
- Temperature monitoring (engine, cargo)

### 6.4 AIS (Automatic Identification System)

#### 6.4.1 Message Types

```
AIS Message Processing:

Message 1/2/3 (Position Report):
  - MMSI, position, course, speed, heading
  - Update rate: 2-10 seconds (underway)

Message 5 (Static Data):
  - Ship name, call sign, IMO number
  - Dimensions, ship type
  - Update rate: 6 minutes

Message 21 (Aid-to-Navigation):
  - Buoy, lighthouse positions

Message 14 (Safety Message):
  - Text broadcast to all vessels
```

#### 6.4.2 Sensor Fusion

Combine AIS with radar for enhanced tracking:

```
Fusion Algorithm:

1. Data Association
   FOR EACH radar_track:
       ais_match = find_nearest_ais(radar_track, max_distance=0.5NM)

2. State Estimation
   IF ais_match EXISTS:
       # Fused track with higher confidence
       position = weighted_average(radar_pos, ais_pos, weights)
       velocity = ais_velocity  # More accurate from AIS
       identity = ais_identity
       confidence = 0.95
   ELSE:
       # Radar-only track (may be vessel without AIS)
       use_radar_data()
       confidence = 0.6

3. Uncertainty Quantification
   position_uncertainty = √(σ²_radar + σ²_ais)
   velocity_uncertainty = σ_ais  # AIS velocity generally reliable
```

### 6.5 Environmental Sensors

#### 6.5.1 Weather Monitoring

```
Sensor Suite:
- Anemometer: Wind speed/direction (±0.1 m/s, ±1°)
- Barometer: Atmospheric pressure (±0.1 hPa)
- Hygrometer: Humidity (±2%)
- Thermometer: Air/water temperature (±0.1°C)
- Wave sensor: Wave height/period (±0.1m, ±0.5s)

Data Integration:
weather_state = {
    wind: {speed, direction, gusts},
    pressure: {value, trend},
    visibility: computed_from_cameras,
    sea_state: {wave_height, period, direction},
    precipitation: from_radar_returns
}

Route Adjustment:
IF weather_state.wind.speed > threshold OR
   weather_state.sea_state.wave_height > threshold:
    new_route = optimize_route_for_weather(current_route, weather_state)
    IF deviation > acceptable_limit:
        REQUEST shore_approval
```

---

## 7. Route Planning and Optimization

### 7.1 Multi-Objective Optimization

#### 7.1.1 Objective Function

```
Cost Function:

J = α₁ × fuel_cost +
    α₂ × time_cost +
    α₃ × risk_cost +
    α₄ × emission_cost +
    α₅ × maintenance_cost

Where:
  α₁, α₂, α₃, α₄, α₅ = weighting factors (Σα = 1)

Fuel Cost:
  fuel_cost = ∫[route] (fuel_rate(speed, weather) × distance)

Time Cost:
  time_cost = ∫[route] (1 / speed) dx × time_value

Risk Cost:
  risk_cost = Σ[segments] (
      collision_risk × severity +
      grounding_risk × severity +
      piracy_risk × severity
  )

Emission Cost:
  emission_cost = ∫[route] (
      CO₂_rate + NOₓ_rate + SOₓ_rate
  ) × carbon_price
```

#### 7.1.2 Constraints

```
Optimization Constraints:

1. Navigational Safety:
   depth(x, y) ≥ draft + UKC(speed)
   distance_to_hazards ≥ safety_margin

2. Weather Limits:
   wave_height ≤ max_operational_wave_height
   wind_speed ≤ max_operational_wind_speed

3. Traffic Separation Schemes:
   IF in_TSS:
       course = TSS_direction ± 5°

4. Emission Control Areas (ECA):
   IF in_ECA:
       fuel_sulfur_content ≤ 0.1%  # IMO 2020

5. Time Windows:
   arrival_time ∈ [ETA_min, ETA_max]

6. Ship Performance:
   speed ∈ [min_steerage_speed, max_service_speed]
```

### 7.2 Weather Routing

#### 7.2.1 Wave Impact on Speed

```
Speed loss due to waves:

V_actual = V_calm_water × (1 - loss_factor)

loss_factor = f(
    wave_height,
    wave_period,
    wave_direction_relative_to_heading,
    ship_characteristics
)

Simplified model:
loss_factor = k₁ × (H_significant / L_ship)² ×
              |cos(θ_wave - θ_ship)|

Where:
  H_significant = significant wave height
  L_ship = ship length
  θ_wave = wave direction
  θ_ship = ship heading
  k₁ = empirical constant (typically 10-20)
```

#### 7.2.2 Dynamic Route Optimization

```
Re-planning Triggers:

1. Weather Update:
   IF |weather_forecast_new - weather_forecast_old| > threshold:
       recompute_optimal_route()

2. Periodic Review:
   EVERY 6 hours:
       IF potential_improvement > 5%:
           recompute_optimal_route()

3. Unexpected Conditions:
   IF actual_conditions != forecast_conditions:
       immediate_route_adjustment()

Re-planning Algorithm:

new_route = A_star_search(
    start = current_position,
    goal = destination,
    heuristic = great_circle_distance,
    cost = total_voyage_cost(segment, weather_forecast),
    constraints = safety_constraints
)

IF new_route.cost < current_route.cost × 0.95:
    REQUEST approval_from_shore()
    IF approved:
        UPDATE route
        NOTIFY all_systems
```

### 7.3 Port Approach and Docking

#### 7.3.1 Precision Navigation

For port approach (< 5 NM from berth):

```
Positioning accuracy requirements:
- Approach channel: ±2 meters
- Berthing: ±0.5 meters

Enhanced positioning:
1. DGPS/RTK GNSS
2. Port-based positioning system (GBAS)
3. LiDAR-based relative positioning
4. Visual landmark recognition

Fused Position:
position_fused = weighted_average([
    GNSS_position (weight: 0.4),
    GBAS_position (weight: 0.3),
    LiDAR_position (weight: 0.2),
    vision_position (weight: 0.1)
])
```

#### 7.3.2 Autonomous Docking

```
Docking Procedure:

1. Approach Phase (1000m - 200m)
   - Align with berth
   - Reduce speed gradually
   - Final speed: 0.5 - 1.0 knots

2. Final Approach (200m - 50m)
   - Fine position adjustment
   - Thruster control for lateral movement
   - Speed: < 0.5 knots

3. Berthing (50m - contact)
   - Precision positioning
   - Fender contact prediction
   - Speed at contact: < 0.1 knots

4. Making Fast
   - Hold position with thrusters
   - Coordinate with automated mooring system
   - Verify secure attachment

Control Algorithm (MPC - Model Predictive Control):

u_optimal = argmin Σ[t=0 to N] (
    ||position(t) - target_position||² +
    ||velocity(t) - target_velocity||² +
    λ × ||u(t)||²
)

Subject to:
    position(t+1) = f(position(t), velocity(t), u(t))
    |u(t)| ≤ u_max  (thruster limits)
    position(N) = berth_position
    velocity(N) = 0
```

---

## 8. Cybersecurity

### 8.1 Threat Model

#### 8.1.1 Threat Categories

```
Maritime Cyber Threats:

1. Unauthorized Access
   - Remote control hijacking
   - System penetration
   - Credential theft

2. Data Integrity Attacks
   - GNSS spoofing
   - AIS manipulation
   - Chart data corruption
   - Sensor data injection

3. Denial of Service
   - Communication jamming
   - System overload
   - Critical service disruption

4. Malware
   - Ransomware
   - Trojan horses
   - Logic bombs

5. Insider Threats
   - Malicious shore operators
   - Compromised maintenance personnel
```

#### 8.1.2 Attack Vectors

```
Common Attack Surfaces:

- Satellite communications (VSAT)
- Port facility interfaces
- Supply chain (software updates)
- Remote access (ROC connections)
- Sensor networks
- Third-party systems integration
```

### 8.2 Security Architecture

#### 8.2.1 Defense in Depth

```
Security Layers:

Layer 1 - Network Perimeter:
  - Firewalls (stateful inspection)
  - Intrusion Detection/Prevention Systems (IDS/IPS)
  - VPN for all remote connections
  - Network segmentation

Layer 2 - Access Control:
  - Multi-factor authentication (MFA)
  - Role-based access control (RBAC)
  - Principle of least privilege
  - Session management

Layer 3 - Application Security:
  - Input validation
  - Secure coding practices
  - Regular security audits
  - Penetration testing

Layer 4 - Data Security:
  - Encryption at rest (AES-256)
  - Encryption in transit (TLS 1.3)
  - Data integrity checks (HMAC)
  - Secure key management

Layer 5 - Monitoring & Response:
  - Security Information and Event Management (SIEM)
  - Continuous monitoring
  - Incident response plan
  - Forensic logging
```

#### 8.2.2 Critical System Isolation

```
Network Segmentation:

Zone 1 - Critical Control:
  - Navigation systems
  - Propulsion control
  - Emergency systems

Zone 2 - Operations:
  - Monitoring systems
  - Communication
  - Sensor processing

Zone 3 - Business:
  - Crew amenities
  - Administrative systems

Zone 4 - External:
  - Internet gateway (heavily firewalled)
  - Third-party connections

Inter-zone Communication:
  - One-way data diodes where possible
  - Strict firewall rules
  - Protocol whitelisting
  - Deep packet inspection
```

### 8.3 GNSS Spoofing Detection

```
Spoofing Detection Algorithm:

1. Multi-Constellation Consistency:
   IF GPS_position ≠ GLONASS_position:
       ALERT potential_spoofing

2. Position Consistency Check:
   predicted_position = extrapolate(
       previous_position,
       velocity,
       heading,
       Δt
   )

   IF |GNSS_position - predicted_position| > threshold:
       ALERT anomaly_detected

3. Signal Characteristics:
   IF signal_strength > expected OR
      signal_direction != satellite_direction:
       ALERT possible_spoofing

4. Cryptographic Authentication:
   IF available(authenticated_GNSS):
       USE Galileo_OS-NMA OR GPS_M-Code
       VERIFY digital_signature

5. Cross-Validation:
   secondary_position = triangulate(
       visual_landmarks OR
       radar_fixes OR
       celestial_navigation
   )

   IF |GNSS_position - secondary_position| > 100m:
       SWITCH_TO secondary_navigation
       ALERT shore_control
```

### 8.4 Secure Software Updates

```
Update Procedure:

1. Authentication:
   verify_signature(update_package, manufacturer_public_key)

2. Integrity Check:
   computed_hash = SHA-256(update_package)
   IF computed_hash != manifest_hash:
       REJECT update

3. Staging:
   install_to_secondary_partition()

4. Validation:
   boot_from_secondary()
   run_system_tests()

   IF all_tests_pass:
       make_secondary_primary()
       keep_backup_of_previous()
   ELSE:
       rollback_to_primary()
       ALERT update_failed

5. Audit:
   LOG {
       timestamp,
       update_version,
       operator_id,
       verification_status,
       test_results
   }
```

---

## 9. Communication Protocols

### 9.1 Ship-Shore Data Link

#### 9.1.1 Message Protocol

```
Message Structure:

{
    "header": {
        "message_id": "UUID",
        "timestamp": "ISO 8601",
        "priority": 0-3,
        "source": "ship_id | shore_id",
        "destination": "shore_id | ship_id",
        "message_type": "command | data | alert | ack",
        "encryption": "AES-256-GCM",
        "signature": "HMAC-SHA256"
    },
    "payload": {
        // Message-specific data
    },
    "checksum": "CRC32"
}
```

#### 9.1.2 Message Types

```
Command Messages:
- SET_COURSE
- SET_SPEED
- ALTER_ROUTE
- CHANGE_AUTONOMY_LEVEL
- EMERGENCY_STOP
- RETURN_TO_PORT

Data Messages:
- POSITION_REPORT (every 10 seconds)
- SENSOR_DATA (every 1 second)
- SYSTEM_STATUS (every 30 seconds)
- CAMERA_STREAM (continuous)

Alert Messages:
- COLLISION_WARNING
- SYSTEM_FAULT
- WEATHER_ALERT
- SECURITY_INCIDENT
- COMMUNICATION_DEGRADED

Acknowledgment:
- ACK (message received and validated)
- NACK (message rejected - checksum error)
- EXECUTING (command being executed)
- COMPLETED (command executed successfully)
- FAILED (command execution failed)
```

### 9.2 Bandwidth Optimization

#### 9.2.1 Adaptive Data Compression

```
Compression Strategy:

IF bandwidth > 1 Mbps:
    compression_level = LOW
    video_quality = HIGH
    sensor_data_rate = FULL

ELSE IF bandwidth > 500 kbps:
    compression_level = MEDIUM
    video_quality = MEDIUM
    sensor_data_rate = REDUCED

ELSE IF bandwidth > 100 kbps:
    compression_level = HIGH
    video_quality = LOW
    sensor_data_rate = CRITICAL_ONLY

ELSE:  # < 100 kbps
    compression_level = MAXIMUM
    video_quality = OFF
    sensor_data_rate = POSITION_ONLY
    ALERT shore "Degraded communications"
```

#### 9.2.2 Predictive Transmission

```
Smart Data Transmission:

1. Prioritize Critical Data:
   ALWAYS_SEND: [position, heading, speed, collision_alerts]

2. Event-Triggered Transmission:
   SEND_WHEN_CHANGED: [course, route, status]
   SEND_ONLY_IF |Δvalue| > threshold

3. Periodic Heartbeat:
   EVERY 10_seconds: position_report
   EVERY 30_seconds: system_status
   EVERY 5_minutes: full_diagnostics

4. On-Demand:
   SEND_WHEN_REQUESTED: [logs, camera_feeds, detailed_sensor_data]
```

---

## 10. Data Formats

### 10.1 Position Report

```json
{
  "type": "position_report",
  "timestamp": "2025-12-26T12:00:00.000Z",
  "ship": {
    "imo": "9876543",
    "mmsi": "123456789",
    "call_sign": "ABCD"
  },
  "position": {
    "latitude": 35.676192,
    "longitude": 139.650311,
    "altitude": 0.0,
    "accuracy": 2.5
  },
  "motion": {
    "heading": 90.5,
    "course_over_ground": 89.8,
    "speed_over_ground": 15.2,
    "speed_through_water": 15.5,
    "rate_of_turn": 0.5
  },
  "navigation": {
    "status": "under_way_using_engine",
    "destination": "JPYOK",
    "eta": "2025-12-27T06:00:00.000Z",
    "next_waypoint": {
      "latitude": 35.500000,
      "longitude": 140.000000
    },
    "distance_to_waypoint": 25.3,
    "cross_track_error": 0.05
  }
}
```

### 10.2 Collision Warning

```json
{
  "type": "collision_warning",
  "timestamp": "2025-12-26T12:00:00.000Z",
  "severity": "HIGH",
  "target": {
    "mmsi": "987654321",
    "name": "MV EXAMPLE",
    "type": "cargo",
    "position": {
      "latitude": 35.685000,
      "longitude": 139.750000
    },
    "heading": 270.0,
    "speed": 12.0
  },
  "collision_assessment": {
    "cpa": 0.8,
    "cpa_unit": "NM",
    "tcpa": 12.5,
    "tcpa_unit": "minutes",
    "risk_index": 0.85,
    "colreg_situation": "crossing",
    "give_way_vessel": "own_ship"
  },
  "recommended_action": {
    "type": "alter_course",
    "new_heading": 105.0,
    "reason": "COLREG Rule 15 - Crossing situation, target on starboard",
    "execution_time": "2025-12-26T12:02:00.000Z"
  }
}
```

### 10.3 Route Plan

```json
{
  "type": "route_plan",
  "route_id": "RT-20251226-001",
  "created": "2025-12-26T10:00:00.000Z",
  "origin": {
    "name": "Tokyo Port",
    "position": {"latitude": 35.676192, "longitude": 139.650311}
  },
  "destination": {
    "name": "Singapore Port",
    "position": {"latitude": 1.289670, "longitude": 103.850067}
  },
  "waypoints": [
    {
      "id": "WP001",
      "position": {"latitude": 35.500000, "longitude": 140.000000},
      "turn_radius": 0.5,
      "speed": 16.0,
      "eta": "2025-12-26T14:30:00.000Z"
    },
    {
      "id": "WP002",
      "position": {"latitude": 30.000000, "longitude": 135.000000},
      "turn_radius": 0.5,
      "speed": 18.0,
      "eta": "2025-12-27T02:00:00.000Z"
    }
  ],
  "optimization": {
    "objective": "fuel_efficiency",
    "total_distance": 2850.5,
    "estimated_fuel": 1250.0,
    "estimated_duration": 168.5,
    "weather_routed": true
  },
  "constraints": {
    "max_wave_height": 6.0,
    "max_wind_speed": 30.0,
    "eca_compliant": true,
    "tsss_compliance": true
  }
}
```

### 10.4 System Status

```json
{
  "type": "system_status",
  "timestamp": "2025-12-26T12:00:00.000Z",
  "overall_health": "NOMINAL",
  "autonomy_level": 3,
  "subsystems": {
    "navigation": {
      "status": "OPERATIONAL",
      "gnss": {"fix_quality": "RTK", "satellites": 18},
      "imu": {"status": "NOMINAL", "drift": 0.001},
      "ecdis": {"status": "OPERATIONAL", "chart_coverage": 100}
    },
    "propulsion": {
      "status": "OPERATIONAL",
      "main_engine": {"rpm": 850, "load": 75, "temp": 85},
      "fuel": {"level": 82.5, "consumption_rate": 8.5}
    },
    "sensors": {
      "radar_x": {"status": "OPERATIONAL", "range": 48},
      "radar_s": {"status": "OPERATIONAL", "range": 96},
      "lidar": {"status": "OPERATIONAL", "points_per_sec": 1200000},
      "cameras": {"operational": 8, "degraded": 0, "failed": 0},
      "ais": {"status": "OPERATIONAL", "targets": 15}
    },
    "communication": {
      "satellite": {"status": "OPERATIONAL", "bandwidth": 2.5, "latency": 650},
      "cellular": {"status": "UNAVAILABLE"},
      "vhf": {"status": "OPERATIONAL"}
    }
  },
  "alerts": [
    {
      "severity": "INFO",
      "subsystem": "propulsion",
      "message": "Fuel level below 85%, recommend refueling at next port"
    }
  ]
}
```

---

## 11. API Interface

### 11.1 REST API Endpoints

```
Base URL: https://api.autonomous-ship.wia/v1

Authentication: Bearer token (JWT)

Endpoints:

GET /ships/{imo}/position
  Response: Current position and navigation status

POST /ships/{imo}/commands/set-course
  Body: {"heading": 90.0, "speed": 15.0}
  Response: Command acknowledgment

GET /ships/{imo}/route
  Response: Current route plan

POST /ships/{imo}/route
  Body: Route plan JSON
  Response: Route validation and acceptance

GET /ships/{imo}/collision-warnings
  Response: Active collision warnings

POST /ships/{imo}/avoid-collision
  Body: Maneuver parameters
  Response: Maneuver execution status

GET /ships/{imo}/system-status
  Response: Complete system health

GET /ships/{imo}/sensor-data
  Query: ?sensor=radar&timerange=last_hour
  Response: Historical sensor data

POST /ships/{imo}/autonomy-level
  Body: {"level": 3, "reason": "entering_open_ocean"}
  Response: Level change confirmation

WebSocket: wss://api.autonomous-ship.wia/v1/ships/{imo}/stream
  Real-time data streaming
```

### 11.2 SDK Methods

```typescript
class AutonomousShipSDK {
  // Initialization
  constructor(config: ShipConfig)

  // Navigation
  async startNavigation(params: NavigationParams): Promise<void>
  async stopNavigation(): Promise<void>
  async setCourse(heading: number, speed: number): Promise<void>
  async planRoute(origin: Position, destination: Position, options?: RouteOptions): Promise<Route>
  async updateRoute(route: Route): Promise<void>

  // Collision Avoidance
  async getCollisionWarnings(): Promise<CollisionWarning[]>
  async executeAvoidanceManeuver(maneuver: Maneuver): Promise<void>
  calculateCollisionRisk(ownShip: ShipState, target: ShipState): CollisionAssessment

  // Monitoring
  async getPosition(): Promise<Position>
  async getSystemStatus(): Promise<SystemStatus>
  async getSensorData(sensor: SensorType, timeRange?: TimeRange): Promise<SensorData>

  // Control
  async setAutonomyLevel(level: number): Promise<void>
  async emergencyStop(): Promise<void>
  async returnToPort(port: string): Promise<void>

  // Events
  on(event: 'collision-warning', handler: (warning: CollisionWarning) => void): void
  on(event: 'system-alert', handler: (alert: SystemAlert) => void): void
  on(event: 'position-update', handler: (position: Position) => void): void
}
```

---

## 12. Safety Protocols

### 12.1 Pre-Voyage Checklist

```
Autonomous Voyage Checklist:

Navigation Systems:
  ☐ GNSS fix quality: RTK or better
  ☐ IMU calibrated and operational
  ☐ ECDIS charts updated and covering full route
  ☐ Backup navigation systems tested

Sensors:
  ☐ Radar (X-band and S-band) operational
  ☐ LiDAR operational and calibrated
  ☐ Cameras (all 360° coverage) operational
  ☐ AIS receiver operational
  ☐ Weather sensors calibrated

Communication:
  ☐ Satellite link established (latency < 1 second)
  ☐ VHF radio operational
  ☐ Emergency beacon tested
  ☐ Shore control center connection verified

Propulsion & Control:
  ☐ Main engine operational
  ☐ Steering system tested (full range)
  ☐ Thrusters operational (if equipped)
  ☐ Emergency shutdown tested

Safety:
  ☐ Collision avoidance system tested
  ☐ Geofencing boundaries loaded
  ☐ Emergency protocols programmed
  ☐ Autonomous emergency anchoring tested

Cybersecurity:
  ☐ All software up to date
  ☐ Firewall rules validated
  ☐ Authentication systems tested
  ☐ Intrusion detection active

Regulatory:
  ☐ Autonomy level approved for route
  ☐ Flag state authorization obtained
  ☐ Coastal state permissions (if required)
  ☐ Insurance coverage confirmed
  ☐ Emergency contact list updated
```

### 12.2 Emergency Procedures

#### 12.2.1 Loss of Communication

```
Communication Loss Protocol:

1. Detection (after 60 seconds no contact):
   ALERT "Communication lost with shore control"
   START degraded_operations_mode

2. Actions:
   - Continue on planned route
   - Maintain enhanced lookout
   - Attempt to re-establish communication
   - Reduce speed by 20% for safety margin

3. If communication not restored in 10 minutes:
   - Execute pre-programmed contingency route
   - Broadcast AIS safety message
   - Attempt VHF contact with nearby vessels

4. If communication not restored in 60 minutes:
   - Proceed to nearest safe anchorage
   - Drop anchor in designated emergency position
   - Activate emergency beacon
   - Wait for assistance

5. Communication restoration:
   - Report status to shore control
   - Request permission to resume voyage
   - Conduct system diagnostic
   - Continue or abort as directed
```

#### 12.2.2 Sensor Failure

```
Sensor Degradation Response:

Loss of GNSS:
  → Switch to dead reckoning
  → Use radar fixes for position updates
  → Reduce speed to 50%
  → Notify shore control
  → Proceed to nearest port if degradation continues

Loss of Radar:
  → Rely on AIS and cameras
  → Activate all cameras
  → Reduce speed to 50%
  → Avoid traffic lanes
  → Request shore guidance

Loss of AIS:
  → Enhance radar surveillance
  → Visual/camera lookout
  → Broadcast VHF safety message
  → Continue with caution

Multiple Sensor Failures:
  → Reduce autonomy level
  → Emergency stop if < 50% sensor coverage
  → Request immediate shore intervention
  → Prepare for manual control/crew deployment
```

#### 12.2.3 Imminent Collision

```
Collision Emergency Protocol:

IF collision_probability > 0.9 AND TCPA < 2 minutes:

    1. Immediate Actions (automatic):
       - Sound collision alarm
       - Execute emergency maneuver
       - Full rudder + engine maneuver
       - Activate all warning signals

    2. Emergency Maneuver:
       IF room_to_starboard:
           HARD_TURN starboard
       ELSE IF room_to_port:
           HARD_TURN port
       ELSE:
           FULL_ASTERN + turn_away

    3. Notifications:
       - Broadcast VHF warning
       - Send AIS safety message
       - Alert shore control (highest priority)
       - Activate deck cameras

    4. Post-Maneuver:
       - Assess situation
       - Check for damage
       - Report to shore
       - Adjust autonomy level if needed
```

### 12.3 Fault Tolerance

```
System Redundancy Requirements:

Critical Systems (Triple Redundancy):
  - Navigation (GNSS + Dead Reckoning + Radar Fix)
  - Communication (Satellite + VHF + Emergency Beacon)
  - Power (Main + Auxiliary + Emergency)

Important Systems (Dual Redundancy):
  - Radar (X-band + S-band)
  - Steering (Main + Backup hydraulic)
  - Propulsion (Main + Auxiliary engine OR main + sail)

Failover Logic:

IF primary_system.failed:
    SWITCH_TO secondary_system
    ALERT shore_control
    LOG failure_event
    SCHEDULE maintenance

IF secondary_system.failed:
    SWITCH_TO tertiary_system (if available)
    ALERT CRITICAL shore_control
    REDUCE autonomy_level
    PROCEED_TO nearest_port

IF tertiary_system.failed:
    EXECUTE emergency_protocol
    REQUEST immediate_assistance
    PREPARE_FOR manual_control
```

---

## 13. References

### 13.1 International Maritime Regulations

1. **IMO MASS**: International Maritime Organization - Maritime Autonomous Surface Ships (MSC 103/WP.8, 2021)
2. **COLREG 1972**: Convention on the International Regulations for Preventing Collisions at Sea
3. **SOLAS**: International Convention for the Safety of Life at Sea
4. **STCW**: Standards of Training, Certification and Watchkeeping for Seafarers
5. **IMO 2020**: International Convention for the Prevention of Pollution from Ships (MARPOL) - Sulfur regulations

### 13.2 Technical Standards

6. **IEC 61162**: Maritime navigation and radiocommunication equipment and systems - Digital interfaces
7. **IEC 62288**: Maritime navigation and radiocommunication equipment and systems - Presentation of navigation-related information on shipborne navigational displays
8. **IEC 61924**: Maritime navigation and radiocommunication equipment and systems - Integrated navigation systems (INS)
9. **ISO 19847**: Ships and marine technology - Shipboard data servers to share field data at sea
10. **IMO Resolution A.694(17)**: General requirements for shipborne radio equipment forming part of the global maritime distress and safety system (GMDSS)

### 13.3 Cybersecurity Standards

11. **IEC 62443**: Industrial communication networks - Network and system security
12. **NIST CSF**: National Institute of Standards and Technology Cybersecurity Framework
13. **IMO MSC-FAL.1/Circ.3**: Guidelines on maritime cyber risk management
14. **BIMCO Guidelines**: The Guidelines on Cyber Security Onboard Ships (Version 4, 2020)

### 13.4 Navigation & Positioning

15. **WGS 84**: World Geodetic System 1984
16. **S-57**: IHO Transfer Standard for Digital Hydrographic Data
17. **S-100**: IHO Universal Hydrographic Data Model
18. **RTCM 10403**: Differential GNSS Services - Version 3

### 13.5 Scientific Papers

19. Fujii, Y., & Tanaka, K. (1971). "Traffic Capacity", Journal of Navigation, 24(4), 543-552
20. Goodwin, E.M. (1975). "A Statistical Study of Ship Domains", Journal of Navigation, 28(3), 328-344
21. Tam, C., Bucknall, R., Greig, A. (2009). "Review of Collision Avoidance and Path Planning Methods for Ships in Close Range Encounters", Journal of Navigation, 62(3), 455-476
22. Perera, L.P., Carvalho, J.P., Soares, C.G. (2011). "Autonomous Guidance and Navigation Based on the COLREGs Rules and Regulations of Collision Avoidance", Proceedings of International Workshop on Advanced Ship Design for Pollution Prevention

### 13.6 WIA Standards

23. **WIA-INTENT**: Intent-based control interfaces
24. **WIA-OMNI-API**: Universal API gateway for maritime data
25. **WIA-IoT**: Internet of Things sensor integration
26. **WIA-BLOCKCHAIN**: Immutable voyage data recording
27. **WIA-SOCIAL**: Fleet coordination and communication protocols

---

## Appendix A: Example Calculations

### A.1 Great Circle Distance

```
Calculate distance from Tokyo to Singapore:

Tokyo: 35.676192°N, 139.650311°E
Singapore: 1.289670°N, 103.850067°E

φ₁ = 35.676192° × π/180 = 0.6227 rad
φ₂ = 1.289670° × π/180 = 0.0225 rad
Δλ = (103.850067 - 139.650311)° × π/180 = -0.6252 rad

a = sin²((0.0225 - 0.6227)/2) + cos(0.6227) × cos(0.0225) × sin²(-0.6252/2)
a = sin²(-0.3001) + 0.8132 × 0.9997 × sin²(-0.3126)
a = 0.0872 + 0.8129 × 0.0945
a = 0.1640

c = 2 × atan2(√0.1640, √0.8360)
c = 2 × atan2(0.4050, 0.9143)
c = 2 × 0.4175 = 0.8350 rad

d = 3440.065 NM × 0.8350 = 2,872.5 NM

Estimated voyage time at 15 knots:
t = 2,872.5 NM / 15 knots = 191.5 hours ≈ 8 days
```

### A.2 Collision Risk Assessment

```
Own Ship:
  Position: 35.676192°N, 139.650311°E
  Heading: 090° (East)
  Speed: 15 knots

Target Ship:
  Position: 35.685000°N, 139.750000°E
  Heading: 270° (West)
  Speed: 12 knots

Step 1: Calculate relative position
Δlat = 35.685000 - 35.676192 = 0.008808°
Δlon = 139.750000 - 139.650311 = 0.099689°

Distance ≈ √((Δlat × 60)² + (Δlon × 60 × cos(35.68°))²)
Distance ≈ √((0.528)² + (4.85)²) ≈ 4.88 NM

Bearing ≈ atan2(Δlon × cos(35.68°), Δlat) = 83.8°

Step 2: Calculate relative velocity
Own velocity vector: (15 × cos(90°), 15 × sin(90°)) = (0, 15)
Target velocity: (12 × cos(270°), 12 × sin(270°)) = (0, -12)
Relative velocity: (0, 27) knots

Step 3: Calculate CPA and TCPA
Relative speed = 27 knots
Relative bearing to target = 83.8°
Course difference = |90° - 83.8°| = 6.2°

TCPA ≈ (Distance × cos(relative_bearing)) / relative_speed
TCPA ≈ (4.88 × cos(6.2°)) / 27 ≈ 0.179 hours ≈ 10.7 minutes

CPA ≈ Distance × sin(relative_bearing)
CPA ≈ 4.88 × sin(6.2°) ≈ 0.53 NM

Step 4: Risk Assessment
Risk_index = (2.0 / 0.53) × (20 / 10.7) = 3.77 × 1.87 = 7.05

Result: CRITICAL RISK - Immediate action required
Situation: Crossing (target on starboard)
Recommendation: Alter course to starboard by 30° or reduce speed by 50%
```

---

**弘益人間 (홍익인간) · Benefit All Humanity**

*WIA-AUTO-015 Specification v1.0*
*© 2025 SmileStory Inc. / WIA*
*MIT License*
